// src/utils/FertilizerCalculator.js - DYNAMIC VERSION WITH SMART RANGE DETECTION

import ProductionCalculator from './ProductionCalculator';
import { FertilizerProductionAnalyzer } from './FertilizerProductionAnalyzer';

export class FertilizerCalculator {
    static FERTILIZER_PRODUCTION_COSTS = null;
    static isInitialized = false;
    static maxFertilityCapByFertilizers = 200; // ✅ Will be set dynamically


    static initialize() {
        if (this.isInitialized) {
            return;
        }

        const allFertilizers = (ProductionCalculator.products || []).filter(p =>
            p.fertilizer &&
            p.fertilizer.fertilityPerQuantityPercent !== undefined &&
            p.fertilizer.maxFertilityPercent !== undefined
        );

        if (allFertilizers.length === 0) {
            this.FERTILIZER_PRODUCTION_COSTS = this.getFallbackCosts();
            this.maxFertilityCapByFertilizers = 200;
            this.isInitialized = true;
            return;
        }

        this.maxFertilityCapByFertilizers = Math.max(
            ...allFertilizers.map(f => f.fertilizer.maxFertilityPercent || 140)
        );

        const fertilizerIds = allFertilizers.map(f => f.id);

        /*try {*/
            const { replacementData } = FertilizerProductionAnalyzer.generateReplacementData(fertilizerIds);

            // ✅ COMPARE: Show both generated and fallback values
            console.log('\n📊 COMPARISON: Generated vs Fallback Values');
            console.log('='.repeat(80));

            const fallback = this.getFallbackCosts();

            console.log('='.repeat(80) + '\n');

        //    this.FERTILIZER_PRODUCTION_COSTS = replacementData;
        //    this.isInitialized = true;
        //} catch (error) {
        //    console.error('Error initializing FertilizerCalculator:', error);
            this.FERTILIZER_PRODUCTION_COSTS = this.getFallbackCosts();
            this.isInitialized = true;
       /* }*/
    }

    static getFallbackCosts() {
        return {
            'Product_FertilizerOrganic': {
                unitsPerWorkerMonth: 16,
                fertilityPerWorkerMonth: 16,
                workerMonthsPerUnit: 0.0625
            },
            'Product_Fertilizer': {
                unitsPerWorkerMonth: 4,
                fertilityPerWorkerMonth: 8,
                workerMonthsPerUnit: 0.25
            },
            'Product_Fertilizer2': {
                unitsPerWorkerMonth: 3.2,
                fertilityPerWorkerMonth: 8,
                workerMonthsPerUnit: 0.3125
            }
        };
    }

    /**
     * Get the maximum fertility cap based on available fertilizers
     * @param {Array<string>} allowedFertilizerIds - Optional: filter by allowed fertilizers
     * @returns {number} - Maximum fertility percentage achievable
     */
    static getMaxFertilityCap(allowedFertilizerIds = null) {
        if (!this.isInitialized) {
            this.initialize();
        }

        // If specific fertilizers are allowed, calculate cap from those
        if (allowedFertilizerIds && allowedFertilizerIds.length > 0) {
            const allowedFertilizers = (ProductionCalculator.products || []).filter(p =>
                p.fertilizer &&
                p.fertilizer.maxFertilityPercent !== undefined &&
                allowedFertilizerIds.includes(p.id)
            );

            if (allowedFertilizers.length > 0) {
                return Math.max(...allowedFertilizers.map(f => f.fertilizer.maxFertilityPercent));
            }
        }

        // Return global cap
        return this.maxFertilityCapByFertilizers;
    }

    static getFertilityBoost(fertilizerId) {
        const product = ProductionCalculator.products?.find(p => p.id === fertilizerId);
        if (product && product.fertilizer && product.fertilizer.fertilityPerQuantityPercent !== undefined) {
            return product.fertilizer.fertilityPerQuantityPercent;
        }
        return 10;
    }

