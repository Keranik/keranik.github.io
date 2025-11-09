// src/components/farm-optimizer/FarmConfigCard.jsx
import { getEntityIcon, getCropIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';

const FarmConfigCard = ({
    farm,
    farmIndex,
    availableFarms,
    availableCrops,
    onRemove,
    onUpdateType,
    onOpenCropModal,
    canRemove,
    openRecipeSelectionModal,
    selectedProcessingRecipes
}) => {
    return (
        <div style={{
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '6px',
            border: '1px solid #333'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        color: '#4a90e2'
                    }}>
                        Farm #{farmIndex + 1}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {availableFarms.slice().sort((a, b) => {
                            const getTier = (farm) => {
                                const match = farm.id.match(/T(\d+)/);
                                return match ? parseInt(match[1]) : 0;
                            };
                            return getTier(a) - getTier(b);
                        }).map(f => {
                            const farmIcon = getEntityIcon(f);
                            const isSelected = farm.farmId === f.id;

                            return (
                                <button
                                    key={f.id}
                                    onClick={() => onUpdateType(farm.id, f.id)}
                                    title={f.name}
                                    style={{
                                        padding: '0.5rem',
                                        backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.2)' : 'transparent',
                                        border: isSelected ? '2px solid #4a90e2' : '2px solid #444',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.15s',
                                        width: '48px',
                                        height: '48px'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.borderColor = '#4a90e2';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.borderColor = '#444';
                                        }
                                    }}
                                >
                                    {farmIcon && (
                                        <img
                                            src={farmIcon}
                                            alt={f.name}
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={() => onRemove(farm.id)}
                    disabled={!canRemove}
                    style={{
                        padding: '0.4rem 0.75rem',
                        backgroundColor: !canRemove ? '#555' : '#ff6b6b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: !canRemove ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Remove
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.5rem'
            }}>
                {farm.rotation.map((cropId, slotIndex) => {
                    const crop = cropId ? availableCrops.find(c => c.id === cropId) : null;
                    const icon = crop ? getCropIcon(crop) : null;

                    const needsProcessing = crop ? !ProductionCalculator.foods?.find(f => f.productId === crop.output.productId) : false;
                    const hasRecipeSelected = crop ? selectedProcessingRecipes.has(crop.output.productId) : false;

                    return (
                        <div key={slotIndex} style={{ position: 'relative' }}>
                            <button
                                onClick={() => onOpenCropModal(farmIndex, slotIndex)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: crop ? '#2a4a6a' : '#2a2a2a',
                                    border: crop ? (needsProcessing && !hasRecipeSelected ? '2px solid #ff6b6b' : '2px solid #4a90e2') : '2px dashed #444',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    minHeight: '90px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.15s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = crop ? '#3a5a7a' : '#353535';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = crop ? '#2a4a6a' : '#2a2a2a';
                                }}
                            >
                                <div style={{
                                    fontSize: '0.65rem',
                                    color: '#888',
                                    marginBottom: '0.25rem',
                                    fontWeight: '600'
                                }}>
                                    SLOT {slotIndex + 1}
                                </div>

                                {crop ? (
                                    <>
                                        {icon && (
                                            <img
                                                src={icon}
                                                alt={crop.name}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    objectFit: 'contain',
                                                    marginBottom: '0.25rem'
                                                }}
                                            />
                                        )}
                                        <div style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            textAlign: 'center',
                                            lineHeight: '1.2'
                                        }}>
                                            {crop.name}
                                        </div>

                                        {needsProcessing && (
                                            <div style={{
                                                marginTop: '0.25rem',
                                                padding: '1px 4px',
                                                backgroundColor: hasRecipeSelected ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                                                border: `1px solid ${hasRecipeSelected ? '#4a90e2' : '#ff6b6b'}`,
                                                borderRadius: '3px',
                                                fontSize: '0.6rem',
                                                color: hasRecipeSelected ? '#4a90e2' : '#ff6b6b',
                                                fontWeight: '700'
                                            }}>
                                                {hasRecipeSelected ? '🏭' : '⚠️'}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                                        Click
                                    </div>
                                )}
                            </button>

                            {crop && needsProcessing && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openRecipeSelectionModal(crop.output.productId);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '3px',
                                        right: '3px',
                                        padding: '3px 6px',
                                        backgroundColor: hasRecipeSelected ? '#4a90e2' : '#ff6b6b',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '3px',
                                        fontSize: '0.65rem',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                        zIndex: 10
                                    }}
                                >
                                    🏭
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FarmConfigCard;