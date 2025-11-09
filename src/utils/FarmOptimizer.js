// src/utils/FarmOptimizer.js - COMPLETE UPDATED VERSION
import ProductionCalculator from './ProductionCalculator';
import { FoodChainResolver } from './FoodChainResolver';
import { FarmConstants } from './FarmConstants';

export class FarmOptimizer {

    /**
     * Calculate people fed with automatic chain optimization
     * @param {Object} production - Map of productId to quantity per month
     * @param {number} farmWaterPerDay - Water consumed by farm per day
     * @param {number} foodConsumptionMult - Food consumption multiplier
     * @param {Array|null} allowedIntermediates - Allowed intermediate products
     * @param {Array|null} allowedRecipes - Optional filter for allowed recipes
     * @returns {Object} People fed, processing chains, water usage
     */
    static calculatePeopleFedWithChains(production, farmWaterPerDay, foodConsumptionMult = 1.0, allowedIntermediates = null, allowedRecipes = null) {
        let totalPeopleFed = 0;
        let totalProcessingWater = 0;
        const processingChains = [];
        const foodCategoriesMap = new Map();

        Object.entries(production).forEach(([productId, quantity]) => {
            // Get all possible food paths from this crop
            const foodPaths = FoodChainResolver.getFoodsFromCrop(productId);

            // Filter paths based on allowed intermediates and recipes
            const viablePaths = foodPaths.filter(path => {
                // Check intermediate filter
                if (allowedIntermediates !== null) {
                    const pathIntermediates = path.processingChain
                        .map(step => step.outputProductId)
                        .filter(prodId => {
                            const isFood = ProductionCalculator.foods?.some(f => f.productId === prodId);
                            return !isFood; // Only intermediates, not final foods
                        });

                    // If path requires intermediates not in allowed list, skip it
                    if (pathIntermediates.some(interId => !allowedIntermediates.includes(interId))) {
                        return false;
                    }
                }

                // Check recipe filter
                if (allowedRecipes !== null) {
                    // If any recipe in the chain is not allowed, skip this path
                    if (path.recipeChain.some(recipeId => !allowedRecipes.includes(recipeId))) {
                        return false;
                    }
                }

                return true;
            });

            if (viablePaths.length === 0) {
                return; // No viable paths for this crop
            }

            // Choose the best path (highest people fed per unit of crop)
            let bestPath = null;
            let bestPeopleFed = 0;

            viablePaths.forEach(path => {
                const foodProduct = ProductionCalculator.getProduct(path.finalFoodProductId);
                const food = ProductionCalculator.foods?.find(f => f.productId === path.finalFoodProductId);

                if (food) {
                    const finalFoodQuantity = quantity * path.conversionRatio;
                    const peopleFed = (finalFoodQuantity / food.consumedPerHundredPopsPerMonth) * 100 / foodConsumptionMult;

                    if (peopleFed > bestPeopleFed) {
                        bestPeopleFed = peopleFed;
                        bestPath = path;
                    }
                }
            });

            if (bestPath) {
                const food = ProductionCalculator.foods?.find(f => f.productId === bestPath.finalFoodProductId);
                totalPeopleFed += bestPeopleFed;

                // Calculate processing requirements
                const chainWater = this.calculateChainWater(bestPath, quantity);
                const chainMachines = this.calculateChainMachines(bestPath, quantity);
                totalProcessingWater += chainWater;

                // Track food category
                const category = ProductionCalculator.foodCategories?.find(c => c.id === food.categoryId);
                if (category) {
                    const current = foodCategoriesMap.get(category.id) || {
                        id: category.id,
                        name: category.name,
                        hasHealthBenefit: category.hasHealthBenefit,
                        peopleFed: 0
                    };
                    current.peopleFed += bestPeopleFed;
                    foodCategoriesMap.set(category.id, current);
                }

                processingChains.push({
                    cropProductId: productId,
                    finalFoodProductId: bestPath.finalFoodProductId,
                    recipeChain: bestPath.recipeChain,
                    conversionRatio: bestPath.conversionRatio,
                    peopleFed: bestPeopleFed,
                    machines: chainMachines,
                    waterPerDay: chainWater,
                    isDirect: bestPath.processingChain.length === 0,
                    foodCategory: food.categoryId
                });
            }
        });

        return {
            peopleFed: totalPeopleFed,
            totalWaterPerDay: farmWaterPerDay + totalProcessingWater,
            totalProcessingWater: totalProcessingWater,
            processingChains,
            foodCategories: {
                categories: Array.from(foodCategoriesMap.values()),
                count: foodCategoriesMap.size
            }
        };
    }

