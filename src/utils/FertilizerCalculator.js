// src/utils/FertilizerCalculator.js
import ProductionCalculator from './ProductionCalculator';

export class FertilizerCalculator {
    // Production costs for fertilizers (worker-months per unit of fertilizer produced)
    static FERTILIZER_PRODUCTION_COSTS = {
        'Product_FertilizerOrganic': {
            unitsPerWorkerMonth: 12,
            fertilityPerWorkerMonth: 12,
            workerMonthsPerUnit: 1 / 12  // 0.083
        },
        'Product_Fertilizer': {
            unitsPerWorkerMonth: 4.29,
            fertilityPerWorkerMonth: 8.58,
            workerMonthsPerUnit: 1 / 4.29  // 0.233
        },
        'Product_Fertilizer2': {
            unitsPerWorkerMonth: 3.27,
            fertilityPerWorkerMonth: 8.18,
            workerMonthsPerUnit: 1 / 3.27  // 0.306
        }
    };

    /**
     * Get the fertility boost per unit for a given fertilizer product
     * @param {string} fertilizerId - Product ID of the fertilizer
     * @returns {number} - Fertility boost percentage per unit
     */
    static getFertilityBoost(fertilizerId) {
        const product = ProductionCalculator.products?.find(p => p.id === fertilizerId);

        if (product && product.fertilizer && product.fertilizer.fertilityPerQuantityPercent !== undefined) {
            return product.fertilizer.fertilityPerQuantityPercent;
        }

        // Fallback to default values if not found in game data
        const defaultBoosts = {
            'Product_FertilizerOrganic': 10,
            'Product_Fertilizer': 20,
            'Product_Fertilizer2': 30
        };

        return defaultBoosts[fertilizerId] || 10;
    }

    /**
     * Get the production chain data for a fertilizer
     * @param {string} fertilizerId - Product ID of the fertilizer
     * @returns {object} - Production chain data
     */
    static getProductionChain(fertilizerId) {
        const costData = this.FERTILIZER_PRODUCTION_COSTS[fertilizerId];

        if (costData) {
            return {
                workerMonthsPerUnit: costData.workerMonthsPerUnit,
                unitsPerWorkerMonth: costData.unitsPerWorkerMonth,
                fertilityPerWorkerMonth: costData.fertilityPerWorkerMonth,
                complexity: this.getComplexity(fertilizerId)
            };
        }

        // Fallback
        return {
            workerMonthsPerUnit: 0.5,
            unitsPerWorkerMonth: 2,
            fertilityPerWorkerMonth: 10,
            complexity: 'unknown'
        };
    }

    /**
     * Get complexity level of fertilizer production
     * @param {string} fertilizerId - Product ID
     * @returns {string} - Complexity level
     */
    static getComplexity(fertilizerId) {
        const complexityMap = {
            'Product_FertilizerOrganic': 'low',
            'Product_Fertilizer': 'medium',
            'Product_Fertilizer2': 'high'
        };
        return complexityMap[fertilizerId] || 'unknown';
    }

    /**
     * Get human-readable fertilizer name
     * @param {string} fertilizerId - Product ID
     * @returns {string} - Display name
     */
    static getFertilizerName(fertilizerId) {
        const product = ProductionCalculator.products?.find(p => p.id === fertilizerId);
        if (product) {
            return product.name;
        }

        // Fallback names
        const names = {
            'Product_FertilizerOrganic': 'Compost',
            'Product_Fertilizer': 'Fertilizer I',
            'Product_Fertilizer2': 'Fertilizer II'
        };
        return names[fertilizerId] || 'Unknown Fertilizer';
    }

