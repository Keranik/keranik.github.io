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