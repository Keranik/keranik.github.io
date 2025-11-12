// src/utils/FertilizerProductionAnalyzer.js
// Analyzes the true economic cost of fertilizer production in worker-months

import ProductionCalculator from './ProductionCalculator';

/**
 * ECONOMIC MODEL:
 * ===============
 * Game Time: 10 ticks/sec, 2 sec/day, 30 days/month, 60 seconds/month
 * 
 * We calculate the TOTAL worker-months required to produce 1 unit of fertilizer,
 * including all upstream production chains (inputs, electricity, water, etc.)
 * 
 * This lets us determine if fertilizer is "worth it":
 * - Fertilizer increases farm yield
 * - But requires workers to produce
 * - Net benefit = yield increase - worker food consumption
 * 
 * CONVERSION FACTORS represent the worker-months needed to produce 1 unit/month
 * of each resource type. These are TUNABLE to match your economic model.
 */
export class FertilizerProductionAnalyzer {

    /**
     * Conversion Factors: Worker-months required per unit/month of resource
     * 
     * Example: maintenancePerMonth = 0.025 means:
     *   "If a machine requires 1 maintenance/month, that costs 0.025 worker-months"
     * 
     * These values are TUNABLE based on your game's economy.
     * Use the test page to calibrate them until fertilizer rankings match your intuition.
     */
    static CONVERSION_FACTORS = {
        maintenancePerMonth: 0.0005,      // Nearly free for testing
        electricityKwPerMonth: 0.0010,    // Nearly free for testing
        computingPerMonth: 0.01,        // Nearly free for testing
        waterPerMonth: 0.01,            // Nearly free for testing
        ammoniaPerMonth: 0.005           // Nearly free for testing
    };

    /**
     * Find all recipes that produce a given product
     */
    static findRecipesProducing(productId) {
        return (ProductionCalculator.recipes || []).filter(recipe =>
            recipe.outputs.some(output => output.productId === productId)
        );
    }

    /**
     * Get machines that can run a specific recipe
     */
    static getMachinesForRecipe(recipeId) {
        if (ProductionCalculator.getMachinesForRecipe) {
            return ProductionCalculator.getMachinesForRecipe(recipeId);
        }
        return (ProductionCalculator.machines || []).filter(machine =>
            machine.recipes?.includes(recipeId)
        );
    }

    /**
     * Check if a product is a fertilizer
     */
    static isFertilizer(productId) {
        const product = ProductionCalculator.getProduct(productId);
        return product &&
            product.fertilizer &&
            product.fertilizer.fertilityPerQuantityPercent !== undefined;
    }

    /**
     * Check if a product is water
     */
    static isWater(productId) {
        const product = ProductionCalculator.getProduct(productId);
        if (!product) return false;
        const name = product.name?.toLowerCase() || '';
        const id = productId.toLowerCase();
        return name.includes('water') || id.includes('water');
    }

    /**
     * Check if a product is ammonia
     */
    static isAmmonia(productId) {
        const product = ProductionCalculator.getProduct(productId);
        if (!product) return false;
        const name = product.name?.toLowerCase() || '';
        const id = productId.toLowerCase();
        return name.includes('ammonia') || id.includes('ammonia');
    }

    /**
     * Extract maintenance cost from machine
     */
    static getMaintenanceCost(machine) {
        if (!machine) return 0;
        if (machine.maintenance && typeof machine.maintenance === 'object') {
            return machine.maintenance.perMonth || 0;
        }
        return 0;
    }

    /**
     * Get empty cost structure
     */
    static getEmptyCost() {
        return {
            workerMonths: 0,           // Direct worker time on machines
            maintenanceMonths: 0,      // Maintenance units consumed per month
            electricityKwMonths: 0,    // Electricity kW consumed per month
            computingMonths: 0,        // Computing units consumed per month
            waterMonths: 0,            // Water units consumed per month
            ammoniaMonths: 0           // Ammonia units consumed per month
        };
    }

