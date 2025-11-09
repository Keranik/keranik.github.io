// src/components/farm-optimizer/FertilityBreakdownPanel.jsx
import { useState } from 'react';
import { FarmOptimizer } from '../../utils/FarmOptimizer';
import ProductionCalculator from '../../utils/ProductionCalculator';

const FertilityBreakdownPanel = ({
    farmResult,
    effectiveFarm,
    rotation,
    research,
    onFertilityChange
}) => {
    const [localFertility, setLocalFertility] = useState(farmResult.actualFertility);

    const handleFertilityChange = (newFertility) => {
        setLocalFertility(newFertility);
        onFertilityChange(farmResult.farm.id, newFertility);
    };

    // Determine color based on fertility
    const getFertilityColor = (fertility) => {
        if (fertility >= 100) return '#50C878';  // Green
        if (fertility >= 80) return '#FFD700';   // Yellow
        if (fertility >= 60) return '#FFA500';   // Orange
        return '#ff6b6b';                         // Red
    };

    const fertilityColor = getFertilityColor(localFertility);

    // Calculate yield impact for each crop
    const yieldImpacts = rotation.map(cropId => {
        if (!cropId) return null;

        const crop = ProductionCalculator.crops.find(c => c.id === cropId);
        if (!crop) return null;

        const baseYield = FarmOptimizer.calculateCropYield(crop, effectiveFarm, 100);
        const actualYield = FarmOptimizer.calculateCropYield(crop, effectiveFarm, localFertility);
        const delta = actualYield - baseYield;
        const deltaPercent = baseYield > 0 ? (delta / baseYield) * 100 : 0;

        return {
            cropId,
            cropName: crop.name,
            baseYield,
            actualYield,
            delta,
            deltaPercent
        };
    }).filter(impact => impact !== null);

    return (
        <div style={{
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '6px',
            border: `2px solid ${fertilityColor}`,
            marginTop: '1rem'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
            }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: fertilityColor }}>
                    🌾 Live Fertility Analysis
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: fertilityColor }}>
                    {localFertility.toFixed(1)}%
                </div>
            </div>

            {/* Interactive Fertility Slider */}
            <div style={{ marginBottom: '0.75rem' }}>
                <input
                    type="range"
                    min="0"
                    max="140"
                    step="5"
                    value={localFertility}
                    onChange={(e) => handleFertilityChange(parseFloat(e.target.value))}
                    style={{
                        width: '100%',
                        accentColor: fertilityColor
                    }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    color: '#666',
                    marginTop: '0.25rem'
                }}>
                    <span>0%</span>
                    <span style={{ color: '#FFD700' }}>
                        Natural: {farmResult.fertilityInfo.naturalEquilibrium.toFixed(1)}%
                    </span>
                    <span>140%</span>
                </div>
            </div>

            {/* Yield Breakdown per Crop */}
            {yieldImpacts.length > 0 && (
                <div style={{ fontSize: '0.75rem', color: '#ddd' }}>
                    <div style={{
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '1px solid #333',
                        color: '#aaa'
                    }}>
                        Yield Impact:
                    </div>
                    {yieldImpacts.map((impact, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0.5rem',
                            backgroundColor: idx % 2 === 0 ? '#2a2a2a' : 'transparent',
                            borderRadius: '4px',
                            marginBottom: '2px'
                        }}>
                            <span style={{ fontWeight: '600' }}>{impact.cropName}</span>
                            <span style={{
                                display: 'flex',
                                gap: '0.75rem',
                                alignItems: 'center'
                            }}>
                                <span style={{ color: '#888', fontSize: '0.7rem' }}>
                                    Base: {impact.baseYield.toFixed(0)}
                                </span>
                                <span style={{ color: '#666' }}>→</span>
                                <span style={{
                                    color: fertilityColor,
                                    fontWeight: '600'
                                }}>
                                    {impact.actualYield.toFixed(0)}
                                </span>
                                <span style={{
                                    color: impact.delta >= 0 ? '#50C878' : '#ff6b6b',
                                    fontSize: '0.7rem',
                                    fontWeight: '600',
                                    minWidth: '60px',
                                    textAlign: 'right'
                                }}>
                                    ({impact.delta >= 0 ? '+' : ''}{impact.deltaPercent.toFixed(1)}%)
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Explanation */}
            <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                backgroundColor: localFertility < 100
                    ? 'rgba(255, 107, 107, 0.1)'
                    : localFertility > 100
                        ? 'rgba(80, 200, 120, 0.1)'
                        : 'rgba(255, 215, 0, 0.1)',
                borderRadius: '4px',
                fontSize: '0.75rem',
                color: fertilityColor,
                border: `1px solid ${fertilityColor}`
            }}>
                {localFertility < 100 ? (
                    <>
                        ⚠️ <strong>Low fertility</strong> reducing yields by {(100 - localFertility).toFixed(0)}%.
                        Add fertilizer to increase production.
                    </>
                ) : localFertility > 100 ? (
                    <>
                        ✨ <strong>High fertility</strong> boosting yields by {(localFertility - 100).toFixed(0)}%!
                        Excellent efficiency!
                    </>
                ) : (
                    <>
                        ✓ <strong>Optimal fertility</strong>. Crops producing at 100% potential.
                    </>
                )}
            </div>

            {/* Additional Stats */}
            <div style={{
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #333',
                fontSize: '0.7rem',
                color: '#888',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total yield multiplier:</span>
                    <span style={{ fontWeight: '600', color: '#ddd' }}>
                        ×{(localFertility / 100).toFixed(3)}
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Research bonus applied:</span>
                    <span style={{ fontWeight: '600', color: '#4a90e2' }}>
                        +{research.cropYield}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FertilityBreakdownPanel;