    /**
     * Calculate machine and water requirements for a processing chain
     */
    static calculateProcessingRequirements(inputProductId, inputQuantityPerMonth, processingChain) {
        const machines = [];
        let totalWaterPerDay = 0;
        let totalElectricityKw = 0;
        let totalWorkers = 0;

        if (!processingChain || processingChain.length === 0) {
            return { machines: [], waterPerDay: 0, electricityKw: 0, workers: 0 };
        }

        // Work through each step in the chain
        let currentQuantityPerMonth = inputQuantityPerMonth;

        for (const step of processingChain) {
            const recipe = ProductionCalculator.recipes?.find(r => r.id === step.recipeId);
            if (!recipe) continue;

            // Find machines that can run this recipe
            const recipeMachines = ProductionCalculator.getMachinesForRecipe(recipe.id);
            if (recipeMachines.length === 0) continue;

            const machine = recipeMachines[0]; // Use first available machine

            // Calculate required output for this step
            const requiredOutputPerMonth = currentQuantityPerMonth * (step.outputQuantity / step.inputQuantity);

            // Calculate cycles needed per month
            const outputPerCycle = step.outputQuantity;
            const cyclesNeededPerMonth = requiredOutputPerMonth / outputPerCycle;

            // Calculate machine count needed
            const cycleDurationSeconds = recipe.durationSeconds;
            const cyclesPerMinute = 60 / cycleDurationSeconds;
            const cyclesPerMonthPerMachine = cyclesPerMinute * 60 * 24 * 30; // Total cycles possible per month per machine
            const machineCount = Math.ceil(cyclesNeededPerMonth / cyclesPerMonthPerMachine);

            // Water consumption from recipe inputs
            const waterInput = recipe.inputs.find(i => {
                const product = ProductionCalculator.getProduct(i.productId);
                return product?.name?.toLowerCase().includes('water');
            });

            if (waterInput) {
                const waterPerCycle = waterInput.quantity;
                const cyclesPerDay = (cyclesNeededPerMonth / 30);
                const waterPerDay = waterPerCycle * cyclesPerDay;
                totalWaterPerDay += waterPerDay;
            }

            // Machine resource requirements
            totalElectricityKw += (machine.electricityKw || 0) * machineCount;
            totalWorkers += (machine.workers || 0) * machineCount;

            machines.push({
                machineId: machine.id,
                machineName: machine.name,
                recipeId: recipe.id,
                recipeName: recipe.name,
                count: machineCount,
                inputProductId: step.inputProductId,
                outputProductId: step.outputProductId,
                electricityKw: machine.electricityKw || 0,
                workers: machine.workers || 0
            });

            // Update quantity for next step
            currentQuantityPerMonth = requiredOutputPerMonth;
        }

        return {
            machines,
            waterPerDay: totalWaterPerDay,
            electricityKw: totalElectricityKw,
            workers: totalWorkers
        };
    }

