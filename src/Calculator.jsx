import React, { useState } from 'react';

function Calculator() {
    // ... other state and functions

    const [recipeOutputModal, setRecipeOutputModal] = useState({ open: false, recipe: null });

    // ... other logic and functions

    const handleRecipeSearchSelect = (recipe) => {
        // Check if the recipe has multiple outputs
        if (recipe.outputs.length > 1) {
            // Open the output selection modal
            setRecipeOutputModal({ open: true, recipe });
        } else {
            // Set the selected product directly
            setSelectedProduct(recipe.outputs[0].productId);
        }
    };

    // Update existing filtering logic for search recipes
    const filteredSearchRecipes = recipeData.filter(recipe => {
        const matchesSearch = // ... your existing search logic
        if (selectedProduct) {
            return matchesSearch && recipe.outputs.some(output => output.productId === selectedProduct);
        }
        return matchesSearch;
    });

    // Update the renderRecipeSearchModal
    const renderRecipeSearchModal = () => {
        return (
            <div>
                {/* Existing code */}
                {recipe.inputs.map(i => i.product?.name || i.productId || 'Unknown').join(', ')}  {/* Updated line 3009 */}
            </div>
        );
    };

    // Add modal UI for selecting output product
    const outputSelectionModal = recipeOutputModal.open && (
        <div>
            <h2>Select Output Product</h2>
            {recipeOutputModal.recipe.outputs.map(output => (
                <button key={output.productId} onClick={() => {
                    setSelectedProduct(output.productId);
                    setRecipeOutputModal({ open: false, recipe: null }); // Close modal after selection
                }}>
                    {output.product.name}
                </button>
            ))}
            <button onClick={() => setRecipeOutputModal({ open: false, recipe: null })}>Cancel</button>
        </div>
    );

    return (
        <div>
            {/* Existing UI code */}
            {outputSelectionModal}
        </div>
    );
}

export default Calculator;