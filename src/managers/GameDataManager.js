// src/managers/GameDataManager.js

/**
 * GameDataManager - Single source of truth for all game data
 * 
 * Core Responsibilities:
 * 1. Load raw game data files (base + mods)
 * 2. Cache loaded data
 * 3. Detect when mods change and reload
 * 4. Lazily initialize subsystems when requested
 * 
 * Subsystems are initialized only when first requested:
 * - Research definitions (for settings UI)
 * - More will be added as we migrate other files
 */
export class GameDataManager {
    // ==========================================
    // PRIVATE STATE
    // ==========================================

    static _rawGameData = null;           // The merged base + mod data
    static _currentModList = null;        // JSON string of enabled mod IDs (for comparison)
    static _isLoading = false;            // Prevent concurrent loads

    // Lazy-initialized subsystems
    static _initialized = {
        research: false,
        productionCalculator: false,
        cropFoodChains: false,
        recipeTechTiers: false
        // More subsystems will be added as we migrate
    };

    // Cached computed data
    static _cache = {
        researchDefinitions: null,
        productionCalculatorMaps: null,
        cropFoodChains: null,
        recipeTechTiers: null
        // More cached data will be added as we migrate
    };

    // ==========================================
    // PUBLIC API - CORE DATA ACCESS
    // ==========================================

    /**
     * Get raw game data (auto-loads if not present, caches if already loaded)
     * @param {string[]} enabledModIds - Array of mod IDs to load (e.g., ['coiextended'])
     * @returns {Promise<Object>} Raw game data object
     */
    static async getGameData(enabledModIds = []) {
        const modListKey = JSON.stringify([...enabledModIds].sort());

        // Return cached data if mods haven't changed
        if (this._rawGameData && this._currentModList === modListKey) {
            console.log('✅ GameDataManager: Returning cached data (mods unchanged)');
            return this._rawGameData;
        }

        // If already loading, wait for it
        if (this._isLoading) {
            console.log('⏳ GameDataManager: Already loading, waiting...');
            await this._waitForLoad();
            return this._rawGameData;
        }

        // Load fresh data
        return await this._loadGameData(enabledModIds);
    }

    /**
    * ✅ NEW: Get ProductionCalculator data (initializes on first call)
    * @returns {Promise<Object>} Initialized production calculator data
    */
    static async getProductionCalculatorData() {
        if (!this.isDataLoaded()) {
            throw new Error('GameDataManager: Cannot get production calculator data - game data not loaded');
        }

        if (!this._initialized.productionCalculator) {
            await this._initializeProductionCalculator();
        }

        return this._cache.productionCalculatorMaps;
    }

    /**
 * ✅ NEW: Get recipe tech tier mapping (initializes on first call)
 * @returns {Promise<Map<string, number>>} Map of recipe IDs to tech tiers
 */
    static async getRecipeTechTiers() {
        if (!this.isDataLoaded()) {
            throw new Error('GameDataManager: Cannot get recipe tech tiers - game data not loaded');
        }

        if (!this._initialized.recipeTechTiers) {
            await this._initializeRecipeTechTiers();
        }

        return this._cache.recipeTechTiers;
    }

    /**
     * Check if data is currently loaded
     * @returns {boolean}
     */
    static isDataLoaded() {
        return this._rawGameData !== null;
    }

    /**
     * Check if the mod configuration has changed
     * @param {string[]} enabledModIds - Mod IDs to check
     * @returns {boolean}
     */
    static hasModsChanged(enabledModIds = []) {
        const modListKey = JSON.stringify([...enabledModIds].sort());
        return this._currentModList !== modListKey;
    }

    // ==========================================
    // PUBLIC API - SUBSYSTEM GETTERS (Lazy)
    // ==========================================

    /**
     * Get research definitions (initializes on first call)
     * @returns {Promise<Object>} Research bonus definitions
     */
    static async getResearchDefinitions() {
        if (!this.isDataLoaded()) {
            throw new Error('GameDataManager: Cannot get research definitions - game data not loaded');
        }

        if (!this._initialized.research) {
            await this._initializeResearch();
        }

        return this._cache.researchDefinitions;
    }

