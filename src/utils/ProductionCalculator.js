import { GameDataManager } from '../managers/GameDataManager';
/**
 * Production Calculator Engine - REWRITTEN FOR EXCELLENCE
 * Handles all production chain calculations, recipe optimization, and resource requirements
 * Now with per-minute normalization, resource source management, storage calculations, and SMART RAW MATERIAL DETECTION
 *
 * NEW: Simple A↔B loop detection - if Product A only makes Product B and Product B only makes Product A, treat both as raw
 */
class ProductionCalculator {
    constructor() {
        // 10-10-25 note
        // All data is now stored in GameDataManager
        // These getters will fetch from the manager
    }

    /**
     * Initialize calculator (now just fetches from GameDataManager)
     * Safe to call multiple times - will use cached data after first call
     */
    async initialize(gameData = null) {
        console.log('🔧 ProductionCalculator: Requesting initialization from GameDataManager...');

        // If gameData is provided, ensure GameDataManager has it loaded
        if (gameData) {
            // This is a legacy path - ideally pages should load via GameDataManager first
            console.warn('⚠️ ProductionCalculator: Received gameData directly (legacy usage). Consider using GameDataManager.getGameData() instead.');
            // We can't force GameDataManager to use this data, so just log a warning
        }

        // Request initialized data from GameDataManager
        const data = await GameDataManager.getProductionCalculatorData();

        console.log('✅ ProductionCalculator: Initialization complete');
        return data;
    }

    // ==========================================
    // HELPER: Get data from GameDataManager
    // ==========================================

    _getData() {
        const data = GameDataManager._cache.productionCalculatorMaps;
        if (!data) {
            throw new Error('ProductionCalculator: Data not initialized. Call initialize() first or ensure GameDataManager has loaded game data.');
        }
        return data;
    }

    // ==========================================
    // PUBLIC GETTERS - Arrays
    // ==========================================

    get machines() {
        return this._getData().machines;
    }

    get recipes() {
        return this._getData().recipes;
    }

    get products() {
        return this._getData().products;
    }

    get farms() {
        return this._getData().farms;
    }

    get crops() {
        return this._getData().crops;
    }

    get foods() {
        return this._getData().foods;
    }

    get foodCategories() {
        return this._getData().foodCategories;
    }

    get farmResearch() {
        return this._getData().farmResearch;
    }

    get research() {
        return this._getData().research;
    }

    get fertilizers() {
        return this._getData().fertilizers;
    }

    // ==========================================
    // PUBLIC GETTERS - Maps
    // ==========================================

    get productMap() {
        return this._getData().productMap;
    }

    get recipeMap() {
        return this._getData().recipeMap;
    }

    get machineMap() {
        return this._getData().machineMap;
    }

    get farmMap() {
        return this._getData().farmMap;
    }

    get cropMap() {
        return this._getData().cropMap;
    }

    get foodMap() {
        return this._getData().foodMap;
    }

    get researchMap() {
        return this._getData().researchMap;
    }

    get productToRecipes() {
        return this._getData().productToRecipes;
    }

    get tautologicalProducts() {
        return this._getData().tautologicalProducts;
    }

    get STORAGE_THROUGHPUT() {
        return this._getData().STORAGE_THROUGHPUT;
    }

    get _gameData() {
        return this._getData()._gameData;
    }

    // For compatibility with code that sets this (like FarmOptimizer)
    set foodCropIds(value) {
        this._getData().foodCropIds = value;
    }

    get foodCropIds() {
        return this._getData().foodCropIds;
    }

    // ==========================================
    // PUBLIC METHODS - Queries (unchanged)
    // ==========================================

    getProduct(productId) {
        return this.productMap.get(productId);
    }

    getRecipe(recipeId) {
        return this.recipeMap.get(recipeId);
    }

    getMachine(machineId) {
        return this.machineMap.get(machineId);
    }

    getFarm(farmId) {
        return this.farmMap.get(farmId);
    }

    getCrop(cropId) {
        return this.cropMap.get(cropId);
    }

    getFood(foodId) {
        return this.foodMap.get(foodId);
    }

    getResearch(researchId) {
        return this.researchMap.get(researchId);
    }

    /**
     * Get all recipes that produce a given product
     */
    getRecipesForProduct(productId) {
        const recipeIds = this.productToRecipes.get(productId);
        if (!recipeIds) return [];
        return recipeIds.map(id => this.getRecipe(id)).filter(Boolean);
    }