    /**
     * Calculate people fed in manual mode with specific recipe selections
     * @param {Object} production - Map of productId to quantity per month
     * @param {Object} selectedRecipes - Map of productId to selected recipeId
     * @param {number} farmWaterPerDay - Water consumed by farm per day
     * @param {number} foodConsumptionMult - Food consumption multiplier
     * @param {Array|null} allowedRecipes - Optional filter for allowed recipes
     * @returns {Object} People fed, processing chains, water usage
     */
    static calculatePeopleFedManual(production, selectedRecipes, farmWaterPerDay, foodConsumptionMult = 1.0, allowedRecipes = null) {
        let totalPeopleFed = 0;
        let totalProcessingWater = 0;
        const processingChains = [];
        const foodCategoriesMap = new Map();

        Object.entries(production).forEach(([productId, quantity]) => {
            // Check if this crop has a manually selected recipe
            const selectedRecipeId = selectedRecipes[productId];

            if (selectedRecipeId) {
                // Use the selected recipe chain
                const recipe = ProductionCalculator.getRecipe(selectedRecipeId);

                // Apply recipe filter if specified
                if (allowedRecipes && !allowedRecipes.includes(selectedRecipeId)) {
                    return; // Skip this recipe
                }

                if (recipe) {
                    const foodPaths = FoodChainResolver.getFoodsFromCrop(productId);
                    const matchingPath = foodPaths.find(path => path.recipeChain[0] === selectedRecipeId);

                    if (matchingPath) {
                        const foodProduct = ProductionCalculator.getProduct(matchingPath.finalFoodProductId);
                        const food = ProductionCalculator.foods?.find(f => f.productId === matchingPath.finalFoodProductId);

                        if (food) {
                            const finalFoodQuantity = quantity * matchingPath.conversionRatio;
                            const peopleFedByThisChain = (finalFoodQuantity / food.consumedPerHundredPopsPerMonth) * 100 / foodConsumptionMult;
                            totalPeopleFed += peopleFedByThisChain;

                            // Calculate processing requirements
                            const chainWater = this.calculateChainWater(matchingPath, quantity);
                            const chainMachines = this.calculateChainMachines(matchingPath, quantity);
                            totalProcessingWater += chainWater;

                            // Track food category
                            const category = ProductionCalculator.foodCategories?.find(c => c.id === food.categoryId);
                            if (category) {
                                const current = foodCategoriesMap.get(category.id) || {
                                    id: category.id,
                                    name: category.name,
                                    hasHealthBenefit: category.hasHealthBenefit,
                                    peopleFed: 0
                                };
                                current.peopleFed += peopleFedByThisChain;
                                foodCategoriesMap.set(category.id, current);
                            }

                            processingChains.push({
                                cropProductId: productId,
                                finalFoodProductId: matchingPath.finalFoodProductId,
                                recipeChain: matchingPath.recipeChain,
                                conversionRatio: matchingPath.conversionRatio,
                                peopleFed: peopleFedByThisChain,
                                machines: chainMachines,
                                waterPerDay: chainWater,
                                isDirect: false,
                                foodCategory: food.categoryId
                            });
                        }
                    }
                }
            } else {
                // No recipe selected - check if it's directly edible
                const food = ProductionCalculator.foods?.find(f => f.productId === productId);
                if (food) {
                    const peopleFedByThisFood = (quantity / food.consumedPerHundredPopsPerMonth) * 100 / foodConsumptionMult;
                    totalPeopleFed += peopleFedByThisFood;

                    // Track food category
                    const category = ProductionCalculator.foodCategories?.find(c => c.id === food.categoryId);
                    if (category) {
                        const current = foodCategoriesMap.get(category.id) || {
                            id: category.id,
                            name: category.name,
                            hasHealthBenefit: category.hasHealthBenefit,
                            peopleFed: 0
                        };
                        current.peopleFed += peopleFedByThisFood;
                        foodCategoriesMap.set(category.id, current);
                    }

                    processingChains.push({
                        cropProductId: productId,
                        finalFoodProductId: productId,
                        recipeChain: [],
                        conversionRatio: 1.0,
                        peopleFed: peopleFedByThisFood,
                        machines: [],
                        waterPerDay: 0,
                        isDirect: true,
                        foodCategory: food.categoryId
                    });
                }
            }
        });

        return {
            peopleFed: totalPeopleFed,
            totalWaterPerDay: farmWaterPerDay + totalProcessingWater,
            totalProcessingWater: totalProcessingWater,
            processingChains,
            foodCategories: {
                categories: Array.from(foodCategoriesMap.values()),
                count: foodCategoriesMap.size
            }
        };
    }

