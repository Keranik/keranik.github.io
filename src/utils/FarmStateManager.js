// src/utils/FarmStateManager.js

export class FarmStateManager {
    /**
     * Apply fertilizer changes to farms and determine if recalculation is needed
     */
    static applyFertilizerChange(farms, farmIndex, fertilizerId, customFertility) {
        console.log('FarmStateManager: Applying fertilizer change', { farmIndex, fertilizerId, customFertility });

        const updatedFarms = farms.map((farm, idx) => {
            if (idx === farmIndex) {
                return {
                    ...farm,
                    selectedFertilizerId: fertilizerId,
                    customFertility: customFertility
                };
            }
            return farm;
        });

        return {
            farms: updatedFarms,
            needsRecalculation: true
        };
    }

    /**
     * Update farms with calculated fertilizer results
     */
    static updateFarmsWithCalculationResults(currentFarms, calculatedResults) {
        return currentFarms.map((farm, idx) => ({
            ...farm,
            selectedFertilizerId: calculatedResults[idx].farm.selectedFertilizerId,
            customFertility: calculatedResults[idx].farm.customFertility
        }));
    }

    /**
     * Check if farms have changes that need to be persisted
     */
    static hasChanges(currentFarms, calculatedFarms) {
        return calculatedFarms.some((farm, idx) =>
            farm.selectedFertilizerId !== currentFarms[idx]?.selectedFertilizerId ||
            farm.customFertility !== currentFarms[idx]?.customFertility
        );
    }
}