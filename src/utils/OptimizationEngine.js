/**
 * OptimizationEngine.js
 * Heuristic constraint solver for production chain optimization
 * 
 * UPDATED: Now supports consolidation mode, resource sources, and intelligent duplicate filtering
 * FIXED: maximizeProduction now finds the highest achievable production rate
 * FIXED: minimizeComputing properly handles zero-computing scenarios
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

        // Special handling for maximizeProduction - find highest achievable rate
        if (optimizationGoal === 'maximizeProduction') {
            return this.optimizeMaxProduction(
                targetProductId,
                targetRate,
                availableResources,
                constraints,
                resourceSources,
                useConsolidation
            );
        }

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

        // Filter alternatives: remove duplicates and solutions too similar to best
        const uniqueAlternatives = this.filterUniqueAlternatives(
            validCombinations.slice(1),
            best,
            optimizationGoal
        );

        return {
            chain: best.chain,
            score: best.score,
            metrics: best.metrics,
            recipeOverrides: best.recipeOverrides,
            alternatives: uniqueAlternatives.slice(0, 3).map(alt => ({
                score: alt.score,
                metrics: alt.metrics,
                recipeOverrides: alt.recipeOverrides,
                reason: this.explainDifference(best, alt, optimizationGoal)
            })),
            explanation: this.explainOptimization(best, optimizationGoal, constraints)
        };
    }

    /**
     * NEW: Optimize for maximum production rate
     * Finds the highest achievable production rate given constraints
     */
    optimizeMaxProduction(targetProductId, baseRate, availableResources, constraints, resourceSources, useConsolidation) {
        // Test different production rates to find the maximum achievable
        const testRates = [];

        // Generate test rates: 10%, 25%, 50%, 75%, 100%, 150%, 200%, 300%, 500%, 1000% of base
        const multipliers = [0.1, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 3.0, 5.0, 10.0];
        multipliers.forEach(mult => testRates.push(baseRate * mult));

        let bestValidRate = 0;
        let bestValidChain = null;
        let bestValidMetrics = null;
        let bestValidOverrides = null;

        for (const testRate of testRates) {
            // Get recipe combinations for this rate
            const recipeCombinations = this.enumerateRecipeCombinations(
                targetProductId,
                testRate,
                availableResources,
                constraints,
                resourceSources,
                useConsolidation,
                200 // Limit combinations for performance
            );

            if (recipeCombinations.length === 0) continue;

            // Score and filter
            for (const combo of recipeCombinations) {
                let chain = combo.chain;

                if (useConsolidation) {
                    chain = ResourceConsolidator.consolidateChain(chain, this.calculator);
                }

                const metrics = useConsolidation
                    ? this.calculateMetricsFromConsolidated(chain)
                    : this.calculateMetrics(chain);

                const isValid = this.checkConstraints(metrics, constraints);

                if (isValid && testRate > bestValidRate) {
                    bestValidRate = testRate;
                    bestValidChain = chain;
                    bestValidMetrics = metrics;
                    bestValidOverrides = combo.recipeOverrides;
                }
            }
        }

        if (!bestValidChain) {
            return {
                error: 'Could not find any production chain satisfying constraints for maximum production',
                chain: null,
                score: Infinity,
                metrics: null,
                alternatives: []
            };
        }

        const percentOfBase = ((bestValidRate / baseRate) * 100).toFixed(0);

        return {
            chain: bestValidChain,
            score: -bestValidRate, // Negative because higher = better
            metrics: bestValidMetrics,
            recipeOverrides: bestValidOverrides,
            alternatives: [], // No alternatives in max production mode
            explanation: `Maximum production: ${bestValidRate.toFixed(2)}/min (${percentOfBase}% of requested rate) | Workers: ${bestValidMetrics.workers} | Power: ${(bestValidMetrics.powerKw / 1000).toFixed(1)}MW | Machines: ${bestValidMetrics.machines}`
        };
    }

    /**
     * NEW: Filter out duplicate alternatives based on metrics
     * Only keep alternatives that are meaningfully different
     */
    filterUniqueAlternatives(alternatives, best, optimizationGoal) {
        const seen = new Set();
        const unique = [];

        for (const alt of alternatives) {
            // Create a signature based on key metrics
            const signature = this.createMetricSignature(alt.metrics);

            // Skip if we've seen this exact combination
            if (seen.has(signature)) {
                continue;
            }

            // Skip if metrics are identical to best solution
            if (this.metricsAreIdentical(alt.metrics, best.metrics)) {
                continue;
            }

            seen.add(signature);
            unique.push(alt);
        }

        return unique;
    }

    /**
     * NEW: Create a unique signature for a metric set
     */
    createMetricSignature(metrics) {
        return JSON.stringify({
            workers: metrics.workers,
            powerKw: Math.round(metrics.powerKw * 10) / 10,
            machines: metrics.machines,
            maintenance: Math.round(metrics.maintenancePerMonth * 10) / 10,
            computing: Math.round(metrics.computingTFlops * 10) / 10
        });
    }

    /**
     * NEW: Check if two metric sets are effectively identical
     */
    metricsAreIdentical(metrics1, metrics2) {
        const threshold = 0.001;

        return (
            Math.abs(metrics1.workers - metrics2.workers) < threshold &&
            Math.abs(metrics1.powerKw - metrics2.powerKw) < threshold &&
            Math.abs(metrics1.machines - metrics2.machines) < threshold &&
            Math.abs(metrics1.maintenancePerMonth - metrics2.maintenancePerMonth) < threshold &&
            Math.abs(metrics1.computingTFlops - metrics2.computingTFlops) < threshold
        );
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
                    const tier = machine.upgrades?.tierNumber || 1;
                    return constraints.tierRestrictions.includes(tier);
                });
                if (filteredRecipes.length > 0) {
                    recipeOptions.set(productId, filteredRecipes);
                } else {
                    recipeOptions.set(productId, recipes);
                }
            } else {
                recipeOptions.set(productId, recipes);
            }
        });

        // Generate combinations using recursive enumeration
        const generateCombinations = (productIndex, currentOverrides) => {
            if (productIndex >= involvedProducts.length) {
                const chain = this.calculator.calculateProductionChain(
                    targetProductId,
                    targetRate,
                    currentOverrides.get(targetProductId) || null,
                    currentOverrides,
                    resourceSources
                );

                if (!chain.error) {
                    allCombinations.push({
                        chain,
                        recipeOverrides: new Map(currentOverrides)
                    });
                }
                return;
            }

            if (allCombinations.length >= maxCombinations) return;

            const productId = involvedProducts[productIndex];
            const recipes = recipeOptions.get(productId) || [];

            if (recipes.length === 0) {
                generateCombinations(productIndex + 1, currentOverrides);
                return;
            }

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
            if (recipes.length === 0) continue;

            involved.add(productId);

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
            rawMaterialsUsed: new Map(),
            machineBreakdown: new Map(),
            recipeUsage: new Map()
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

                const currentCount = metrics.machineBreakdown.get(node.machine.id) || 0;
                metrics.machineBreakdown.set(node.machine.id, currentCount + machineCount);

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
     * Calculate metrics from consolidated chain
     */
    calculateMetricsFromConsolidated(chain) {
        if (!chain.consolidatedResources) {
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

            const currentCount = metrics.machineBreakdown.get(resource.machine.id) || 0;
            metrics.machineBreakdown.set(resource.machine.id, currentCount + machineCount);

            if (resource.recipe) {
                const recipeCount = metrics.recipeUsage.get(resource.recipe.id) || 0;
                metrics.recipeUsage.set(resource.recipe.id, recipeCount + machineCount);
            }
        }

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
     * FIXED: minimizeComputing handles zero-computing scenarios
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
                return metrics.computingTFlops || 0;

            case 'maximizeProduction':
                // This case is handled by optimizeMaxProduction
                // Fallback: minimize resource usage for efficiency
                return metrics.workers + (metrics.powerKw * 0.01) + (metrics.machines * 2);

            default:
                return metrics.workers;
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
            maximizeProduction: 'Maximum Production Rate'
        };

        const parts = [];
        parts.push(`Optimized for: ${goalNames[goal] || goal}`);

        if (goal !== 'maximizeProduction') {
            parts.push(`Score: ${solution.score.toFixed(2)}`);
        }

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
     * UPDATED: Explain difference between two solutions with intelligent comparison
     */
    explainDifference(best, alternative, goal) {
        const bestMetrics = best.metrics;
        const altMetrics = alternative.metrics;

        const primaryMetricKey = this.getMetricKeyForGoal(goal);
        const primaryDiff = altMetrics[primaryMetricKey] - bestMetrics[primaryMetricKey];

        if (Math.abs(primaryDiff) < 0.001) {
            return this.explainSecondaryDifferences(bestMetrics, altMetrics, goal);
        }

        const pct = ((primaryDiff / bestMetrics[primaryMetricKey]) * 100).toFixed(1);
        const metricName = this.getMetricDisplayName(primaryMetricKey);

        return `+${pct}% ${metricName}`;
    }

    /**
     * Get metric key for optimization goal
     */
    getMetricKeyForGoal(goal) {
        const goalToMetric = {
            minimizeWorkers: 'workers',
            minimizePower: 'powerKw',
            minimizeMachines: 'machines',
            minimizeMaintenance: 'maintenancePerMonth',
            minimizeComputing: 'computingTFlops',
            maximizeProduction: 'workers'
        };
        return goalToMetric[goal] || 'workers';
    }

    /**
     * Get display name for metric
     */
    getMetricDisplayName(metricKey) {
        const displayNames = {
            workers: 'workers',
            powerKw: 'power',
            machines: 'machines',
            maintenancePerMonth: 'maintenance',
            computingTFlops: 'computing'
        };
        return displayNames[metricKey] || metricKey;
    }

    /**
     * Explain differences when primary metric is equal
     */
    explainSecondaryDifferences(bestMetrics, altMetrics, goal) {
        const secondaryOrder = ['workers', 'powerKw', 'machines', 'maintenancePerMonth', 'computingTFlops'];
        const primaryKey = this.getMetricKeyForGoal(goal);

        for (const key of secondaryOrder) {
            if (key === primaryKey) continue;

            const diff = altMetrics[key] - bestMetrics[key];
            if (Math.abs(diff) > 0.001) {
                const pct = ((diff / bestMetrics[key]) * 100).toFixed(1);
                const metricName = this.getMetricDisplayName(key);

                if (diff > 0) {
                    return `Same ${this.getMetricDisplayName(primaryKey)}, but +${pct}% ${metricName}`;
                } else {
                    return `Same ${this.getMetricDisplayName(primaryKey)}, but ${pct}% less ${metricName}`;
                }
            }
        }

        return 'Alternative recipe configuration';
    }
}

export default OptimizationEngine;