    /**
     * Check if a product is a raw material (no recipes produce it, or it's tautological)
     */
    isRawMaterial(productId) {
        // Check if it's in a tautological loop
        if (this.tautologicalProducts.has(productId)) {
            return true;
        }

        // Check if no recipes produce it
        const recipes = this.getRecipesForProduct(productId);
        return recipes.length === 0;
    }

    /**
     * Get research node by ID
     */
    getResearchNode(researchId) {
        return this.researchMap.get(researchId);
    }

    /**
     * Get all research nodes
     */
    getAllResearch() {
        return this.research;
    }

    /**
     * Get research nodes by tier
     */
    getResearchByTier(tier) {
        return this.research.filter(r => r.tier === tier);
    }

    /**
     * Find which research node unlocks a specific recipe
     */
    getResearchForRecipe(recipeId) {
        return this.research.find(node =>
            node.unlocks.some(unlock =>
                unlock.type === 'recipe' && unlock.id === recipeId
            )
        );
    }

    /**
     * Find which research node unlocks a specific machine
     */
    getResearchForMachine(machineId) {
        return this.research.find(node =>
            node.unlocks.some(unlock =>
                unlock.type === 'machine' && unlock.id === machineId
            )
        );
    }

    /**
 * Get all machines that can run a specific recipe
 * @param {string} recipeId - Recipe ID
 * @returns {Array} - Array of machine objects
 */
    getMachinesForRecipe(recipeId) {
        const recipe = this.getRecipe(recipeId);
        if (!recipe) return [];

        // Find machines that have this recipe in their recipes array
        return this.machines.filter(machine =>
            machine.recipes && machine.recipes.includes(recipeId)
        );
    }

    /**
     * NEW: Normalize recipe to per-minute rates
     * @param {Object} recipe - Recipe object
     * @returns {Object} - Normalized recipe with per-minute rates
     */
    normalizeRecipeToPerMinute(recipe) {
        if (!recipe) return null;

        const cyclesPerMinute = 60 / recipe.durationSeconds;

        return {
            ...recipe,
            cyclesPerMinute,
            normalizedInputs: recipe.inputs.map(input => ({
                ...input,
                perMinute: input.quantity * cyclesPerMinute,
                product: this.getProduct(input.productId)
            })),
            normalizedOutputs: recipe.outputs.map(output => ({
                ...output,
                perMinute: output.quantity * cyclesPerMinute,
                product: this.getProduct(output.productId)
            }))
        };
    }

    /**
     * NEW: Get storage tier options for a product
     * @param {Object} product - Product object
     * @param {number} requiredRate - Required throughput (per minute)
     * @returns {Array} - Storage tier options with counts
     */
    getStorageTierOptions(product, requiredRate) {
        if (!product || !product.type) return [];

        const productType = product.type; // 'Countable', 'Fluid', 'Loose', 'Molten'
        const tiers = [1, 2, 3, 4];

        const options = tiers.map(tier => {
            const throughput = this.STORAGE_THROUGHPUT[tier];
            const count = Math.ceil(requiredRate / throughput);
            const entityId = tier === 1
                ? `Storage${productType}`
                : `Storage${productType}T${tier}`;

            return {
                tier,
                throughput,
                count,
                entityId,
                productType,
                isOptimal: false
            };
        });

        // Mark optimal (lowest count)
        const minCount = Math.min(...options.map(o => o.count));
        options.forEach(option => {
            if (option.count === minCount) {
                option.isOptimal = true;
            }
        });

        return options;
    }

    /**
     * NEW: Get resource source options for a product
     * @param {string} productId - Product ID
     * @returns {Object} - Available source types
     */
    getResourceSourceOptions(productId) {
        const product = this.getProduct(productId);
        const recipes = this.getRecipesForProduct(productId);

        return {
            mining: true, // Always available for raw materials
            worldMine: true, // Always available
            trade: true, // Always available (contracts)
            storage: true, // Always available
            machine: recipes.length > 0, // Only if recipes exist
            availableRecipes: recipes
        };
    }

