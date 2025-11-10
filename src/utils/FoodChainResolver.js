/**
 * FoodChainResolver - Traces food production chains from crops through processing
 * NOW WITH: Comprehensive cost calculation for all chains
 */
import ProductionCalculator from './ProductionCalculator';


export class FoodChainResolver {
    static recipes = [];
    static foods = [];
    static crops = [];
    static machines = [];

    // ✅ Pre-calculated efficiency cache
    static chainEfficiencyCache = new Map();
    static baselineFarmWorkerProductivity = 0;
    static isInitialized = false;

    static initialize(recipes, foods, crops) {
        // ✅ CHECK IF ALREADY INITIALIZED
        if (this.isInitialized && this.chainEfficiencyCache.size > 0) {
            console.log('⏭️ FoodChainResolver already initialized, skipping cache rebuild...');
            return;
        }

        this.recipes = recipes;
        this.foods = foods;
        this.crops = crops;

        console.log('🔗 FoodChainResolver: Building comprehensive chain cost cache...');

        // Calculate baseline: "What can the best direct crop produce per worker?"
        this.baselineFarmWorkerProductivity = this.calculateBaselineFarmProductivity();
        console.log(`📊 Baseline farm worker productivity: ${this.baselineFarmWorkerProductivity.toFixed(1)} people/worker/month`);

        // Build the cache
        this.buildChainEfficiencyCache();

        this.isInitialized = true;
        console.log(`✅ Cached ${this.chainEfficiencyCache.size} crop → food chain combinations`);
    }

    /**
     * ✅ Calculate baseline farm worker productivity
     * Uses the BEST direct-consumption crop as baseline
     * This represents opportunity cost: "What could this worker produce if farming instead?"
     */
    static calculateBaselineFarmProductivity() {
        const directCrops = this.crops.filter(crop => {
            // Check if crop output is directly edible
            const isDirectFood = this.foods.some(f => f.productId === crop.output.productId);
            return isDirectFood;
        });

        if (directCrops.length === 0) {
            console.warn('⚠️ No direct food crops found, using fallback baseline');
            return 75; // Fallback baseline
        }

        // Calculate people fed per crop unit for direct crops
        let bestEfficiency = 0;

        directCrops.forEach(crop => {
            const food = this.foods.find(f => f.productId === crop.output.productId);
            if (!food) return;

            // People fed per 100 units of crop (at 1.0 consumption multiplier)
            const peopleFedPer100Units = (100 / food.consumedPerHundredPopsPerMonth) * 100;

            if (peopleFedPer100Units > bestEfficiency) {
                bestEfficiency = peopleFedPer100Units;
            }
        });

        // Assume 1 farm worker can tend ~4-5 crop slots effectively
        // This is an approximation - actual farm workers vary by farm type
        const workerProductivity = bestEfficiency / 4; // Conservative estimate

        return workerProductivity;
    }

    /**
     * ✅ Build comprehensive chain cost cache
     * For EVERY crop → food combination, calculate ALL metrics
     */
    static buildChainEfficiencyCache() {
        this.chainEfficiencyCache.clear();

        this.crops.forEach(crop => {
            const paths = this.getFoodsFromCrop(crop.output.productId);

            paths.forEach(path => {
                const cacheKey = `${crop.id}_${path.finalFoodProductId}`;

                // Calculate comprehensive metrics for this chain
                const chainMetrics = this.calculateComprehensiveChainMetrics(
                    crop,
                    path,
                    100 // Calculate per 100 units of crop for consistency
                );

                if (chainMetrics) {
                    this.chainEfficiencyCache.set(cacheKey, chainMetrics);
                }
            });
        });
    }

