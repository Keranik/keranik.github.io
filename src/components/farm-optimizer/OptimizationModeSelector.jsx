// src/components/farm-optimizer/OptimizationModeSelector.jsx
import { getGeneralIcon } from '../../utils/AssetHelper';

const OptimizationModeSelector = ({
    optimizationMode,
    optimizationGoal,
    targetPopulation,
    onModeChange,
    onGoalChange,
    onTargetPopulationChange
}) => {
    const populationIcon = getGeneralIcon(`Population`); 
    const targetIcon = getGeneralIcon(`Target`);
    const chartIcon = getGeneralIcon(`Chart`);

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            {/* Mode Toggle */}
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1rem',
                padding: '0.5rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '6px'
            }}>
                <button
                    onClick={() => onModeChange('manual')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: optimizationMode === 'manual' ? '#4a90e2' : 'transparent',
                        color: optimizationMode === 'manual' ? '#fff' : '#aaa',
                        border: optimizationMode === 'manual' ? '2px solid #4a90e2' : '2px solid #333',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {getGeneralIcon('AllCategory') && (
                        <img
                            src={getGeneralIcon('AllCategory')}
                            alt="Manual"
                            style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                        />
                    )}
                    Manual Configuration
                </button>

                <button
                    onClick={() => onModeChange('optimize')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: optimizationMode === 'optimize' ? '#4a90e2' : 'transparent',
                        color: optimizationMode === 'optimize' ? '#fff' : '#aaa',
                        border: optimizationMode === 'optimize' ? '2px solid #4a90e2' : '2px solid #333',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {getGeneralIcon('Research') && (
                        <img
                            src={getGeneralIcon('Research')}
                            alt="Optimize"
                            style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                        />
                    )}
                    Automatic Optimization
                </button>
            </div>

            {/* Optimization Settings (only in optimize mode) */}
            {optimizationMode === 'optimize' && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    padding: '1rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '6px',
                    border: '1px solid #333'
                }}>
                    {/* Target Population */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.85rem',
                            color: '#aaa',
                            marginBottom: '0.5rem',
                            fontWeight: '600'
                        }}>
                            🎯 Target Population
                        </label>
                        <input
                            type="number"
                            min="100"
                            step="100"
                            value={targetPopulation}
                            onChange={(e) => onTargetPopulationChange(parseInt(e.target.value) || 1000)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#2a2a2a',
                                color: '#fff',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}
                        />
                        <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem' }}>
                            How many people to feed per month
                        </div>
                    </div>

                    {/* Optimization Goal */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.85rem',
                            color: '#aaa',
                            marginBottom: '0.5rem',
                            fontWeight: '600'
                        }}>
                            📊 Optimization Goal
                        </label>
                        <select
                            value={optimizationGoal}
                            onChange={(e) => onGoalChange(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#2a2a2a',
                                color: '#fff',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="minWater">🌊 Minimize Water Usage</option>
                            <option value="minFertility">🌾 Minimize Fertility Demand</option>
                            <option value="maxVariety">🎨 Maximize Food Variety</option>
                            <option value="balanced">⚖️ Balanced Efficiency</option>
                        </select>
                        <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem' }}>
                            Primary optimization metric
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptimizationModeSelector;