import React from 'react';
import { getProductIcon } from '../../utils/AssetHelper';

/**
 * FlowBadge.jsx
 * Displays flow amount on connection edges with product icon
 * Shows [12] or [12 Coal/min] depending on size/zoom
 * Clickable to open priority/balance modal
 */

const FlowBadge = ({ 
    flow = 0, 
    product = null, 
    satisfied = 'unassigned', 
    position = 'center',
    onClick = null,
    showDetailed = false,
    globalScale = 1,
    isHovered = false
}) => {
    const productIcon = product ? getProductIcon(product) : null;

    // Determine badge color based on satisfaction status
    const getBadgeColor = () => {
        switch (satisfied) {
            case 'full':
                return {
                    bg: 'rgba(80, 200, 120, 0.95)',
                    border: '#50C878',
                    text: '#fff'
                };
            case 'partial':
                return {
                    bg: 'rgba(255, 235, 59, 0.95)',
                    border: '#FFEB3B',
                    text: '#1a1a1a'
                };
            case 'none':
                return {
                    bg: 'rgba(244, 67, 54, 0.95)',
                    border: '#F44336',
                    text: '#fff'
                };
            case 'unassigned':
            default:
                return {
                    bg: 'rgba(255, 255, 255, 0.95)',
                    border: '#ccc',
                    text: '#1a1a1a'
                };
        }
    };

    const colors = getBadgeColor();

    // Base size scales with globalScale
    const baseSize = 12 * Math.min(globalScale, 2); // Cap at 2x for readability
    const padding = 4 * Math.min(globalScale, 2);
    const iconSize = 14 * Math.min(globalScale, 2);
    const borderWidth = 2 * Math.min(globalScale, 1.5);

    // Format flow display
    const formatFlow = (value) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
        }
        return value.toFixed(1);
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) {
                    onClick();
                }
            }}
            style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                gap: `${padding / 2}px`,
                padding: `${padding}px ${padding * 1.5}px`,
                backgroundColor: colors.bg,
                border: `${borderWidth}px solid ${colors.border}`,
                borderRadius: `${padding * 2}px`,
                fontSize: `${baseSize}px`,
                fontWeight: '700',
                color: colors.text,
                cursor: onClick ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isHovered 
                    ? '0 4px 12px rgba(0, 0, 0, 0.5)' 
                    : '0 2px 6px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                userSelect: 'none',
                pointerEvents: 'auto',
                whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'scale(1.15)';
                }
            }}
            onMouseLeave={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'scale(1)';
                }
            }}
            title={onClick ? 'Click to configure flow priority/balance' : null}
        >
            {/* Product Icon (if available and detailed view) */}
            {showDetailed && productIcon && (
                <img 
                    src={productIcon} 
                    alt={product?.name || 'Product'} 
                    style={{ 
                        width: `${iconSize}px`, 
                        height: `${iconSize}px`,
                        objectFit: 'contain'
                    }} 
                />
            )}

            {/* Flow Amount */}
            <span style={{ 
                fontSize: `${baseSize}px`,
                lineHeight: 1
            }}>
                {formatFlow(flow)}
            </span>

            {/* Unit Label (if detailed) */}
            {showDetailed && (
                <span style={{ 
                    fontSize: `${baseSize * 0.8}px`,
                    opacity: 0.9,
                    lineHeight: 1
                }}>
                    /min
                </span>
            )}

            {/* Product Name (if detailed and available) */}
            {showDetailed && product && (
                <span style={{ 
                    fontSize: `${baseSize * 0.85}px`,
                    opacity: 0.9,
                    maxWidth: '80px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1
                }}>
                    {product.name}
                </span>
            )}

            {/* Click indicator (if clickable) */}
            {onClick && (
                <span style={{ 
                    fontSize: `${baseSize * 0.7}px`,
                    opacity: 0.7,
                    lineHeight: 1
                }}>
                    ⚙
                </span>
            )}
        </div>
    );
};

export default FlowBadge;