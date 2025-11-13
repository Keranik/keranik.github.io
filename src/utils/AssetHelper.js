/**
 * Asset Helper
 * Converts game asset paths and IDs to web-accessible URLs
 * Assets are stored in src/assets/icons/
 * Supports both PNG and SVG formats
 */

/**
 * Import all product icons (both PNG and SVG) using Vite's glob import
 */
const productIconsPng = import.meta.glob('../assets/icons/product/*.png', { eager: true, import: 'default' });
const productIconsSvg = import.meta.glob('../assets/icons/product/*.svg', { eager: true, import: 'default' });
const productIcons = { ...productIconsPng, ...productIconsSvg };

const layoutEntityIconsPng = import.meta.glob('../assets/icons/layoutentity/*.png', { eager: true, import: 'default' });
const layoutEntityIconsSvg = import.meta.glob('../assets/icons/layoutentity/*.svg', { eager: true, import: 'default' });
const layoutEntityIcons = { ...layoutEntityIconsPng, ...layoutEntityIconsSvg };

const generalIconsPng = import.meta.glob('../assets/icons/general/*.png', { eager: true, import: 'default' });
const generalIconsSvg = import.meta.glob('../assets/icons/general/*.svg', { eager: true, import: 'default' });
const generalIcons = { ...generalIconsPng, ...generalIconsSvg };

const productTypeIconsPng = import.meta.glob('../assets/icons/producttypes/*.png', { eager: true, import: 'default' });
const productTypeIconsSvg = import.meta.glob('../assets/icons/producttypes/*.svg', { eager: true, import: 'default' });
const productTypeIcons = { ...productTypeIconsPng, ...productTypeIconsSvg };

const topdownIconsPng = import.meta.glob('../assets/icons/topdown/*.png', { eager: true, import: 'default' });
const topdownIconsSvg = import.meta.glob('../assets/icons/topdown/*.svg', { eager: true, import: 'default' });
const topdownIcons = { ...topdownIconsPng, ...topdownIconsSvg };

/**
 * Convert product ID to icon path key (tries PNG first, then SVG)
 * Product IDs like "Product_Iron" -> "../assets/icons/product/Iron.png" or ".svg"
 */
function getProductIconPath(productId) {
    if (!productId) return null;
    // Strip "Product_Virtual_" first, then fallback to "Product_"
    const filename = productId
        .replace(/^Product_Virtual_/, '')
        .replace(/^Product_/, '');

    // Try PNG first
    const pngPath = `../assets/icons/product/${filename}.png`;
    if (productIcons[pngPath]) return pngPath;

    // Fallback to SVG
    const svgPath = `../assets/icons/product/${filename}.svg`;
    if (productIcons[svgPath]) return svgPath;

    return null;
}

/**
 * Convert entity ID to icon path key (tries PNG first, then SVG)
 * Entity IDs like "FoodMill" -> "../assets/icons/layoutentity/FoodMill.png" or ".svg"
 */
function getEntityIconPath(entityId) {
    if (!entityId) return null;

    // Try PNG first
    const pngPath = `../assets/icons/layoutentity/${entityId}.png`;
    if (layoutEntityIcons[pngPath]) return pngPath;

    // Fallback to SVG
    const svgPath = `../assets/icons/layoutentity/${entityId}.svg`;
    if (layoutEntityIcons[svgPath]) return svgPath;

    return null;
}

/**
 * Convert entity ID to topdown icon path key (tries PNG first, then SVG)
 * Entity IDs like "FoodMill" -> "../assets/icons/topdown/FoodMill.png" or ".svg"
 */
function getEntityIconTopPath(entityId) {
    if (!entityId) return null;

    // Try PNG first
    const pngPath = `../assets/icons/topdown/${entityId}.png`;
    if (topdownIcons[pngPath]) return pngPath;

    // Fallback to SVG
    const svgPath = `../assets/icons/topdown/${entityId}.svg`;
    if (topdownIcons[svgPath]) return svgPath;

    return null;
}

/**
 * Get general icon path (tries PNG first, then SVG)
 * Icon names like "Worker" -> "../assets/icons/general/Worker.png" or ".svg"
 */
function getGeneralIconPath(iconName) {
    if (!iconName) return null;

    // Try PNG first
    const pngPath = `../assets/icons/general/${iconName}.png`;
    if (generalIcons[pngPath]) return pngPath;

    // Fallback to SVG
    const svgPath = `../assets/icons/general/${iconName}.svg`;
    if (generalIcons[svgPath]) return svgPath;

    return null;
}

/**
 * Get product type icon path (tries PNG first, then SVG)
 * Type names like "Fluid" -> "../assets/icons/producttypes/Fluid.png" or ".svg"
 */
function getProductTypeIconPath(typeName) {
    if (!typeName) return null;

    // Try PNG first
    const pngPath = `../assets/icons/producttypes/${typeName}.png`;
    if (productTypeIcons[pngPath]) return pngPath;

    // Fallback to SVG
    const svgPath = `../assets/icons/producttypes/${typeName}.svg`;
    if (productTypeIcons[svgPath]) return svgPath;

    return null;
}

/**
 * Convert crop ID to icon path key (in product directory, tries PNG first, then SVG)
 * Crop IDs like "Crop_GreenManure" -> "../assets/icons/product/GreenManure.png" or ".svg"
 */
function getCropIconPath(cropId) {
    if (!cropId) return null;
    const filename = cropId.replace(/^Crop_/, '');

    // Try PNG first
    const pngPath = `../assets/icons/product/${filename}.png`;
    if (productIcons[pngPath]) return pngPath;

    // Fallback to SVG
    const svgPath = `../assets/icons/product/${filename}.svg`;
    if (productIcons[svgPath]) return svgPath;

    return null;
}

/**
 * Convert research icon path to web path (tries PNG first, then SVG)
 * Research iconPath like "Assets/Base/Products/Icons/ConstructionParts4.svg" 
 * -> Try product icon, then layout entity icon, then general icon
 */
function getResearchIconPath(iconPath) {
    if (!iconPath) return null;

    // Extract filename from path (e.g., "ConstructionParts4.svg" -> "ConstructionParts4")
    const filename = iconPath.split('/').pop().replace(/\.(svg|png)$/i, '');

    // Try multiple icon directories in order of likelihood
    // 1. Product icons (for product-based research)
    const productPngPath = `../assets/icons/product/${filename}.png`;
    if (productIcons[productPngPath]) return productPngPath;

    const productSvgPath = `../assets/icons/product/${filename}.svg`;
    if (productIcons[productSvgPath]) return productSvgPath;

    // 2. Layout entity icons (for building/machine research)
    const entityPngPath = `../assets/icons/layoutentity/${filename}.png`;
    if (layoutEntityIcons[entityPngPath]) return entityPngPath;

    const entitySvgPath = `../assets/icons/layoutentity/${filename}.svg`;
    if (layoutEntityIcons[entitySvgPath]) return entitySvgPath;

    // 3. General icons (for general tech)
    const generalPngPath = `../assets/icons/general/${filename}.png`;
    if (generalIcons[generalPngPath]) return generalPngPath;

    const generalSvgPath = `../assets/icons/general/${filename}.svg`;
    if (generalIcons[generalSvgPath]) return generalSvgPath;

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

    // Return the imported image URL (works for both PNG and SVG)
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
        if (productPath) {
            const productIcon = productIcons[productPath];
            if (productIcon) return productIcon;
        }
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
 * Get research icon URL
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