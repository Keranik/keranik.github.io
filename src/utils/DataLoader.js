/**
 * DataLoader - Handles loading and merging base game + mod data
 */

import { FertilizerCalculator } from './FertilizerCalculator';
import ProductionCalculator from './ProductionCalculator';
import { FoodChainResolver } from './FoodChainResolver';  // ✅ Add this import

export class DataLoader {
    static baseGameData = null;
    static loadedMods = new Map();
    static manifestCache = null;
    static isInitialized = false;

    /**
     * Load base game data
     */
    static async loadBaseGame() {
        if (this.baseGameData) {
            return this.baseGameData;
        }

        try {
            const module = await import('../GameData.js');
            this.baseGameData = module.default;
            console.log('✅ Base game data loaded:', {
                products: this.baseGameData.products?.length || 0,
                recipes: this.baseGameData.recipes?.length || 0,
                machines: this.baseGameData.machines?.length || 0,
                research: this.baseGameData.research?.length || 0,
                foods: this.baseGameData.foods?.length || 0,
                crops: this.baseGameData.crops?.length || 0
            });
            return this.baseGameData;
        } catch (error) {
            console.error('❌ Failed to load base game data:', error);
            throw new Error('Could not load base game data. Please ensure GameData.js exists in src/');
        }
    }

    /**
     * Load a specific mod by data file name
     */
    static async loadMod(modId, dataFile) {
        if (this.loadedMods.has(modId)) {
            return this.loadedMods.get(modId);
        }

        try {
            const module = await import(`../${dataFile}`);
            const modData = module.default;
            this.loadedMods.set(modId, modData);

            console.log(`✅ Mod loaded: ${modId}`, {
                products: modData.products?.length || 0,
                recipes: modData.recipes?.length || 0,
                machines: modData.machines?.length || 0,
                research: modData.research?.length || 0
            });

            return modData;
        } catch (error) {
            console.error(`❌ Failed to load mod: ${modId}`, error);
            return null;
        }
    }

    /**
     * Load mod manifest
     */
    static async loadModManifest() {
        if (this.manifestCache) {
            return this.manifestCache;
        }

        try {
            const module = await import('../manifest.json');
            this.manifestCache = module.default;
            console.log('✅ Mod manifest loaded:', this.manifestCache.mods?.length || 0, 'mods available');
            return this.manifestCache;
        } catch (error) {
            console.warn('Could not load mod manifest:', error);
            return { mods: [] };
        }
    }

    /**
     * Load game data with selected mods
     * @param {string[]} enabledModIds - Array of mod IDs to load
     */
    static async loadGameData(enabledModIds = []) {
        const baseData = await this.loadBaseGame();

        if (!enabledModIds || enabledModIds.length === 0) {
            console.log('📦 Using base game data only');
            this.initializeCalculators(baseData);
            return baseData;
        }

        const manifest = await this.loadModManifest();

        const modDataPromises = enabledModIds.map(modId => {
            const modInfo = manifest.mods.find(m => m.id === modId);
            if (!modInfo) {
                console.warn(`Mod ${modId} not found in manifest`);
                return null;
            }
            return this.loadMod(modId, modInfo.dataFile);
        });

        const modDataArray = (await Promise.all(modDataPromises)).filter(Boolean);

        if (modDataArray.length === 0) {
            console.log('📦 No mods loaded, using base game data only');
            this.initializeCalculators(baseData);
            return baseData;
        }

        const merged = this.mergeGameData(baseData, modDataArray);

        console.log('📦 Merged game data:', {
            mods: modDataArray.map(m => m.metadataJs?.updateNotes || 'Unknown'),
            totalProducts: merged.products?.length || 0,
            totalRecipes: merged.recipes?.length || 0,
            totalMachines: merged.machines?.length || 0,
            totalFarms: merged.farms?.length || 0,
            totalCrops: merged.crops?.length || 0,
            totalResearch: merged.research?.length || 0
        });

        this.initializeCalculators(merged);
        return merged;
    }

    /**
     * Initialize all calculators after data is loaded
     * @param {object} gameData - The loaded/merged game data
     */
    static initializeCalculators(gameData) {
        if (this.isInitialized) {
            console.log('⏭️ Calculators already initialized, skipping...');
            return;
        }

        console.log('🔧 Initializing calculators...');

        try {
            // Initialize ProductionCalculator first
            ProductionCalculator.initialize(gameData);
            console.log('✅ ProductionCalculator initialized');

            // ✅ Initialize FoodChainResolver with chain cost cache
            FoodChainResolver.initialize(
                gameData.recipes || [],
                gameData.foods || [],
                gameData.crops || []
            );
            console.log('✅ FoodChainResolver initialized with chain cost cache');

            // Initialize FertilizerCalculator
            FertilizerCalculator.initialize();
            console.log('✅ FertilizerCalculator initialized');

            this.isInitialized = true;
            console.log('✅ All calculators initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize calculators:', error);
        }
    }

    /**
     * Merge base game data with mod data
     */
    static mergeGameData(baseData, modDataArray) {
        const merged = JSON.parse(JSON.stringify(baseData));

        modDataArray.forEach(modData => {
            if (!modData) return;

            const arrayFields = [
                'products', 'recipes', 'machines', 'buildings',
                'farms', 'crops', 'foods', 'foodCategories',
                'resources', 'farmResearch', 'research'
            ];

            arrayFields.forEach(field => {
                if (modData[field] && Array.isArray(modData[field])) {
                    if (!merged[field]) {
                        merged[field] = [];
                    }

                    modData[field].forEach(item => {
                        const existingIndex = merged[field].findIndex(existing => existing.id === item.id);
                        if (existingIndex >= 0) {
                            merged[field][existingIndex] = item;
                            console.log(`🔄 Mod overrides ${field}: ${item.id}`);
                        } else {
                            merged[field].push(item);
                        }
                    });
                }
            });
        });

        return merged;
    }

    /**
     * Clear cached data (useful for hot-reloading)
     */
    static clearCache() {
        this.baseGameData = null;
        this.loadedMods.clear();
        this.manifestCache = null;
        this.isInitialized = false;

        // ✅ Clear FoodChainResolver cache
        if (FoodChainResolver.chainEfficiencyCache) {
            FoodChainResolver.chainEfficiencyCache.clear();
        }

        // ✅ Reset ProductionCalculator
        if (ProductionCalculator.reset) {
            ProductionCalculator.reset();
        }

        console.log('🗑️ Data cache cleared');
    }
}