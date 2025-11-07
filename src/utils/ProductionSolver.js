/**
 * ProductionSolver.js
 * 
 * Unified calculation engine for all production-related calculations.
 * Used by Calculator, Visualizer, and Farm Optimizer for consistent results.
 * 
 * Handles:
 * - Manual production chain building
 * - Optimized recipe selection
 * - Resource consolidation
 * - Constraint satisfaction
 * - Resource source management
 */

import ProductionCalculator from './ProductionCalculator';
import ResourceConsolidator from './ResourceConsolidator';
import OptimizationEngine from './OptimizationEngine';

class ProductionSolver {
    constructor(productionCalculator = ProductionCalculator) {
        this.calculator = productionCalculator;
        this.optimizer = new OptimizationEngine(productionCalculator);
    }

    /**
     * Main solve function - unified interface for all production calculations
     * 
     * @param {Object} params
     * @param {string} params.targetProductId - Product to produce
     * @param {number} params.targetRate - Desired production rate (/min)
     * @param {boolean} params.useConsolidation - Enable resource consolidation/pooling
     * @param {Map} params.resourceSources - Map of nodeKey -> {type, config} for resource sources
     * @param {Map} params.recipeOverrides - Map of productId -> recipeId for manual recipe selection
     * @param {boolean} params.optimizationMode - Enable optimization engine
     * @param {string} params.optimizationGoal - Optimization objective (minimizeWorkers, etc.)
     * @param {Object} params.constraints - Optimization constraints (maxPower, maxWorkers, etc.)
     * @param {Map} params.resourceConstraints - Map of productId -> max available rate
     * @returns {Object} - { chain, requirements, optimized, score?, alternatives?, explanation? }
     */
    solve(params) {
        const {
            targetProductId,
            targetRate,
            useConsolidation = false,
            resourceSources = new Map(),
            recipeOverrides = new Map(),
            optimizationMode = false,
            optimizationGoal = 'minimizeWorkers',
            constraints = {},
            resourceConstraints = new Map()
        } = params;

        // Validate inputs
        if (!targetProductId || !targetRate || targetRate <= 0) {
            return {
                error: 'Invalid input: targetProductId and targetRate are required',
                chain: null,
                requirements: null
            };
        }

        // Route to appropriate solver
        if (optimizationMode) {
            return this.optimizedSolve({
                targetProductId,
                targetRate,
                useConsolidation,
                resourceSources,
                optimizationGoal,
                constraints,
                resourceConstraints
            });
        } else {
            return this.simpleSolve({
                targetProductId,
                targetRate,
                useConsolidation,
                resourceSources,
                recipeOverrides
            });
        }
    }

    /**
     * Simple solve: Build chain with user's manual recipe choices
     * Used when optimization mode is OFF
     */
    simpleSolve(params) {
        const {
            targetProductId,
            targetRate,
            useConsolidation,
            resourceSources,
            recipeOverrides
        } = params;

        try {
            // Build production chain with user's manual selections
            let chain = this.calculator.calculateProductionChain(
                targetProductId,
                targetRate,
                null, // No specific recipe for root (will use override if exists)
                recipeOverrides,
                resourceSources
            );

            if (chain.error) {
                return {
                    error: chain.error,
                    chain: null,
                    requirements: null,
                    optimized: false
                };
            }

            // Apply consolidation if enabled
            if (useConsolidation) {
                chain = ResourceConsolidator.consolidateChain(
                    chain,
                    this.calculator
                );
            }

            // Calculate requirements
            const requirements = useConsolidation
                ? ResourceConsolidator.calculateConsolidatedRequirements(chain)
                : this.calculator.calculateTotalRequirements(chain);

            return {
                chain,
                requirements,
                optimized: false,
                recipeOverrides: recipeOverrides
            };
        } catch (error) {
            console.error('Error in simpleSolve:', error);
            return {
                error: `Calculation failed: ${error.message}`,
                chain: null,
                requirements: null,
                optimized: false
            };
        }
    }

    /**
     * Optimized solve: Use optimization engine to find best recipe combination
     * Used when optimization mode is ON
     */
    optimizedSolve(params) {
        const {
            targetProductId,
            targetRate,
            useConsolidation,
            resourceSources,
            optimizationGoal,
            constraints,
            resourceConstraints
        } = params;

        try {
            // Use optimization engine to find best solution
            const result = this.optimizer.optimize({
                targetProductId,
                targetRate,
                optimizationGoal,
                availableResources: resourceConstraints,
                constraints: {
                    ...constraints,
                    resourceLimits: resourceConstraints
                },
                useConsolidation,
                resourceSources
            });

            if (result.error) {
                return {
                    error: result.error,
                    chain: result.chain,
                    requirements: null,
                    optimized: true,
                    alternatives: result.alternatives || []
                };
            }

            // Calculate requirements (optimizer already did this, but ensure consistency)
            let requirements;
            if (result.chain) {
                requirements = useConsolidation
                    ? ResourceConsolidator.calculateConsolidatedRequirements(result.chain)
                    : this.calculator.calculateTotalRequirements(result.chain);
            } else {
                requirements = result.metrics || null;
            }

            return {
                chain: result.chain,
                requirements,
                optimized: true,
                score: result.score,
                metrics: result.metrics,
                alternatives: result.alternatives || [],
                explanation: result.explanation,
                recipeOverrides: result.recipeOverrides,
                goal: optimizationGoal
            };
        } catch (error) {
            console.error('Error in optimizedSolve:', error);
            return {
                error: `Optimization failed: ${error.message}`,
                chain: null,
                requirements: null,
                optimized: true
            };
        }
    }

