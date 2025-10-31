/**
 * FoodChainResolver - Traces food production chains from crops through processing
 * Handles cases like: Wheat → Flour → Bread
 */
export class FoodChainResolver {
    static recipes = [];
    static foods = [];
    static crops = [];

    static initialize(recipes, foods, crops) {
        this.recipes = recipes;
        this.foods = foods;
        this.crops = crops;
    }

    /**
     * Find all crops that can ultimately produce a given food (directly or via processing)
     * Returns: Array of { cropId, conversionRatio, processingChain }
     */
    static getCropsForFood(foodProductId) {
        const results = [];

        // Check direct crop → food (e.g., Corn → Corn food)
        const directCrop = this.crops.find(c => c.output.productId === foodProductId);
        if (directCrop) {
            results.push({
                cropId: directCrop.id,
                conversionRatio: 1.0, // Direct 1:1
                processingChain: [],
                finalProductId: foodProductId
            });
        }

        // Check indirect via recipes (e.g., Wheat → Flour → Bread)
        const indirectPaths = this.traceBackToFarmable(foodProductId);
        results.push(...indirectPaths);

        return results;
    }

    /**
     * Recursively trace a product back to farmable crops
     */
    static traceBackToFarmable(targetProductId, depth = 0, maxDepth = 5, visitedProducts = new Set()) {
        if (depth > maxDepth || visitedProducts.has(targetProductId)) {
            return [];
        }

        visitedProducts.add(targetProductId);
        const paths = [];

        // Find all recipes that OUTPUT this product
        const producingRecipes = this.recipes.filter(recipe =>
            recipe.outputs.some(o => o.productId === targetProductId)
        );

        for (const recipe of producingRecipes) {
            const targetOutput = recipe.outputs.find(o => o.productId === targetProductId);
            const outputQuantity = targetOutput.quantity;

            // Check each input to see if it's farmable or needs further tracing
            for (const input of recipe.inputs) {
                const inputProductId = input.productId;

                // Is this input directly farmable?
                const farmableCrop = this.crops.find(c => c.output.productId === inputProductId);

                if (farmableCrop) {
                    // Found a crop! Calculate conversion ratio
                    // Example: 4 Wheat → 2 Flour, 2 Flour → 1 Bread
                    // Ratio = (input.quantity / output.quantity) = how much crop per final product
                    const conversionRatio = input.quantity / outputQuantity;

                    paths.push({
                        cropId: farmableCrop.id,
                        conversionRatio: conversionRatio,
                        processingChain: [{
                            recipeId: recipe.id,
                            recipeName: recipe.name,
                            inputProductId: inputProductId,
                            outputProductId: targetProductId,
                            inputQuantity: input.quantity,
                            outputQuantity: outputQuantity
                        }],
                        finalProductId: targetProductId
                    });
                } else {
                    // Need to trace further back
                    const deeperPaths = this.traceBackToFarmable(
                        inputProductId,
                        depth + 1,
                        maxDepth,
                        new Set(visitedProducts)
                    );

                    // Combine this step with deeper paths
                    for (const deepPath of deeperPaths) {
                        const combinedRatio = deepPath.conversionRatio * (input.quantity / outputQuantity);

                        paths.push({
                            cropId: deepPath.cropId,
                            conversionRatio: combinedRatio,
                            processingChain: [
                                ...deepPath.processingChain,
                                {
                                    recipeId: recipe.id,
                                    recipeName: recipe.name,
                                    inputProductId: inputProductId,
                                    outputProductId: targetProductId,
                                    inputQuantity: input.quantity,
                                    outputQuantity: outputQuantity
                                }
                            ],
                            finalProductId: targetProductId
                        });
                    }
                }
            }
        }

        return paths;
    }

    /**
     * Find all food products that can be made from a crop product (forward search)
     * Example: Wheat → Flour → Bread
     */
    static getFoodsFromCrop(cropProductId) {
        const results = [];
        const visited = new Set();

        // Check if crop output is directly a food
        const directFood = this.foods.find(f => f.productId === cropProductId);
        if (directFood) {
            results.push({
                finalFoodProductId: cropProductId,
                processingChain: [],
                conversionRatio: 1.0,
                recipeChain: [],
                isMultiInput: false,
                requiresOtherInputs: false
            });
        }

        // Trace forward through recipes to find foods
        // Max depth is controlled by traceForwardToFood
        const paths = this.traceForwardToFood(cropProductId, 1.0, [], 0, 5, visited);

        // Remove duplicates
        const uniquePaths = new Map();
        paths.forEach(path => {
            const key = `${path.finalFoodProductId}-${path.recipeChain.join('->')}`;
            if (!uniquePaths.has(key)) {
                uniquePaths.set(key, path);
            }
        });

        results.push(...Array.from(uniquePaths.values()));

        console.log(`Found ${results.length} valid food paths for product ${cropProductId}:`,
            results.map(r => {
                const food = this.foods.find(f => f.productId === r.finalFoodProductId);
                return food?.productId;
            })
        );

        return results;
    }