    /**
 * ✅ NEW: Get crop food chains (initializes on first call)
 * @returns {Promise<Object>} { cropFoodChains: {...}, foodCropIds: [...] }
 */
    static async getCropFoodChains() {
        if (!this.isDataLoaded()) {
            throw new Error('GameDataManager: Cannot get crop food chains - game data not loaded');
        }

        if (!this._initialized.cropFoodChains) {
            await this._initializeCropFoodChains();
        }

        return this._cache.cropFoodChains;
    }

    // ==========================================
    // PUBLIC - UTILITIES
    // ==========================================

    /**
     * Force clear all cached data (for development/testing)
     */
    static clearCache() {
        console.log('🗑️ GameDataManager: Clearing all cached data');
        this._rawGameData = null;
        this._currentModList = null;
        this._isLoading = false;
        this._resetSubsystems();
    }

    /**
     * Get current loading/cache stats (for debugging)
     */
    static getStats() {
        return {
            dataLoaded: this.isDataLoaded(),
            currentModList: this._currentModList,
            isLoading: this._isLoading,
            initialized: { ...this._initialized },
            cachedSubsystems: Object.keys(this._cache).filter(k => this._cache[k] !== null)
        };
    }

    // ==========================================
    // PRIVATE - DATA LOADING
    // ==========================================

    /**
     * Internal: Load game data from files
     */
    static async _loadGameData(enabledModIds = []) {
        this._isLoading = true;

        console.log('🔄 GameDataManager: Loading game data...', {
            enabledModIds,
            previousModList: this._currentModList
        });

        try {
            // Step 1: Load base game data
            const baseData = await this._loadBaseGame();

            let finalData;

            // Step 2: Check if mods are enabled
            if (!enabledModIds || enabledModIds.length === 0) {
                console.log('📦 GameDataManager: No mods enabled, using base game only');
                finalData = baseData;
            } else {
                // Step 3: Load and merge mods
                const modDataArray = await this._loadMods(enabledModIds);

                if (modDataArray.length === 0) {
                    console.log('📦 GameDataManager: No mods loaded successfully, using base game only');
                    finalData = baseData;
                } else {
                    finalData = this._mergeGameData(baseData, modDataArray);
                }
            }

            // Step 4: Cache the result
            this._rawGameData = finalData;
            this._currentModList = JSON.stringify([...enabledModIds].sort());

            // Step 5: Clear all subsystem caches (data changed, need to reinitialize)
            this._resetSubsystems();

            console.log('✅ GameDataManager: Data loaded successfully', {
                products: finalData.products?.length || 0,
                recipes: finalData.recipes?.length || 0,
                machines: finalData.machines?.length || 0,
                farms: finalData.farms?.length || 0,
                crops: finalData.crops?.length || 0,
                research: finalData.research?.length || 0
            });

            return finalData;

        } catch (error) {
            console.error('❌ GameDataManager: Failed to load game data:', error);
            throw error;
        } finally {
            this._isLoading = false;
        }
    }

    /**
     * Load base game data file
     */
    static async _loadBaseGame() {
        console.log('📦 GameDataManager: Loading base game data...');
        const module = await import('../GameData.js');
        console.log('✅ GameDataManager: Base game loaded');
        return module.default;
    }

    /**
     * Load mod data files
     */
    static async _loadMods(enabledModIds) {
        console.log('📦 GameDataManager: Loading mods...', enabledModIds);

        // Load manifest to find mod file names
        let manifest;
        try {
            const manifestModule = await import('../manifest.json');
            manifest = manifestModule.default;
        } catch (error) {
            console.warn('⚠️ GameDataManager: Could not load manifest.json:', error);
            return [];
        }

        // Load each mod in parallel
        const modPromises = enabledModIds.map(async (modId) => {
            const modInfo = manifest.mods?.find(m => m.id === modId);

            if (!modInfo) {
                console.warn(`⚠️ GameDataManager: Mod "${modId}" not found in manifest`);
                return null;
            }

            try {
                const module = await import(`../${modInfo.dataFile}`);
                console.log(`✅ GameDataManager: Loaded mod "${modId}"`);
                return module.default;
            } catch (error) {
                console.error(`❌ GameDataManager: Failed to load mod "${modId}":`, error);
                return null;
            }
        });

        const results = await Promise.all(modPromises);
        return results.filter(Boolean); // Remove nulls
    }

