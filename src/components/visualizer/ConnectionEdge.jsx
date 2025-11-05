import React, { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, getStraightPath } from '@xyflow/react';
import FlowBadge from './FlowBadge';

/**
 * ConnectionEdge.jsx
 * Custom edge component for factory connections
 * Features:
 * - Step-based routing (90-degree angles)
 * - Animated dashed lines
 * - Flow badges with satisfaction indicators
 * - Layer-based coloring
 * - Collision detection ready
 */

const ConnectionEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data = {},
    selected = false
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // Extract data
    const {
        flow = 0,
        product = null,
        satisfied = 'unassigned',
        layer = 0,
        warnings = [],
        path = [],
        onFlowBadgeClick = null,
        globalScale = 1
    } = data;

    // Layer colors
    const LAYER_COLORS = [
        '#ffffff', // Layer 0 - Ground (white)
        '#ff6b6b', // Layer 1 (red)
        '#4ecdc4', // Layer 2 (cyan)
        '#ffe66d', // Layer 3 (yellow)
        '#a8dadc', // Layer 4 (light blue)
        '#f1a7fe'  // Layer 5 (pink)
    ];

    const layerColor = LAYER_COLORS[layer] || '#ffffff';

    // Calculate edge path (using step for 90-degree angles)
    // For now, we'll use a simple straight path
    // TODO: Implement proper step-based pathfinding
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY
    });

    // Edge styling
    const edgeStyle = {
        ...style,
        stroke: warnings.length > 0 ? '#ff6b6b' : layerColor,
        strokeWidth: isHovered ? 6 : 4,
        strokeDasharray: '10, 5',
        strokeLinecap: 'round',
        transition: 'all 0.2s',
        animation: 'dashAnimation 1s linear infinite',
        opacity: selected ? 1 : 0.8,
        filter: isHovered ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' : 'none'
    };

    return (
        <>
            {/* CSS Animation for dashed line */}
            <style>{`
                @keyframes dashAnimation {
                    to {
                        stroke-dashoffset: -15;
                    }
                }
            `}</style>

            {/* Base edge path */}
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={edgeStyle}
            />

            {/* Interactive overlay for hover detection */}
            <path
                d={edgePath}
                fill="none"
                stroke="transparent"
                strokeWidth={20}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: 'pointer' }}
            />

            {/* Flow Badge */}
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: 'all'
                    }}
                >
                    <FlowBadge
                        flow={flow}
                        product={product}
                        satisfied={satisfied}
                        onClick={onFlowBadgeClick ? () => onFlowBadgeClick(id) : null}
                        showDetailed={isHovered}
                        globalScale={globalScale}
                        isHovered={isHovered}
                    />
                </div>
            </EdgeLabelRenderer>

            {/* Warning indicator (if warnings exist) */}
            {warnings.length > 0 && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY - 30}px)`,
                            pointerEvents: 'all'
                        }}
                    >
                        <div
                            style={{
                                padding: '4px 8px',
                                backgroundColor: 'rgba(244, 67, 54, 0.95)',
                                border: '2px solid #F44336',
                                borderRadius: '8px',
                                fontSize: '10px',
                                fontWeight: '700',
                                color: '#fff',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            title={warnings.map(w => w.message).join('\n')}
                        >
                            ⚠ {warnings.length}
                        </div>
                    </div>
                </EdgeLabelRenderer>
            )}

            {/* Layer indicator (on hover) */}
            {isHovered && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY + 30}px)`,
                            pointerEvents: 'none'
                        }}
                    >
                        <div
                            style={{
                                padding: '3px 8px',
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: `2px solid ${layerColor}`,
                                borderRadius: '6px',
                                fontSize: '9px',
                                fontWeight: '600',
                                color: '#fff',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Layer {layer}
                        </div>
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default ConnectionEdge;