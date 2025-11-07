import React, { useState } from 'react';
import { getMachineImage, getProductIcon } from '../utils/AssetHelper';

const ConsolidatedResourcesPanel = ({ consolidatedResources, onClose }) => {
    if (!consolidatedResources || consolidatedResources.size === 0) {
        return null;
    }

    // Filter out raw materials for this display
    const producedResources = Array.from(consolidatedResources.values())
        .filter(r => !r.isRawMaterial && !r.error);

    if (producedResources.length === 0) {
        return null;
    }

    // Separate shared vs single-use resources
    const sharedResources = producedResources.filter(r => r.isShared);
    const singleUseResources = producedResources.filter(r => !r.isShared);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999,
            overflow: 'auto',
            padding: '40px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                border: '2px solid #4a90e2',
                padding: '24px',
                position: 'relative'
            }}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '8px 16px',
                        backgroundColor: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}
                >
                    ✕ Close
                </button>

                <h3 style={{
                    margin: '0 0 16px 0',
                    color: '#4a90e2',
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span>🔗</span>
                    Consolidated Resource Pool - Detailed View
                </h3>

                <div style={{
                    marginBottom: '24px',
                    padding: '16px',
                    backgroundColor: '#252525',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    color: '#ccc',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px'
                }}>
                    <div>
                        <strong style={{ color: '#4a90e2', fontSize: '1.5rem' }}>{sharedResources.length}</strong>
                        <div style={{ color: '#888', fontSize: '0.85rem' }}>Shared Resources</div>
                    </div>
                    <div>
                        <strong style={{ color: '#888', fontSize: '1.5rem' }}>{singleUseResources.length}</strong>
                        <div style={{ color: '#888', fontSize: '0.85rem' }}>Single-Use Resources</div>
                    </div>
                    <div>
                        <strong style={{ color: '#4caf50', fontSize: '1.5rem' }}>
                            {producedResources.reduce((sum, r) => sum + r.machineCount, 0)}
                        </strong>
                        <div style={{ color: '#888', fontSize: '0.85rem' }}>Total Machines</div>
                    </div>
                </div>

                {sharedResources.length > 0 && (
                    <div style={{ marginBottom: '32px' }}>
                        <h4 style={{
                            color: '#4a90e2',
                            fontSize: '1.1rem',
                            marginBottom: '16px',
                            fontWeight: '600',
                            borderBottom: '2px solid #4a90e2',
                            paddingBottom: '8px'
                        }}>
                            🔗 Shared Production Facilities ({sharedResources.length})
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {sharedResources.map((resource, idx) => (
                                <ResourceCard key={idx} resource={resource} isShared={true} />
                            ))}
                        </div>
                    </div>
                )}

                {singleUseResources.length > 0 && (
                    <div>
                        <h4 style={{
                            color: '#888',
                            fontSize: '1.1rem',
                            marginBottom: '16px',
                            fontWeight: '600',
                            borderBottom: '2px solid #555',
                            paddingBottom: '8px'
                        }}>
                            📦 Single-Use Production ({singleUseResources.length})
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {singleUseResources.map((resource, idx) => (
                                <ResourceCard key={idx} resource={resource} isShared={false} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ResourceCard = ({ resource, isShared }) => {
    const [consumersExpanded, setConsumersExpanded] = useState(false);
    const borderColor = isShared ? '#4a90e2' : '#555';

    // Determine if we should show expand/collapse for consumers
    const hasMany = resource.consumers && resource.consumers.length > 5;
    const displayedConsumers = consumersExpanded || !hasMany
        ? resource.consumers
        : resource.consumers.slice(0, 5);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#252525',
            border: `2px solid ${borderColor}`,
            borderRadius: '8px'
        }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                {/* Product Icon */}
                <div style={{ flexShrink: 0 }}>
                    <img
                        src={getProductIcon(resource.product)}
                        alt={resource.product?.name || 'Product'}
                        style={{
                            width: '56px',
                            height: '56px',
                            imageRendering: 'pixelated'
                        }}
                    />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: '1.15rem',
                        fontWeight: '700',
                        color: '#fff',
                        marginBottom: '12px'
                    }}>
                        {resource.product?.name || resource.productId}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px',
                        fontSize: '0.9rem',
                        color: '#ccc',
                        marginBottom: '12px'
                    }}>
                        <div>
                            <span style={{ color: '#888' }}>Machine:</span>{' '}
                            <strong>{resource.machine?.name}</strong>
                        </div>
                        <div>
                            <span style={{ color: '#888' }}>Count:</span>{' '}
                            <strong style={{ color: '#4caf50' }}>{resource.machineCount}</strong>
                        </div>
                        <div>
                            <span style={{ color: '#888' }}>Recipe:</span>{' '}
                            <strong>{resource.recipe?.name || 'N/A'}</strong>
                        </div>
                        <div>
                            <span style={{ color: '#888' }}>Total Demand:</span>{' '}
                            <strong>{resource.totalRate.toFixed(2)}/min</strong>
                        </div>
                        <div>
                            <span style={{ color: '#888' }}>Production:</span>{' '}
                            <strong>{resource.actualRate.toFixed(2)}/min</strong>
                        </div>
                        <div>
                            <span style={{ color: '#888' }}>Utilization:</span>{' '}
                            <strong style={{
                                color: resource.utilizationPercent >= 95 ? '#4caf50' :
                                    resource.utilizationPercent >= 70 ? '#ff9800' : '#f44336'
                            }}>
                                {resource.utilizationPercent.toFixed(1)}%
                            </strong>
                        </div>
                        {resource.surplus > 0 && (
                            <>
                                <div>
                                    <span style={{ color: '#888' }}>Surplus:</span>{' '}
                                    <strong style={{ color: '#ff9800' }}>
                                        +{resource.surplus.toFixed(2)}/min
                                    </strong>
                                </div>
                                <div>
                                    <span style={{ color: '#888' }}>Power:</span>{' '}
                                    <strong>{(resource.machine.electricityKw * resource.machineCount).toFixed(0)} kW</strong>
                                </div>
                                <div>
                                    <span style={{ color: '#888' }}>Workers:</span>{' '}
                                    <strong>{resource.machine.workers * resource.machineCount}</strong>
                                </div>
                            </>
                        )}
                    </div>

                    {isShared && resource.consumers && resource.consumers.length > 0 && (
                        <div style={{
                            marginTop: '16px',
                            paddingTop: '16px',
                            borderTop: '2px solid #333'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#4a90e2',
                                    fontWeight: '600'
                                }}>
                                    Used by {resource.consumers.length} recipe(s):
                                </div>
                                {hasMany && (
                                    <button
                                        onClick={() => setConsumersExpanded(!consumersExpanded)}
                                        style={{
                                            padding: '4px 12px',
                                            backgroundColor: '#333',
                                            color: '#4a90e2',
                                            border: '1px solid #4a90e2',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {consumersExpanded ? '▲ Collapse' : `▼ Show All (${resource.consumers.length})`}
                                    </button>
                                )}
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.85rem',
                                color: '#aaa'
                            }}>
                                {displayedConsumers.map((consumer, idx) => (
                                    <div key={idx} style={{
                                        padding: '6px 8px',
                                        backgroundColor: '#1a1a1a',
                                        borderRadius: '4px',
                                        borderLeft: '3px solid #4a90e2'
                                    }}>
                                        <div style={{ color: '#ccc', fontWeight: '600' }}>
                                            {consumer.parentProduct || consumer.recipeName}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                            Requires: <strong style={{ color: '#4a90e2' }}>{consumer.rate.toFixed(2)}/min</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {hasMany && !consumersExpanded && (
                                <div style={{
                                    marginTop: '8px',
                                    fontSize: '0.8rem',
                                    color: '#888',
                                    fontStyle: 'italic',
                                    textAlign: 'center'
                                }}>
                                    ... and {resource.consumers.length - 5} more
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Machine Image */}
                {resource.machine && (
                    <div style={{ flexShrink: 0 }}>
                        <img
                            src={getMachineImage(resource.machine)}
                            alt={resource.machine.name}
                            style={{
                                width: '72px',
                                height: '72px',
                                imageRendering: 'pixelated',
                                opacity: 0.8
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsolidatedResourcesPanel;