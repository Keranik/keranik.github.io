// src/utils/FarmCalculationEngine.js
import ProductionCalculator from './ProductionCalculator';
import { FarmOptimizer } from './FarmOptimizer';
import { FertilizerCalculator } from './FertilizerCalculator';

export class FarmCalculationEngine {
    /**
     * Main calculation entry point
     * Pure function - no side effects
     */
    static calculate({
        farms,
        optimizationMode,
        constraints,
        research,
        selectedProcessingRecipes,
        foodConsumptionMultiplier
    }) {
        console.log('=== FarmCalculationEngine: Starting calculation ===');

        const availableFarms = ProductionCalculator.farms?.filter(f => f.type === 'crop') || [];
        const availableCrops = ProductionCalculator.crops || [];

        // Calculate each farm
        const detailedResults = farms.map((farm, farmIdx) =>
            this.calculateSingleFarm({
                farm,
                farmIdx,
                availableFarms,
                availableCrops,
                constraints,
                research,
                selectedProcessingRecipes,
                foodConsumptionMultiplier,
                optimizationMode
            })
        );

        // Aggregate results
        const aggregatedResults = this.aggregateResults(detailedResults);

        console.log('=== FarmCalculationEngine: Calculation complete ===');
        return {
            farms: detailedResults,
            totals: aggregatedResults
        };
    }

    /**
     * Calculate a single farm's production
     */
    static calculateSingleFarm({
        farm,
        farmIdx,
        availableFarms,
        availableCrops,
        constraints,
        research,
        selectedProcessingRecipes,
        foodConsumptionMultiplier,
        optimizationMode
    }) {
        const farmProto = availableFarms.find(f => f.id === farm.farmId);
        if (!farmProto) {
            throw new Error(`Farm ${farm.farmId} not found`);
        }

        const effectiveFarm = FarmOptimizer.calculateEffectiveFarmStats(farm, [], research);
        const rotation = farm.rotation || [null, null, null, null];
        const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(rotation, effectiveFarm);

        // Determine actual fertility
        let actualFertility = this.determineActualFertility(farm, fertilityInfo, constraints);

        // Calculate production at current fertility
        const { slotDetails, production, totalFarmWaterPerDay, totalRotationDays } =
            this.calculateProduction(rotation, effectiveFarm, actualFertility, availableCrops);

        // Calculate food production
        const foodResult = this.calculateFoodProduction({
            production,
            totalFarmWaterPerDay,
            optimizationMode,
            selectedProcessingRecipes,
            foodConsumptionMultiplier,
            constraints
        });

        // Calculate slot-level people fed
        const slotsWithPeopleFed = this.calculateSlotPeopleFed({
            slotDetails,
            totalRotationDays,
            optimizationMode,
            selectedProcessingRecipes,
            foodConsumptionMultiplier,
            constraints
        });

        // Calculate fertilizer options
        const fertilizerResult = this.calculateFertilizerOptions({
            farm,
            farmIdx,
            fertilityInfo,
            foodResult,
            actualFertility,
            constraints
        });

        // If fertilizer was auto-applied, recalculate everything
        if (fertilizerResult.autoApplied) {
            const recalculated = this.recalculateWithFertilizer({
                farm: fertilizerResult.updatedFarm,
                rotation,
                effectiveFarm,
                availableCrops,
                fertilityInfo,
                optimizationMode,
                selectedProcessingRecipes,
                foodConsumptionMultiplier,
                constraints
            });

            return {
                ...recalculated,
                bestFertilizerOption: fertilizerResult.bestOption,
                autoAppliedFertilizer: true
            };
        }

        const usingFertilizer = constraints.allowedFertilizers.length > 0 &&
            actualFertility > fertilityInfo.naturalEquilibrium &&
            farm.selectedFertilizerId !== null;

        return {
            farm,
            effectiveFarm,
            rotation,
            production,
            fertilityInfo,
            actualFertility,
            usingFertilizer,
            peopleFed: foodResult.peopleFed,
            totalWaterPerDay: foodResult.totalWaterPerDay,
            farmWaterPerDay: totalFarmWaterPerDay,
            processingWaterPerDay: foodResult.totalProcessingWater,
            totalRotationMonths: totalRotationDays / 30,
            processingChains: foodResult.processingChains,
            foodCategories: foodResult.foodCategories,
            slotDetails: slotsWithPeopleFed,
            bestFertilizerOption: fertilizerResult.bestOption,
            autoAppliedFertilizer: false
        };
    }