    /**
     * Trace a specific recipe chain to find final food product
     */
    static traceRecipeToFood(startProductId, quantityPerMonth, recipeId, foodConsumptionMult = 1.0) {
        const recipe = ProductionCalculator.recipes?.find(r => r.id === recipeId);
        if (!recipe) return null;

        // Check if this recipe produces a food directly
        const output = recipe.outputs.find(o => {
            const food = ProductionCalculator.foods?.find(f => f.productId === o.productId);
            return food != null;
        });

        if (output) {
            // Found food!
            const food = ProductionCalculator.foods.find(f => f.productId === output.productId);
            const outputQuantityPerMonth = quantityPerMonth * (output.quantity / recipe.inputs[0].quantity);

            const consumptionPer100 = food.consumedPerHundredPopsPerMonth * foodConsumptionMult;
            const peopleFed = consumptionPer100 > 0 ? (outputQuantityPerMonth / consumptionPer100) * 100 : 0;

            // Calculate processing requirements
            const processingDetails = this.calculateProcessingRequirements(
                startProductId,
                quantityPerMonth,
                [{
                    recipeId: recipe.id,
                    recipeName: recipe.name,
                    inputProductId: recipe.inputs[0].productId,
                    outputProductId: output.productId,
                    inputQuantity: recipe.inputs[0].quantity,
                    outputQuantity: output.quantity
                }]
            );

            return {
                cropProductId: startProductId,
                finalFoodProductId: output.productId,
                peopleFed,
                isDirect: false,
                processingChain: [{
                    recipeId: recipe.id,
                    recipeName: recipe.name,
                    inputProductId: startProductId,
                    outputProductId: output.productId
                }],
                foodCategory: food.categoryId,
                ...processingDetails
            };
        }

        return null;
    }

    /**
     * Calculate effective farm stats with all multipliers (additive stacking)
     */
    static calculateEffectiveFarmStats(farm, edictIds, research) {
        const farmProto = ProductionCalculator.farms.find(f => f.id === farm.farmId);
        if (!farmProto) return null;

        let yieldMult = farmProto.yieldMultiplierPercent;
        let waterMult = farmProto.demandsMultiplierPercent;

        // Apply edicts (additive)
        const farmYieldEdicts = this.getActiveEdictBonuses(edictIds, 'FarmYield');
        farmYieldEdicts.forEach(bonus => {
            yieldMult += bonus.yieldBonus;
            waterMult += bonus.waterIncrease;
        });

        // Apply research (additive)
        const cropYieldBonus = (research.cropYield || 0) * 1.0; // +1% per level
        const waterReductionBonus = (research.waterReduction || 0) * -1.0; // -1% per level

        yieldMult += cropYieldBonus;
        waterMult += waterReductionBonus;

        return {
            ...farmProto,
            name: farmProto.name,
            originalYield: farmProto.yieldMultiplierPercent,
            originalWater: farmProto.demandsMultiplierPercent,
            effectiveYieldMult: yieldMult / 100, // Convert to decimal
            effectiveWaterMult: waterMult / 100,
            effectiveFertilityReplenish: farmProto.fertilityReplenishPercent
        };
    }

    /**
     * Get active edict bonuses
     */
    static getActiveEdictBonuses(edictIds, type) {
        const bonuses = [];
        edictIds.forEach(id => {
            const research = ProductionCalculator.farmResearch?.find(r => r.id === id);
            if (research && research.perLevelBonuses) {
                if (type === 'FarmYield' && research.perLevelBonuses['FarmYieldMultiplier']) {
                    bonuses.push({
                        yieldBonus: research.perLevelBonuses['FarmYieldMultiplier'] * 100,
                        waterIncrease: research.perLevelBonuses['FarmWaterConsumptionMultiplier'] * 100
                    });
                }
            }
        });
        return bonuses;
    }

    /**
     * ✅ UPDATED: Calculate crop production per month for a farm
     * Now properly uses fertility parameter for yield calculation
     * @param {Object} crop - Crop data from ProductionCalculator
     * @param {Object} farm - Effective farm stats with multipliers
     * @param {number} fertility - Current fertility level (0-200%)
     * @returns {number} Production per month
     */
    static calculateCropYield(crop, farm, fertility = 100) {
        // Use fertility-adjusted yield calculation
        return this.calculateActualYield(crop, farm, fertility);
    }

    /**
     * ✅ UPDATED: Calculate actual yield based on fertility
     * Formula from Farm.cs recomputeYieldEstimates():
     * YieldPerYear = baseYield × (360 / growthDays) × (fertility / 100) × yieldMult
     * YieldPerMonth = YieldPerYear / 12
     * 
     * @param {Object} crop - Crop data
     * @param {Object} farm - Farm with effective multipliers
     * @param {number} fertility - Fertility percentage (0-200)
     * @returns {number} Yield per month
     */
    static calculateActualYield(crop, farm, fertility) {
        // Base production: crop output × farm yield multiplier
        const baseProduction = crop.output.quantity * farm.effectiveYieldMult;

        // Convert to per-year basis (360 days per year in game)
        const perYearMultiplier = 360 / crop.growthDays;

        // Apply fertility (convert percentage to decimal)
        const fertilityMultiplier = fertility / 100;

        // Calculate yield per year
        const yieldPerYear = baseProduction * perYearMultiplier * fertilityMultiplier;

        // Convert to per-month (12 months per year)
        const yieldPerMonth = yieldPerYear / 12;

        return yieldPerMonth;
    }