    /**
     * Merge base game data with mod data
     */
    static _mergeGameData(baseData, modDataArray) {
        console.log('🔀 GameDataManager: Merging base game + mods...');

        // Deep clone base data to avoid mutations
        const merged = JSON.parse(JSON.stringify(baseData));

        // Fields that should be merged as arrays
        const arrayFields = [
            'products', 'recipes', 'machines', 'buildings',
            'farms', 'crops', 'foods', 'foodCategories',
            'resources', 'farmResearch', 'research'
        ];

        modDataArray.forEach(modData => {
            if (!modData) return;

            arrayFields.forEach(field => {
                if (modData[field] && Array.isArray(modData[field])) {
                    if (!merged[field]) {
                        merged[field] = [];
                    }

                    // Add or override items by ID
                    modData[field].forEach(item => {
                        const existingIndex = merged[field].findIndex(existing => existing.id === item.id);

                        if (existingIndex >= 0) {
                            // Mod overrides base game item
                            merged[field][existingIndex] = item;
                            console.log(`  🔄 Mod overrides ${field}: ${item.id}`);
                        } else {
                            // New item from mod
                            merged[field].push(item);
                        }
                    });
                }
            });
        });

        console.log('✅ GameDataManager: Merge complete');
        return merged;
    }

    /**
     * Wait for current loading operation to complete
     */
    static _waitForLoad() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (!this._isLoading) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50); // Check every 50ms
        });
    }

    // ==========================================
    // PRIVATE - SUBSYSTEM INITIALIZATION
    // ==========================================

    /**
     * Reset all subsystem flags (called when data reloads)
     */
    static _resetSubsystems() {
        console.log('🔄 GameDataManager: Resetting subsystem initialization flags...');

        Object.keys(this._initialized).forEach(key => {
            this._initialized[key] = false;
        });

        Object.keys(this._cache).forEach(key => {
            this._cache[key] = null;
        });

        console.log('✅ GameDataManager: All subsystems reset');
    }

    /**
     * Initialize research definitions (moved from SettingsContext)
     * Lazy-initialized when first requested
     */
    static async _initializeResearch() {
        console.log('🔬 GameDataManager: Initializing research definitions...');

        if (!this._rawGameData || !this._rawGameData.research) {
            console.warn('⚠️ GameDataManager: No research data available');
            this._cache.researchDefinitions = {};
            this._initialized.research = true;
            return;
        }

        const researchSettings = {};

        // Map of bonus IDs to their display configuration
        const bonusConfig = {
            // Farming
            'FarmYieldMultiplier': {
                name: 'Crop Yield Increase',
                icon: 'Farm',
                description: 'Increases crop yield from farms',
                category: 'farming',
                unit: '%',
                isNegative: false
            },
            'FarmWaterConsumptionMultiplier': {
                name: 'Crop Water Consumption',
                icon: 'Water',
                description: 'Water consumed by crops (increases with yield research)',
                category: 'farming',
                unit: '%',
                isNegative: false
            },
            'RainYieldMultiplier': {
                name: 'Rainwater Yield',
                icon: 'Water',
                description: 'Increases rainwater collection',
                category: 'farming',
                unit: '%',
                isNegative: false
            },
            'SettlementWaterConsumptionMultiplier': {
                name: 'Settlement Water Use',
                icon: 'Water',
                description: 'Reduces water consumption of settlements',
                category: 'farming',
                unit: '%',
                isNegative: true
            },
            // Vehicles
            'VehiclesFuelConsumptionMultiplier': {
                name: 'Vehicle Fuel Use',
                icon: 'Diesel',
                description: 'Reduces vehicle fuel consumption',
                category: 'vehicles',
                unit: '%',
                isNegative: true
            },
            'ShipsFuelConsumptionMultiplier': {
                name: 'Ship Fuel Use',
                icon: 'Diesel',
                description: 'Reduces ship fuel consumption',
                category: 'vehicles',
                unit: '%',
                isNegative: true
            },
            'VehicleLimitBonus': {
                name: 'Vehicle Limit',
                icon: 'Excavator',
                description: 'Increases vehicle limit',
                category: 'vehicles',
                unit: '',
                isNegative: false
            },
            // Production
            'MaintenanceProductionMultiplier': {
                name: 'Maintenance Production',
                icon: 'MaintenanceT1',
                description: 'Increases maintenance production bonus',
                category: 'production',
                unit: '%',
                isNegative: false
            },
            // Efficiency
            'SolarPowerMultiplier': {
                name: 'Solar Power',
                icon: 'PowerGenerator',
                description: 'Increases solar power production',
                category: 'efficiency',
                unit: '%',
                isNegative: false
            },
            // General
            'HousingCapacityMultiplier': {
                name: 'Housing Capacity',
                icon: 'Settlement',
                description: 'Increases housing capacity',
                category: 'general',
                unit: '%',
                isNegative: false
            },
            'UnityCapacityMultiplier': {
                name: 'Unity Capacity',
                icon: 'Unity',
                description: 'Increases Unity capacity',
                category: 'general',
                unit: '%',
                isNegative: false
            }
        };

        // Process all research nodes to find repeatable research with bonuses
        this._rawGameData.research.forEach(node => {
            // Only process nodes with multiple levels and bonuses
            if (node.maxLevels > 1 && node.perLevelBonuses) {
                Object.entries(node.perLevelBonuses).forEach(([bonusId, perLevelAmount]) => {
                    // Skip if already added
                    if (researchSettings[bonusId]) return;

                    // Get config or create default
                    const config = bonusConfig[bonusId] || {
                        name: bonusId.replace(/([A-Z])/g, ' $1').trim(),
                        icon: 'Research',
                        description: `Research bonus: ${bonusId}`,
                        category: 'general',
                        unit: '%',
                        isNegative: false
                    };

                    // Calculate total possible bonus (maxLevels * perLevelAmount)
                    // Convert from 0-1 scale to percentage (multiply by 100)
                    const maxTotalBonus = Math.abs(node.maxLevels * perLevelAmount * 100);

                    // Determine step size (5% increments for most, or based on per-level amount)
                    const perLevelPercent = Math.abs(perLevelAmount * 100);
                    let step = 5;
                    if (perLevelPercent < 1) {
                        step = 1; // For small bonuses
                    } else if (perLevelPercent >= 5) {
                        step = Math.round(perLevelPercent); // Match per-level for large bonuses
                    }

                    researchSettings[bonusId] = {
                        id: bonusId,
                        name: config.name,
                        icon: config.icon,
                        description: config.description,
                        bonusType: 'percentage',
                        minValue: 0,
                        maxValue: Math.ceil(maxTotalBonus / step) * step, // Round up to nearest step
                        step: step,
                        currentValue: 0,
                        unit: config.unit,
                        category: config.category,
                        isNegative: config.isNegative, // For display (show as -X% or +X%)
                        perLevelAmount: perLevelAmount, // Store for future calculations
                        maxLevels: node.maxLevels,
                        researchNodeId: node.id // Track which node this came from
                    };
                });
            }
        });

        this._cache.researchDefinitions = researchSettings;
        this._initialized.research = true;

        console.log(`✅ GameDataManager: Initialized ${Object.keys(researchSettings).length} research bonuses`);
    }

    /**
     * ✅ NEW: Initialize ProductionCalculator data structures
     * Moved from ProductionCalculator.initialize()
     */
    static async _initializeProductionCalculator() {
        console.log('🏭 GameDataManager: Initializing ProductionCalculator data...');

        if (!this._rawGameData) {
            console.error('❌ GameDataManager: Cannot initialize ProductionCalculator - no game data');
            this._cache.productionCalculatorMaps = null;
            this._initialized.productionCalculator = true;
            return;
        }

        // Extract arrays from game data
        const machines = this._rawGameData.machines || [];
        const recipes = this._rawGameData.recipes || [];
        const products = this._rawGameData.products || [];
        const farms = this._rawGameData.farms || [];
        const crops = this._rawGameData.crops || [];
        const foods = this._rawGameData.foods || [];
        const foodCategories = this._rawGameData.foodCategories || [];
        const farmResearch = this._rawGameData.farmResearch || [];
        const research = this._rawGameData.research || [];

        // Build lookup maps for fast access
        const productMap = new Map(products.map(p => [p.id, p]));
        const recipeMap = new Map(recipes.map(r => [r.id, r]));
        const machineMap = new Map(machines.map(m => [m.id, m]));
        const farmMap = new Map(farms.map(f => [f.id, f]));
        const cropMap = new Map(crops.map(c => [c.id, c]));
        const foodMap = new Map(foods.map(f => [f.id, f]));
        const researchMap = new Map(research.map(r => [r.id, r]));

        // Build reverse lookup: product -> recipes that produce it
        const productToRecipes = new Map();
        recipes.forEach(recipe => {
            recipe.outputs.forEach(output => {
                if (!productToRecipes.has(output.productId)) {
                    productToRecipes.set(output.productId, []);
                }
                productToRecipes.get(output.productId).push(recipe.id);
            });
        });

        // Extract fertilizers from products
        const fertilizers = products
            .filter(p => p.fertilizer != null)
            .map(p => ({
                id: p.id,
                name: p.name,
                fertilityPerQuantity: p.fertilizer.fertilityPerQuantityPercent,
                maxFertility: p.fertilizer.maxFertilityPercent
            }));

        // Detect tautological loops (A↔B products)
        const tautologicalProducts = this._detectTautologicalLoops(recipes, productToRecipes);

        // Storage throughput limits (per minute)
        const STORAGE_THROUGHPUT = {
            1: 400,
            2: 900,
            3: 1800,
            4: 3000
        };

        // Store all computed data
        this._cache.productionCalculatorMaps = {
            // Raw arrays
            machines,
            recipes,
            products,
            farms,
            crops,
            foods,
            foodCategories,
            farmResearch,
            research,

            // Lookup maps
            productMap,
            recipeMap,
            machineMap,
            farmMap,
            cropMap,
            foodMap,
            researchMap,

            // Derived data
            productToRecipes,
            fertilizers,
            tautologicalProducts,
            STORAGE_THROUGHPUT,

            // Reference to raw game data (for edge cases)
            _gameData: this._rawGameData
        };

        this._initialized.productionCalculator = true;

        console.log('✅ GameDataManager: ProductionCalculator initialized', {
            machines: machines.length,
            recipes: recipes.length,
            products: products.length,
            farms: farms.length,
            crops: crops.length,
            foods: foods.length,
            fertilizers: fertilizers.length,
            tautologicalProducts: tautologicalProducts.size,
            research: research.length
        });
    }

    /**
 * ✅ NEW: Initialize recipe tech tier mapping
 * Maps each recipe to its tech tier (0-5)
 */
    static async _initializeRecipeTechTiers() {
        console.log('🔬 GameDataManager: Initializing recipe tech tiers...');

        if (!this._rawGameData || !this._rawGameData.recipes || !this._rawGameData.research) {
            console.error('❌ GameDataManager: Cannot initialize recipe tech tiers - missing data');
            this._cache.recipeTechTiers = new Map();
            this._initialized.recipeTechTiers = true;
            return;
        }

        const recipeToTechTier = new Map();
        const recipes = this._rawGameData.recipes || [];
        const research = this._rawGameData.research || [];
        const machines = this._rawGameData.machines || [];

        // Build research lookup maps
        const recipeResearchMap = new Map();  // recipeId -> research node
        const machineResearchMap = new Map(); // machineId -> research node

        research.forEach(node => {
            if (node.unlocks) {
                node.unlocks.forEach(unlock => {
                    if (unlock.type === 'recipe') {
                        recipeResearchMap.set(unlock.id, node);
                    } else if (unlock.type === 'machine') {
                        machineResearchMap.set(unlock.id, node);
                    }
                });
            }
        });

        // Map recipes to tech tiers
        recipes.forEach(recipe => {
            // Strategy 1: Check if recipe is directly unlocked by research
            const researchNode = recipeResearchMap.get(recipe.id);

            if (researchNode) {
                recipeToTechTier.set(recipe.id, researchNode.tier || 0);
                return;
            }

            // Strategy 2: Check if recipe's machine is unlocked by research
            // Find machines that can run this recipe
            const recipeMachines = machines.filter(m =>
                m.recipes && m.recipes.includes(recipe.id)
            );

            if (recipeMachines.length > 0) {
                const machineResearch = machineResearchMap.get(recipeMachines[0].id);
                if (machineResearch) {
                    recipeToTechTier.set(recipe.id, machineResearch.tier || 0);
                    return;
                }
            }

            // Strategy 3: Default to T0 (basic/starter)
            recipeToTechTier.set(recipe.id, 0);
        });

        this._cache.recipeTechTiers = recipeToTechTier;
        this._initialized.recipeTechTiers = true;

        // Count recipes per tier for logging
        const tierCounts = {};
        recipeToTechTier.forEach(tier => {
            tierCounts[tier] = (tierCounts[tier] || 0) + 1;
        });

        console.log(`✅ GameDataManager: Initialized ${recipeToTechTier.size} recipe tech tiers`, tierCounts);
    }

    /**
 * ✅ NEW: Initialize crop food chains (just loads from pre-computed data)
 * This data is already computed by DataExportManager at export time
 */
    static async _initializeCropFoodChains() {
        console.log('🌾 GameDataManager: Initializing crop food chains...');

        if (!this._rawGameData) {
            console.error('❌ GameDataManager: Cannot initialize crop food chains - no game data');
            this._cache.cropFoodChains = { cropFoodChains: {}, foodCropIds: [] };
            this._initialized.cropFoodChains = true;
            return;
        }

        // ✅ Just extract the pre-computed data from GameData.js
        const cropFoodChains = this._rawGameData.cropFoodChains || {};
        const foodCropIds = this._rawGameData.foodCropIds || [];

        this._cache.cropFoodChains = {
            cropFoodChains,
            foodCropIds
        };

        this._initialized.cropFoodChains = true;

        console.log(`✅ GameDataManager: Initialized ${Object.keys(cropFoodChains).length} crop food chains (${foodCropIds.length} are food crops)`);
    }

    /**
     * Detect A↔B tautological loops
     * Simple rule: If Product A has ONLY ONE recipe that produces it from Product B,
     * AND Product B has ONLY ONE recipe that produces it from Product A,
     * then both are tautological and should be treated as raw materials.
     */
    static _detectTautologicalLoops(recipes, productToRecipes) {
        console.log('🔍 GameDataManager: Detecting A↔B tautological loops...');

        const tautologicalPairs = [];
        const tautologicalProducts = new Set();

        // Check each product
        for (const [productId, recipeIds] of productToRecipes.entries()) {
            if (recipeIds.length !== 1) continue; // Must have exactly 1 recipe

            const recipe = recipes.find(r => r.id === recipeIds[0]);
            if (!recipe || recipe.inputs.length !== 1) continue; // Must have exactly 1 input

            const inputProductId = recipe.inputs[0].productId;

            // Check reverse: Does inputProduct have exactly 1 recipe that uses productId as input?
            const reverseRecipeIds = productToRecipes.get(inputProductId);
            if (!reverseRecipeIds || reverseRecipeIds.length !== 1) continue;

            const reverseRecipe = recipes.find(r => r.id === reverseRecipeIds[0]);
            if (!reverseRecipe || reverseRecipe.inputs.length !== 1) continue;

            if (reverseRecipe.inputs[0].productId === productId) {
                // Found A↔B loop!
                tautologicalProducts.add(productId);
                tautologicalProducts.add(inputProductId);

                // Avoid duplicate logging (A↔B and B↔A)
                if (!tautologicalPairs.some(pair =>
                    (pair[0] === productId && pair[1] === inputProductId) ||
                    (pair[0] === inputProductId && pair[1] === productId)
                )) {
                    tautologicalPairs.push([productId, inputProductId]);
                }
            }
        }

        if (tautologicalPairs.length > 0) {
            console.log(`⚠️ GameDataManager: Found ${tautologicalPairs.length} tautological A↔B loops:`, tautologicalPairs);
        }

        return tautologicalProducts;
    }
}