    /**
     * Calculate production rate (items per minute) for a recipe
     * @param {Object} recipe - Recipe object
     * @param {number} machineCount - Number of machines running this recipe
     * @returns {Object} - { inputs: [{productId, ratePerMin}], outputs: [{productId, ratePerMin}] }
     */
    calculateProductionRate(recipe, machineCount = 1) {
        const cyclesPerMinute = 60 / recipe.durationSeconds;

        const inputs = recipe.inputs.map(input => ({
            productId: input.productId,
            product: this.getProduct(input.productId),
            quantity: input.quantity,
            ratePerMin: input.quantity * cyclesPerMinute * machineCount
        }));

        const outputs = recipe.outputs.map(output => ({
            productId: output.productId,
            product: this.getProduct(output.productId),
            quantity: output.quantity,
            ratePerMin: output.quantity * cyclesPerMinute * machineCount
        }));

        return { inputs, outputs, cyclesPerMinute };
    }

    /**
 * Get recipes for a product, filtered by disabled recipes
 * @param {string} productId - Product ID
 * @param {Set} disabledRecipes - Set of disabled recipe IDs
 * @returns {Array} - Enabled recipes only
 */
    getEnabledRecipesForProduct(productId, disabledRecipes = new Set()) {
        const allRecipes = this.getRecipesForProduct(productId);
        return allRecipes.filter(recipe => !disabledRecipes.has(recipe.id));
    }

    /**
     * Calculate how many machines are needed to produce a target rate
     * @param {string} recipeId - Recipe ID
     * @param {string} productId - Product we want to produce
     * @param {number} targetRate - Desired items per minute
     * @returns {Object} - { machineCount, actualRate, recipe, machine }
     */
    calculateMachinesNeeded(recipeId, productId, targetRate) {
        const recipe = this.getRecipe(recipeId);
        if (!recipe) return null;

        // Find the output for this product
        const output = recipe.outputs.find(o => o.productId === productId);
        if (!output) return null;

        // Calculate cycles per minute and production per machine
        const cyclesPerMinute = 60 / recipe.durationSeconds;
        const productionPerMachine = output.quantity * cyclesPerMinute;

        // Calculate machines needed (round up)
        const machineCount = Math.ceil(targetRate / productionPerMachine);
        const actualRate = productionPerMachine * machineCount;

        // Get machine that can run this recipe
        const machines = this.getMachinesForRecipe(recipeId);
        const machine = machines[0]; // Default to first available machine

        return {
            machineCount,
            actualRate,
            recipe,
            machine,
            productionPerMachine
        };
    }

