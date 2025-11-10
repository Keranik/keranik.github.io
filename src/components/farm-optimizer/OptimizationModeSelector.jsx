// src/components/farm-optimizer/OptimizationModeSelector.jsx - COMPLETE UPDATED VERSION (BLUE THEME)
import { getGeneralIcon } from '../../utils/AssetHelper';
import { useState } from 'react';
import ToggleSwitch from '../common/ToggleSwitch';

const OPTIMIZATION_GOALS = [
    { value: 'minWater', label: 'Least Water', icon: 'Water' },
    { value: 'minFertility', label: 'Least Fertilizer', icon: 'Fertility' },
    { value: 'maxVariety', label: 'Most Bonuses', icon: 'Health' },
    { value: 'minWorkers', label: 'Least Workers', icon: 'Worker' },
    { value: 'balanced', label: 'Auto-Balance', icon: 'Balance' }
];

const OptimizationModeSelector = ({
    optimizationMode,
    optimizationGoal,
    targetPopulation,
    targetPopulationEnabled = true,
    onModeChange,
    onGoalChange,
    onTargetPopulationChange,
    onTargetPopulationToggle
}) => {
    const populationIcon = getGeneralIcon('Population');
    const [isEditingPopulation, setIsEditingPopulation] = useState(false);
    const [isHoveringPopulation, setIsHoveringPopulation] = useState(false);

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            {/* Mode Toggle */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                <button
                    onClick={() => onModeChange('manual')}
                    style={{
                        padding: '1rem',
                        backgroundColor: optimizationMode === 'manual' ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
                        border: optimizationMode === 'manual' ? '2px solid #4a90e2' : '1px solid #00000055',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        color: optimizationMode === 'manual' ? '#4a90e2' : '#ddd',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (optimizationMode !== 'manual') {
                            e.currentTarget.style.backgroundColor = '#252525';
                            e.currentTarget.style.borderColor = '#555';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (optimizationMode !== 'manual') {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = '#00000055';
                        }
                    }}
                >
                    Manual Configuration
                </button>
                <button
                    onClick={() => onModeChange('optimize')}
                    style={{
                        padding: '1rem',
                        backgroundColor: optimizationMode === 'optimize' ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
                        border: optimizationMode === 'optimize' ? '2px solid #4a90e2' : '1px solid #00000055',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        color: optimizationMode === 'optimize' ? '#4a90e2' : '#ddd',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (optimizationMode !== 'optimize') {
                            e.currentTarget.style.backgroundColor = '#252525';
                            e.currentTarget.style.borderColor = '#555';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (optimizationMode !== 'optimize') {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = '#00000055';
                        }
                    }}
                >
                    Automatic Optimization
                </button>
            </div>

            {/* Optimization Settings (only in optimize mode) */}
            {optimizationMode === 'optimize' && (
                <>
                    {/* Optimization Goal - Calculator style with large icons */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            color: '#ccc',
                            fontWeight: '600',
                            fontSize: '0.95rem'
                        }}>
                            Optimization Goal
                        </label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '1rem'
                        }}>
                            {OPTIMIZATION_GOALS.map(goal => {
                                const isSelected = goal.value === optimizationGoal;
                                const goalIcon = getGeneralIcon(goal.icon);
                                return (
                                    <div
                                        key={goal.value}
                                        onClick={() => onGoalChange(goal.value)}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.1)' : '#1a1a1a',
                                            border: isSelected ? '2px solid #4a90e2' : '1px solid #333',
                                            borderRadius: '8px',
                                            padding: '14px 10px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textAlign: 'center',
                                            minHeight: '100px'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.backgroundColor = '#252525';
                                                e.currentTarget.style.borderColor = '#555';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.backgroundColor = '#1a1a1a';
                                                e.currentTarget.style.borderColor = '#333';
                                            }
                                        }}
                                    >
                                        {goalIcon && (
                                            <img
                                                src={goalIcon}
                                                alt={goal.label}
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    objectFit: 'contain',
                                                    marginBottom: '8px',
                                                    opacity: isSelected ? 1 : 0.7
                                                }}
                                            />
                                        )}
                                        <span style={{
                                            color: isSelected ? '#4a90e2' : '#ddd',
                                            fontWeight: isSelected ? '700' : '600',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.3'
                                        }}>
                                            {goal.label}
                                        </span>
                                        {isSelected && (
                                            <div style={{
                                                marginTop: '6px',
                                                padding: '2px 6px',
                                                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                                borderRadius: '4px',
                                                fontSize: '0.7rem',
                                                color: '#4a90e2',
                                                fontWeight: '700',
                                                border: '1px solid rgba(74, 144, 226, 0.4)'
                                            }}>
                                                ✓ SELECTED
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Target Population Constraint Box - BLUE THEME */}
                    <div style={{
                        backgroundColor: targetPopulationEnabled ? 'rgba(74, 144, 226, 0.05)' : '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '6px',
                        border: targetPopulationEnabled ? '1px solid rgba(74, 144, 226, 0.3)' : '1px solid #444',
                        transition: 'all 0.3s',
                        maxWidth: '500px',
                        boxShadow: targetPopulationEnabled ? '0 0 8px rgba(74, 144, 226, 0.15)' : 'none'
                    }}>
                        {/* Header with On/Off toggle */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {populationIcon && (
                                    <img
                                        src={populationIcon}
                                        alt="Population"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            objectFit: 'contain',
                                            marginRight: '8px',
                                            opacity: targetPopulationEnabled ? 1 : 0.5
                                        }}
                                    />
                                )}
                                <label style={{
                                    color: targetPopulationEnabled ? '#4a90e2' : '#888',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    margin: 0,
                                    transition: 'color 0.3s'
                                }}>
                                    Target Population
                                </label>
                            </div>
                            <ToggleSwitch
                                value={targetPopulationEnabled}
                                onChange={() => onTargetPopulationToggle(!targetPopulationEnabled)}
                                size="sm"
                                showIcons={false}
                                onColor="#4a90e2"
                            />
                        </div>

                        {/* Slider and Value Display */}
                        <div style={{
                            opacity: targetPopulationEnabled ? 1 : 0.4,
                            transition: 'opacity 0.3s',
                            pointerEvents: targetPopulationEnabled ? 'auto' : 'none'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '0.5rem'
                            }}>
                                {/* Slider */}
                                <input
                                    type="range"
                                    min="80"
                                    max="1000000"
                                    step="20"
                                    value={targetPopulation}
                                    onChange={(e) => onTargetPopulationChange(parseInt(e.target.value))}
                                    disabled={!targetPopulationEnabled}
                                    style={{
                                        flex: 1,
                                        height: '6px',
                                        backgroundColor: targetPopulationEnabled ? 'rgba(74, 144, 226, 0.2)' : '#333',
                                        borderRadius: '3px',
                                        outline: 'none',
                                        WebkitAppearance: 'none',
                                        cursor: targetPopulationEnabled ? 'pointer' : 'not-allowed',
                                        transition: 'background-color 0.3s',
                                        accentColor: '#4a90e2'
                                    }}
                                />

                                {/* Fixed-width Editable Value Container */}
                                <div style={{
                                    width: '100px',
                                    flexShrink: 0
                                }}>
                                    {isEditingPopulation ? (
                                        <input
                                            type="number"
                                            min="80"
                                            max="1000000"
                                            step="20"
                                            value={targetPopulation}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                if (!isNaN(value)) {
                                                    onTargetPopulationChange(Math.max(80, Math.min(1000000, value)));
                                                }
                                            }}
                                            onBlur={() => setIsEditingPopulation(false)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === 'Escape') {
                                                    e.target.blur();
                                                }
                                            }}
                                            autoFocus
                                            style={{
                                                width: '100%',
                                                height: '32px',
                                                boxSizing: 'border-box',
                                                padding: '0 8px',
                                                backgroundColor: '#3a3a3a',
                                                color: '#4a90e2',
                                                border: '2px solid #4a90e2',
                                                borderRadius: '4px',
                                                fontSize: '0.9rem',
                                                fontWeight: '700',
                                                outline: 'none',
                                                textAlign: 'center',
                                                transition: 'all 0.2s',
                                                MozAppearance: 'textfield'
                                            }}
                                        />
                                    ) : (
                                        <div
                                            onClick={() => {
                                                if (targetPopulationEnabled) {
                                                    setIsEditingPopulation(true);
                                                }
                                            }}
                                            onMouseEnter={() => setIsHoveringPopulation(true)}
                                            onMouseLeave={() => setIsHoveringPopulation(false)}
                                            style={{
                                                width: '100%',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: isHoveringPopulation && targetPopulationEnabled
                                                    ? 'rgba(74, 144, 226, 0.2)'
                                                    : targetPopulationEnabled
                                                        ? 'rgba(74, 144, 226, 0.1)'
                                                        : 'transparent',
                                                border: isHoveringPopulation && targetPopulationEnabled
                                                    ? '2px solid rgba(74, 144, 226, 0.4)'
                                                    : targetPopulationEnabled
                                                        ? '1px solid rgba(74, 144, 226, 0.2)'
                                                        : '1px solid transparent',
                                                borderRadius: '4px',
                                                color: targetPopulationEnabled ? '#4a90e2' : '#666',
                                                fontWeight: '700',
                                                fontSize: '0.9rem',
                                                cursor: targetPopulationEnabled ? 'pointer' : 'default',
                                                transition: 'all 0.2s',
                                                boxShadow: isHoveringPopulation && targetPopulationEnabled
                                                    ? '0 0 8px rgba(74, 144, 226, 0.3)'
                                                    : 'none',
                                                transform: isHoveringPopulation && targetPopulationEnabled
                                                    ? 'scale(1.02)'
                                                    : 'scale(1)',
                                                boxSizing: 'border-box'
                                            }}
                                            title={targetPopulationEnabled ? 'Click to edit' : ''}
                                        >
                                            {targetPopulation.toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Range labels */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.7rem',
                                color: '#666',
                                paddingRight: '116px'
                            }}>
                                <span>80</span>
                                <span>1M</span>
                            </div>
                        </div>

                        {/* Active indicator */}
                        {targetPopulationEnabled && (
                            <div style={{
                                marginTop: '0.75rem',
                                fontSize: '0.75rem',
                                color: '#4a90e2',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <span style={{
                                    width: '6px',
                                    height: '6px',
                                    backgroundColor: '#4a90e2',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    boxShadow: '0 0 6px rgba(74, 144, 226, 0.6)',
                                    animation: 'pulse 2s ease-in-out infinite'
                                }}></span>
                                Active Constraint
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Styles */}
            <style>{`
                /* Hide number input spinners */
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                
                /* Pulse animation for active indicator */
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        box-shadow: 0 0 6px rgba(74, 144, 226, 0.6);
                    }
                    50% {
                        opacity: 0.6;
                        box-shadow: 0 0 12px rgba(74, 144, 226, 0.8);
                    }
                }
                
                /* Custom slider styling - BLUE THEME */
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #4a90e2;
                    cursor: pointer;
                    box-shadow: 0 0 4px rgba(74, 144, 226, 0.5);
                    transition: all 0.2s;
                }
                
                input[type=range]::-webkit-slider-thumb:hover {
                    background: #5aa0f2;
                    box-shadow: 0 0 8px rgba(74, 144, 226, 0.8);
                    transform: scale(1.1);
                }
                
                input[type=range]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #4a90e2;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 0 4px rgba(74, 144, 226, 0.5);
                    transition: all 0.2s;
                }
                
                input[type=range]::-moz-range-thumb:hover {
                    background: #5aa0f2;
                    box-shadow: 0 0 8px rgba(74, 144, 226, 0.8);
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default OptimizationModeSelector;