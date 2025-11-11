// src/utils/FarmOptimizationEngine.js - WITH FERTILIZER OPTIMIZATION (COMPLETE)
import ProductionCalculator from './ProductionCalculator';
import { FarmOptimizer } from './FarmOptimizer';
import { FoodChainResolver } from './FoodChainResolver';
import { FertilizerCalculator } from './FertilizerCalculator';
import { GameDataManager } from '../managers/GameDataManager';

/**
 * Dedicated engine for automatic farm optimization
 * ALL optimization modes balance across food categories
 * Accounts for farm capabilities (greenhouse, fertilizer) and crop compatibility
 * Optimizes fertilizer usage when beneficial
 */
export class FarmOptimizationEngine {
    /**
     * Main optimization entry point
     */
    static optimize({
        optimizationGoal,
        constraints,
        research,
        selectedProcessingRecipes,
        foodConsumptionMultiplier
    }) {
        console.log('=== FarmOptimizationEngine: Starting optimization ===', {
            goal: optimizationGoal,
            targetPopulation: constraints.targetPopulation,
            maxFarms: constraints.maxFarms,
            allowedFertilizers: constraints.allowedFertilizers?.length || 0
        });

        // Validate inputs
        if (!constraints.targetPopulation || constraints.targetPopulation <= 0) {
            throw new Error('Invalid target population');
        }

        // Get available resources
        const availableFarms = this.getAvailableFarms(constraints.allowedFarmTypes);
        const availableCrops = this.getAvailableCrops(constraints.allowedCrops);

        if (availableFarms.length === 0) {
            throw new Error('No farm types available');
        }

        if (availableCrops.length === 0) {
            throw new Error('No crops available');
        }

        // ✅ Warn if using T1 farm with greenhouse crops
        const usingBasicFarm = availableFarms.some(f => f.id === 'FarmT1' || !f.capabilities?.supportsGreenhouse);
        const hasGreenhouseCrops = availableCrops.some(c => c.requiresGreenhouse);

        if (usingBasicFarm && hasGreenhouseCrops) {
            console.warn('⚠️ Warning: Some crops require greenhouse but T1 farm selected. These crops will be excluded.');
        }

        // ✅ Check if fertilizer is available
        const canUseFertilizer = availableFarms[0].capabilities?.supportsFertilizer &&
            !constraints.naturalFertilityOnly &&
            constraints.allowedFertilizers?.length > 0;

        console.log(`🌱 Fertilizer optimization: ${canUseFertilizer ? 'ENABLED' : 'DISABLED'}`);

        // ✅ Build crop-to-category mapping and evaluate all crops
        const cropEvaluations = this.evaluateAllCrops({
            availableCrops,
            availableFarms,
            research,
            foodConsumptionMultiplier,
            constraints,
            canUseFertilizer,
            optimizationGoal  // Pass goal to influence fertilizer evaluation
        });

        // ✅ Check if we have crops in all necessary categories
        const viableCategories = Array.from(cropEvaluations.byCategory.values())
            .filter(cat => cat.crops.length > 0);

        if (viableCategories.length === 0) {
            throw new Error('No viable crops available for selected farm types. Try selecting a higher tier farm or different crops.');
        }

        console.log(`✅ Found ${viableCategories.length} viable food categories`);

        // ✅ Determine target production per category
        const categoryTargets = this.calculateCategoryTargets({
            targetPopulation: constraints.targetPopulation,
            foodConsumptionMultiplier,
            cropEvaluations
        });

        console.log('📊 Category targets:', Array.from(categoryTargets.entries()).map(([catId, target]) => ({
            category: target.category.name,
            targetPeople: target.targetPeopleFed.toFixed(0),
            availableCrops: target.availableCrops.length
        })));

        // Route to appropriate optimization algorithm
        const optimizationParams = {
            targetPopulation: constraints.targetPopulation,
            availableFarms,
            cropEvaluations,
            categoryTargets,
            constraints,
            research,
            foodConsumptionMultiplier,
            canUseFertilizer
        };

        switch (optimizationGoal) {
            case 'minWater':
                return this.optimizeForMinWater(optimizationParams);

            case 'minFertility':
                return this.optimizeForMinFertility(optimizationParams);

            case 'maxVariety':
                return this.optimizeForMaxVariety(optimizationParams);

            case 'minWorkers':
                return this.optimizeForMinWorkers(optimizationParams);

            case 'balanced':
                return this.optimizeBalanced(optimizationParams);

            default:
                console.warn(`Unknown optimization goal: ${optimizationGoal}, falling back to balanced`);
                return this.optimizeBalanced(optimizationParams);
        }
    }