    /**
     * Calculate production cost for ONE unit of product through a specific recipe
     * 
     * Returns cost structure showing resource consumption per unit produced.
     * All values are in "per month" units (e.g., workerMonths = worker-months per unit)
     * 
     * @param {Object} recipe - The recipe to analyze
     * @param {number} maxDepth - Maximum recursion depth for input chains
     * @param {Set} visited - Set of visited recipe IDs (prevents infinite loops)
     * @param {string} targetProductId - Which output to optimize for (if recipe has multiple outputs)
     * @returns {Object} Cost structure with all resource requirements
     */
    static calculateRecipeCost(recipe, maxDepth = 5, visited = new Set(), targetProductId = null) {
        if (maxDepth <= 0 || visited.has(recipe.id)) {
            return this.getEmptyCost();
        }

        visited = new Set(visited);
        visited.add(recipe.id);

        const machines = this.getMachinesForRecipe(recipe.id);
        if (!machines || machines.length === 0) {
            console.warn(`No machines for recipe ${recipe.id}`);
            return this.getEmptyCost();
        }

        const machine = machines[0]; // Use first available machine
        const maintenanceCost = this.getMaintenanceCost(machine);

        // Find the target output product
        let targetOutput;
        if (targetProductId) {
            targetOutput = recipe.outputs.find(o => o.productId === targetProductId);
        } else {
            // Default: find fertilizer output
            targetOutput = recipe.outputs.find(o => this.isFertilizer(o.productId));
        }

        if (!targetOutput) {
            // If no fertilizer and no target specified, use first output
            if (recipe.outputs.length > 0) {
                targetOutput = recipe.outputs[0];
            } else {
                console.warn(`No suitable output in recipe ${recipe.id}`);
                return this.getEmptyCost();
            }
        }

        const unitsPerCycle = targetOutput.quantity;
        const cycleSeconds = recipe.durationSeconds;
        const secondsPerMonth = 60;

        // How many months does it take to produce 1 unit?
        const monthsPerUnit = (cycleSeconds / unitsPerCycle) / secondsPerMonth;

        // Direct costs for THIS machine to produce 1 unit
        const cost = {
            workerMonths: (machine.workers || 0) * monthsPerUnit,
            maintenanceMonths: maintenanceCost * monthsPerUnit,
            electricityKwMonths: (machine.electricityKw || 0) * monthsPerUnit,
            computingMonths: (machine.computingTFlops || 0) * monthsPerUnit,
            waterMonths: 0,
            ammoniaMonths: 0
        };

        // Add costs for inputs (recursive production chains)
        recipe.inputs.forEach(input => {
            const inputProduct = ProductionCalculator.getProduct(input.productId);
            if (!inputProduct) return;

            const quantityPerUnit = input.quantity / unitsPerCycle;

            // ✅ CRITICAL: Check if THIS input is water or ammonia FIRST
            // This ensures we track water/ammonia consumption at EVERY level of the chain
            const isWaterInput = this.isWater(input.productId);
            const isAmmoniaInput = this.isAmmonia(input.productId);

            if (isWaterInput) {
                cost.waterMonths += quantityPerUnit;
                console.log(`  💧 Water consumed: ${quantityPerUnit.toFixed(6)} per unit`);
            }

            if (isAmmoniaInput) {
                cost.ammoniaMonths += quantityPerUnit;
                console.log(`  🧪 Ammonia consumed: ${quantityPerUnit.toFixed(6)} per unit`);
            }

            // Now check if this input has its own production chain
            const inputRecipes = this.findRecipesProducing(input.productId);

            if (inputRecipes.length === 0) {
                // Raw material (no production chain)
                // Water and ammonia already counted above
                if (!isWaterInput && !isAmmoniaInput) {
                    console.log(`  ⛏️ Raw material ${inputProduct.name}: ${quantityPerUnit.toFixed(6)} per unit (no worker cost)`);
                }
            } else {
                // Has production chain - recursively calculate cost
                const inputCost = this.calculateRecipeCost(
                    inputRecipes[0],
                    maxDepth - 1,
                    visited,
                    input.productId
                );

                // Add the input's production cost (scaled by quantity needed)
                cost.workerMonths += inputCost.workerMonths * quantityPerUnit;
                cost.maintenanceMonths += inputCost.maintenanceMonths * quantityPerUnit;
                cost.electricityKwMonths += inputCost.electricityKwMonths * quantityPerUnit;
                cost.computingMonths += inputCost.computingMonths * quantityPerUnit;

                // ✅ CRITICAL: Add water/ammonia from the input's production chain
                cost.waterMonths += inputCost.waterMonths * quantityPerUnit;
                cost.ammoniaMonths += inputCost.ammoniaMonths * quantityPerUnit;

                if (inputCost.waterMonths > 0 || inputCost.ammoniaMonths > 0) {
                    console.log(`  ⛓️ ${inputProduct.name} production chain uses: water=${(inputCost.waterMonths * quantityPerUnit).toFixed(6)}, ammonia=${(inputCost.ammoniaMonths * quantityPerUnit).toFixed(6)}`);
                }
            }
        });

        return cost;
    }

