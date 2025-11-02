import { useEffect, useState } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { FarmOptimizer } from '../utils/FarmOptimizer';
import { FarmConstants } from '../utils/FarmConstants';
import { getProductIcon, getCropIcon, getGeneralIcon, getMachineImage, getEntityIcon } from '../utils/AssetHelper';
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
    const [pendingMode, setPendingMode] = useState(null);
    const [showModeConfirm, setShowModeConfirm] = useState(false);
    const [constraintsExpanded, setConstraintsExpanded] = useState(false);
    const [activeConstraintTab, setActiveConstraintTab] = useState('farms');

    const [constraints, setConstraints] = useState({
        targetPopulation: 1000,
        allowedCrops: [],
        allowedIntermediates: null,
        allowedFarmTypes: [],
        maxWaterPerDay: null,
        maxFertilityPerDay: null,
        targetFertility: 100,
        useFertilizer: false
    });

    const [cropModal, setCropModal] = useState({
        open: false,
        farmIndex: null,
        slotIndex: null
    });

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

    useEffect(() => {
        document.title = 'Farm Optimizer - Captain of Industry Tools';

        const loadData = async () => {
            try {
                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
                const gameData = await DataLoader.loadGameData(enabledMods);

                ProductionCalculator.initialize(gameData);
                FoodChainResolver.initialize(
                    ProductionCalculator.recipes || [],
                    ProductionCalculator.foods || [],
                    ProductionCalculator.crops || []
                );

                const foodCropIds = new Set();
                ProductionCalculator.crops?.forEach(crop => {
                    const isDirectFood = ProductionCalculator.foods?.some(f => f.productId === crop.output.productId);
                    if (isDirectFood) {
                        foodCropIds.add(crop.id);
                    }
                });

                ProductionCalculator.crops?.forEach(crop => {
                    const isUsedInRecipes = ProductionCalculator.recipes?.some(recipe =>
                        recipe.inputs.some(input => input.productId === crop.output.productId)
                    );
                    if (isUsedInRecipes) {
                        const outputProducts = new Set([crop.output.productId]);
                        const visited = new Set();
                        let foundFood = false;

                        for (let depth = 0; depth < 3 && !foundFood; depth++) {
                            const newProducts = new Set();
                            outputProducts.forEach(productId => {
                                if (visited.has(productId)) return;
                                visited.add(productId);

                                if (ProductionCalculator.foods?.some(f => f.productId === productId)) {
                                    foundFood = true;
                                    return;
                                }

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

                ProductionCalculator.foodCropIds = foodCropIds;
                setDataLoaded(true);
            } catch (error) {
                console.error('Error loading farm data:', error);
                alert('Failed to load farm data: ' + error.message);
            }
        };

        loadData();
    }, [settings.enableModdedContent, settings.enabledMods]);

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

    const allIntermediates = (() => {
        const intermediateSet = new Set();
        availableFoodCrops.forEach(crop => {
            const paths = FoodChainResolver.getFoodsFromCrop(crop.output.productId);
            paths.forEach(path => {
                path.processingChain?.forEach(step => {
                    const isFood = ProductionCalculator.foods?.some(f => f.productId === step.outputProductId);
                    if (!isFood) {
                        const product = ProductionCalculator.getProduct(step.outputProductId);
                        if (product) {
                            intermediateSet.add(product);
                        }
                    }
                });
            });
        });
        return Array.from(intermediateSet).sort((a, b) => a.name.localeCompare(b.name));
    })();

    const handleModeChange = (newMode) => {
        if (optimizationMode === 'manual' && newMode !== 'manual' && farms.some(f => f.rotation.some(r => r !== null))) {
            setPendingMode(newMode);
            setShowModeConfirm(true);
        } else {
            setOptimizationMode(newMode);
        }
    };

    const confirmModeChange = () => {
        setOptimizationMode(pendingMode);
        setShowModeConfirm(false);
        setPendingMode(null);
    };

    const cancelModeChange = () => {
        setShowModeConfirm(false);
        setPendingMode(null);
    };

    const toggleFarmType = (farmId) => {
        setConstraints(prev => ({
            ...prev,
            allowedFarmTypes: prev.allowedFarmTypes.includes(farmId)
                ? prev.allowedFarmTypes.filter(id => id !== farmId)
                : [...prev.allowedFarmTypes, farmId]
        }));
    };

    const toggleCropFilter = (cropId) => {
        setConstraints(prev => ({
            ...prev,
            allowedCrops: prev.allowedCrops.includes(cropId)
                ? prev.allowedCrops.filter(id => id !== cropId)
                : [...prev.allowedCrops, cropId]
        }));
    };

    const toggleIntermediate = (productId) => {
        setConstraints(prev => {
            if (prev.allowedIntermediates === null) {
                const allIntermediateIds = allIntermediates.map(p => p.id);
                return {
                    ...prev,
                    allowedIntermediates: allIntermediateIds.filter(id => id !== productId)
                };
            }

            if (prev.allowedIntermediates.includes(productId)) {
                return {
                    ...prev,
                    allowedIntermediates: prev.allowedIntermediates.filter(id => id !== productId)
                };
            }

            return {
                ...prev,
                allowedIntermediates: [...prev.allowedIntermediates, productId]
            };
        });
    };

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

                const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(
                    rotation,
                    effectiveFarm
                );

                let actualFertility;
                let usedFertilizer = false;

                if (constraints.useFertilizer) {
                    actualFertility = constraints.targetFertility;
                    usedFertilizer = constraints.targetFertility > fertilityInfo.naturalEquilibrium;
                } else {
                    actualFertility = fertilityInfo.naturalEquilibrium;
                    usedFertilizer = false;
                }

                const slotDetails = rotation.map(cropId => {
                    if (!cropId) return null;

                    const crop = availableCrops.find(c => c.id === cropId);
                    if (!crop) return null;

                    const productionPerMonth = FarmOptimizer.calculateCropYield(crop, effectiveFarm, actualFertility);
                    const waterPerDay = FarmOptimizer.calculateWaterPerDay(crop, effectiveFarm);

                    return {
                        cropId,
                        cropName: crop.name,
                        productionPerMonth,
                        waterPerDay,
                        productId: crop.output.productId,
                        growthDays: crop.growthDays
                    };
                }).filter(s => s !== null);

                const totalRotationDays = slotDetails.reduce((sum, s) => sum + s.growthDays, 0);
                const production = {};
                let totalFarmWaterPerDay = 0;

                slotDetails.forEach(slot => {
                    const weight = totalRotationDays > 0 ? slot.growthDays / totalRotationDays : 0;
                    const avgProductionPerMonth = slot.productionPerMonth * weight;
                    production[slot.productId] = (production[slot.productId] || 0) + avgProductionPerMonth;
                    totalFarmWaterPerDay += slot.waterPerDay * weight;
                });

                const activeCropCount = slotDetails.length;
                const totalRotationMonths = totalRotationDays / 30;

                const allowedIntermediatesForCalc = constraints.allowedIntermediates;

                let foodResult;
                if (optimizationMode === 'manual') {
                    foodResult = FarmOptimizer.calculatePeopleFedManual(
                        production,
                        Object.fromEntries(selectedProcessingRecipes),
                        totalFarmWaterPerDay,
                        foodConsumptionMult
                    );
                } else {
                    foodResult = FarmOptimizer.calculatePeopleFedWithChains(
                        production,
                        totalFarmWaterPerDay,
                        foodConsumptionMult,
                        allowedIntermediatesForCalc
                    );
                }

                const slotsWithPeopleFed = slotDetails.map(slot => {
                    const weight = totalRotationDays > 0 ? slot.growthDays / totalRotationDays : 0;
                    const weightedProduction = slot.productionPerMonth * weight;
                    const slotProduction = { [slot.productId]: weightedProduction };

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
                            foodConsumptionMult,
                            allowedIntermediatesForCalc
                        );
                    }

                    return {
                        ...slot,
                        peopleFed: slotFoodResult.peopleFed,
                        processingChain: slotFoodResult.processingChains[0] || null,
                        weight: weight,
                        weightedProduction: weightedProduction
                    };
                });

                return {
                    farm,
                    effectiveFarm,
                    rotation,
                    production,
                    fertilityInfo,
                    actualFertility,
                    usedFertilizer,
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

            let fertilizerNeeds = {
                needed: false,
                fertilizers: [],
                totalFarmsRequiring: 0
            };

            if (constraints.useFertilizer && detailedResults.length > 0) {
                const targetFert = constraints.targetFertility;
                const allFertilizers = ProductionCalculator.fertilizers || [];

                const farmFertilizerData = detailedResults.map((result, idx) => {
                    const naturalEq = result.fertilityInfo.naturalEquilibrium;

                    if (targetFert <= naturalEq) {
                        return null;
                    }

                    const extraFertilityNeededPercent = targetFert - naturalEq;

                    const fertilizerOptions = allFertilizers.map(fertilizer => {
                        if (fertilizer.maxFertility < targetFert) {
                            return null;
                        }

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

                    fertilizerNeeds.fertilizers = Array.from(fertilizerTotals.values()).map(fert => ({
                        ...fert,
                        totalQuantityPerMonth: fert.totalQuantityPerDay * 30,
                        totalQuantityPerYear: fert.totalQuantityPerDay * 360
                    })).sort((a, b) => a.totalQuantityPerDay - b.totalQuantityPerDay);
                }
            }

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
        const foodPaths = FoodChainResolver.getFoodsFromCrop(productId);

        if (foodPaths.length === 0) {
            alert(`No food recipes found for ${product?.name}. This crop cannot be processed into food.`);
            return;
        }

        const uniqueRecipeChains = new Map();

        foodPaths.forEach(path => {
            if (path.processingChain.length === 0) {
                return;
            }

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

    const selectProcessingRecipe = (productId, recipeId) => {
        setSelectedProcessingRecipes(prev => {
            const newMap = new Map(prev);
            newMap.set(productId, recipeId);
            return newMap;
        });
        setRecipeSelectionModal({ open: false, productId: null, productName: null, availableRecipes: [] });
    };

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

        const allowedIntermediatesForCalc = constraints.allowedIntermediates;

        const cropMetrics = cropsToUse.map(crop => {
            const farm = effectiveFarms[0];
            if (!farm) return null;

            const productionPerMonth = FarmOptimizer.calculateCropYield(
                crop,
                farm,
                constraints.targetFertility,
                false
            );
            const waterPerDay = FarmOptimizer.calculateWaterPerDay(crop, farm);
            const fertilityPerDay = crop.fertilityPerDayPercent;

            const production = { [crop.output.productId]: productionPerMonth };
            const foodResult = FarmOptimizer.calculatePeopleFedWithChains(
                production,
                waterPerDay,
                foodConsumptionMult,
                allowedIntermediatesForCalc
            );

            const peopleFedTotal = foodResult.peopleFed;

            if (peopleFedTotal === 0) {
                return null;
            }

            const monthsPerCycle = crop.growthDays / 30;
            const peopleFedPerMonth = peopleFedTotal / monthsPerCycle;

            let foodCategory = null;
            if (foodResult.processingChains && foodResult.processingChains.length > 0) {
                foodCategory = foodResult.processingChains[0].foodCategory;
            }

            return {
                crop,
                productionPerMonth,
                waterPerDay: foodResult.totalWaterPerDay,
                fertilityPerDay,
                peopleFedPerMonth,
                waterPerPerson: peopleFedPerMonth > 0 ? foodResult.totalWaterPerDay / peopleFedPerMonth : Infinity,
                fertilityPerPerson: peopleFedPerMonth > 0 ? Math.abs(fertilityPerDay) / peopleFedPerMonth : Infinity,
                category: foodCategory,
                monthsPerCycle,
                processingChains: foodResult.processingChains
            };
        }).filter(m => m != null);

        if (cropMetrics.length === 0) {
            alert('No crops can produce food with current settings.\n\nSuggestion: Allow some intermediates OR select crops that produce direct food.');
            return farms.map(() => [null, null, null, null]);
        }

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

    const optimizeMaxPeople = (cropMetrics, farmCount) => {
        const farmConfigs = generateFarmConfigurations(cropMetrics);
        farmConfigs.sort((a, b) => b.efficiency - a.efficiency);

        const rotations = [];
        const usedCrops = new Set();

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
            let bestConfig = null;

            for (const config of farmConfigs) {
                const hasOverlap = config.crops.some(c => usedCrops.has(c.crop.id));
                if (!hasOverlap) {
                    bestConfig = config;
                    break;
                }
            }

            if (!bestConfig && farmConfigs.length > 0) {
                bestConfig = farmConfigs[0];
            }

            if (bestConfig) {
                bestConfig.crops.forEach(c => usedCrops.add(c.crop.id));

                const rotation = bestConfig.crops.map(c => c.crop.id);
                while (rotation.length < 4) {
                    rotation.push(null);
                }
                rotations.push(rotation);
            } else {
                rotations.push([null, null, null, null]);
            }
        }

        return rotations;
    };

    const optimizeMinWater = (cropMetrics, farmCount) => {
        cropMetrics.sort((a, b) => a.waterPerPerson - b.waterPerPerson);

        const rotations = [];

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
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

    const optimizeMinFertility = (cropMetrics, farmCount) => {
        cropMetrics.sort((a, b) => a.fertilityPerPerson - b.fertilityPerPerson);

        const rotations = [];

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
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

    const optimizeForVariety = (cropMetrics, farmCount) => {
        const categories = ['FoodCategory_Carbs', 'FoodCategory_Protein', 'FoodCategory_Vitamins', 'FoodCategory_Treats'];
        const rotations = [];
        const usedCrops = new Set();

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
            const rotation = [];

            for (const category of categories) {
                if (rotation.length >= 2) break;

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

    const generateFarmConfigurations = (cropMetrics) => {
        const configs = [];

        for (const crop of cropMetrics) {
            configs.push({
                crops: [crop],
                efficiency: crop.peopleFedPerMonth,
                type: 'mono'
            });
        }

        for (let i = 0; i < cropMetrics.length; i++) {
            for (let j = i + 1; j < cropMetrics.length; j++) {
                const crop1 = cropMetrics[i];
                const crop2 = cropMetrics[j];

                const totalDays = crop1.monthsPerCycle * 30 + crop2.monthsPerCycle * 30;
                const weight1 = (crop1.monthsPerCycle * 30) / totalDays;
                const weight2 = (crop2.monthsPerCycle * 30) / totalDays;
                const avgEfficiency = (crop1.peopleFedPerMonth * weight1) + (crop2.peopleFedPerMonth * weight2);

                configs.push({
                    crops: [crop1, crop2],
                    efficiency: avgEfficiency,
                    type: 'dual'
                });
            }
        }

        for (let i = 0; i < Math.min(cropMetrics.length, 10); i++) {
            for (let j = i + 1; j < Math.min(cropMetrics.length, 10); j++) {
                for (let k = j + 1; k < Math.min(cropMetrics.length, 10); k++) {
                    const crop1 = cropMetrics[i];
                    const crop2 = cropMetrics[j];
                    const crop3 = cropMetrics[k];

                    const totalDays = (crop1.monthsPerCycle + crop2.monthsPerCycle + crop3.monthsPerCycle) * 30;
                    const weight1 = (crop1.monthsPerCycle * 30) / totalDays;
                    const weight2 = (crop2.monthsPerCycle * 30) / totalDays;
                    const weight3 = (crop3.monthsPerCycle * 30) / totalDays;
                    const avgEfficiency = (crop1.peopleFedPerMonth * weight1) +
                        (crop2.peopleFedPerMonth * weight2) +
                        (crop3.peopleFedPerMonth * weight3);

                    configs.push({
                        crops: [crop1, crop2, crop3],
                        efficiency: avgEfficiency,
                        type: 'triple'
                    });
                }
            }
        }

        const topCrops = cropMetrics.slice(0, 6);
        for (let i = 0; i < topCrops.length; i++) {
            for (let j = i + 1; j < topCrops.length; j++) {
                for (let k = j + 1; k < topCrops.length; k++) {
                    for (let l = k + 1; l < topCrops.length; l++) {
                        const crop1 = topCrops[i];
                        const crop2 = topCrops[j];
                        const crop3 = topCrops[k];
                        const crop4 = topCrops[l];

                        const totalDays = (crop1.monthsPerCycle + crop2.monthsPerCycle +
                            crop3.monthsPerCycle + crop4.monthsPerCycle) * 30;
                        const weight1 = (crop1.monthsPerCycle * 30) / totalDays;
                        const weight2 = (crop2.monthsPerCycle * 30) / totalDays;
                        const weight3 = (crop3.monthsPerCycle * 30) / totalDays;
                        const weight4 = (crop4.monthsPerCycle * 30) / totalDays;
                        const avgEfficiency = (crop1.peopleFedPerMonth * weight1) +
                            (crop2.peopleFedPerMonth * weight2) +
                            (crop3.peopleFedPerMonth * weight3) +
                            (crop4.peopleFedPerMonth * weight4);

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

    const addFarm = () => {
        // Use the last farm's type, or default to first available
        const lastFarmType = farms.length > 0 ? farms[farms.length - 1].farmId : (availableFarms[0]?.id || 'FarmT1');

        setFarms([...farms, {
            id: Date.now(),
            farmId: lastFarmType,
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
            {/* Header */}
            <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
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
                    <p style={{ color: '#aaa', fontSize: '1rem', margin: 0 }}>
                        Professional crop rotation optimizer • {ProductionCalculator.crops.length} crops • {availableFarms.length} farm types
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1920px', margin: '0 auto', padding: '0 2rem 2rem', minHeight: 'calc(100vh - 300px)' }}>
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    border: '1px solid #444',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}>
                    {/* Mode Selector */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#aaa',
                            marginBottom: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Optimization Mode
                        </label>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '0.75rem'
                        }}>
                            {[
                                { mode: 'manual', icon: 'AllCategory', label: 'Manual' },
                                { mode: 'maxPeople', icon: 'Population', label: 'Max People' },
                                { mode: 'minWater', icon: 'SoilMoisture', label: 'Min Water' },
                                { mode: 'minFertility', icon: 'Fertility', label: 'Min Fertility' },
                                { mode: 'maxVariety', icon: 'DoNotCopy', label: 'Max Variety' }
                            ].map(opt => {
                                const iconSrc = getGeneralIcon(opt.icon);

                                return (
                                    <button
                                        key={opt.mode}
                                        onClick={() => handleModeChange(opt.mode)}
                                        style={{
                                            padding: '0.75rem',
                                            backgroundColor: optimizationMode === opt.mode ? '#4a90e2' : '#1a1a1a',
                                            border: optimizationMode === opt.mode ? '2px solid #4a90e2' : '2px solid #333',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease',
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            color: optimizationMode === opt.mode ? '#fff' : '#ddd',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (optimizationMode !== opt.mode) {
                                                e.currentTarget.style.backgroundColor = '#252525';
                                                e.currentTarget.style.borderColor = '#4a90e2';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (optimizationMode !== opt.mode) {
                                                e.currentTarget.style.backgroundColor = '#1a1a1a';
                                                e.currentTarget.style.borderColor = '#333';
                                            }
                                        }}
                                    >
                                        {iconSrc && (
                                            <img
                                                src={iconSrc}
                                                alt={opt.label}
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    objectFit: 'contain',
                                                    filter: optimizationMode === opt.mode ? 'brightness(1.2)' : 'brightness(0.9)'
                                                }}
                                            />
                                        )}
                                        <span>{opt.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Collapsible Constraints Section */}
                    <div style={{
                        marginBottom: '1.5rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '6px',
                        border: '1px solid #333',
                        overflow: 'hidden'
                    }}>
                        <button
                            onClick={() => setConstraintsExpanded(!constraintsExpanded)}
                            style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'background-color 0.15s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#252525'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{
                                    fontSize: '1.2rem',
                                    transform: constraintsExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease',
                                    color: '#4a90e2'
                                }}>
                                    ▶
                                </span>
                                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#ddd' }}>
                                    Constraints
                                </span>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                                    {constraints.allowedFarmTypes.length === 0 && constraints.allowedCrops.length === 0 && constraints.allowedIntermediates === null
                                        ? '(All enabled)'
                                        : '(Filters active)'}
                                </span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {constraintsExpanded ? 'Collapse' : 'Expand'}
                            </span>
                        </button>

                        {constraintsExpanded && (
                            <div style={{
                                padding: '1.25rem',
                                borderTop: '1px solid #333',
                                animation: 'slideDown 0.2s ease'
                            }}>
                                {/* Tab Navigation */}
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginBottom: '1rem',
                                    borderBottom: '1px solid #333',
                                    paddingBottom: '0.5rem'
                                }}>
                                    {[
                                        { id: 'farms', label: 'Farm Types', count: constraints.allowedFarmTypes.length === 0 ? availableFarms.length : constraints.allowedFarmTypes.length },
                                        { id: 'intermediates', label: 'Intermediates', count: constraints.allowedIntermediates === null ? allIntermediates.length : constraints.allowedIntermediates.length },
                                        { id: 'crops', label: 'Crops', count: constraints.allowedCrops.length === 0 ? availableFoodCrops.length : constraints.allowedCrops.length }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveConstraintTab(tab.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: activeConstraintTab === tab.id ? '#4a90e2' : 'transparent',
                                                border: activeConstraintTab === tab.id ? '1px solid #4a90e2' : '1px solid #444',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                color: activeConstraintTab === tab.id ? '#fff' : '#aaa',
                                                transition: 'all 0.15s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <span>{tab.label}</span>
                                            <span style={{
                                                padding: '0.125rem 0.5rem',
                                                backgroundColor: activeConstraintTab === tab.id ? 'rgba(255,255,255,0.2)' : '#333',
                                                borderRadius: '10px',
                                                fontSize: '0.75rem'
                                            }}>
                                                {tab.count}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div style={{
                                    maxHeight: '250px',
                                    overflowY: 'auto',
                                    padding: '0.5rem',
                                    backgroundColor: '#2a2a2a',
                                    borderRadius: '4px'
                                }}>
                                    {activeConstraintTab === 'farms' && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {availableFarms.slice().sort((a, b) => {
                                                const getTier = (farm) => {
                                                    const match = farm.id.match(/T(\d+)/);
                                                    return match ? parseInt(match[1]) : 0;
                                                };
                                                return getTier(a) - getTier(b);
                                            }).map(farm => {
                                                const farmIcon = getEntityIcon(farm);
                                                const isAllowed = constraints.allowedFarmTypes.length === 0 || constraints.allowedFarmTypes.includes(farm.id);

                                                return (
                                                    <button
                                                        key={farm.id}
                                                        onClick={() => toggleFarmType(farm.id)}
                                                        title={farm.name}
                                                        style={{
                                                            padding: '0.5rem',
                                                            backgroundColor: isAllowed ? 'rgba(74, 144, 226, 0.15)' : 'transparent',
                                                            border: isAllowed ? '2px solid #4a90e2' : '2px solid #444',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'all 0.15s ease',
                                                            opacity: isAllowed ? 1 : 0.5,
                                                            width: '56px',
                                                            height: '56px'
                                                        }}
                                                    >
                                                        {farmIcon && (
                                                            <img
                                                                src={farmIcon}
                                                                alt={farm.name}
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    objectFit: 'contain',
                                                                    filter: isAllowed ? 'none' : 'grayscale(100%)'
                                                                }}
                                                            />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {activeConstraintTab === 'intermediates' && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {allIntermediates.map(product => {
                                                const productIcon = getProductIcon(product);
                                                const isAllowed = constraints.allowedIntermediates === null || (constraints.allowedIntermediates.length > 0 && constraints.allowedIntermediates.includes(product.id));

                                                return (
                                                    <button
                                                        key={product.id}
                                                        onClick={() => toggleIntermediate(product.id)}
                                                        title={product.name}
                                                        style={{
                                                            padding: '0.5rem',
                                                            backgroundColor: isAllowed ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
                                                            border: isAllowed ? '2px solid #FFD700' : '2px solid #444',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'all 0.15s ease',
                                                            opacity: isAllowed ? 1 : 0.5,
                                                            width: '56px',
                                                            height: '56px'
                                                        }}
                                                    >
                                                        {productIcon && (
                                                            <img
                                                                src={productIcon}
                                                                alt={product.name}
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    objectFit: 'contain',
                                                                    filter: isAllowed ? 'none' : 'grayscale(100%)'
                                                                }}
                                                            />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {activeConstraintTab === 'crops' && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {availableFoodCrops.map(crop => {
                                                const cropIcon = getCropIcon(crop);
                                                const isAllowed = constraints.allowedCrops.length === 0 || constraints.allowedCrops.includes(crop.id);

                                                return (
                                                    <button
                                                        key={crop.id}
                                                        onClick={() => toggleCropFilter(crop.id)}
                                                        title={crop.name}
                                                        style={{
                                                            padding: '0.5rem',
                                                            backgroundColor: isAllowed ? 'rgba(80, 200, 120, 0.15)' : 'transparent',
                                                            border: isAllowed ? '2px solid #50C878' : '2px solid #444',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'all 0.15s ease',
                                                            opacity: isAllowed ? 1 : 0.5,
                                                            width: '56px',
                                                            height: '56px'
                                                        }}
                                                    >
                                                        {cropIcon && (
                                                            <img
                                                                src={cropIcon}
                                                                alt={crop.name}
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    objectFit: 'contain',
                                                                    filter: isAllowed ? 'none' : 'grayscale(100%)'
                                                                }}
                                                            />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contextual Settings (Inline Pills) */}
                    {optimizationMode !== 'manual' && (
                        <div style={{
                            marginBottom: '1.5rem',
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            border: '1px solid #333'
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', display: 'block' }}>
                                        Farms
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
                                            width: '100%',
                                            padding: '0.6rem',
                                            backgroundColor: '#2a2a2a',
                                            color: '#fff',
                                            border: '1px solid #444',
                                            borderRadius: '4px',
                                            fontSize: '0.9rem'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={constraints.useFertilizer}
                                            onChange={(e) => setConstraints({ ...constraints, useFertilizer: e.target.checked })}
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                        Use Fertilizer
                                    </label>
                                    {constraints.useFertilizer && (
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.25rem' }}>
                                                Target: {constraints.targetFertility}%
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="140"
                                                step="10"
                                                value={constraints.targetFertility}
                                                onChange={(e) => setConstraints({ ...constraints, targetFertility: parseInt(e.target.value) })}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {(optimizationMode === 'minWater' || optimizationMode === 'minFertility') && (
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', display: 'block' }}>
                                            Target Population
                                        </label>
                                        <input
                                            type="number"
                                            value={constraints.targetPopulation}
                                            onChange={(e) => setConstraints({ ...constraints, targetPopulation: parseInt(e.target.value) || 0 })}
                                            style={{
                                                width: '100%',
                                                padding: '0.6rem',
                                                backgroundColor: '#2a2a2a',
                                                color: '#fff',
                                                border: '1px solid #444',
                                                borderRadius: '4px',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Manual Mode - Fertility & Farms */}
                    {optimizationMode === 'manual' && (
                        <>
                            <div style={{
                                marginBottom: '1.5rem',
                                padding: '1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '6px',
                                border: '1px solid #333'
                            }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={constraints.useFertilizer}
                                                onChange={(e) => setConstraints({ ...constraints, useFertilizer: e.target.checked })}
                                                style={{ width: '16px', height: '16px' }}
                                            />
                                            Use Fertilizer
                                        </label>
                                        <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem', marginLeft: '22px' }}>
                                            {constraints.useFertilizer ? '✅ Enabled' : '⚠️ Natural only'}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>
                                            Target Fertility: {constraints.targetFertility}%
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="140"
                                            step="10"
                                            value={constraints.targetFertility}
                                            onChange={(e) => setConstraints({ ...constraints, targetFertility: parseInt(e.target.value) })}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '0.75rem'
                                }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd' }}>
                                        Farms ({farms.length})
                                    </label>
                                    <button
                                        onClick={addFarm}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#4a90e2',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            transition: 'all 0.15s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5aa0f2'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                                    >
                                        + Add Farm
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                        </>
                    )}

                    {/* Research - Always Visible, Compact Horizontal */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#aaa',
                            marginBottom: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Research Bonuses
                        </label>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1rem'
                        }}>
                            <div style={{
                                padding: '0.75rem 1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '6px',
                                border: '1px solid #333'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span style={{ color: '#ddd', fontSize: '0.85rem' }}>Crop Yield</span>
                                    <span style={{ color: '#4a90e2', fontWeight: '700', fontSize: '0.85rem' }}>
                                        +{research.cropYield}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="250"
                                    value={research.cropYield}
                                    onChange={(e) => setResearch({ ...research, cropYield: parseInt(e.target.value) })}
                                    style={{ width: '100%' }}
                                />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.7rem',
                                    color: '#666',
                                    marginTop: '0.25rem'
                                }}>
                                    <span>0</span>
                                    <span>250</span>
                                </div>
                            </div>

                            <div style={{
                                padding: '0.75rem 1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '6px',
                                border: '1px solid #333'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span style={{ color: '#ddd', fontSize: '0.85rem' }}>Water Saver</span>
                                    <span style={{ color: '#50C878', fontWeight: '700', fontSize: '0.85rem' }}>
                                        -{research.waterReduction}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="40"
                                    value={research.waterReduction}
                                    onChange={(e) => setResearch({ ...research, waterReduction: parseInt(e.target.value) })}
                                    style={{ width: '100%' }}
                                />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.7rem',
                                    color: '#666',
                                    marginTop: '0.25rem'
                                }}>
                                    <span>0</span>
                                    <span>40</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        disabled={loading || farms.length === 0}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: loading || farms.length === 0 ? '#555' : '#4a90e2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1.1rem',
                            cursor: loading || farms.length === 0 ? 'not-allowed' : 'pointer',
                            fontWeight: '700',
                            transition: 'all 0.2s',
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
                        {loading ? '⏳ Analyzing...' : optimizationMode === 'manual' ? '🚀 Calculate Production' : '🎯 Optimize & Calculate'}
                    </button>
                </div>

                {/* Results Section */}
                {results && (
                    <ResultsSection results={results} />
                )}

                {/* Mode Change Confirmation Modal */}
                {showModeConfirm && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        padding: '2rem'
                    }}>
                        <div style={{
                            backgroundColor: '#2a2a2a',
                            borderRadius: '8px',
                            padding: '2rem',
                            maxWidth: '500px',
                            width: '100%',
                            border: '2px solid #4a90e2',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
                        }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
                                ⚠️ Switch Mode?
                            </h3>
                            <p style={{ fontSize: '0.95rem', color: '#ddd', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                You have crops configured in manual mode. Switching to optimization mode will use the optimizer's crop selection instead.
                            </p>
                            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.5rem' }}>
                                Your manual configuration will be preserved if you switch back.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={cancelModeChange}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#444',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.15s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#444'}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmModeChange}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#4a90e2',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.15s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5aa0f2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                                >
                                    Switch Mode
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Crop Selection Modal */}
                {cropModal.open && (
                    <CropSelectionModal
                        crops={availableCrops}
                        onSelect={selectCrop}
                        onClose={() => setCropModal({ open: false, farmIndex: null, slotIndex: null })}
                    />
                )}

                {/* Recipe Selection Modal */}
                <RecipeSelectionModal
                    modal={recipeSelectionModal}
                    onSelect={selectProcessingRecipe}
                    onClose={() => setRecipeSelectionModal({ open: false, productId: null, productName: null, availableRecipes: [] })}
                    selectedProcessingRecipes={selectedProcessingRecipes}
                />
            </div>

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
};

const FarmConfigCard = ({ farm, farmIndex, availableFarms, availableCrops, onRemove, onUpdateType, onOpenCropModal, canRemove, openRecipeSelectionModal, selectedProcessingRecipes }) => {
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
                alignItems: 'center',
                marginBottom: '0.75rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        color: '#4a90e2'
                    }}>
                        Farm #{farmIndex + 1}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {availableFarms.slice().sort((a, b) => {
                            const getTier = (farm) => {
                                const match = farm.id.match(/T(\d+)/);
                                return match ? parseInt(match[1]) : 0;
                            };
                            return getTier(a) - getTier(b);
                        }).map(f => {
                            const farmIcon = getEntityIcon(f);
                            const isSelected = farm.farmId === f.id;

                            return (
                                <button
                                    key={f.id}
                                    onClick={() => onUpdateType(farm.id, f.id)}
                                    title={f.name}
                                    style={{
                                        padding: '0.5rem',
                                        backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.2)' : 'transparent',
                                        border: isSelected ? '2px solid #4a90e2' : '2px solid #444',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.15s',
                                        width: '48px',
                                        height: '48px'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.borderColor = '#4a90e2';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.borderColor = '#444';
                                        }
                                    }}
                                >
                                    {farmIcon && (
                                        <img
                                            src={farmIcon}
                                            alt={f.name}
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={() => onRemove(farm.id)}
                    disabled={!canRemove}
                    style={{
                        padding: '0.4rem 0.75rem',
                        backgroundColor: !canRemove ? '#555' : '#ff6b6b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: !canRemove ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Remove
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.5rem'
            }}>
                {farm.rotation.map((cropId, slotIndex) => {
                    const crop = cropId ? availableCrops.find(c => c.id === cropId) : null;
                    const icon = crop ? getCropIcon(crop) : null;

                    const needsProcessing = crop ? !ProductionCalculator.foods?.find(f => f.productId === crop.output.productId) : false;
                    const hasRecipeSelected = crop ? selectedProcessingRecipes.has(crop.output.productId) : false;

                    return (
                        <div key={slotIndex} style={{ position: 'relative' }}>
                            <button
                                onClick={() => onOpenCropModal(farmIndex, slotIndex)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: crop ? '#2a4a6a' : '#2a2a2a',
                                    border: crop ? (needsProcessing && !hasRecipeSelected ? '2px solid #ff6b6b' : '2px solid #4a90e2') : '2px dashed #444',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    minHeight: '90px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.15s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = crop ? '#3a5a7a' : '#353535';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = crop ? '#2a4a6a' : '#2a2a2a';
                                }}
                            >
                                <div style={{
                                    fontSize: '0.65rem',
                                    color: '#888',
                                    marginBottom: '0.25rem',
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
                                                    width: '24px',
                                                    height: '24px',
                                                    objectFit: 'contain',
                                                    marginBottom: '0.25rem'
                                                }}
                                            />
                                        )}
                                        <div style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            textAlign: 'center',
                                            lineHeight: '1.2'
                                        }}>
                                            {crop.name}
                                        </div>

                                        {needsProcessing && (
                                            <div style={{
                                                marginTop: '0.25rem',
                                                padding: '1px 4px',
                                                backgroundColor: hasRecipeSelected ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                                                border: `1px solid ${hasRecipeSelected ? '#4a90e2' : '#ff6b6b'}`,
                                                borderRadius: '3px',
                                                fontSize: '0.6rem',
                                                color: hasRecipeSelected ? '#4a90e2' : '#ff6b6b',
                                                fontWeight: '700'
                                            }}>
                                                {hasRecipeSelected ? '🏭' : '⚠️'}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                                        Click
                                    </div>
                                )}
                            </button>

                            {crop && needsProcessing && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openRecipeSelectionModal(crop.output.productId);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '3px',
                                        right: '3px',
                                        padding: '3px 6px',
                                        backgroundColor: hasRecipeSelected ? '#4a90e2' : '#ff6b6b',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '3px',
                                        fontSize: '0.65rem',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                        zIndex: 10
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
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                padding: '1.5rem',
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
                    marginBottom: '1rem'
                }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                        Select Crop
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#ff6b6b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        ✕
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
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                    }}
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '0.75rem'
                }}>
                    <button
                        onClick={() => onSelect(null)}
                        style={{
                            padding: '0.75rem',
                            backgroundColor: '#1a1a1a',
                            border: '2px dashed #555',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            transition: 'all 0.15s'
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
                        <div style={{ fontSize: '1.5rem' }}>🚫</div>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            color: '#888'
                        }}>
                            Empty
                        </div>
                    </button>

                    {filteredCrops.map(crop => {
                        const icon = getCropIcon(crop);

                        return (
                            <button
                                key={crop.id}
                                onClick={() => onSelect(crop.id)}
                                style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#1a1a1a',
                                    border: '2px solid #444',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    transition: 'all 0.15s'
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
                                            width: '32px',
                                            height: '32px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                                <div style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>
                                    {crop.name}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#888' }}>
                                    {crop.growthDays / 30}mo
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
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                padding: '1.5rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                border: '2px solid #4a90e2'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                        Process {modal.productName}
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#ff6b6b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s'
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
                                <div style={{ marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>
                                    {recipe.name}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#FFD700', marginBottom: '0.25rem' }}>
                                    → {finalFood?.name}
                                </div>
                                {recipe.fullChain && recipe.fullChain.length > 0 && (
                                    <div style={{ fontSize: '0.7rem', color: '#888' }}>
                                        {modal.productName} → {recipe.fullChain.map(c => ProductionCalculator.getProduct(c.outputProductId)?.name).join(' → ')}
                                    </div>
                                )}
                                {isSelected && (
                                    <div style={{
                                        marginTop: '0.5rem',
                                        padding: '3px 6px',
                                        backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                        borderRadius: '3px',
                                        fontSize: '0.75rem',
                                        color: '#4a90e2',
                                        fontWeight: '700',
                                        display: 'inline-block'
                                    }}>
                                        ✓ Selected
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
                        <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Water Usage
                            {getProductIcon(ProductionCalculator.products?.find(p => p.name?.toLowerCase() === 'water')) && (
                                <img
                                    src={getProductIcon(ProductionCalculator.products?.find(p => p.name?.toLowerCase() === 'water'))}
                                    alt="Water"
                                    style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                                />
                            )}
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#50C878' }}>
                            {results.totals.waterPerMonth.toFixed(0)} /month
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div>Farm: {(results.totals.farmWaterPerDay * 30).toFixed(0)} /month</div>
                            <div>Processing: {(results.totals.processingWaterPerDay * 30).toFixed(0)} /month</div>
                        </div>
                    </div>

                    {results.totals.processingMachines && results.totals.processingMachines.length > 0 && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            marginBottom: '1rem',
                            border: '1px solid #333'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                                {getGeneralIcon('Buildings') && (
                                    <img
                                        src={getGeneralIcon('Buildings')}
                                        alt="Buildings"
                                        style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                    />
                                )} Processing Machines
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
                                <div>{getGeneralIcon('Electricity') && (
                                    <img
                                        src={getGeneralIcon('Electricity')}
                                        alt="Electricity"
                                        style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                    />
                                )} {results.totals.processingElectricity.toFixed(0)} kW</div>
                                <div>{getGeneralIcon('Worker') && (
                                    <img
                                        src={getGeneralIcon('Worker')}
                                        alt="Workers"
                                        style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                    />
                                )} {results.totals.processingWorkers} workers</div>
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
                                Fertilizer Options ({results.totals.fertilizerNeeds.totalFarmsRequiring} farm{results.totals.fertilizerNeeds.totalFarmsRequiring > 1 ? 's' : ''})
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
                                                        BEST
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#ddd' }}>
                                            {fert.totalQuantityPerMonth.toFixed(1)} /month
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem' }}>
                                            Max: {fert.maxFertility}% • +{fert.fertilityPerQuantity}%/unit
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ddd', marginBottom: '0.75rem' }}>
                            Production (per month)
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
                                    <div style={{ color: '#4a90e2', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                                        {getGeneralIcon('Population') && (
                                            <img
                                                src={getGeneralIcon('Population')}
                                                alt="People"
                                                style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                            />
                                        )}
                                        {slotDetail.peopleFed.toFixed(0)} /mo
                                    </div>
                                    <div style={{ color: '#50C878', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                                        {getProductIcon(ProductionCalculator.products?.find(p => p.name?.toLowerCase() === 'water')) && (
                                            <img
                                                src={getProductIcon(ProductionCalculator.products?.find(p => p.name?.toLowerCase() === 'water'))}
                                                alt="Water"
                                                style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                            />
                                        )}
                                        {(slotDetail.waterPerDay * 30).toFixed(0)} /mo
                                    </div>
                                    {slotDetail.processingChain && !slotDetail.processingChain.isDirect && (
                                        <div style={{ color: '#FFD700', marginTop: '2px', fontSize: '0.65rem' }}>
                                            {getGeneralIcon('Buildings') && (
                                                <img
                                                    src={getGeneralIcon('Buildings')}
                                                    alt="Buildings"
                                                    style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                                />
                                            )} Processed
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {processingChains && processingChains.some(c => !c.isDirect) && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    border: '1px solid #4a90e2'
                }}>
                    <div style={{ fontSize: '0.9rem', color: '#4a90e2', fontWeight: '700', marginBottom: '0.5rem' }}>
                        {getGeneralIcon('Buildings') && (
                            <img
                                src={getGeneralIcon('Buildings')}
                                alt="Buildings"
                                style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                            />
                        )} Processing Required
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
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>
                            {farmResult.usedFertilizer ? 'Target Fertility' : 'Actual Fertility'}
                        </div>
                        <div style={{
                            color: farmResult.usedFertilizer ? '#4a90e2' : '#50C878',
                            fontWeight: '700',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            {farmResult.actualFertility.toFixed(1)}%
                            {farmResult.usedFertilizer && (
                                <span style={{ fontSize: '0.8rem', color: '#FFD700' }}>🏭</span>
                            )}
                        </div>
                        {farmResult.usedFertilizer && (
                            <div style={{ fontSize: '0.65rem', color: '#4a90e2', marginTop: '2px' }}>
                                Using fertilizer
                            </div>
                        )}
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