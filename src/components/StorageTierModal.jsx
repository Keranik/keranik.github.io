import { getEntityIcon } from '../utils/AssetHelper';

const StorageTierModal = ({ 
    isOpen, 
    onClose, 
    storageTierModal, 
    onSelectStorageTier 
}) => {
    if (!isOpen) return null;

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
                zIndex: 1001,
                padding: '2rem'
            }}
            onClick={onClose}
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
                    Storage Tiers for {storageTierModal.product?.name}
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                    Required throughput: {storageTierModal.requiredRate?.toFixed(1)}/min
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {storageTierModal.tiers.map(tier => {
                        const storageIcon = getEntityIcon({ id: tier.entityId });
                        const isOptimal = tier.isOptimal;

                        return (
                            <button
                                key={tier.tier}
                                onClick={() => onSelectStorageTier(tier)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: isOptimal ? 'rgba(255, 215, 0, 0.1)' : '#1a1a1a',
                                    border: isOptimal ? '2px solid #FFD700' : '2px solid #444',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isOptimal) {
                                        e.currentTarget.style.backgroundColor = '#252525';
                                        e.currentTarget.style.borderColor = '#5aa0f2';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isOptimal) {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                        e.currentTarget.style.borderColor = '#444';
                                    }
                                }}
                            >
                                {storageIcon && (
                                    <img src={storageIcon} alt={`Tier ${tier.tier}`} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                )}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                                        {storageTierModal.product?.type} Storage {tier.tier > 1 ? `Tier ${tier.tier}` : ''}
                                        {isOptimal && (
                                            <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#50C878', backgroundColor: 'rgba(80, 200, 120, 0.2)', padding: '2px 8px', borderRadius: '3px', fontWeight: '700' }}>
                                                ⭐ BEST
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '4px' }}>
                                        Throughput: {tier.throughput}/min each
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: tier.count === 1 ? '#50C878' : '#FFD700', fontWeight: '600' }}>
                                        → Need {tier.count} storage{tier.count > 1 ? 's' : ''} {tier.count === 1 ? '✅' : ''}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StorageTierModal;