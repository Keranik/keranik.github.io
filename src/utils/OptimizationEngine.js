/**
 * OptimizationEngine.js
 * Heuristic constraint solver for production chain optimization
 * 
 * UPDATED: Now supports consolidation mode and resource sources
 */

import ResourceConsolidator from './ResourceConsolidator';

export class OptimizationEngine {
    constructor(productionCalculator) {
        this.calculator = productionCalculator;
    }

    /**
     * Find optimal production chain given constraints and optimization goal
     * 
     * UPDATED: Now supports useConsolidation and resourceSources
     * 
     * @param {Object} params
     * @param {string} params.targetProductId - Product to produce
     * @param {number} params.targetRate - Desired production rate (/min)
     * @param {string} params.optimizationGoal - Optimization objective
     * @param {Map} params.availableResources - Map<productId, rate> for resource constraints
     * @param {Object} params.constraints - Constraint object
     * @param {boolean} params.useConsolidation - Enable resource consolidation
     * @param {Map} params.resourceSources - Resource source preferences
     * @returns {Object} { chain, score, metrics, alternatives }
     */
    optimize(params) {
        const {
            targetProductId,
            targetRate,
            optimizationGoal = 'minimizeWorkers',
            availableResources = new Map(),
            constraints = {},
            useConsolidation = false,
            resourceSources = new Map()
        } = params;

        // Get all possible recipe combinations for this product
        const recipeCombinations = this.enumerateRecipeCombinations(
            targetProductId,
            targetRate,
            availableResources,
            constraints,
            resourceSources,
            useConsolidation
        );

        if (recipeCombinations.length === 0) {
            return {
                error: 'No valid production chains found matching constraints',
                chain: null,
                score: Infinity,
                metrics: null,
                alternatives: []
            };
        }

        // Score each combination
        const scoredCombinations = recipeCombinations.map(combo => {
            let chain = combo.chain;

            // Apply consolidation if enabled
            if (useConsolidation) {
                chain = ResourceConsolidator.consolidateChain(chain, this.calculator);
            }

            // Calculate metrics based on consolidation mode
            const metrics = useConsolidation
                ? this.calculateMetricsFromConsolidated(chain)
                : this.calculateMetrics(chain);

            const score = this.scoreChain(metrics, optimizationGoal);
            const isValid = this.checkConstraints(metrics, constraints);

            return {
                ...combo,
                chain, // Store the (potentially consolidated) chain
                metrics,
                score,
                isValid
            };
        });

        // Filter to valid combinations only
        const validCombinations = scoredCombinations.filter(c => c.isValid);

        if (validCombinations.length === 0) {
            return {
                error: 'No production chains satisfy all constraints',
                chain: null,
                score: Infinity,
                metrics: null,
                alternatives: scoredCombinations.slice(0, 3) // Show why they failed
            };
        }

        // Sort by score (ascending - lower is better)
        validCombinations.sort((a, b) => a.score - b.score);

        const best = validCombinations[0];
        const alternatives = validCombinations.slice(1, 4); // Top 3 alternatives

        return {
            chain: best.chain,
            score: best.score,
            metrics: best.metrics,
            recipeOverrides: best.recipeOverrides,
            alternatives: alternatives.map(alt => ({
                score: alt.score,
                metrics: alt.metrics,
                recipeOverrides: alt.recipeOverrides,
                reason: this.explainDifference(best, alt, optimizationGoal)
            })),
            explanation: this.explainOptimization(best, optimizationGoal, constraints)
        };
    }

    /**
     * Enumerate all possible recipe combinations for a product chain
     * 
     * UPDATED: Now passes resourceSources to chain calculation
     */
    enumerateRecipeCombinations(targetProductId, targetRate, availableResources, constraints, resourceSources, useConsolidation, maxCombinations = 1000) {
        const allCombinations = [];
        const excludedRecipes = new Set(constraints.excludedRecipes || []);

        // Get all products involved in making the target
        const involvedProducts = this.getInvolvedProducts(targetProductId);

        // For each product, get available recipes (excluding banned ones)
        const recipeOptions = new Map();
        involvedProducts.forEach(productId => {
            const recipes = this.calculator.getRecipesForProduct(productId)
                .filter(recipe => !excludedRecipes.has(recipe.id));

            // Apply tier restrictions if specified
            if (constraints.tierRestrictions) {
                const filteredRecipes = recipes.filter(recipe => {
                    const machines = this.calculator.getMachinesForRecipe(recipe.id);
                    if (machines.length === 0) return true;
                    const machine = machines[0];
                    // Assuming tier is in machine.upgrades.tierNumber
                    const tier = machine.upgrades?.tierNumber || 1;
                    return constraints.tierRestrictions.includes(tier);
                });
                if (filteredRecipes.length > 0) {
                    recipeOptions.set(productId, filteredRecipes);
                } else {
                    recipeOptions.set(productId, recipes); // Fallback if no tier match
                }
            } else {
                recipeOptions.set(productId, recipes);
            }
        });

        // Generate combinations using recursive enumeration
        const generateCombinations = (productIndex, currentOverrides) => {
            if (productIndex >= involvedProducts.length) {
                // Calculate chain with these overrides + resource sources
                const chain = this.calculator.calculateProductionChain(
                    targetProductId,
                    targetRate,
                    currentOverrides.get(targetProductId) || null,
                    currentOverrides,
                    resourceSources // PASS RESOURCE SOURCES HERE
                );

                if (!chain.error) {
                    allCombinations.push({
                        chain,
                        recipeOverrides: new Map(currentOverrides)
                    });
                }
                return;
            }

            if (allCombinations.length >= maxCombinations) return; // Limit combinations

            const productId = involvedProducts[productIndex];
            const recipes = recipeOptions.get(productId) || [];

            if (recipes.length === 0) {
                // No recipe options, skip this product
                generateCombinations(productIndex + 1, currentOverrides);
                return;
            }

            // Try each recipe for this product
            for (const recipe of recipes) {
                const newOverrides = new Map(currentOverrides);
                newOverrides.set(productId, recipe.id);
                generateCombinations(productIndex + 1, newOverrides);

                if (allCombinations.length >= maxCombinations) break;
            }
        };

        generateCombinations(0, new Map());

        return allCombinations;
    }

