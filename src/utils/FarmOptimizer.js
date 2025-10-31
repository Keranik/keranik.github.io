import ProductionCalculator from './ProductionCalculator';
import { FoodChainResolver } from './FoodChainResolver';
import { FarmConstants } from './FarmConstants';

export class FarmOptimizer {

    /**
     * Calculate people fed WITH full processing chain details
     * Returns: { peopleFed, processingChains, totalProcessingWater, foodCategories }
     */
    static calculatePeopleFedWithChains(production, farmWaterUsage = 0, foodConsumptionMult = 1.0) {
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
                // UPDATED: Use forward search instead of backward
                const foodPaths = FoodChainResolver.getFoodsFromCrop(productId);

                if (foodPaths.length > 0) {
                    let bestPath = null;
                    let bestValue = 0;

                    for (const path of foodPaths) {
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
     */
    static calculateCropYield(crop, farm) {
        const baseProduction = crop.output.quantity;
        const daysPerMonth = 30;
        const productionPerMonth = (baseProduction / crop.growthDays) * daysPerMonth;
        return productionPerMonth * farm.effectiveYieldMult;
    }

    /**
     * Calculate water needs per day for a crop on a farm
     */
    static calculateWaterPerDay(crop, farm) {
        return crop.waterPerDay * farm.effectiveWaterMult;
    }

    /**
     * Calculate fertility equilibrium for a rotation
     */
    static calculateFertilityEquilibrium(rotation, farm) {
        let totalFertilityUsed = 0;
        let totalDays = 0;
        let prevCrop = null;

        rotation.forEach((cropId, index) => {
            if (!cropId) return; // Empty slot

            const crop = ProductionCalculator.crops.find(c => c.id === cropId);
            if (!crop) return;

            let fertilityPerDay = crop.fertilityPerDayPercent;

            // Apply same-crop penalty (50% extra if same crop follows itself)
            if (prevCrop && prevCrop.id === crop.id && fertilityPerDay > 0) {
                fertilityPerDay *= (1 + FarmConstants.FERTILITY_PENALTY_FOR_SAME_CROP / 100);
            }

            totalFertilityUsed += fertilityPerDay * crop.growthDays;
            totalDays += crop.growthDays;
            prevCrop = crop;
        });

        if (totalDays === 0) return { naturalEquilibrium: 100, avgFertilityPerDay: 0 };

        const avgFertilityPerDay = totalFertilityUsed / totalDays;
        const replenishRate = farm.effectiveFertilityReplenish;
        const naturalEquilibrium = Math.max(0, 100 - (avgFertilityPerDay / replenishRate) * 100);

        return {
            naturalEquilibrium,
            avgFertilityPerDay,
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