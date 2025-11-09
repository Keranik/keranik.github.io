// src/components/farm-optimizer/RecipeSelectionModal.jsx
import ProductionCalculator from '../../utils/ProductionCalculator';

const RecipeSelectionModal = ({ modal, onSelect, onClose, selectedProcessingRecipes }) => {
    if (!modal.open) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                padding: '1.5rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                border: '2px solid #4a90e2'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                        Process {modal.productName}
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#ff6b6b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {modal.availableRecipes.map(recipe => {
                        const finalFood = ProductionCalculator.getProduct(recipe.finalFoodProductId);
                        const isSelected = selectedProcessingRecipes.get(modal.productId) === recipe.id;

                        return (
                            <div
                                key={recipe.id + '-' + recipe.finalFoodProductId}
                                onClick={() => onSelect(modal.productId, recipe.id)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                                    border: isSelected ? '2px solid #4a90e2' : '1px solid #444',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#252525';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                    }
                                }}
                            >
                                <div style={{ marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>
                                    {recipe.name}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#FFD700', marginBottom: '0.25rem' }}>
                                    → {finalFood?.name}
                                </div>
                                {recipe.fullChain && recipe.fullChain.length > 0 && (
                                    <div style={{ fontSize: '0.7rem', color: '#888' }}>
                                        {modal.productName} → {recipe.fullChain.map(c => ProductionCalculator.getProduct(c.outputProductId)?.name).join(' → ')}
                                    </div>
                                )}
                                {isSelected && (
                                    <div style={{
                                        marginTop: '0.5rem',
                                        padding: '3px 6px',
                                        backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                        borderRadius: '3px',
                                        fontSize: '0.75rem',
                                        color: '#4a90e2',
                                        fontWeight: '700',
                                        display: 'inline-block'
                                    }}>
                                        ✓ Selected
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecipeSelectionModal;