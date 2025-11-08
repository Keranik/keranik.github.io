/**
 * Asset Helper
 * Converts game asset paths and IDs to web-accessible URLs
 * Assets are stored in src/assets/icons/
 */

/**
 * Import all product icons using Vite's glob import
 */
const productIcons = import.meta.glob('../assets/icons/product/*.png', { eager: true, import: 'default' });
const layoutEntityIcons = import.meta.glob('../assets/icons/layoutentity/*.png', { eager: true, import: 'default' });
const generalIcons = import.meta.glob('../assets/icons/general/*.png', { eager: true, import: 'default' });
const productTypeIcons = import.meta.glob('../assets/icons/producttypes/*.png', { eager: true, import: 'default' });
const topdownIcons = import.meta.glob('../assets/icons/topdown/*.png', { eager: true, import: 'default' });

/**
 * Convert product ID to icon path key
 * Product IDs like "Product_Iron" -> "../assets/icons/product/Iron.png"
 */
function getProductIconPath(productId) {
    if (!productId) return null;
    // Strip "Product_Virtual_" first, then fallback to "Product_"
    const filename = productId
        .replace(/^Product_Virtual_/, '')
        .replace(/^Product_/, '')
        + '.png';
    return `../assets/icons/product/${filename}`;
}

/**
 * Convert entity ID to icon path key
 * Entity IDs like "FoodMill" -> "../assets/icons/layoutentity/FoodMill.png"
 */
function getEntityIconPath(entityId) {
    if (!entityId) return null;
    return `../assets/icons/layoutentity/${entityId}.png`;
}

/**
 * Convert entity ID to topdown icon path key
 * Entity IDs like "FoodMill" -> "../assets/icons/topdown/FoodMill.png"
 */
function getEntityIconTopPath(entityId) {
    if (!entityId) return null;
    return `../assets/icons/topdown/${entityId}.png`;
}

/**
 * Get general icon path
 * Icon names like "Worker" -> "../assets/icons/general/Worker.png"
 */
function getGeneralIconPath(iconName) {
    if (!iconName) return null;
    return `../assets/icons/general/${iconName}.png`;
}

/**
 * Get product type icon path
 * Type names like "Fluid" -> "../assets/icons/producttypes/Fluid.png"
 */
function getProductTypeIconPath(typeName) {
    if (!typeName) return null;
    return `../assets/icons/producttypes/${typeName}.png`;
}

/**
 * Convert crop ID to icon path key (in product directory)
 * Crop IDs like "Crop_GreenManure" -> "../assets/icons/product/GreenManure.png"
 */
function getCropIconPath(cropId) {
    if (!cropId) return null;
    const filename = cropId.replace(/^Crop_/, '') + '.png';
    return `../assets/icons/product/${filename}`;
}

/**
 * NEW: Convert research icon path to web path
 * Research iconPath like "Assets/Base/Products/Icons/ConstructionParts4.svg" 
 * -> Try product icon, then layout entity icon, then general icon
 */
function getResearchIconPath(iconPath) {
    if (!iconPath) return null;

    // Extract filename from path (e.g., "ConstructionParts4.svg" -> "ConstructionParts4")
    const filename = iconPath.split('/').pop().replace(/\.(svg|png)$/i, '');

    // Try multiple icon directories in order of likelihood
    // 1. Product icons (for product-based research)
    const productPath = `../assets/icons/product/${filename}.png`;
    if (productIcons[productPath]) {
        return productPath;
    }

    // 2. Layout entity icons (for building/machine research)
    const entityPath = `../assets/icons/layoutentity/${filename}.png`;
    if (layoutEntityIcons[entityPath]) {
        return entityPath;
    }

    // 3. General icons (for general tech)
    const generalPath = `../assets/icons/general/${filename}.png`;
    if (generalIcons[generalPath]) {
        return generalPath;
    }

    return null;
}

/**
 * Get product icon URL
 * @param {Object} product - Product object from GameData
 * @returns {string|null} - Icon URL or null
 */
export function getProductIcon(product) {
    if (!product) return null;

    const path = getProductIconPath(product.id);
    if (!path) return null;

    // Return the imported image URL
    return productIcons[path] || null;
}

