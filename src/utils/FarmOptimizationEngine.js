// src/utils/FarmOptimizationEngine.js - COMPLETE WITH EXACT SETTLEMENT FEEDING SIMULATION

import ProductionCalculator from './ProductionCalculator';
import { FarmOptimizer } from './FarmOptimizer';
import { FoodChainResolver } from './FoodChainResolver';
import { FertilizerCalculator } from './FertilizerCalculator';
import { GameDataManager } from '../managers/GameDataManager';

/**
 * Dedicated engine for automatic farm optimization
 * Accounts for:
 * - Food category balancing (critical!)
 * - Exact Settlement.cs feeding simulation
 * - Smart farm tier selection based on optimization goals
 * - Fertilizer optimization
 * - Crop compatibility (greenhouse requirements)
 * - Rotation mechanics (monoculture penalty, evaporation)
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

        // ✅ Sort farms by capability (best first) for evaluation
        const sortedFarms = this.sortFarmsByCapability(availableFarms);

        // ✅ Select best farm for crop evaluation
        const farmForEvaluation = sortedFarms[0];

        console.log(`📐 Using farm for evaluation: ${farmForEvaluation.name} (${farmForEvaluation.id})`);

        // ✅ Check if fertilizer is available based on selected farm
        const canUseFertilizer = farmForEvaluation.capabilities?.supportsFertilizer &&
            !constraints.naturalFertilityOnly &&
            constraints.allowedFertilizers?.length > 0;

        console.log(`🌱 Fertilizer optimization: ${canUseFertilizer ? 'ENABLED' : 'DISABLED'}`);

        // ✅ Warn if using basic farm with greenhouse crops
        const usingBasicFarm = !farmForEvaluation.capabilities?.supportsGreenhouse;
        const hasGreenhouseCrops = availableCrops.some(c => c.requiresGreenhouse);

        if (usingBasicFarm && hasGreenhouseCrops) {
            console.warn('⚠️ Warning: Some crops require greenhouse but basic farm selected for evaluation. These crops will be excluded.');
        }

        // ✅ Build crop-to-category mapping and evaluate all crops
        const cropEvaluations = this.evaluateAllCrops({
            availableCrops,
            farmForEvaluation,
            research,
            foodConsumptionMultiplier,
            constraints,
            canUseFertilizer,
            optimizationGoal
        });

        // ✅ Check if we have crops in all necessary categories
        const viableCategories = Array.from(cropEvaluations.byCategory.values())
            .filter(cat => cat.crops.length > 0);

        if (viableCategories.length === 0) {
            throw new Error('No viable crops available for selected farm types.');
        }

        console.log(`✅ Found ${viableCategories.length} viable food categories`);

        // ✅ Determine target production per category (EQUAL SPLIT)
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
            availableFarms: sortedFarms,
            cropEvaluations,
            categoryTargets,
            constraints,
            research,
            foodConsumptionMultiplier,
            canUseFertilizer
        };

        let selectedCrops;
        switch (optimizationGoal) {
            case 'minWater':
                selectedCrops = this.optimizeForMinWater(optimizationParams);
                break;

            case 'minFertility':
                selectedCrops = this.optimizeForMinFertility(optimizationParams);
                break;

            case 'maxVariety':
                selectedCrops = this.optimizeForMaxVariety(optimizationParams);
                break;

            case 'minWorkers':
                selectedCrops = this.optimizeForMinWorkers(optimizationParams);
                break;

            case 'balanced':
            default:
                if (optimizationGoal !== 'balanced') {
                    console.warn(`Unknown optimization goal: ${optimizationGoal}, falling back to balanced`);
                }
                selectedCrops = this.optimizeBalanced(optimizationParams);
                break;
        }

        // ✅ Generate farms with smart tier selection
        return this.generateFarmsWithTierSelection({
            selectedCrops,
            availableFarms: sortedFarms,
            constraints,
            research,
            foodConsumptionMultiplier,
            categoryTargets,
            optimizationGoal
        });
    }

    /**
     * ✅ Sort farms by capability for optimal evaluation
     * Priority: Greenhouse > Fertilizer > Higher tier
     */
    static sortFarmsByCapability(farms) {
        return [...farms].sort((a, b) => {
            // 1. Prefer greenhouse
            if (a.capabilities.supportsGreenhouse !== b.capabilities.supportsGreenhouse) {
                return b.capabilities.supportsGreenhouse - a.capabilities.supportsGreenhouse;
            }

            // 2. Prefer fertilizer support
            if (a.capabilities.supportsFertilizer !== b.capabilities.supportsFertilizer) {
                return b.capabilities.supportsFertilizer - a.capabilities.supportsFertilizer;
            }

            // 3. Prefer higher yield multiplier (higher tier)
            return b.yieldMultiplierPercent - a.yieldMultiplierPercent;
        });
    }

    /**
     * ✅ Evaluate all crops and map them to food categories
     * Now includes fertilizer optimization evaluation
     */
    static evaluateAllCrops({
        availableCrops,
        farmForEvaluation,
        research,
        foodConsumptionMultiplier,
        constraints,
        canUseFertilizer,
        optimizationGoal
    }) {
        const effectiveFarm = FarmOptimizer.calculateEffectiveFarmStats(
            { farmId: farmForEvaluation.id },
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
            if (!this.isCropCompatibleWithFarm(crop, farmForEvaluation)) {
                incompatibleCrops.push({
                    crop: crop.name,
                    reason: crop.requiresGreenhouse ? 'Requires greenhouse' : 'Unknown'
                });
                return;
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

            // ✅ Evaluate with fertilizer if available and beneficial
            if (canUseFertilizer && optimizationGoal !== 'minFertility') {
                const fertilizerEval = this.evaluateCropWithFertilizer({
                    crop,
                    effectiveFarm,
                    research,
                    foodConsumptionMultiplier,
                    constraints,
                    baseEvaluation: evaluation
                });

                // ✅ If fertilizer provides net benefit, UPDATE the evaluation
                if (fertilizerEval && fertilizerEval.netBenefit > 0) {
                    evaluation.withFertilizer = fertilizerEval;
                    evaluation.recommendedFertility = fertilizerEval.targetFertility;
                    evaluation.recommendedFertilizer = fertilizerEval.fertilizerId;

                    // Keep backup of natural values
                    evaluation.naturalPeopleFed = evaluation.peopleFed;
                    evaluation.naturalWaterEfficiency = evaluation.waterEfficiency;
                    evaluation.naturalYield = evaluation.yieldPerMonth;

                    // Update to fertilized values
                    evaluation.peopleFed = fertilizerEval.peopleFed;
                    evaluation.waterEfficiency = fertilizerEval.waterEfficiency;
                    evaluation.yieldPerMonth = FarmOptimizer.calculateCropYield(
                        crop,
                        effectiveFarm,
                        fertilizerEval.targetFertility
                    );

                    evaluation.peopleFedWithFertilizer = fertilizerEval.peopleFed;
                    evaluation.waterEfficiencyWithFertilizer = fertilizerEval.waterEfficiency;
                    evaluation.netBenefit = fertilizerEval.netBenefit;
                    evaluation.usingFertilizer = true;

                    console.log(`  🌱 ${crop.name}: Fertilizer beneficial (${fertilizerEval.fertilizerId}, ${fertilizerEval.targetFertility}% → ${fertilizerEval.peopleFed.toFixed(0)} people)`);
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
            categoryData.crops.sort((a, b) => b.waterEfficiency - a.waterEfficiency);
        });

        return { byCrop, byCategory };
    }

    /**
     * ✅ Evaluate a crop with optimal fertilizer
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

        // Use FertilizerCalculator to find optimal fertilizer
        const optimalFertilizer = FertilizerCalculator.findOptimalFertilizer(
            naturalFertility,
            basePeopleFed,
            constraints.allowedFertilizers
        );

        if (!optimalFertilizer || optimalFertilizer.netPeopleFed <= 0) {
            return null;
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
            baseEvaluation.waterPerDay,
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

        // Calculate yield per month at natural equilibrium
        const yieldPerMonth = FarmOptimizer.calculateCropYield(crop, effectiveFarm, naturalFertility);

        // Calculate water per day
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
            const food = ProductionCalculator.foods?.find(f => f.productId === finalFoodProductId);
            categoryId = food?.categoryId || null;
        }

        return {
            crop,
            cropId: crop.id,
            cropName: crop.name,
            categoryId,
            growthDays: crop.growthDays,
            yieldPerMonth,
            waterPerDay: foodResult.totalWaterPerDay,
            peopleFed: foodResult.peopleFed,
            waterEfficiency: foodResult.totalWaterPerDay > 0 ? foodResult.peopleFed / foodResult.totalWaterPerDay : 0,
            fertilityConsumption: fertilityInfo.avgFertilityPerDay,
            naturalFertility: naturalFertility,
            processingWater: foodResult.totalProcessingWater,
            processingChains: foodResult.processingChains,
            foodCategories: foodResult.foodCategories,
            // Fertilizer fields
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
     * ✅ Calculate target people fed per category (EQUAL SPLIT - CRITICAL!)
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

        // ✅ CRITICAL: Each category must feed EQUAL population
        // Because Settlement splits population evenly across categories
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
     * ✅ OPTIMIZATION: Minimize Water Usage
     */
    static optimizeForMinWater(params) {
        const { cropEvaluations, categoryTargets } = params;

        console.log('💧 Optimizing for minimum water usage');

        const selectedCrops = [];

        categoryTargets.forEach((target, categoryId) => {
            // Already sorted by waterEfficiency
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

        return selectedCrops;
    }

    /**
     * ✅ OPTIMIZATION: Minimize Fertility Usage
     */
    static optimizeForMinFertility(params) {
        const { cropEvaluations, categoryTargets } = params;

        console.log('🌱 Optimizing for minimum fertilizer usage');

        const selectedCrops = [];

        categoryTargets.forEach((target, categoryId) => {
            // Sort by fertility characteristics
            const sortedCrops = [...target.availableCrops].sort((a, b) => {
                const aScore = a.naturalFertility - a.fertilityConsumption * 10;
                const bScore = b.naturalFertility - b.fertilityConsumption * 10;
                return bScore - aScore;
            });

            const bestCrop = sortedCrops[0];

            if (bestCrop) {
                // Remove fertilizer recommendations
                const cropWithoutFertilizer = {
                    ...bestCrop,
                    targetPeopleFed: target.targetPeopleFed,
                    recommendedFertilizer: null,
                    recommendedFertility: null,
                    withFertilizer: null,
                    usingFertilizer: false,
                    // Restore natural values
                    peopleFed: bestCrop.naturalPeopleFed || bestCrop.peopleFed,
                    waterEfficiency: bestCrop.naturalWaterEfficiency || bestCrop.waterEfficiency
                };

                selectedCrops.push(cropWithoutFertilizer);

                console.log(`  ${target.category.name}: ${bestCrop.cropName} (fertility: ${bestCrop.naturalFertility.toFixed(0)}%, NO FERTILIZER)`);
            }
        });

        return selectedCrops;
    }

    /**
     * ✅ OPTIMIZATION: Maximize Variety
     */
    static optimizeForMaxVariety(params) {
        const { cropEvaluations, categoryTargets } = params;

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
                console.log(`  ${target.category.name}: ${bestCrop.cropName}${fertStatus}`);
            }
        });

        return selectedCrops;
    }

    /**
     * ✅ OPTIMIZATION: Minimize Workers
     */
    static optimizeForMinWorkers(params) {
        const { cropEvaluations, categoryTargets, availableFarms } = params;

        console.log('👷 Optimizing for minimum workers');

        const selectedCrops = [];

        // ✅ Include farm workers in calculation
        const farmWorkers = availableFarms[0]?.workers || 0;

        categoryTargets.forEach((target, categoryId) => {
            const sortedCrops = [...target.availableCrops].sort((a, b) => {
                // Calculate total workers (farm + processing + fertilizer)
                const aProcessingWorkers = a.processingChains.reduce((sum, chain) => {
                    return sum + (chain.machines || []).reduce((s, m) => s + (m.workers || 0) * m.count, 0);
                }, 0);
                const aFertilizerWorkers = a.withFertilizer?.workersNeeded || 0;
                const aTotalWorkers = farmWorkers + aProcessingWorkers + aFertilizerWorkers;

                const bProcessingWorkers = b.processingChains.reduce((sum, chain) => {
                    return sum + (chain.machines || []).reduce((s, m) => s + (m.workers || 0) * m.count, 0);
                }, 0);
                const bFertilizerWorkers = b.withFertilizer?.workersNeeded || 0;
                const bTotalWorkers = farmWorkers + bProcessingWorkers + bFertilizerWorkers;

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

                const totalWorkers = farmWorkers + bestCrop.processingChains.reduce((sum, chain) => {
                    return sum + (chain.machines || []).reduce((s, m) => s + (m.workers || 0) * m.count, 0);
                }, 0) + (bestCrop.withFertilizer?.workersNeeded || 0);

                console.log(`  ${target.category.name}: ${bestCrop.cropName} (workers: ${totalWorkers.toFixed(1)})`);
            }
        });

        return selectedCrops;
    }

    /**
     * ✅ OPTIMIZATION: Balanced
     */
    static optimizeBalanced(params) {
        const { cropEvaluations, categoryTargets, availableFarms } = params;

        console.log('⚖️ Optimizing with balanced approach');

        const selectedCrops = [];
        const farmWorkers = availableFarms[0]?.workers || 0;

        categoryTargets.forEach((target, categoryId) => {
            const scoredCrops = target.availableCrops.map(crop => {
                const waterScore = Math.min(crop.waterEfficiency / 20, 1);
                const fertilityScore = Math.min((crop.naturalFertility - crop.fertilityConsumption) / 100, 1);

                // Worker score accounts for farm + processing + fertilizer workers
                const processingWorkers = crop.processingChains.reduce((sum, chain) => {
                    return sum + (chain.machines || []).reduce((s, m) => s + (m.workers || 0) * m.count, 0);
                }, 0);
                const fertilizerWorkers = crop.withFertilizer?.workersNeeded || 0;
                const totalWorkers = farmWorkers + processingWorkers + fertilizerWorkers;
                const workerScore = totalWorkers === 0 ? 1 : Math.max(0, 1 - (totalWorkers / 20));

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

        return selectedCrops;
    }

    /**
     * ✅ Generate farms with smart tier selection based on optimization goal
     */
    static generateFarmsWithTierSelection({
        selectedCrops,
        availableFarms,
        constraints,
        research,
        foodConsumptionMultiplier,
        categoryTargets,
        optimizationGoal
    }) {
        console.log('🏭 Generating farms with exact Settlement feeding simulation...');

        const farms = [];
        let remainingTarget = constraints.targetPopulation;

        // ✅ Track cumulative production per category across all farms
        const cumulativeProduction = new Map();
        categoryTargets.forEach((target, catId) => {
            cumulativeProduction.set(catId, 0);
        });

        let farmIndex = 0;
        const maxIterations = constraints.maxFarms || 1000;  // ✅ Much higher default

        // Store simulation details for transparency
        const farmSimulations = [];

        while (remainingTarget > 10 && farmIndex < maxIterations) {
            // ✅ Evaluate each farm tier based on optimization goal
            let bestFarm = null;
            let bestFarmPerformance = null;
            let bestScore = -Infinity;

            console.log(`\n🏭 Farm ${farmIndex + 1}: Evaluating tiers for remaining ${remainingTarget.toFixed(0)} people...`);

            for (const farmProto of availableFarms) {
                // Skip farms that can't grow required crops
                const canGrowAllCrops = selectedCrops.every(c =>
                    this.isCropCompatibleWithFarm(c.crop, farmProto)
                );

                if (!canGrowAllCrops) {
                    console.log(`  ⏭️ ${farmProto.name}: Can't grow required crops`);
                    continue;
                }

                // Calculate performance for this farm
                const performance = this.calculateFarmPerformance({
                    farmProto,
                    selectedCrops,
                    research,
                    foodConsumptionMultiplier,
                    constraints
                });

                // ✅ Simulate what would happen if we added this farm's production
                const testProduction = new Map(cumulativeProduction);
                performance.byCategory.forEach((peopleFed, catId) => {
                    const current = testProduction.get(catId) || 0;
                    testProduction.set(catId, current + peopleFed);
                });

                // ✅ Run exact Settlement feeding simulation
                const simulation = this.simulateSettlementFeeding(
                    constraints.targetPopulation,
                    testProduction
                );

                // Calculate progress this farm would make
                const previouslyCovered = constraints.targetPopulation - remainingTarget;
                const wouldCover = simulation.targetSimulation.totalPeopleFed;
                const progressMade = wouldCover - previouslyCovered;

                // ✅ Skip farms that don't make progress
                if (progressMade <= 0) {
                    console.log(`  ⏭️ ${farmProto.name}: No progress (${progressMade.toFixed(0)})`);
                    continue;
                }

                // ✅ Calculate metrics for this farm
                const metrics = this.calculateFarmMetrics({
                    farmProto,
                    performance,
                    progressMade,
                    selectedCrops,
                    research
                });

                // ✅ Score based on optimization goal
                let score;
                let scoreBreakdown;

                switch (optimizationGoal) {
                    case 'minWater':
                        // Score: people fed per water used (higher = better)
                        score = metrics.waterEfficiency;
                        scoreBreakdown = `${metrics.peopleFedPerWater.toFixed(2)} people/water`;
                        break;

                    case 'minFertility':
                        // Score: people fed with minimal fertility usage (higher = better)
                        score = metrics.fertilityScore;
                        scoreBreakdown = `fertility ${metrics.avgFertility.toFixed(0)}%, score ${score.toFixed(2)}`;
                        break;

                    case 'minWorkers':
                        // Score: people fed per worker (higher = better)
                        score = metrics.workerEfficiency;
                        scoreBreakdown = `${metrics.peopleFedPerWorker.toFixed(2)} people/worker`;
                        break;

                    case 'maxVariety':
                        // Score: variety bonus + efficiency
                        score = metrics.varietyScore;
                        scoreBreakdown = `variety ${metrics.varietyScore.toFixed(2)}`;
                        break;

                    case 'balanced':
                    default:
                        // Score: weighted combination of all factors
                        score = metrics.balancedScore;
                        scoreBreakdown = `balanced ${score.toFixed(3)}`;
                        break;
                }

                console.log(`  📊 ${farmProto.name}: +${progressMade.toFixed(0)} people, ${scoreBreakdown}, score ${score.toFixed(3)}`);

                // ✅ Pick farm with best score for this optimization goal
                if (score > bestScore) {
                    bestScore = score;
                    bestFarm = farmProto;
                    bestFarmPerformance = performance;
                }
            }

            if (!bestFarm) {
                console.error('❌ Could not find ANY suitable farm tier!');
                console.error('Remaining target:', remainingTarget);
                console.error('Available farms:', availableFarms.map(f => f.id));
                console.error('Selected crops:', selectedCrops.map(c => c.cropName));

                // Last resort: use first available farm that can grow the crops
                bestFarm = availableFarms.find(f =>
                    selectedCrops.every(c => this.isCropCompatibleWithFarm(c.crop, f))
                );

                if (!bestFarm) {
                    throw new Error('No compatible farms available!');
                }

                bestFarmPerformance = this.calculateFarmPerformance({
                    farmProto: bestFarm,
                    selectedCrops,
                    research,
                    foodConsumptionMultiplier,
                    constraints
                });

                console.warn(`⚠️ Using fallback farm: ${bestFarm.name}`);
            }

            console.log(`  ✅ Selected: ${bestFarm.name} (score: ${bestScore.toFixed(3)})\n`);

            // Create farm with selected tier
            const rotation = selectedCrops.slice(0, 4).map((c, idx) => {
                const cropIndex = (farmIndex + idx) % selectedCrops.length;
                return selectedCrops[cropIndex].cropId;
            });

            while (rotation.length < 4) {
                rotation.push(null);
            }

            farms.push({
                id: Date.now() + farmIndex,
                farmId: bestFarm.id,
                rotation,
                selectedFertilizerId: null,
                customFertility: null
            });

            // ✅ Update cumulative production
            bestFarmPerformance.byCategory.forEach((peopleFed, catId) => {
                const current = cumulativeProduction.get(catId) || 0;
                cumulativeProduction.set(catId, current + peopleFed);
            });

            // ✅ Run simulation with all farms so far
            const simulation = this.simulateSettlementFeeding(
                constraints.targetPopulation,
                cumulativeProduction
            );

            // Store simulation details for this farm addition
            farmSimulations.push({
                farmNumber: farmIndex + 1,
                farmId: bestFarm.id,
                farmName: bestFarm.name,
                categoryProduction: Object.fromEntries(bestFarmPerformance.byCategory),
                cumulativeProduction: Object.fromEntries(cumulativeProduction),
                simulation: simulation
            });

            // ✅ Update remaining target using targetSimulation
            const previousRemaining = remainingTarget;
            remainingTarget = constraints.targetPopulation - simulation.targetSimulation.totalPeopleFed;
            const progressThisFarm = previousRemaining - remainingTarget;

            console.log(`  Farm ${farmIndex + 1}: ${bestFarm.name}`);
            console.log(`    Production by category:`, Object.fromEntries(bestFarmPerformance.byCategory));
            console.log(`    Target fed: ${simulation.targetSimulation.totalPeopleFed.toFixed(0)} / ${constraints.targetPopulation}`);
            console.log(`    Max capacity: ${simulation.maxCapacity.toFixed(0)} people`);
            console.log(`    Progress this farm: +${progressThisFarm.toFixed(0)} people`);
            console.log(`    Remaining: ${remainingTarget.toFixed(0)}`);
            console.log(`    Health categories: ${simulation.targetSimulation.healthCategoriesSatisfaction.toFixed(2)}`);

            farmIndex++;

            // ✅ Exit if we've met the target
            if (simulation.targetSimulation.wasFullyFed) {
                console.log(`✅ Target population fully fed!`);
                break;
            }
        }

        console.log(`✅ Generated ${farms.length} farms`);

        // ✅ Get final simulation details
        const finalSimulation = farmSimulations[farmSimulations.length - 1]?.simulation;

        if (finalSimulation) {
            console.log(`📊 Final simulation:`, {
                target: finalSimulation.targetPopulation,
                targetFed: finalSimulation.targetSimulation?.totalPeopleFed,
                maxCapacity: finalSimulation.maxCapacity,
                excess: finalSimulation.excessCapacity
            });
        }

        // ✅ Return farms WITH complete simulation data
        return {
            farms,
            simulationData: {
                targetPopulation: constraints.targetPopulation,
                farmSimulations,
                ...(finalSimulation || {})
            }
        };
    }

    /**
     * ✅ Calculate all metrics for a farm to support different optimization goals
     */
    static calculateFarmMetrics({
        farmProto,
        performance,
        progressMade,
        selectedCrops,
        research
    }) {
        const effectiveFarm = FarmOptimizer.calculateEffectiveFarmStats(
            { farmId: farmProto.id },
            [],
            research
        );

        // Calculate water usage for this farm
        let totalWaterPerDay = 0;
        let totalRotationDays = 0;

        selectedCrops.forEach(cropEval => {
            totalRotationDays += cropEval.growthDays;
        });

        selectedCrops.forEach(cropEval => {
            const weight = cropEval.growthDays / totalRotationDays;
            const waterPerDay = FarmOptimizer.calculateWaterPerDay(cropEval.crop, effectiveFarm);
            totalWaterPerDay += waterPerDay * weight;
        });

        // Add processing water
        selectedCrops.forEach(cropEval => {
            totalWaterPerDay += cropEval.processingWater || 0;
        });

        // Calculate workers needed
        const farmWorkers = farmProto.workers || 0;

        let processingWorkers = 0;
        selectedCrops.forEach(cropEval => {
            cropEval.processingChains?.forEach(chain => {
                chain.machines?.forEach(machine => {
                    processingWorkers += (machine.workers || 0) * machine.count;
                });
            });
        });

        const fertilizerWorkers = selectedCrops.some(c => c.withFertilizer)
            ? selectedCrops[0].withFertilizer?.workersNeeded || 0
            : 0;

        const totalWorkers = farmWorkers + processingWorkers + fertilizerWorkers;

        // Calculate fertility metrics
        const rotation = selectedCrops.slice(0, 4).map(c => c.cropId);
        while (rotation.length < 4) rotation.push(null);

        const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(rotation, effectiveFarm);
        const usingFertilizer = selectedCrops.some(c => c.usingFertilizer);
        const avgFertility = usingFertilizer
            ? selectedCrops[0].recommendedFertility || fertilityInfo.naturalEquilibrium
            : fertilityInfo.naturalEquilibrium;

        // ✅ Calculate efficiency metrics
        const waterEfficiency = totalWaterPerDay > 0 ? progressMade / totalWaterPerDay : 0;
        const workerEfficiency = totalWorkers > 0 ? progressMade / totalWorkers : progressMade;
        const peopleFedPerWater = totalWaterPerDay > 0 ? progressMade / totalWaterPerDay : 0;
        const peopleFedPerWorker = totalWorkers > 0 ? progressMade / totalWorkers : 0;

        // Fertility score (higher natural fertility = better, using fertilizer = penalty)
        const fertilityScore = usingFertilizer
            ? (progressMade / avgFertility) * 0.5  // Penalty for using fertilizer
            : (progressMade / avgFertility);

        // Variety score (more categories = better)
        const numCategories = performance.byCategory.size;
        const varietyScore = progressMade * (1 + numCategories * 0.1);

        // Balanced score (weighted combination)
        const waterScore = Math.min(waterEfficiency / 20, 1);
        const workerScore = totalWorkers === 0 ? 1 : Math.max(0, 1 - (totalWorkers / 50));
        const fertilityNormalizedScore = Math.min(fertilityScore / 100, 1);
        const progressScore = Math.min(progressMade / 1000, 1);

        const balancedScore =
            (waterScore * 0.30) +
            (workerScore * 0.25) +
            (fertilityNormalizedScore * 0.20) +
            (progressScore * 0.25);

        return {
            progressMade,
            totalWaterPerDay,
            totalWorkers,
            farmWorkers,
            processingWorkers,
            fertilizerWorkers,
            avgFertility,
            usingFertilizer,
            numCategories,
            waterEfficiency,
            workerEfficiency,
            peopleFedPerWater,
            peopleFedPerWorker,
            fertilityScore,
            varietyScore,
            balancedScore
        };
    }

    /**
     * ✅ Calculate farm performance per category
     */
    static calculateFarmPerformance({
        farmProto,
        selectedCrops,
        research,
        foodConsumptionMultiplier,
        constraints
    }) {
        const effectiveFarm = FarmOptimizer.calculateEffectiveFarmStats(
            { farmId: farmProto.id },
            [],
            research
        );

        // Build rotation
        const rotation = selectedCrops.slice(0, 4).map(c => c.cropId);
        while (rotation.length < 4) rotation.push(null);

        // Calculate fertility equilibrium
        const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(rotation, effectiveFarm);

        // Use recommended fertility if fertilizer is set
        const usingFertilizer = selectedCrops.some(c => c.usingFertilizer);
        const actualFertility = usingFertilizer && selectedCrops[0].recommendedFertility
            ? selectedCrops[0].recommendedFertility
            : fertilityInfo.naturalEquilibrium;

        // Calculate production per category
        const byCategory = new Map();
        let totalRotationDays = 0;

        selectedCrops.forEach(cropEval => {
            totalRotationDays += cropEval.growthDays;
        });

        selectedCrops.forEach(cropEval => {
            const weight = cropEval.growthDays / totalRotationDays;

            // Recalculate yield at actual fertility
            const actualYield = FarmOptimizer.calculateCropYield(
                cropEval.crop,
                effectiveFarm,
                actualFertility
            );

            const production = { [cropEval.crop.output.productId]: actualYield };
            const foodResult = FarmOptimizer.calculatePeopleFedWithChains(
                production,
                cropEval.waterPerDay,
                foodConsumptionMultiplier,
                constraints.allowedIntermediates,
                constraints.allowedRecipes
            );

            const peopleFed = foodResult.peopleFed * weight;
            const categoryId = cropEval.categoryId;

            if (categoryId) {
                const current = byCategory.get(categoryId) || 0;
                byCategory.set(categoryId, current + peopleFed);
            }
        });

        return {
            byCategory,
            totalPeopleFed: Math.min(...Array.from(byCategory.values()))
        };
    }

    /**
     * ✅ EXACT SIMULATION of Settlement.cs feedPopsFromCategories() algorithm
     * Phase 1: Feed target population
     * Phase 2: Find true maximum capacity
     */
    static simulateSettlementFeeding(targetPopulation, categoryProduction) {
        console.log('🎯 Phase 1: Simulating feeding for target population...');

        // Phase 1: Simulate feeding the target
        const targetSimulation = this.runFeedingSimulation(targetPopulation, categoryProduction);

        console.log(`✅ Phase 1 complete: ${targetSimulation.totalPeopleFed} / ${targetPopulation} fed`);

        // Phase 2: Find true maximum capacity
        console.log('🎯 Phase 2: Finding true maximum capacity...');

        let maxCapacity = targetPopulation;
        let maxSimulation = targetSimulation;

        if (targetSimulation.wasFullyFed) {
            let testPopulation = Math.ceil(targetPopulation * 1.1);
            let attempts = 0;
            const maxAttempts = 20;

            while (attempts < maxAttempts) {
                const testSim = this.runFeedingSimulation(testPopulation, categoryProduction);

                if (testSim.wasFullyFed) {
                    maxCapacity = testPopulation;
                    maxSimulation = testSim;
                    testPopulation = Math.ceil(testPopulation * 1.1);
                    attempts++;
                } else {
                    const exactMax = this.binarySearchMaxCapacity(
                        maxCapacity,
                        testPopulation,
                        categoryProduction
                    );

                    maxCapacity = exactMax.capacity;
                    maxSimulation = exactMax.simulation;
                    break;
                }
            }

            console.log(`✅ Phase 2 complete: True maximum capacity is ${maxCapacity} people`);
        } else {
            console.log(`⚠️ Phase 2 skipped: Target not fully met`);
            maxCapacity = targetSimulation.totalPeopleFed;
        }

        return {
            targetPopulation,
            targetSimulation,
            maxCapacity,
            maxSimulation,
            hasExcessCapacity: maxCapacity > targetPopulation,
            excessCapacity: maxCapacity - targetPopulation,
            totalPeopleFed: targetSimulation.totalPeopleFed,
            wasFullyFed: targetSimulation.wasFullyFed,
            healthCategoriesSatisfaction: targetSimulation.healthCategoriesSatisfaction
        };
    }

    /**
     * Binary search to find exact maximum feeding capacity
     */
    static binarySearchMaxCapacity(low, high, categoryProduction) {
        let best = { capacity: low, simulation: null };

        while (low <= high && (high - low) > 1) {
            const mid = Math.floor((low + high) / 2);
            const sim = this.runFeedingSimulation(mid, categoryProduction);

            if (sim.wasFullyFed) {
                best = { capacity: mid, simulation: sim };
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        const highSim = this.runFeedingSimulation(high, categoryProduction);
        if (highSim.wasFullyFed && high > best.capacity) {
            best = { capacity: high, simulation: highSim };
        }

        return best;
    }

    /**
     * Run a single feeding simulation (exact Settlement.cs algorithm)
     */
    static runFeedingSimulation(popsToFeed, categoryProduction) {
        const rounds = [];
        let remainingPops = popsToFeed;
        let roundNumber = 1;

        const remainingFood = new Map();
        categoryProduction.forEach((peopleFed, categoryId) => {
            remainingFood.set(categoryId, peopleFed);
        });

        const totalFedPerCategory = new Map();
        categoryProduction.forEach((_, categoryId) => {
            totalFedPerCategory.set(categoryId, 0);
        });

        let totalPeopleFed = 0;
        let healthCategoriesSatisfaction = 0;

        while (remainingPops > 0) {
            const categoriesWithFood = Array.from(remainingFood.entries())
                .filter(([_, food]) => food > 0)
                .map(([catId, _]) => catId);

            if (categoriesWithFood.length === 0) break;

            const numCategories = categoriesWithFood.length;
            const targetPerCategory = Math.ceil(remainingPops / numCategories);

            const roundDetails = {
                roundNumber,
                popsToFeedAtStart: remainingPops,
                categoriesWithFood: numCategories,
                targetPerCategory,
                categoryFeedings: []
            };

            let fedThisRound = 0;

            categoriesWithFood.forEach(categoryId => {
                const availableFood = remainingFood.get(categoryId);
                const requestedAmount = Math.min(targetPerCategory, remainingPops);
                const actuallyFed = Math.min(requestedAmount, availableFood);

                remainingFood.set(categoryId, availableFood - actuallyFed);
                totalFedPerCategory.set(categoryId, totalFedPerCategory.get(categoryId) + actuallyFed);

                remainingPops -= actuallyFed;
                fedThisRound += actuallyFed;
                totalPeopleFed += actuallyFed;

                if (roundNumber === 1) {
                    const satisfactionPercent = requestedAmount > 0
                        ? (actuallyFed / requestedAmount) * 100
                        : 0;
                    healthCategoriesSatisfaction += satisfactionPercent;
                }

                roundDetails.categoryFeedings.push({
                    categoryId,
                    requested: requestedAmount,
                    actuallyFed,
                    remaining: remainingFood.get(categoryId),
                    ranOut: remainingFood.get(categoryId) === 0
                });

                if (remainingPops <= 0) return;
            });

            roundDetails.totalFedThisRound = fedThisRound;
            roundDetails.remainingAfterRound = remainingPops;
            rounds.push(roundDetails);

            if (fedThisRound === 0) break;

            roundNumber++;
            if (roundNumber > 100) {
                console.error('❌ Feeding simulation exceeded 100 rounds');
                break;
            }
        }

        const unfedPeople = remainingPops;
        const healthCategoriesCount = healthCategoriesSatisfaction / 100;

        return {
            totalPeopleFed,
            unfedPeople,
            healthCategoriesSatisfaction: healthCategoriesCount,
            rounds,
            finalCategoryTotals: Object.fromEntries(totalFedPerCategory),
            remainingCapacity: Object.fromEntries(remainingFood),
            wasFullyFed: unfedPeople === 0,
            categoriesExhausted: Array.from(remainingFood.entries())
                .filter(([_, food]) => food === 0)
                .map(([catId, _]) => catId)
        };
    }

    /**
     * Compare farm costs (lower tier = cheaper)
     */
    static isCheaperFarm(farmA, farmB) {
        const tierOrder = { 'FarmT1': 1, 'FarmT2': 2, 'FarmT3': 3, 'FarmT4': 4 };
        return (tierOrder[farmA.id] || 99) < (tierOrder[farmB.id] || 99);
    }

    // Farm capability methods
    static farmSupportsGreenhouse(farm) {
        if (!farm) return false;
        return farm.isGreenhouse === true;
    }

    static farmSupportsFertilizer(farm) {
        if (!farm) return false;
        return farm.supportsIrrigation === true;
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
            fertilizer: f.capabilities.supportsFertilizer,
            workers: f.workers
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