    /**
     * ✅ Evaluate all crops and map them to food categories
     * Now includes fertilizer optimization evaluation
     */
    static evaluateAllCrops({
        availableCrops,
        availableFarms,
        research,
        foodConsumptionMultiplier,
        constraints,
        canUseFertilizer,
        optimizationGoal
    }) {
        const farmProto = availableFarms[0];
        const effectiveFarm = FarmOptimizer.calculateEffectiveFarmStats(
            { farmId: farmProto.id },
            [],
            research
        );

        const byCrop = new Map();
        const byCategory = new Map();

        // Initialize category maps
        ProductionCalculator.foodCategories.forEach(category => {
            byCategory.set(category.id, {
                category,
                crops: []
            });
        });

        // Track incompatible crops for logging
        const incompatibleCrops = [];

        availableCrops.forEach(crop => {
            // ✅ Check farm compatibility
            if (!this.isCropCompatibleWithFarm(crop, farmProto)) {
                incompatibleCrops.push({
                    crop: crop.name,
                    reason: crop.requiresGreenhouse ? 'Requires greenhouse' : 'Unknown'
                });
                return; // Skip this crop
            }

            // ✅ Evaluate crop at natural fertility
            const evaluation = this.evaluateCrop({
                crop,
                effectiveFarm,
                research,
                foodConsumptionMultiplier,
                constraints
            });

            if (evaluation.peopleFed <= 0) return;

            // ✅ NEW: Evaluate with fertilizer if available and beneficial
            if (canUseFertilizer && optimizationGoal !== 'minFertility') {
                const fertilizerEval = this.evaluateCropWithFertilizer({
                    crop,
                    effectiveFarm,
                    research,
                    foodConsumptionMultiplier,
                    constraints,
                    baseEvaluation: evaluation
                });

                // ✅ If fertilizer provides net benefit, UPDATE the evaluation to use fertilized values
                if (fertilizerEval && fertilizerEval.netBenefit > 0) {
                    // Store fertilizer metadata
                    evaluation.withFertilizer = fertilizerEval;
                    evaluation.recommendedFertility = fertilizerEval.targetFertility;
                    evaluation.recommendedFertilizer = fertilizerEval.fertilizerId;

                    // ✅ CRITICAL: Update the PRIMARY metrics to use fertilized values
                    // This ensures crops are selected based on their fertilized performance

                    // Keep backup of natural values
                    evaluation.naturalPeopleFed = evaluation.peopleFed;
                    evaluation.naturalWaterEfficiency = evaluation.waterEfficiency;
                    evaluation.naturalYield = evaluation.yieldPerMonth;

                    // Update to fertilized values
                    evaluation.peopleFed = fertilizerEval.peopleFed;  // ✅ Use fertilized people fed
                    evaluation.waterEfficiency = fertilizerEval.waterEfficiency;  // ✅ Use fertilized efficiency
                    evaluation.yieldPerMonth = FarmOptimizer.calculateCropYield(
                        crop,
                        effectiveFarm,
                        fertilizerEval.targetFertility
                    );  // ✅ Update yield to fertilized level

                    // Store the enhanced values as well (for reference)
                    evaluation.peopleFedWithFertilizer = fertilizerEval.peopleFed;
                    evaluation.waterEfficiencyWithFertilizer = fertilizerEval.waterEfficiency;
                    evaluation.netBenefit = fertilizerEval.netBenefit;
                    evaluation.usingFertilizer = true;  // ✅ Flag that this evaluation includes fertilizer

                    console.log(`  🌱 ${crop.name}: Fertilizer beneficial (${fertilizerEval.fertilizerId}, ${fertilizerEval.targetFertility}% → ${fertilizerEval.peopleFed.toFixed(0)} people, +${fertilizerEval.netBenefit.toFixed(0)} net)`);
                }
            }

            byCrop.set(crop.id, evaluation);

            // Add to appropriate category
            if (evaluation.categoryId) {
                const categoryData = byCategory.get(evaluation.categoryId);
                if (categoryData) {
                    categoryData.crops.push(evaluation);
                }
            }
        });

        // Log incompatible crops if any
        if (incompatibleCrops.length > 0) {
            console.log(`⚠️ Excluded ${incompatibleCrops.length} incompatible crops:`,
                incompatibleCrops.slice(0, 5).map(c => `${c.crop} (${c.reason})`));
        }

        // Sort crops within each category by water efficiency
        byCategory.forEach(categoryData => {
            categoryData.crops.sort((a, b) => {
                // ✅ No need for fallback - we've updated the primary values
                return b.waterEfficiency - a.waterEfficiency;
            });
        });

        return { byCrop, byCategory };
    }

    /**
     * ✅ NEW: Evaluate a crop with optimal fertilizer
     */
    static evaluateCropWithFertilizer({
        crop,
        effectiveFarm,
        research,
        foodConsumptionMultiplier,
        constraints,
        baseEvaluation
    }) {
        const naturalFertility = baseEvaluation.naturalFertility;
        const basePeopleFed = baseEvaluation.peopleFed;

        // ✅ Use FertilizerCalculator to find optimal fertilizer
        const optimalFertilizer = FertilizerCalculator.findOptimalFertilizer(
            naturalFertility,
            basePeopleFed,
            constraints.allowedFertilizers
        );

        if (!optimalFertilizer || optimalFertilizer.netPeopleFed <= 0) {
            return null; // No beneficial fertilizer found
        }

        // Calculate yield at fertilized fertility
        const fertilizedYield = FarmOptimizer.calculateCropYield(
            crop,
            effectiveFarm,
            optimalFertilizer.targetFertility
        );

        // Calculate people fed at fertilized fertility
        const production = { [crop.output.productId]: fertilizedYield };
        const foodResult = FarmOptimizer.calculatePeopleFedWithChains(
            production,
            baseEvaluation.waterPerDay, // Water per day doesn't change
            foodConsumptionMultiplier,
            constraints.allowedIntermediates,
            constraints.allowedRecipes
        );

        const fertilizedPeopleFed = foodResult.peopleFed;
        const waterEfficiency = foodResult.totalWaterPerDay > 0 ?
            fertilizedPeopleFed / foodResult.totalWaterPerDay : 0;

        return {
            fertilizerId: optimalFertilizer.fertilizerId,
            targetFertility: optimalFertilizer.targetFertility,
            peopleFed: fertilizedPeopleFed,
            waterEfficiency,
            yieldIncrease: optimalFertilizer.peopleFedIncrease,
            workersNeeded: optimalFertilizer.workersNeeded,
            netBenefit: optimalFertilizer.netPeopleFed,
            quantityPerMonth: optimalFertilizer.quantityPerMonth
        };
    }