    /**
     * Convert resource costs to total worker-months
     * 
     * This is the KEY FUNCTION for economic comparison.
     * It converts all resource types to a common unit: worker-months
     * 
     * Example: If a fertilizer unit requires:
     *   - 0.1 worker-months (direct labor)
     *   - 5 maintenance/month (= 5 * 0.025 = 0.125 worker-months)
     *   - 10 water/month (= 10 * 0.025 = 0.25 worker-months)
     *   Total: 0.475 worker-months per unit
     * 
     * Then: unitsPerWorkerMonth = 1 / 0.475 = 2.1 units/worker-month
     */
    static normalizeToWorkerEquivalentMonths(cost) {
        return cost.workerMonths +
            (cost.maintenanceMonths * this.CONVERSION_FACTORS.maintenancePerMonth) +
            (cost.electricityKwMonths * this.CONVERSION_FACTORS.electricityKwPerMonth) +
            (cost.computingMonths * this.CONVERSION_FACTORS.computingPerMonth) +
            (cost.waterMonths * this.CONVERSION_FACTORS.waterPerMonth) +
            (cost.ammoniaMonths * this.CONVERSION_FACTORS.ammoniaPerMonth);
    }

    /**
     * Convert worker-months to worker-seconds (for display)
     * Game time: 60 seconds per month
     */
    static workerMonthsToSeconds(workerMonths) {
        return workerMonths * 60;
    }

    /**
     * Convert worker-months to worker-days (for display)
     * Game time: 30 days per month
     */
    static workerMonthsToDays(workerMonths) {
        return workerMonths * 30;
    }

    /**
     * Get detailed breakdown for display
     * Shows both raw costs and worker-equivalent costs
     */
    static getDetailedBreakdown(cost) {
        const rawCosts = {
            workerMonths: cost.workerMonths,
            maintenanceMonths: cost.maintenanceMonths,
            electricityKwMonths: cost.electricityKwMonths,
            computingMonths: cost.computingMonths,
            waterMonths: cost.waterMonths,
            ammoniaMonths: cost.ammoniaMonths
        };

        const workerEquivalents = {
            workers: cost.workerMonths,
            maintenance: cost.maintenanceMonths * this.CONVERSION_FACTORS.maintenancePerMonth,
            electricity: cost.electricityKwMonths * this.CONVERSION_FACTORS.electricityKwPerMonth,
            computing: cost.computingMonths * this.CONVERSION_FACTORS.computingPerMonth,
            water: cost.waterMonths * this.CONVERSION_FACTORS.waterPerMonth,
            ammonia: cost.ammoniaMonths * this.CONVERSION_FACTORS.ammoniaPerMonth
        };

        const totalWorkerMonths = this.normalizeToWorkerEquivalentMonths(cost);

        return {
            rawCosts,
            workerEquivalents,
            totalWorkerMonths,
            totalWorkerSeconds: this.workerMonthsToSeconds(totalWorkerMonths),
            totalWorkerDays: this.workerMonthsToDays(totalWorkerMonths)
        };
    }

    /**
     * Analyze a single fertilizer - average across all recipes
     * 
     * Returns complete economic analysis including:
     * - Production costs (raw resources and worker-equivalent)
     * - Efficiency metrics (units per worker-month, fertility per worker-month)
     * - Comparison data
     */
    static analyzeFertilizer(fertilizerId) {
        const product = ProductionCalculator.getProduct(fertilizerId);
        if (!product || !product.fertilizer) {
            return null;
        }

        const recipes = this.findRecipesProducing(fertilizerId);
        if (recipes.length === 0) {
            console.warn(`No recipes for fertilizer ${fertilizerId}`);
            return null;
        }

        console.log(`\n📊 Analyzing ${product.name} (${recipes.length} recipe${recipes.length > 1 ? 's' : ''})`);

        // Calculate cost for each recipe
        const recipeCosts = recipes.map(recipe => {
            console.log(`  Recipe: ${recipe.name || recipe.id}`);
            return this.calculateRecipeCost(recipe);
        });

        // Average the costs across all recipes
        const avgCost = this.getEmptyCost();
        recipeCosts.forEach(cost => {
            avgCost.workerMonths += cost.workerMonths / recipeCosts.length;
            avgCost.maintenanceMonths += cost.maintenanceMonths / recipeCosts.length;
            avgCost.electricityKwMonths += cost.electricityKwMonths / recipeCosts.length;
            avgCost.computingMonths += cost.computingMonths / recipeCosts.length;
            avgCost.waterMonths += cost.waterMonths / recipeCosts.length;
            avgCost.ammoniaMonths += cost.ammoniaMonths / recipeCosts.length;
        });

        const breakdown = this.getDetailedBreakdown(avgCost);
        const fertilityPerUnit = product.fertilizer.fertilityPerQuantityPercent;

        // Core metrics for FertilizerCalculator
        const workerMonthsPerUnit = breakdown.totalWorkerMonths;
        const unitsPerWorkerMonth = 1 / workerMonthsPerUnit;
        const fertilityPerWorkerMonth = fertilityPerUnit * unitsPerWorkerMonth;

        console.log(`  💧 Total water per unit: ${avgCost.waterMonths.toFixed(6)}`);
        console.log(`  🧪 Total ammonia per unit: ${avgCost.ammoniaMonths.toFixed(6)}`);
        console.log(`  ✅ Total worker-months per unit: ${workerMonthsPerUnit.toFixed(6)}`);
        console.log(`  ✅ Units per worker-month: ${unitsPerWorkerMonth.toFixed(4)}`);
        console.log(`  ✅ Fertility per worker-month: ${fertilityPerWorkerMonth.toFixed(4)}%`);

        return {
            fertilizerId,
            name: product.name,
            fertilityPerUnit,
            maxFertility: product.fertilizer.maxFertilityPercent,

            // Core metrics for FertilizerCalculator
            unitsPerWorkerMonth,
            fertilityPerWorkerMonth,
            workerMonthsPerUnit,

            // Detailed breakdown
            costPerUnit: avgCost,
            breakdown,
            recipeCount: recipes.length
        };
    }

