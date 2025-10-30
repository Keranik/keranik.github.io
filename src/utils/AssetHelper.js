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

/**
 * Convert product ID to icon path key
 * Product IDs like "Product_Iron" -> "../assets/icons/product/Iron.png"
 */
function getProductIconPath(productId) {
  if (!productId) return null;
  const filename = productId.replace(/^Product_/, '') + '.png';
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
  getProductTypeIcon
};