    /**
     * Calculate full production chain for a target product and rate
     * NOW WITH SMART RAW MATERIAL DETECTION & RESOURCE SOURCE SUPPORT
     * ENHANCED WITH SIMPLE A↔B TAUTOLOGY PREVENTION
     * 
     * @param {string} productId - Target product ID
     * @param {number} targetRate - Desired items per minute
     * @param {string} recipeId - Optional: specific recipe to use
     * @param {Map} recipeOverrides - Map of productId -> recipeId for custom recipe selections
     * @param {Map} resourceSources - Map of nodeKey -> {type, config} for resource source preferences
     * @param {number} depth - Current recursion depth (for cycle detection)
     * @param {Set} visited - Visited nodes for cycle detection
     * @param {string} parentKey - Parent node key for unique identification
     * @returns {Object} - Production chain tree
     */
    calculateProductionChain(productId, targetRate, recipeId = null, recipeOverrides = new Map(), resourceSources = new Map(), depth = 0, visited = new Set(), parentKey = '', disabledRecipes = new Set()) {
        // Prevent infinite recursion
        if (depth > 20) {
            console.error('❌ Max recursion depth reached for', productId);
            return { error: 'Max recursion depth reached', productId, targetRate };
        }

        // Create unique node key
        const nodeKey = `${productId}-${depth}`;

        // Check for circular dependencies
        const visitKey = `${productId}-${recipeId}`;
        if (visited.has(visitKey)) {
            console.warn('⚠️ Circular dependency detected:', visitKey);
            return { error: 'Circular dependency detected', productId, targetRate };
        }
        visited.add(visitKey);

        const product = this.getProduct(productId);
        if (!product) {
            return { error: 'Product not found', productId };
        }

        // Check if this node has a custom source
        const customSource = resourceSources.get(nodeKey);

        // SMART RAW MATERIAL DETECTION
        // If user selected "machine" source, use recipe
        // Otherwise, check if it's naturally a raw material (includes tautological products)
        const isNaturallyRaw = this.isRawMaterial(productId);
        const userWantsMachine = customSource && customSource.type === 'machine';

        // Get recipe to use
        let recipe;
        if (userWantsMachine && customSource.config?.recipeId) {
            recipe = this.getRecipe(customSource.config.recipeId);
        } else if (!isNaturallyRaw || userWantsMachine) {
            if (recipeId) {
                recipe = this.getRecipe(recipeId);
            } else if (recipeOverrides.has(productId)) {
                recipe = this.getRecipe(recipeOverrides.get(productId));
            } else {
                // Auto-select first available recipe that's NOT disabled
                const recipes = this.getRecipesForProduct(productId);

                // FILTER OUT DISABLED RECIPES - ADD THIS
                const enabledRecipes = recipes.filter(r => !disabledRecipes.has(r.id));

                if (enabledRecipes.length === 0) {
                    // All recipes are disabled! Treat as raw material
                    console.warn(`⚠️ All recipes for ${productId} are disabled, treating as raw material`);
                    return {
                        productId,
                        product: this.getProduct(productId),
                        targetRate,
                        isRawMaterial: true,
                        resourceSource: customSource || { type: 'mining' },
                        nodeKey: `${productId}-${depth}`,
                        depth,
                        availableSourceOptions: this.getResourceSourceOptions(productId),
                        warning: 'All recipes disabled - using raw material source'
                    };
                }

                recipe = enabledRecipes[0]; // Use first enabled recipe
            }
        }

        // Determine if this should be treated as raw material
        // Raw if: (naturally raw AND no custom machine source) OR (custom non-machine source) OR (no recipe found)
        const isRawMaterial = (isNaturallyRaw && !userWantsMachine) ||
            (customSource && customSource.type !== 'machine') ||
            !recipe;

        if (isRawMaterial) {
            return {
                productId,
                product,
                targetRate,
                isRawMaterial: true,
                resourceSource: customSource || { type: 'mining' }, // Default to mining
                nodeKey,
                depth,
                availableSourceOptions: this.getResourceSourceOptions(productId),
                isTautological: this.tautologicalProducts.has(productId) // NEW: Flag tautological products
            };
        }

        // Calculate machines needed
        const machineCalc = this.calculateMachinesNeeded(recipe.id, productId, targetRate);
        if (!machineCalc) {
            console.error('❌ Cannot calculate machines for', productId, recipe.id);
            return { error: 'Cannot calculate machines', productId, recipeId };
        }

        // Calculate production rates
        const rates = this.calculateProductionRate(recipe, machineCalc.machineCount);

        // Recursively calculate input chains with recipe overrides and resource sources
        const inputChains = rates.inputs.map(input => {
            return this.calculateProductionChain(
                input.productId,
                input.ratePerMin,
                null,
                recipeOverrides,
                resourceSources,
                depth + 1,
                new Set(visited),
                nodeKey,
                disabledRecipes
            );
        });

        // Get available recipes for this product (for UI)
        const availableRecipes = this.getRecipesForProduct(productId);

        return {
            productId,
            product,
            recipe,
            machine: machineCalc.machine,
            targetRate,
            actualRate: machineCalc.actualRate,
            machineCount: machineCalc.machineCount,
            inputs: rates.inputs,
            outputs: rates.outputs,
            inputChains,
            availableRecipes,
            nodeKey,
            depth,
            isRawMaterial: false
        };
    }

    /**
     * Calculate total resource requirements for a production chain
     * NOW RESPECTS RESOURCE SOURCES (storage sources are excluded)
     * @param {Object} chain - Production chain from calculateProductionChain
     * @returns {Object} - { machines: Map, power, workers, maintenance, rawMaterials: Map }
     */
    calculateTotalRequirements(chain) {
        const requirements = {
            machines: new Map(),
            power: 0,
            workers: 0,
            computing: 0,
            maintenance: new Map(),
            rawMaterials: new Map()
        };

        const processChain = (node) => {
            if (node.error || !node.machine) {
                // Handle raw materials (exclude storage sources)
                if (node.isRawMaterial && node.resourceSource?.type !== 'storage') {
                    const current = requirements.rawMaterials.get(node.productId) || 0;
                    requirements.rawMaterials.set(node.productId, current + node.targetRate);
                }
                return;
            }

            // Add machine requirements
            const machineId = node.machine.id;
            const currentCount = requirements.machines.get(machineId) || 0;
            requirements.machines.set(machineId, currentCount + node.machineCount);

            // Add power requirements
            requirements.power += node.machine.electricityKw * node.machineCount;

            // Add worker requirements
            requirements.workers += node.machine.workers * node.machineCount;

            if (node.machine.computingTFlops) {
                requirements.computing += node.machine.computingTFlops * node.machineCount;
            }

            // Add maintenance requirements
            const maintenanceId = node.machine.maintenance.productId;
            if (maintenanceId && maintenanceId !== '__PHANTOM__VIRTUAL__') {
                const maintenancePerMonth = node.machine.maintenance.perMonth * node.machineCount;
                const current = requirements.maintenance.get(maintenanceId) || 0;
                requirements.maintenance.set(maintenanceId, current + maintenancePerMonth);
            }

            // Process input chains
            if (node.inputChains) {
                node.inputChains.forEach(processChain);
            }
        };

        processChain(chain);
        return requirements;
    }