    /**
     * Get all products involved in making the target (BFS through recipe tree)
     */
    getInvolvedProducts(targetProductId, maxDepth = 20) {
        const involved = new Set();
        const queue = [{ productId: targetProductId, depth: 0 }];
        const visited = new Set();

        while (queue.length > 0) {
            const { productId, depth } = queue.shift();

            if (visited.has(productId) || depth > maxDepth) continue;
            visited.add(productId);

            const recipes = this.calculator.getRecipesForProduct(productId);
            if (recipes.length === 0) continue; // Raw material

            involved.add(productId);

            // Add all input products from all recipes
            recipes.forEach(recipe => {
                recipe.inputs.forEach(input => {
                    if (!visited.has(input.productId)) {
                        queue.push({ productId: input.productId, depth: depth + 1 });
                    }
                });
            });
        }

        return Array.from(involved);
    }

    /**
     * Calculate all metrics for a production chain (non-consolidated)
     */
    calculateMetrics(chain) {
        const metrics = {
            workers: 0,
            powerKw: 0,
            machines: 0,
            maintenancePerMonth: 0,
            computingTFlops: 0,
            rawMaterialsUsed: new Map(), // productId -> rate
            machineBreakdown: new Map(), // machineId -> count
            recipeUsage: new Map() // recipeId -> count
        };

        const traverse = (node) => {
            if (!node) return;

            if (node.machine && !node.isRawMaterial) {
                const machineCount = node.machineCount || 0;

                metrics.workers += (node.machine.workers || 0) * machineCount;
                metrics.powerKw += (node.machine.electricityKw || 0) * machineCount;
                metrics.machines += machineCount;
                metrics.computingTFlops += (node.machine.computingTFlops || 0) * machineCount;

                if (node.machine.maintenance?.perMonth) {
                    metrics.maintenancePerMonth += node.machine.maintenance.perMonth * machineCount;
                }

                // Track machine breakdown
                const currentCount = metrics.machineBreakdown.get(node.machine.id) || 0;
                metrics.machineBreakdown.set(node.machine.id, currentCount + machineCount);

                // Track recipe usage
                if (node.recipe) {
                    const recipeCount = metrics.recipeUsage.get(node.recipe.id) || 0;
                    metrics.recipeUsage.set(node.recipe.id, recipeCount + machineCount);
                }
            }

            if (node.isRawMaterial) {
                const current = metrics.rawMaterialsUsed.get(node.productId) || 0;
                metrics.rawMaterialsUsed.set(node.productId, current + node.targetRate);
            }

            if (node.inputChains) {
                node.inputChains.forEach(child => traverse(child));
            }
        };

        traverse(chain);

        return metrics;
    }