    /**
     * Analyze all fertilizers and generate replacement data
     * 
     * Returns:
     * - results: Full analysis for each fertilizer (for display)
     * - replacementData: Just the core metrics (for FertilizerCalculator)
     */
    static generateReplacementData(fertilizerIds) {
        console.log('\n' + '='.repeat(80));
        console.log('🧪 FERTILIZER ECONOMIC ANALYSIS');
        console.log('='.repeat(80));
        console.log('Game Time: 60 seconds/month, 30 days/month');
        console.log('Conversion Factors (worker-months per unit/month):');
        Object.entries(this.CONVERSION_FACTORS).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
        console.log('');

        const results = [];
        const replacementData = {};

        fertilizerIds.forEach(id => {
            const analysis = this.analyzeFertilizer(id);
            if (analysis) {
                results.push(analysis);

                // Build replacement data for FertilizerCalculator
                replacementData[id] = {
                    unitsPerWorkerMonth: analysis.unitsPerWorkerMonth*10,
                    fertilityPerWorkerMonth: analysis.fertilityPerWorkerMonth*10,
                    workerMonthsPerUnit: analysis.workerMonthsPerUnit/10
                };
            }
        });

        // Sort by cost efficiency (worker-months per % fertility gained)
        results.sort((a, b) => {
            const costPerFertA = a.workerMonthsPerUnit / a.fertilityPerUnit;
            const costPerFertB = b.workerMonthsPerUnit / b.fertilityPerUnit;
            return costPerFertA - costPerFertB;
        });

        // Calculate relative efficiency
        if (results.length > 0) {
            const bestCostPerFert = results[0].workerMonthsPerUnit / results[0].fertilityPerUnit;
            results.forEach(r => {
                const costPerFert = r.workerMonthsPerUnit / r.fertilityPerUnit;
                r.costPerFertilityPoint = costPerFert;
                r.relativeEfficiency = bestCostPerFert / costPerFert;
                r.efficiencyRating = r.relativeEfficiency >= 0.9 ? 'Excellent' :
                    r.relativeEfficiency >= 0.7 ? 'Good' :
                        r.relativeEfficiency >= 0.5 ? 'Fair' : 'Poor';
            });
        }

        console.log('\n' + '='.repeat(80));
        console.log('📊 EFFICIENCY RANKING (by worker-months per % fertility)');
        console.log('='.repeat(80));
        results.forEach((r, i) => {
            console.log(`${i + 1}. ${r.name}:`);
            console.log(`   Cost: ${r.costPerFertilityPoint.toFixed(6)} worker-months per % fertility`);
            console.log(`   Water: ${r.costPerUnit.waterMonths.toFixed(4)} units/fertilizer unit`);
            console.log(`   Ammonia: ${r.costPerUnit.ammoniaMonths.toFixed(4)} units/fertilizer unit`);
            console.log(`   Rating: ${r.efficiencyRating} (${(r.relativeEfficiency * 100).toFixed(1)}%)`);
        });

        console.log('\n' + '='.repeat(80));
        console.log('📋 REPLACEMENT DATA FOR FertilizerCalculator.FERTILIZER_PRODUCTION_COSTS');
        console.log('='.repeat(80));
        console.log(JSON.stringify(replacementData, null, 2));
        console.log('='.repeat(80) + '\n');

        return {
            results,
            replacementData
        };
    }

    /**
     * Update conversion factors (for tuning)
     */
    static updateConversionFactors(newFactors) {
        Object.assign(this.CONVERSION_FACTORS, newFactors);
        console.log('✅ Updated conversion factors:', this.CONVERSION_FACTORS);
    }

    /**
     * Get current conversion factors
     */
    static getConversionFactors() {
        return { ...this.CONVERSION_FACTORS };
    }
}