    /**
     * ✅ Evaluate a single crop's performance (at natural fertility)
     */
    static evaluateCrop({
        crop,
        effectiveFarm,
        research,
        foodConsumptionMultiplier,
        constraints
    }) {
        // Calculate fertility equilibrium for a rotation containing ONLY this crop
        const rotation = [crop.id, null, null, null];
        const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(rotation, effectiveFarm);
        const naturalFertility = fertilityInfo.naturalEquilibrium;

        // Calculate yield per month AT this natural equilibrium
        const yieldPerMonth = FarmOptimizer.calculateCropYield(crop, effectiveFarm, naturalFertility);

        // Calculate water per day for this crop
        const waterPerDay = FarmOptimizer.calculateWaterPerDay(crop, effectiveFarm);

        // Get best food processing chain
        const production = { [crop.output.productId]: yieldPerMonth };
        const foodResult = FarmOptimizer.calculatePeopleFedWithChains(
            production,
            waterPerDay,
            foodConsumptionMultiplier,
            constraints.allowedIntermediates,
            constraints.allowedRecipes
        );

        // Determine food category
        let categoryId = null;
        if (foodResult.processingChains && foodResult.processingChains.length > 0) {
            const finalFoodProductId = foodResult.processingChains[0].finalFoodProductId;

            // Find category by looking up the food product
            const food = ProductionCalculator.foods?.find(f => f.productId === finalFoodProductId);
            categoryId = food?.categoryId || null;
        }

        const growthDays = crop.growthDays;

        return {
            crop,
            cropId: crop.id,
            cropName: crop.name,
            categoryId,
            growthDays,
            yieldPerMonth,
            waterPerDay: foodResult.totalWaterPerDay,
            peopleFed: foodResult.peopleFed,
            waterEfficiency: foodResult.totalWaterPerDay > 0 ? foodResult.peopleFed / foodResult.totalWaterPerDay : 0,
            fertilityConsumption: fertilityInfo.avgFertilityPerDay,
            naturalFertility: naturalFertility,
            processingWater: foodResult.totalProcessingWater,
            processingChains: foodResult.processingChains,
            foodCategories: foodResult.foodCategories,
            // Fertilizer fields (will be populated if beneficial)
            withFertilizer: null,
            recommendedFertility: null,
            recommendedFertilizer: null,
            naturalPeopleFed: null,
            naturalWaterEfficiency: null,
            naturalYield: null,
            peopleFedWithFertilizer: null,
            waterEfficiencyWithFertilizer: null,
            netBenefit: 0,
            usingFertilizer: false
        };
    }

    /**
     * Calculate target people fed per category
     */
    static calculateCategoryTargets({
        targetPopulation,
        foodConsumptionMultiplier,
        cropEvaluations
    }) {
        const { byCategory } = cropEvaluations;

        const viableCategories = Array.from(byCategory.values()).filter(
            cat => cat.crops.length > 0
        );

        if (viableCategories.length === 0) {
            throw new Error('No viable food categories available');
        }

        const peoplePerCategory = targetPopulation / viableCategories.length;

        const targets = new Map();
        viableCategories.forEach(categoryData => {
            targets.set(categoryData.category.id, {
                category: categoryData.category,
                targetPeopleFed: peoplePerCategory,
                availableCrops: categoryData.crops
            });
        });

        return targets;
    }

