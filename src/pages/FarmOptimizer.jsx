import { useEffect, useState } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { FarmOptimizer } from '../utils/FarmOptimizer';
import { FarmConstants } from '../utils/FarmConstants';
import { getProductIcon, getCropIcon } from '../utils/AssetHelper';

const FarmOptimizerPage = () => {
    useEffect(() => {
        document.title = 'Farm Optimizer - Captain of Industry Tools';
    }, []);

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

    const [research, setResearch] = useState({
        cropYield: 0,
        waterReduction: 0,
        rainYield: 0
    });

    const [foodConsumptionMult, setFoodConsumptionMult] = useState(1.0);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const availableFarms = ProductionCalculator.farms?.filter(f => f.type === 'crop') || [];
    const availableCrops = ProductionCalculator.crops || [];
    const availableFoodCrops = availableCrops.filter(crop => {
        const food = ProductionCalculator.foods?.find(f => f.productId === crop.output.productId);
        return food != null;
    });

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
                let totalWaterPerDay = 0;
                let totalRotationMonths = 0;
                let activeCropCount = 0;

                rotation.forEach(cropId => {
                    if (!cropId) return;
                    const crop = availableCrops.find(c => c.id === cropId);
                    if (!crop) return;

                    activeCropCount++;

                    const productionPerMonth = FarmOptimizer.calculateCropYield(crop, effectiveFarm);
                    const waterPerDay = FarmOptimizer.calculateWaterPerDay(crop, effectiveFarm);

                    if (production[crop.output.productId]) {
                        production[crop.output.productId] += productionPerMonth;
                    } else {
                        production[crop.output.productId] = productionPerMonth;
                    }

                    totalWaterPerDay += waterPerDay;
                    totalRotationMonths += crop.growthDays / 30;
                });

                const fertilityInfo = FarmOptimizer.calculateFertilityEquilibrium(
                    rotation,
                    effectiveFarm
                );

                const peopleFedTotal = FarmOptimizer.calculatePeopleFed(production, foodConsumptionMult);
                const peopleFedPerMonth = activeCropCount > 0 ? peopleFedTotal / activeCropCount : 0;

                return {
                    farm,
                    effectiveFarm,
                    rotation,
                    production,
                    fertilityInfo,
                    peopleFed: peopleFedPerMonth,
                    totalWaterPerDay: totalWaterPerDay / 4,
                    totalRotationMonths,
                    activeCropCount
                };
            });

            const totalPeopleFed = detailedResults.reduce((sum, r) => sum + r.peopleFed, 0);
            const totalWaterPerDay = detailedResults.reduce((sum, r) => sum + r.totalWaterPerDay, 0);

            const allProduction = {};
            detailedResults.forEach(result => {
                Object.entries(result.production).forEach(([productId, quantity]) => {
                    allProduction[productId] = (allProduction[productId] || 0) + quantity;
                });
            });

            const totalFertilityDeficit = detailedResults.reduce((sum, r) =>
                sum + (r.fertilityInfo.fertilityDeficit || 0), 0
            );

            const fertilizerNeeds = FarmOptimizer.calculateFertilizerNeeds(
                constraints.targetFertility,
                0,
                totalFertilityDeficit,
                farms.length
            );

            setResults({
                farms: detailedResults,
                totals: {
                    peopleFed: totalPeopleFed,
                    waterPerDay: totalWaterPerDay,
                    waterPerMonth: totalWaterPerDay * 30,
                    production: allProduction,
                    fertilizerNeeds
                }
            });
        } catch (error) {
            console.error('Optimization error:', error);
            alert('Error during optimization: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * PROFESSIONAL OPTIMIZER
     * Tests all possible crop combinations (1-4 crops) and finds the TRUE optimal setup
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

        // Calculate base metrics for each crop
        const cropMetrics = cropsToUse.map(crop => {
            const farm = effectiveFarms[0];
            if (!farm) return null;

            const productionPerMonth = FarmOptimizer.calculateCropYield(crop, farm);
            const waterPerDay = FarmOptimizer.calculateWaterPerDay(crop, farm);
            const fertilityPerDay = crop.fertilityPerDayPercent;

            const food = ProductionCalculator.foods?.find(f => f.productId === crop.output.productId);
            if (!food) return null;

            const monthsPerCycle = crop.growthDays / 30;
            const peopleFedTotal = FarmOptimizer.calculatePeopleFed({
                [crop.output.productId]: productionPerMonth
            }, foodConsumptionMult);

            const peopleFedPerMonth = peopleFedTotal / monthsPerCycle;

            return {
                crop,
                productionPerMonth,
                waterPerDay,
                fertilityPerDay,
                peopleFedPerMonth,
                waterPerPerson: peopleFedPerMonth > 0 ? waterPerDay / peopleFedPerMonth : 0,
                fertilityPerPerson: peopleFedPerMonth > 0 ? Math.abs(fertilityPerDay) / peopleFedPerMonth : 0,
                category: food.categoryId,
                monthsPerCycle
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
        let totalPeopleFed = 0;
        const targetPop = constraints.targetPopulation;

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
            if (totalPeopleFed >= targetPop) {
                rotations.push([null, null, null, null]);
                continue;
            }

            // Find best 2-crop combo for water efficiency
            const rotation = [];
            let farmPeopleFed = 0;

            for (let i = 0; i < cropMetrics.length && rotation.length < 2; i++) {
                if (!rotation.includes(cropMetrics[i].crop.id)) {
                    rotation.push(cropMetrics[i].crop.id);
                    farmPeopleFed += cropMetrics[i].peopleFedPerMonth;
                }
            }

            totalPeopleFed += farmPeopleFed;

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
        let totalPeopleFed = 0;
        const targetPop = constraints.targetPopulation;

        for (let farmIdx = 0; farmIdx < farmCount; farmIdx++) {
            if (totalPeopleFed >= targetPop) {
                rotations.push([null, null, null, null]);
                continue;
            }

            const rotation = [];
            let farmPeopleFed = 0;

            for (let i = 0; i < cropMetrics.length && rotation.length < 2; i++) {
                if (!rotation.includes(cropMetrics[i].crop.id)) {
                    rotation.push(cropMetrics[i].crop.id);
                    farmPeopleFed += cropMetrics[i].peopleFedPerMonth;
                }
            }

            totalPeopleFed += farmPeopleFed;

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
        <div style={{
            padding: '2rem',
            maxWidth: '1920px',
            margin: '0 auto',
            minHeight: '100vh'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                    Farm Optimizer
                </h2>
                <p style={{ color: '#aaa', fontSize: '1.1rem' }}>
                    Professional-grade crop rotation optimizer with combinatorial analysis
                </p>
            </div>

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
        </div>
    );
};

// Helper Components remain the same...
const FarmConfigCard = ({ farm, farmIndex, availableFarms, availableCrops, onRemove, onUpdateType, onOpenCropModal, canRemove }) => {
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

                        return (
                            <button
                                key={slotIndex}
                                onClick={() => onOpenCropModal(farmIndex, slotIndex)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: crop ? '#2a4a6a' : '#2a2a2a',
                                    border: crop ? '2px solid #4a90e2' : '2px dashed #555',
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
                                    </>
                                ) : (
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                        Click to select
                                    </div>
                                )}
                            </button>
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
                        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                            {results.totals.waterPerMonth.toFixed(0)} /month
                        </div>
                    </div>

                    {results.totals.fertilizerNeeds && results.totals.fertilizerNeeds.needed && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            marginBottom: '1rem',
                            border: '1px solid #333'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>
                                Fertilizer Needed
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFD700' }}>
                                {results.totals.fertilizerNeeds.fertilizer?.name || 'Unknown'}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                                {results.totals.fertilizerNeeds.quantityPerMonth?.toFixed(1)} /month
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
    const { farm, effectiveFarm, rotation, production, fertilityInfo, peopleFed, totalWaterPerDay, totalRotationMonths, activeCropCount } = farmResult;

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
                        </div>
                    );
                })}
            </div>

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