    /**
     * Calculate consolidation statistics for a chain
     * Used to display resource pool summary
     */
    getConsolidationStats(chain) {
        if (!chain || !chain.consolidatedResources) {
            return {
                totalResources: 0,
                sharedResources: 0,
                singleUseResources: 0,
                averageUtilization: 0
            };
        }

        return ResourceConsolidator.getConsolidationStats(chain);
    }

    /**
     * Compare multiple recipes for the same product
     * Useful for manual recipe selection UI
     */
    compareRecipes(productId, targetRate, recipeOverrides = new Map(), useConsolidation = false) {
        const recipes = this.calculator.getRecipesForProduct(productId);

        const comparisons = recipes.map(recipe => {
            let chain = this.calculator.calculateProductionChain(
                productId,
                targetRate,
                recipe.id,
                recipeOverrides,
                new Map() // No resource sources for comparison
            );

            if (useConsolidation) {
                chain = ResourceConsolidator.consolidateChain(chain, this.calculator);
            }

            const requirements = useConsolidation
                ? ResourceConsolidator.calculateConsolidatedRequirements(chain)
                : this.calculator.calculateTotalRequirements(chain);

            return {
                recipe,
                chain,
                requirements,
                efficiency: {
                    powerPerItem: requirements.power / targetRate,
                    workersPerItem: requirements.workers / targetRate,
                    machinesTotal: Array.from(requirements.machines.values()).reduce((a, b) => a + b, 0)
                }
            };
        });

        // Sort by total machines needed (lower is better)
        comparisons.sort((a, b) => a.efficiency.machinesTotal - b.efficiency.machinesTotal);

        return comparisons;
    }

    /**
     * Validate that a solution satisfies all constraints
     */
    validateSolution(chain, constraints) {
        const requirements = this.calculator.calculateTotalRequirements(chain);

        const violations = [];

        if (constraints.maxPower && requirements.power > constraints.maxPower) {
            violations.push({
                constraint: 'maxPower',
                limit: constraints.maxPower,
                actual: requirements.power,
                exceeded: requirements.power - constraints.maxPower
            });
        }

        if (constraints.maxWorkers && requirements.workers > constraints.maxWorkers) {
            violations.push({
                constraint: 'maxWorkers',
                limit: constraints.maxWorkers,
                actual: requirements.workers,
                exceeded: requirements.workers - constraints.maxWorkers
            });
        }

        if (constraints.maxMachines) {
            const totalMachines = Array.from(requirements.machines.values()).reduce((a, b) => a + b, 0);
            if (totalMachines > constraints.maxMachines) {
                violations.push({
                    constraint: 'maxMachines',
                    limit: constraints.maxMachines,
                    actual: totalMachines,
                    exceeded: totalMachines - constraints.maxMachines
                });
            }
        }

        return {
            valid: violations.length === 0,
            violations
        };
    }

    /**
     * Get available solver modes and their descriptions
     */
    static getModes() {
        return {
            manual: {
                name: 'Manual Mode',
                description: 'Build production chains with manual recipe selection',
                features: ['Custom recipe selection', 'Resource source control', 'Optional consolidation']
            },
            optimized: {
                name: 'Optimization Mode',
                description: 'Automatically find optimal recipe combinations',
                features: ['Automatic recipe selection', 'Constraint satisfaction', 'Multiple objectives']
            }
        };
    }

    /**
     * Get available optimization goals
     */
    static getOptimizationGoals() {
        return [
            { value: 'minimizeWorkers', label: 'Minimize Workers', description: 'Reduce total worker count' },
            { value: 'minimizePower', label: 'Minimize Power', description: 'Reduce power consumption (kW)' },
            { value: 'minimizeMachines', label: 'Minimize Machines', description: 'Reduce total machine count' },
            { value: 'minimizeMaintenance', label: 'Minimize Maintenance', description: 'Reduce maintenance costs' },
            { value: 'minimizeComputing', label: 'Minimize Computing', description: 'Reduce computing requirements' },
            { value: 'maximizeProduction', label: 'Maximize Production', description: 'Maximize production rate' }
        ];
    }
}

// Export singleton instance
const solver = new ProductionSolver();
export default solver;

// Also export class for testing/custom instances
export { ProductionSolver };