    /**
     * ✅ Calculate weighted farm performance for a crop selection
     * Now accounts for fertilizer settings
     */
    static calculateWeightedFarmPerformance({
        selectedCrops,
        effectiveFarm,
        research,
        foodConsumptionMultiplier,
        constraints
    }) {
        // Build rotation from selected crops
        const rotation = selectedCrops.slice(0, 4).map(c => c.cropId);
        while (rotation.length < 4) rotation.push(null);

        // Calculate fertility equilibrium for THIS SPECIFIC rotation
        const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(rotation, effectiveFarm);

        // ✅ Use recommended fertility if fertilizer is set, otherwise natural
        // Check if any crop has recommended fertilizer
        const usingFertilizer = selectedCrops.some(c => c.usingFertilizer);
        const actualFertility = usingFertilizer && selectedCrops[0].recommendedFertility
            ? selectedCrops[0].recommendedFertility
            : fertilityInfo.naturalEquilibrium;

        // Calculate total rotation days
        const totalRotationDays = selectedCrops.reduce((sum, c) => sum + c.growthDays, 0);

        if (totalRotationDays === 0) {
            return {
                peopleFed: 0,
                totalWater: 0,
                actualFertility: 0,
                weightedProduction: {},
                usingFertilizer: false
            };
        }

        // Calculate weighted production for each crop
        const weightedProduction = {};
        let totalWeightedWater = 0;

        selectedCrops.forEach(cropEval => {
            const weight = cropEval.growthDays / totalRotationDays;

            // Recalculate yield at the ROTATION's actual fertility
            const actualYield = FarmOptimizer.calculateCropYield(
                cropEval.crop,
                effectiveFarm,
                actualFertility
            );

            const weightedYield = actualYield * weight;
            const productId = cropEval.crop.output.productId;

            weightedProduction[productId] = (weightedProduction[productId] || 0) + weightedYield;
            totalWeightedWater += cropEval.waterPerDay * weight;
        });

        // Calculate total people fed from weighted production
        const foodResult = FarmOptimizer.calculatePeopleFedWithChains(
            weightedProduction,
            totalWeightedWater,
            foodConsumptionMultiplier,
            constraints.allowedIntermediates,
            constraints.allowedRecipes
        );

        return {
            peopleFed: foodResult.peopleFed,
            totalWater: foodResult.totalWaterPerDay,
            actualFertility: actualFertility,
            weightedProduction,
            fertilityInfo,
            foodResult,
            usingFertilizer
        };
    }

    /**
     * ✅ OPTIMIZATION: Minimize Water Usage
     * Considers fertilizer if it improves water efficiency
     */
    static optimizeForMinWater(params) {
        const { cropEvaluations, categoryTargets, availableFarms, constraints, research, foodConsumptionMultiplier } = params;

        console.log('💧 Optimizing for minimum water usage');

        const selectedCrops = [];

        categoryTargets.forEach((target, categoryId) => {
            // Already sorted by waterEfficiency (now includes fertilized values in primary metric)
            const bestCrop = target.availableCrops[0];

            if (bestCrop) {
                selectedCrops.push({
                    ...bestCrop,
                    targetPeopleFed: target.targetPeopleFed
                });

                const fertStatus = bestCrop.usingFertilizer ? ` + ${bestCrop.recommendedFertilizer}` : '';
                console.log(`  ${target.category.name}: ${bestCrop.cropName}${fertStatus} (${bestCrop.waterEfficiency.toFixed(2)} people/water)`);
            }
        });

        if (selectedCrops.length === 0) {
            throw new Error('No crops selected for optimization');
        }

        return this.generateFarmsForCrops({
            selectedCrops,
            availableFarms,
            constraints,
            research,
            foodConsumptionMultiplier
        });
    }

    /**
     * ✅ OPTIMIZATION: Minimize Fertilizer Usage
     * Explicitly avoids fertilizer recommendations
     */
    static optimizeForMinFertility(params) {
        const { cropEvaluations, categoryTargets, availableFarms, constraints, research, foodConsumptionMultiplier } = params;

        console.log('🌱 Optimizing for minimum fertilizer usage');

        const selectedCrops = [];

        categoryTargets.forEach((target, categoryId) => {
            // Sort by fertility characteristics (ignore fertilizer recommendations)
            const sortedCrops = [...target.availableCrops].sort((a, b) => {
                const aScore = a.naturalFertility - a.fertilityConsumption * 10;
                const bScore = b.naturalFertility - b.fertilityConsumption * 10;
                return bScore - aScore;
            });

            const bestCrop = sortedCrops[0];

            if (bestCrop) {
                // ✅ Remove fertilizer recommendations for this mode
                const cropWithoutFertilizer = {
                    ...bestCrop,
                    targetPeopleFed: target.targetPeopleFed,
                    recommendedFertilizer: null,
                    recommendedFertility: null,
                    withFertilizer: null,
                    usingFertilizer: false
                };

                selectedCrops.push(cropWithoutFertilizer);

                console.log(`  ${target.category.name}: ${bestCrop.cropName} (fertility: ${bestCrop.naturalFertility.toFixed(0)}%, NO FERTILIZER)`);
            }
        });

        return this.generateFarmsForCrops({
            selectedCrops,
            availableFarms,
            constraints,
            research,
            foodConsumptionMultiplier
        });
    }