    static determineActualFertility(farm, fertilityInfo, constraints) {
        if (constraints.allowedFertilizers.length === 0) {
            return fertilityInfo.naturalEquilibrium;
        }
        if (farm.customFertility !== null && farm.customFertility !== undefined) {
            return farm.customFertility;
        }
        return fertilityInfo.naturalEquilibrium;
    }

    static calculateProduction(rotation, effectiveFarm, actualFertility, availableCrops) {
        const slotDetails = rotation
            .map(cropId => {
                if (!cropId) return null;
                const crop = availableCrops.find(c => c.id === cropId);
                if (!crop) return null;

                return {
                    cropId,
                    cropName: crop.name,
                    productionPerMonth: FarmOptimizer.calculateCropYield(crop, effectiveFarm, actualFertility),
                    waterPerDay: FarmOptimizer.calculateWaterPerDay(crop, effectiveFarm),
                    productId: crop.output.productId,
                    growthDays: crop.growthDays
                };
            })
            .filter(s => s !== null);

        const totalRotationDays = slotDetails.reduce((sum, s) => sum + s.growthDays, 0);
        const production = {};
        let totalFarmWaterPerDay = 0;

        slotDetails.forEach(slot => {
            const weight = totalRotationDays > 0 ? slot.growthDays / totalRotationDays : 0;
            const avgProductionPerMonth = slot.productionPerMonth * weight;
            production[slot.productId] = (production[slot.productId] || 0) + avgProductionPerMonth;
            totalFarmWaterPerDay += slot.waterPerDay * weight;
        });

        return { slotDetails, production, totalFarmWaterPerDay, totalRotationDays };
    }

    static calculateFoodProduction({
        production,
        totalFarmWaterPerDay,
        optimizationMode,
        selectedProcessingRecipes,
        foodConsumptionMultiplier,
        constraints
    }) {
        if (optimizationMode === 'manual') {
            return FarmOptimizer.calculatePeopleFedManual(
                production,
                Object.fromEntries(selectedProcessingRecipes),
                totalFarmWaterPerDay,
                foodConsumptionMultiplier,
                constraints.allowedRecipes
            );
        } else {
            return FarmOptimizer.calculatePeopleFedWithChains(
                production,
                totalFarmWaterPerDay,
                foodConsumptionMultiplier,
                constraints.allowedIntermediates,
                constraints.allowedRecipes
            );
        }
    }

    static calculateSlotPeopleFed({
        slotDetails,
        totalRotationDays,
        optimizationMode,
        selectedProcessingRecipes,
        foodConsumptionMultiplier,
        constraints
    }) {
        return slotDetails.map(slot => {
            const weight = totalRotationDays > 0 ? slot.growthDays / totalRotationDays : 0;
            const weightedProduction = slot.productionPerMonth * weight;
            const slotProduction = { [slot.productId]: weightedProduction };

            const slotFoodResult = this.calculateFoodProduction({
                production: slotProduction,
                totalFarmWaterPerDay: 0,
                optimizationMode,
                selectedProcessingRecipes,
                foodConsumptionMultiplier,
                constraints
            });

            return {
                ...slot,
                peopleFed: slotFoodResult.peopleFed,
                processingChain: slotFoodResult.processingChains[0] || null,
                weight,
                weightedProduction
            };
        });
    }

