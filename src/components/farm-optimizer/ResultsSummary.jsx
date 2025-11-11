// src/components/farm-optimizer/ResultsSummary.jsx
import { useState } from 'react';
import { getGeneralIcon, getProductIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';
import { RainwaterEstimator } from '../../utils/RainwaterEstimator';
import RainwaterEstimatorModal from './RainwaterEstimatorModal';
import ToggleSwitch from '../common/ToggleSwitch';

const ResultsSummary = ({ results, research, simulationData }) => {
    // Rainwater collection state
    const [rainwaterEnabled, setRainwaterEnabled] = useState(false);
    const [rainwaterSettings, setRainwaterSettings] = useState({
        difficulty: 'Normal',
        year: 1
    });
    const [showRainwaterModal, setShowRainwaterModal] = useState(false);

    // Get actual farm count from results
    const actualFarmCount = results.farms.length;

    // Calculate rainwater estimate using ACTUAL farm count
    const rainwaterEstimate = rainwaterEnabled
        ? RainwaterEstimator.estimateMonthlyRainwater(
            rainwaterSettings.difficulty,
            rainwaterSettings.year,
            actualFarmCount,
            research.rainYield
        )
        : null;

    // Calculate adjusted water values
    const originalFarmWaterPerDay = results.totals.farmWaterPerDay;
    const originalProcessingWaterPerDay = results.totals.processingWaterPerDay;
    const originalTotalWaterPerDay = results.totals.waterPerDay;

    const dailyRainwaterCredit = rainwaterEstimate ? rainwaterEstimate.totalPerMonth / 30 : 0;
    const adjustedFarmWaterPerDay = rainwaterEnabled
        ? Math.max(0, originalFarmWaterPerDay - dailyRainwaterCredit)
        : originalFarmWaterPerDay;
    const adjustedTotalWaterPerDay = adjustedFarmWaterPerDay + originalProcessingWaterPerDay;
    const waterSavingsPercent = originalFarmWaterPerDay > 0
        ? ((originalFarmWaterPerDay - adjustedFarmWaterPerDay) / originalFarmWaterPerDay) * 100
        : 0;

    const handleRainwaterModalApply = (estimate) => {
        setRainwaterSettings({
            difficulty: estimate.difficulty,
            year: estimate.year
        });
        setShowRainwaterModal(false);
    };

    // Icons
    const peopleIcon = getGeneralIcon('People');
    const waterIcon = getGeneralIcon('Water');
    const foodIcon = getGeneralIcon('Food');
    const unityIcon = getGeneralIcon('Unity');
    const machineIcon = getGeneralIcon('Machine');
    const electricityIcon = getGeneralIcon('Electricity');
    const workersIcon = getGeneralIcon('Workers');
    const rainIcon = getGeneralIcon('Rain');
    const settingsIcon = getGeneralIcon('Settings');
    const fertilizerIcon = getGeneralIcon('Fertilizer');
    const healthIcon = getGeneralIcon('Health');
    const infoIcon = getGeneralIcon('Info');

    // Check if fertilizer is being used
    const fertilizerData = results.totals.fertilizer;
    const isFertilizerActive = fertilizerData && fertilizerData.farmsUsingFertilizer > 0;

    return (
        <>
            <div style={{
                backgroundColor: '#2a2a2a',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid #444',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                position: 'sticky',
                top: '20px'
            }}>
                <h3 style={{
                    marginBottom: '1.5rem',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#50C878'
                }}>
                    Results Summary
                </h3>

                {/* People Fed - with comprehensive breakdown */}
                <div style={{
                    backgroundColor: '#1a1a1a',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid #333'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '0.5rem'
                    }}>
                        {peopleIcon && (
                            <img src={peopleIcon} alt="People" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        )}
                        <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: '600' }}>People Fed</span>
                    </div>

                    {/* ✅ Display target met OR actual capacity if under target */}
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#50C878', marginBottom: '0.25rem' }}>
                        {simulationData && simulationData.maxCapacity
                            ? (simulationData.targetSimulation.wasFullyFed
                                ? simulationData.targetPopulation.toFixed(0)  // Show target if met
                                : simulationData.targetSimulation.totalPeopleFed.toFixed(0)) // Show actual if under
                            : results.totals.peopleFed.toFixed(0)
                        }
                    </div>

                    {/* ✅ Show max capacity if there's excess */}
                    {simulationData && simulationData.hasExcessCapacity && (
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#50C878',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <span>✓ Max Capacity:</span>
                            <span style={{ fontSize: '0.9rem' }}>{simulationData.maxCapacity.toFixed(0)}</span>
                            <span style={{
                                fontSize: '0.65rem',
                                color: '#888',
                                backgroundColor: 'rgba(80, 200, 120, 0.15)',
                                padding: '2px 4px',
                                borderRadius: '3px'
                            }}>
                                +{simulationData.excessCapacity.toFixed(0)} extra
                            </span>
                        </div>
                    )}

                    {/* ✅ Expandable Capacity Analysis */}
                    {simulationData && simulationData.targetSimulation && (
                        <details style={{ marginTop: '0.75rem' }}>
                            <summary style={{
                                fontSize: '0.75rem',
                                color: '#4a90e2',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                border: '1px solid rgba(74, 144, 226, 0.3)',
                                userSelect: 'none',
                                listStyle: 'none'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f0f0f'}
                            >
                                <span style={{ fontSize: '1rem' }}>▼</span>
                                <span style={{ fontWeight: '600' }}>Feeding Simulation Details</span>
                                <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#666', fontStyle: 'italic' }}>
                                    (Advanced)
                                </span>
                            </summary>

                            <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#ccc' }}>
                                {/* ✅ Explanation Header */}
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#0f0f0f',
                                    borderRadius: '6px',
                                    marginBottom: '1rem',
                                    border: '1px solid rgba(74, 144, 226, 0.3)'
                                }}>
                                    <div style={{ fontWeight: '600', color: '#4a90e2', marginBottom: '0.5rem' }}>
                                        How Settlement Feeding Works:
                                    </div>
                                    <div style={{ color: '#888', lineHeight: '1.6' }}>
                                        The game splits your population evenly across all food categories with available food.
                                        If a category runs out, remaining population redistributes to other categories.
                                        This continues in rounds until everyone is fed or all food is exhausted.
                                    </div>
                                </div>

                                {/* ✅ Target vs Actual Summary */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        padding: '0.75rem',
                                        backgroundColor: '#0f0f0f',
                                        borderRadius: '6px',
                                        border: '1px solid #555'
                                    }}>
                                        <div style={{ color: '#888', marginBottom: '0.25rem', fontSize: '0.7rem' }}>
                                            Target Population:
                                        </div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#4a90e2' }}>
                                            {simulationData.targetPopulation.toLocaleString()}
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '0.75rem',
                                        backgroundColor: '#0f0f0f',
                                        borderRadius: '6px',
                                        border: simulationData.targetSimulation.wasFullyFed
                                            ? '1px solid #50C878'
                                            : '1px solid #ff6b6b'
                                    }}>
                                        <div style={{ color: '#888', marginBottom: '0.25rem', fontSize: '0.7rem' }}>
                                            Actually Fed:
                                        </div>
                                        <div style={{
                                            fontSize: '1.2rem',
                                            fontWeight: '700',
                                            color: simulationData.targetSimulation.wasFullyFed ? '#50C878' : '#ff6b6b',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            {peopleIcon && (
                                                <img src={peopleIcon} alt="People" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                            )}
                                            {simulationData.targetSimulation.totalPeopleFed.toFixed(0)}
                                            {simulationData.targetSimulation.wasFullyFed && (
                                                <span style={{ fontSize: '0.6em' }}>✓</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ✅ Show surplus if overproducing */}
                                {simulationData.hasExcessCapacity && (
                                    <div style={{
                                        padding: '0.75rem',
                                        backgroundColor: 'rgba(80, 200, 120, 0.1)',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(80, 200, 120, 0.3)',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ fontWeight: '600', color: '#50C878', marginBottom: '0.5rem' }}>
                                            ✓ Surplus Capacity Detected
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#50C878', marginBottom: '0.5rem' }}>
                                            {simulationData.maxCapacity.toLocaleString()} people
                                        </div>
                                        <div style={{ color: '#888', fontSize: '0.7rem' }}>
                                            Your farms can feed <span style={{ color: '#50C878', fontWeight: '600' }}>
                                                {simulationData.excessCapacity.toFixed(0)} more people
                                            </span> beyond your target. This provides a safety buffer for population growth.
                                        </div>
                                    </div>
                                )}

                                {/* ✅ Health Categories */}
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(243, 156, 18, 0.3)',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: '#f39c12', fontWeight: '600' }}>Health Categories Satisfied:</span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f39c12' }}>
                                            {simulationData.targetSimulation.healthCategoriesSatisfaction.toFixed(2)}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: '#888', marginTop: '0.25rem' }}>
                                        Based on first-round balanced feeding (higher = better health bonuses)
                                    </div>
                                </div>

                                {/* ✅ NESTED: Round-by-Round Feeding Details */}
                                <details style={{ marginBottom: '1rem' }}>
                                    <summary style={{
                                        fontSize: '0.75rem',
                                        color: '#ddd',
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                        backgroundColor: '#0f0f0f',
                                        borderRadius: '4px',
                                        border: '1px solid #333',
                                        fontWeight: '600',
                                        listStyle: 'none',
                                        userSelect: 'none'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f0f0f'}
                                    >
                                        <span style={{ fontSize: '0.9rem', marginRight: '6px' }}>▶</span>
                                        Round-by-Round Feeding Breakdown ({simulationData.targetSimulation.rounds.length} rounds)
                                    </summary>

                                    <div style={{ marginTop: '0.75rem' }}>
                                        {simulationData.targetSimulation.rounds.map((round, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    padding: '0.75rem',
                                                    backgroundColor: '#0f0f0f',
                                                    borderRadius: '6px',
                                                    border: '1px solid #333',
                                                    marginBottom: '0.5rem'
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '0.5rem',
                                                    paddingBottom: '0.5rem',
                                                    borderBottom: '1px solid #222'
                                                }}>
                                                    <span style={{ fontWeight: '600', color: '#4a90e2' }}>
                                                        Round {round.roundNumber}
                                                        {round.roundNumber === 1 && (
                                                            <span style={{
                                                                marginLeft: '6px',
                                                                fontSize: '0.65rem',
                                                                color: '#f39c12',
                                                                backgroundColor: 'rgba(243, 156, 18, 0.15)',
                                                                padding: '2px 4px',
                                                                borderRadius: '3px'
                                                            }}>
                                                                Health Counted
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span style={{ color: '#888' }}>
                                                        {round.categoriesWithFood} categor{round.categoriesWithFood !== 1 ? 'ies' : 'y'} active
                                                    </span>
                                                </div>

                                                <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>
                                                    Trying to feed <span style={{ color: '#ddd', fontWeight: '600' }}>
                                                        {round.popsToFeedAtStart.toFixed(0)}
                                                    </span> people →
                                                    <span style={{ color: '#ddd', fontWeight: '600' }}> {round.targetPerCategory.toFixed(0)}</span> per category
                                                </div>

                                                {/* Category feedings in this round */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                                    {round.categoryFeedings.map((feeding, catIdx) => {
                                                        const category = ProductionCalculator.foodCategories?.find(c => c.id === feeding.categoryId);
                                                        const categoryName = category?.name || feeding.categoryId;

                                                        return (
                                                            <div
                                                                key={catIdx}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    padding: '0.35rem 0.5rem',
                                                                    backgroundColor: feeding.ranOut ? 'rgba(255, 107, 107, 0.1)' : '#1a1a1a',
                                                                    borderRadius: '4px',
                                                                    border: feeding.ranOut ? '1px solid rgba(255, 107, 107, 0.3)' : '1px solid #222'
                                                                }}
                                                            >
                                                                <span style={{ color: '#aaa' }}>
                                                                    {categoryName}
                                                                    {feeding.ranOut && (
                                                                        <span style={{
                                                                            marginLeft: '6px',
                                                                            fontSize: '0.65rem',
                                                                            color: '#ff6b6b',
                                                                            fontWeight: '600'
                                                                        }}>
                                                                            EXHAUSTED
                                                                        </span>
                                                                    )}
                                                                </span>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                    <span style={{ color: '#50C878', fontWeight: '600' }}>
                                                                        +{feeding.actuallyFed.toFixed(0)}
                                                                    </span>
                                                                    <span style={{ color: '#555', fontSize: '0.65rem' }}>
                                                                        ({feeding.remaining.toFixed(0)} left)
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div style={{
                                                    marginTop: '0.5rem',
                                                    paddingTop: '0.5rem',
                                                    borderTop: '1px solid #222',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontSize: '0.7rem'
                                                }}>
                                                    <span style={{ color: '#888' }}>Fed this round:</span>
                                                    <span style={{ color: '#50C878', fontWeight: '700' }}>
                                                        {round.totalFedThisRound.toFixed(0)} people
                                                    </span>
                                                </div>
                                                {round.remainingAfterRound > 0 && (
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '0.7rem',
                                                        marginTop: '0.25rem'
                                                    }}>
                                                        <span style={{ color: '#888' }}>Still need feeding:</span>
                                                        <span style={{ color: '#ff8c42', fontWeight: '600' }}>
                                                            {round.remainingAfterRound.toFixed(0)} people
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </details>

                                {/* ✅ Final Category Totals */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: '600', color: '#ddd', marginBottom: '0.5rem' }}>
                                        Final Category Contributions:
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                        {Object.entries(simulationData.targetSimulation.finalCategoryTotals).map(([catId, fed]) => {
                                            const category = ProductionCalculator.foodCategories?.find(c => c.id === catId);
                                            const categoryName = category?.name || catId;
                                            const isExhausted = simulationData.targetSimulation.categoriesExhausted.includes(catId);

                                            return (
                                                <div
                                                    key={catId}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '0.5rem',
                                                        backgroundColor: '#0f0f0f',
                                                        borderRadius: '4px',
                                                        border: isExhausted ? '1px solid rgba(255, 107, 107, 0.3)' : '1px solid #333'
                                                    }}
                                                >
                                                    <span style={{ color: '#aaa' }}>
                                                        {categoryName}
                                                        {isExhausted && (
                                                            <span style={{
                                                                marginLeft: '6px',
                                                                fontSize: '0.65rem',
                                                                color: '#ff6b6b',
                                                                fontWeight: '600'
                                                            }}>
                                                                (All Used)
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span style={{ color: '#50C878', fontWeight: '700', fontSize: '0.9rem' }}>
                                                        {fed.toFixed(0)} people
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* ✅ NESTED: Maximum Capacity Test Details (only if surplus exists) */}
                                {simulationData.hasExcessCapacity && (
                                    <details>
                                        <summary style={{
                                            fontSize: '0.75rem',
                                            color: '#50C878',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            backgroundColor: 'rgba(80, 200, 120, 0.1)',
                                            borderRadius: '4px',
                                            border: '1px solid rgba(80, 200, 120, 0.3)',
                                            fontWeight: '600',
                                            listStyle: 'none',
                                            userSelect: 'none'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(80, 200, 120, 0.15)'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(80, 200, 120, 0.1)'}
                                        >
                                            <span style={{ fontSize: '0.9rem', marginRight: '6px' }}>▶</span>
                                            Maximum Capacity Analysis (True Limit: {simulationData.maxCapacity} people)
                                        </summary>

                                        <div style={{ marginTop: '0.75rem' }}>
                                            {/* Remaining Food Per Category at Max Capacity */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <div style={{ fontWeight: '600', color: '#ddd', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                                                    Remaining Food After Feeding {simulationData.maxCapacity} People:
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                                    {Object.entries(simulationData.maxSimulation.remainingCapacity).map(([catId, remaining]) => {
                                                        const category = ProductionCalculator.foodCategories?.find(c => c.id === catId);
                                                        const categoryName = category?.name || catId;
                                                        const isExhausted = remaining === 0;

                                                        return (
                                                            <div
                                                                key={catId}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    padding: '0.5rem',
                                                                    backgroundColor: '#0f0f0f',
                                                                    borderRadius: '4px',
                                                                    border: isExhausted ? '1px solid rgba(255, 107, 107, 0.3)' : '1px solid #333'
                                                                }}
                                                            >
                                                                <span style={{ color: '#aaa', fontSize: '0.75rem' }}>
                                                                    {categoryName}
                                                                    {isExhausted && (
                                                                        <span style={{
                                                                            marginLeft: '6px',
                                                                            fontSize: '0.65rem',
                                                                            color: '#ff6b6b',
                                                                            fontWeight: '600'
                                                                        }}>
                                                                            (Fully Used)
                                                                        </span>
                                                                    )}
                                                                </span>
                                                                <span style={{
                                                                    color: isExhausted ? '#ff6b6b' : '#888',
                                                                    fontWeight: '600',
                                                                    fontSize: '0.8rem'
                                                                }}>
                                                                    {remaining.toFixed(0)} people worth
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* How We Found Maximum */}
                                            <div style={{
                                                padding: '0.75rem',
                                                backgroundColor: '#0f0f0f',
                                                borderRadius: '6px',
                                                border: '1px solid #333',
                                                fontSize: '0.7rem',
                                                color: '#888'
                                            }}>
                                                <div style={{ fontWeight: '600', color: '#ddd', marginBottom: '0.5rem' }}>
                                                    How We Found This:
                                                </div>
                                                <div style={{ lineHeight: '1.6' }}>
                                                    After meeting your target of {simulationData.targetPopulation.toLocaleString()} people,
                                                    we incrementally tested higher populations using the exact game feeding algorithm
                                                    until food ran out. Maximum capacity: <span style={{ color: '#50C878', fontWeight: '600' }}>
                                                        {simulationData.maxCapacity.toLocaleString()} people
                                                    </span>.
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                )}
                            </div>
                        </details>
                    )}
                </div>

                {/* Water Usage Section */}
                <div style={{
                    backgroundColor: '#1a1a1a',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid #333'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '0.75rem'
                    }}>
                        {waterIcon && (
                            <img src={waterIcon} alt="Water" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        )}
                        <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: '600' }}>Water Usage</span>
                    </div>

                    {/* Original Water Requirements */}
                    <div style={{
                        padding: '0.75rem',
                        backgroundColor: '#0f0f0f',
                        borderRadius: '6px',
                        marginBottom: '0.75rem',
                        border: rainwaterEnabled ? '1px solid #555' : '1px solid #333'
                    }}>
                        <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                            {rainwaterEnabled ? 'Original Requirements:' : 'Total Required:'}
                        </div>
                        <div style={{
                            fontSize: rainwaterEnabled ? '1.25rem' : '1.75rem',
                            fontWeight: '700',
                            color: rainwaterEnabled ? '#888' : '#4a90e2',
                            marginBottom: '0.5rem',
                            textDecoration: rainwaterEnabled ? 'line-through' : 'none',
                            opacity: rainwaterEnabled ? 0.6 : 1
                        }}>
                            {originalTotalWaterPerDay.toFixed(1)} <span style={{ fontSize: '0.8em', fontWeight: '400' }}>/ day</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            fontSize: '0.75rem',
                            color: '#666'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Farm Water:</span>
                                <span style={{ color: '#888' }}>{originalFarmWaterPerDay.toFixed(1)}/day</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Processing Water:</span>
                                <span style={{ color: '#888' }}>{originalProcessingWaterPerDay.toFixed(1)}/day</span>
                            </div>
                        </div>
                    </div>

                    {/* Rainwater Collection Toggle */}
                    <div style={{
                        padding: '0.75rem',
                        backgroundColor: rainwaterEnabled ? 'rgba(74, 144, 226, 0.08)' : '#0f0f0f',
                        borderRadius: '6px',
                        border: rainwaterEnabled ? '1px solid rgba(74, 144, 226, 0.3)' : '1px solid #333',
                        marginBottom: rainwaterEnabled ? '0.75rem' : 0,
                        transition: 'all 0.3s'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: rainwaterEnabled ? '0.75rem' : 0
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {rainIcon && (
                                    <img
                                        src={rainIcon}
                                        alt="Rain"
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            objectFit: 'contain',
                                            opacity: rainwaterEnabled ? 1 : 0.5
                                        }}
                                    />
                                )}
                                <span style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: rainwaterEnabled ? '#4a90e2' : '#888'
                                }}>
                                    Rainwater Collection
                                </span>
                            </div>
                            <ToggleSwitch
                                value={rainwaterEnabled}
                                onChange={() => setRainwaterEnabled(!rainwaterEnabled)}
                                size="sm"
                                showIcons={false}
                                onColor="#4a90e2"
                            />
                        </div>

                        {rainwaterEnabled && rainwaterEstimate && (
                            <>
                                {/* Rainwater Credit Display */}
                                <div style={{
                                    padding: '0.65rem',
                                    backgroundColor: 'rgba(74, 144, 226, 0.12)',
                                    borderRadius: '4px',
                                    marginBottom: '0.65rem',
                                    border: '1px solid rgba(74, 144, 226, 0.25)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '0.35rem'
                                    }}>
                                        <span style={{ fontSize: '0.75rem', color: '#aaa' }}>Daily Credit:</span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#4a90e2' }}>
                                            -{dailyRainwaterCredit.toFixed(1)}
                                        </span>
                                    </div>
                                    <div style={{
                                        fontSize: '0.65rem',
                                        color: '#666',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <span>{rainwaterEstimate.difficulty} • Year {rainwaterEstimate.year}</span>
                                        <span>{actualFarmCount} farm{actualFarmCount !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div style={{
                                        fontSize: '0.65rem',
                                        color: '#555',
                                        marginTop: '0.25rem',
                                        fontStyle: 'italic'
                                    }}>
                                        Monthly: -{rainwaterEstimate.totalPerMonth.toFixed(0)}
                                    </div>
                                </div>

                                {/* Configure Button */}
                                <button
                                    onClick={() => setShowRainwaterModal(true)}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        backgroundColor: '#4a90e2',
                                        border: 'none',
                                        borderRadius: '4px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5aa0f2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                                >
                                    {settingsIcon && (
                                        <img src={settingsIcon} alt="Configure" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                                    )}
                                    Adjust Settings
                                </button>
                            </>
                        )}

                        {!rainwaterEnabled && (
                            <div style={{
                                fontSize: '0.7rem',
                                color: '#555',
                                fontStyle: 'italic',
                                marginTop: '0.5rem'
                            }}>
                                Enable to apply rainwater collection credits
                            </div>
                        )}
                    </div>

                    {/* Adjusted Total (shown when rainwater is enabled) */}
                    {rainwaterEnabled && rainwaterEstimate && (
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'rgba(80, 200, 120, 0.08)',
                            borderRadius: '6px',
                            border: '1px solid rgba(80, 200, 120, 0.3)'
                        }}>
                            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                                Adjusted Total:
                            </div>
                            <div style={{
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: '#50C878',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                {adjustedTotalWaterPerDay.toFixed(1)}
                                <span style={{ fontSize: '0.8em', fontWeight: '400' }}>/ day</span>
                                {waterSavingsPercent > 0 && (
                                    <span style={{
                                        fontSize: '0.6em',
                                        fontWeight: '600',
                                        color: '#50C878',
                                        backgroundColor: 'rgba(80, 200, 120, 0.15)',
                                        padding: '2px 6px',
                                        borderRadius: '3px'
                                    }}>
                                        ⬇️ {waterSavingsPercent.toFixed(0)}%
                                    </span>
                                )}
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem',
                                fontSize: '0.75rem',
                                color: '#666'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Farm Water:</span>
                                    <span style={{ color: '#50C878', fontWeight: '600' }}>
                                        {adjustedFarmWaterPerDay.toFixed(1)}/day
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Processing Water:</span>
                                    <span style={{ color: '#888' }}>{originalProcessingWaterPerDay.toFixed(1)}/day</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Food Diversity (with Health & Unity nested inside) */}
                <div style={{
                    backgroundColor: '#1a1a1a',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid #333'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '0.5rem'
                    }}>
                        {foodIcon && (
                            <img src={foodIcon} alt="Food" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        )}
                        <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: '600' }}>Food Diversity</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f39c12', marginBottom: '0.75rem' }}>
                        {results.totals.foodCategories.count} Categories
                    </div>

                    {/* Health & Unity Grid (nested inside Food Diversity) */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: '#0f0f0f',
                        borderRadius: '6px'
                    }}>
                        {/* Health Bonuses */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                marginBottom: '0.35rem'
                            }}>
                                {healthIcon && (
                                    <img src={healthIcon} alt="Health" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                                )}
                                <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: '600' }}>Health</span>
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f39c12' }}>
                                {results.totals.foodCategories.healthBonuses}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#666' }}>
                                Bonus{results.totals.foodCategories.healthBonuses !== 1 ? 'es' : ''}
                            </div>
                        </div>

                        {/* Unity Production */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                marginBottom: '0.35rem'
                            }}>
                                {unityIcon && (
                                    <img src={unityIcon} alt="Unity" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                                )}
                                <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: '600' }}>Unity</span>
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#e74c3c' }}>
                                {results.totals.foodCategories.totalUnity.toFixed(1)}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#666' }}>
                                per month
                            </div>
                        </div>
                    </div>

                    {/* Food Categories Breakdown */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {results.totals.foodCategories.categories.map(cat => (
                            <div
                                key={cat.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '0.7rem',
                                    padding: '0.35rem 0.5rem',
                                    backgroundColor: '#0f0f0f',
                                    borderRadius: '4px'
                                }}
                            >
                                <span style={{ color: '#aaa' }}>
                                    {cat.name}
                                    {cat.hasHealthBenefit && (
                                        <span style={{ color: '#50C878', marginLeft: '4px' }}>★</span>
                                    )}
                                </span>
                                <span style={{ color: '#888', fontWeight: '600' }}>
                                    {cat.peopleFed.toFixed(0)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Processing Requirements */}
                {results.totals.processingMachines.length > 0 && (
                    <div style={{
                        backgroundColor: '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        border: '1px solid #333'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '0.75rem'
                        }}>
                            {machineIcon && (
                                <img src={machineIcon} alt="Machines" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                            )}
                            <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: '600' }}>Processing</span>
                        </div>

                        {/* Electricity & Workers Summary */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.5rem',
                            marginBottom: '0.75rem'
                        }}>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '0.25rem' }}>
                                    {electricityIcon && (
                                        <img src={electricityIcon} alt="Electricity" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                                    )}
                                    <span style={{ fontSize: '0.7rem', color: '#888' }}>Power</span>
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#f1c40f' }}>
                                    {results.totals.processingElectricity.toFixed(0)} kW
                                </div>
                            </div>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '0.25rem' }}>
                                    {workersIcon && (
                                        <img src={workersIcon} alt="Workers" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                                    )}
                                    <span style={{ fontSize: '0.7rem', color: '#888' }}>Workers</span>
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#3498db' }}>
                                    {results.totals.processingWorkers.toFixed(0)}
                                </div>
                            </div>
                        </div>

                        {/* Machine Breakdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {results.totals.processingMachines.map(machine => (
                                <div
                                    key={machine.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontSize: '0.7rem',
                                        padding: '0.35rem 0.5rem',
                                        backgroundColor: '#0f0f0f',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <span style={{ color: '#aaa' }}>{machine.name}</span>
                                    <span style={{ color: '#888', fontWeight: '600' }}>
                                        ×{machine.count.toFixed(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Fertilizer Usage Summary */}
                {isFertilizerActive && (
                    <div style={{
                        backgroundColor: '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '2px solid #FFD700'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '0.75rem'
                        }}>
                            {fertilizerIcon && (
                                <img src={fertilizerIcon} alt="Fertilizer" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                            )}
                            <span style={{ fontSize: '0.85rem', color: '#FFD700', fontWeight: '600' }}>Fertilizer Usage</span>
                            <span style={{
                                marginLeft: 'auto',
                                fontSize: '0.7rem',
                                color: '#FFD700',
                                backgroundColor: 'rgba(255, 215, 0, 0.15)',
                                padding: '2px 6px',
                                borderRadius: '3px',
                                fontWeight: '600'
                            }}>
                                {fertilizerData.farmsUsingFertilizer} / {actualFarmCount} farms
                            </span>
                        </div>

                        {/* Fertilizer Types */}
                        {fertilizerData.byType && fertilizerData.byType.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                {fertilizerData.byType.map(fert => {
                                    const product = ProductionCalculator.getProduct(fert.id);
                                    const icon = getProductIcon(product);
                                    return (
                                        <div
                                            key={fert.id}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '0.5rem',
                                                backgroundColor: '#0f0f0f',
                                                borderRadius: '4px',
                                                border: '1px solid rgba(255, 215, 0, 0.2)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                {icon && (
                                                    <img src={icon} alt={fert.name} style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                                )}
                                                <span style={{ fontSize: '0.8rem', color: '#ddd', fontWeight: '600' }}>
                                                    {fert.name}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <span style={{ fontSize: '0.85rem', color: '#FFD700', fontWeight: '700' }}>
                                                    {fert.unitsPerYear.toFixed(0)}
                                                </span>
                                                <span style={{ fontSize: '0.65rem', color: '#888' }}>
                                                    units/year
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Impact Summary */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '0.5rem',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid rgba(255, 215, 0, 0.2)'
                        }}>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.65rem', color: '#888', marginBottom: '0.25rem' }}>
                                    Yield +
                                </div>
                                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#50C878' }}>
                                    +{fertilizerData.totalPeopleFedIncrease.toFixed(1)}
                                </div>
                            </div>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.65rem', color: '#888', marginBottom: '0.25rem' }}>
                                    Workers
                                </div>
                                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ff8c42' }}>
                                    -{(fertilizerData.totalWorkerMonths / 12).toFixed(1)}
                                </div>
                            </div>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.65rem', color: '#888', marginBottom: '0.25rem' }}>
                                    Net
                                </div>
                                <div style={{
                                    fontSize: '0.95rem',
                                    fontWeight: '700',
                                    color: (fertilizerData.totalPeopleFedIncrease - (fertilizerData.totalWorkerMonths / 12)) > 0 ? '#50C878' : '#ff6b6b'
                                }}>
                                    {(fertilizerData.totalPeopleFedIncrease - (fertilizerData.totalWorkerMonths / 12)) > 0 ? '+' : ''}
                                    {(fertilizerData.totalPeopleFedIncrease - (fertilizerData.totalWorkerMonths / 12)).toFixed(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Rainwater Estimator Modal */}
            <RainwaterEstimatorModal
                isOpen={showRainwaterModal}
                onClose={() => setShowRainwaterModal(false)}
                onApply={handleRainwaterModalApply}
                initialSettings={{
                    ...rainwaterSettings,
                    farmCount: actualFarmCount
                }}
                research={research}
            />
        </>
    );
};

export default ResultsSummary;