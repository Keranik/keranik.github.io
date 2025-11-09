// src/components/farm-optimizer/RainwaterEstimatorModal.jsx
import { useState } from 'react';
import { RainwaterEstimator } from '../../utils/RainwaterEstimator';
import { getGeneralIcon } from '../../utils/AssetHelper';
import { useSettings } from '../../contexts/SettingsContext';

const RainwaterEstimatorModal = ({ isOpen, onClose, onApply }) => {
    const { settings, getResearchValue } = useSettings();

    const [difficulty, setDifficulty] = useState('Normal');
    const [currentYear, setCurrentYear] = useState(1);
    const [farmCount, setFarmCount] = useState(1);

    // Get rain yield bonus from global research
    const rainYieldBonus = getResearchValue('RainYieldMultiplier') || 0;

    if (!isOpen) return null;

    const estimate = RainwaterEstimator.estimateMonthlyRainwater(
        difficulty,
        currentYear,
        farmCount,
        rainYieldBonus
    );

    const rainIcon = getGeneralIcon('Rain');
    const infoIcon = getGeneralIcon('Info');

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
            zIndex: 2000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                padding: '1.5rem',
                maxWidth: '600px',
                width: '100%',
                border: '2px solid #4a90e2',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                <h3 style={{
                    marginBottom: '1rem',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {rainIcon && <img src={rainIcon} alt="Rain" style={{ width: '24px', height: '24px' }} />}
                    Rainwater Estimator
                </h3>

                <div style={{
                    fontSize: '0.85rem',
                    color: '#aaa',
                    marginBottom: '1.5rem',
                    lineHeight: '1.5'
                }}>
                    Estimate average rainwater collection based on your game difficulty and year.
                    This is based on actual game formulas from <code>DefaultWeatherProvider.cs</code>.
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    {/* Difficulty */}
                    <div>
                        <label style={{
                            fontSize: '0.85rem',
                            color: '#aaa',
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600'
                        }}>
                            Game Difficulty
                        </label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#1a1a1a',
                                color: '#fff',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="Easy">Easy (Most Rain - 450% Year 1)</option>
                            <option value="Normal">Normal (Standard - 400% Year 1)</option>
                            <option value="Hard">Hard (Less Rain - 350% Year 1)</option>
                            <option value="VeryHard">Very Hard / Dry (Minimal - 350% Year 1)</option>
                        </select>
                    </div>

                    {/* Current Year */}
                    <div>
                        <label style={{
                            fontSize: '0.85rem',
                            color: '#aaa',
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600'
                        }}>
                            Current Year
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="50"
                            value={currentYear}
                            onChange={(e) => setCurrentYear(parseInt(e.target.value) || 1)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#1a1a1a',
                                color: '#fff',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                fontSize: '0.9rem'
                            }}
                        />
                        <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem' }}>
                            Rain decreases over time ({estimate.baseRainPercent}% for Year {currentYear})
                        </div>
                    </div>

                    {/* Number of Farms */}
                    <div>
                        <label style={{
                            fontSize: '0.85rem',
                            color: '#aaa',
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600'
                        }}>
                            Number of Farms
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={farmCount}
                            onChange={(e) => setFarmCount(parseInt(e.target.value) || 1)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#1a1a1a',
                                color: '#fff',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>

                    {/* Research Bonus Display */}
                    {rainYieldBonus > 0 && (
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'rgba(74, 144, 226, 0.1)',
                            border: '1px solid #4a90e2',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            color: '#4a90e2'
                        }}>
                            Research Bonus: +{rainYieldBonus}% Rain Yield
                            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                                (from global research settings)
                            </div>
                        </div>
                    )}
                </div>

                {/* Estimate Result */}
                <div style={{
                    padding: '1.25rem',
                    backgroundColor: '#1a4a7a',
                    borderRadius: '6px',
                    marginBottom: '1.5rem',
                    border: '1px solid #4a90e2'
                }}>
                    <div style={{
                        fontSize: '0.85rem',
                        color: '#aaa',
                        marginBottom: '0.5rem',
                        fontWeight: '600'
                    }}>
                        Estimated Rainwater Collection
                    </div>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#50C878',
                        marginBottom: '0.5rem'
                    }}>
                        {estimate.totalPerMonth.toFixed(0)} water/month
                    </div>
                    <div style={{
                        fontSize: '0.75rem',
                        color: '#aaa',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                    }}>
                        <div>{estimate.perFarmPerMonth.toFixed(1)} per farm/month</div>
                        <div>{estimate.perFarmPerDay.toFixed(2)} per farm/day</div>
                        <div>{estimate.totalPerYear.toFixed(0)} total/year</div>
                        {rainYieldBonus > 0 && (
                            <div style={{ color: '#4a90e2', marginTop: '0.25rem' }}>
                                With +{rainYieldBonus}% research: {estimate.adjustedRainPercent.toFixed(1)}% effective rain
                            </div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div style={{
                    fontSize: '0.75rem',
                    color: '#888',
                    marginBottom: '1.5rem',
                    lineHeight: '1.5',
                    padding: '0.75rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '4px',
                    border: '1px solid #333',
                    display: 'flex',
                    gap: '0.5rem'
                }}>
                    {infoIcon && <img src={infoIcon} alt="Info" style={{ width: '14px', height: '14px', marginTop: '2px', flexShrink: 0 }} />}
                    <div>
                        <strong style={{ color: '#FFD700' }}>Note:</strong> This is calculated using the exact formulas from the game code.
                        Actual in-game amounts vary slightly due to random weather generation and seasonal patterns.
                        Base collection rate: {RainwaterEstimator.BASE_WATER_PER_RAINY_DAY} water/day when raining.
                    </div>
                </div>

                {/* Actions */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.25rem',
                            backgroundColor: '#444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#444'}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onApply(estimate);
                            onClose();
                        }}
                        style={{
                            padding: '0.75rem 1.25rem',
                            backgroundColor: '#4a90e2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5aa0f2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                    >
                        Apply Estimate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RainwaterEstimatorModal;