    static calculateFertilizerOptions({ farm, farmIdx, fertilityInfo, foodResult, actualFertility, constraints }) {
        if (constraints.allowedFertilizers.length === 0) {
            return { bestOption: null, autoApplied: false, updatedFarm: farm };
        }

        const baseYieldAtNatural = foodResult.peopleFed / (actualFertility / fertilityInfo.naturalEquilibrium);

        // ALWAYS calculate best option for UI
        const bestOption = FertilizerCalculator.findOptimalFertilizer(
            fertilityInfo.naturalEquilibrium,
            baseYieldAtNatural,
            constraints.allowedFertilizers
        );

        // Only auto-apply on FIRST calculation
        const isFirstCalculation = farm.selectedFertilizerId === null && farm.customFertility === null;

        console.log(`🔍 Farm ${farmIdx + 1} - Auto-apply check:`, {
            isFirstCalculation,
            selectedFertilizerId: farm.selectedFertilizerId,
            customFertility: farm.customFertility,
            hasBestOption: !!bestOption,
            netPeopleFed: bestOption?.netPeopleFed
        });

        if (bestOption && bestOption.netPeopleFed > 0 && isFirstCalculation) {

            const updatedFarm = {
                ...farm,
                selectedFertilizerId: bestOption.fertilizerId,
                customFertility: bestOption.targetFertility
            };

            return { bestOption, autoApplied: true, updatedFarm };
        }

        return { bestOption, autoApplied: false, updatedFarm: farm };
    }

    static recalculateWithFertilizer(params) {
        const { farm, rotation, effectiveFarm, availableCrops, fertilityInfo, optimizationMode, selectedProcessingRecipes, foodConsumptionMultiplier, constraints } = params;

        const actualFertility = farm.customFertility;

        const { slotDetails, production, totalFarmWaterPerDay, totalRotationDays } =
            this.calculateProduction(rotation, effectiveFarm, actualFertility, availableCrops);

        const foodResult = this.calculateFoodProduction({
            production,
            totalFarmWaterPerDay,
            optimizationMode,
            selectedProcessingRecipes,
            foodConsumptionMultiplier,
            constraints
        });

        const slotsWithPeopleFed = this.calculateSlotPeopleFed({
            slotDetails,
            totalRotationDays,
            optimizationMode,
            selectedProcessingRecipes,
            foodConsumptionMultiplier,
            constraints
        });

        const usingFertilizer = constraints.allowedFertilizers.length > 0 &&
            actualFertility > fertilityInfo.naturalEquilibrium &&
            farm.selectedFertilizerId !== null;

        return {
            farm,
            effectiveFarm,
            rotation,
            production,
            fertilityInfo,
            actualFertility,
            usingFertilizer,
            peopleFed: foodResult.peopleFed,
            totalWaterPerDay: foodResult.totalWaterPerDay,
            farmWaterPerDay: totalFarmWaterPerDay,
            processingWaterPerDay: foodResult.totalProcessingWater,
            totalRotationMonths: totalRotationDays / 30,
            processingChains: foodResult.processingChains,
            foodCategories: foodResult.foodCategories,
            slotDetails: slotsWithPeopleFed
        };
    }