    /**
     * ✅ OPTIMIZATION: Maximize Variety
     */
    static optimizeForMaxVariety(params) {
        const { cropEvaluations, categoryTargets, availableFarms, constraints, research, foodConsumptionMultiplier } = params;

        console.log('🌈 Optimizing for maximum variety');

        const selectedCrops = [];

        categoryTargets.forEach((target, categoryId) => {
            const sortedCrops = [...target.availableCrops].sort((a, b) => {
                const aScore = (target.category.hasHealthBenefit ? 100 : 0) +
                    (a.processingChains[0]?.isDirect ? 50 : 0) +
                    a.waterEfficiency;
                const bScore = (target.category.hasHealthBenefit ? 100 : 0) +
                    (b.processingChains[0]?.isDirect ? 50 : 0) +
                    b.waterEfficiency;
                return bScore - aScore;
            });

            const bestCrop = sortedCrops[0];

            if (bestCrop) {
                selectedCrops.push({
                    ...bestCrop,
                    targetPeopleFed: target.targetPeopleFed
                });

                const fertStatus = bestCrop.usingFertilizer ? ` + fertilizer` : '';
                console.log(`  ${target.category.name}: ${bestCrop.cropName}${fertStatus} (health: ${target.category.hasHealthBenefit})`);
            }
        });

        return this.generateFarmsForCrops({
            selectedCrops,
            availableFarms,
            constraints,
            research,
            foodConsumptionMultiplier
        });
    }

    /**
     * ✅ OPTIMIZATION: Minimize Workers
     * Considers fertilizer worker cost
     */
    static optimizeForMinWorkers(params) {
        const { cropEvaluations, categoryTargets, availableFarms, constraints, research, foodConsumptionMultiplier } = params;

        console.log('👷 Optimizing for minimum workers');

        const selectedCrops = [];

        categoryTargets.forEach((target, categoryId) => {
            const sortedCrops = [...target.availableCrops].sort((a, b) => {
                // Calculate total workers (processing + fertilizer production)
                const aProcessingWorkers = a.processingChains.reduce((sum, chain) => {
                    return sum + (chain.machines || []).reduce((s, m) => s + (m.workers || 0) * m.count, 0);
                }, 0);
                const aFertilizerWorkers = a.withFertilizer?.workersNeeded || 0;
                const aTotalWorkers = aProcessingWorkers + aFertilizerWorkers;

                const bProcessingWorkers = b.processingChains.reduce((sum, chain) => {
                    return sum + (chain.machines || []).reduce((s, m) => s + (m.workers || 0) * m.count, 0);
                }, 0);
                const bFertilizerWorkers = b.withFertilizer?.workersNeeded || 0;
                const bTotalWorkers = bProcessingWorkers + bFertilizerWorkers;

                // If workers are equal, prefer better people fed
                if (aTotalWorkers === bTotalWorkers) {
                    return b.peopleFed - a.peopleFed;
                }

                return aTotalWorkers - bTotalWorkers;
            });

            const bestCrop = sortedCrops[0];

            if (bestCrop) {
                selectedCrops.push({
                    ...bestCrop,
                    targetPeopleFed: target.targetPeopleFed
                });

                const totalWorkers = bestCrop.processingChains.reduce((sum, chain) => {
                    return sum + (chain.machines || []).reduce((s, m) => s + (m.workers || 0) * m.count, 0);
                }, 0) + (bestCrop.withFertilizer?.workersNeeded || 0);

                console.log(`  ${target.category.name}: ${bestCrop.cropName} (workers: ${totalWorkers.toFixed(1)})`);
            }
        });

        return this.generateFarmsForCrops({
            selectedCrops,
            availableFarms,
            constraints,
            research,
            foodConsumptionMultiplier
        });
    }

