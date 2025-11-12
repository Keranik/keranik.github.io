import { useState, useRef, useEffect } from 'react';
import ProductionCalculator from '../../utils/ProductionCalculator';
import { getProductIcon, getGeneralIcon } from '../../utils/AssetHelper';

const RecipeSelectionModal = ({
    modal,
    onSelect,
    onClose,
    selectedProcessingRecipes,
    multiSelect = false
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (modal.open && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [modal.open]);

    if (!modal.open) return null;

    const filteredRecipes = (modal.availableRecipes || []).filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const successIcon = getGeneralIcon('Success');

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
                        {multiSelect ? 'Select Food Recipes' : `Process ${modal.productName}`}
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
                        Close
                    </button>
                </div>

                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        border: '2px solid #555',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                    }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {filteredRecipes.map(recipe => {
                        const isSelected = multiSelect
                            ? selectedProcessingRecipes.has(recipe.id)
                            : selectedProcessingRecipes.get(modal.productId) === recipe.id;

                        return (
                            <div
                                key={recipe.id}
                                onClick={() => onSelect(multiSelect ? recipe.id : modal.productId, recipe.id)}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                                    border: isSelected ? '2px solid #4a90e2' : '1px solid #444',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
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
                                {multiSelect && (
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid ' + (isSelected ? '#4a90e2' : '#666'),
                                        borderRadius: '4px',
                                        backgroundColor: isSelected ? '#4a90e2' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {isSelected && successIcon && (
                                            <img src={successIcon} alt="" style={{ width: '14px', height: '14px' }} />
                                        )}
                                    </div>
                                )}
                                <div style={{ flex: 1 }}>
                                    <div style={{ marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>
                                        {recipe.name}
                                    </div>
                                    {recipe.fullChain && recipe.fullChain.length > 0 && (
                                        <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                            {recipe.fullChain.map((step, idx) => {
                                                const product = ProductionCalculator.getProduct(step.outputProductId);
                                                return (
                                                    <span key={idx}>
                                                        {product?.name}
                                                        {idx < recipe.fullChain.length - 1 && ' → '}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecipeSelectionModal;