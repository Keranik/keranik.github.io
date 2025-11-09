// src/components/farm-optimizer/OptimizationModeSelector.jsx
import { getGeneralIcon } from '../../utils/AssetHelper';
import ToggleSwitch from '../common/ToggleSwitch';

const OPTIMIZATION_GOALS = [
    { value: 'minWater', label: 'Min Water', icon: 'Water' },
    { value: 'minFertility', label: 'Min Fertility', icon: 'Fertility' },
    { value: 'maxVariety', label: 'Max Variety', icon: 'Food' },
    { value: 'minWorkers', label: 'Min Workers', icon: 'Worker' },
    { value: 'balanced', label: 'Balanced', icon: 'Balance' }

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
                        border: optimizationMode === 'manual' ? '2px solid #4a90e2' : '1px solid #333',
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
                            e.currentTarget.style.borderColor = '#333';
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
                        border: optimizationMode === 'optimize' ? '2px solid #4a90e2' : '1px solid #333',
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
                            e.currentTarget.style.borderColor = '#333';
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

                    {/* Target Population - Compact constraint style (like calculator's max workers) */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1rem'
                        }}>
                            {/* Target Population Constraint Box */}
                            <div style={{
                                backgroundColor: targetPopulationEnabled ? 'rgba(80, 200, 120, 0.05)' : '#1a1a1a',
                                padding: '1rem',
                                borderRadius: '6px',
                                border: targetPopulationEnabled ? '1px solid rgba(80, 200, 120, 0.3)' : '1px solid #444',
                                transition: 'all 0.3s',
                                maxWidth: '50%',
                                boxShadow: targetPopulationEnabled ? '0 0 8px rgba(80, 200, 120, 0.15)' : 'none'
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
                                            color: targetPopulationEnabled ? '#50C878' : '#888',
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
                                        onColor="#50C878"
                                    />
                                </div>

                                {/* Slider - only visible when enabled */}
                                <div style={{
                                    opacity: targetPopulationEnabled ? 1 : 0.4,
                                    transition: 'opacity 0.3s'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        marginBottom: '0.75rem'
                                    }}>
                                        <input
                                            type="range"
                                            min="100"
                                            max="10000"
                                            step="100"
                                            value={targetPopulation}
                                            onChange={(e) => onTargetPopulationChange(parseInt(e.target.value))}
                                            disabled={!targetPopulationEnabled}
                                            style={{
                                                flex: 1,
                                                height: '6px',
                                                backgroundColor: targetPopulationEnabled ? 'rgba(80, 200, 120, 0.2)' : '#333',
                                                borderRadius: '3px',
                                                outline: 'none',
                                                appearance: 'none',
                                                cursor: targetPopulationEnabled ? 'pointer' : 'not-allowed',
                                                transition: 'background-color 0.3s'
                                            }}
                                        />
                                        <span style={{
                                            color: targetPopulationEnabled ? '#50C878' : '#666',
                                            fontWeight: '700',
                                            minWidth: '80px',
                                            textAlign: 'right',
                                            fontSize: '0.95rem',
                                            transition: 'color 0.3s'
                                        }}>
                                            {targetPopulationEnabled ? targetPopulation : '—'}
                                        </span>
                                    </div>

                                    {/* Number input */}
                                    <input
                                        type="number"
                                        min="100"
                                        max="10000"
                                        step="100"
                                        value={targetPopulationEnabled ? targetPopulation : ''}
                                        onChange={(e) => onTargetPopulationChange(parseInt(e.target.value) || 1000)}
                                        placeholder={targetPopulationEnabled ? '1000' : 'Disabled'}
                                        disabled={!targetPopulationEnabled}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            padding: '8px 10px',
                                            backgroundColor: targetPopulationEnabled ? '#333' : '#2a2a2a',
                                            color: targetPopulationEnabled ? 'white' : '#666',
                                            border: targetPopulationEnabled ? '2px solid rgba(80, 200, 120, 0.3)' : '2px solid #444',
                                            borderRadius: '6px',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s',
                                            cursor: targetPopulationEnabled ? 'text' : 'not-allowed'
                                        }}
                                        onFocus={(e) => {
                                            if (targetPopulationEnabled) {
                                                e.target.style.borderColor = '#50C878';
                                                e.target.style.backgroundColor = '#3a3a3a';
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (targetPopulationEnabled) {
                                                e.target.style.borderColor = 'rgba(80, 200, 120, 0.3)';
                                                e.target.style.backgroundColor = '#333';
                                            }
                                        }}
                                    />
                                </div>

                                {/* Active indicator */}
                                {targetPopulationEnabled && (
                                    <div style={{
                                        marginTop: '8px',
                                        fontSize: '0.75rem',
                                        color: '#50C878',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        <span style={{
                                            width: '6px',
                                            height: '6px',
                                            backgroundColor: '#50C878',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            boxShadow: '0 0 6px rgba(80, 200, 120, 0.6)'
                                        }}></span>
                                        Active Constraint
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OptimizationModeSelector;