    static aggregateResults(detailedResults) {
        const totalPeopleFed = detailedResults.reduce((sum, r) => sum + r.peopleFed, 0);
        const totalWaterPerDay = detailedResults.reduce((sum, r) => sum + r.totalWaterPerDay, 0);
        const totalFarmWater = detailedResults.reduce((sum, r) => sum + r.farmWaterPerDay, 0);
        const totalProcessingWater = detailedResults.reduce((sum, r) => sum + r.processingWaterPerDay, 0);

        const allProduction = {};
        detailedResults.forEach(result => {
            Object.entries(result.production).forEach(([productId, quantity]) => {
                allProduction[productId] = (allProduction[productId] || 0) + quantity;
            });
        });

        const { foodCategories, uniqueFoods, totalUnity, totalHealthBonuses } =
            this.aggregateFoodCategories(detailedResults);

        const { machines, totalElectricity, totalWorkers } =
            this.aggregateProcessingMachines(detailedResults);

        const fertilizerSummary = FertilizerCalculator.calculateGlobalUsage(
            detailedResults,
            detailedResults[0]?.farm ? [] : [] // Get from first farm
        );

        return {
            peopleFed: totalPeopleFed,
            waterPerDay: totalWaterPerDay,
            farmWaterPerDay: totalFarmWater,
            processingWaterPerDay: totalProcessingWater,
            waterPerMonth: totalWaterPerDay * 30,
            production: allProduction,
            foodCategories,
            processingMachines: machines,
            processingElectricity: totalElectricity,
            processingWorkers: totalWorkers,
            fertilizer: fertilizerSummary
        };
    }

    static aggregateFoodCategories(detailedResults) {
        const allFoodCategories = new Set();
        const categoryDetails = new Map();
        const uniqueFoods = new Set();
        const foodUnityDetails = [];
        let totalUnity = 0;
        let totalHealthBonuses = 0;

        detailedResults.forEach(result => {
            if (result.foodCategories) {
                result.foodCategories.categories.forEach(cat => {
                    if (!allFoodCategories.has(cat.id)) {
                        allFoodCategories.add(cat.id);
                        const category = ProductionCalculator.foodCategories?.find(c => c.id === cat.id);
                        if (category && category.hasHealthBenefit) {
                            totalHealthBonuses += 1;
                        }
                    }

                    const current = categoryDetails.get(cat.id) || {
                        name: cat.name,
                        hasHealthBenefit: cat.hasHealthBenefit,
                        peopleFed: 0
                    };
                    current.peopleFed += cat.peopleFed;
                    categoryDetails.set(cat.id, current);
                });

                result.processingChains?.forEach(chain => {
                    const food = ProductionCalculator.foods?.find(f => f.productId === chain.finalFoodProductId);
                    if (food && food.unityProvided > 0 && !uniqueFoods.has(food.productId)) {
                        uniqueFoods.add(food.productId);
                        totalUnity += food.unityProvided;
                        foodUnityDetails.push({
                            foodId: food.id,
                            productId: food.productId,
                            productName: ProductionCalculator.getProduct(food.productId)?.name,
                            categoryId: food.categoryId,
                            categoryName: ProductionCalculator.foodCategories?.find(c => c.id === food.categoryId)?.name,
                            unityProvided: food.unityProvided
                        });
                    }
                });
            }
        });

        return {
            foodCategories: {
                count: allFoodCategories.size,
                categories: Array.from(categoryDetails.entries()).map(([id, data]) => ({ id, ...data })),
                healthBonuses: totalHealthBonuses,
                totalUnity,
                unityBreakdown: foodUnityDetails
            },
            uniqueFoods,
            totalUnity,
            totalHealthBonuses
        };
    }

    static aggregateProcessingMachines(detailedResults) {
        const allMachines = new Map();
        let totalElectricity = 0;
        let totalWorkers = 0;

        detailedResults.forEach(result => {
            result.processingChains?.forEach(chain => {
                chain.machines?.forEach(machine => {
                    const current = allMachines.get(machine.machineId) || {
                        name: machine.machineName,
                        count: 0,
                        electricityKw: machine.electricityKw || 0,
                        workers: machine.workers || 0
                    };
                    current.count += machine.count;
                    allMachines.set(machine.machineId, current);

                    totalElectricity += (machine.electricityKw || 0) * machine.count;
                    totalWorkers += (machine.workers || 0) * machine.count;
                });
            });
        });

        return {
            machines: Array.from(allMachines.entries()).map(([id, data]) => ({ id, ...data })),
            totalElectricity,
            totalWorkers
        };
    }
}