    /**
     * ✅ Calculate ALL metrics for a processing chain
     * This is the ONE SOURCE OF TRUTH for chain costs
     */
    static calculateComprehensiveChainMetrics(crop, path, inputQuantityPerMonth) {
        const food = this.foods.find(f => f.productId === path.finalFoodProductId);
        if (!food) {
            return null;
        }

        // 1. PEOPLE FED (base calculation)
        const finalFoodQuantity = inputQuantityPerMonth * path.conversionRatio;
        const peopleFed = (finalFoodQuantity / food.consumedPerHundredPopsPerMonth) * 100;

        // 2. PROCESSING CHAIN COSTS
        const chainCosts = this.calculateProcessingChainCosts(path.processingChain, inputQuantityPerMonth);

        // 3. WORKER OPPORTUNITY COST
        const workerOpportunityCost = chainCosts.totalWorkerMonths * this.baselineFarmWorkerProductivity;

        // 4. NET PEOPLE FED (after subtracting opportunity cost)
        const netPeopleFed = peopleFed - workerOpportunityCost;

        // 5. EFFICIENCY RATIOS (for sorting by optimization modes)
        const waterEfficiency = chainCosts.totalWaterPerDay > 0
            ? netPeopleFed / chainCosts.totalWaterPerDay
            : netPeopleFed;

        const workerEfficiency = chainCosts.totalWorkerMonths > 0
            ? netPeopleFed / chainCosts.totalWorkerMonths
            : netPeopleFed;

        const timeEfficiency = chainCosts.totalProcessingTimeHours > 0
            ? netPeopleFed / chainCosts.totalProcessingTimeHours
            : netPeopleFed;

        const electricityEfficiency = chainCosts.totalElectricityKw > 0
            ? netPeopleFed / chainCosts.totalElectricityKw
            : netPeopleFed;

        return {
            // Identifiers
            cropId: crop.id,
            cropName: crop.name,
            foodProductId: path.finalFoodProductId,
            foodName: food.name,
            isDirect: path.processingChain.length === 0,

            // Base metrics
            conversionRatio: path.conversionRatio,
            peopleFed: peopleFed,

            // Processing costs (absolute values)
            processingWorkerMonths: chainCosts.totalWorkerMonths,
            processingWaterPerDay: chainCosts.totalWaterPerDay,
            processingTimeHours: chainCosts.totalProcessingTimeHours,
            processingElectricityKw: chainCosts.totalElectricityKw,
            processingMachines: chainCosts.machines,

            // Opportunity cost
            workerOpportunityCost: workerOpportunityCost,
            netPeopleFed: netPeopleFed,

            // Efficiency scores (for optimization mode sorting)
            efficiencies: {
                water: waterEfficiency,
                workers: workerEfficiency,
                time: timeEfficiency,
                electricity: electricityEfficiency,
                overall: netPeopleFed // Can be used for "balanced" mode
            },

            // Chain details (for display)
            processingChain: path.processingChain,
            recipeChain: path.recipeChain
        };
    }