/**
 * Get crop icon URL
 * @param {Object} crop - Crop object from GameData
 * @returns {string|null} - Icon URL or null
 */
export function getCropIcon(crop) {
    if (!crop) return null;

    // First try to get icon from the crop's output product
    if (crop.output && crop.output.productId && crop.output.productId !== '__PHANTOM__PRODUCT__') {
        const productPath = getProductIconPath(crop.output.productId);
        const productIcon = productIcons[productPath];
        if (productIcon) return productIcon;
    }

    // Fallback to crop-specific icon (also in product directory)
    const path = getCropIconPath(crop.id);
    if (!path) return null;

    return productIcons[path] || null; // Use productIcons (same directory)
}

/**
 * Get machine/building image URL
 * @param {Object} entity - Machine or building object from GameData
 * @returns {string|null} - Image URL or null
 */
export function getMachineImage(entity) {
    if (!entity) return null;

    const path = getEntityIconPath(entity.id);
    if (!path) return null;

    // Return the imported image URL
    return layoutEntityIcons[path] || null;
}

/**
 * Get entity icon URL directly (for farms, buildings, etc.)
 * @param {Object} entity - Entity object with an id property
 * @returns {string|null} - Icon URL or null
 */
export function getEntityIcon(entity) {
    if (!entity) return null;

    const path = getEntityIconPath(entity.id);
    if (!path) return null;

    // Return the imported image URL
    return layoutEntityIcons[path] || null;
}

/**
 * Get topdown entity icon URL (for farms, buildings, etc.)
 * @param {Object} entity - Entity object with an id property
 * @returns {string|null} - Icon URL or null
 */
export function getEntityIconTop(entity) {
    if (!entity) return null;
    const path = getEntityIconTopPath(entity.id);
    if (!path) return null;
    // Return the imported image URL
    return topdownIcons[path] || null;
}

/**
 * Get general icon URL
 * @param {string} iconName - Icon name (e.g., "Worker", "Electricity", "Computing")
 * @returns {string|null} - Icon URL or null
 */
export function getGeneralIcon(iconName) {
    if (!iconName) return null;

    const path = getGeneralIconPath(iconName);
    if (!path) return null;

    // Return the imported image URL
    return generalIcons[path] || null;
}

/**
 * Get product type icon URL
 * @param {string} typeName - Type name (e.g., "Fluid", "Loose", "Molten", "Countable", "Solid")
 * @returns {string|null} - Icon URL or null
 */
export function getProductTypeIcon(typeName) {
    if (!typeName) return null;

    const path = getProductTypeIconPath(typeName);
    if (!path) return null;

    // Return the imported image URL
    return productTypeIcons[path] || null;
}

/**
 * NEW: Get research icon URL
 * @param {Object} researchNode - Research node object from GameData
 * @returns {string|null} - Icon URL or null
 */
export function getResearchIcon(researchNode) {
    if (!researchNode || !researchNode.iconPath) return null;

    const path = getResearchIconPath(researchNode.iconPath);
    if (!path) return null;

    // Try product icons first (most common)
    if (productIcons[path]) return productIcons[path];
    // Then layout entities
    if (layoutEntityIcons[path]) return layoutEntityIcons[path];
    // Finally general icons
    if (generalIcons[path]) return generalIcons[path];

    return null;
}

/**
 * Get building image URL (same as machine)
 */
export function getBuildingImage(building) {
    return getMachineImage(building);
}

/**
 * Get farm image URL (same as machine)
 */
export function getFarmImage(farm) {
    return getMachineImage(farm);
}

/**
 * Get recipe icon (use first output product icon)
 */
export function getRecipeIcon(recipe, getProduct) {
    if (!recipe || !recipe.outputs || recipe.outputs.length === 0) {
        return null;
    }

    const product = getProduct(recipe.outputs[0].productId);
    return getProductIcon(product);
}

export default {
    getProductIcon,
    getCropIcon,
    getMachineImage,
    getBuildingImage,
    getRecipeIcon,
    getFarmImage,
    getGeneralIcon,
    getProductTypeIcon,
    getEntityIcon,
    getEntityIconTop,
    getResearchIcon 
};