    /**
     * ✅ OPTIMIZATION: Balanced
     * Balances water, fertility, workers, and health
     */
    static optimizeBalanced(params) {
        const { cropEvaluations, categoryTargets, availableFarms, constraints, research, foodConsumptionMultiplier } = params;

        console.log('⚖️ Optimizing with balanced approach');

        const selectedCrops = [];

        categoryTargets.forEach((target, categoryId) => {
            const scoredCrops = target.availableCrops.map(crop => {
                // Use primary values (already updated with fertilizer if beneficial)
                const waterScore = Math.min(crop.waterEfficiency / 20, 1);
                const fertilityScore = Math.min((crop.naturalFertility - crop.fertilityConsumption) / 100, 1);

                // Worker score accounts for processing + fertilizer workers
                const processingWorkers = crop.processingChains.reduce((sum, chain) => {
                    return sum + (chain.machines || []).reduce((s, m) => s + (m.workers || 0) * m.count, 0);
                }, 0);
                const fertilizerWorkers = crop.withFertilizer?.workersNeeded || 0;
                const totalWorkers = processingWorkers + fertilizerWorkers;
                const workerScore = totalWorkers === 0 ? 1 : Math.max(0, 1 - (totalWorkers / 10));

                const healthScore = target.category.hasHealthBenefit ? 1 : 0.7;

                // Weighted combination
                const totalScore = (waterScore * 0.30) +
                    (fertilityScore * 0.25) +
                    (workerScore * 0.25) +
                    (healthScore * 0.20);

                return { ...crop, balancedScore: totalScore };
            });

            scoredCrops.sort((a, b) => b.balancedScore - a.balancedScore);

            const bestCrop = scoredCrops[0];

            if (bestCrop) {
                selectedCrops.push({
                    ...bestCrop,
                    targetPeopleFed: target.targetPeopleFed
                });

                const fertStatus = bestCrop.usingFertilizer ? ' + fert' : '';
                console.log(`  ${target.category.name}: ${bestCrop.cropName}${fertStatus} (score: ${bestCrop.balancedScore.toFixed(3)})`);
            }
        });

        return this.generateFarmsForCrops({
            selectedCrops,
            availableFarms,
            constraints,
            research,
            foodConsumptionMultiplier
        });
    }