    /**
     * Calculate fertilizer options for a farm
     * @param {number} naturalEquilibrium - Natural fertility equilibrium
     * @param {number} targetFertility - Target fertility level
     * @param {number} farmPeopleFed - Current people fed by the farm
     * @param {Array<string>} allowedFertilizerIds - List of allowed fertilizer IDs
     * @returns {Array<object>} - Array of fertilizer options with calculations
     */
    static calculateFertilizerOptions(naturalEquilibrium, targetFertility, farmPeopleFed, allowedFertilizerIds) {
        const extraFertilityNeeded = Math.max(0, targetFertility - naturalEquilibrium);

        console.log('FertilizerCalculator Debug:', {
            naturalEquilibrium,
            targetFertility,
            extraFertilityNeeded,
            farmPeopleFed,
            allowedFertilizerIds
        });

        if (extraFertilityNeeded === 0) {
            console.log('No extra fertility needed');
            return [];
        }

        // Get all products that have fertilizer data
        const allFertilizers = (ProductionCalculator.products || []).filter(p => {
            const hasFertilizer = p.fertilizer &&
                p.fertilizer.fertilityPerQuantityPercent !== undefined &&
                p.fertilizer.maxFertilityPercent !== undefined;

            const isAllowed = allowedFertilizerIds.includes(p.id);

            if (hasFertilizer && !isAllowed) {
                console.log(`Fertilizer ${p.id} (${p.name}) found but not in allowed list`);
            }

            return hasFertilizer && isAllowed;
        });

        console.log('Found fertilizers:', allFertilizers.map(f => ({
            id: f.id,
            name: f.name,
            fertPerQuantity: f.fertilizer.fertilityPerQuantityPercent,
            maxFert: f.fertilizer.maxFertilityPercent
        })));

        if (allFertilizers.length === 0) {
            console.warn('No fertilizers found! Check if fertilizer data is loaded in ProductionCalculator.products');
            return [];
        }

        const options = allFertilizers.map(fertilizer => {
            const isViable = fertilizer.fertilizer.maxFertilityPercent >= targetFertility;

            if (!isViable) {
                console.log(`Fertilizer ${fertilizer.name} not viable (max ${fertilizer.fertilizer.maxFertilityPercent}% < target ${targetFertility}%)`);
                return null;
            }

            const fertilityPerQuantity = fertilizer.fertilizer.fertilityPerQuantityPercent;
            const quantityPerDay = extraFertilityNeeded / fertilityPerQuantity;
            const quantityPerMonth = quantityPerDay * 30;
            const quantityPerYear = quantityPerDay * 360;

            const productionCost = this.FERTILIZER_PRODUCTION_COSTS[fertilizer.id];

            let workerMonthsPerYear;
            if (productionCost) {
                workerMonthsPerYear = quantityPerYear / productionCost.unitsPerWorkerMonth;
            } else {
                console.warn(`No production cost data for fertilizer: ${fertilizer.id}`);
                // Use conservative estimate: assume 1 unit per 10 worker-months
                workerMonthsPerYear = quantityPerYear / 10;
            }

            // Calculate yield increase from fertility boost
            const yieldMultiplier = targetFertility / naturalEquilibrium;
            const newYield = farmPeopleFed * yieldMultiplier;
            const yieldIncrease = newYield - farmPeopleFed;

            // Net benefit = people fed increase - workers consumed
            const workersNeeded = workerMonthsPerYear / 12;
            const netPeopleFed = yieldIncrease - workersNeeded;

            return {
                fertilizerId: fertilizer.id,
                fertilizerName: fertilizer.name,
                quantityPerDay,
                quantityPerMonth,
                quantityPerYear,
                workerMonthsPerYear,
                workersNeeded,
                peopleFedIncrease: yieldIncrease,
                netPeopleFed,
                maxFertility: fertilizer.fertilizer.maxFertilityPercent,
                fertilityPerQuantity: fertilityPerQuantity,
                isViable,
                efficiency: yieldIncrease / workersNeeded,
                efficiencyScore: netPeopleFed,
                isBest: false
            };
        }).filter(opt => opt !== null);

        console.log('Viable fertilizer options:', options.length);

        // Sort by net people fed (best efficiency)
        options.sort((a, b) => b.netPeopleFed - a.netPeopleFed);

        // Mark the best option
        if (options.length > 0) {
            options[0].isBest = true;
        }

        return options;
    }

    /**
     * Get the recommended fertilizer for a farm
     * @param {number} naturalEquilibrium - Natural fertility equilibrium
     * @param {number} targetFertility - Target fertility level
     * @param {number} farmPeopleFed - Current people fed by the farm
     * @param {Array<string>} allowedFertilizerIds - List of allowed fertilizer IDs
     * @returns {object|null} - Best fertilizer option or null
     */
    static getRecommendedFertilizer(naturalEquilibrium, targetFertility, farmPeopleFed, allowedFertilizerIds) {
        const options = this.calculateFertilizerOptions(naturalEquilibrium, targetFertility, farmPeopleFed, allowedFertilizerIds);
        return options[0] || null;
    }

    /**
 * Find the optimal fertilizer and target fertility across all possibilities
 * Tests multiple fertility targets and returns the option with highest net benefit
 * @param {number} naturalEquilibrium - Natural fertility equilibrium
 * @param {number} farmPeopleFed - Current people fed by the farm
 * @param {Array<string>} allowedFertilizerIds - List of allowed fertilizer IDs
 * @returns {Object|null} Best fertilizer option with targetFertility property, or null
 */
    static findOptimalFertilizer(naturalEquilibrium, farmPeopleFed, allowedFertilizerIds) {
        if (allowedFertilizerIds.length === 0) return null;

        // Test fertility targets in 10% increments
        const testTargets = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];

