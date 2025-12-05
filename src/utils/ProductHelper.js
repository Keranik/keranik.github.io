/**
 * ProductHelper - Data-driven product classification
 * Uses actual GameData properties - no hardcoded IDs
 */

/**
 * Check if a product is a waste/byproduct based on game data properties
 * @param {Object} product - Product object from GameData
 * @returns {boolean}
 */
export function isWasteProduct(product) {
    if (!product) return false;
    
    // Direct waste flag from game data
    if (product.isWaste === true) {
        return true;
    }
    
    // Virtual products (pollution, maintenance, etc.) are not tangible
    if (product.type?.toLowerCase() === 'virtual') {
        return true;
    }
    
    // Products excluded from stats and not storable are typically system products
    if (product.excludeFromStats === true && product.storable === false) {
        return true;
    }
    
    return false;
}

/**
 * Check if a product is producible (valid target for production calculator)
 * @param {Object} product - Product object from GameData
 * @param {Function} getRecipesForProduct - Function to get recipes producing this product
 * @returns {boolean}
 */
export function isProducibleProduct(product, getRecipesForProduct) {
    if (!product) return false;
    
    // Exclude waste/virtual products
    if (isWasteProduct(product)) return false;
    
    // Must have at least one recipe that produces it as a non-pollution output
    const recipes = getRecipesForProduct(product.id);
    if (!recipes || recipes.length === 0) return false;
    
    // Check if any recipe produces this as a primary (non-pollution) output
    const hasValidRecipe = recipes.some(recipe => 
        recipe.outputs?.some(output => 
            output.productId === product.id && output.isPollution !== true
        )
    );
    
    return hasValidRecipe;
}

/**
 * Check if a recipe output is pollution/waste
 * @param {Object} output - Recipe output object
 * @returns {boolean}
 */
export function isPollutionOutput(output) {
    if (!output) return false;
    return output.isPollution === true || output.hideInUi === true;
}

/**
 * Get only the primary (non-pollution) outputs from a recipe
 * @param {Object} recipe - Recipe object from GameData
 * @returns {Array}
 */
export function getPrimaryOutputs(recipe) {
    if (!recipe?.outputs) return [];
    return recipe.outputs.filter(output => !isPollutionOutput(output));
}

/**
 * Get pollution/byproduct outputs from a recipe
 * @param {Object} recipe - Recipe object from GameData
 * @returns {Array}
 */
export function getPollutionOutputs(recipe) {
    if (!recipe?.outputs) return [];
    return recipe.outputs.filter(output => isPollutionOutput(output));
}

/**
 * Filter products to only include those valid for production targets
 * @param {Array} products - Array of product objects
 * @param {Function} getRecipesForProduct - Function to get recipes for a product
 * @returns {Array}
 */
export function getProducibleProducts(products, getRecipesForProduct) {
    if (!products) return [];
    
    return products
        .filter(product => isProducibleProduct(product, getRecipesForProduct))
        .sort((a, b) => a.name.localeCompare(b.name));
}