    /**
     * Calculate water needs per day for a crop on a farm
     * @param {Object} crop - Crop data
     * @param {Object} farm - Farm with effective multipliers
     * @returns {number} Water per day
     */
    static calculateWaterPerDay(crop, farm) {
        return crop.waterPerDay * farm.effectiveWaterMult;
    }

    /**
     * Calculate water requirements for a processing chain
     * @param {Object} path - Food chain path from FoodChainResolver
     * @param {number} inputQuantity - Input crop quantity per month
     * @returns {number} Water per day
     */
    static calculateChainWater(path, inputQuantity) {
        let totalWaterPerMonth = 0;

        path.processingChain?.forEach(step => {
            const recipe = ProductionCalculator.getRecipe(step.recipeId);
            if (recipe) {
                const machine = ProductionCalculator.getMachine(recipe.machineId);
                if (machine) {
                    // Calculate how many times this recipe runs per month
                    const inputForThisStep = inputQuantity * step.inputRatio;
                    const recipeInput = recipe.inputs.find(i => i.productId === step.inputProductId);
                    if (recipeInput) {
                        const recipesPerMonth = inputForThisStep / recipeInput.quantity;
                        const monthsPerRecipe = recipe.durationSeconds / (30 * 24 * 60 * 60); // Convert to months
                        const machineCount = recipesPerMonth * monthsPerRecipe;

                        // Add water consumption if machine uses water
                        const waterInput = recipe.inputs.find(i => i.productId === 'Product_Water');
                        if (waterInput) {
                            totalWaterPerMonth += waterInput.quantity * recipesPerMonth;
                        }
                    }
                }
            }
        });

        return totalWaterPerMonth / 30; // Convert to per day
    }

    /**
     * Calculate machine requirements for a processing chain
     * @param {Object} path - Food chain path from FoodChainResolver
     * @param {number} inputQuantity - Input crop quantity per month
     * @returns {Array} Machine requirements
     */
    static calculateChainMachines(path, inputQuantity) {
        const machineMap = new Map();

        path.processingChain?.forEach(step => {
            const recipe = ProductionCalculator.getRecipe(step.recipeId);
            if (recipe) {
                const machine = ProductionCalculator.getMachine(recipe.machineId);
                if (machine) {
                    // Calculate how many times this recipe runs per month
                    const inputForThisStep = inputQuantity * step.inputRatio;
                    const recipeInput = recipe.inputs.find(i => i.productId === step.inputProductId);
                    if (recipeInput) {
                        const recipesPerMonth = inputForThisStep / recipeInput.quantity;
                        const monthsPerRecipe = recipe.durationSeconds / (30 * 24 * 60 * 60); // Convert to months
                        const machineCount = recipesPerMonth * monthsPerRecipe;

                        // Aggregate machine counts
                        const current = machineMap.get(machine.id) || {
                            machineId: machine.id,
                            machineName: machine.name,
                            count: 0,
                            electricityKw: machine.electricityKw || 0,
                            workers: machine.workers || 0
                        };
                        current.count += machineCount;
                        machineMap.set(machine.id, current);
                    }
                }
            }
        });

        return Array.from(machineMap.values());
    }

