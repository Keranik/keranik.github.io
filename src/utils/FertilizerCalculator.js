// src/utils/FertilizerCalculator.js - REPLACE the entire file
import ProductionCalculator from './ProductionCalculator';

export class FertilizerCalculator {
    static FERTILIZER_PRODUCTION_COSTS = {
        'Product_FertilizerOrganic': {
            unitsPerWorkerMonth: 12,
            fertilityPerWorkerMonth: 12
        },
        'Product_Fertilizer': {
            unitsPerWorkerMonth: 4.29,
            fertilityPerWorkerMonth: 8.58
        },
        'Product_Fertilizer2': {
            unitsPerWorkerMonth: 3.27,
            fertilityPerWorkerMonth: 8.18
        }
    };

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

            const quantityPerDay = extraFertilityNeeded / fertilizer.fertilizer.fertilityPerQuantityPercent;
            const quantityPerMonth = quantityPerDay * 30;
            const quantityPerYear = quantityPerDay * 360;

            const productionCost = this.FERTILIZER_PRODUCTION_COSTS[fertilizer.id];
            if (!productionCost) {
                console.warn(`No production cost data for fertilizer: ${fertilizer.id}`);
                // Use a default conservative estimate
                const workerMonthsPerYear = quantityPerYear / 10;
                const netPeopleFed = farmPeopleFed - workerMonthsPerYear;

                return {
                    fertilizerId: fertilizer.id,
                    fertilizerName: fertilizer.name,
                    quantityPerDay,
                    quantityPerMonth,
                    quantityPerYear,
                    workerMonthsPerYear,
                    netPeopleFed,
                    maxFertility: fertilizer.fertilizer.maxFertilityPercent,
                    fertilityPerQuantity: fertilizer.fertilizer.fertilityPerQuantityPercent,
                    isViable,
                    efficiencyScore: netPeopleFed,
                    isBest: false
                };
            }

            const workerMonthsPerYear = quantityPerYear / productionCost.unitsPerWorkerMonth;
            const netPeopleFed = farmPeopleFed - workerMonthsPerYear;

            return {
                fertilizerId: fertilizer.id,
                fertilizerName: fertilizer.name,
                quantityPerDay,
                quantityPerMonth,
                quantityPerYear,
                workerMonthsPerYear,
                netPeopleFed,
                maxFertility: fertilizer.fertilizer.maxFertilityPercent,
                fertilityPerQuantity: fertilizer.fertilizer.fertilityPerQuantityPercent,
                isViable,
                efficiencyScore: netPeopleFed,
                isBest: false
            };
        }).filter(opt => opt !== null);

        console.log('Viable fertilizer options:', options.length);

        options.sort((a, b) => b.netPeopleFed - a.netPeopleFed);

        if (options.length > 0) {
            options[0].isBest = true;
        }

        return options;
    }

    static getRecommendedFertilizer(naturalEquilibrium, targetFertility, farmPeopleFed, allowedFertilizerIds) {
        const options = this.calculateFertilizerOptions(naturalEquilibrium, targetFertility, farmPeopleFed, allowedFertilizerIds);
        return options[0] || null;
    }

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
}