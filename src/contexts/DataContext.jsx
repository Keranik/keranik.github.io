import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DataLoader } from '../utils/DataLoader';
import ProductionCalculator from '../utils/ProductionCalculator';
import { FoodChainResolver } from '../utils/FoodChainResolver';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};

// ✅ Initialize food crop IDs with detailed logging
const initializeFoodCrops = () => {
    if (ProductionCalculator.foodCropIds) {
        console.log('⏭️ Food crops already initialized, skipping...');
        return;
    }

    console.log('🌾 DataContext: Initializing food crop identification...');
    console.log(`📊 Total crops available: ${ProductionCalculator.crops?.length || 0}`);
    console.log(`📊 Total foods available: ${ProductionCalculator.foods?.length || 0}`);
    console.log(`📊 Total recipes available: ${ProductionCalculator.recipes?.length || 0}`);

    const foodCropIds = new Set();
    const directFoodCrops = [];
    const processedFoodCrops = [];

    // ===== STEP 1: Find Direct Food Crops =====
    console.log('🔍 Step 1: Checking for direct food crops...');
    ProductionCalculator.crops?.forEach(crop => {
        const isDirectFood = ProductionCalculator.foods?.some(f => f.productId === crop.output.productId);
        if (isDirectFood) {
            foodCropIds.add(crop.id);
            directFoodCrops.push(crop.name);
            console.log(`  ✅ Direct food crop: ${crop.name} (${crop.id})`);
        }
    });

    console.log(`✅ Found ${directFoodCrops.length} direct food crops:`, directFoodCrops.join(', '));

    // ===== STEP 2: Find Crops That Can Be Processed Into Food =====
    console.log('🔍 Step 2: Checking for crops that can be processed into food...');
    ProductionCalculator.crops?.forEach(crop => {
        // Skip if already identified as direct food
        if (foodCropIds.has(crop.id)) {
            return;
        }

        const isUsedInRecipes = ProductionCalculator.recipes?.some(recipe =>
            recipe.inputs.some(input => input.productId === crop.output.productId)
        );

        if (isUsedInRecipes) {
            const outputProducts = new Set([crop.output.productId]);
            const visited = new Set();
            let foundFood = false;
            let processingDepth = 0;

            // Trace through up to 3 levels of processing
            for (let depth = 0; depth < 3 && !foundFood; depth++) {
                const newProducts = new Set();
                outputProducts.forEach(productId => {
                    if (visited.has(productId)) return;
                    visited.add(productId);

                    // Check if this product is a food
                    if (ProductionCalculator.foods?.some(f => f.productId === productId)) {
                        foundFood = true;
                        processingDepth = depth;
                        return;
                    }

                    // Find recipes that use this product as input
                    ProductionCalculator.recipes?.forEach(recipe => {
                        if (recipe.inputs.some(input => input.productId === productId)) {
                            recipe.outputs.forEach(output => newProducts.add(output.productId));
                        }
                    });
                });

                newProducts.forEach(p => outputProducts.add(p));
            }

            if (foundFood) {
                foodCropIds.add(crop.id);
                processedFoodCrops.push(`${crop.name} (depth ${processingDepth + 1})`);
                console.log(`  ✅ Processed food crop: ${crop.name} (${crop.id}) - ${processingDepth + 1} step${processingDepth > 0 ? 's' : ''} to food`);
            } else {
                console.log(`  ❌ Not a food crop: ${crop.name} (${crop.id}) - no food output found`);
            }
        } else {
            console.log(`  ⏭️ Skipping: ${crop.name} (${crop.id}) - not used in any recipes`);
        }
    });

    console.log(`✅ Found ${processedFoodCrops.length} processable food crops:`, processedFoodCrops.join(', '));

    // ===== FINAL SUMMARY =====
    ProductionCalculator.foodCropIds = foodCropIds;
    console.log('════════════════════════════════════════════════════════');
    console.log(`✅ Food Crop Initialization Complete`);
    console.log(`   Total Food Crops: ${foodCropIds.size}`);
    console.log(`   - Direct Food Crops: ${directFoodCrops.length}`);
    console.log(`   - Processable Food Crops: ${processedFoodCrops.length}`);
    console.log(`   Food Crop IDs:`, Array.from(foodCropIds));
    console.log('════════════════════════════════════════════════════════');
};