    /**
     * Reverse calculation: Given available resources, calculate max production
     * @param {string} productId - Product to calculate
     * @param {Map} availableResources - Map of productId -> available quantity
     * @param {string} recipeId - Optional: specific recipe to use
     * @param {Map} recipeOverrides - Map of productId -> recipeId for custom recipe selections
     * @returns {Object} - { maxProduction, limitingFactor, chain }
     */
    calculateMaxProduction(productId, availableResources, recipeId = null, recipeOverrides = new Map()) {
        // Get recipe
        let recipe;
        if (recipeId) {
            recipe = this.getRecipe(recipeId);
        } else {
            const recipes = this.getRecipesForProduct(productId);
            recipe = recipes[0];
        }

        if (!recipe) {
            return { error: 'No recipe found', productId };
        }

        // Find limiting input based on available resources
        let maxProduction = Infinity;
        let limitingFactor = null;

        recipe.inputs.forEach(input => {
            const available = availableResources.get(input.productId) || 0;
            const output = recipe.outputs.find(o => o.productId === productId);
            if (!output) return;

            // Calculate how many cycles we can run
            const cyclesPerMinute = 60 / recipe.durationSeconds;
            const maxCycles = available / input.quantity;
            const maxProductionFromInput = maxCycles * output.quantity * cyclesPerMinute;

            if (maxProductionFromInput < maxProduction) {
                maxProduction = maxProductionFromInput;
                limitingFactor = input.productId;
            }
        });

        // Calculate chain for this production rate
        const chain = this.calculateProductionChain(productId, maxProduction, recipe.id, recipeOverrides);

        return {
            maxProduction,
            limitingFactor,
            limitingProduct: this.getProduct(limitingFactor),
            chain
        };
    }

    /**
     * Compare multiple recipes for the same product
     * @param {string} productId - Product to analyze
     * @param {number} targetRate - Target production rate
     * @param {Map} recipeOverrides - Map of productId -> recipeId for custom recipe selections
     * @returns {Array} - Array of recipe comparisons sorted by efficiency
     */
    compareRecipes(productId, targetRate, recipeOverrides = new Map()) {
        const recipes = this.getRecipesForProduct(productId);

        const comparisons = recipes.map(recipe => {
            const chain = this.calculateProductionChain(productId, targetRate, recipe.id, recipeOverrides);
            const requirements = this.calculateTotalRequirements(chain);

            return {
                recipe,
                chain,
                requirements,
                efficiency: {
                    powerPerItem: requirements.power / targetRate,
                    workersPerItem: requirements.workers / targetRate,
                    machinesTotal: Array.from(requirements.machines.values()).reduce((a, b) => a + b, 0)
                }
            };
        });

        // Sort by total machines needed (lower is better)
        comparisons.sort((a, b) => a.efficiency.machinesTotal - b.efficiency.machinesTotal);

        return comparisons;
    }

    /**
     * NEW: Get tautology detection statistics
     */
    getTautologyStats() {
        const pairs = [];
        this.tautologicalProducts.forEach(productId => {
            const product = this.getProduct(productId);
            if (product) {
                pairs.push(product.name || productId);
            }
        });

        return {
            tautologicalProducts: Array.from(this.tautologicalProducts),
            count: this.tautologicalProducts.size,
            products: pairs
        };
    }
}

// Create singleton instance
const calculator = new ProductionCalculator();

export default calculator;