    static getProductionChain(fertilizerId) {
        if (!this.isInitialized) {
            this.initialize();
        }

        const costData = this.FERTILIZER_PRODUCTION_COSTS[fertilizerId];
        if (costData) {
            return {
                workerMonthsPerUnit: costData.workerMonthsPerUnit,
                unitsPerWorkerMonth: costData.unitsPerWorkerMonth,
                fertilityPerWorkerMonth: costData.fertilityPerWorkerMonth,
                complexity: this.getComplexity(fertilizerId)
            };
        }

        return {
            workerMonthsPerUnit: 0.5,
            unitsPerWorkerMonth: 2,
            fertilityPerWorkerMonth: 10,
            complexity: 'unknown'
        };
    }

    static getComplexity(fertilizerId) {
        const complexityMap = {
            'Product_FertilizerOrganic': 'low',
            'Product_Fertilizer': 'medium',
            'Product_Fertilizer2': 'high'
        };
        return complexityMap[fertilizerId] || 'unknown';
    }

    static getFertilizerName(fertilizerId) {
        const product = ProductionCalculator.products?.find(p => p.id === fertilizerId);
        return product ? product.name : 'Unknown Fertilizer';
    }

    static calculateFertilizerOptions(naturalEquilibrium, targetFertility, farmPeopleFed, allowedFertilizerIds) {
        if (!this.isInitialized) {
            this.initialize();
        }

        const extraFertilityNeeded = Math.max(0, targetFertility - naturalEquilibrium);
        if (extraFertilityNeeded === 0) {
            return [];
        }

        const allFertilizers = (ProductionCalculator.products || []).filter(p => {
            const hasFertilizer = p.fertilizer &&
                p.fertilizer.fertilityPerQuantityPercent !== undefined &&
                p.fertilizer.maxFertilityPercent !== undefined;
            return hasFertilizer && allowedFertilizerIds.includes(p.id);
        });

        if (allFertilizers.length === 0) {
            return [];
        }

        const options = allFertilizers.map(fertilizer => {
            const isViable = fertilizer.fertilizer.maxFertilityPercent >= targetFertility;
            if (!isViable) {
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
                workerMonthsPerYear = quantityPerYear / 10;
            }

            const yieldMultiplier = targetFertility / naturalEquilibrium;
            const newYield = farmPeopleFed * yieldMultiplier;
            const yieldIncrease = newYield - farmPeopleFed;

            const workersNeeded = workerMonthsPerYear / 12;
            const netPeopleFed = yieldIncrease - workersNeeded;

            console.log(`      ${fertilizer.name} at ${targetFertility}%:`, {
                yieldIncrease: yieldIncrease.toFixed(1),
                workersNeeded: workersNeeded.toFixed(1),
                netPeopleFed: netPeopleFed.toFixed(1),
                quantityPerYear: quantityPerYear.toFixed(1),
                productionCost: productionCost?.unitsPerWorkerMonth
            });

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

    /**
     * ✅ SMART RANGE TESTING: Only test from natural equilibrium to max fertilizer cap
     * Tests all viable targets in 10% increments to find true optimal
     */
    static findOptimalFertilizer(naturalEquilibrium, farmPeopleFed, allowedFertilizerIds) {
        if (!this.isInitialized) {
            this.initialize();
        }

        if (allowedFertilizerIds.length === 0) return null;

        // ✅ Get the max fertility from the allowed fertilizers
        const maxFertilityCap = this.getMaxFertilityCap(allowedFertilizerIds);

        // ✅ Generate test targets from (naturalEquilibrium + 10%) to maxFertilityCap
        const minTarget = Math.ceil(naturalEquilibrium / 10) * 10 + 10; // Round up to next 10%
        const testTargets = [];

        for (let target = minTarget; target <= maxFertilityCap; target += 10) {
            testTargets.push(target);
        }

        if (testTargets.length === 0) return null;

        let bestOption = null;
        let bestNetBenefit = 0;

        // Test each viable target
        testTargets.forEach(target => {
            const options = this.calculateFertilizerOptions(
                naturalEquilibrium,
                target,
                farmPeopleFed,
                allowedFertilizerIds
            );

            const best = options.find(opt => opt.isBest);
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

                summary.totalFertilizerUsed[fertilizerId] =
                    (summary.totalFertilizerUsed[fertilizerId] || 0) + unitsPerYear;

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

        summary.byType = Object.entries(summary.totalFertilizerUsed).map(([id, amount]) => ({
            id,
            name: this.getFertilizerName(id),
            unitsPerYear: amount
        }));

        return summary;
    }
}