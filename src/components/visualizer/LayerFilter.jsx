import React, { useState } from 'react';
import { getGeneralIcon } from '../../utils/AssetHelper';

/**
 * LayerFilter.jsx
 * Floating panel for controlling layer visibility
 * Shows/hides connections by layer with color indicators
 * Displays connection count per layer
 */

const LayerFilter = ({
    layers = [],
    visibleLayers = new Set([0, 1, 2, 3, 4, 5]),
    onToggleLayer = () => {},
    onToggleAllLayers = () => {},
    connectionsByLayer = {},
    position = 'top-right',
    globalScale = 1
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const filterIcon = getGeneralIcon('Filter');
    const layersIcon = getGeneralIcon('Layers');

    const positionStyles = {
        'top-right': {
            top: '20px',
            right: '20px'
        },
        'top-left': {
            top: '20px',
            left: '20px'
        },
        'bottom-right': {
            bottom: '100px',
            right: '20px'
        },
        'bottom-left': {
            bottom: '100px',
            left: '20px'
        }
    };

    const totalConnections = Object.values(connectionsByLayer).reduce((sum, count) => sum + count, 0);
    const visibleConnectionsCount = Array.from(visibleLayers).reduce((sum, layer) => {
        return sum + (connectionsByLayer[layer] || 0);
    }, 0);

    return (
        <div
            style={{
                position: 'absolute',
                ...positionStyles[position],
                zIndex: 100
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Collapsed View */}
            {!isExpanded && (
                <div
                    onClick={() => setIsExpanded(true)}
                    style={{
                        backgroundColor: 'rgba(42, 42, 42, 0.95)',
                        border: '2px solid #4a90e2',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        minWidth: '140px'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {layersIcon && (
                            <img src={layersIcon} alt="Layers" style={{ width: '20px', height: '20px' }} />
                        )}
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff' }}>
                                Layers
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#aaa' }}>
                                {visibleConnectionsCount}/{totalConnections} visible
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Expanded View */}
            {isExpanded && (
                <div
                    style={{
                        backgroundColor: 'rgba(42, 42, 42, 0.95)',
                        border: '2px solid #4a90e2',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                        minWidth: '240px',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '0.75rem 1rem',
                            borderBottom: '2px solid #4a90e2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {layersIcon && (
                                <img src={layersIcon} alt="Layers" style={{ width: '20px', height: '20px' }} />
                            )}
                            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>
                                Layer Filter
                            </span>
                        </div>
                        <button
                            onClick={() => setIsExpanded(false)}
                            style={{
                                padding: '0.25rem',
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                lineHeight: 1
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Layer List */}
                    <div style={{ padding: '0.75rem' }}>
                        {layers.map((layer) => {
                            const isVisible = visibleLayers.has(layer.height);
                            const connectionCount = connectionsByLayer[layer.height] || 0;

                            return (
                                <div
                                    key={layer.height}
                                    onClick={() => onToggleLayer(layer.height)}
                                    style={{
                                        padding: '0.5rem 0.75rem',
                                        marginBottom: '0.5rem',
                                        backgroundColor: isVisible ? 'rgba(74, 144, 226, 0.2)' : 'rgba(0, 0, 0, 0.3)',
                                        border: `2px solid ${isVisible ? layer.color : '#333'}`,
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        opacity: isVisible ? 1 : 0.6
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = isVisible 
                                            ? 'rgba(74, 144, 226, 0.3)' 
                                            : 'rgba(0, 0, 0, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = isVisible 
                                            ? 'rgba(74, 144, 226, 0.2)' 
                                            : 'rgba(0, 0, 0, 0.3)';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {/* Color indicator */}
                                            <div
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    backgroundColor: layer.color,
                                                    borderRadius: '4px',
                                                    border: '2px solid #fff',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                                                }}
                                            />
                                            {/* Layer name */}
                                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>
                                                {layer.name}
                                            </span>
                                        </div>

                                        {/* Connection count */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ 
                                                fontSize: '0.75rem', 
                                                color: connectionCount > 0 ? '#4a90e2' : '#666',
                                                fontWeight: '700'
                                            }}>
                                                {connectionCount}
                                            </span>
                                            {/* Visibility toggle */}
                                            <div
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    borderRadius: '4px',
                                                    border: '2px solid #fff',
                                                    backgroundColor: isVisible ? '#50C878' : '#666',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.7rem',
                                                    color: '#fff',
                                                    fontWeight: '700'
                                                }}
                                            >
                                                {isVisible ? '✓' : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer Actions */}
                    <div style={{ 
                        padding: '0.75rem', 
                        borderTop: '1px solid #444',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <button
                            onClick={() => onToggleAllLayers(true)}
                            style={{
                                flex: 1,
                                padding: '0.5rem',
                                backgroundColor: '#50C878',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.8rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#60D888'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#50C878'}
                        >
                            Show All
                        </button>
                        <button
                            onClick={() => onToggleAllLayers(false)}
                            style={{
                                flex: 1,
                                padding: '0.5rem',
                                backgroundColor: '#555',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.8rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#666'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#555'}
                        >
                            Hide All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LayerFilter;