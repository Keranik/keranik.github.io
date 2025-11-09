// src/utils/RainwaterEstimator.js

export class RainwaterEstimator {
    // Rain yield percentages per year by difficulty (from DefaultWeatherProvider.cs)
    static RAIN_PER_YEAR_DATA = {
        Easy: [
            { year: 1, rainPercent: 450 },
            { year: 15, rainPercent: 400 },
            { year: 50, rainPercent: 350 }
        ],
        Normal: [
            { year: 1, rainPercent: 400 },
            { year: 10, rainPercent: 350 },
            { year: 50, rainPercent: 300 }
        ],
        Hard: [
            { year: 1, rainPercent: 350 },
            { year: 10, rainPercent: 325 },
            { year: 25, rainPercent: 300 },
            { year: 50, rainPercent: 250 }
        ],
        VeryHard: [ // Assuming "Dry" maps to Hard difficulty
            { year: 1, rainPercent: 350 },
            { year: 10, rainPercent: 325 },
            { year: 25, rainPercent: 300 },
            { year: 50, rainPercent: 250 }
        ]
    };

    // Base water collection rate per farm from FarmsData.cs
    // Most farms have WATER_PER_RAINY_DAY = 3.0
    static BASE_WATER_PER_RAINY_DAY = 3.0;

    /**
     * Interpolate rain percentage for a given year based on difficulty curve
     * @param {string} difficulty - Game difficulty (Easy, Normal, Hard, VeryHard)
     * @param {number} year - Current game year
     * @returns {number} Rain percentage for that year
     */
    static getRainPercentForYear(difficulty, year) {
        const data = this.RAIN_PER_YEAR_DATA[difficulty] || this.RAIN_PER_YEAR_DATA.Normal;

        // Find the two data points to interpolate between
        let lowerPoint = data[0];
        let upperPoint = data[data.length - 1];

        for (let i = 0; i < data.length - 1; i++) {
            if (year >= data[i].year && year <= data[i + 1].year) {
                lowerPoint = data[i];
                upperPoint = data[i + 1];
                break;
            }
        }

        // If year is before first data point, use first
        if (year < data[0].year) {
            return data[0].rainPercent;
        }

        // If year is after last data point, use last
        if (year > data[data.length - 1].year) {
            return data[data.length - 1].rainPercent;
        }

        // Linear interpolation between two points
        const yearRange = upperPoint.year - lowerPoint.year;
        const rainRange = upperPoint.rainPercent - lowerPoint.rainPercent;
        const yearOffset = year - lowerPoint.year;

        return lowerPoint.rainPercent + (rainRange / yearRange) * yearOffset;
    }

    /**
     * Estimate monthly rainwater collection
     * @param {string} difficulty - Game difficulty (Easy, Normal, Hard, VeryHard)
     * @param {number} year - Current game year (1-50+)
     * @param {number} farmCount - Number of farms
     * @param {number} rainYieldBonus - Research bonus percentage (0-100)
     * @returns {object} Rainwater estimates
     */
    static estimateMonthlyRainwater(difficulty, year, farmCount = 1, rainYieldBonus = 0) {
        // Get base rain percentage for the year
        const rainPercentForYear = this.getRainPercentForYear(difficulty, year);

        // Apply research bonus (RainYieldMultiplier from research)
        // Formula: baseRain * (1 + bonusPercent/100)
        const rainYieldMultiplier = 1.0 + (rainYieldBonus / 100);
        const adjustedRainPercent = rainPercentForYear * rainYieldMultiplier;

        // Convert rain percentage to average daily collection
        // The game distributes rain across 360 days (24 fortnights × 15 days)
        // RainPerYear of 400% means 400% of base collection spread across the year
        const totalWaterPerYear = this.BASE_WATER_PER_RAINY_DAY * (adjustedRainPercent / 100);

        // Average per day (spread across 360 days)
        const avgWaterPerDay = totalWaterPerYear / 360;

        // Per month (30 days)
        const perFarmPerMonth = avgWaterPerDay * 30;
        const totalPerMonth = perFarmPerMonth * farmCount;

        return {
            perFarmPerDay: parseFloat(avgWaterPerDay.toFixed(2)),
            perFarmPerMonth: parseFloat(perFarmPerMonth.toFixed(1)),
            totalPerMonth: parseFloat(totalPerMonth.toFixed(1)),
            totalPerYear: parseFloat((totalPerMonth * 12).toFixed(1)),
            difficulty,
            year,
            farmCount,
            rainYieldBonus,
            baseRainPercent: parseFloat(rainPercentForYear.toFixed(1)),
            adjustedRainPercent: parseFloat(adjustedRainPercent.toFixed(1))
        };
    }

    /**
     * Get difficulty description
     */
    static getDifficultyDescription(difficulty) {
        const descriptions = {
            Easy: 'Frequent rain, reliable water supply (starts at 450% rain)',
            Normal: 'Standard rainfall patterns (starts at 400% rain)',
            Hard: 'Reduced rainfall, irrigation recommended (starts at 350% rain)',
            VeryHard: 'Minimal rain, heavy irrigation required (starts at 350% rain)'
        };
        return descriptions[difficulty] || descriptions.Normal;
    }

    /**
     * Estimate if farms need irrigation based on crop water needs
     */
    static needsIrrigation(estimatedRainwater, totalWaterNeeded) {
        return totalWaterNeeded > estimatedRainwater;
    }

    /**
     * Calculate irrigation shortfall
     */
    static calculateIrrigationNeeded(estimatedRainwater, totalWaterNeeded) {
        const shortfall = Math.max(0, totalWaterNeeded - estimatedRainwater);
        return {
            rainwaterProvides: estimatedRainwater,
            totalNeeded: totalWaterNeeded,
            irrigationNeeded: shortfall,
            rainwaterCoverage: totalWaterNeeded > 0
                ? ((estimatedRainwater / totalWaterNeeded) * 100).toFixed(1)
                : 100
        };
    }

    /**
     * Get year-by-year breakdown for planning
     */
    static getYearlyBreakdown(difficulty, startYear, endYear, farmCount = 1, rainYieldBonus = 0) {
        const breakdown = [];
        for (let year = startYear; year <= endYear; year++) {
            breakdown.push({
                year,
                ...this.estimateMonthlyRainwater(difficulty, year, farmCount, rainYieldBonus)
            });
        }
        return breakdown;
    }
}