    /**
     * ✅ Generate farm configurations for selected crops
     * Leaves fertilizer NULL for FarmCalculationEngine to auto-apply
     */
    static generateFarmsForCrops({
        selectedCrops,
        availableFarms,
        constraints,
        research,
        foodConsumptionMultiplier
    }) {
        const farmProto = availableFarms[0];
        const effectiveFarm = FarmOptimizer.calculateEffectiveFarmStats(
            { farmId: farmProto.id },
            [],
            research
        );

        // ✅ Calculate weighted performance with fertilizer factored in
        const totalRotationDays = selectedCrops.reduce((sum, c) => sum + c.growthDays, 0);

        // Calculate weighted people fed (crops are already evaluated at fertilized fertility)
        const weightedPeopleFed = selectedCrops.reduce((sum, c) => {
            const weight = c.growthDays / totalRotationDays;
            return sum + (c.peopleFed * weight);  // Uses fertilized peopleFed
        }, 0);

        // Check if any crops are using fertilizer
        const usingFertilizer = selectedCrops.some(c => c.usingFertilizer);

        console.log('📊 Expected farm performance:', {
            peopleFed: weightedPeopleFed.toFixed(0),
            usingFertilizer,
            fertility: usingFertilizer ? 'Will auto-apply optimal fertilizer' : 'Natural equilibrium',
            crops: selectedCrops.map(c => {
                const fertInfo = c.usingFertilizer ? ` (${c.recommendedFertilizer} → ${c.recommendedFertility}%)` : '';
                return `${c.cropName} (${c.growthDays}d)${fertInfo}`;
            })
        });

        // Estimate farm count based on weighted performance
        const targetPopulation = selectedCrops.reduce((sum, c) => sum + c.targetPeopleFed, 0);
        const estimatedFarms = Math.ceil(targetPopulation / weightedPeopleFed);
        const farmCount = constraints.maxFarms
            ? Math.min(estimatedFarms, constraints.maxFarms)
            : estimatedFarms;

        const fertStatusSummary = usingFertilizer
            ? ' (fertilizer will be auto-applied on calculation)'
            : ' (natural fertility)';
        console.log(`✅ Creating ${farmCount} farms${fertStatusSummary}`);

        // Generate farms with NULL fertilizer - FarmCalculationEngine will auto-apply
        const farms = [];
        for (let i = 0; i < farmCount; i++) {
            const farmType = availableFarms[0]?.id || 'FarmT1';

            const rotation = selectedCrops.slice(0, 4).map((c, idx) => {
                const cropIndex = (i + idx) % selectedCrops.length;
                return selectedCrops[cropIndex].cropId;
            });

            while (rotation.length < 4) {
                rotation.push(null);
            }

            // ✅ Leave NULL - FarmCalculationEngine will detect first calculation and auto-apply
            farms.push({
                id: Date.now() + i,
                farmId: farmType,
                rotation,
                selectedFertilizerId: null,  // ✅ NULL triggers auto-apply
                customFertility: null         // ✅ NULL triggers auto-apply
            });
        }

        return farms;
    }

    // ✅ Farm capability methods
    static farmSupportsGreenhouse(farm) {
        if (!farm) return false;
        if (farm.id === 'FarmT1' || farm.name?.toLowerCase().includes('basic')) {
            return false;
        }
        return true;
    }

    static farmSupportsFertilizer(farm) {
        if (!farm) return false;
        if (!farm.inputPorts || farm.inputPorts.length === 0) {
            return false;
        }
        return true;
    }

    static isCropCompatibleWithFarm(crop, farm) {
        if (crop.requiresGreenhouse && !this.farmSupportsGreenhouse(farm)) {
            return false;
        }
        return true;
    }

    static getAvailableFarms(allowedFarmTypes) {
        const allFarms = ProductionCalculator.farms?.filter(f => f.type === 'crop') || [];

        let filtered = allFarms;
        if (allowedFarmTypes && allowedFarmTypes.length > 0) {
            filtered = allFarms.filter(f => allowedFarmTypes.includes(f.id));
        }

        const annotated = filtered.map(farm => ({
            ...farm,
            capabilities: {
                supportsGreenhouse: this.farmSupportsGreenhouse(farm),
                supportsFertilizer: this.farmSupportsFertilizer(farm)
            }
        }));

        console.log('🚜 Available farms:', annotated.map(f => ({
            name: f.name,
            greenhouse: f.capabilities.supportsGreenhouse,
            fertilizer: f.capabilities.supportsFertilizer
        })));

        return annotated;
    }

    static getAvailableCrops(allowedCrops) {
        const allFoodCrops = (ProductionCalculator.crops || []).filter(crop =>
            ProductionCalculator.foodCropIds?.has(crop.id) ?? false
        );

        if (!allowedCrops || allowedCrops.length === 0) {
            return allFoodCrops;
        }

        return allFoodCrops.filter(c => allowedCrops.includes(c.id));
    }
}