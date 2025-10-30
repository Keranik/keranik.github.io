/**
 * Production Calculator Engine
 * Handles all production chain calculations, recipe optimization, and resource requirements
 * MODIFIED: Now supports dynamic data loading for mod support
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
    }

    /**
     * Initialize calculator with game data
     * This is called by components after loading data via DataLoader
     * @param {Object} gameData - The loaded game data (base game + mods)
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

        // Build lookup maps for fast access
        this.productMap = new Map(this.products.map(p => [p.id, p]));
        this.recipeMap = new Map(this.recipes.map(r => [r.id, r]));
        this.machineMap = new Map(this.machines.map(m => [m.id, m]));
        this.farmMap = new Map(this.farms.map(f => [f.id, f]));
        this.cropMap = new Map(this.crops.map(c => [c.id, c]));
        this.foodMap = new Map(this.foods.map(f => [f.id, f]));

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

        // Log loaded data for debugging
        console.log('ProductionCalculator initialized:', {
            machines: this.machines.length,
            recipes: this.recipes.length,
            products: this.products.length,
            farms: this.farms.length,
            crops: this.crops.length,
            foods: this.foods.length,
            fertilizers: this.fertilizers.length
        });
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
     * @param {string} productId - Target product ID
     * @param {number} targetRate - Desired items per minute
     * @param {string} recipeId - Optional: specific recipe to use (otherwise picks first available)
     * @param {Map} recipeOverrides - Map of productId -> recipeId for custom recipe selections
     * @param {number} depth - Current recursion depth (for cycle detection)
     * @returns {Object} - Production chain tree
     */
    calculateProductionChain(productId, targetRate, recipeId = null, recipeOverrides = new Map(), depth = 0, visited = new Set()) {
        // Prevent infinite recursion
        if (depth > 20) {
            return { error: 'Max recursion depth reached', productId, targetRate };
        }

        // Check for circular dependencies
        const visitKey = `${productId}-${recipeId}`;
        if (visited.has(visitKey)) {
            return { error: 'Circular dependency detected', productId, targetRate };
        }
        visited.add(visitKey);

        const product = this.getProduct(productId);
        if (!product) {
            return { error: 'Product not found', productId };
        }

        // Get recipe to use - check overrides first
        let recipe;
        if (recipeId) {
            recipe = this.getRecipe(recipeId);
        } else if (recipeOverrides.has(productId)) {
            recipe = this.getRecipe(recipeOverrides.get(productId));
        } else {
            // Auto-select first available recipe
            const recipes = this.getRecipesForProduct(productId);
            recipe = recipes[0];
        }

        // If no recipe found, this is a raw material
        if (!recipe) {
            return {
                productId,
                product,
                targetRate,
                isRawMaterial: true,
                depth
            };
        }

        // Calculate machines needed
        const machineCalc = this.calculateMachinesNeeded(recipe.id, productId, targetRate);
        if (!machineCalc) {
            return { error: 'Cannot calculate machines', productId, recipeId };
        }

        // Calculate production rates
        const rates = this.calculateProductionRate(recipe, machineCalc.machineCount);

        // Recursively calculate input chains with recipe overrides
        const inputChains = rates.inputs.map(input => {
            return this.calculateProductionChain(
                input.productId,
                input.ratePerMin,
                null, // Don't force recipe, let overrides handle it
                recipeOverrides,
                depth + 1,
                new Set(visited) // Pass copy of visited set
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
            availableRecipes, // Include for UI recipe selection
            depth,
            isRawMaterial: false
        };
    }

    /**
     * Calculate total resource requirements for a production chain
     * @param {Object} chain - Production chain from calculateProductionChain
     * @returns {Object} - { machines: Map, power, workers, maintenance, rawMaterials: Map }
     */
    calculateTotalRequirements(chain) {
        const requirements = {
            machines: new Map(), // machineId -> count
            power: 0, // kW
            workers: 0,
            maintenance: new Map(), // maintenanceProductId -> per month
            rawMaterials: new Map() // productId -> rate per minute
        };

        const processChain = (node) => {
            if (node.error || !node.machine) {
                // Handle raw materials
                if (node.isRawMaterial) {
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
}

// Create singleton instance
const calculator = new ProductionCalculator();

export default calculator;