    /**
     * Recursively trace forward from a product through recipes to find food
     * SMART RULES: Only follow paths where intermediates lead to actual edible food
     */
    static traceForwardToFood(currentProductId, currentRatio, chainSoFar, depth, maxDepth, visited, originalCropId = null) {
        if (depth > maxDepth) return [];

        if (originalCropId === null) {
            originalCropId = currentProductId;
        }

        const visitKey = `${currentProductId}-${chainSoFar.map(c => c.recipeId).join('-')}`;
        if (visited.has(visitKey)) return [];
        visited.add(visitKey);

        const results = [];

        // Find all recipes that USE this product as INPUT
        const consumingRecipes = this.recipes.filter(recipe =>
            recipe.inputs.some(input => input.productId === currentProductId)
        );

        for (const recipe of consumingRecipes) {
            if (chainSoFar.some(c => c.recipeId === recipe.id)) {
                continue;
            }

            const ourInput = recipe.inputs.find(i => i.productId === currentProductId);
            if (!ourInput) continue;

            const inputQuantity = ourInput.quantity;

            // Check all outputs of this recipe
            for (const output of recipe.outputs) {
                const outputProductId = output.productId;
                const outputQuantity = output.quantity;

                // Check if output is edible food
                const isEdibleFood = this.foods.some(f => f.productId === outputProductId);

                if (!isEdibleFood && depth > 0) {
                    // Not food yet - check if this intermediate can lead to food
                    const canLeadToFood = this.canProductLeadToFood(outputProductId);

                    if (!canLeadToFood) {
                        // This intermediate doesn't lead to any edible food, skip it
                        continue;
                    }

                    // Max depth 2: Crop → Intermediate → Food (no deeper)
                    if (depth >= 2) {
                        continue;
                    }
                }

                const stepRatio = inputQuantity / outputQuantity;
                const totalRatio = currentRatio * stepRatio;

                const newChain = [
                    ...chainSoFar,
                    {
                        recipeId: recipe.id,
                        recipeName: recipe.name,
                        inputProductId: currentProductId,
                        outputProductId: outputProductId,
                        inputQuantity: inputQuantity,
                        outputQuantity: outputQuantity,
                        recipeInputCount: recipe.inputs.length,
                        allInputs: recipe.inputs.map(i => ({
                            productId: i.productId,
                            productName: this.products?.find(p => p.id === i.productId)?.name,
                            quantity: i.quantity
                        }))
                    }
                ];

                if (isEdibleFood) {
                    // Found edible food!
                    let contributionNote = '';
                    if (recipe.inputs.length > 1) {
                        const otherInputs = recipe.inputs.filter(i => i.productId !== currentProductId);
                        contributionNote = `Also needs: ${otherInputs.map(i => {
                            const p = this.products?.find(prod => prod.id === i.productId);
                            return `${p?.name || i.productId}`;
                        }).join(', ')}`;
                    }

                    results.push({
                        finalFoodProductId: outputProductId,
                        processingChain: newChain,
                        conversionRatio: totalRatio,
                        recipeChain: newChain.map(c => c.recipeId),
                        isMultiInput: recipe.inputs.length > 1,
                        contributionNote,
                        requiresOtherInputs: recipe.inputs.length > 1
                    });
                } else {
                    // Continue searching
                    const deeperPaths = this.traceForwardToFood(
                        outputProductId,
                        totalRatio,
                        newChain,
                        depth + 1,
                        maxDepth,
                        new Set(visited),
                        originalCropId
                    );
                    results.push(...deeperPaths);
                }
            }
        }

        return results;
    }

    /**
 * Check if a product can be used in any recipe that produces edible food
 * Uses actual game data to determine valid food intermediates
 */
    static canProductLeadToFood(productId) {
        // Find all recipes that use this product as input
        const recipesUsingProduct = this.recipes.filter(recipe =>
            recipe.inputs.some(input => input.productId === productId)
        );

        // Check if any of these recipes directly produce edible food
        for (const recipe of recipesUsingProduct) {
            for (const output of recipe.outputs) {
                const isEdibleFood = this.foods.some(f => f.productId === output.productId);
                if (isEdibleFood) {
                    return true; // This product is used to make food!
                }
            }
        }

        return false; // This product is NOT used in any food recipes
    }

    /**
     * Get the "food value" of a crop (how many people it can feed per unit produced)
     * Accounts for processing chains
     */
    static getCropFoodValue(crop, foodConsumptionMult = 1.0) {
        const cropOutputProductId = crop.output.productId;

        // Check if crop output is directly a food
        const directFood = this.foods.find(f => f.productId === cropOutputProductId);
        if (directFood) {
            return this.calculateFoodValue(directFood, 1.0, foodConsumptionMult);
        }

        // Find all foods this crop can produce (via processing)
        let bestValue = 0;

        for (const food of this.foods) {
            const paths = this.getCropsForFood(food.productId);
            const relevantPath = paths.find(p => p.cropId === crop.id);

            if (relevantPath) {
                // Calculate: crop units → final food units → people fed
                const foodUnitsPerCropUnit = 1 / relevantPath.conversionRatio;
                const value = this.calculateFoodValue(food, foodUnitsPerCropUnit, foodConsumptionMult);

                if (value > bestValue) {
                    bestValue = value;
                }
            }
        }

        return bestValue;
    }

    /**
     * Calculate people fed from food units
     */
    static calculateFoodValue(food, unitsAvailable, foodConsumptionMult) {
        const consumptionPer100 = food.consumedPerHundredPopsPerMonth * foodConsumptionMult;
        if (consumptionPer100 <= 0) return 0;

        return (unitsAvailable / consumptionPer100) * 100;
    }
}