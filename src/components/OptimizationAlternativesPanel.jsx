import React, { useState } from 'react';
import { getGeneralIcon } from '../utils/AssetHelper';

const OptimizationAlternativesPanel = ({
    optimizationResult,
    onSelectAlternative,
    currentSolution = 'best'
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!optimizationResult || !optimizationResult.alternatives || optimizationResult.alternatives.length === 0) {
        return null;
    }

    const totalSolutions = optimizationResult.alternatives.length + 1; // +1 for the best solution

    return (
        <div style={{
            backgroundColor: '#2a4a2a',
            padding: '1rem',
            borderRadius: '8px',
            border: '2px solid rgba(80, 200, 120, 0.3)',
            marginBottom: '1.5rem'
        }}>
            {/* Header with expand/collapse */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {getGeneralIcon('Stats') && (
                        <img
                            src={getGeneralIcon('Stats')}
                            alt="Solutions"
                            style={{
                                width: '20px',
                                height: '20px',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                    <div>
                        <div style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: '#50C878',
                            marginBottom: '2px'
                        }}>
                            {totalSolutions} Solution{totalSolutions > 1 ? 's' : ''} Found
                        </div>
                        <div style={{
                            fontSize: '0.85rem',
                            color: '#888'
                        }}>
                            {isExpanded ? 'Click to collapse' : 'Click to view alternatives'}
                        </div>
                    </div>
                </div>

                <div style={{
                    fontSize: '1.2rem',
                    color: '#50C878',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                }}>
                    ▼
                </div>
            </div>

            {/* Current solution summary (always visible) */}
            {!isExpanded && (
                <div style={{
                    marginTop: '12px',
                    padding: '10px',
                    backgroundColor: 'rgba(80, 200, 120, 0.1)',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: '#50C878'
                }}>
                    <strong>Current:</strong> {optimizationResult.explanation}
                </div>
            )}

            {/* Expanded alternatives list */}
            {isExpanded && (
                <div style={{ marginTop: '16px' }}>
                    {/* Best Solution (current) */}
                    <SolutionCard
                        solution={{
                            score: optimizationResult.score,
                            metrics: optimizationResult.metrics,
                            reason: 'Best solution (currently selected)',
                            recipeOverrides: optimizationResult.recipeOverrides
                        }}
                        index={0}
                        isBest={true}
                        isSelected={currentSolution === 'best'}
                        onSelect={() => onSelectAlternative('best', optimizationResult.recipeOverrides)}
                        optimizationGoal={optimizationResult.goal}
                    />

                    {/* Alternative Solutions */}
                    {optimizationResult.alternatives.map((alt, idx) => (
                        <SolutionCard
                            key={idx}
                            solution={alt}
                            index={idx + 1}
                            isBest={false}
                            isSelected={currentSolution === `alt-${idx}`}
                            onSelect={() => onSelectAlternative(`alt-${idx}`, alt.recipeOverrides)}
                            optimizationGoal={optimizationResult.goal}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const SolutionCard = ({ solution, index, isBest, isSelected, onSelect, optimizationGoal }) => {
    const metrics = solution.metrics;

    return (
        <div
            onClick={onSelect}
            style={{
                marginBottom: '12px',
                padding: '14px',
                backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.15)' : '#1a1a1a',
                border: isSelected ? '2px solid #4a90e2' : '2px solid #333',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
            }}
            onMouseEnter={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.borderColor = '#555';
                    e.currentTarget.style.backgroundColor = '#252525';
                }
            }}
            onMouseLeave={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                }
            }}
        >
            {/* Badge */}
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '4px 10px',
                backgroundColor: isBest ? 'rgba(80, 200, 120, 0.2)' : 'rgba(255, 165, 0, 0.2)',
                color: isBest ? '#50C878' : '#FFA500',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '700',
                border: isBest ? '1px solid rgba(80, 200, 120, 0.4)' : '1px solid rgba(255, 165, 0, 0.4)'
            }}>
                {isBest ? '★ BEST' : `#${index + 1}`}
            </div>

            {/* Title */}
            <div style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: isSelected ? '#4a90e2' : '#fff',
                marginBottom: '8px',
                paddingRight: '80px' // Space for badge
            }}>
                Solution {index + 1}
                {isSelected && (
                    <span style={{
                        marginLeft: '8px',
                        fontSize: '0.8rem',
                        color: '#4a90e2',
                        fontWeight: '600'
                    }}>
                        (Active)
                    </span>
                )}
            </div>

            {/* Metrics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '10px',
                marginBottom: '10px'
            }}>
                <MetricDisplay label="Workers" value={metrics.workers} icon="Worker" />
                <MetricDisplay label="Power" value={`${(metrics.powerKw / 1000).toFixed(1)} MW`} icon="Electricity" />
                <MetricDisplay label="Machines" value={metrics.machines} icon="Machines" />
                {metrics.computingTFlops > 0 && (
                    <MetricDisplay label="Computing" value={`${metrics.computingTFlops.toFixed(1)} TF`} icon="Computing" />
                )}
            </div>

            {/* Score */}
            <div style={{
                padding: '8px',
                backgroundColor: '#0a0a0a',
                borderRadius: '4px',
                marginBottom: '8px'
            }}>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '2px' }}>
                    Score:
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#50C878' }}>
                    {solution.score.toFixed(2)}
                </div>
            </div>

            {/* Reason/Difference */}
            <div style={{
                fontSize: '0.85rem',
                color: '#aaa',
                fontStyle: 'italic'
            }}>
                {solution.reason}
            </div>

            {/* Select button for non-selected items */}
            {!isSelected && (
                <div style={{
                    marginTop: '12px',
                    padding: '8px',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    border: '1px solid rgba(74, 144, 226, 0.3)',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: '#4a90e2',
                    fontWeight: '600'
                }}>
                    Click to switch to this solution
                </div>
            )}
        </div>
    );
};

const MetricDisplay = ({ label, value, icon }) => {
    const iconSrc = getGeneralIcon(icon);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 8px',
            backgroundColor: '#0a0a0a',
            borderRadius: '4px'
        }}>
            {iconSrc && (
                <img
                    src={iconSrc}
                    alt={label}
                    style={{
                        width: '14px',
                        height: '14px',
                        objectFit: 'contain',
                        opacity: 0.8
                    }}
                />
            )}
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>{label}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ddd' }}>{value}</div>
            </div>
        </div>
    );
};

export default OptimizationAlternativesPanel;