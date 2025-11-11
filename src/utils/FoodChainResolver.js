import ProductionCalculator from './ProductionCalculator';
import { GameDataManager } from '../managers/GameDataManager';

/**
 * FoodChainResolver - Traces food production chains from crops through processing
 * NOW USES PRE-COMPUTED DATA from GameDataManager for performance
 */
export class FoodChainResolver {
    static recipes = [];
    static foods = [];
    static crops = [];
    static cropFoodChains = null;  // ✅ NEW: Store pre-computed chains

    static initialize(recipes, foods, crops) {
        this.recipes = recipes;
        this.foods = foods;
        this.crops = crops;

        // ✅ Load pre-computed food chains
        GameDataManager.getCropFoodChains().then(({ cropFoodChains }) => {
            this.cropFoodChains = cropFoodChains;
            console.log('✅ FoodChainResolver: Loaded pre-computed food chains');
        }).catch(err => {
            console.error('❌ FoodChainResolver: Failed to load food chains:', err);
            this.cropFoodChains = {};
        });
    }

    /**
     * ✅ UPDATED: Find all food products that can be made from a crop product
     * Now uses PRE-COMPUTED data instead of expensive runtime search
     */
    static getFoodsFromCrop(cropProductId) {
        // Find which crop produces this product
        const crop = this.crops.find(c => c.output.productId === cropProductId);

        if (!crop) {
            console.warn(`No crop found for product ${cropProductId}`);
            return [];
        }

        // ✅ Get pre-computed chains
        const chainData = this.cropFoodChains?.[crop.id];

        if (!chainData || !chainData.isFoodCrop) {
            return [];
        }

        const results = [];

        // Add direct food if applicable
        if (chainData.directlyEdible) {
            results.push({
                finalFoodProductId: chainData.directFoodId,
                processingChain: [],
                conversionRatio: 1.0,
                recipeChain: [],
                isMultiInput: false,
                requiresOtherInputs: false
            });
        }

        // Add processing chains
        chainData.processingChains.forEach(chain => {
            // Convert pre-computed chain to FoodChainResolver format
            const processingChain = chain.recipeChain.map(recipeId => {
                const recipe = ProductionCalculator.getRecipe(recipeId);
                if (!recipe) return null;

                return {
                    recipeId: recipe.id,
                    recipeName: recipe.name,
                    inputProductId: recipe.inputs[0]?.productId,
                    outputProductId: recipe.outputs[0]?.productId,
                    inputQuantity: recipe.inputs[0]?.quantity,
                    outputQuantity: recipe.outputs[0]?.quantity,
                    recipeInputCount: recipe.inputs.length,
                    allInputs: recipe.inputs.map(i => ({
                        productId: i.productId,
                        productName: ProductionCalculator.getProduct(i.productId)?.name,
                        quantity: i.quantity
                    }))
                };
            }).filter(Boolean);

            const recipe = ProductionCalculator.getRecipe(chain.recipeChain[0]);
            const isMultiInput = recipe?.inputs?.length > 1;

            let contributionNote = '';
            if (isMultiInput) {
                const otherInputs = recipe.inputs.filter(i => i.productId !== cropProductId);
                contributionNote = `Also needs: ${otherInputs.map(i => {
                    const p = ProductionCalculator.getProduct(i.productId);
                    return p?.name || i.productId;
                }).join(', ')}`;
            }

            results.push({
                finalFoodProductId: chain.finalFoodProductId,
                processingChain: processingChain,
                conversionRatio: chain.conversionRatio,
                recipeChain: chain.recipeChain,
                isMultiInput: isMultiInput,
                contributionNote: contributionNote,
                requiresOtherInputs: isMultiInput
            });
        });

        return results;
    }

