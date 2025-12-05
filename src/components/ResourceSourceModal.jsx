import { useState } from 'react';
import { getGeneralIcon, getProductTypeIcon, getProductIcon } from '../utils/AssetHelper';
import ProductionCalculator from '../utils/ProductionCalculator';
import ToggleSwitch from './common/ToggleSwitch';

const ResourceSourceModal = ({
    isOpen,
    onClose,
    resourceSourceModal,
    onSelectResourceSource,
    onOpenRecipeModal,
    // NEW: Props for "apply to all" functionality
    matchingNodeCount = 0,  // How many other nodes have the same productId
    onApplyToAllChange = null  // Callback when toggle changes
}) => {
    const [applyToAll, setApplyToAll] = useState(false);

    if (!isOpen) return null;

    const product = ProductionCalculator.getProduct(resourceSourceModal.productId);
    const productIcon = product ? getProductIcon(product) : null;

    const sourceOptions = [
        {
            type: 'mining',
            icon: getGeneralIcon('Mining'),
            label: 'Mining (Local)',
            description: 'Extract from local deposits'
        },
        {
            type: 'worldMine',
            icon: getGeneralIcon('Mine'),
            label: 'World Mine',
            description: 'Import from world map mines'
        },
        {
            type: 'trade',
            icon: getGeneralIcon('Trade'),
            label: 'Trade/Contract',
            description: 'Purchase via contracts'
        },
        {
            type: 'storage',
            icon: getProductTypeIcon(product?.type),
            label: 'Storage',
            description: 'Provided from storage'
        },
        {
            type: 'machine',
            icon: getGeneralIcon('Machines'),
            label: 'Machine Production',
            description: 'Produce with recipes',
            disabled: !ProductionCalculator.getRecipesForProduct(resourceSourceModal.productId)?.length
        }
    ];

    const handleSelectSource = (sourceType) => {
        onSelectResourceSource(sourceType, applyToAll);
    };

    const handleApplyToAllToggle = () => {
        const newValue = !applyToAll;
        setApplyToAll(newValue);
        if (onApplyToAllChange) {
            onApplyToAllChange(newValue);
        }
    };

    // Reset applyToAll when modal closes/opens
    const handleClose = () => {
        setApplyToAll(false);
        onClose();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '2rem'
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handleClose();
                }
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#2a2a2a',
                    borderRadius: '12px',
                    padding: '2rem',
                    maxWidth: '600px',
                    width: '100%',
                    border: '2px solid #4a90e2',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)'
                }}
            >
                {/* Header with product icon */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '1rem'
                }}>
                    {productIcon && (
                        <img
                            src={productIcon}
                            alt={resourceSourceModal.productName}
                            style={{
                                width: '48px',
                                height: '48px',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                    <div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            margin: 0,
                            color: '#fff'
                        }}>
                            Select Source for {resourceSourceModal.productName}
                        </h3>
                        <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '4px' }}>
                            Required: {resourceSourceModal.requiredRate?.toFixed(1)}/min
                        </div>
                    </div>
                </div>

                {/* Apply to All Toggle - Only show if there are multiple matching nodes */}
                {matchingNodeCount > 0 && (
                    <div style={{
                        padding: '12px 16px',
                        backgroundColor: applyToAll ? 'rgba(80, 200, 120, 0.1)' : '#1a1a1a',
                        border: applyToAll ? '2px solid rgba(80, 200, 120, 0.4)' : '2px solid #333',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s'
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                color: applyToAll ? '#50C878' : '#ddd',
                                marginBottom: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                {getGeneralIcon('LogisticsAuto') && (
                                    <img
                                        src={getGeneralIcon('LogisticsAuto')}
                                        alt="Apply to all"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            opacity: applyToAll ? 1 : 0.5
                                        }}
                                    />
                                )}
                                Apply to all {resourceSourceModal.productName}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                {matchingNodeCount} other node{matchingNodeCount > 1 ? 's' : ''} use this resource
                            </div>
                        </div>
                        <ToggleSwitch
                            value={applyToAll}
                            onChange={handleApplyToAllToggle}
                            size="md"
                            onColor="#50C878"
                        />
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {sourceOptions.map(option => {
                        if (option.disabled) return null;
                        const isSelected = resourceSourceModal.currentSource?.type === option.type;

                        return (
                            <button
                                key={option.type}
                                onClick={() => handleSelectSource(option.type)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                                    border: isSelected ? '2px solid #4a90e2' : '2px solid #444',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#252525';
                                        e.currentTarget.style.borderColor = '#5aa0f2';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                        e.currentTarget.style.borderColor = '#444';
                                    }
                                }}
                            >
                                {option.icon && (
                                    <img src={option.icon} alt={option.label} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                                )}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '2px' }}>
                                        {option.label}
                                        {isSelected && (
                                            <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: '#4a90e2', backgroundColor: 'rgba(74, 144, 226, 0.2)', padding: '2px 6px', borderRadius: '3px' }}>
                                                CURRENT
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                        {option.description}
                                        {applyToAll && matchingNodeCount > 0 && (
                                            <span style={{
                                                marginLeft: '8px',
                                                color: '#50C878',
                                                fontWeight: '600'
                                            }}>
                                                → Will apply to {matchingNodeCount + 1} nodes
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {isSelected && (
                                    <div style={{ fontSize: '1.5rem', color: '#4a90e2' }}>⦿</div>
                                )}
                                {!isSelected && (
                                    <div style={{ fontSize: '1.5rem', color: '#555' }}>○</div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Cancel button */}
                <button
                    onClick={handleClose}
                    style={{
                        marginTop: '1.5rem',
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#333',
                        border: '2px solid #555',
                        borderRadius: '8px',
                        color: '#aaa',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#3a3a3a';
                        e.currentTarget.style.borderColor = '#666';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#333';
                        e.currentTarget.style.borderColor = '#555';
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ResourceSourceModal;