    /**
     * ✅ Calculate processing chain costs
     * Returns absolute costs for the given input quantity
     */
    static calculateProcessingChainCosts(processingChain, inputQuantityPerMonth) {
        if (!processingChain || processingChain.length === 0) {
            return {
                totalWorkerMonths: 0,
                totalWaterPerDay: 0,
                totalProcessingTimeHours: 0,
                totalElectricityKw: 0,
                machines: []
            };
        }

        let totalWorkerMonths = 0;
        let totalWaterPerDay = 0;
        let totalProcessingTimeHours = 0;
        let totalElectricityKw = 0;
        const machines = [];

        let currentQuantityPerMonth = inputQuantityPerMonth;

        processingChain.forEach((step, stepIndex) => {
            const recipe = this.recipes.find(r => r.id === step.recipeId);
            if (!recipe) {
                console.warn(`Recipe ${step.recipeId} not found`);
                return;
            }

            // Find machine that can run this recipe
            const machine = this.findMachineForRecipe(recipe.id);
            if (!machine) {
                console.warn(`No machine found for recipe ${recipe.id}`);
                return;
            }

            // Calculate how much output this step needs to produce
            const requiredOutputPerMonth = currentQuantityPerMonth * (step.outputQuantity / step.inputQuantity);

            // How many cycles of this recipe are needed per month?
            const cyclesNeededPerMonth = requiredOutputPerMonth / step.outputQuantity;

            // How long does each cycle take?
            const cycleDurationSeconds = recipe.durationSeconds;
            const cycleDurationMonths = cycleDurationSeconds / (30 * 24 * 60 * 60);

            // How many "machine-months" are needed? (1 machine running for 1 month = 1 machine-month)
            const machineMonthsNeeded = cyclesNeededPerMonth * cycleDurationMonths;

            // Worker-months = machine-months × workers per machine
            const workersPerMachine = machine.workers || 0;
            const workerMonthsForThisStep = machineMonthsNeeded * workersPerMachine;
            totalWorkerMonths += workerMonthsForThisStep;

            // Processing time in hours (for time efficiency metric)
            const processingTimeHours = (cycleDurationSeconds / 3600) * cyclesNeededPerMonth;
            totalProcessingTimeHours += processingTimeHours;

            // Electricity consumption (continuous draw while running)
            const electricityKw = (machine.electricityKw || 0) * machineMonthsNeeded;
            totalElectricityKw += electricityKw;

            // Water consumption from recipe inputs
            const waterInput = recipe.inputs.find(input => {
                const product = this.getProduct(input.productId);
                return product?.name?.toLowerCase().includes('water');
            });

            if (waterInput) {
                const waterPerCycle = waterInput.quantity;
                const waterPerMonth = waterPerCycle * cyclesNeededPerMonth;
                const waterPerDay = waterPerMonth / 30;
                totalWaterPerDay += waterPerDay;
            }

            // Track machine details
            machines.push({
                stepIndex,
                recipeId: recipe.id,
                recipeName: recipe.name,
                machineId: machine.id,
                machineName: machine.name,
                machineCount: machineMonthsNeeded,
                workers: workersPerMachine,
                electricityKw: machine.electricityKw || 0,
                cycleDuration: cycleDurationSeconds,
                cyclesNeeded: cyclesNeededPerMonth
            });

            // Update quantity for next step
            currentQuantityPerMonth = requiredOutputPerMonth;
        });

        return {
            totalWorkerMonths,
            totalWaterPerDay,
            totalProcessingTimeHours,
            totalElectricityKw,
            machines
        };
    }

    /**
 * Find machine that can run a specific recipe
 */
    static findMachineForRecipe(recipeId) {
        const machines = ProductionCalculator.getMachinesForRecipe(recipeId);
        return machines && machines.length > 0 ? machines[0] : null;
    }


    /**
     * Get product by ID
     */
    static getProduct(productId) {
        return ProductionCalculator.getProduct(productId);
    }

    /**
     * ✅ Get cached chain metrics
     * Used by optimization engine instead of calculating on-the-fly
     */
    static getChainMetrics(cropId, foodProductId) {
        const cacheKey = `${cropId}_${foodProductId}`;
        return this.chainEfficiencyCache.get(cacheKey);
    }

    /**
     * ✅ Get all cached chains for a crop
     * Returns all possible food outputs with their metrics
     */
    static getAllChainsForCrop(cropId) {
        const chains = [];

        this.chainEfficiencyCache.forEach((metrics, key) => {
            if (key.startsWith(`${cropId}_`)) {
                chains.push(metrics);
            }
        });

        return chains;
    }

    /**
     * ✅ Get best chain for a crop based on optimization mode
     * This is what the optimizer will use
     */
    static getBestChainForCrop(cropId, optimizationMode) {
        const chains = this.getAllChainsForCrop(cropId);

        if (chains.length === 0) return null;

        // Sort by appropriate metric based on optimization mode
        const sorted = [...chains].sort((a, b) => {
            switch (optimizationMode) {
                case 'minWater':
                    return b.efficiencies.water - a.efficiencies.water;

                case 'minWorkers':
                    return b.efficiencies.workers - a.efficiencies.workers;

                case 'minFertility':
                    // For fertility, we want highest net people fed (to minimize farms needed)
                    return b.netPeopleFed - a.netPeopleFed;

                case 'maxVariety':
                    // Prefer direct foods for variety
                    if (a.isDirect !== b.isDirect) return a.isDirect ? -1 : 1;
                    return b.netPeopleFed - a.netPeopleFed;

                case 'balanced':
                default:
                    return b.efficiencies.overall - a.efficiencies.overall;
            }
        });

        return sorted[0];
    }

    // ===== EXISTING METHODS (keep for backwards compatibility) =====

    /**
     * Find all possible food outputs from a crop (with processing chains)
     */
    static getFoodsFromCrop(cropProductId) {
        const results = [];

        // Check if crop output is directly edible
        const directFood = this.foods.find(f => f.productId === cropProductId);
        if (directFood) {
            results.push({
                cropProductId: cropProductId,
                finalFoodProductId: directFood.productId,
                conversionRatio: 1.0,
                processingChain: [],
                recipeChain: [],
                isDirect: true
            });
        }

        // Find all recipes that can process this crop into food
        const processingPaths = this.traceToFood(cropProductId);
        results.push(...processingPaths);

        return results;
    }

    /**
     * Trace a product to all possible food outputs through recipes
     */
    static traceToFood(startProductId, depth = 0, maxDepth = 5, visited = new Set()) {
        if (depth > maxDepth || visited.has(startProductId)) {
            return [];
        }

        visited.add(startProductId);
        const results = [];

        // Find all recipes that USE this product as input
        const consumingRecipes = this.recipes.filter(recipe =>
            recipe.inputs.some(input => input.productId === startProductId)
        );

        consumingRecipes.forEach(recipe => {
            const inputData = recipe.inputs.find(input => input.productId === startProductId);

            recipe.outputs.forEach(output => {
                const outputProductId = output.productId;

                // Is this output a food?
                const isFood = this.foods.some(f => f.productId === outputProductId);

                if (isFood) {
                    // Found a food! Calculate conversion ratio
                    const conversionRatio = output.quantity / inputData.quantity;

                    results.push({
                        cropProductId: startProductId,
                        finalFoodProductId: outputProductId,
                        conversionRatio: conversionRatio,
                        processingChain: [{
                            recipeId: recipe.id,
                            recipeName: recipe.name,
                            inputProductId: startProductId,
                            outputProductId: outputProductId,
                            inputQuantity: inputData.quantity,
                            outputQuantity: output.quantity,
                            inputRatio: 1.0
                        }],
                        recipeChain: [recipe.id],
                        isDirect: false
                    });
                } else {
                    // Not a food yet, continue tracing
                    const deeperPaths = this.traceToFood(
                        outputProductId,
                        depth + 1,
                        maxDepth,
                        new Set(visited)
                    );

                    // Combine this step with deeper paths
                    deeperPaths.forEach(deepPath => {
                        const combinedRatio = (output.quantity / inputData.quantity) * deepPath.conversionRatio;

                        results.push({
                            cropProductId: startProductId,
                            finalFoodProductId: deepPath.finalFoodProductId,
                            conversionRatio: combinedRatio,
                            processingChain: [
                                {
                                    recipeId: recipe.id,
                                    recipeName: recipe.name,
                                    inputProductId: startProductId,
                                    outputProductId: outputProductId,
                                    inputQuantity: inputData.quantity,
                                    outputQuantity: output.quantity,
                                    inputRatio: 1.0
                                },
                                ...deepPath.processingChain
                            ],
                            recipeChain: [recipe.id, ...deepPath.recipeChain],
                            isDirect: false
                        });
                    });
                }
            });
        });

        return results;
    }

    /**
     * Get all crops that can produce a specific food (reverse lookup)
     */
    static getCropsForFood(foodProductId) {
        const results = [];

        this.crops.forEach(crop => {
            const chains = this.getFoodsFromCrop(crop.output.productId);
            const matchingChains = chains.filter(chain => chain.finalFoodProductId === foodProductId);

            matchingChains.forEach(chain => {
                results.push({
                    cropId: crop.id,
                    cropName: crop.name,
                    ...chain
                });
            });
        });

        return results;
    }

    /**
     * ✅ Clear cache (for when data changes)
     */
    static clearCache() {
        this.chainEfficiencyCache.clear();
        this.isInitialized = false;
        console.log('🗑️ FoodChainResolver cache cleared');
    }
}