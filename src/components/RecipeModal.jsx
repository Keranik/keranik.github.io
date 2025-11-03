import RecipeCard from './RecipeCard';

const RecipeModal = ({
    isOpen,
    onClose,
    recipes,
    currentRecipeId,
    onSelectRecipe,
    productId = null, // Optional: for displaying product name
    getRecipeTimeDisplay = null, // Optional: function to get per-recipe time display
    onToggleTime = null // Optional: callback for toggling recipe time
}) => {
    if (!isOpen || !recipes || recipes.length === 0) return null;

    const handleSelect = (recipeId) => {
        onSelectRecipe(recipeId);
        // Don't close here - let parent decide (important for source modal flow)
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
                zIndex: 1100,
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
                    borderRadius: '16px',
                    padding: '2.5rem',
                    maxWidth: '1100px',
                    width: '100%',
                    maxHeight: '85vh',
                    overflow: 'auto',
                    border: '2px solid #4a90e2',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>
                        Select Recipe
                        <span style={{ fontSize: '1.1rem', color: '#888', fontWeight: '400', marginLeft: '12px' }}>
                            ({recipes.length} available)
                        </span>
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#555',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#666';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#555';
                        }}
                    >
                        ✕ Close
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {recipes.map(recipe => {
                        const isSelected = recipe.id === currentRecipeId;

                        return (
                            <div
                                key={recipe.id}
                                onClick={() => handleSelect(recipe.id)}
                                style={{
                                    backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                                    border: isSelected ? '3px solid #4a90e2' : '2px solid #444',
                                    borderRadius: '10px',
                                    padding: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#252525';
                                        e.currentTarget.style.borderColor = '#666';
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                        e.currentTarget.style.borderColor = '#444';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }
                                }}
                            >
                                <RecipeCard
                                    recipe={recipe}
                                    size="large"
                                    isClickable={false}
                                    showPerMinute={getRecipeTimeDisplay ? getRecipeTimeDisplay(recipe.id) : undefined}
                                    onToggleTime={onToggleTime}
                                />
                                {isSelected && (
                                    <div style={{
                                        marginTop: '10px',
                                        padding: '8px 16px',
                                        backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                        borderRadius: '6px',
                                        textAlign: 'center',
                                        fontSize: '0.9rem',
                                        color: '#5aa0f2',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px',
                                        border: '1px solid rgba(74, 144, 226, 0.3)'
                                    }}>
                                        ✓ CURRENTLY SELECTED
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

export default RecipeModal;