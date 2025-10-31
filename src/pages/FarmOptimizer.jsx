import { useEffect, useState } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { FarmOptimizer } from '../utils/FarmOptimizer';
import { FarmConstants } from '../utils/FarmConstants';
import { getProductIcon, getCropIcon } from '../utils/AssetHelper';
import { FoodChainResolver } from '../utils/FoodChainResolver';


const FarmOptimizerPage = () => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);

    const [selectedProcessingRecipes, setSelectedProcessingRecipes] = useState(new Map());

    const [farms, setFarms] = useState([
        {
            id: 1,
            farmId: 'FarmT1',
            rotation: [null, null, null, null]
        }
    ]);

    const [optimizationMode, setOptimizationMode] = useState('manual');

    const [constraints, setConstraints] = useState({
        targetPopulation: 1000,
        allowedCrops: [],
        maxWaterPerDay: null,
        maxFertilityPerDay: null,
        targetFertility: 100
    });

    const [cropModal, setCropModal] = useState({
        open: false,
        farmIndex: null,
        slotIndex: null
    });

    const [cropFilterModal, setCropFilterModal] = useState(false);

    const [recipeSelectionModal, setRecipeSelectionModal] = useState({
        open: false,
        productId: null,
        productName: null,
        availableRecipes: []
    });

    const [research, setResearch] = useState({
        cropYield: 0,
        waterReduction: 0,
        rainYield: 0
    });

    const [foodConsumptionMult, setFoodConsumptionMult] = useState(1.0);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load game data on mount and when mod settings change
    useEffect(() => {
        document.title = 'Farm Optimizer - Captain of Industry Tools';

        const loadData = async () => {
            try {
                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
                const gameData = await DataLoader.loadGameData(enabledMods);

                console.log('Game data loaded:', gameData);

                ProductionCalculator.initialize(gameData);

                console.log('ProductionCalculator initialized');
                console.log('Recipes:', ProductionCalculator.recipes?.length);
                console.log('Foods:', ProductionCalculator.foods?.length);
                console.log('Crops:', ProductionCalculator.crops?.length);

                // Initialize food chain resolver
                FoodChainResolver.initialize(
                    ProductionCalculator.recipes || [],
                    ProductionCalculator.foods || [],
                    ProductionCalculator.crops || []
                );

                console.log('FoodChainResolver initialized');

                // PRE-COMPUTE food crops to avoid recalculation
                console.log('Pre-computing food crop list...');
                const start = Date.now();

                // Simple approach: if a crop produces a direct food OR is used in a recipe, include it
                const foodCropIds = new Set();

                // Add direct food crops
                ProductionCalculator.crops?.forEach(crop => {
                    const isDirectFood = ProductionCalculator.foods?.some(f => f.productId === crop.output.productId);
                    if (isDirectFood) {
                        foodCropIds.add(crop.id);
                    }
                });

                // Add crops that are inputs to recipes (might lead to food)
                ProductionCalculator.crops?.forEach(crop => {
                    const isUsedInRecipes = ProductionCalculator.recipes?.some(recipe =>
                        recipe.inputs.some(input => input.productId === crop.output.productId)
                    );
                    if (isUsedInRecipes) {
                        // Simple check: does ANY recipe chain lead to a food?
                        const outputProducts = new Set([crop.output.productId]);
                        const visited = new Set();
                        let foundFood = false;

                        // BFS through recipes (max 3 levels deep)
                        for (let depth = 0; depth < 3 && !foundFood; depth++) {
                            const newProducts = new Set();
                            outputProducts.forEach(productId => {
                                if (visited.has(productId)) return;
                                visited.add(productId);

                                // Is this product a food?
                                if (ProductionCalculator.foods?.some(f => f.productId === productId)) {
                                    foundFood = true;
                                    return;
                                }

                                // Find recipes that use this product as input
                                ProductionCalculator.recipes?.forEach(recipe => {
                                    if (recipe.inputs.some(input => input.productId === productId)) {
                                        recipe.outputs.forEach(output => newProducts.add(output.productId));
                                    }
                                });
                            });

                            newProducts.forEach(p => outputProducts.add(p));
                        }

                        if (foundFood) {
                            foodCropIds.add(crop.id);
                        }
                    }
                });

                // Store in ProductionCalculator for easy access
                ProductionCalculator.foodCropIds = foodCropIds;

                console.log(`Pre-computed ${foodCropIds.size} food crops in ${Date.now() - start}ms`);

                setDataLoaded(true);
            } catch (error) {
                console.error('Error loading farm data:', error);
                alert('Failed to load farm data: ' + error.message);
            }
        };

        loadData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    // Show loading screen if data not loaded yet
    if (!dataLoaded) {
        return (
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading farm data...</h2>
                <p style={{ color: '#888', fontSize: '1.1rem' }}>
                    {settings.enableModdedContent && settings.enabledMods?.length > 0
                        ? `Loading base game + ${settings.enabledMods.length} mod(s)...`
                        : 'Loading base game data...'}
                </p>
                <div style={{
                    marginTop: '2rem',
                    width: '60px',
                    height: '60px',
                    border: '6px solid #333',
                    borderTop: '6px solid #4a90e2',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    const availableFarms = ProductionCalculator.farms?.filter(f => f.type === 'crop') || [];
    const availableCrops = ProductionCalculator.crops || [];
    const availableFoodCrops = availableCrops.filter(crop =>
        ProductionCalculator.foodCropIds?.has(crop.id) ?? false
    );

    const handleCalculate = () => {
        setLoading(true);

        try {
            let optimizedRotations;

            if (optimizationMode === 'manual') {
                optimizedRotations = farms.map(f => f.rotation);
            } else {
                optimizedRotations = optimizeFarms();
            }

            const detailedResults = farms.map((farm, farmIdx) => {
                const farmProto = availableFarms.find(f => f.id === farm.farmId);
                if (!farmProto) {
                    throw new Error(`Farm ${farm.farmId} not found`);
                }

                const effectiveFarm = FarmOptimizer.calculateEffectiveFarmStats(
                    farm,
                    [],
                    research
                );

                const rotation = optimizedRotations[farmIdx] || [null, null, null, null];

                const production = {};
                let totalFarmWaterPerDay = 0;
                let totalRotationMonths = 0;
                let activeCropCount = 0;

                // Calculate per-slot details for display
                const slotDetails = rotation.map(cropId => {
                    if (!cropId) return null;

                    const crop = availableCrops.find(c => c.id === cropId);
                    if (!crop) return null;

                    const productionPerMonth = FarmOptimizer.calculateCropYield(crop, effectiveFarm);
                    const waterPerDay = FarmOptimizer.calculateWaterPerDay(crop, effectiveFarm);

                    // Accumulate total production
                    if (production[crop.output.productId]) {
                        production[crop.output.productId] += productionPerMonth;
                    } else {
                        production[crop.output.productId] = productionPerMonth;
                    }

                    totalFarmWaterPerDay += waterPerDay;

                    return {
                        cropId,
                        cropName: crop.name,
                        productionPerMonth,
                        waterPerDay,
                        productId: crop.output.productId
                    };
                }).filter(s => s !== null);

                activeCropCount = slotDetails.length;
                totalRotationMonths = slotDetails.reduce((sum, s) => {
                    const crop = availableCrops.find(c => c.id === s.cropId);
                    return sum + (crop ? crop.growthDays / 30 : 0);
                }, 0);

                const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(
                    rotation,
                    effectiveFarm
                );

                // Use enhanced calculation method
                let foodResult;
                if (optimizationMode === 'manual') {
                    // Manual mode - use user-selected recipes
                    foodResult = FarmOptimizer.calculatePeopleFedManual(
                        production,
                        Object.fromEntries(selectedProcessingRecipes),
                        totalFarmWaterPerDay,
                        foodConsumptionMult
                    );
                } else {
                    // Auto mode - automatically pick best recipes
                    foodResult = FarmOptimizer.calculatePeopleFedWithChains(
                        production,
                        totalFarmWaterPerDay,
                        foodConsumptionMult
                    );
                }

                // Calculate per-slot people fed
                const slotsWithPeopleFed = slotDetails.map(slot => {
                    const slotProduction = { [slot.productId]: slot.productionPerMonth };

                    let slotFoodResult;
                    if (optimizationMode === 'manual') {
                        slotFoodResult = FarmOptimizer.calculatePeopleFedManual(
                            slotProduction,
                            Object.fromEntries(selectedProcessingRecipes),
                            0,
                            foodConsumptionMult
                        );
                    } else {
                        slotFoodResult = FarmOptimizer.calculatePeopleFedWithChains(
                            slotProduction,
                            0,
                            foodConsumptionMult
                        );
                    }

                    return {
                        ...slot,
                        peopleFed: slotFoodResult.peopleFed,
                        processingChain: slotFoodResult.processingChains[0] || null
                    };
                });

                return {
                    farm,
                    effectiveFarm,
                    rotation,
                    production,
                    fertilityInfo,
                    peopleFed: foodResult.peopleFed,
                    totalWaterPerDay: foodResult.totalWaterPerDay,
                    farmWaterPerDay: totalFarmWaterPerDay,
                    processingWaterPerDay: foodResult.totalProcessingWater,
                    totalRotationMonths,
                    activeCropCount,
                    processingChains: foodResult.processingChains,
                    foodCategories: foodResult.foodCategories,
                    slotDetails: slotsWithPeopleFed
                };
            });

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

            // FERTILIZER CALCULATION - COMPLETE REWRITE
            let fertilizerNeeds = {
                needed: false,
                fertilizers: [], // Array of all 3 fertilizer types with quantities
                totalFarmsRequiring: 0
            };

            if (detailedResults.length > 0) {
                const targetFert = constraints.targetFertility;

                // Get all available fertilizers
                const allFertilizers = ProductionCalculator.fertilizers || [];

                // Calculate for each farm
                const farmFertilizerData = detailedResults.map((result, idx) => {
                    const naturalEq = result.fertilityInfo.naturalEquilibrium;

                    if (targetFert <= naturalEq) {
                        // This farm doesn't need fertilizer
                        return null;
                    }

                    // Calculate extra fertility needed per day
                    const extraFertilityNeededPercent = targetFert - naturalEq;

                    // Calculate quantity needed for EACH fertilizer type
                    const fertilizerOptions = allFertilizers.map(fertilizer => {
                        // Check if this fertilizer can reach target
                        if (fertilizer.maxFertility < targetFert) {
                            return null;
                        }

                        // Calculate quantity per day
                        // fertilityPerQuantity is how much % one unit provides per day
                        const quantityPerDay = extraFertilityNeededPercent / fertilizer.fertilityPerQuantity;

                        return {
                            fertilizerId: fertilizer.id,
                            fertilizerName: fertilizer.name,
                            quantityPerDay,
                            maxFertility: fertilizer.maxFertility,
                            fertilityPerQuantity: fertilizer.fertilityPerQuantity
                        };
                    }).filter(f => f !== null);

                    return {
                        farmIndex: idx,
                        naturalEquilibrium: naturalEq,
                        extraFertilityNeeded: extraFertilityNeededPercent,
                        fertilizerOptions
                    };
                }).filter(f => f !== null);

                if (farmFertilizerData.length > 0) {
                    fertilizerNeeds.needed = true;
                    fertilizerNeeds.totalFarmsRequiring = farmFertilizerData.length;

                    // Aggregate by fertilizer type across all farms
                    const fertilizerTotals = new Map();

                    farmFertilizerData.forEach(farmData => {
                        farmData.fertilizerOptions.forEach(option => {
                            const current = fertilizerTotals.get(option.fertilizerId) || {
                                id: option.fertilizerId,
                                name: option.fertilizerName,
                                totalQuantityPerDay: 0,
                                totalQuantityPerMonth: 0,
                                totalQuantityPerYear: 0,
                                maxFertility: option.maxFertility,
                                fertilityPerQuantity: option.fertilityPerQuantity,
                                farmsUsing: 0
                            };

                            current.totalQuantityPerDay += option.quantityPerDay;
                            current.farmsUsing += 1;

                            fertilizerTotals.set(option.fertilizerId, current);
                        });
                    });

                    // Convert to array and calculate monthly/yearly totals
                    fertilizerNeeds.fertilizers = Array.from(fertilizerTotals.values()).map(fert => ({
                        ...fert,
                        totalQuantityPerMonth: fert.totalQuantityPerDay * 30,
                        totalQuantityPerYear: fert.totalQuantityPerDay * 360
                    })).sort((a, b) => a.totalQuantityPerDay - b.totalQuantityPerDay); // Sort by efficiency (least needed first)
                }
            }

            // Combine all food categories with CORRECTED bonus calculation
            const allFoodCategories = new Set();
            const categoryDetails = new Map();
            const uniqueFoods = new Set(); // Track unique foods only
            const foodUnityDetails = []; // Track unity per food
            let totalUnity = 0;
            let totalHealthBonuses = 0;

            detailedResults.forEach(result => {
                if (result.foodCategories) {
                    result.foodCategories.categories.forEach(cat => {
                        // Check if this is a NEW category we haven't provided yet
                        if (!allFoodCategories.has(cat.id)) {
                            allFoodCategories.add(cat.id);

                            // First time providing this category = health bonus (if it has one)
                            const category = ProductionCalculator.foodCategories?.find(c => c.id === cat.id);
                            if (category && category.hasHealthBenefit) {
                                totalHealthBonuses += 1;
                            }
                        }

                        // Track category for display
                        const current = categoryDetails.get(cat.id) || {
                            name: cat.name,
                            hasHealthBenefit: cat.hasHealthBenefit,
                            peopleFed: 0
                        };
                        current.peopleFed += cat.peopleFed;
                        categoryDetails.set(cat.id, current);
                    });

                    // Track unity provided by each UNIQUE food (only count once)
                    result.processingChains?.forEach(chain => {
                        const food = ProductionCalculator.foods?.find(f => f.productId === chain.finalFoodProductId);
                        if (food && food.unityProvided > 0 && !uniqueFoods.has(food.productId)) {
                            uniqueFoods.add(food.productId); // Mark as counted

                            const unityPerMonth = food.unityProvided;
                            totalUnity += unityPerMonth;

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

            // Calculate processing machine requirements
            const allProcessingMachines = new Map();
            let totalProcessingElectricity = 0;
            let totalProcessingWorkers = 0;

            detailedResults.forEach(result => {
                result.processingChains?.forEach(chain => {
                    chain.machines?.forEach(machine => {
                        const current = allProcessingMachines.get(machine.machineId) || {
                            name: machine.machineName,
                            count: 0,
                            electricityKw: machine.electricityKw || 0,
                            workers: machine.workers || 0
                        };
                        current.count += machine.count;
                        allProcessingMachines.set(machine.machineId, current);

                        totalProcessingElectricity += (machine.electricityKw || 0) * machine.count;
                        totalProcessingWorkers += (machine.workers || 0) * machine.count;
                    });
                });
            });

            setResults({
                farms: detailedResults,
                totals: {
                    peopleFed: totalPeopleFed,
                    waterPerDay: totalWaterPerDay,
                    farmWaterPerDay: totalFarmWater,
                    processingWaterPerDay: totalProcessingWater,
                    waterPerMonth: totalWaterPerDay * 30,
                    production: allProduction,
                    fertilizerNeeds,
                    foodCategories: {
                        count: allFoodCategories.size,
                        categories: Array.from(categoryDetails.entries()).map(([id, data]) => ({
                            id,
                            ...data
                        })),
                        healthBonuses: totalHealthBonuses,
                        totalUnity: totalUnity,
                        unityBreakdown: foodUnityDetails
                    },
                    processingMachines: Array.from(allProcessingMachines.entries()).map(([id, data]) => ({
                        id,
                        ...data
                    })),
                    processingElectricity: totalProcessingElectricity,
                    processingWorkers: totalProcessingWorkers
                }
            });
        } catch (error) {
            console.error('Optimization error:', error);
            alert('Error during optimization: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const openRecipeSelectionModal = (productId) => {
        const product = ProductionCalculator.getProduct(productId);

        // Use NEW method: Find foods that can be made FROM this crop
        const foodPaths = FoodChainResolver.getFoodsFromCrop(productId);

        if (foodPaths.length === 0) {
            alert(`No food recipes found for ${product?.name}. This crop cannot be processed into food.`);
            return;
        }

        console.log('Food paths found:', foodPaths);

        // Get unique recipe chains
        const uniqueRecipeChains = new Map();

        foodPaths.forEach(path => {
            if (path.processingChain.length === 0) {
                // Direct food, no processing
                return;
            }

            // Use the first recipe in the chain as the identifier
            // (this is what the user will "select")
            const firstRecipe = path.processingChain[0];
            const chainKey = path.recipeChain.join('->');

            if (!uniqueRecipeChains.has(chainKey)) {
                const recipe = ProductionCalculator.getRecipe(firstRecipe.recipeId);
                if (recipe) {
                    uniqueRecipeChains.set(chainKey, {
                        ...recipe,
                        finalFoodProductId: path.finalFoodProductId,
                        fullChain: path.processingChain,
                        conversionRatio: path.conversionRatio
                    });
                }
            }
        });

        const recipes = Array.from(uniqueRecipeChains.values());

        if (recipes.length === 0) {
            alert(`${product?.name} is directly edible, no processing needed!`);
            return;
        }

        setRecipeSelectionModal({
            open: true,
            productId,
            productName: product?.name,
            availableRecipes: recipes
        });
    };

    // Add function to select recipe
    const selectProcessingRecipe = (productId, recipeId) => {
        setSelectedProcessingRecipes(prev => {
            const newMap = new Map(prev);
            newMap.set(productId, recipeId);
            return newMap;
        });
        setRecipeSelectionModal({ open: false, productId: null, productName: null, availableRecipes: [] });
    };

    /**
     * PROFESSIONAL OPTIMIZER - UPDATED
     * Now accounts for processing chains in calculations
     */
    const optimizeFarms = () => {
        const effectiveFarms = farms.map(f => {
            const farmProto = availableFarms.find(fp => fp.id === f.farmId);
            if (!farmProto) {
                throw new Error(`Farm ${f.farmId} not found`);
            }
            return FarmOptimizer.calculateEffectiveFarmStats(
                { ...f, farmId: farmProto.id },
                [],
                research
            );
        });

        let cropsToUse = constraints.allowedCrops.length > 0
            ? availableFoodCrops.filter(c => constraints.allowedCrops.includes(c.id))
            : availableFoodCrops;

        // Calculate base metrics for each crop INCLUDING PROCESSING CHAINS
        const cropMetrics = cropsToUse.map(crop => {
            const farm = effectiveFarms[0];
            if (!farm) return null;

            const productionPerMonth = FarmOptimizer.calculateCropYield(crop, farm);
            const waterPerDay = FarmOptimizer.calculateWaterPerDay(crop, farm);
            const fertilityPerDay = crop.fertilityPerDayPercent;

            // Calculate people fed using processing chains
            const production = { [crop.output.productId]: productionPerMonth };
            const foodResult = FarmOptimizer.calculatePeopleFedWithChains(
                production,
                waterPerDay,
                foodConsumptionMult
            );

            const peopleFedTotal = foodResult.peopleFed;

            // Skip crops that don't produce food
            if (peopleFedTotal === 0) return null;

            const monthsPerCycle = crop.growthDays / 30;
            const peopleFedPerMonth = peopleFedTotal / monthsPerCycle;

            // Get food category
            let foodCategory = null;
            if (foodResult.processingChains && foodResult.processingChains.length > 0) {
                foodCategory = foodResult.processingChains[0].foodCategory;
            }

            return {
                crop,
                productionPerMonth,
                waterPerDay: foodResult.totalWaterPerDay, // Include processing water
                fertilityPerDay,
                peopleFedPerMonth,
                waterPerPerson: peopleFedPerMonth > 0 ? foodResult.totalWaterPerDay / peopleFedPerMonth : Infinity,
                fertilityPerPerson: peopleFedPerMonth > 0 ? Math.abs(fertilityPerDay) / peopleFedPerMonth : Infinity,
                category: foodCategory,
                monthsPerCycle,
                processingChains: foodResult.processingChains
            };
        }).filter(m => m != null);

        // Handle different optimization modes
        switch (optimizationMode) {
            case 'maxPeople':
                return optimizeMaxPeople(cropMetrics, farms.length);
            case 'minWater':
                return optimizeMinWater(cropMetrics, farms.length);
            case 'minFertility':
                return optimizeMinFertility(cropMetrics, farms.length);
            case 'maxVariety':
                return optimizeForVariety(cropMetrics, farms.length);
            default:
                return optimizeMaxPeople(cropMetrics, farms.length);
        }
    };

    /**
     * Optimize for maximum people fed
     * Tests all combinations and finds the best setup for each farm
     */
    const optimizeMaxPeople = (cropMetrics, farmCount) => {
        // Generate all possible farm configurations (1-4 crops)
        const farmConfigs = generateFarmConfigurations(cropMetrics);

        // Sort by efficiency (people fed per month considering rotation)
        farmConfigs.sort((a, b) => b.efficiency - a.efficiency);

        const rotations = [];
        const usedCrops = new Set();

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
            // Find best config that doesn't reuse crops (unless necessary)
            let bestConfig = null;

            // First try: find config with no crop overlap
            for (const config of farmConfigs) {
                const hasOverlap = config.crops.some(c => usedCrops.has(c.crop.id));
                if (!hasOverlap) {
                    bestConfig = config;
                    break;
                }
            }

            // If all have overlap, just take the best
            if (!bestConfig && farmConfigs.length > 0) {
                bestConfig = farmConfigs[0];
            }

            if (bestConfig) {
                // Mark crops as used
                bestConfig.crops.forEach(c => usedCrops.add(c.crop.id));

                // Build rotation (pad with nulls to 4 slots)
                const rotation = bestConfig.crops.map(c => c.crop.id);
                while (rotation.length < 4) {
                    rotation.push(null);
                }
                rotations.push(rotation);
            } else {
                // No crops available
                rotations.push([null, null, null, null]);
            }
        }

        return rotations;
    };

    /**
     * Optimize for minimum water usage while meeting target population
     */
    const optimizeMinWater = (cropMetrics, farmCount) => {
        // Sort by water efficiency (least water per person)
        cropMetrics.sort((a, b) => a.waterPerPerson - b.waterPerPerson);

        const rotations = [];

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
            // Always add farms (don't leave empty)
            const rotation = [];
            const usedInThisRotation = new Set();

            // Fill with 2 best water-efficient crops
            for (let i = 0; i < cropMetrics.length && rotation.length < 2; i++) {
                const cropId = cropMetrics[i].crop.id;
                if (!usedInThisRotation.has(cropId)) {
                    rotation.push(cropId);
                    usedInThisRotation.add(cropId);
                }
            }

            while (rotation.length < 4) {
                rotation.push(null);
            }
            rotations.push(rotation);
        }

        return rotations;
    };


    /**
     * Optimize for minimum fertility usage while meeting target population
     */
    const optimizeMinFertility = (cropMetrics, farmCount) => {
        // Sort by fertility efficiency (least fertility loss per person)
        cropMetrics.sort((a, b) => a.fertilityPerPerson - b.fertilityPerPerson);

        const rotations = [];

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
            // Always add farms
            const rotation = [];
            const usedInThisRotation = new Set();

            for (let i = 0; i < cropMetrics.length && rotation.length < 2; i++) {
                const cropId = cropMetrics[i].crop.id;
                if (!usedInThisRotation.has(cropId)) {
                    rotation.push(cropId);
                    usedInThisRotation.add(cropId);
                }
            }

            while (rotation.length < 4) {
                rotation.push(null);
            }
            rotations.push(rotation);
        }

        return rotations;
    };

    /**
     * Optimize for maximum variety (all food categories)
     */
    const optimizeForVariety = (cropMetrics, farmCount) => {
        const categories = ['FoodCategory_Carbs', 'FoodCategory_Protein', 'FoodCategory_Vitamins', 'FoodCategory_Treats'];
        const rotations = [];
        const usedCrops = new Set();

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
            const rotation = [];

            // Try to fill with one crop from each category
            for (const category of categories) {
                if (rotation.length >= 2) break; // Limit to 2 for efficiency

                const cropInCategory = cropMetrics.find(m =>
                    m.category === category &&
                    !usedCrops.has(m.crop.id) &&
                    !rotation.includes(m.crop.id)
                );

                if (cropInCategory) {
                    rotation.push(cropInCategory.crop.id);
                    usedCrops.add(cropInCategory.crop.id);
                }
            }

            // Fill remaining with best available
            if (rotation.length < 2) {
                for (const metric of cropMetrics) {
                    if (rotation.length >= 2) break;
                    if (!usedCrops.has(metric.crop.id) && !rotation.includes(metric.crop.id)) {
                        rotation.push(metric.crop.id);
                        usedCrops.add(metric.crop.id);
                    }
                }
            }

            while (rotation.length < 4) {
                rotation.push(null);
            }
            rotations.push(rotation);
        }

        return rotations;
    };

    /**
     * Generate all possible farm configurations (1-4 crops)
     * and calculate their efficiency
     */
    const generateFarmConfigurations = (cropMetrics) => {
        const configs = [];

        // Test single crop (with rotation penalty)
        for (const crop of cropMetrics) {
            configs.push({
                crops: [crop],
                efficiency: crop.peopleFedPerMonth * 0.75, // 25% penalty for monoculture
                type: 'mono'
            });
        }

        // Test two-crop combinations (optimal - no penalty)
        for (let i = 0; i < cropMetrics.length; i++) {
            for (let j = i + 1; j < cropMetrics.length; j++) {
                const crop1 = cropMetrics[i];
                const crop2 = cropMetrics[j];
                const avgEfficiency = (crop1.peopleFedPerMonth + crop2.peopleFedPerMonth) / 2;

                configs.push({
                    crops: [crop1, crop2],
                    efficiency: avgEfficiency,
                    type: 'dual'
                });
            }
        }

        // Test three-crop combinations
        for (let i = 0; i < Math.min(cropMetrics.length, 10); i++) {
            for (let j = i + 1; j < Math.min(cropMetrics.length, 10); j++) {
                for (let k = j + 1; k < Math.min(cropMetrics.length, 10); k++) {
                    const crop1 = cropMetrics[i];
                    const crop2 = cropMetrics[j];
                    const crop3 = cropMetrics[k];
                    const avgEfficiency = (crop1.peopleFedPerMonth + crop2.peopleFedPerMonth + crop3.peopleFedPerMonth) / 3;

                    configs.push({
                        crops: [crop1, crop2, crop3],
                        efficiency: avgEfficiency,
                        type: 'triple'
                    });
                }
            }
        }

        // Test four-crop combinations (only top combos due to computational cost)
        const topCrops = cropMetrics.slice(0, 6);
        for (let i = 0; i < topCrops.length; i++) {
            for (let j = i + 1; j < topCrops.length; j++) {
                for (let k = j + 1; k < topCrops.length; k++) {
                    for (let l = k + 1; l < topCrops.length; l++) {
                        const crop1 = topCrops[i];
                        const crop2 = topCrops[j];
                        const crop3 = topCrops[k];
                        const crop4 = topCrops[l];
                        const avgEfficiency = (crop1.peopleFedPerMonth + crop2.peopleFedPerMonth +
                            crop3.peopleFedPerMonth + crop4.peopleFedPerMonth) / 4;

                        configs.push({
                            crops: [crop1, crop2, crop3, crop4],
                            efficiency: avgEfficiency,
                            type: 'quad'
                        });
                    }
                }
            }
        }

        return configs;
    };

    const toggleCropFilter = (cropId) => {
        setConstraints(prev => ({
            ...prev,
            allowedCrops: prev.allowedCrops.includes(cropId)
                ? prev.allowedCrops.filter(id => id !== cropId)
                : [...prev.allowedCrops, cropId]
        }));
    };

    const addFarm = () => {
        setFarms([...farms, {
            id: Date.now(),
            farmId: availableFarms[0]?.id || 'FarmT1',
            rotation: [null, null, null, null]
        }]);
    };

    const removeFarm = (id) => {
        setFarms(farms.filter(f => f.id !== id));
    };

    const updateFarmType = (id, farmId) => {
        setFarms(farms.map(f => f.id === id ? { ...f, farmId } : f));
    };

    const openCropModal = (farmIndex, slotIndex) => {
        setCropModal({ open: true, farmIndex, slotIndex });
    };

    const selectCrop = (cropId) => {
        const { farmIndex, slotIndex } = cropModal;
        setFarms(farms.map((farm, idx) => {
            if (idx === farmIndex) {
                const newRotation = [...farm.rotation];
                newRotation[slotIndex] = cropId;
                return { ...farm, rotation: newRotation };
            }
            return farm;
        }));
        setCropModal({ open: false, farmIndex: null, slotIndex: null });
    };

    return (
        <>
            {/* Page Header */}
            <div style={{
                maxWidth: '1920px',
                margin: '0 auto'
            }}>
                <div style={{
                padding: '1.5rem 2rem',
                backgroundColor: '#2a2a2a',
                borderBottom: '2px solid #4a90e2',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                marginBottom: '2rem'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #4a90e2 0%, #5aa0f2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Farm Optimizer
                </h2>
                <p style={{
                    color: '#aaa',
                    fontSize: '1rem',
                    margin: 0
                }}>
                    Professional-grade crop rotation optimizer with combinatorial analysis • {ProductionCalculator.crops.length} crops available
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: '1920px', margin: '0 auto', padding: '0 2rem 2rem', minHeight: 'calc(100vh - 300px)' }}>
                {/* Configuration Section */}
            <div style={{
                backgroundColor: '#2a2a2a',
                padding: '2rem',
                borderRadius: '10px',
                marginBottom: '2rem',
                border: '1px solid #444',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>
                    Configuration
                </h3>

                {/* Optimization Mode Selector */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#ddd',
                        marginBottom: '1rem'
                    }}>
                        Optimization Mode
                    </label>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        {[
                            { mode: 'manual', label: '✋ Manual', desc: 'Pick crops yourself' },
                            { mode: 'maxPeople', label: '👥 Max People', desc: 'Most people fed per month' },
                            { mode: 'minWater', label: '💧 Min Water', desc: 'Least water for target' },
                            { mode: 'minFertility', label: '🌱 Min Fertility', desc: 'Least fertility for target' },
                            { mode: 'maxVariety', label: '🌈 Max Variety', desc: 'All food categories' }
                        ].map(opt => (
                            <button
                                key={opt.mode}
                                onClick={() => setOptimizationMode(opt.mode)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: optimizationMode === opt.mode ? '#2a4a6a' : '#1a1a1a',
                                    border: optimizationMode === opt.mode ? '2px solid #4a90e2' : '1px solid #333',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left'
                                }}
                                onMouseEnter={(e) => {
                                    if (optimizationMode !== opt.mode) {
                                        e.currentTarget.style.backgroundColor = '#252525';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (optimizationMode !== opt.mode) {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                    }
                                }}
                            >
                                <div style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem', color: '#fff' }}>
                                    {opt.label}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                    {opt.desc}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Constraints */}
                {optimizationMode !== 'manual' && (
                    <div style={{
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        border: '1px solid #333'
                    }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ddd', marginBottom: '1rem' }}>
                            Constraints
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            {(optimizationMode === 'minWater' || optimizationMode === 'minFertility') && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem' }}>
                                        Target Population
                                    </label>
                                    <input
                                        type="number"
                                        value={constraints.targetPopulation}
                                        onChange={(e) => setConstraints({ ...constraints, targetPopulation: parseInt(e.target.value) || 0 })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            backgroundColor: '#2a2a2a',
                                            color: '#fff',
                                            border: '2px solid #555',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            )}

                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem' }}>
                                    Target Fertility (%)
                                </label>
                                <input
                                    type="number"
                                    value={constraints.targetFertility}
                                    onChange={(e) => setConstraints({ ...constraints, targetFertility: parseInt(e.target.value) || 100 })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: '#2a2a2a',
                                        color: '#fff',
                                        border: '2px solid #555',
                                        borderRadius: '6px',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem' }}>
                                    Allowed Crops
                                </label>
                                <button
                                    onClick={() => setCropFilterModal(true)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: '#2a2a2a',
                                        color: constraints.allowedCrops.length === 0 ? '#888' : '#4a90e2',
                                        border: '2px solid #555',
                                        borderRadius: '6px',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    {constraints.allowedCrops.length === 0
                                        ? 'All Crops'
                                        : `${constraints.allowedCrops.length} Selected`}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Farm Selection (manual mode) */}
                {optimizationMode === 'manual' && (
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <label style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ddd' }}>
                                Farms ({farms.length})
                            </label>
                            <button
                                onClick={addFarm}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    backgroundColor: '#4a90e2',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5aa0f2'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                            >
                                + Add Farm
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {farms.map((farm, farmIndex) => (
                                <FarmConfigCard
                                    key={farm.id}
                                    farm={farm}
                                    farmIndex={farmIndex}
                                    availableFarms={availableFarms}
                                    availableCrops={availableCrops}
                                    onRemove={removeFarm}
                                    onUpdateType={updateFarmType}
                                    onOpenCropModal={openCropModal}
                                    canRemove={farms.length > 1}
                                    openRecipeSelectionModal={openRecipeSelectionModal}
                                    selectedProcessingRecipes={selectedProcessingRecipes}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Farm count selector for optimization modes */}
                {optimizationMode !== 'manual' && (
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#ddd',
                            marginBottom: '1rem'
                        }}>
                            Number of Farms
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={farms.length}
                            onChange={(e) => {
                                const count = parseInt(e.target.value) || 1;
                                const newFarms = [];
                                for (let i = 0; i < count; i++) {
                                    newFarms.push(farms[i] || {
                                        id: Date.now() + i,
                                        farmId: availableFarms[0]?.id || 'FarmT1',
                                        rotation: [null, null, null, null]
                                    });
                                }
                                setFarms(newFarms);
                            }}
                            style={{
                                width: '200px',
                                padding: '0.75rem',
                                backgroundColor: '#1a1a1a',
                                color: '#fff',
                                border: '2px solid #555',
                                borderRadius: '6px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                )}

                {/* Research Sliders */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#ddd',
                        marginBottom: '1rem'
                    }}>
                        Incremental Research
                    </label>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <ResearchSlider
                            label="Crop Yield Increase"
                            value={research.cropYield}
                            max={250}
                            color="#4a90e2"
                            onChange={(val) => setResearch({ ...research, cropYield: val })}
                        />
                        <ResearchSlider
                            label="Water Saver"
                            value={research.waterReduction}
                            max={40}
                            color="#50C878"
                            isNegative
                            onChange={(val) => setResearch({ ...research, waterReduction: val })}
                        />
                    </div>
                </div>

                {/* Calculate Button */}
                <button
                    onClick={handleCalculate}
                    disabled={loading || farms.length === 0}
                    style={{
                        width: '100%',
                        padding: '1.2rem',
                        backgroundColor: loading || farms.length === 0 ? '#555' : '#4a90e2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.2rem',
                        cursor: loading || farms.length === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: '700',
                        transition: 'all 0.3s',
                        boxShadow: loading || farms.length === 0 ? 'none' : '0 4px 12px rgba(74, 144, 226, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading && farms.length > 0) {
                            e.currentTarget.style.backgroundColor = '#5aa0f2';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading && farms.length > 0) {
                            e.currentTarget.style.backgroundColor = '#4a90e2';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }
                    }}
                >
                    {loading ? '⏳ Analyzing combinations...' : optimizationMode === 'manual' ? '🚀 Calculate Production' : '🎯 Optimize & Calculate'}
                </button>
            </div>

            {/* Results Section */}
            {results && (
                <ResultsSection results={results} />
            )}

            {/* Modals */}
            {cropModal.open && (
                <CropSelectionModal
                    crops={availableCrops}
                    onSelect={selectCrop}
                    onClose={() => setCropModal({ open: false, farmIndex: null, slotIndex: null })}
                />
            )}
                
            {cropFilterModal && (
                <CropFilterModal
                    crops={availableFoodCrops}
                    selectedCrops={constraints.allowedCrops}
                    onToggle={toggleCropFilter}
                    onClose={() => setCropFilterModal(false)}
                />
                )}

                {/* Recipe Selection Modal for Manual Mode */}
                <RecipeSelectionModal
                    modal={recipeSelectionModal}
                    onSelect={selectProcessingRecipe}
                    onClose={() => setRecipeSelectionModal({ open: false, productId: null, productName: null, availableRecipes: [] })}
                    selectedProcessingRecipes={selectedProcessingRecipes}
                />
            </div>
        </>
    );
};

const FarmConfigCard = ({ farm, farmIndex, availableFarms, availableCrops, onRemove, onUpdateType, onOpenCropModal, canRemove, openRecipeSelectionModal, selectedProcessingRecipes }) => {
    return (
        <div style={{
            padding: '1.5rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#4a90e2'
                    }}>
                        Farm #{farmIndex + 1}
                    </div>

                    <select
                        value={farm.farmId}
                        onChange={(e) => onUpdateType(farm.id, e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#333',
                            color: 'white',
                            border: '2px solid #555',
                            borderRadius: '6px',
                            fontSize: '0.95rem',
                            cursor: 'pointer'
                        }}
                    >
                        {availableFarms.length > 0 ? (
                            availableFarms.map(f => (
                                <option key={f.id} value={f.id}>
                                    {f.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No farms available</option>
                        )}
                    </select>
                </div>

                <button
                    onClick={() => onRemove(farm.id)}
                    disabled={!canRemove}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: !canRemove ? '#555' : '#ff6b6b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        cursor: !canRemove ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Remove
                </button>
            </div>

            <div>
                <div style={{
                    fontSize: '0.9rem',
                    color: '#aaa',
                    marginBottom: '0.75rem',
                    fontWeight: '600'
                }}>
                    Crop Rotation (4 slots):
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1rem'
                }}>
                    {farm.rotation.map((cropId, slotIndex) => {
                        const crop = cropId ? availableCrops.find(c => c.id === cropId) : null;
                        const icon = crop ? getCropIcon(crop) : null;

                        // Check if this crop needs processing
                        const needsProcessing = crop ? !ProductionCalculator.foods?.find(f => f.productId === crop.output.productId) : false;
                        const hasRecipeSelected = crop ? selectedProcessingRecipes.has(crop.output.productId) : false;

                        return (
                            <div key={slotIndex} style={{ position: 'relative' }}>
                                <button
                                    onClick={() => onOpenCropModal(farmIndex, slotIndex)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        backgroundColor: crop ? '#2a4a6a' : '#2a2a2a',
                                        border: crop ? (needsProcessing && !hasRecipeSelected ? '2px solid #ff6b6b' : '2px solid #4a90e2') : '2px dashed #555',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        minHeight: '100px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = crop ? '#3a5a7a' : '#353535';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = crop ? '#2a4a6a' : '#2a2a2a';
                                    }}
                                >
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: '#888',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600'
                                    }}>
                                        SLOT {slotIndex + 1}
                                    </div>

                                    {crop ? (
                                        <>
                                            {icon && (
                                                <img
                                                    src={icon}
                                                    alt={crop.name}
                                                    style={{
                                                        width: '28px',
                                                        height: '28px',
                                                        objectFit: 'contain',
                                                        marginBottom: '0.5rem'
                                                    }}
                                                />
                                            )}
                                            <div style={{
                                                fontSize: '0.85rem',
                                                fontWeight: '700',
                                                color: '#fff',
                                                textAlign: 'center'
                                            }}>
                                                {crop.name}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                                                {crop.growthDays / 30} {crop.growthDays / 30 === 1 ? 'month' : 'months'}
                                            </div>

                                            {needsProcessing && (
                                                <div style={{
                                                    marginTop: '0.5rem',
                                                    padding: '2px 6px',
                                                    backgroundColor: hasRecipeSelected ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                                                    border: `1px solid ${hasRecipeSelected ? '#4a90e2' : '#ff6b6b'}`,
                                                    borderRadius: '3px',
                                                    fontSize: '0.65rem',
                                                    color: hasRecipeSelected ? '#4a90e2' : '#ff6b6b',
                                                    fontWeight: '700'
                                                }}>
                                                    {hasRecipeSelected ? '🏭 Recipe Set' : '⚠️ Needs Recipe'}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                            Click to select
                                        </div>
                                    )}
                                </button>

                                {/* Recipe selection button (appears when crop needs processing) */}
                                {crop && needsProcessing && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openRecipeSelectionModal(crop.output.productId);
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '4px',
                                            right: '4px',
                                            padding: '4px 8px',
                                            backgroundColor: hasRecipeSelected ? '#4a90e2' : '#ff6b6b',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '0.7rem',
                                            cursor: 'pointer',
                                            fontWeight: '700',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                            zIndex: 10
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                    >
                                        🏭
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ResearchSlider = ({ label, value, max, color, isNegative, onChange }) => {
    return (
        <div style={{
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '6px',
            border: '1px solid #333'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
            }}>
                <span style={{ color: '#ddd', fontSize: '0.95rem' }}>{label}</span>
                <span style={{ color, fontWeight: '700' }}>
                    {isNegative ? '-' : '+'}{value}%
                </span>
            </div>
            <input
                type="range"
                min="0"
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                style={{ width: '100%' }}
            />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#666',
                marginTop: '0.25rem'
            }}>
                <span>0</span>
                <span>Lvl {value}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

const CropFilterModal = ({ crops, selectedCrops, onToggle, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCrops = crops.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                border: '2px solid #444'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Filter Allowed Crops
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#4a90e2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Done
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search crops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        border: '2px solid #555',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        marginBottom: '1.5rem'
                    }}
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '1rem'
                }}>
                    {filteredCrops.map(crop => {
                        const isSelected = selectedCrops.includes(crop.id);
                        const icon = getCropIcon(crop);

                        return (
                            <button
                                key={crop.id}
                                onClick={() => onToggle(crop.id)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                                    border: isSelected ? '2px solid #4a90e2' : '2px solid #444',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                            >
                                {isSelected && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        fontSize: '1.2rem'
                                    }}>
                                        ✓
                                    </div>
                                )}
                                {icon && (
                                    <img
                                        src={icon}
                                        alt={crop.name}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>
                                    {crop.name}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CropSelectionModal = ({ crops, onSelect, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCrops = crops.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                border: '2px solid #444'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Select Crop
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#ff6b6b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        ✕ Close
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search crops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        border: '2px solid #555',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        marginBottom: '1.5rem'
                    }}
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <button
                        onClick={() => onSelect(null)}
                        style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            border: '2px dashed #555',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#252525';
                            e.currentTarget.style.borderColor = '#666';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                            e.currentTarget.style.borderColor = '#555';
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚫</div>
                        <div style={{
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            color: '#888',
                            textAlign: 'center'
                        }}>
                            Empty
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666' }}>
                            0 months
                        </div>
                    </button>

                    {filteredCrops.map(crop => {
                        const icon = getCropIcon(crop);

                        return (
                            <button
                                key={crop.id}
                                onClick={() => onSelect(crop.id)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: '#1a1a1a',
                                    border: '2px solid #444',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#2a4a6a';
                                    e.currentTarget.style.borderColor = '#4a90e2';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                                    e.currentTarget.style.borderColor = '#444';
                                }}
                            >
                                {icon && (
                                    <img
                                        src={icon}
                                        alt={crop.name}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>
                                    {crop.name}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                    {crop.growthDays / 30} {crop.growthDays / 30 === 1 ? 'month' : 'months'}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const RecipeSelectionModal = ({ modal, onSelect, onClose, selectedProcessingRecipes }) => {
    if (!modal.open) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                border: '2px solid #4a90e2'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Select Processing Recipe for {modal.productName}
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#ff6b6b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        ✕ Close
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {modal.availableRecipes.map(recipe => {
                        const finalFood = ProductionCalculator.getProduct(recipe.finalFoodProductId);
                        const isSelected = selectedProcessingRecipes.get(modal.productId) === recipe.id;

                        return (
                            <div
                                key={recipe.id + '-' + recipe.finalFoodProductId}
                                onClick={() => onSelect(modal.productId, recipe.id)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                                    border: isSelected ? '2px solid #4a90e2' : '1px solid #444',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#252525';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                    }
                                }}
                            >
                                <div style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '700', color: '#fff' }}>
                                    {recipe.name}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#FFD700', marginBottom: '0.5rem' }}>
                                    → Produces: {finalFood?.name}
                                </div>
                                {recipe.fullChain && recipe.fullChain.length > 0 && (
                                    <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                                        Chain: {modal.productName} → {recipe.fullChain.map(c => ProductionCalculator.getProduct(c.outputProductId)?.name).join(' → ')}
                                    </div>
                                )}
                                {recipe.requiresOtherInputs && recipe.contributionNote && (
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: '#ff9800',
                                        marginBottom: '0.5rem',
                                        padding: '4px 8px',
                                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(255, 152, 0, 0.3)'
                                    }}>
                                        ⚠️ {recipe.contributionNote}
                                    </div>
                                )}
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                    Duration: {recipe.durationSeconds}s • Conversion: {recipe.conversionRatio?.toFixed(2) || '1.00'} {modal.productName} per food
                                </div>
                                {isSelected && (
                                    <div style={{
                                        marginTop: '0.5rem',
                                        padding: '4px 8px',
                                        backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        color: '#4a90e2',
                                        fontWeight: '700'
                                    }}>
                                        ✓ Currently Selected
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ResultsSection = ({ results }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: '2rem' }}>
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    border: '1px solid #444',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                        Summary
                    </h3>

                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '6px',
                        marginBottom: '1rem',
                        border: '1px solid #333'
                    }}>
                        <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>
                            People Fed (per month)
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2' }}>
                            {results.totals.peopleFed.toLocaleString()}
                        </div>
                    </div>

                    {/* Food Categories Card - UPDATED WITH BONUSES */}
                    {results.totals.foodCategories && results.totals.foodCategories.count > 0 && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            marginBottom: '1rem',
                            border: results.totals.foodCategories.healthBonuses > 0 ? '2px solid #50C878' : '1px solid #333'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                                Food Variety Bonuses
                            </div>

                            {/* Main stats */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700' }}>
                                        {results.totals.foodCategories.count}/4
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#888' }}>Categories</div>
                                </div>

                                {results.totals.foodCategories.healthBonuses > 0 && (
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#50C878' }}>
                                            +{results.totals.foodCategories.healthBonuses}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: '#888' }}>Health</div>
                                    </div>
                                )}

                                {results.totals.foodCategories.totalUnity > 0 && (
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9b59b6' }}>
                                            +{results.totals.foodCategories.totalUnity.toFixed(0)}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: '#888' }}>Unity/mo</div>
                                    </div>
                                )}
                            </div>

                            {/* Category breakdown */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '0.75rem' }}>
                                {results.totals.foodCategories.categories.map(cat => (
                                    <div key={cat.id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontSize: '0.8rem',
                                        padding: '4px 8px',
                                        backgroundColor: '#2a2a2a',
                                        borderRadius: '4px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ color: '#ddd' }}>{cat.name}</span>
                                            {cat.hasHealthBenefit && (
                                                <span style={{ fontSize: '0.7rem', color: '#50C878', backgroundColor: 'rgba(80, 200, 120, 0.15)', padding: '1px 4px', borderRadius: '2px' }}>
                                                    +HP
                                                </span>
                                            )}
                                        </div>
                                        <span style={{ color: '#888', fontSize: '0.75rem' }}>
                                            {cat.peopleFed.toFixed(0)} ppl
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Unity breakdown (collapsible) */}
                            {results.totals.foodCategories.unityBreakdown && results.totals.foodCategories.unityBreakdown.length > 0 && (
                                <details style={{ marginTop: '0.75rem', fontSize: '0.75rem' }}>
                                    <summary style={{ color: '#9b59b6', cursor: 'pointer', userSelect: 'none', padding: '4px' }}>
                                        Unity Breakdown ({results.totals.foodCategories.unityBreakdown.length} foods)
                                    </summary>
                                    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        {results.totals.foodCategories.unityBreakdown.map((food, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '2px 6px',
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '3px'
                                            }}>
                                                <span style={{ color: '#bbb' }}>{food.productName}</span>
                                                <span style={{ color: '#9b59b6', fontWeight: '600' }}>+{food.unityProvided}</span>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            )}
                        </div>
                    )}

                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '6px',
                        marginBottom: '1rem',
                        border: '1px solid #333'
                    }}>
                        <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>
                            Water Usage
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#50C878' }}>
                            {results.totals.waterPerDay.toFixed(1)} /day
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div>Farm: {results.totals.farmWaterPerDay.toFixed(1)} /day</div>
                            <div>Processing: {results.totals.processingWaterPerDay.toFixed(1)} /day</div>
                            <div style={{ marginTop: '4px', paddingTop: '4px', borderTop: '1px solid #444' }}>
                                Total: {results.totals.waterPerMonth.toFixed(0)} /month
                            </div>
                        </div>
                    </div>

                    {/* Processing Machines Card */}
                    {results.totals.processingMachines && results.totals.processingMachines.length > 0 && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            marginBottom: '1rem',
                            border: '1px solid #333'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                                🏭 Processing Machines
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {results.totals.processingMachines.map(machine => (
                                    <div key={machine.id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '0.8rem',
                                        padding: '4px 8px',
                                        backgroundColor: '#2a2a2a',
                                        borderRadius: '4px'
                                    }}>
                                        <span style={{ color: '#ddd' }}>{machine.name}</span>
                                        <span style={{ color: '#fff', fontWeight: '700' }}>×{machine.count}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #444', fontSize: '0.75rem', color: '#888' }}>
                                <div>⚡ {results.totals.processingElectricity.toFixed(0)} kW</div>
                                <div>👷 {results.totals.processingWorkers} workers</div>
                            </div>
                        </div>
                    )}

                    {results.totals.fertilizerNeeds && results.totals.fertilizerNeeds.needed && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            marginBottom: '1rem',
                            border: '1px solid #333'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                                Fertilizer Options ({results.totals.fertilizerNeeds.totalFarmsRequiring} farm{results.totals.fertilizerNeeds.totalFarmsRequiring > 1 ? 's' : ''} need fertilizer)
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {results.totals.fertilizerNeeds.fertilizers.map((fert, idx) => (
                                    <div key={fert.id} style={{
                                        padding: '0.75rem',
                                        backgroundColor: idx === 0 ? 'rgba(255, 215, 0, 0.1)' : '#2a2a2a',
                                        border: idx === 0 ? '1px solid #FFD700' : '1px solid #444',
                                        borderRadius: '6px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FFD700' }}>
                                                {fert.name}
                                                {idx === 0 && (
                                                    <span style={{
                                                        fontSize: '0.7rem',
                                                        color: '#50C878',
                                                        backgroundColor: 'rgba(80, 200, 120, 0.15)',
                                                        padding: '2px 6px',
                                                        borderRadius: '3px',
                                                        marginLeft: '8px',
                                                        fontWeight: '700'
                                                    }}>
                                                        MOST EFFICIENT
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#ddd' }}>
                                            {fert.totalQuantityPerMonth.toFixed(1)} /month
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                                            {fert.totalQuantityPerDay.toFixed(2)} /day • {fert.totalQuantityPerYear.toFixed(0)} /year
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem' }}>
                                            Max fertility: {fert.maxFertility}% • +{fert.fertilityPerQuantity}% per unit
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ddd', marginBottom: '0.75rem' }}>
                            Total Production (per month):
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {Object.entries(results.totals.production).map(([productId, quantity]) => {
                                const product = ProductionCalculator.getProduct(productId);
                                const icon = getProductIcon(product);
                                return (
                                    <div
                                        key={productId}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.5rem',
                                            backgroundColor: '#1a1a1a',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        {icon && (
                                            <img
                                                src={icon}
                                                alt={product?.name}
                                                style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                            />
                                        )}
                                        <span style={{ flex: 1, color: '#ddd', fontSize: '0.9rem' }}>
                                            {product?.name || productId}
                                        </span>
                                        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                            {quantity.toFixed(0)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                backgroundColor: '#2a2a2a',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid #444',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                    Farm Details
                </h3>

                {results.farms.map((farmResult, index) => (
                    <FarmRotationCard
                        key={farmResult.farm.id}
                        farmNumber={index + 1}
                        farmResult={farmResult}
                    />
                ))}
            </div>
        </div>
    );
};

const FarmRotationCard = ({ farmNumber, farmResult }) => {
    const { farm, effectiveFarm, rotation, production, fertilityInfo, peopleFed, totalWaterPerDay, farmWaterPerDay, processingWaterPerDay, totalRotationMonths, activeCropCount, slotDetails, processingChains } = farmResult;

    return (
        <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333'
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#4a90e2', marginBottom: '0.5rem' }}>
                    Farm #{farmNumber} - {effectiveFarm.name}
                </h4>
                <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    Feeds {peopleFed.toFixed(1)} people/month • {totalWaterPerDay.toFixed(1)} water/day
                    {processingWaterPerDay > 0 && (
                        <span style={{ color: '#666', marginLeft: '8px' }}>
                            (Farm: {farmWaterPerDay.toFixed(1)} + Processing: {processingWaterPerDay.toFixed(1)})
                        </span>
                    )}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                {rotation.map((cropId, idx) => {
                    const crop = cropId ? ProductionCalculator.crops.find(c => c.id === cropId) : null;
                    const icon = crop ? getCropIcon(crop) : null;
                    const slotDetail = slotDetails?.find(s => s.cropId === cropId);

                    return (
                        <div
                            key={idx}
                            style={{
                                padding: '0.75rem',
                                backgroundColor: crop ? '#2a4a6a' : '#2a2a2a',
                                border: crop ? '2px solid #4a90e2' : '2px dashed #444',
                                borderRadius: '6px',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>
                                SLOT {idx + 1}
                            </div>
                            {crop && icon && (
                                <img
                                    src={icon}
                                    alt={crop.name}
                                    style={{ width: '24px', height: '24px', objectFit: 'contain', margin: '0.25rem auto' }}
                                />
                            )}
                            <div style={{ fontSize: '0.8rem', fontWeight: '600', color: crop ? '#fff' : '#666' }}>
                                {crop ? crop.name : 'Empty'}
                            </div>
                            {slotDetail && (
                                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #444', fontSize: '0.7rem' }}>
                                    <div style={{ color: '#4a90e2', fontWeight: '700' }}>
                                        {slotDetail.peopleFed.toFixed(0)} ppl/mo
                                    </div>
                                    <div style={{ color: '#50C878', marginTop: '2px' }}>
                                        {slotDetail.waterPerDay.toFixed(1)} H₂O/day
                                    </div>
                                    {slotDetail.processingChain && !slotDetail.processingChain.isDirect && (
                                        <div style={{ color: '#FFD700', marginTop: '2px', fontSize: '0.65rem' }}>
                                            🏭 Processed
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Show processing chain details if any */}
            {processingChains && processingChains.some(c => !c.isDirect) && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    border: '1px solid #4a90e2'
                }}>
                    <div style={{ fontSize: '0.9rem', color: '#4a90e2', fontWeight: '700', marginBottom: '0.5rem' }}>
                        🏭 Processing Required
                    </div>
                    {processingChains.filter(c => !c.isDirect).map((chain, idx) => {
                        const cropProduct = ProductionCalculator.getProduct(chain.cropProductId);
                        const foodProduct = ProductionCalculator.getProduct(chain.finalFoodProductId);

                        return (
                            <div key={idx} style={{
                                fontSize: '0.8rem',
                                color: '#ddd',
                                padding: '6px 8px',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '4px',
                                marginBottom: '4px'
                            }}>
                                <div style={{ marginBottom: '4px' }}>
                                    <strong>{cropProduct?.name}</strong> → <strong style={{ color: '#FFD700' }}>{foodProduct?.name}</strong>
                                </div>
                                {chain.machines && chain.machines.length > 0 && (
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                        {chain.machines.map(m => `${m.machineName} ×${m.count}`).join(', ')}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <div style={{
                padding: '1rem',
                backgroundColor: '#2a2a2a',
                borderRadius: '6px',
                marginBottom: '1rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    fontSize: '0.85rem'
                }}>
                    <div>
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>Natural Equilibrium</div>
                        <div style={{ color: '#FFD700', fontWeight: '700', fontSize: '1rem' }}>
                            {fertilityInfo.naturalEquilibrium.toFixed(1)}%
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>Avg Fertility/Day</div>
                        <div style={{ color: '#ff6b6b', fontWeight: '700', fontSize: '1rem' }}>
                            {fertilityInfo.avgFertilityPerDay.toFixed(2)}%
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>Rotation Length</div>
                        <div style={{ color: '#50C878', fontWeight: '700', fontSize: '1rem' }}>
                            {totalRotationMonths > 0
                                ? `${totalRotationMonths.toFixed(1)} ${totalRotationMonths === 1 ? 'month' : 'months'}`
                                : '0 months'}
                        </div>
                    </div>
                </div>
            </div>

            {Object.keys(production).length > 0 && (
                <div>
                    <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Production (per month):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {Object.entries(production).map(([productId, quantity]) => {
                            const product = ProductionCalculator.getProduct(productId);
                            const icon = getProductIcon(product);
                            return (
                                <div
                                    key={productId}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        backgroundColor: '#2a2a2a',
                                        borderRadius: '4px',
                                        border: '1px solid #444'
                                    }}
                                >
                                    {icon && (
                                        <img
                                            src={icon}
                                            alt={product?.name}
                                            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                        />
                                    )}
                                    <span style={{ color: '#ddd', fontSize: '0.85rem' }}>
                                        {product?.name}
                                    </span>
                                    <span style={{ color: '#4a90e2', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                        {quantity.toFixed(0)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FarmOptimizerPage;