import { getGeneralIcon, getProductTypeIcon } from '../utils/AssetHelper';
import ProductionCalculator from '../utils/ProductionCalculator';

const ResourceSourceModal = ({ 
    isOpen, 
    onClose, 
    resourceSourceModal, 
    onSelectResourceSource,
    onOpenRecipeModal 
}) => {
    if (!isOpen) return null;

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
            icon: getProductTypeIcon(ProductionCalculator.getProduct(resourceSourceModal.productId)?.type),
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
                    onClose();
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
                    Select Source for {resourceSourceModal.productName}
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                    Required: {resourceSourceModal.requiredRate?.toFixed(1)}/min
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {sourceOptions.map(option => {
                        if (option.disabled) return null;
                        const isSelected = resourceSourceModal.currentSource?.type === option.type;

                        return (
                            <button
                                key={option.type}
                                onClick={() => onSelectResourceSource(option.type)}
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
                                                DEFAULT
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                        {option.description}
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
            </div>
        </div>
    );
};

export default ResourceSourceModal;