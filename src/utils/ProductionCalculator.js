/**
 * Production Calculator Engine - REWRITTEN FOR EXCELLENCE
 * Handles all production chain calculations, recipe optimization, and resource requirements
 * Now with per-minute normalization, resource source management, storage calculations, and SMART RAW MATERIAL DETECTION
 * 
 * NEW: Simple A↔B loop detection - if Product A only makes Product B and Product B only makes Product A, treat both as raw
 */
class ProductionCalculator {
    constructor() {
        // Initialize with empty data - will be populated by initialize()
        this._gameData = null;
        this.machines = [];
        this.recipes = [];
        this.products = [];
        this.farms = [];
        this.crops = [];
        this.foods = [];
        this.foodCategories = [];
        this.farmResearch = [];

        // Lookup maps
        this.productMap = new Map();
        this.recipeMap = new Map();
        this.machineMap = new Map();
        this.farmMap = new Map();
        this.cropMap = new Map();
        this.foodMap = new Map();
        this.productToRecipes = new Map();
        this.fertilizers = [];

        // Storage throughput limits (per minute)
        this.STORAGE_THROUGHPUT = {
            1: 400,
            2: 900,
            3: 1800,
            4: 3000
        };

        // NEW: Simple tautology detection cache
        this.tautologicalProducts = new Set(); // Products that are in A↔B loops
    }

    /**
     * Initialize calculator with game data
     */
    initialize(gameData) {
        this._gameData = gameData;

        // Populate arrays
        this.machines = gameData.machines || [];
        this.recipes = gameData.recipes || [];
        this.products = gameData.products || [];
        this.farms = gameData.farms || [];
        this.crops = gameData.crops || [];
        this.foods = gameData.foods || [];
        this.foodCategories = gameData.foodCategories || [];
        this.farmResearch = gameData.farmResearch || [];
        this.research = gameData.research || [];
        

        // Build lookup maps for fast access
        this.productMap = new Map(this.products.map(p => [p.id, p]));
        this.recipeMap = new Map(this.recipes.map(r => [r.id, r]));
        this.machineMap = new Map(this.machines.map(m => [m.id, m]));
        this.farmMap = new Map(this.farms.map(f => [f.id, f]));
        this.cropMap = new Map(this.crops.map(c => [c.id, c]));
        this.foodMap = new Map(this.foods.map(f => [f.id, f]));
        this.researchMap = new Map(this.research.map(r => [r.id, r]));

        // Build reverse lookup: product -> recipes that produce it
        this.productToRecipes = new Map();
        this.recipes.forEach(recipe => {
            recipe.outputs.forEach(output => {
                if (!this.productToRecipes.has(output.productId)) {
                    this.productToRecipes.set(output.productId, []);
                }
                this.productToRecipes.get(output.productId).push(recipe.id);
            });
        });

        // Extract fertilizers from products
        this.fertilizers = this.products
            .filter(p => p.fertilizer != null)
            .map(p => ({
                id: p.id,
                name: p.name,
                fertilityPerQuantity: p.fertilizer.fertilityPerQuantityPercent,
                maxFertility: p.fertilizer.maxFertilityPercent
            }));

        // NEW: Detect A↔B tautological loops
        this._detectTautologicalLoops();

        // Log loaded data for debugging
        console.log('ProductionCalculator initialized:', {
            machines: this.machines.length,
            recipes: this.recipes.length,
            products: this.products.length,
            farms: this.farms.length,
            crops: this.crops.length,
            foods: this.foods.length,
            fertilizers: this.fertilizers.length,
            tautologicalProducts: this.tautologicalProducts.size,
            research: this.research.length
        });
    }

