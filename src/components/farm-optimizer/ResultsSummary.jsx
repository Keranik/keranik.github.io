// src/components/farm-optimizer/ResultsSummary.jsx
import { useState } from 'react';
import { getGeneralIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';
import { RainwaterEstimator } from '../../utils/RainwaterEstimator';
import RainwaterEstimatorModal from './RainwaterEstimatorModal';
import ToggleSwitch from '../common/ToggleSwitch';

const ResultsSummary = ({ results, research }) => {
    // Rainwater collection state (moved from parent component)
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
            actualFarmCount, // Use actual farm count from results
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

                {/* People Fed */}
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
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#50C878' }}>
                        {results.totals.peopleFed.toFixed(0)}
                    </div>
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

                {/* Food Categories */}
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
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f39c12', marginBottom: '0.5rem' }}>
                        {results.totals.foodCategories.count} Categories
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                        {results.totals.foodCategories.healthBonuses} Health Bonus{results.totals.foodCategories.healthBonuses !== 1 ? 'es' : ''}
                    </div>

                    {/* Food Categories Breakdown */}
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
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

                {/* Unity Production */}
                {results.totals.foodCategories.totalUnity > 0 && (
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
                            {unityIcon && (
                                <img src={unityIcon} alt="Unity" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                            )}
                            <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: '600' }}>Unity Production</span>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e74c3c', marginBottom: '0.25rem' }}>
                            {results.totals.foodCategories.totalUnity.toFixed(1)} <span style={{ fontSize: '0.6em', fontWeight: '400' }}>/ month</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#666' }}>
                            From {results.totals.foodCategories.unityBreakdown.length} food source{results.totals.foodCategories.unityBreakdown.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                )}

                {/* Processing Requirements */}
                {results.totals.processingMachines.length > 0 && (
                    <div style={{
                        backgroundColor: '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '8px',
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
            </div>

            {/* Rainwater Estimator Modal */}
            <RainwaterEstimatorModal
                isOpen={showRainwaterModal}
                onClose={() => setShowRainwaterModal(false)}
                onApply={handleRainwaterModalApply}
                initialSettings={{
                    ...rainwaterSettings,
                    farmCount: actualFarmCount // Pass actual farm count to modal for display only
                }}
                research={research}
            />
        </>
    );
};

export default ResultsSummary;