    /**
     * ✅ KEEP: Find all crops that can produce a given food (backward search)
     * Used by some UI components that need reverse lookup
     */
    static getCropsForFood(foodProductId) {
        const results = [];

        if (!this.cropFoodChains) {
            console.warn('Crop food chains not loaded yet');
            return results;
        }

        // Search through all crops to find ones that can produce this food
        Object.entries(this.cropFoodChains).forEach(([cropId, chainData]) => {
            if (!chainData.isFoodCrop) return;

            // Check direct food
            if (chainData.directFoodId === foodProductId) {
                results.push({
                    cropId: cropId,
                    conversionRatio: 1.0,
                    processingChain: [],
                    finalProductId: foodProductId
                });
            }

            // Check processing chains
            chainData.processingChains.forEach(chain => {
                if (chain.finalFoodProductId === foodProductId) {
                    const processingChain = chain.recipeChain.map(recipeId => {
                        const recipe = ProductionCalculator.getRecipe(recipeId);
                        return recipe ? {
                            recipeId: recipe.id,
                            recipeName: recipe.name,
                            inputProductId: recipe.inputs[0]?.productId,
                            outputProductId: recipe.outputs[0]?.productId,
                            inputQuantity: recipe.inputs[0]?.quantity,
                            outputQuantity: recipe.outputs[0]?.quantity
                        } : null;
                    }).filter(Boolean);

                    results.push({
                        cropId: cropId,
                        conversionRatio: chain.conversionRatio,
                        processingChain: processingChain,
                        finalProductId: foodProductId
                    });
                }
            });
        });

        return results;
    }

    /**
     * ✅ KEEP: Get the "food value" of a crop (how many people it can feed)
     * Now uses pre-computed data for efficiency
     */
    static getCropFoodValue(crop, foodConsumptionMult = 1.0) {
        const chainData = this.cropFoodChains?.[crop.id];

        if (!chainData || !chainData.isFoodCrop) {
            return 0;
        }

        let bestValue = 0;

        // Check direct food
        if (chainData.directlyEdible && chainData.directFoodId) {
            const food = this.foods.find(f => f.id === chainData.directFoodId);
            if (food) {
                const value = this.calculateFoodValue(food, 1.0, foodConsumptionMult);
                bestValue = Math.max(bestValue, value);
            }
        }

        // Check processing chains
        chainData.processingChains.forEach(chain => {
            const food = this.foods.find(f => f.id === chain.finalFoodId);
            if (food) {
                const foodUnitsPerCropUnit = chain.conversionRatio;
                const value = this.calculateFoodValue(food, foodUnitsPerCropUnit, foodConsumptionMult);
                bestValue = Math.max(bestValue, value);
            }
        });

        return bestValue;
    }

    /**
     * ✅ UPDATED: Get all food-related recipes (optimized)
     */
    static getAllFoodRecipes() {
        const foodRecipes = new Set();

        if (!this.cropFoodChains) {
            return [];
        }

        // Collect all recipe IDs from pre-computed chains
        Object.values(this.cropFoodChains).forEach(chainData => {
            if (chainData.isFoodCrop) {
                chainData.processingChains.forEach(chain => {
                    chain.recipeChain.forEach(recipeId => {
                        foodRecipes.add(recipeId);
                    });
                });
            }
        });

        return Array.from(foodRecipes)
            .map(id => ProductionCalculator.getRecipe(id))
            .filter(r => r !== null);
    }

    /**
     * ✅ KEEP: Group food recipes by their output product
     */
    static getFoodRecipesByOutput() {
        const foodRecipes = this.getAllFoodRecipes();
        const grouped = {};

        foodRecipes.forEach(recipe => {
            recipe.outputs.forEach(output => {
                if (!grouped[output.productId]) {
                    grouped[output.productId] = [];
                }
                grouped[output.productId].push(recipe);
            });
        });

        return grouped;
    }

    /**
     * ✅ KEEP: Calculate people fed from food units
     */
    static calculateFoodValue(food, unitsAvailable, foodConsumptionMult) {
        const consumptionPer100 = food.consumedPerHundredPopsPerMonth * foodConsumptionMult;
        if (consumptionPer100 <= 0) return 0;

        return (unitsAvailable / consumptionPer100) * 100;
    }
}