// src/components/farm-optimizer/RainwaterEstimatorModal.jsx
import { useState, useEffect } from 'react';
import { RainwaterEstimator } from '../../utils/RainwaterEstimator';

const RainwaterEstimatorModal = ({ isOpen, onClose, onApply, initialSettings, research }) => {
    const [difficulty, setDifficulty] = useState(initialSettings?.difficulty || 'Normal');
    const [year, setYear] = useState(initialSettings?.year || 1);
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Farm count is READ-ONLY from the calculation results
    const farmCount = initialSettings?.farmCount || 1;

    // Update local state when initialSettings change
    useEffect(() => {
        if (initialSettings) {
            setDifficulty(initialSettings.difficulty);
            setYear(initialSettings.year);
        }
    }, [initialSettings]);

    if (!isOpen) return null;

    const difficulties = RainwaterEstimator.getDifficulties();

    const estimate = RainwaterEstimator.estimateMonthlyRainwater(
        difficulty,
        year,
        farmCount, // Use the read-only farm count
        research.rainYield || 0
    );

    const handleApply = () => {
        onApply(estimate);
    };

    const handleYearChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= 99) {
            setYear(value);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '20px'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: '#2a2a2a',
                    borderRadius: '12px',
                    maxWidth: '650px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                    border: '1px solid #444'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '2px solid #4a90e2',
                    backgroundColor: '#1a1a1a'
                }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#4a90e2'
                    }}>
                        ☔ Rainwater Collection Calculator
                    </h3>
                    <p style={{
                        margin: '0.5rem 0 0 0',
                        fontSize: '0.85rem',
                        color: '#aaa'
                    }}>
                        Estimate rainwater collection for your {farmCount} farm{farmCount !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                    {/* Farm Count Display (Read-only) */}
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        border: '1px solid #444',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#4a90e2',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#fff'
                            }}>
                                🏭
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: '#888',
                                    marginBottom: '0.25rem'
                                }}>
                                    Farms in Calculation
                                </div>
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    color: '#4a90e2'
                                }}>
                                    {farmCount} Farm{farmCount !== 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>
                        <div style={{
                            padding: '0.5rem 0.75rem',
                            backgroundColor: 'rgba(74, 144, 226, 0.15)',
                            borderRadius: '4px',
                            border: '1px solid rgba(74, 144, 226, 0.3)',
                            fontSize: '0.7rem',
                            color: '#4a90e2',
                            fontWeight: '600'
                        }}>
                            FROM RESULTS
                        </div>
                    </div>

                    {/* Difficulty Setting */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#ddd'
                        }}>
                            Weather Difficulty
                        </label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '0.5rem'
                        }}>
                            {difficulties.map(diff => (
                                <button
                                    key={diff}
                                    onClick={() => setDifficulty(diff)}
                                    style={{
                                        padding: '0.75rem',
                                        backgroundColor: difficulty === diff ? '#4a90e2' : '#1a1a1a',
                                        border: difficulty === diff ? '2px solid #5aa0f2' : '1px solid #444',
                                        borderRadius: '6px',
                                        color: difficulty === diff ? '#fff' : '#aaa',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        transition: 'all 0.2s',
                                        textTransform: 'uppercase'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (difficulty !== diff) {
                                            e.currentTarget.style.backgroundColor = '#222';
                                            e.currentTarget.style.borderColor = '#555';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (difficulty !== diff) {
                                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                                            e.currentTarget.style.borderColor = '#444';
                                        }
                                    }}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>
                        <div style={{
                            marginTop: '0.5rem',
                            fontSize: '0.75rem',
                            color: '#666',
                            fontStyle: 'italic'
                        }}>
                            {RainwaterEstimator.getDifficultyDescription(difficulty)}
                        </div>
                    </div>

                    {/* Year Setting */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#ddd'
                        }}>
                            Game Year
                        </label>

                        {/* Quick Select Buttons */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: '0.5rem',
                            marginBottom: '0.75rem'
                        }}>
                            {[1, 5, 10, 20, 50].map(y => (
                                <button
                                    key={y}
                                    onClick={() => setYear(y)}
                                    style={{
                                        padding: '0.5rem',
                                        backgroundColor: year === y ? '#4a90e2' : '#1a1a1a',
                                        border: year === y ? '2px solid #5aa0f2' : '1px solid #444',
                                        borderRadius: '4px',
                                        color: year === y ? '#fff' : '#aaa',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (year !== y) {
                                            e.currentTarget.style.backgroundColor = '#222';
                                            e.currentTarget.style.borderColor = '#555';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (year !== y) {
                                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                                            e.currentTarget.style.borderColor = '#444';
                                        }
                                    }}
                                >
                                    Year {y}
                                </button>
                            ))}
                        </div>

                        {/* Custom Year Input */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <label style={{
                                fontSize: '0.8rem',
                                color: '#888',
                                whiteSpace: 'nowrap'
                            }}>
                                Custom:
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="99"
                                value={year}
                                onChange={handleYearChange}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #444',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                            />
                            <div style={{
                                padding: '0.5rem 0.75rem',
                                backgroundColor: '#0f0f0f',
                                border: '1px solid #333',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                color: '#666'
                            }}>
                                (1-99)
                            </div>
                        </div>

                        <div style={{
                            marginTop: '0.5rem',
                            fontSize: '0.75rem',
                            color: '#666',
                            fontStyle: 'italic'
                        }}>
                            Rain decreases over time • Year 1 has most rain • After year 50, rain stabilizes
                        </div>
                    </div>

                    {/* Research Bonus Info (Read-only) */}
                    {research.rainYield > 0 && (
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'rgba(80, 200, 120, 0.1)',
                            borderRadius: '6px',
                            border: '1px solid rgba(80, 200, 120, 0.3)',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                fontSize: '0.8rem',
                                color: '#50C878',
                                fontWeight: '600',
                                marginBottom: '0.25rem'
                            }}>
                                ✓ Research Bonus Active
                            </div>
                            <div style={{
                                fontSize: '0.7rem',
                                color: '#aaa'
                            }}>
                                Rain Yield Multiplier: <strong style={{ color: '#50C878' }}>+{research.rainYield}%</strong>
                                <span style={{ color: '#666' }}> (from Global Settings)</span>
                            </div>
                        </div>
                    )}

                    {/* Estimate Display */}
                    <div style={{
                        padding: '1.25rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        border: '2px solid #4a90e2',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            fontSize: '0.85rem',
                            color: '#888',
                            marginBottom: '0.75rem',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontWeight: '600',
                            letterSpacing: '1px'
                        }}>
                            Total Water Collection
                        </div>

                        {/* Monthly Total */}
                        <div style={{
                            textAlign: 'center',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                color: '#4a90e2',
                                marginBottom: '0.25rem'
                            }}>
                                {estimate.totalPerMonth.toFixed(0)}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                color: '#aaa',
                                fontWeight: '600'
                            }}>
                                water per month
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                padding: '0.75rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '0.25rem' }}>
                                    PER DAY
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#50C878' }}>
                                    {(estimate.totalPerMonth / 30).toFixed(1)}
                                </div>
                            </div>
                            <div style={{
                                padding: '0.75rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '0.25rem' }}>
                                    PER FARM
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f39c12' }}>
                                    {estimate.perFarmPerMonth.toFixed(1)}
                                </div>
                            </div>
                            <div style={{
                                padding: '0.75rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '0.25rem' }}>
                                    PER YEAR
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#9b59b6' }}>
                                    {(estimate.totalPerMonth * 12).toFixed(0)}
                                </div>
                            </div>
                        </div>

                        {/* Base vs Research Breakdown */}
                        {research.rainYield > 0 && (
                            <div style={{
                                paddingTop: '0.75rem',
                                borderTop: '1px solid #333',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0.5rem'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem' }}>
                                        Base Collection
                                    </div>
                                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#aaa' }}>
                                        {estimate.baseRainwater.toFixed(0)}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem' }}>
                                        Research Bonus
                                    </div>
                                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#50C878' }}>
                                        +{(estimate.totalPerMonth - estimate.baseRainwater).toFixed(0)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Advanced Details Toggle */}
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #444',
                            borderRadius: '6px',
                            color: '#aaa',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: showAdvanced ? '1rem' : '1.5rem',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#222';
                            e.currentTarget.style.borderColor = '#555';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                            e.currentTarget.style.borderColor = '#444';
                        }}
                    >
                        {showAdvanced ? '▼' : '▶'} Weather Details & Breakdown
                    </button>

                    {/* Advanced Details Panel */}
                    {showAdvanced && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: 'rgba(74, 144, 226, 0.05)',
                            borderRadius: '6px',
                            border: '1px solid rgba(74, 144, 226, 0.2)',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: '#4a90e2',
                                marginBottom: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Weather Composition for Year {year}
                            </div>

                            {/* Rain Stats */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0.5rem',
                                marginBottom: '0.75rem'
                            }}>
                                <div style={{
                                    padding: '0.5rem',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '4px'
                                }}>
                                    <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '0.25rem' }}>
                                        Rain Intensity (Year {year})
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4a90e2' }}>
                                        {estimate.baseRainPercent}%
                                    </div>
                                </div>
                                <div style={{
                                    padding: '0.5rem',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '4px'
                                }}>
                                    <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '0.25rem' }}>
                                        Avg Daily Intensity
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#50C878' }}>
                                        {estimate.weatherComposition.avgDailyRainIntensity}
                                    </div>
                                </div>
                            </div>

                            {/* Fortnight Breakdown */}
                            <div style={{
                                padding: '0.75rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px',
                                marginBottom: '0.75rem'
                            }}>
                                <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>
                                    Weather Distribution (24 fortnights/year):
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                        <span style={{ color: '#aaa' }}>💧 Heavy Rain (100%):</span>
                                        <span style={{ color: '#4a90e2', fontWeight: '600' }}>
                                            {estimate.weatherComposition.heavyRainFortnights} fortnights
                                            <span style={{ color: '#666' }}> ({estimate.weatherComposition.heavyRainDays} days)</span>
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                        <span style={{ color: '#aaa' }}>🌧️ Medium Rain (50%):</span>
                                        <span style={{ color: '#50C878', fontWeight: '600' }}>
                                            {estimate.weatherComposition.mediumRainFortnights} fortnights
                                            <span style={{ color: '#666' }}> ({estimate.weatherComposition.mediumRainDays} days)</span>
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', paddingTop: '0.35rem', borderTop: '1px solid #222' }}>
                                        <span style={{ color: '#aaa' }}>Total Rainy Days:</span>
                                        <span style={{ color: '#f39c12', fontWeight: '600' }}>
                                            {estimate.weatherComposition.totalRainyDays} / 360 days
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Per-Farm Breakdown */}
                            <div style={{
                                padding: '0.75rem',
                                backgroundColor: '#0f0f0f',
                                borderRadius: '4px'
                            }}>
                                <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>
                                    Per-Farm Collection Rate:
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                        <span style={{ color: '#aaa' }}>Base (6.0 water at 100% rain):</span>
                                        <span style={{ color: '#4a90e2', fontWeight: '600' }}>
                                            {estimate.perFarmPerDay.toFixed(2)} water/day
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                        <span style={{ color: '#aaa' }}>Per month (30 days):</span>
                                        <span style={{ color: '#50C878', fontWeight: '600' }}>
                                            {estimate.perFarmPerMonth.toFixed(1)} water/month
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Info Box */}
                    <div style={{
                        padding: '1rem',
                        backgroundColor: 'rgba(74, 144, 226, 0.08)',
                        borderRadius: '6px',
                        border: '1px solid rgba(74, 144, 226, 0.3)',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#aaa',
                            lineHeight: '1.6'
                        }}>
                            <strong style={{ color: '#4a90e2' }}>ℹ️ How it works:</strong>
                            <br />
                            Each farm collects 6.0 water per day during 100% rainfall. The game's weather system
                            generates different rain intensities (50% Medium Rain, 100% Heavy Rain) distributed
                            across 24 fortnights per year. Rain intensity decreases over time based on difficulty.
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem'
                    }}>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '0.85rem',
                                backgroundColor: '#1a1a1a',
                                border: '1px solid #444',
                                borderRadius: '6px',
                                color: '#aaa',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#222';
                                e.currentTarget.style.borderColor = '#555';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#1a1a1a';
                                e.currentTarget.style.borderColor = '#444';
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApply}
                            style={{
                                flex: 2,
                                padding: '0.85rem',
                                backgroundColor: '#4a90e2',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#5aa0f2';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#4a90e2';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            ✓ Apply Water Credit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RainwaterEstimatorModal;