export const DataProvider = ({ children }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load data on mount - ONE TIME ONLY
    useEffect(() => {
        const loadData = async () => {
            try {
                console.log('🚀 DataContext: Loading game data (ONE TIME)...');

                // Load base game data (no mods for now, SettingsContext will reload if needed)
                await DataLoader.loadGameData([]);

                // ✅ Initialize food crops immediately after data loads
                initializeFoodCrops();

                setDataLoaded(true);
                setIsLoading(false);
                console.log('✅ DataContext: Game data loaded successfully');
            } catch (err) {
                console.error('❌ DataContext: Failed to load game data:', err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        loadData();
    }, []); // Only run once on mount

    // ✅ Memoized derived data - computed once when data loads
    const availableFarms = useMemo(() => {
        if (!dataLoaded) {
            console.log('⏭️ DataContext: Data not loaded yet, returning empty farms array');
            return [];
        }
        const farms = (ProductionCalculator.farms || []).filter(f => f.type === 'crop');
        console.log(`📊 DataContext: ${farms.length} crop farms available`);
        return farms;
    }, [dataLoaded]);

    const availableCrops = useMemo(() => {
        if (!dataLoaded) {
            console.log('⏭️ DataContext: Data not loaded yet, returning empty crops array');
            return [];
        }
        const crops = ProductionCalculator.crops || [];
        console.log(`📊 DataContext: ${crops.length} total crops available`);
        return crops;
    }, [dataLoaded]);

    const availableFoodCrops = useMemo(() => {
        if (!dataLoaded) {
            console.log('⏭️ DataContext: Data not loaded yet, returning empty food crops array');
            return [];
        }

        if (!ProductionCalculator.foodCropIds || ProductionCalculator.foodCropIds.size === 0) {
            console.warn('⚠️ DataContext: foodCropIds not initialized! This should not happen.');
            return [];
        }

        const foodCrops = availableCrops.filter(crop =>
            ProductionCalculator.foodCropIds?.has(crop.id) ?? false
        );

        console.log(`📊 DataContext: ${foodCrops.length} food crops available out of ${availableCrops.length} total crops`);
        console.log(`   Food crop names:`, foodCrops.map(c => c.name).join(', '));

        return foodCrops;
    }, [dataLoaded, availableCrops]);

    const availableFertilizers = useMemo(() => {
        if (!dataLoaded) {
            console.log('⏭️ DataContext: Data not loaded yet, returning empty fertilizers array');
            return [];
        }

        const fertilizers = (ProductionCalculator.products || [])
            .filter(p => p.fertilizer &&
                p.fertilizer.fertilityPerQuantityPercent !== undefined &&
                p.fertilizer.maxFertilityPercent !== undefined)
            .map(p => ({
                id: p.id,
                name: p.name,
                // ✅ ADD THIS LINE - include the full product for icon lookup
                product: p,
                fertilityPerUnit: p.fertilizer.fertilityPerQuantityPercent,
                maxFertility: p.fertilizer.maxFertilityPercent
            }))
            .sort((a, b) => a.fertilityPerUnit - b.fertilityPerUnit);

        console.log(`📊 DataContext: ${fertilizers.length} fertilizers available`);
        console.log(`   Fertilizer names:`, fertilizers.map(f => f.name).join(', '));

        return fertilizers;
    }, [dataLoaded]);

    const value = {
        // Loading state
        dataLoaded,
        isLoading,
        error,

        // Game data (read-only)
        availableFarms,
        availableCrops,
        availableFoodCrops,
        availableFertilizers,

        // Direct access to calculators (if needed)
        ProductionCalculator,
        FoodChainResolver
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};