    /**
 * NEW: Detect A↔B tautological loops
 * Simple rule: If Product A has ONLY ONE recipe that produces it from Product B,
 * AND Product B has ONLY ONE recipe that produces it from Product A,
 * then both are tautological and should be treated as raw materials.
 */
    _detectTautologicalLoops() {
        console.log('🔍 Detecting A↔B tautological loops...');

        const tautologicalPairs = [];

        // Build a map of product -> [what it's made from (if only one recipe)]
        const productToSingleSource = new Map();

        this.products.forEach(product => {
            const recipes = this.getRecipesForProduct(product.id);

            // Only consider if there's exactly ONE recipe that produces this product
            if (recipes.length === 1) {
                const recipe = recipes[0];

                // Only consider if the recipe has exactly ONE input
                if (recipe.inputs.length === 1) {
                    const inputProductId = recipe.inputs[0].productId;
                    productToSingleSource.set(product.id, inputProductId);
                }
            }
        });

        // Now check for mutual loops: A→B (only path) and B→A (only path)
        const processedPairs = new Set();

        productToSingleSource.forEach((sourceProductId, targetProductId) => {
            // Check if the source product also has only one recipe, and it comes from target
            const reverseSource = productToSingleSource.get(sourceProductId);

            if (reverseSource === targetProductId) {
                // Found a tautological loop! A→B (only way) and B→A (only way)

                // Avoid processing the same pair twice
                const pairKey = [targetProductId, sourceProductId].sort().join('↔');
                if (processedPairs.has(pairKey)) return;
                processedPairs.add(pairKey);

                this.tautologicalProducts.add(targetProductId);
                this.tautologicalProducts.add(sourceProductId);

                const productA = this.getProduct(targetProductId);
                const productB = this.getProduct(sourceProductId);

                tautologicalPairs.push(`${productA?.name || targetProductId} ↔ ${productB?.name || sourceProductId}`);
            }
        });

        console.log(`✅ Found ${tautologicalPairs.length / 2} tautological pairs (${this.tautologicalProducts.size} products)`);

        if (tautologicalPairs.length > 0) {
            console.log('🚫 Tautological loops (will be treated as raw):', tautologicalPairs.join(', '));
        }
    }

    /**
     * Get product details by ID
     */
    getProduct(productId) {
        return this.productMap.get(productId);
    }

    /**
     * Get recipe details by ID
     */
    getRecipe(recipeId) {
        return this.recipeMap.get(recipeId);
    }

    /**
     * Get machine details by ID
     */
    getMachine(machineId) {
        return this.machineMap.get(machineId);
    }

    /**
     * Get farm details by ID
     */
    getFarm(farmId) {
        return this.farmMap.get(farmId);
    }

    /**
     * Get crop details by ID
     */
    getCrop(cropId) {
        return this.cropMap.get(cropId);
    }

    /**
     * Get food details by ID
     */
    getFood(foodId) {
        return this.foodMap.get(foodId);
    }

    /**
     * Find all recipes that produce a given product
     */
    getRecipesForProduct(productId) {
        const recipeIds = this.productToRecipes.get(productId) || [];
        return recipeIds.map(id => this.getRecipe(id)).filter(r => r);
    }

    /**
     * Find all machines that can run a given recipe
     */
    getMachinesForRecipe(recipeId) {
        return this.machines.filter(m => m.recipes.includes(recipeId));
    }

    /**
  * Check if a product is a raw/mineable resource
  * 
  * A product is considered RAW if:
  * 1. It can be mined (marked as CanBeMined from terrain materials export)
  * 2. It has NO recipes that produce it
  * 3. NEW: It's part of a tautological A↔B loop
  * 
  * @param {string} productId - Product ID to check
  * @returns {boolean} - True if this product should default to raw material
  */
    isRawMaterial(productId) {
        const product = this.getProduct(productId);
        if (!product) return false;

        // Check 1: Products that can be mined from terrain
        // Examples: Coal, Sand, Iron Ore, Copper Ore, Rock, Dirt, etc.
        if (product.canBeMined === true) {
            return true;
        }

        // Check 2: Products with no recipes = raw materials
        // Examples: Wood (from trees), naturally collected items
        const recipes = this.getRecipesForProduct(productId);
        if (recipes.length === 0) {
            return true;
        }

        // Check 3: NEW - Products in tautological A↔B loops
        // Examples: Iron Scrap ↔ Iron Scrap Pressed, Aluminum Scrap ↔ Aluminum Pressed
        if (this.tautologicalProducts.has(productId)) {
            return true;
        }

        return false;
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