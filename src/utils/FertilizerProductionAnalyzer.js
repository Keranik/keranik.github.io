// src/utils/FertilizerProductionAnalyzer.js - FIXED to use conversion factors in core metrics

import ProductionCalculator from './ProductionCalculator';

/**
 * Analyzes fertilizer production costs to replace hardcoded values in FertilizerCalculator
 * Averages all available recipes for each fertilizer to get representative production cost
 */
export class FertilizerProductionAnalyzer {

    // Conversion factors to normalize different resource types to "worker-equivalent hours"
    static CONVERSION_FACTORS = {
        workerHours: 1.0,
        maintenancePerMonth: 2.667,
        electricityKwPerMonth: 0.032,
        computingPerMonth: 90,
        waterPerMonth: 2.5,
        ammoniaPerMonth: 46
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
     * Calculate production cost for ONE unit through a specific recipe
     * Returns cost in worker-months per unit
     */
    // src/utils/FertilizerProductionAnalyzer.js - FIX for calculateRecipeCost

    /**
     * Calculate production cost for ONE unit through a specific recipe
     * Returns cost in worker-months per unit
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

        const machine = machines[0];
        const maintenanceCost = this.getMaintenanceCost(machine);

        // Find the target output (either fertilizer or specified product)
        let targetOutput;
        if (targetProductId) {
            targetOutput = recipe.outputs.find(o => o.productId === targetProductId);
        } else {
            // Default: find fertilizer output
            targetOutput = recipe.outputs.find(o => this.isFertilizer(o.productId));
        }

        if (!targetOutput) {
            // If no fertilizer and no target specified, try the first output
            if (recipe.outputs.length > 0) {
                targetOutput = recipe.outputs[0];
                console.log(`Using first output ${targetOutput.productId} for recipe ${recipe.id}`);
            } else {
                console.warn(`No suitable output in recipe ${recipe.id}`);
                return this.getEmptyCost();
            }
        }

        const unitsPerCycle = targetOutput.quantity;
        const cycleSeconds = recipe.durationSeconds;
        const secondsPerMonth = 60;
        const monthsPerUnit = (cycleSeconds / unitsPerCycle) / secondsPerMonth;

        // Direct machine costs per unit
        const cost = {
            workerMonths: (machine.workers || 0) * monthsPerUnit,
            maintenanceMonths: maintenanceCost * monthsPerUnit,
            electricityKwMonths: (machine.electricityKw || 0) * monthsPerUnit,
            computingMonths: (machine.computingTFlops || 0) * monthsPerUnit,
            waterMonths: 0,
            ammoniaMonths: 0
        };

        // Process inputs
        recipe.inputs.forEach(input => {
            const inputProduct = ProductionCalculator.getProduct(input.productId);
            if (!inputProduct) return;

            const quantityPerUnit = input.quantity / unitsPerCycle;
            const inputRecipes = this.findRecipesProducing(input.productId);

            if (inputRecipes.length === 0) {
                // Raw material
                const name = inputProduct.name?.toLowerCase() || '';
                const id = input.productId.toLowerCase();

                if (name.includes('water') || id.includes('water')) {
                    cost.waterMonths += quantityPerUnit;
                    console.log(`  -> Raw water: ${quantityPerUnit.toFixed(6)} per unit`);
                } else if (name.includes('ammonia') || id.includes('ammonia')) {
                    cost.ammoniaMonths += quantityPerUnit;
                    console.log(`  -> Raw ammonia: ${quantityPerUnit.toFixed(6)} per unit`);
                } else {
                    console.log(`  -> Raw material ${inputProduct.name}: ${quantityPerUnit.toFixed(6)} per unit (no cost)`);
                }
            } else {
                // Has production chain - recursively calculate (use first recipe, specify target product)
                const inputCost = this.calculateRecipeCost(
                    inputRecipes[0],
                    maxDepth - 1,
                    visited,
                    input.productId // ✅ SPECIFY TARGET PRODUCT
                );

                cost.workerMonths += inputCost.workerMonths * quantityPerUnit;
                cost.maintenanceMonths += inputCost.maintenanceMonths * quantityPerUnit;
                cost.electricityKwMonths += inputCost.electricityKwMonths * quantityPerUnit;
                cost.computingMonths += inputCost.computingMonths * quantityPerUnit;
                cost.waterMonths += inputCost.waterMonths * quantityPerUnit;
                cost.ammoniaMonths += inputCost.ammoniaMonths * quantityPerUnit;

                if (inputCost.waterMonths > 0 || inputCost.ammoniaMonths > 0) {
                    console.log(`  -> ${inputProduct.name} contributes: water=${inputCost.waterMonths.toFixed(6)}, ammonia=${inputCost.ammoniaMonths.toFixed(6)}`);
                }
            }
        });

        return cost;
    }

    /**
     * Get empty cost structure
     */
    static getEmptyCost() {
        return {
            workerMonths: 0,
            maintenanceMonths: 0,
            electricityKwMonths: 0,
            computingMonths: 0,
            waterMonths: 0,
            ammoniaMonths: 0
        };
    }

    /**
     * Convert cost to total worker-equivalent MONTHS (not hours)
     * This is used for the core metrics
     */
    static normalizeToWorkerEquivalentMonths(cost) {
        // Convert everything to worker-equivalent months
        const workerMonths = cost.workerMonths;
        const maintenanceEq = cost.maintenanceMonths * (this.CONVERSION_FACTORS.maintenancePerMonth / 60); // Convert hours to months
        const electricityEq = cost.electricityKwMonths * (this.CONVERSION_FACTORS.electricityKwPerMonth / 60);
        const computingEq = cost.computingMonths * (this.CONVERSION_FACTORS.computingPerMonth / 60);
        const waterEq = cost.waterMonths * (this.CONVERSION_FACTORS.waterPerMonth / 60);
        const ammoniaEq = cost.ammoniaMonths * (this.CONVERSION_FACTORS.ammoniaPerMonth / 60);

        return workerMonths + maintenanceEq + electricityEq + computingEq + waterEq + ammoniaEq;
    }

    /**
     * Convert cost to total worker-equivalent hours (for display)
     */
    static normalizeToWorkerEquivalentHours(cost) {
        const workerHours = cost.workerMonths * 60;
        const maintenanceEq = cost.maintenanceMonths * this.CONVERSION_FACTORS.maintenancePerMonth;
        const electricityEq = cost.electricityKwMonths * this.CONVERSION_FACTORS.electricityKwPerMonth;
        const computingEq = cost.computingMonths * this.CONVERSION_FACTORS.computingPerMonth;
        const waterEq = cost.waterMonths * this.CONVERSION_FACTORS.waterPerMonth;
        const ammoniaEq = cost.ammoniaMonths * this.CONVERSION_FACTORS.ammoniaPerMonth;

        return {
            total: workerHours + maintenanceEq + electricityEq + computingEq + waterEq + ammoniaEq,
            breakdown: {
                workerHours,
                maintenanceEq,
                electricityEq,
                computingEq,
                waterEq,
                ammoniaEq
            }
        };
    }

    /**
     * Analyze a single fertilizer - average all its recipes
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

        console.log(`\nAnalyzing ${product.name} (${recipes.length} recipe${recipes.length > 1 ? 's' : ''})`);

        // Calculate cost for each recipe
        const recipeCosts = recipes.map(recipe => {
            console.log(`  Recipe: ${recipe.name || recipe.id}`);
            return this.calculateRecipeCost(recipe);
        });

        // Average the costs
        const avgCost = this.getEmptyCost();
        recipeCosts.forEach(cost => {
            avgCost.workerMonths += cost.workerMonths / recipeCosts.length;
            avgCost.maintenanceMonths += cost.maintenanceMonths / recipeCosts.length;
            avgCost.electricityKwMonths += cost.electricityKwMonths / recipeCosts.length;
            avgCost.computingMonths += cost.computingMonths / recipeCosts.length;
            avgCost.waterMonths += cost.waterMonths / recipeCosts.length;
            avgCost.ammoniaMonths += cost.ammoniaMonths / recipeCosts.length;
        });

        // Get normalized costs for display
        const normalizedHours = this.normalizeToWorkerEquivalentHours(avgCost);
        const fertilityPerUnit = product.fertilizer.fertilityPerQuantityPercent;

        // ✅ FIXED: Calculate the three values using NORMALIZED worker-equivalent months
        const totalWorkerEquivalentMonths = this.normalizeToWorkerEquivalentMonths(avgCost);
        const unitsPerWorkerMonth = 1 / totalWorkerEquivalentMonths;
        const fertilityPerWorkerMonth = fertilityPerUnit / totalWorkerEquivalentMonths;
        const workerMonthsPerUnit = totalWorkerEquivalentMonths;

        console.log(`  Average cost per unit:`, {
            workerMonths: avgCost.workerMonths.toFixed(6),
            maintenance: avgCost.maintenanceMonths.toFixed(6),
            electricity: avgCost.electricityKwMonths.toFixed(6),
            computing: avgCost.computingMonths.toFixed(6),
            water: avgCost.waterMonths.toFixed(6),
            ammonia: avgCost.ammoniaMonths.toFixed(6)
        });
        console.log(`  Total worker-equivalent months: ${totalWorkerEquivalentMonths.toFixed(6)}`);
        console.log(`  Total worker-equivalent hours: ${normalizedHours.total.toFixed(4)}`);

        return {
            fertilizerId,
            name: product.name,
            fertilityPerUnit,
            maxFertility: product.fertilizer.maxFertilityPercent,

            // Core metrics for FertilizerCalculator (now uses normalized values!)
            unitsPerWorkerMonth,
            fertilityPerWorkerMonth,
            workerMonthsPerUnit,

            // Detailed breakdown
            costPerUnit: avgCost,
            normalizedCostPerUnit: normalizedHours.total,
            costBreakdown: normalizedHours.breakdown,
            recipeCount: recipes.length,
            normalizationScale: 1
        };
    }

    /**
     * Analyze all fertilizers and generate replacement data for FertilizerCalculator
     */
    static generateReplacementData(fertilizerIds) {
        console.log('\n' + '='.repeat(80));
        console.log('FERTILIZER PRODUCTION COST ANALYSIS');
        console.log('='.repeat(80));
        console.log('Conversion Factors:', this.CONVERSION_FACTORS);
        console.log('');

        const results = [];
        const replacementData = {};

        fertilizerIds.forEach(id => {
            const analysis = this.analyzeFertilizer(id);
            if (analysis) {
                results.push(analysis);

                // Build replacement data in exact format for FertilizerCalculator
                replacementData[id] = {
                    unitsPerWorkerMonth: analysis.unitsPerWorkerMonth,
                    fertilityPerWorkerMonth: analysis.fertilityPerWorkerMonth,
                    workerMonthsPerUnit: analysis.workerMonthsPerUnit
                };
            }
        });

        // Sort by cost efficiency (cost per fertility point)
        results.sort((a, b) => {
            const costPerFertA = a.normalizedCostPerUnit / a.fertilityPerUnit;
            const costPerFertB = b.normalizedCostPerUnit / b.fertilityPerUnit;
            return costPerFertA - costPerFertB;
        });

        // Calculate relative efficiency
        if (results.length > 0) {
            const bestCostPerFert = results[0].normalizedCostPerUnit / results[0].fertilityPerUnit;
            results.forEach(r => {
                const costPerFert = r.normalizedCostPerUnit / r.fertilityPerUnit;
                r.costPerFertilityPoint = costPerFert;
                r.relativeEfficiency = bestCostPerFert / costPerFert;
                r.efficiencyRating = r.relativeEfficiency >= 0.9 ? 'Excellent' :
                    r.relativeEfficiency >= 0.7 ? 'Good' :
                        r.relativeEfficiency >= 0.5 ? 'Fair' : 'Poor';
            });
        }

        console.log('\n' + '='.repeat(80));
        console.log('RANKING (by cost per fertility point)');
        console.log('='.repeat(80));
        results.forEach((r, i) => {
            console.log(`${i + 1}. ${r.name}: ${r.costPerFertilityPoint.toFixed(4)} worker-eq hours per % fertility (${r.efficiencyRating})`);
        });

        console.log('\n' + '='.repeat(80));
        console.log('REPLACEMENT DATA FOR FertilizerCalculator.FERTILIZER_PRODUCTION_COSTS');
        console.log('='.repeat(80));
        console.log(JSON.stringify(replacementData, null, 2));
        console.log('='.repeat(80) + '\n');

        return {
            results,
            replacementData
        };
    }

    /**
     * Update conversion factors
     */
    static updateConversionFactors(newFactors) {
        Object.assign(this.CONVERSION_FACTORS, newFactors);
        console.log('Updated conversion factors:', this.CONVERSION_FACTORS);
    }

    /**
     * Get current conversion factors
     */
    static getConversionFactors() {
        return { ...this.CONVERSION_FACTORS };
    }
}