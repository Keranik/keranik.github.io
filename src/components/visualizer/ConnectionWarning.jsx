import React, { useState } from 'react';
import { getGeneralIcon } from '../../utils/AssetHelper';

/**
 * ConnectionWarning.jsx
 * Toast notification for invalid connections
 * Displays all warnings with details on hover/click
 * Persistent until user dismisses or warnings are fixed
 */

const ConnectionWarning = ({
    warnings = [],
    onDismiss = () => {},
    position = 'top-right'
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const warningIcon = getGeneralIcon('Warning') || getGeneralIcon('Alert');

    if (warnings.length === 0) return null;

    // Group warnings by type
    const errorWarnings = warnings.filter(w => w.type === 'error');
    const cautionWarnings = warnings.filter(w => w.type === 'warning');

    const positionStyles = {
        'top-right': {
            top: '80px',
            right: '20px'
        },
        'top-left': {
            top: '80px',
            left: '20px'
        },
        'bottom-right': {
            bottom: '20px',
            right: '20px'
        },
        'bottom-left': {
            bottom: '20px',
            left: '20px'
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                ...positionStyles[position],
                zIndex: 9998,
                maxWidth: isExpanded ? '400px' : '280px',
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Collapsed View */}
            {!isExpanded && (
                <div
                    onClick={() => setIsExpanded(true)}
                    style={{
                        backgroundColor: 'rgba(244, 67, 54, 0.95)',
                        border: '2px solid #F44336',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        boxShadow: '0 8px 24px rgba(244, 67, 54, 0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {warningIcon && (
                            <img src={warningIcon} alt="Warning" style={{ width: '24px', height: '24px' }} />
                        )}
                        <div>
                            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', marginBottom: '2px' }}>
                                Invalid Connections
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                                {errorWarnings.length} error{errorWarnings.length !== 1 ? 's' : ''}
                                {cautionWarnings.length > 0 && `, ${cautionWarnings.length} warning${cautionWarnings.length !== 1 ? 's' : ''}`}
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                            Click for details
                        </div>
                    </div>
                </div>
            )}

            {/* Expanded View */}
            {isExpanded && (
                <div
                    style={{
                        backgroundColor: '#2a2a2a',
                        border: '2px solid #F44336',
                        borderRadius: '12px',
                        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)',
                        maxHeight: '600px',
                        overflowY: 'auto'
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '1rem 1.25rem',
                            backgroundColor: 'rgba(244, 67, 54, 0.2)',
                            borderBottom: '2px solid #F44336',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {warningIcon && (
                                <img src={warningIcon} alt="Warning" style={{ width: '24px', height: '24px' }} />
                            )}
                            <div>
                                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>
                                    Invalid Connections
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#aaa' }}>
                                    {errorWarnings.length + cautionWarnings.length} total
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsExpanded(false)}
                            style={{
                                padding: '0.5rem',
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.25rem',
                                cursor: 'pointer',
                                lineHeight: 1
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Warning List */}
                    <div style={{ padding: '1rem' }}>
                        {/* Errors Section */}
                        {errorWarnings.length > 0 && (
                            <div style={{ marginBottom: cautionWarnings.length > 0 ? '1rem' : 0 }}>
                                <div style={{ 
                                    fontSize: '0.85rem', 
                                    fontWeight: '700', 
                                    color: '#F44336', 
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Errors ({errorWarnings.length})
                                </div>
                                {errorWarnings.map((warning, index) => (
                                    <div
                                        key={`error-${index}`}
                                        style={{
                                            padding: '0.75rem',
                                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                            border: '1px solid rgba(244, 67, 54, 0.3)',
                                            borderRadius: '6px',
                                            marginBottom: '0.5rem'
                                        }}
                                    >
                                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff', marginBottom: '0.25rem' }}>
                                            {warning.message}
                                        </div>
                                        {warning.fix && (
                                            <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.25rem' }}>
                                                💡 {warning.fix}
                                            </div>
                                        )}
                                        {warning.productsInvolved && (
                                            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                                                Products: {warning.productsInvolved.join(' → ')}
                                            </div>
                                        )}
                                        {warning.willNotExport && (
                                            <div style={{ 
                                                fontSize: '0.7rem', 
                                                color: '#FFEB3B', 
                                                marginTop: '0.5rem',
                                                padding: '0.25rem 0.5rem',
                                                backgroundColor: 'rgba(255, 235, 59, 0.1)',
                                                borderRadius: '4px',
                                                border: '1px solid rgba(255, 235, 59, 0.3)'
                                            }}>
                                                ⚠ Will not export to game blueprint
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Warnings Section */}
                        {cautionWarnings.length > 0 && (
                            <div>
                                <div style={{ 
                                    fontSize: '0.85rem', 
                                    fontWeight: '700', 
                                    color: '#FFEB3B', 
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Warnings ({cautionWarnings.length})
                                </div>
                                {cautionWarnings.map((warning, index) => (
                                    <div
                                        key={`warning-${index}`}
                                        style={{
                                            padding: '0.75rem',
                                            backgroundColor: 'rgba(255, 235, 59, 0.1)',
                                            border: '1px solid rgba(255, 235, 59, 0.3)',
                                            borderRadius: '6px',
                                            marginBottom: '0.5rem'
                                        }}
                                    >
                                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff', marginBottom: '0.25rem' }}>
                                            {warning.message}
                                        </div>
                                        {warning.fix && (
                                            <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.25rem' }}>
                                                💡 {warning.fix}
                                            </div>
                                        )}
                                        {warning.isRedundant && (
                                            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                                                This connection may not be needed
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Info Footer */}
                        <div style={{
                            marginTop: '1rem',
                            padding: '0.75rem',
                            backgroundColor: 'rgba(74, 144, 226, 0.1)',
                            border: '1px solid rgba(74, 144, 226, 0.3)',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            color: '#aaa',
                            lineHeight: '1.4'
                        }}>
                            <strong style={{ color: '#4a90e2' }}>Note:</strong> These warnings indicate connections that may not work properly in-game. 
                            Nodes with red borders have connection issues. Fix these before exporting blueprints.
                        </div>
                    </div>

                    {/* Dismiss Button */}
                    <div style={{ padding: '1rem', borderTop: '1px solid #444' }}>
                        <button
                            onClick={() => {
                                setIsExpanded(false);
                                onDismiss();
                            }}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#555',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#666'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#555'}
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectionWarning;