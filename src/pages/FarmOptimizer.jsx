// src/pages/FarmOptimizer.jsx - CORRECTED HOOK ORDER

import { useEffect, useState, useCallback } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { FarmOptimizer } from '../utils/FarmOptimizer';
import { FoodChainResolver } from '../utils/FoodChainResolver';
import { FertilizerCalculator } from '../utils/FertilizerCalculator';
import { RainwaterEstimator } from '../utils/RainwaterEstimator';
import { getGeneralIcon } from '../utils/AssetHelper';

import {
    OptimizationModeSelector,
    ConstraintsPanel,
    FarmConfigCard,
    ResultsSummary,
    FarmResultCard,
    CropSelectionModal,
    RecipeSelectionModal,
    RainwaterEstimatorModal
} from '../components/farm-optimizer';

const FarmOptimizerPage = () => {
    const { settings, getResearchValue } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);

    // Map global research to local state
    const [research, setResearch] = useState({
        cropYield: 0,
        waterReduction: 0,
        rainYield: 0
    });

    // Farm state (for manual mode)
    const [farms, setFarms] = useState([
        {
            id: 1,
            farmId: 'FarmT1',
            rotation: [null, null, null, null],
            selectedFertilizerId: null,
            customFertility: null
        }
    ]);

    // Optimization mode and settings
    const [optimizationMode, setOptimizationMode] = useState('manual');
    const [optimizationGoal, setOptimizationGoal] = useState('minWater');

    // Constraints
    const [constraints, setConstraints] = useState({
        targetPopulation: 1000,
        maxFarms: null,
        allowedCrops: [],
        allowedIntermediates: null,
        allowedRecipes: null,
        allowedFarmTypes: [],
        allowedFertilizers: ['Product_FertilizerOrganic', 'Product_Fertilizer', 'Product_Fertilizer2'],
        maxWaterPerDay: null,
        maxFertilityPerDay: null,
        naturalFertilityOnly: false
    });

    // Target population enabled state
    const [targetPopulationEnabled, setTargetPopulationEnabled] = useState(true);

    // UI state
    const [selectedProcessingRecipes, setSelectedProcessingRecipes] = useState(new Map());

    // Modals
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

    // Results
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    // ===== ALL HOOKS MUST COME FIRST =====

    // Load game data and initialize
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

                // Build food crop IDs
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

    // Sync research from global settings
    useEffect(() => {
        setResearch({
            cropYield: getResearchValue('FarmYieldMultiplier') || 0,
            waterReduction: getResearchValue('FarmWaterConsumptionMultiplier') || 0,
            rainYield: getResearchValue('RainYieldMultiplier') || 0
        });
    }, [settings.research, getResearchValue]);

    // Auto-recalculate when constraints.naturalFertilityOnly changes
    useEffect(() => {
        if (results && !loading && dataLoaded) {
            console.log('naturalFertilityOnly changed, triggering recalculation');
            const timer = setTimeout(() => {
                // Call the calculate function (defined below)
                performCalculation();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [constraints.naturalFertilityOnly, results, loading, dataLoaded]);

    // Auto-recalculate when farms state changes
    useEffect(() => {
        if (results && farms.length > 0 && !loading && dataLoaded) {
            console.log('Farms state changed, triggering recalculation');
            const timer = setTimeout(() => {
                // Call the calculate function (defined below)
                performCalculation();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [farms, results, loading, dataLoaded]);

    // Auto-recalculate when allowedFertilizers changes
    useEffect(() => {
        if (results && !loading && dataLoaded) {
            console.log('allowedFertilizers changed, triggering recalculation');
            const timer = setTimeout(() => {
                performCalculation();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [constraints.allowedFertilizers, results, loading, dataLoaded]);

    // ===== NOW DEFINE FUNCTIONS =====

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

    // Helper function for optimization
    const runOptimization = () => {
        const targetPop = constraints.targetPopulation;
        const avgPeoplePerFarm = 400;
        const estimatedFarms = Math.ceil(targetPop / avgPeoplePerFarm);
        const farmCount = constraints.maxFarms ? Math.min(estimatedFarms, constraints.maxFarms) : estimatedFarms;

        const optimizedFarms = [];
        for (let i = 0; i < farmCount; i++) {
            const farmType = constraints.allowedFarmTypes.length > 0
                ? constraints.allowedFarmTypes[0]
                : availableFarms[0]?.id || 'FarmT1';

            const rotation = optimizeRotationForGoal(optimizationGoal);

            optimizedFarms.push({
                id: Date.now() + i,
                farmId: farmType,
                rotation,
                selectedFertilizerId: null,
                customFertility: null
            });
        }

        return optimizedFarms;
    };

    const optimizeRotationForGoal = (goal) => {
        const efficientCrops = availableFoodCrops.slice(0, 2).map(c => c.id);
        return [...efficientCrops, null, null];
    };

    // Main calculation function (extracted to avoid duplication)
    // In FarmOptimizer.jsx - Update the performCalculation function

    const performCalculation = () => {
        console.log('=== STARTING CALCULATION ===');
        setLoading(true);

        try {
            let farmsToCalculate = [];

            if (optimizationMode === 'manual') {
                farmsToCalculate = farms;
                console.log('Manual mode - using farms:', farmsToCalculate);
            } else {
                farmsToCalculate = runOptimization();
                console.log('Optimization mode - generated farms:', farmsToCalculate);
            }

            const detailedResults = farmsToCalculate.map((farm, farmIdx) => {
                console.log(`Processing farm ${farmIdx}:`, farm);

                const farmProto = availableFarms.find(f => f.id === farm.farmId);
                if (!farmProto) {
                    throw new Error(`Farm ${farm.farmId} not found`);
                }

                const effectiveFarm = FarmOptimizer.calculateEffectiveFarmStats(
                    farm,
                    [],
                    research
                );

                const rotation = farm.rotation || [null, null, null, null];

                const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(
                    rotation,
                    effectiveFarm
                );

                // Determine actual fertility based on settings
                let actualFertility;
                if (constraints.naturalFertilityOnly) {
                    // Natural fertility only - ignore any fertilizer settings
                    actualFertility = fertilityInfo.naturalEquilibrium;
                } else if (farm.customFertility !== null && farm.customFertility !== undefined) {
                    // User has set custom fertility via fertilizer planning
                    actualFertility = farm.customFertility;
                } else {
                    // Default to natural equilibrium
                    actualFertility = fertilityInfo.naturalEquilibrium;
                }

                console.log(`Farm ${farmIdx} fertility:`, {
                    natural: fertilityInfo.naturalEquilibrium,
                    custom: farm.customFertility,
                    actual: actualFertility,
                    selectedFertilizer: farm.selectedFertilizerId
                });

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

                const totalRotationMonths = totalRotationDays / 30;

                const allowedIntermediatesForCalc = constraints.allowedIntermediates;
                const allowedRecipesForCalc = constraints.allowedRecipes;

                let foodResult;
                if (optimizationMode === 'manual') {
                    foodResult = FarmOptimizer.calculatePeopleFedManual(
                        production,
                        Object.fromEntries(selectedProcessingRecipes),
                        totalFarmWaterPerDay,
                        settings.foodConsumptionMultiplier || 1.0,
                        allowedRecipesForCalc
                    );
                } else {
                    foodResult = FarmOptimizer.calculatePeopleFedWithChains(
                        production,
                        totalFarmWaterPerDay,
                        settings.foodConsumptionMultiplier || 1.0,
                        allowedIntermediatesForCalc,
                        allowedRecipesForCalc
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
                            settings.foodConsumptionMultiplier || 1.0,
                            allowedRecipesForCalc
                        );
                    } else {
                        slotFoodResult = FarmOptimizer.calculatePeopleFedWithChains(
                            slotProduction,
                            0,
                            settings.foodConsumptionMultiplier || 1.0,
                            allowedIntermediatesForCalc,
                            allowedRecipesForCalc
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

                // ✅ Calculate best fertilizer across multiple targets
                // ✅ Find optimal fertilizer using the shared calculator method
                const bestFertilizerOption = FertilizerCalculator.findOptimalFertilizer(
                    fertilityInfo.naturalEquilibrium,
                    foodResult.peopleFed,
                    constraints.allowedFertilizers
                );

                // Get options for display (using the best target if found, or a default)
                let fertilizerOptionsForDisplay = [];
                if (bestFertilizerOption) {
                    fertilizerOptionsForDisplay = FertilizerCalculator.calculateFertilizerOptions(
                        fertilityInfo.naturalEquilibrium,
                        bestFertilizerOption.targetFertility,
                        foodResult.peopleFed,
                        constraints.allowedFertilizers
                    );
                } else if (!constraints.naturalFertilityOnly && constraints.allowedFertilizers.length > 0) {
                    // No beneficial option found, still show options for display
                    const defaultTarget = Math.ceil(fertilityInfo.naturalEquilibrium / 10) * 10 + 10;
                    fertilizerOptionsForDisplay = FertilizerCalculator.calculateFertilizerOptions(
                        fertilityInfo.naturalEquilibrium,
                        defaultTarget,
                        foodResult.peopleFed,
                        constraints.allowedFertilizers
                    );
                }

                // ✅ Auto-apply best fertilizer if not already set
                let autoAppliedFertilizer = false;
                if (bestFertilizerOption &&
                    !constraints.naturalFertilityOnly &&
                    farm.selectedFertilizerId === null) {

                    console.log(`Auto-applying best fertilizer to farm ${farmIdx}:`, {
                        fertilizer: bestFertilizerOption.fertilizerId,
                        targetFertility: bestFertilizerOption.targetFertility,
                        netBenefit: bestFertilizerOption.netPeopleFed,
                        yieldIncrease: bestFertilizerOption.yieldIncrease,
                        workersNeeded: bestFertilizerOption.workersNeeded
                    });

                    // Update the farm
                    farm.selectedFertilizerId = bestFertilizerOption.fertilizerId;
                    farm.customFertility = bestFertilizerOption.targetFertility;
                    actualFertility = bestFertilizerOption.targetFertility;
                    autoAppliedFertilizer = true;

                    // Recalculate production with the new fertility
                    const updatedSlotDetails = rotation.map(cropId => {
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

                    // Recalculate total production
                    const updatedProduction = {};
                    let updatedFarmWaterPerDay = 0;

                    updatedSlotDetails.forEach(slot => {
                        const weight = totalRotationDays > 0 ? slot.growthDays / totalRotationDays : 0;
                        const avgProductionPerMonth = slot.productionPerMonth * weight;
                        updatedProduction[slot.productId] = (updatedProduction[slot.productId] || 0) + avgProductionPerMonth;
                        updatedFarmWaterPerDay += slot.waterPerDay * weight;
                    });

                    // Update production and water
                    Object.assign(production, updatedProduction);
                    totalFarmWaterPerDay = updatedFarmWaterPerDay;

                    // Recalculate food result with updated production
                    if (optimizationMode === 'manual') {
                        foodResult = FarmOptimizer.calculatePeopleFedManual(
                            production,
                            Object.fromEntries(selectedProcessingRecipes),
                            totalFarmWaterPerDay,
                            settings.foodConsumptionMultiplier || 1.0,
                            allowedRecipesForCalc
                        );
                    } else {
                        foodResult = FarmOptimizer.calculatePeopleFedWithChains(
                            production,
                            totalFarmWaterPerDay,
                            settings.foodConsumptionMultiplier || 1.0,
                            allowedIntermediatesForCalc,
                            allowedRecipesForCalc
                        );
                    }

                    // Update slot details
                    slotDetails.length = 0;
                    slotDetails.push(...updatedSlotDetails);

                    // Recalculate slots with people fed
                    slotsWithPeopleFed.length = 0;
                    slotsWithPeopleFed.push(...updatedSlotDetails.map(slot => {
                        const weight = totalRotationDays > 0 ? slot.growthDays / totalRotationDays : 0;
                        const weightedProduction = slot.productionPerMonth * weight;
                        const slotProduction = { [slot.productId]: weightedProduction };

                        let slotFoodResult;
                        if (optimizationMode === 'manual') {
                            slotFoodResult = FarmOptimizer.calculatePeopleFedManual(
                                slotProduction,
                                Object.fromEntries(selectedProcessingRecipes),
                                0,
                                settings.foodConsumptionMultiplier || 1.0,
                                allowedRecipesForCalc
                            );
                        } else {
                            slotFoodResult = FarmOptimizer.calculatePeopleFedWithChains(
                                slotProduction,
                                0,
                                settings.foodConsumptionMultiplier || 1.0,
                                allowedIntermediatesForCalc,
                                allowedRecipesForCalc
                            );
                        }

                        return {
                            ...slot,
                            peopleFed: slotFoodResult.peopleFed,
                            processingChain: slotFoodResult.processingChains[0] || null,
                            weight: weight,
                            weightedProduction: weightedProduction
                        };
                    }));
                }

                const fertilizerOptions = fertilizerOptionsForDisplay;

                // Determine if actively using fertilizer
                const usingFertilizer = !constraints.naturalFertilityOnly &&
                    actualFertility > fertilityInfo.naturalEquilibrium &&
                    farm.selectedFertilizerId !== null;

                console.log(`Farm ${farmIdx} usingFertilizer:`, usingFertilizer, 'autoApplied:', autoAppliedFertilizer);

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
                    totalRotationMonths,
                    processingChains: foodResult.processingChains,
                    foodCategories: foodResult.foodCategories,
                    slotDetails: slotsWithPeopleFed,
                    fertilizerOptions
                };
            });

            // ✅ Update farms state with auto-applied fertilizers
            if (optimizationMode === 'manual') {
                const updatedFarms = farmsToCalculate.map((farm, idx) => ({
                    ...farm,
                    selectedFertilizerId: detailedResults[idx].farm.selectedFertilizerId,
                    customFertility: detailedResults[idx].farm.customFertility
                }));

                // Check if any farms were updated
                const hasChanges = updatedFarms.some((farm, idx) =>
                    farm.selectedFertilizerId !== farms[idx]?.selectedFertilizerId ||
                    farm.customFertility !== farms[idx]?.customFertility
                );

                if (hasChanges) {
                    console.log('Auto-applied fertilizers, updating farms state');
                    setFarms(updatedFarms);
                }
            }

            // ✅ Calculate totals
            const totalPeopleFed = detailedResults.reduce((sum, r) => sum + r.peopleFed, 0);
            const totalWaterPerDay = detailedResults.reduce((sum, r) => sum + r.totalWaterPerDay, 0);
            const totalFarmWater = detailedResults.reduce((sum, r) => sum + r.farmWaterPerDay, 0);
            const totalProcessingWater = detailedResults.reduce((sum, r) => sum + r.processingWaterPerDay, 0);

            // ✅ Aggregate all production
            const allProduction = {};
            detailedResults.forEach(result => {
                Object.entries(result.production).forEach(([productId, quantity]) => {
                    allProduction[productId] = (allProduction[productId] || 0) + quantity;
                });
            });

            // ✅ Aggregate food categories
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

            // ✅ Aggregate processing machines
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

            // ✅ Calculate global fertilizer summary
            console.log('Calculating fertilizer summary...');
            const fertilizerSummary = FertilizerCalculator.calculateGlobalUsage(
                detailedResults,
                constraints.allowedFertilizers
            );
            console.log('Fertilizer summary:', fertilizerSummary);

            // ✅ Set results
            setResults({
                farms: detailedResults,
                totals: {
                    peopleFed: totalPeopleFed,
                    waterPerDay: totalWaterPerDay,
                    farmWaterPerDay: totalFarmWater,
                    processingWaterPerDay: totalProcessingWater,
                    waterPerMonth: totalWaterPerDay * 30,
                    production: allProduction,
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
                    processingWorkers: totalProcessingWorkers,
                    fertilizer: fertilizerSummary
                }
            });

            console.log('=== CALCULATION COMPLETE ===');
        } catch (error) {
            console.error('Optimization error:', error);
            alert('Error during optimization: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCalculate = () => {
        performCalculation();
    };

    // Manual mode farm management
    const addFarm = () => {
        const lastFarmType = farms.length > 0 ? farms[farms.length - 1].farmId : (availableFarms[0]?.id || 'FarmT1');
        setFarms([...farms, {
            id: Date.now(),
            farmId: lastFarmType,
            rotation: [null, null, null, null],
            selectedFertilizerId: null,
            customFertility: null
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

    const handleFertilizerSelect = (farmIndex, fertilizerId) => {
        console.log('handleFertilizerSelect called:', { farmIndex, fertilizerId });
        setFarms(prevFarms => {
            const newFarms = prevFarms.map((farm, idx) =>
                idx === farmIndex ? { ...farm, selectedFertilizerId: fertilizerId } : farm
            );
            console.log('Updated farms after fertilizer select:', newFarms);
            return newFarms;
        });
    };

    const handleCustomFertilityChange = (farmId, newFertility) => {
        console.log('handleCustomFertilityChange called:', { farmId, newFertility });
        setFarms(prevFarms => {
            const newFarms = prevFarms.map(farm =>
                farm.id === farmId ? { ...farm, customFertility: newFertility } : farm
            );
            console.log('Updated farms after fertility change:', newFarms);
            return newFarms;
        });
    };

    // Icons
    const statsIcon = getGeneralIcon('Stats');
    const researchIcon = getGeneralIcon('Research');
    const infoIcon = getGeneralIcon('Info');

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
                        Professional crop rotation optimizer • {availableCrops.length} crops • {availableFarms.length} farm types
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1920px', margin: '0 auto', padding: '0 2rem 2rem', minHeight: 'calc(100vh - 300px)' }}>
                {/* Optimization Settings Panel */}
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '2rem',
                    borderRadius: '10px',
                    marginBottom: '2rem',
                    border: '1px solid #444',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}>
                    <h3 style={{
                        marginBottom: '1.5rem',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#50C878',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {statsIcon && (
                            <img src={statsIcon} alt="Settings" style={{ width: '24px', height: '24px', objectFit: 'contain', marginRight: '12px' }} />
                        )}
                        Optimization Settings
                    </h3>

                    {/* Optimization Mode Selector */}
                    <OptimizationModeSelector
                        optimizationMode={optimizationMode}
                        optimizationGoal={optimizationGoal}
                        targetPopulation={constraints.targetPopulation}
                        targetPopulationEnabled={targetPopulationEnabled}
                        onModeChange={setOptimizationMode}
                        onGoalChange={setOptimizationGoal}
                        onTargetPopulationChange={(pop) => setConstraints({ ...constraints, targetPopulation: pop })}
                        onTargetPopulationToggle={setTargetPopulationEnabled}
                    />

                    {/* Constraints Panel */}
                    <ConstraintsPanel
                        constraints={constraints}
                        availableFarms={availableFarms}
                        availableFoodCrops={availableFoodCrops}
                        onConstraintsChange={setConstraints}
                    />

                    {/* Research Bonuses Info Box */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            backgroundColor: '#1a1a1a',
                            padding: '1rem',
                            borderRadius: '6px',
                            border: '1px solid #444'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '0.75rem'
                            }}>
                                {researchIcon && (
                                    <img src={researchIcon} alt="Research" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                )}
                                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#aaa' }}>
                                    Active Research Bonuses
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                    <span style={{ color: '#888' }}>Crop Yield:</span>
                                    <span style={{ color: research.cropYield > 0 ? '#50C878' : '#666', fontWeight: '600' }}>
                                        {research.cropYield > 0 ? '+' : ''}{research.cropYield}%
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                    <span style={{ color: '#888' }}>Water Reduction:</span>
                                    <span style={{ color: research.waterReduction > 0 ? '#50C878' : '#666', fontWeight: '600' }}>
                                        {research.waterReduction > 0 ? '-' : ''}{research.waterReduction}%
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                    <span style={{ color: '#888' }}>Rain Yield:</span>
                                    <span style={{ color: research.rainYield > 0 ? '#50C878' : '#666', fontWeight: '600' }}>
                                        {research.rainYield > 0 ? '+' : ''}{research.rainYield}%
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                marginTop: '0.75rem',
                                paddingTop: '0.75rem',
                                borderTop: '1px solid #333',
                                fontSize: '0.7rem',
                                color: '#666',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                {infoIcon && (
                                    <img src={infoIcon} alt="Info" style={{ width: '12px', height: '12px', objectFit: 'contain' }} />
                                )}
                                From Global Settings
                            </div>
                        </div>
                    </div>

                    {/* Manual Mode - Farms */}
                    {optimizationMode === 'manual' && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.75rem'
                            }}>
                                <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#ddd' }}>
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
                    )}

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        disabled={loading || (optimizationMode === 'manual' && farms.length === 0)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: loading ? '#555' : '#4a90e2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1.1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: '700',
                            transition: 'all 0.2s',
                            boxShadow: loading ? 'none' : '0 4px 12px rgba(74, 144, 226, 0.4)'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor = '#5aa0f2';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor = '#4a90e2';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {loading ? '⏳ Calculating...' : optimizationMode === 'manual' ? '🚀 Calculate Production' : '🎯 Optimize & Calculate'}
                    </button>
                </div>

                {/* Results Section */}
                {results && (
                    <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start' }}>
                        <ResultsSummary
                            results={results}
                            research={research}
                        />

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
                                <FarmResultCard
                                    key={farmResult.farm.id}
                                    farmNumber={index + 1}
                                    farmResult={farmResult}
                                    research={research}
                                    allowedFertilizerIds={constraints.allowedFertilizers}
                                    onFertilizerSelect={handleFertilizerSelect}
                                    onCustomFertilityChange={handleCustomFertilityChange}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <CropSelectionModal
                isOpen={cropModal.open}
                crops={availableCrops}
                onSelect={selectCrop}
                onClose={() => setCropModal({ open: false, farmIndex: null, slotIndex: null })}
            />

            <RecipeSelectionModal
                modal={recipeSelectionModal}
                onSelect={selectProcessingRecipe}
                onClose={() => setRecipeSelectionModal({ open: false, productId: null, productName: null, availableRecipes: [] })}
                selectedProcessingRecipes={selectedProcessingRecipes}
            />
        </>
    );
};

export default FarmOptimizerPage;