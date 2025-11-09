// src/components/farm-optimizer/FarmResultCard.jsx - COMPLETE FIXED VERSION
import { useState, useEffect } from 'react';
import { getCropIcon, getProductIcon, getGeneralIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';
import { FertilizerCalculator } from '../../utils/FertilizerCalculator';
import FertilityBreakdownPanel from './FertilityBreakdownPanel';

const FarmResultCard = ({
    farmNumber,
    farmResult,
    research,
    onFertilizerSelect,
    onCustomFertilityChange,
    allowedFertilizerIds = ['Product_FertilizerOrganic', 'Product_Fertilizer', 'Product_Fertilizer2']
}) => {
    const [showFertilityBreakdown, setShowFertilityBreakdown] = useState(false);
    const [showFertilizerSettings, setShowFertilizerSettings] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        howItWorks: false,
        calculations: false,
        comparison: false
    });

    const {
        farm,
        effectiveFarm,
        rotation,
        production,
        fertilityInfo,
        actualFertility,
        usingFertilizer,
        peopleFed,
        totalWaterPerDay,
        farmWaterPerDay,
        processingWaterPerDay,
        totalRotationMonths,
        processingChains,
        slotDetails,
        bestFertilizerOption,
        autoAppliedFertilizer
    } = farmResult;

    const naturalEquilibrium = fertilityInfo.naturalEquilibrium;

    const availableFertilizers = allowedFertilizerIds
        .map(id => {
            const product = ProductionCalculator.getProduct(id);
            if (!product) return null;

            const fertilityBoost = FertilizerCalculator.getFertilityBoost(id);
            return {
                id: product.id,
                name: product.name,
                icon: getProductIcon(product),
                fertilityPerUnit: fertilityBoost
            };
        })
        .filter(f => f !== null);

    const maxFertilityCap = FertilizerCalculator.getMaxFertilityCap(allowedFertilizerIds);

    const [selectedFertilizerId, setSelectedFertilizerId] = useState(
        farm.selectedFertilizerId || availableFertilizers[0]?.id || null
    );

    const roundToTen = (value) => Math.round(value / 10) * 10;

    const [targetFertility, setTargetFertility] = useState(
        roundToTen(actualFertility || Math.ceil(naturalEquilibrium / 10) * 10 + 10)
    );

    const bestOption = bestFertilizerOption ? {
        ...bestFertilizerOption,
        fertilizer: {
            id: bestFertilizerOption.fertilizerId,
            name: bestFertilizerOption.fertilizerName,
            icon: availableFertilizers.find(f => f.id === bestFertilizerOption.fertilizerId)?.icon,
            fertilityPerUnit: bestFertilizerOption.fertilityPerQuantity
        },
        actualFertility: bestFertilizerOption.targetFertility
    } : null;

    useEffect(() => {
        if (farm.selectedFertilizerId !== selectedFertilizerId) {
            console.log(`Farm ${farmNumber}: Syncing selectedFertilizerId:`, farm.selectedFertilizerId);
            setSelectedFertilizerId(farm.selectedFertilizerId || availableFertilizers[0]?.id || null);
        }
    }, [farm.selectedFertilizerId, farmNumber]);

    useEffect(() => {
        const roundedActual = roundToTen(actualFertility || Math.ceil(naturalEquilibrium / 10) * 10 + 10);
        if (Math.abs(roundedActual - targetFertility) > 5) {
            console.log(`Farm ${farmNumber}: Syncing targetFertility:`, roundedActual);
            setTargetFertility(roundedActual);
        }
    }, [actualFertility, farmNumber]);

    const calculateAdjustedProduction = () => {
        const baseYield = peopleFed / (actualFertility / naturalEquilibrium);
        const yieldMultiplier = actualFertility / naturalEquilibrium;
        return baseYield * yieldMultiplier;
    };

    const adjustedPeopleFed = calculateAdjustedProduction();

    const calculateFertilizerNeeds = (fertilizerId, target) => {
        if (!fertilizerId || target <= naturalEquilibrium) {
            return null;
        }

        const fertilizer = availableFertilizers.find(f => f.id === fertilizerId);
        if (!fertilizer) return null;

        const fertilityGap = target - naturalEquilibrium;
        const unitsNeeded = Math.ceil(fertilityGap / fertilizer.fertilityPerUnit);
        const actualFertilityTarget = naturalEquilibrium + (unitsNeeded * fertilizer.fertilityPerUnit);

        const productionChain = FertilizerCalculator.getProductionChain(fertilizerId);
        const workerMonthsPerUnit = productionChain?.workerMonthsPerUnit || 0.5;
        const totalWorkerMonths = unitsNeeded * workerMonthsPerUnit * 12;

        const baseYield = peopleFed / (actualFertility / naturalEquilibrium);
        const naturalYield = baseYield;
        const targetYieldMultiplier = actualFertilityTarget / naturalEquilibrium;
        const newYield = baseYield * targetYieldMultiplier;
        const yieldIncrease = newYield - naturalYield;

        const workersNeeded = totalWorkerMonths / 12;
        const netPeopleFed = yieldIncrease - workersNeeded;

        return {
            fertilizer,
            unitsNeeded,
            unitsPerMonth: unitsNeeded,
            unitsPerYear: unitsNeeded * 12,
            actualFertility: actualFertilityTarget,
            fertilityGap,
            yieldMultiplier: targetYieldMultiplier,
            baseYield: naturalYield,
            newYield,
            yieldIncrease,
            workerMonthsPerYear: totalWorkerMonths,
            workersNeeded,
            netPeopleFed,
            efficiency: yieldIncrease / workersNeeded
        };
    };

    const currentFertilizerNeeds = usingFertilizer && farm.selectedFertilizerId
        ? calculateFertilizerNeeds(farm.selectedFertilizerId, actualFertility)
        : null;

    const plannedFertilizerNeeds = calculateFertilizerNeeds(selectedFertilizerId, targetFertility);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleApplyFertilizer = () => {
        console.log(`Farm ${farmNumber}: Applying fertilizer:`, {
            farmIndex: farmNumber - 1,
            selectedFertilizerId,
            targetFertility: roundToTen(targetFertility),
            farmId: farm.id
        });
        onFertilizerSelect(farmNumber - 1, selectedFertilizerId);
        onCustomFertilityChange(farm.id, roundToTen(targetFertility));
        setShowFertilizerSettings(false);
    };

    const handleUseBestOption = () => {
        if (bestOption) {
            console.log(`Farm ${farmNumber}: Using best option:`, bestOption.fertilizer.name, 'at', bestOption.actualFertility + '%');
            setSelectedFertilizerId(bestOption.fertilizer.id);
            setTargetFertility(roundToTen(bestOption.actualFertility));
        }
    };

    const handleRemoveFertilizer = () => {
        console.log(`Farm ${farmNumber}: Removing fertilizer`);
        onFertilizerSelect(farmNumber - 1, null);
        onCustomFertilityChange(farm.id, null);
        setShowFertilizerSettings(false);
    };

    const fertilizerIcon = getGeneralIcon('Fertilizer');
    const infoIcon = getGeneralIcon('Info');
    const calculatorIcon = getGeneralIcon('Calculator');
    const compareIcon = getGeneralIcon('Compare');
    const settingsIcon = getGeneralIcon('Settings');
    const starIcon = getGeneralIcon('Star');

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
                    Feeds {adjustedPeopleFed.toFixed(1)} people/month • {totalWaterPerDay.toFixed(1)} water/day
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
                                        {(slotDetail.peopleFed * (actualFertility / naturalEquilibrium) / (farmResult.actualFertility / naturalEquilibrium)).toFixed(0)} /mo
                                    </div>
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
                    <div style={{ fontSize: '0.9rem', color: '#4a90e2', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getGeneralIcon('Machines') && (
                            <img
                                src={getGeneralIcon('Machines')}
                                alt="Processing"
                                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                            />
                        )}
                        Processing Required
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
                        <div style={{ color: '#50C878', fontWeight: '700', fontSize: '1rem' }}>
                            {fertilityInfo.naturalEquilibrium.toFixed(1)}%
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>
                            {usingFertilizer ? 'With Fertilizer' : 'Actual Fertility'}
                        </div>
                        <div style={{
                            color: usingFertilizer ? '#FFD700' : '#50C878',
                            fontWeight: '700',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            {actualFertility.toFixed(1)}%
                            {usingFertilizer && fertilizerIcon && (
                                <img
                                    src={fertilizerIcon}
                                    alt="Fertilizer"
                                    style={{ width: '14px', height: '14px', objectFit: 'contain' }}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>Rotation Length</div>
                        <div style={{ color: '#4a90e2', fontWeight: '700', fontSize: '1rem' }}>
                            {totalRotationMonths.toFixed(1)} mo
                        </div>
                    </div>
                </div>

                {showFertilityBreakdown && (
                    <div style={{ marginTop: '1rem' }}>
                        <FertilityBreakdownPanel
                            farmResult={farmResult}
                            effectiveFarm={effectiveFarm}
                            rotation={rotation}
                            research={research}
                            onFertilityChange={onCustomFertilityChange}
                        />
                    </div>
                )}
            </div>

            <div style={{
                padding: '1rem',
                backgroundColor: '#2a2a2a',
                borderRadius: '6px',
                border: '1px solid #444',
                marginBottom: '1rem'
            }}>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem'
                    }}>
                        {fertilizerIcon && (
                            <img src={fertilizerIcon} alt="Fertilizer" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        )}
                        <span style={{ fontSize: '1rem', fontWeight: '700', color: usingFertilizer ? '#FFD700' : '#ddd' }}>
                            Fertilizer Status
                        </span>
                        {autoAppliedFertilizer && (
                            <span style={{
                                fontSize: '0.7rem',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: 'rgba(80, 200, 120, 0.2)',
                                color: '#50C878',
                                borderRadius: '3px',
                                fontWeight: '600'
                            }}>
                                ✓ Auto-Applied
                            </span>
                        )}
                        {usingFertilizer && !autoAppliedFertilizer && (
                            <span style={{
                                fontSize: '0.7rem',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                color: '#4a90e2',
                                borderRadius: '3px',
                                fontWeight: '600'
                            }}>
                                ✓ Manual Override
                            </span>
                        )}
                    </div>

                    {usingFertilizer && currentFertilizerNeeds ? (
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            border: '1px solid #333'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem'
                            }}>
                                {currentFertilizerNeeds.fertilizer.icon && (
                                    <img
                                        src={currentFertilizerNeeds.fertilizer.icon}
                                        alt={currentFertilizerNeeds.fertilizer.name}
                                        style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                    />
                                )}
                                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFD700' }}>
                                    {currentFertilizerNeeds.fertilizer.name}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#888' }}>
                                    (Target: {actualFertility.toFixed(0)}% fertility)
                                </span>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '0.5rem',
                                fontSize: '0.75rem'
                            }}>
                                <div>
                                    <div style={{ color: '#888' }}>Usage</div>
                                    <div style={{ color: '#ddd', fontWeight: '700', fontSize: '0.85rem' }}>
                                        {currentFertilizerNeeds.unitsPerMonth.toFixed(1)}/mo
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: '#888' }}>Per Year</div>
                                    <div style={{ color: '#ddd', fontWeight: '700', fontSize: '0.85rem' }}>
                                        {currentFertilizerNeeds.unitsPerYear.toFixed(0)}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: '#888' }}>+People</div>
                                    <div style={{ color: '#50C878', fontWeight: '700', fontSize: '0.85rem' }}>
                                        +{currentFertilizerNeeds.yieldIncrease.toFixed(1)}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: '#888' }}>Net</div>
                                    <div style={{
                                        color: currentFertilizerNeeds.netPeopleFed > 0 ? '#50C878' : '#ff6b6b',
                                        fontWeight: '700',
                                        fontSize: '0.85rem'
                                    }}>
                                        {currentFertilizerNeeds.netPeopleFed > 0 ? '+' : ''}{currentFertilizerNeeds.netPeopleFed.toFixed(1)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            border: '1px solid #333',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>
                                No fertilizer currently applied
                            </div>
                            {bestOption && (
                                <div style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>
                                    💡 Recommended: {bestOption.fertilizer.name} (+{bestOption.netPeopleFed.toFixed(1)} net people)
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setShowFertilizerSettings(!showFertilizerSettings)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: showFertilizerSettings ? 'rgba(74, 144, 226, 0.15)' : '#1a1a1a',
                        border: showFertilizerSettings ? '2px solid #4a90e2' : '1px solid #444',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: showFertilizerSettings ? '#4a90e2' : '#ddd',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (!showFertilizerSettings) {
                            e.currentTarget.style.backgroundColor = '#222';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!showFertilizerSettings) {
                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                        }
                    }}
                >
                    {settingsIcon && (
                        <img src={settingsIcon} alt="Settings" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                    )}
                    {showFertilizerSettings ? '▼ Hide Settings' : 'Change Fertilizer Settings'}
                </button>

                {showFertilizerSettings && (
                    <div style={{ marginTop: '1rem' }}>
                        {bestOption && (
                            <div style={{
                                padding: '0.75rem',
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                border: '1px solid rgba(255, 215, 0, 0.3)',
                                borderRadius: '6px',
                                marginBottom: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        {starIcon && (
                                            <img src={starIcon} alt="Best" style={{ width: '14px', height: '14px' }} />
                                        )}
                                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#FFD700' }}>
                                            Recommended: {bestOption.fertilizer.name}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#888' }}>
                                        {bestOption.actualFertility}% fertility • Net: +{bestOption.netPeopleFed.toFixed(1)} people
                                    </div>
                                </div>
                                <button
                                    onClick={handleUseBestOption}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#FFD700',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFED4E'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                                >
                                    Use Best
                                </button>
                            </div>
                        )}

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: '#ddd'
                            }}>
                                Fertilizer Type
                            </label>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${Math.min(availableFertilizers.length, 3)}, 1fr)`,
                                gap: '0.5rem'
                            }}>
                                {availableFertilizers.map(fert => {
                                    const isSelected = selectedFertilizerId === fert.id;
                                    const isBest = bestOption && bestOption.fertilizer.id === fert.id;
                                    return (
                                        <button
                                            key={fert.id}
                                            onClick={() => setSelectedFertilizerId(fert.id)}
                                            style={{
                                                padding: '0.75rem',
                                                backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.15)' : '#1a1a1a',
                                                border: isSelected ? '2px solid #4a90e2' : '1px solid #444',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                position: 'relative'
                                            }}
                                        >
                                            {isBest && starIcon && (
                                                <img
                                                    src={starIcon}
                                                    alt="Best"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '4px',
                                                        right: '4px',
                                                        width: '12px',
                                                        height: '12px'
                                                    }}
                                                />
                                            )}
                                            {fert.icon && (
                                                <img src={fert.icon} alt={fert.name} style={{ width: '24px', height: '24px' }} />
                                            )}
                                            <span style={{
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                color: isSelected ? '#4a90e2' : '#ddd',
                                                textAlign: 'center'
                                            }}>
                                                {fert.name}
                                            </span>
                                            <span style={{ fontSize: '0.65rem', color: '#888' }}>
                                                +{fert.fertilityPerUnit}%/unit
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: '#ddd'
                            }}>
                                <span>Target Fertility</span>
                                <span style={{ fontSize: '1.1rem', color: '#4a90e2' }}>
                                    {targetFertility}%
                                </span>
                            </label>
                            <input
                                type="range"
                                min={Math.ceil(naturalEquilibrium / 10) * 10}
                                max={maxFertilityCap}
                                step="10"
                                value={targetFertility}
                                onChange={(e) => setTargetFertility(parseInt(e.target.value))}
                                style={{
                                    width: '100%',
                                    height: '6px',
                                    backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    accentColor: '#4a90e2'
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.65rem',
                                color: '#666',
                                marginTop: '0.25rem'
                            }}>
                                <span>{Math.ceil(naturalEquilibrium / 10) * 10}%</span>
                                <span style={{ fontStyle: 'italic' }}>Steps of 10% only</span>
                                <span>{maxFertilityCap}%</span>
                            </div>
                        </div>

                        {plannedFertilizerNeeds && (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '6px',
                                border: '1px solid #4a90e2',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: '#4a90e2',
                                    fontWeight: '700',
                                    marginBottom: '0.75rem',
                                    textTransform: 'uppercase'
                                }}>
                                    📊 Requirements
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '0.75rem'
                                }}>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#0f0f0f', borderRadius: '4px' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#888' }}>Units/Month</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ddd' }}>
                                            {plannedFertilizerNeeds.unitsPerMonth.toFixed(1)}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#0f0f0f', borderRadius: '4px' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#888' }}>Units/Year</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ddd' }}>
                                            {plannedFertilizerNeeds.unitsPerYear.toFixed(0)}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#0f0f0f', borderRadius: '4px' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#888' }}>People +</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#50C878' }}>
                                            +{plannedFertilizerNeeds.yieldIncrease.toFixed(1)}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#0f0f0f', borderRadius: '4px' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#888' }}>Net Benefit</div>
                                        <div style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            color: plannedFertilizerNeeds.netPeopleFed > 0 ? '#50C878' : '#ff6b6b'
                                        }}>
                                            {plannedFertilizerNeeds.netPeopleFed > 0 ? '+' : ''}{plannedFertilizerNeeds.netPeopleFed.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <button
                                onClick={handleApplyFertilizer}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    backgroundColor: '#4a90e2',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5aa0f2'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                            >
                                ✓ Apply Settings
                            </button>
                            {usingFertilizer && (
                                <button
                                    onClick={handleRemoveFertilizer}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        backgroundColor: '#ff6b6b',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff5555'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b6b'}
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        <ExpandableSection
                            title="How It Works"
                            icon={infoIcon}
                            isExpanded={expandedSections.howItWorks}
                            onToggle={() => toggleSection('howItWorks')}
                        >
                            <HowItWorksContent />
                        </ExpandableSection>

                        <ExpandableSection
                            title="Detailed Calculations"
                            icon={calculatorIcon}
                            isExpanded={expandedSections.calculations}
                            onToggle={() => toggleSection('calculations')}
                        >
                            {plannedFertilizerNeeds && (
                                <CalculationsContent
                                    needs={plannedFertilizerNeeds}
                                    naturalEquilibrium={naturalEquilibrium}
                                    targetFertility={targetFertility}
                                    baseYield={peopleFed / (actualFertility / naturalEquilibrium)}
                                />
                            )}
                        </ExpandableSection>

                        <ExpandableSection
                            title="Compare Options"
                            icon={compareIcon}
                            isExpanded={expandedSections.comparison}
                            onToggle={() => toggleSection('comparison')}
                        >
                            <ComparisonTable
                                availableFertilizers={availableFertilizers}
                                targetFertility={targetFertility}
                                calculateFertilizerNeeds={calculateFertilizerNeeds}
                            />
                        </ExpandableSection>
                    </div>
                )}
            </div>

            {Object.keys(production).length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Production (per month):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {Object.entries(production).map(([productId, quantity]) => {
                            const product = ProductionCalculator.getProduct(productId);
                            const icon = getProductIcon(product);
                            const adjustedQuantity = quantity * (actualFertility / naturalEquilibrium) / (farmResult.actualFertility / naturalEquilibrium);
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
                                        {adjustedQuantity.toFixed(0)}
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

const ExpandableSection = ({ title, icon, isExpanded, onToggle, children }) => (
    <div style={{
        marginBottom: '0.75rem',
        backgroundColor: '#0f0f0f',
        borderRadius: '4px',
        border: '1px solid #222',
        overflow: 'hidden'
    }}>
        <button
            onClick={onToggle}
            style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {icon && <img src={icon} alt="" style={{ width: '14px', height: '14px' }} />}
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ddd' }}>{title}</span>
            </div>
            <span style={{
                fontSize: '0.9rem',
                color: '#888',
                transition: 'transform 0.2s',
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
            }}>
                ▶
            </span>
        </button>
        {isExpanded && (
            <div style={{ padding: '0.75rem', borderTop: '1px solid #222', fontSize: '0.75rem', color: '#ddd' }}>
                {children}
            </div>
        )}
    </div>
);

const HowItWorksContent = () => (
    <div style={{ lineHeight: '1.6' }}>
        <p><strong>Fertility System:</strong></p>
        <ul style={{ marginLeft: '1.5rem', color: '#aaa' }}>
            <li>Each crop consumes fertility when growing</li>
            <li>Natural fertility regenerates to an equilibrium point</li>
            <li>Fertilizer boosts fertility above natural levels</li>
            <li>Higher fertility = higher crop yields</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}><strong>Yield Formula:</strong></p>
        <div style={{
            padding: '0.5rem',
            backgroundColor: '#000',
            borderRadius: '3px',
            fontFamily: 'monospace',
            color: '#50C878',
            fontSize: '0.7rem'
        }}>
            Yield = Base × (Fertility / Natural) × (1 + Research)
        </div>
    </div>
);

const CalculationsContent = ({ needs, naturalEquilibrium, targetFertility, baseYield }) => (
    <div style={{ lineHeight: '1.8', fontFamily: 'monospace', fontSize: '0.7rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: '#4a90e2' }}>Step 1: Fertility Gap</strong>
            <div style={{ padding: '0.5rem', backgroundColor: '#000', borderRadius: '3px', marginTop: '0.25rem' }}>
                {targetFertility}% - {naturalEquilibrium.toFixed(1)}% = {needs.fertilityGap.toFixed(1)}%
            </div>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: '#4a90e2' }}>Step 2: Units Needed</strong>
            <div style={{ padding: '0.5rem', backgroundColor: '#000', borderRadius: '3px', marginTop: '0.25rem' }}>
                {needs.fertilityGap.toFixed(1)}% / {needs.fertilizer.fertilityPerUnit}% = {needs.unitsNeeded} units
            </div>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: '#4a90e2' }}>Step 3: Yield Increase</strong>
            <div style={{ padding: '0.5rem', backgroundColor: '#000', borderRadius: '3px', marginTop: '0.25rem' }}>
                {baseYield.toFixed(1)} × {needs.yieldMultiplier.toFixed(2)} = {needs.newYield.toFixed(1)}
                <br />
                Increase: +{needs.yieldIncrease.toFixed(1)} people/month
            </div>
        </div>
        <div>
            <strong style={{ color: '#4a90e2' }}>Step 4: Net Benefit</strong>
            <div style={{ padding: '0.5rem', backgroundColor: '#000', borderRadius: '3px', marginTop: '0.25rem' }}>
                Workers: {needs.workersNeeded.toFixed(1)}
                <br />
                Net: {needs.yieldIncrease.toFixed(1)} - {needs.workersNeeded.toFixed(1)} = {needs.netPeopleFed.toFixed(1)}
            </div>
        </div>
    </div>
);

const ComparisonTable = ({ availableFertilizers, targetFertility, calculateFertilizerNeeds }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '0.7rem', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#000' }}>
                    <th style={{ padding: '0.5rem', textAlign: 'left', color: '#888' }}>Type</th>
                    <th style={{ padding: '0.5rem', textAlign: 'right', color: '#888' }}>Units/Mo</th>
                    <th style={{ padding: '0.5rem', textAlign: 'right', color: '#888' }}>+People</th>
                    <th style={{ padding: '0.5rem', textAlign: 'right', color: '#888' }}>Net</th>
                </tr>
            </thead>
            <tbody>
                {availableFertilizers.map(fert => {
                    const needs = calculateFertilizerNeeds(fert.id, targetFertility);
                    if (!needs) return null;
                    return (
                        <tr key={fert.id} style={{ borderBottom: '1px solid #222' }}>
                            <td style={{ padding: '0.5rem', color: '#ddd' }}>{fert.name}</td>
                            <td style={{ padding: '0.5rem', textAlign: 'right', color: '#ddd' }}>
                                {needs.unitsPerMonth.toFixed(1)}
                            </td>
                            <td style={{ padding: '0.5rem', textAlign: 'right', color: '#50C878' }}>
                                +{needs.yieldIncrease.toFixed(1)}
                            </td>
                            <td style={{
                                padding: '0.5rem',
                                textAlign: 'right',
                                color: needs.netPeopleFed > 0 ? '#50C878' : '#ff6b6b',
                                fontWeight: '700'
                            }}>
                                {needs.netPeopleFed > 0 ? '+' : ''}{needs.netPeopleFed.toFixed(1)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);

export default FarmResultCard;