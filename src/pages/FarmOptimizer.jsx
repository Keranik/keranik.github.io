// src/pages/FarmOptimizer.jsx - CLEAN ORCHESTRATOR VERSION
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { FoodChainResolver } from '../utils/FoodChainResolver';
import { FertilizerCalculator } from '../utils/FertilizerCalculator';
import { getGeneralIcon } from '../utils/AssetHelper';
import LoadingOverlay from '../components/LoadingOverlay';

// Import calculation engines
import { FarmCalculationEngine } from '../utils/FarmCalculationEngine';
import { FarmStateManager } from '../utils/FarmStateManager';

// Import UI components
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
    const { settings, getResearchValue, openSettings } = useSettings();
    const navigate = useNavigate();
    // ===== Core State =====
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [results, setResults] = useState(null);

    // ===== Configuration State =====
    const [research, setResearch] = useState({
        cropYield: 0,
        waterReduction: 0,
        rainYield: 0
    });

    const [optimizationMode, setOptimizationMode] = useState('manual');
    const [optimizationGoal, setOptimizationGoal] = useState('minWater');
    const [targetPopulationEnabled, setTargetPopulationEnabled] = useState(true);

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

    // ===== Farm State =====
    const [farms, setFarms] = useState([
        {
            id: 1,
            farmId: 'FarmT1',
            rotation: [null, null, null, null],
            selectedFertilizerId: null,
            customFertility: null
        }
    ]);

    // ===== UI State =====
    const [selectedProcessingRecipes, setSelectedProcessingRecipes] = useState(new Map());
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

    // ===== Refs for State Management =====
    const pendingRecalculation = useRef(false);
    const userTriggeredCalculation = useRef(false);  // ✅ NEW: Track if user clicked Calculate
    const loadingTimerRef = useRef(null);
    const settingsIcon = getGeneralIcon('Settings'); 

    // ===== Data Loading =====
    useEffect(() => {
        document.title = 'Farm Optimizer - Captain of Industry Tools';
        loadGameData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    const loadGameData = async () => {
        try {
            const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
            const gameData = await DataLoader.loadGameData(enabledMods);

            ProductionCalculator.initialize(gameData);
            FoodChainResolver.initialize(
                ProductionCalculator.recipes || [],
                ProductionCalculator.foods || [],
                ProductionCalculator.crops || []
            );

            // Initialize food crop identification
            initializeFoodCrops();

            setDataLoaded(true);
        } catch (error) {
            console.error('Error loading farm data:', error);
            alert('Failed to load farm data: ' + error.message);
        }
    };

    const initializeFoodCrops = () => {
        const foodCropIds = new Set();

        // Direct food crops
        ProductionCalculator.crops?.forEach(crop => {
            const isDirectFood = ProductionCalculator.foods?.some(f => f.productId === crop.output.productId);
            if (isDirectFood) {
                foodCropIds.add(crop.id);
            }
        });

        // Crops that can be processed into food
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
    };

    // ===== Research Updates =====
    useEffect(() => {
        setResearch({
            cropYield: getResearchValue('FarmYieldMultiplier') || 0,
            waterReduction: getResearchValue('FarmWaterConsumptionMultiplier') || 0,
            rainYield: getResearchValue('RainYieldMultiplier') || 0
        });
    }, [settings.research, getResearchValue]);

    useEffect(() => {
        if (pendingRecalculation.current && !loading && dataLoaded && results) {
            console.log('🔄 Pending recalculation detected, executing now...');
            pendingRecalculation.current = false;
            performCalculation(false);  // ✅ Auto-triggered (fertilizer apply)
        }
    }, [farms, loading, dataLoaded, results]);

    useEffect(() => {
        if (results && !loading && dataLoaded) {
            console.log('naturalFertilityOnly changed, triggering recalculation');
            const timer = setTimeout(() => performCalculation(false), 300);  // ✅ Auto-triggered
            return () => clearTimeout(timer);
        }
    }, [constraints.naturalFertilityOnly]);

    useEffect(() => {
        if (results && !loading && dataLoaded) {
            console.log('allowedFertilizers changed, triggering recalculation');
            const timer = setTimeout(() => performCalculation(false), 300);  // ✅ Auto-triggered
            return () => clearTimeout(timer);
        }
    }, [constraints.allowedFertilizers]);

    // ===== Calculation =====
    const performCalculation = (userTriggered = false) => {
        console.log('=== FarmOptimizerPage: Starting calculation ===', { userTriggered });
        setLoading(true);
        setIsCalculating(true);

        // ✅ Only show loading overlay if calculation takes > 200ms
        loadingTimerRef.current = setTimeout(() => {
            if (isCalculating) {
                setShowLoadingOverlay(true);
            }
        }, 300);

        // Wrap in setTimeout like Calculator.jsx does
        setTimeout(() => {
            try {
                // ✅ Determine which farms to calculate
                let farmsToCalculate;

                if (optimizationMode === 'manual') {
                    // Manual mode: Always use existing farms
                    farmsToCalculate = farms;
                } else {
                    // Auto mode logic
                    if (userTriggered) {
                        // User clicked Calculate button - regenerate optimized farms
                        farmsToCalculate = generateOptimizedFarms();
                        console.log('Auto mode: User-triggered - Generating new optimized farms');
                    } else {
                        // Auto-triggered (fertilizer apply) - use existing farms
                        farmsToCalculate = farms;
                        console.log('Auto mode: Auto-triggered - Using existing farms with user changes');
                    }
                }

                // Use the calculation engine
                const calculationResults = FarmCalculationEngine.calculate({
                    farms: farmsToCalculate,
                    optimizationMode,
                    constraints,
                    research,
                    selectedProcessingRecipes,
                    foodConsumptionMultiplier: settings.foodConsumptionMultiplier || 1.0
                });

                // Update farm state with any auto-applied fertilizer
                if (optimizationMode === 'manual') {
                    const updatedFarms = FarmStateManager.updateFarmsWithCalculationResults(
                        farmsToCalculate,
                        calculationResults.farms
                    );

                    if (FarmStateManager.hasChanges(farms, updatedFarms)) {
                        console.log('✅ Manual mode: Updating farms state with calculation results');
                        setFarms(updatedFarms);
                    }
                } else {
                    // In auto mode, also update farms state with calculation results
                    const updatedFarms = FarmStateManager.updateFarmsWithCalculationResults(
                        farmsToCalculate,
                        calculationResults.farms
                    );

                    if (FarmStateManager.hasChanges(farms, updatedFarms)) {
                        console.log('✅ Auto mode: Updating farms state with calculation results');
                        setFarms(updatedFarms);
                    }
                }

                setResults(calculationResults);
                console.log('=== FarmOptimizerPage: Calculation complete ===');
            } catch (error) {
                console.error('Optimization error:', error);
                alert('Error during optimization: ' + error.message);
            } finally {
                // ✅ Clear the timer if calculation finished before 200ms
                if (loadingTimerRef.current) {
                    clearTimeout(loadingTimerRef.current);
                    loadingTimerRef.current = null;
                }

                setLoading(false);
                setIsCalculating(false);
                setShowLoadingOverlay(false);  // ✅ Hide overlay immediately when done
            }
        }, 10);
    };

    const generateOptimizedFarms = () => {
        const availableFarms = ProductionCalculator.farms?.filter(f => f.type === 'crop') || [];
        const availableFoodCrops = (ProductionCalculator.crops || []).filter(crop =>
            ProductionCalculator.foodCropIds?.has(crop.id) ?? false
        );

        const targetPop = constraints.targetPopulation;
        const avgPeoplePerFarm = 400;
        const estimatedFarms = Math.ceil(targetPop / avgPeoplePerFarm);
        const farmCount = constraints.maxFarms
            ? Math.min(estimatedFarms, constraints.maxFarms)
            : estimatedFarms;

        const optimizedFarms = [];
        for (let i = 0; i < farmCount; i++) {
            const farmType = constraints.allowedFarmTypes.length > 0
                ? constraints.allowedFarmTypes[0]
                : availableFarms[0]?.id || 'FarmT1';

            const efficientCrops = availableFoodCrops.slice(0, 2).map(c => c.id);
            const rotation = [...efficientCrops, null, null];

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

    // ===== User Actions - Calculation =====
    const handleCalculate = () => {
        performCalculation(true);  // ✅ User-triggered (Calculate button)
    };

    // ===== User Actions - Farm Management =====
    const addFarm = () => {
        const availableFarms = ProductionCalculator.farms?.filter(f => f.type === 'crop') || [];
        const lastFarmType = farms.length > 0
            ? farms[farms.length - 1].farmId
            : (availableFarms[0]?.id || 'FarmT1');

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

    // ===== User Actions - Crop Selection =====
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

    // ===== User Actions - Recipe Selection =====
    const openRecipeSelectionModal = (productId) => {
        const product = ProductionCalculator.getProduct(productId);
        const foodPaths = FoodChainResolver.getFoodsFromCrop(productId);

        if (foodPaths.length === 0) {
            alert(`No food recipes found for ${product?.name}. This crop cannot be processed into food.`);
            return;
        }

        const uniqueRecipeChains = new Map();
        foodPaths.forEach(path => {
            if (path.processingChain.length === 0) return;

            const chainKey = path.recipeChain.join('->');
            if (!uniqueRecipeChains.has(chainKey)) {
                const recipe = ProductionCalculator.getRecipe(path.processingChain[0].recipeId);
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
        setRecipeSelectionModal({
            open: false,
            productId: null,
            productName: null,
            availableRecipes: []
        });
    };

    // ===== User Actions - Fertilizer Management =====
    const handleFertilizerSelect = (farmIndex, fertilizerId) => {
        console.log('FarmOptimizerPage: handleFertilizerSelect', { farmIndex, fertilizerId });
        pendingRecalculation.current = true;

        setFarms(prevFarms => {
            const newFarms = prevFarms.map((farm, idx) =>
                idx === farmIndex ? { ...farm, selectedFertilizerId: fertilizerId } : farm
            );
            console.log('Updated farms after fertilizer select:', newFarms);
            return newFarms;
        });
    };

    const handleCustomFertilityChange = (farmId, newFertility) => {
        console.log('FarmOptimizerPage: handleCustomFertilityChange', { farmId, newFertility });
        pendingRecalculation.current = true;

        setFarms(prevFarms => {
            const newFarms = prevFarms.map(farm =>
                farm.id === farmId ? { ...farm, customFertility: newFertility } : farm
            );
            console.log('Updated farms after fertility change:', newFarms);
            return newFarms;
        });
    };

    // ===== Loading State =====
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

    // ===== Prepare data for UI =====
    const availableFarms = ProductionCalculator.farms?.filter(f => f.type === 'crop') || [];
    const availableCrops = ProductionCalculator.crops || [];
    const statsIcon = getGeneralIcon('Stats');
    const researchIcon = getGeneralIcon('Research');
    const infoIcon = getGeneralIcon('Info');

    // ===== Render =====
    return (
        <>
<LoadingOverlay
                isVisible={showLoadingOverlay}  // ✅ CHANGED from isCalculating
                title="Calculating Farm Production..."
                message="Processing crop rotations, fertility calculations, and food production chains..."
                showOptimizationTip={false}
                icon="🚜"
            />
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

                {/* Settings Panel */}
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '1.5rem',  // ✅ Reduced from 2rem
                    borderRadius: '10px',
                    marginBottom: '1.5rem',  // ✅ Reduced from 2rem
                    border: '1px solid #444',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}>
                    <h3 style={{
                        marginBottom: '1rem',  // ✅ Reduced from 1.5rem
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

                    {/* ✅ COMPACT: Mode + Constraints in 2-column grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        marginBottom: '1rem'  // ✅ Reduced spacing
                    }}>
                        <div>
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
                        </div>

                        <div>
                            <ConstraintsPanel
                                constraints={constraints}
                                availableFarms={availableFarms}
                                availableFoodCrops={availableCrops.filter(crop =>
                                    ProductionCalculator.foodCropIds?.has(crop.id) ?? false
                                )}
                                onConstraintsChange={setConstraints}
                            />
                        </div>
                    </div>

                    {/* ✅ COMPACT: Research Display - smaller, inline */}
                    <div style={{
                        backgroundColor: '#1a1a1a',
                        padding: '0.75rem 1rem',  // ✅ Tighter padding
                        borderRadius: '6px',
                        border: '1px solid #444',
                        marginBottom: '1rem'  // ✅ Reduced from 1.5rem
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',  // ✅ Spread out horizontally
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                {researchIcon && (
                                    <img src={researchIcon} alt="Research" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                                )}
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#aaa' }}>
                                    Research Bonuses:
                                </span>
                            </div>

                            {/* ✅ COMPACT: Inline research stats */}
                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: '#888' }}>Crop Yield:</span>
                                    <span style={{ color: research.cropYield > 0 ? '#50C878' : '#666', fontWeight: '600' }}>
                                        {research.cropYield > 0 ? '+' : ''}{research.cropYield}%
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: '#888' }}>Water:</span>
                                    <span style={{ color: research.waterReduction > 0 ? '#50C878' : '#666', fontWeight: '600' }}>
                                        {research.waterReduction > 0 ? '-' : ''}{research.waterReduction}%
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: '#888' }}>Rain:</span>
                                    <span style={{ color: research.rainYield > 0 ? '#50C878' : '#666', fontWeight: '600' }}>
                                        {research.rainYield > 0 ? '+' : ''}{research.rainYield}%
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={openSettings}  // ✅ Use context function
                                style={{
                                    fontSize: '0.7rem',
                                    color: '#666',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.15)';
                                    e.currentTarget.style.color = '#4a90e2';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#666';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                title="Click to open Global Settings"
                            >
                                {infoIcon && (
                                    <img
                                        src={infoIcon}
                                        alt="Info"
                                        style={{
                                            width: '12px',
                                            height: '12px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                                <span style={{
                                    textDecoration: 'underline',
                                    textDecorationStyle: 'dotted',
                                    textDecorationColor: 'currentColor'
                                }}>
                                    From <strong>Global Settings</strong>
                                </span>
                                <span style={{ fontSize: '0.65rem', opacity: 0.8 }}><img
                                    src={settingsIcon}
                                    alt="Settings"
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        objectFit: 'contain'
                                    }}
                                /></span>
                            </button>
                        </div>
                    </div>

                    {/* Manual Mode - Farm Configuration */}
                    {optimizationMode === 'manual' && (
                        <div style={{ marginBottom: '1rem' }}>  {/* ✅ Reduced from 1.5rem */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem'  // ✅ Reduced from 0.75rem
                            }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd' }}>  {/* ✅ Smaller font */}
                                    Farms ({farms.length})
                                </label>
                                <button
                                    onClick={addFarm}
                                    style={{
                                        padding: '0.4rem 0.8rem',  // ✅ Tighter padding
                                        backgroundColor: '#4a90e2',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',  // ✅ Smaller font
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

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>  {/* ✅ Reduced from 1rem */}
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
                            padding: '0.85rem',  // ✅ Reduced from 1rem
                            backgroundColor: loading ? '#555' : '#4a90e2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',  // ✅ Slightly smaller
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

                {/* Results */}
                {results && (
                    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>  {/* ✅ Narrower sidebar, tighter gap */}
                        <ResultsSummary
                            results={results}
                            research={research}
                        />

                        <div style={{
                            backgroundColor: '#2a2a2a',
                            padding: '1.25rem',  // ✅ Reduced from 1.5rem
                            borderRadius: '10px',
                            border: '1px solid #444',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                        }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem', fontWeight: '700' }}>  {/* ✅ Tighter */}
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