        // Only test targets above natural equilibrium
        const viableTargets = testTargets.filter(t => t > naturalEquilibrium);

        if (viableTargets.length === 0) return null;

        let bestOption = null;
        let bestNetBenefit = 0;

        // Test each target and find the absolute best
        viableTargets.forEach(target => {
            const options = this.calculateFertilizerOptions(
                naturalEquilibrium,
                target,
                farmPeopleFed,
                allowedFertilizerIds
            );

            // Find the best fertilizer for this target (marked with isBest)
            const best = options.find(opt => opt.isBest);

            // Only consider if it has positive net benefit
            if (best && best.netPeopleFed > 0) {
                if (best.netPeopleFed > bestNetBenefit) {
                    bestNetBenefit = best.netPeopleFed;
                    bestOption = {
                        ...best,
                        targetFertility: target
                    };
                }
            }
        });

        return bestOption;
    }

    /**
     * Calculate total fertilizer needs across all farms
     * @param {Array<object>} farmResults - Array of farm result objects
     * @param {Array<string>} allowedFertilizerIds - List of allowed fertilizer IDs
     * @returns {Array<object>} - Aggregated fertilizer totals by type
     */
    static calculateTotalFertilizerNeeds(farmResults, allowedFertilizerIds) {
        const fertilizerTotals = new Map();

        farmResults.forEach(farmResult => {
            const options = this.calculateFertilizerOptions(
                farmResult.fertilityInfo.naturalEquilibrium,
                farmResult.actualFertility,
                farmResult.peopleFed,
                allowedFertilizerIds
            );

            if (options.length > 0) {
                const best = options[0];
                const current = fertilizerTotals.get(best.fertilizerId) || {
                    fertilizerId: best.fertilizerId,
                    fertilizerName: best.fertilizerName,
                    totalQuantityPerMonth: 0,
                    totalQuantityPerYear: 0,
                    totalWorkerMonths: 0,
                    farmsUsing: 0
                };

                current.totalQuantityPerMonth += best.quantityPerMonth;
                current.totalQuantityPerYear += best.quantityPerYear;
                current.totalWorkerMonths += best.workerMonthsPerYear;
                current.farmsUsing += 1;

                fertilizerTotals.set(best.fertilizerId, current);
            }
        });

        return Array.from(fertilizerTotals.values());
    }

    /**
     * Calculate global fertilizer usage summary across multiple farms
     * @param {Array<object>} farmResults - Array of farm result objects
     * @param {Array<string>} allowedFertilizerIds - List of allowed fertilizer IDs
     * @returns {object} - Global fertilizer summary
     */
    static calculateGlobalUsage(farmResults, allowedFertilizerIds) {
        const summary = {
            totalFertilizerUsed: {},
            totalPeopleFedIncrease: 0,
            totalWorkerMonths: 0,
            farmsUsingFertilizer: 0,
            byType: []
        };

        farmResults.forEach(farmResult => {
            if (farmResult.usingFertilizer && farmResult.farm.selectedFertilizerId) {
                const fertilizerId = farmResult.farm.selectedFertilizerId;
                const naturalEquilibrium = farmResult.fertilityInfo.naturalEquilibrium;
                const targetFertility = farmResult.actualFertility;
                const fertilityGap = targetFertility - naturalEquilibrium;

                if (fertilityGap <= 0) return;

                const fertilityBoost = this.getFertilityBoost(fertilizerId);
                const unitsNeeded = Math.ceil(fertilityGap / fertilityBoost);
                const unitsPerYear = unitsNeeded * 12;

                // Add to totals
                summary.totalFertilizerUsed[fertilizerId] =
                    (summary.totalFertilizerUsed[fertilizerId] || 0) + unitsPerYear;

                // Calculate benefit
                const baseYield = farmResult.peopleFed;
                const yieldMultiplier = targetFertility / naturalEquilibrium;
                const yieldIncrease = baseYield * (yieldMultiplier - 1);

                const productionChain = this.getProductionChain(fertilizerId);
                const totalWorkerMonths = unitsNeeded * productionChain.workerMonthsPerUnit * 12;

                summary.totalPeopleFedIncrease += yieldIncrease;
                summary.totalWorkerMonths += totalWorkerMonths;
                summary.farmsUsingFertilizer++;
            }
        });

        // Build by-type breakdown
        summary.byType = Object.entries(summary.totalFertilizerUsed).map(([id, amount]) => ({
            id,
            name: this.getFertilizerName(id),
            unitsPerYear: amount
        }));

        return summary;
    }
}