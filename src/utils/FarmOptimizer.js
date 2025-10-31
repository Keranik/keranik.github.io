import ProductionCalculator from './ProductionCalculator';
import { FoodChainResolver } from './FoodChainResolver';
import { FarmConstants } from './FarmConstants';

export class FarmOptimizer {

    /**
     * Calculate people fed WITH full processing chain details
     * Returns: { peopleFed, processingChains, totalProcessingWater, foodCategories }
     */
    static calculatePeopleFedWithChains(production, farmWaterUsage = 0, foodConsumptionMult = 1.0, allowedIntermediates = []) {
        let totalPeopleFed = 0;
        const processingChains = [];
        let totalProcessingWater = 0;
        const foodCategoriesUsed = new Set();
        const foodCategoryDetails = new Map();

        for (const [productId, quantityPerMonth] of Object.entries(production)) {
            // Check if directly edible
            const directFood = ProductionCalculator.foods?.find(f => f.productId === productId);

            if (directFood) {
                // Direct food - no processing needed
                const consumptionPer100 = directFood.consumedPerHundredPopsPerMonth * foodConsumptionMult;
                if (consumptionPer100 > 0) {
                    const peopleFed = (quantityPerMonth / consumptionPer100) * 100;
                    totalPeopleFed += peopleFed;

                    const category = ProductionCalculator.foodCategories?.find(c => c.id === directFood.categoryId);
                    if (category) {
                        foodCategoriesUsed.add(directFood.categoryId);
                        const current = foodCategoryDetails.get(directFood.categoryId) || {
                            name: category.name,
                            hasHealthBenefit: category.hasHealthBenefit,
                            peopleFed: 0
                        };
                        current.peopleFed += peopleFed;
                        foodCategoryDetails.set(directFood.categoryId, current);
                    }

                    processingChains.push({
                        cropProductId: productId,
                        finalFoodProductId: productId,
                        peopleFed: peopleFed,
                        isDirect: true,
                        recipes: [],
                        machines: [],
                        waterPerDay: 0,
                        foodCategory: directFood.categoryId
                    });
                }
            } else {
                // Use forward search
                const foodPaths = FoodChainResolver.getFoodsFromCrop(productId);

                if (foodPaths.length > 0) {
                    let bestPath = null;
                    let bestValue = 0;

                    for (const path of foodPaths) {
                        if (allowedIntermediates !== null) {
                            const usesDisallowedIntermediate = path.processingChain?.some(step => {
                                const isFood = ProductionCalculator.foods?.some(f => f.productId === step.outputProductId);

                                if (!isFood) {
                                    return !allowedIntermediates.includes(step.outputProductId);
                                }

                                return false;
                            });

                            if (usesDisallowedIntermediate) {
                                continue; // Skip this path
                            }
                        }

                        const food = ProductionCalculator.foods?.find(f => f.productId === path.finalFoodProductId);
                        if (!food) continue;

                        const foodUnitsPerMonth = quantityPerMonth / path.conversionRatio;
                        const peopleFed = FoodChainResolver.calculateFoodValue(food, foodUnitsPerMonth, foodConsumptionMult);

                        const processingDetails = this.calculateProcessingRequirements(
                            productId,
                            quantityPerMonth,
                            path.processingChain
                        );

                        if (peopleFed > bestValue) {
                            bestValue = peopleFed;
                            bestPath = {
                                cropProductId: productId,
                                finalFoodProductId: path.finalFoodProductId,
                                peopleFed: peopleFed,
                                isDirect: false,
                                processingChain: path.processingChain,
                                foodCategory: food.categoryId,
                                ...processingDetails
                            };
                        }
                    }

                    if (bestPath) {
                        totalPeopleFed += bestPath.peopleFed;
                        processingChains.push(bestPath);
                        totalProcessingWater += bestPath.waterPerDay || 0;

                        const food = ProductionCalculator.foods?.find(f => f.productId === bestPath.finalFoodProductId);
                        if (food) {
                            const category = ProductionCalculator.foodCategories?.find(c => c.id === food.categoryId);
                            if (category) {
                                foodCategoriesUsed.add(food.categoryId);
                                const current = foodCategoryDetails.get(food.categoryId) || {
                                    name: category.name,
                                    hasHealthBenefit: category.hasHealthBenefit,
                                    peopleFed: 0
                                };
                                current.peopleFed += bestPath.peopleFed;
                                foodCategoryDetails.set(food.categoryId, current);
                            }
                        }
                    }
                }
            }
        }

        return {
            peopleFed: totalPeopleFed,
            processingChains,
            totalProcessingWater,
            totalWaterPerDay: farmWaterUsage + totalProcessingWater,
            foodCategories: {
                count: foodCategoriesUsed.size,
                categories: Array.from(foodCategoryDetails.entries()).map(([id, data]) => ({
                    id,
                    ...data
                })),
                hasHealthBenefit: Array.from(foodCategoryDetails.values()).some(c => c.hasHealthBenefit)
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
     * Manual mode: User specifies processing recipes
     */
    static calculatePeopleFedManual(production, selectedRecipes, farmWaterUsage = 0, foodConsumptionMult = 1.0) {
        // selectedRecipes = { "Wheat": "RecipeBread", "Soybean": "RecipeSoybeanOil", ... }

        let totalPeopleFed = 0;
        const processingChains = [];
        let totalProcessingWater = 0;
        const foodCategoriesUsed = new Set();
        const foodCategoryDetails = new Map();

        for (const [productId, quantityPerMonth] of Object.entries(production)) {
            const directFood = ProductionCalculator.foods?.find(f => f.productId === productId);

            if (directFood) {
                // Direct food
                const consumptionPer100 = directFood.consumedPerHundredPopsPerMonth * foodConsumptionMult;
                if (consumptionPer100 > 0) {
                    const peopleFed = (quantityPerMonth / consumptionPer100) * 100;
                    totalPeopleFed += peopleFed;

                    // Track category
                    const category = ProductionCalculator.foodCategories?.find(c => c.id === directFood.categoryId);
                    if (category) {
                        foodCategoriesUsed.add(directFood.categoryId);
                        const current = foodCategoryDetails.get(directFood.categoryId) || {
                            name: category.name,
                            hasHealthBenefit: category.hasHealthBenefit,
                            peopleFed: 0
                        };
                        current.peopleFed += peopleFed;
                        foodCategoryDetails.set(directFood.categoryId, current);
                    }

                    processingChains.push({
                        cropProductId: productId,
                        finalFoodProductId: productId,
                        peopleFed: peopleFed,
                        isDirect: true,
                        foodCategory: directFood.categoryId
                    });
                }
            } else {
                // Use user-selected recipe if available
                const selectedRecipeId = selectedRecipes?.[productId];
                if (!selectedRecipeId) {
                    // No recipe selected - can't calculate, skip this product
                    console.warn(`No recipe selected for ${productId}`);
                    continue;
                }

                // Trace the selected recipe to final food
                const result = this.traceRecipeToFood(productId, quantityPerMonth, selectedRecipeId, foodConsumptionMult);
                if (result) {
                    totalPeopleFed += result.peopleFed;
                    processingChains.push(result);
                    totalProcessingWater += result.waterPerDay || 0;

                    // Track category
                    if (result.foodCategory) {
                        const category = ProductionCalculator.foodCategories?.find(c => c.id === result.foodCategory);
                        if (category) {
                            foodCategoriesUsed.add(result.foodCategory);
                            const current = foodCategoryDetails.get(result.foodCategory) || {
                                name: category.name,
                                hasHealthBenefit: category.hasHealthBenefit,
                                peopleFed: 0
                            };
                            current.peopleFed += result.peopleFed;
                            foodCategoryDetails.set(result.foodCategory, current);
                        }
                    }
                }
            }
        }

        return {
            peopleFed: totalPeopleFed,
            processingChains,
            totalProcessingWater,
            totalWaterPerDay: farmWaterUsage + totalProcessingWater,
            foodCategories: {
                count: foodCategoriesUsed.size,
                categories: Array.from(foodCategoryDetails.entries()).map(([id, data]) => ({
                    id,
                    ...data
                })),
                hasHealthBenefit: Array.from(foodCategoryDetails.values()).some(c => c.hasHealthBenefit)
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
     * Calculate crop production per month for a farm
     * CHANGED: Now accepts targetFertility parameter for fertility-based yield calculation
     */
    static calculateCropYield(crop, farm, targetFertility = 100) {
        // Use fertility-adjusted yield calculation
        return this.calculateActualYield(crop, farm, targetFertility);
    }

    /**
     * NEW METHOD: Calculate actual yield based on fertility simulation
     * Simulates day-by-day fertility changes during crop growth
     */
    static calculateActualYield(crop, farm, startingFertility) {
        const baseProduction = crop.output.quantity * farm.effectiveYieldMult;

        let currentFertility = startingFertility;
        let yieldPercentSum = 0;

        // Simulate each day of growth
        for (let day = 0; day < crop.growthDays; day++) {
            // Accumulate yield based on current fertility percentage
            yieldPercentSum += currentFertility;

            // Apply fertility consumption
            let fertilityChange = -crop.fertilityPerDayPercent;

            // Extra consumption if fertility > 100% (from FarmData.cs: CROP_FERTILITY_DEMAND_MULT = 2.0)
            if (currentFertility > 100 && fertilityChange < 0) {
                const extraConsumption = fertilityChange * ((currentFertility - 100) / 100) * 2.0;
                fertilityChange += extraConsumption; // Makes it more negative
            }

            currentFertility += fertilityChange;

            // Natural replenishment: 1% of missing fertility per day
            let replenish = (100 - currentFertility) * farm.effectiveFertilityReplenish;

            // Slower replenishment above 100% (OVER_100_REPLENISH_MULT = 0.2)
            if (currentFertility > 100) {
                replenish *= 0.2;
            }

            currentFertility += replenish;
        }

        // Calculate average fertility over growth period
        const avgFertility = yieldPercentSum / crop.growthDays;

        // Final yield based on average fertility
        const actualYield = baseProduction * (avgFertility / 100);

        // Convert to per-month basis (30 days)
        const productionPerMonth = (actualYield / crop.growthDays) * 30;

        return productionPerMonth;
    }

    /**
     * Calculate water needs per day for a crop on a farm
     */
    static calculateWaterPerDay(crop, farm) {
        return crop.waterPerDay * farm.effectiveWaterMult;
    }

    /**
     * ✅ CORRECT: Calculate fertility equilibrium for a rotation
     * Matches Farm.cs recomputeRotationStats() exactly
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
        // NaturalFertilityEquilibrium = (Percent.Hundred - m_avgFertilityUsedPerDay / Prototype.FertilityReplenishPerDay).Max(Percent.Zero)
        const naturalEquilibrium = Math.max(0, Math.min(200,
            100 - (avgFertilityPerDay / replenishRate)
        ));

        return {
            naturalEquilibrium,
            avgFertilityPerDay, // This is the CONSUMPTION rate (positive)
            totalRotationDays: totalDays,
            fertilityDeficit: Math.max(0, avgFertilityPerDay - replenishRate)
        };
    }

    /**
     * Calculate fertilizer requirements for target fertility
     */
    static calculateFertilizerNeeds(targetFertility, naturalEquilibrium, avgFertilityPerDay, farmCount = 1) {
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
        const fertilizers = ProductionCalculator.fertilizers
            ?.filter(f => f.maxFertility >= targetFertility)
            .sort((a, b) => b.fertilityPerQuantity - a.fertilityPerQuantity);

        if (!fertilizers || fertilizers.length === 0) {
            return {
                needed: true,
                error: `No fertilizer can reach ${targetFertility}% fertility`,
                quantityPerDay: 0
            };
        }

        const fertilizer = fertilizers[0];

        // Calculate quantity needed per day per farm
        const quantityPerDayPerFarm = extraFertilityNeeded / fertilizer.fertilityPerQuantity;
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