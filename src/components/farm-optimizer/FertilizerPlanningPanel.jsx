// src/components/farm-optimizer/FertilizerPlanningPanel.jsx
import { useState } from 'react';
import { getProductIcon, getGeneralIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';
import { FertilizerCalculator } from '../../utils/FertilizerCalculator';

const FertilizerPlanningPanel = ({
    farmResults,
    allowedFertilizerIds,
    onFertilizerUpdate
}) => {
    const [selectedFarmIndex, setSelectedFarmIndex] = useState(0);
    const [expandedSections, setExpandedSections] = useState({
        howItWorks: false,
        calculations: false,
        comparison: false
    });

    // Get all available fertilizer products
    const availableFertilizers = allowedFertilizerIds
        .map(id => ProductionCalculator.getProduct(id))
        .filter(p => p !== null)
        .map(product => {
            const fertilityBoost = FertilizerCalculator.getFertilityBoost(product.id);
            return {
                id: product.id,
                name: product.name,
                icon: getProductIcon(product),
                fertilityPerUnit: fertilityBoost
            };
        });

    // Calculate max fertility target (highest possible from any fertilizer)
    const maxPossibleFertility = Math.max(
        ...availableFertilizers.map(f => 100 + f.fertilityPerUnit * 10), // Assume 10 units max
        200 // Reasonable upper bound
    );

    // Get current farm
    const currentFarm = farmResults[selectedFarmIndex];
    const naturalEquilibrium = currentFarm?.fertilityInfo?.naturalEquilibrium || 250;

    // State for selected fertilizer and target
    const [selectedFertilizerId, setSelectedFertilizerId] = useState(
        currentFarm?.farm?.selectedFertilizerId || availableFertilizers[0]?.id || null
    );
    const [targetFertility, setTargetFertility] = useState(
        currentFarm?.actualFertility || Math.ceil(naturalEquilibrium / 10) * 10 + 10
    );

    // Calculate fertilizer requirements
    const calculateFertilizerNeeds = (fertilizerId, target) => {
        if (!fertilizerId || target <= naturalEquilibrium) {
            return null;
        }

        const fertilizer = availableFertilizers.find(f => f.id === fertilizerId);
        if (!fertilizer) return null;

        const fertilityGap = target - naturalEquilibrium;
        const unitsNeeded = Math.ceil(fertilityGap / fertilizer.fertilityPerUnit);
        const actualFertility = naturalEquilibrium + (unitsNeeded * fertilizer.fertilityPerUnit);

        // Calculate production chain cost
        const productionChain = FertilizerCalculator.getProductionChain(fertilizerId);
        const workerMonthsPerUnit = productionChain?.workerMonthsPerUnit || 0;
        const totalWorkerMonths = unitsNeeded * workerMonthsPerUnit * 12; // Per year

        // Calculate people fed increase
        const baseYield = currentFarm?.peopleFed || 0;
        const yieldIncrease = (actualFertility / naturalEquilibrium - 1) * baseYield;

        return {
            fertilizer,
            unitsNeeded,
            unitsPerMonth: unitsNeeded,
            unitsPerYear: unitsNeeded * 12,
            actualFertility,
            fertilityGap,
            workerMonthsPerYear: totalWorkerMonths,
            peopleFedIncrease: yieldIncrease,
            netPeopleFed: yieldIncrease - (totalWorkerMonths / 12), // Workers consume food
            efficiency: yieldIncrease / totalWorkerMonths
        };
    };

    const currentNeeds = calculateFertilizerNeeds(selectedFertilizerId, targetFertility);

    // Toggle section expansion
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Calculate global summary across all farms
    const calculateGlobalSummary = () => {
        const summary = {
            totalFertilizerUsed: {},
            totalPeopleFedIncrease: 0,
            totalWorkerMonths: 0,
            farmsUsingFertilizer: 0
        };

        farmResults.forEach(farm => {
            if (farm.usingFertilizer && farm.farm.selectedFertilizerId) {
                const needs = calculateFertilizerNeeds(
                    farm.farm.selectedFertilizerId,
                    farm.actualFertility
                );

                if (needs) {
                    summary.totalFertilizerUsed[needs.fertilizer.id] =
                        (summary.totalFertilizerUsed[needs.fertilizer.id] || 0) + needs.unitsPerYear;
                    summary.totalPeopleFedIncrease += needs.peopleFedIncrease;
                    summary.totalWorkerMonths += needs.workerMonthsPerYear;
                    summary.farmsUsingFertilizer++;
                }
            }
        });

        return summary;
    };

    const globalSummary = calculateGlobalSummary();

    const fertilizerIcon = getGeneralIcon('Fertilizer');
    const infoIcon = getGeneralIcon('Info');
    const calculatorIcon = getGeneralIcon('Calculator');
    const compareIcon = getGeneralIcon('Compare');

    return (
        <div style={{
            backgroundColor: '#2a2a2a',
            padding: '1.5rem',
            borderRadius: '10px',
            border: '1px solid #444',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            marginBottom: '2rem'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1.5rem'
            }}>
                {fertilizerIcon && (
                    <img src={fertilizerIcon} alt="Fertilizer" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                )}
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#FFD700' }}>
                    Fertilizer Planning & Analysis
                </h3>
            </div>

            {/* Farm Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#ddd'
                }}>
                    Select Farm to Configure
                </label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(farmResults.length, 6)}, 1fr)`,
                    gap: '0.5rem'
                }}>
                    {farmResults.map((farm, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedFarmIndex(idx)}
                            style={{
                                padding: '0.75rem',
                                backgroundColor: selectedFarmIndex === idx ? 'rgba(255, 215, 0, 0.15)' : '#1a1a1a',
                                border: selectedFarmIndex === idx ? '2px solid #FFD700' : '1px solid #444',
                                borderRadius: '6px',
                                color: selectedFarmIndex === idx ? '#FFD700' : '#888',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedFarmIndex !== idx) {
                                    e.currentTarget.style.backgroundColor = '#222';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedFarmIndex !== idx) {
                                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                                }
                            }}
                        >
                            Farm #{idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Current Farm Info */}
            <div style={{
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '6px',
                marginBottom: '1.5rem',
                border: '1px solid #333'
            }}>
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>
                    Natural Fertility Equilibrium:
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#50C878' }}>
                    {naturalEquilibrium.toFixed(1)}%
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                    Base yield without fertilizer. Any fertility above this requires fertilizer input.
                </div>
            </div>

            {/* Fertilizer Type Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#ddd'
                }}>
                    Fertilizer Type
                </label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(availableFertilizers.length, 3)}, 1fr)`,
                    gap: '0.75rem'
                }}>
                    {availableFertilizers.map(fert => {
                        const isSelected = selectedFertilizerId === fert.id;
                        return (
                            <button
                                key={fert.id}
                                onClick={() => setSelectedFertilizerId(fert.id)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: isSelected ? 'rgba(255, 215, 0, 0.15)' : '#1a1a1a',
                                    border: isSelected ? '2px solid #FFD700' : '1px solid #444',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#222';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                    }
                                }}
                            >
                                {fert.icon && (
                                    <img src={fert.icon} alt={fert.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                                )}
                                <span style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: isSelected ? '#FFD700' : '#ddd',
                                    textAlign: 'center'
                                }}>
                                    {fert.name}
                                </span>
                                <span style={{
                                    fontSize: '0.7rem',
                                    color: '#888'
                                }}>
                                    +{fert.fertilityPerUnit}% per unit
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Target Fertility Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#ddd'
                }}>
                    <span>Target Fertility</span>
                    <span style={{ fontSize: '1.2rem', color: '#FFD700' }}>
                        {targetFertility}%
                    </span>
                </label>
                <input
                    type="range"
                    min={Math.ceil(naturalEquilibrium / 10) * 10}
                    max={Math.min(maxPossibleFertility, 200)}
                    step="10"
                    value={targetFertility}
                    onChange={(e) => setTargetFertility(parseInt(e.target.value))}
                    style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        accentColor: '#FFD700'
                    }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    color: '#666',
                    marginTop: '0.5rem'
                }}>
                    <span>Min: {Math.ceil(naturalEquilibrium / 10) * 10}%</span>
                    <span>Max: {Math.min(maxPossibleFertility, 200)}%</span>
                </div>
                <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#888',
                    fontStyle: 'italic'
                }}>
                    ℹ️ Game uses 10% increments only. Slider snaps to nearest 10%.
                </div>
            </div>

            {/* Current Requirements Display */}
            {currentNeeds && (
                <div style={{
                    padding: '1.25rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    border: '2px solid #FFD700',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        fontSize: '0.9rem',
                        color: '#FFD700',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        📊 Fertilizer Requirements
                    </div>

                    {/* Key Metrics Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#0f0f0f',
                            borderRadius: '4px'
                        }}>
                            <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>
                                Units Per Month
                            </div>
                            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#FFD700' }}>
                                {currentNeeds.unitsPerMonth.toFixed(1)}
                            </div>
                        </div>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#0f0f0f',
                            borderRadius: '4px'
                        }}>
                            <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>
                                Units Per Year
                            </div>
                            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#FFD700' }}>
                                {currentNeeds.unitsPerYear.toFixed(0)}
                            </div>
                        </div>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#0f0f0f',
                            borderRadius: '4px'
                        }}>
                            <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>
                                People Fed Increase
                            </div>
                            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#50C878' }}>
                                +{currentNeeds.peopleFedIncrease.toFixed(1)}
                            </div>
                        </div>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#0f0f0f',
                            borderRadius: '4px'
                        }}>
                            <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>
                                Net People Fed
                            </div>
                            <div style={{
                                fontSize: '1.3rem',
                                fontWeight: '700',
                                color: currentNeeds.netPeopleFed > 0 ? '#50C878' : '#ff6b6b'
                            }}>
                                {currentNeeds.netPeopleFed > 0 ? '+' : ''}{currentNeeds.netPeopleFed.toFixed(1)}
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={() => onFertilizerUpdate(selectedFarmIndex, selectedFertilizerId, targetFertility)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#FFD700',
                            color: '#000',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFED4E'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                    >
                        ✓ Apply to Farm #{selectedFarmIndex + 1}
                    </button>
                </div>
            )}

            {/* Expandable Sections */}
            {/* How It Works */}
            <ExpandableSection
                title="How Fertilizer Works"
                icon={infoIcon}
                isExpanded={expandedSections.howItWorks}
                onToggle={() => toggleSection('howItWorks')}
            >
                <div style={{ fontSize: '0.85rem', color: '#ddd', lineHeight: '1.6' }}>
                    <p><strong>Fertility System:</strong></p>
                    <ul style={{ marginLeft: '1.5rem', color: '#aaa' }}>
                        <li>Each crop consumes fertility when growing</li>
                        <li>Natural fertility regenerates slowly over time</li>
                        <li>Without fertilizer, fertility reaches a natural equilibrium</li>
                        <li>Fertilizer boosts fertility above natural levels</li>
                    </ul>
                    <p><strong>Yield Formula:</strong></p>
                    <div style={{
                        padding: '0.75rem',
                        backgroundColor: '#0f0f0f',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        color: '#50C878'
                    }}>
                        Crop Yield = Base Yield × (Current Fertility / 100) × (1 + Research Bonuses)
                    </div>
                    <p style={{ marginTop: '1rem' }}><strong>Worker Cost:</strong></p>
                    <p style={{ color: '#aaa' }}>
                        Fertilizer production requires workers. The calculator accounts for the entire
                        production chain (mining, smelting, chemical production) to give accurate
                        worker-month costs. Net people fed subtracts these workers from the yield increase.
                    </p>
                </div>
            </ExpandableSection>

            {/* Calculation Breakdown */}
            <ExpandableSection
                title="Detailed Calculations"
                icon={calculatorIcon}
                isExpanded={expandedSections.calculations}
                onToggle={() => toggleSection('calculations')}
            >
                {currentNeeds ? (
                    <div style={{ fontSize: '0.8rem', color: '#ddd', lineHeight: '1.8' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#FFD700' }}>Step 1: Fertility Gap</strong>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                marginTop: '0.5rem',
                                fontFamily: 'monospace'
                            }}>
                                Gap = Target - Natural = {targetFertility}% - {naturalEquilibrium.toFixed(1)}% = {currentNeeds.fertilityGap.toFixed(1)}%
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#FFD700' }}>Step 2: Units Needed</strong>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                marginTop: '0.5rem',
                                fontFamily: 'monospace'
                            }}>
                                Units = Gap / Fertility Per Unit = {currentNeeds.fertilityGap.toFixed(1)}% / {currentNeeds.fertilizer.fertilityPerUnit}% = {currentNeeds.unitsNeeded} units/month
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#FFD700' }}>Step 3: Yield Increase</strong>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                marginTop: '0.5rem',
                                fontFamily: 'monospace'
                            }}>
                                Multiplier = {currentNeeds.actualFertility.toFixed(1)}% / {naturalEquilibrium.toFixed(1)}% = {(currentNeeds.actualFertility / naturalEquilibrium).toFixed(2)}x
                                <br />
                                Increase = ({(currentNeeds.actualFertility / naturalEquilibrium).toFixed(2)}x - 1) × {currentFarm.peopleFed.toFixed(1)} = +{currentNeeds.peopleFedIncrease.toFixed(1)} people
                            </div>
                        </div>

                        <div>
                            <strong style={{ color: '#FFD700' }}>Step 4: Net Benefit</strong>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                marginTop: '0.5rem',
                                fontFamily: 'monospace'
                            }}>
                                Worker Cost = {currentNeeds.workerMonthsPerYear.toFixed(1)} worker-months/year = {(currentNeeds.workerMonthsPerYear / 12).toFixed(1)} workers
                                <br />
                                Net = +{currentNeeds.peopleFedIncrease.toFixed(1)} - {(currentNeeds.workerMonthsPerYear / 12).toFixed(1)} = {currentNeeds.netPeopleFed > 0 ? '+' : ''}{currentNeeds.netPeopleFed.toFixed(1)} people
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ color: '#888', fontStyle: 'italic' }}>
                        Configure fertilizer settings above to see detailed calculations.
                    </div>
                )}
            </ExpandableSection>

            {/* Comparison Table */}
            <ExpandableSection
                title="Compare All Options"
                icon={compareIcon}
                isExpanded={expandedSections.comparison}
                onToggle={() => toggleSection('comparison')}
            >
                <ComparisonTable
                    availableFertilizers={availableFertilizers}
                    naturalEquilibrium={naturalEquilibrium}
                    currentFarm={currentFarm}
                    targetFertility={targetFertility}
                    calculateFertilizerNeeds={calculateFertilizerNeeds}
                />
            </ExpandableSection>

            {/* Global Summary */}
            {globalSummary.farmsUsingFertilizer > 0 && (
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 215, 0, 0.3)'
                }}>
                    <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#FFD700',
                        marginBottom: '1rem',
                        textTransform: 'uppercase'
                    }}>
                        🌍 Total Fertilizer Usage ({globalSummary.farmsUsingFertilizer} farms)
                    </div>

                    {Object.entries(globalSummary.totalFertilizerUsed).map(([fertId, amount]) => {
                        const fert = availableFertilizers.find(f => f.id === fertId);
                        return (
                            <div key={fertId} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '4px',
                                marginBottom: '0.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {fert?.icon && (
                                        <img src={fert.icon} alt={fert.name} style={{ width: '20px', height: '20px' }} />
                                    )}
                                    <span style={{ color: '#ddd', fontWeight: '600' }}>{fert?.name}</span>
                                </div>
                                <span style={{ color: '#FFD700', fontWeight: '700' }}>
                                    {amount.toFixed(0)} units/year
                                </span>
                            </div>
                        );
                    })}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.5rem',
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255, 215, 0, 0.2)'
                    }}>
                        <div>
                            <div style={{ fontSize: '0.7rem', color: '#888' }}>Total People Fed Increase</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#50C878' }}>
                                +{globalSummary.totalPeopleFedIncrease.toFixed(1)}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', color: '#888' }}>Total Worker Cost/Year</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ff8c42' }}>
                                {globalSummary.totalWorkerMonths.toFixed(0)} worker-months
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper component for expandable sections
const ExpandableSection = ({ title, icon, isExpanded, onToggle, children }) => (
    <div style={{
        marginBottom: '1rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '6px',
        border: '1px solid #333',
        overflow: 'hidden'
    }}>
        <button
            onClick={onToggle}
            style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {icon && (
                    <img src={icon} alt="" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                )}
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#ddd' }}>
                    {title}
                </span>
            </div>
            <span style={{ fontSize: '1.2rem', color: '#888', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                ▶
            </span>
        </button>
        {isExpanded && (
            <div style={{ padding: '1rem', borderTop: '1px solid #333' }}>
                {children}
            </div>
        )}
    </div>
);

// Comparison table component
const ComparisonTable = ({ availableFertilizers, naturalEquilibrium, currentFarm, targetFertility, calculateFertilizerNeeds }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#0f0f0f' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#888', fontWeight: '600' }}>Fertilizer</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: '#888', fontWeight: '600' }}>Units/Mo</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: '#888', fontWeight: '600' }}>+People</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: '#888', fontWeight: '600' }}>Workers/Yr</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: '#888', fontWeight: '600' }}>Net</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: '#888', fontWeight: '600' }}>Efficiency</th>
                </tr>
            </thead>
            <tbody>
                {availableFertilizers.map(fert => {
                    const needs = calculateFertilizerNeeds(fert.id, targetFertility);
                    if (!needs) return null;

                    return (
                        <tr key={fert.id} style={{ borderBottom: '1px solid #222' }}>
                            <td style={{ padding: '0.75rem', color: '#ddd', fontWeight: '600' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {fert.icon && (
                                        <img src={fert.icon} alt={fert.name} style={{ width: '16px', height: '16px' }} />
                                    )}
                                    {fert.name}
                                </div>
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right', color: '#FFD700' }}>
                                {needs.unitsPerMonth.toFixed(1)}
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right', color: '#50C878' }}>
                                +{needs.peopleFedIncrease.toFixed(1)}
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right', color: '#ff8c42' }}>
                                {needs.workerMonthsPerYear.toFixed(1)}
                            </td>
                            <td style={{
                                padding: '0.75rem',
                                textAlign: 'right',
                                color: needs.netPeopleFed > 0 ? '#50C878' : '#ff6b6b',
                                fontWeight: '700'
                            }}>
                                {needs.netPeopleFed > 0 ? '+' : ''}{needs.netPeopleFed.toFixed(1)}
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right', color: '#4a90e2' }}>
                                {needs.efficiency.toFixed(2)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);

export default FertilizerPlanningPanel;