    /**
     * ✅ CORRECT: Calculate fertility equilibrium for a rotation
     * Matches Farm.cs recomputeRotationStats() exactly
     * Accounts for monoculture penalty (50% extra consumption for same crop)
     * 
     * @param {Array} rotation - Array of crop IDs (can include nulls)
     * @param {Object} farm - Farm with effective stats
     * @returns {Object} Fertility equilibrium data
     */
    static calculateFertilityEquilibrium(rotation, farm) {
        // Filter out empty slots
        const nonEmptyCrops = rotation
            .map(cropId => cropId ? ProductionCalculator.crops.find(c => c.id === cropId) : null)
            .filter(crop => crop !== null);

        if (nonEmptyCrops.length === 0) {
            return {
                naturalEquilibrium: 100,
                avgFertilityPerDay: 0,
                totalRotationDays: 0,
                fertilityDeficit: 0
            };
        }

        let totalFertilityConsumed = 0; // Accumulated fertility consumption
        let totalDays = 0;

        // For steady-state: the "previous crop" before slot 0 is the LAST crop in rotation
        let prevCrop = null;
        for (let i = nonEmptyCrops.length - 1; i >= 0; i--) {
            if (!nonEmptyCrops[i].isEmptyCrop) {
                prevCrop = nonEmptyCrops[i];
                break;
            }
        }

        nonEmptyCrops.forEach((crop) => {
            // Get base consumption (already positive for consuming crops)
            let consumedFertilityPerDay = crop.fertilityPerDayPercent;

            // ✅ Apply 50% monoculture penalty for CONSUMING crops
            // From Farm.cs line 771: if (consumedFertilityPerDay.IsPositive && flag)
            const isSameCropAsPrevious = prevCrop && prevCrop.id === crop.id;
            if (consumedFertilityPerDay > 0 && isSameCropAsPrevious) {
                // From Farm.cs line 773:
                // consumedFertilityPerDay += consumedFertilityPerDay * FERTILITY_PENALTY_FOR_SAME_CROP
                // Which is: consumedFertilityPerDay *= (1 + 0.5) = 1.5
                consumedFertilityPerDay *= 1.5;
            }

            // Accumulate total consumption
            totalFertilityConsumed += consumedFertilityPerDay * crop.growthDays;
            totalDays += crop.growthDays;

            // Update previous crop (skip "empty" crops like green manure for tracking)
            if (!crop.isEmptyCrop) {
                prevCrop = crop;
            }
        });

        const avgFertilityPerDay = totalFertilityConsumed / totalDays;
        const replenishRate = farm.effectiveFertilityReplenish; // 1.0%

        // ✅ From Farm.cs line 777:
        // NaturalFertilityEquilibrium = (Percent.Hundred - m_avgFertilityUsedPerDay / Prototype.FertilityReplenish PerDay).Max(Percent.Zero)
        const naturalEquilibrium = Math.max(0, Math.min(200,
            100 - ((avgFertilityPerDay / replenishRate) * 100)
        ));

        return {
            naturalEquilibrium,
            avgFertilityPerDay, // This is the CONSUMPTION rate (positive)
            totalRotationDays: totalDays,
            fertilityDeficit: Math.max(0, avgFertilityPerDay - replenishRate)
        };
    }

    /**
     * ✅ DEPRECATED: Use FertilizerCalculator.calculateFertilizerOptions() instead
     * This function is kept for backwards compatibility only
     */
    static calculateFertilizerNeeds(targetFertility, naturalEquilibrium, avgFertilityPerDay, farmCount = 1) {
        console.warn('FarmOptimizer.calculateFertilizerNeeds() is deprecated. Use FertilizerCalculator.calculateFertilizerOptions() instead.');

        if (targetFertility <= naturalEquilibrium) {
            return {
                needed: false,
                fertilizer: null,
                quantityPerDay: 0,
                quantityPerMonth: 0
            };
        }

        const extraFertilityNeeded = (targetFertility - naturalEquilibrium);

        // Find best fertilizer that can reach target
        const fertilizers = ProductionCalculator.products
            ?.filter(p => p.fertilizer && p.fertilizer.maxFertilityPercent >= targetFertility)
            .sort((a, b) => b.fertilizer.fertilityPerQuantityPercent - a.fertilizer.fertilityPerQuantityPercent);

        if (!fertilizers || fertilizers.length === 0) {
            return {
                needed: true,
                error: `No fertilizer can reach ${targetFertility}% fertility`,
                quantityPerDay: 0
            };
        }

        const fertilizer = fertilizers[0];

        // Calculate quantity needed per day per farm
        const quantityPerDayPerFarm = extraFertilityNeeded / fertilizer.fertilizer.fertilityPerQuantityPercent;
        const totalQuantityPerDay = quantityPerDayPerFarm * farmCount;

        return {
            needed: true,
            fertilizer,
            quantityPerDay: totalQuantityPerDay,
            quantityPerMonth: totalQuantityPerDay * 30,
            quantityPerYear: totalQuantityPerDay * 360
        };
    }
}