    /**
     * NEW: Calculate metrics from consolidated chain
     */
    calculateMetricsFromConsolidated(chain) {
        if (!chain.consolidatedResources) {
            // Fallback to regular metrics if not consolidated
            return this.calculateMetrics(chain);
        }

        const metrics = {
            workers: 0,
            powerKw: 0,
            machines: 0,
            maintenancePerMonth: 0,
            computingTFlops: 0,
            rawMaterialsUsed: new Map(),
            machineBreakdown: new Map(),
            recipeUsage: new Map()
        };

        // Process consolidated resources
        for (const [consolidationKey, resource] of chain.consolidatedResources.entries()) {
            if (resource.isRawMaterial) {
                if (resource.resourceSource?.type !== 'storage') {
                    const current = metrics.rawMaterialsUsed.get(resource.productId) || 0;
                    metrics.rawMaterialsUsed.set(resource.productId, current + resource.totalRate);
                }
                continue;
            }

            if (resource.error || !resource.machine) {
                continue;
            }

            const machineCount = resource.machineCount;

            metrics.workers += (resource.machine.workers || 0) * machineCount;
            metrics.powerKw += (resource.machine.electricityKw || 0) * machineCount;
            metrics.machines += machineCount;
            metrics.computingTFlops += (resource.machine.computingTFlops || 0) * machineCount;

            if (resource.machine.maintenance?.perMonth) {
                metrics.maintenancePerMonth += resource.machine.maintenance.perMonth * machineCount;
            }

            // Track machine breakdown
            const currentCount = metrics.machineBreakdown.get(resource.machine.id) || 0;
            metrics.machineBreakdown.set(resource.machine.id, currentCount + machineCount);

            // Track recipe usage
            if (resource.recipe) {
                const recipeCount = metrics.recipeUsage.get(resource.recipe.id) || 0;
                metrics.recipeUsage.set(resource.recipe.id, recipeCount + machineCount);
            }
        }

        // Also process root node if it has a machine
        if (chain.machine && !chain.isRawMaterial) {
            const machineCount = chain.machineCount;
            metrics.workers += (chain.machine.workers || 0) * machineCount;
            metrics.powerKw += (chain.machine.electricityKw || 0) * machineCount;
            metrics.machines += machineCount;
            metrics.computingTFlops += (chain.machine.computingTFlops || 0) * machineCount;

            if (chain.machine.maintenance?.perMonth) {
                metrics.maintenancePerMonth += chain.machine.maintenance.perMonth * machineCount;
            }

            const currentCount = metrics.machineBreakdown.get(chain.machine.id) || 0;
            metrics.machineBreakdown.set(chain.machine.id, currentCount + machineCount);

            if (chain.recipe) {
                const recipeCount = metrics.recipeUsage.get(chain.recipe.id) || 0;
                metrics.recipeUsage.set(chain.recipe.id, recipeCount + machineCount);
            }
        }

        return metrics;
    }

    /**
     * Score a chain based on optimization goal
     */
    scoreChain(metrics, goal) {
        switch (goal) {
            case 'minimizeWorkers':
                return metrics.workers;

            case 'minimizePower':
                return metrics.powerKw;

            case 'minimizeMachines':
                return metrics.machines;

            case 'minimizeMaintenance':
                return metrics.maintenancePerMonth;

            case 'minimizeComputing':
                return metrics.computingTFlops;

            case 'maximizeProduction':
                // For maximize, we want LOWEST score = HIGHEST production
                // So score = 1 / totalProduction (lower score = better)
                const totalProduction = Array.from(metrics.rawMaterialsUsed.values())
                    .reduce((sum, rate) => sum + rate, 0);
                return totalProduction > 0 ? -totalProduction : Infinity; // Negative so higher production = lower score

            default:
                return metrics.workers; // Fallback
        }
    }

    /**
     * Check if metrics satisfy all constraints
     */
    checkConstraints(metrics, constraints) {
        if (constraints.maxPower && metrics.powerKw > constraints.maxPower) {
            return false;
        }

        if (constraints.maxWorkers && metrics.workers > constraints.maxWorkers) {
            return false;
        }

        if (constraints.maxMachines && metrics.machines > constraints.maxMachines) {
            return false;
        }

        if (constraints.maxMaintenance && metrics.maintenancePerMonth > constraints.maxMaintenance) {
            return false;
        }

        if (constraints.maxComputing && metrics.computingTFlops > constraints.maxComputing) {
            return false;
        }

        return true;
    }

    /**
     * Explain why this solution is optimal
     */
    explainOptimization(solution, goal, constraints) {
        const goalNames = {
            minimizeWorkers: 'Worker Count',
            minimizePower: 'Power Consumption',
            minimizeMachines: 'Machine Count',
            minimizeMaintenance: 'Maintenance Cost',
            minimizeComputing: 'Computing Power',
            maximizeProduction: 'Production Rate'
        };

        const parts = [];
        parts.push(`Optimized for: ${goalNames[goal] || goal}`);
        parts.push(`Score: ${solution.score.toFixed(2)}`);

        const activeConstraints = [];
        if (constraints.maxPower) activeConstraints.push(`Max Power: ${constraints.maxPower}kW`);
        if (constraints.maxWorkers) activeConstraints.push(`Max Workers: ${constraints.maxWorkers}`);
        if (constraints.maxMachines) activeConstraints.push(`Max Machines: ${constraints.maxMachines}`);

        if (activeConstraints.length > 0) {
            parts.push(`Constraints: ${activeConstraints.join(', ')}`);
        }

        return parts.join(' | ');
    }

    /**
     * Explain difference between two solutions
     */
    explainDifference(best, alternative, goal) {
        const diff = alternative.score - best.score;
        const pct = ((diff / best.score) * 100).toFixed(1);

        const goalMetrics = {
            minimizeWorkers: 'workers',
            minimizePower: 'powerKw',
            minimizeMachines: 'machines',
            minimizeMaintenance: 'maintenancePerMonth',
            minimizeComputing: 'computingTFlops'
        };

        const metric = goalMetrics[goal];
        if (metric) {
            return `+${pct}% ${metric.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
        }

        return `+${pct}% worse`;
    }
}

export default OptimizationEngine;