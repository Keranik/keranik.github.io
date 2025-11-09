// src/utils/RainwaterEstimator.js

/**
 * RainwaterEstimator - Exact replica of Captain of Industry's rainwater collection system
 * 
 * Based on game code analysis:
 * - Farm base collection: 3.0 InverslyScaledBy 50% = 6.0 water/day at 100% rain
 * - Weather types: Heavy Rain (100%), Medium Rain (50%), Cloudy (0%), Sunny (0%)
 * - Year has 24 fortnights (15 days each)
 * - RainPerYear is sum of all fortnight rain intensities
 */

export class RainwaterEstimator {
    // From FarmsData.cs and WeatherData.cs
    static WATER_PER_RAINY_DAY_BASE = 3.0;
    static RAINY_WEATHER_RAIN_INTENSITY = 0.50; // 50%
    static HEAVY_RAIN_WEATHER_RAIN_INTENSITY = 1.00; // 100%

    // Actual water collection rate: 3.0 InverslyScaledBy(50%) = 3.0 / 0.5 = 6.0
    static WATER_COLLECTED_PER_DAY_FULL_RAIN =
        this.WATER_PER_RAINY_DAY_BASE / this.RAINY_WEATHER_RAIN_INTENSITY;

    // Rain percentages per year by difficulty (from DefaultWeatherProvider.cs)
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
        ]
    };

    /**
     * Calculate weather composition from rainPerYear percentage
     * Replicates DefaultWeatherProvider.generateScheduleToTemp() logic
     */
    static calculateWeatherComposition(rainPercentForYear) {
        const rainPercent = Math.round(rainPercentForYear);

        // Calculate number of Heavy Rain fortnights (from generateScheduleToTemp)
        let heavyRains = 0;
        if (rainPercent >= 450) {
            heavyRains = 1.8; // 80% chance of 2, 20% chance of 1 = avg 1.8
        } else if (rainPercent >= 400) {
            heavyRains = 0.5; // 50% chance of 1 = avg 0.5
        } else if (rainPercent >= 250) {
            heavyRains = 0.8; // 80% chance of 1 = avg 0.8
        }

        // Calculate Medium Rain fortnights
        // mediumRains = (rainPercent - heavyRains * 100) / 50
        const heavyRainContribution = heavyRains * 100; // 100% intensity per heavy rain fortnight
        const remainingRain = rainPercent - heavyRainContribution;
        const mediumRains = remainingRain / 50; // 50% intensity per medium rain fortnight

        return {
            heavyRainFortnights: heavyRains,
            mediumRainFortnights: mediumRains,
            totalRainyFortnights: heavyRains + mediumRains,
            sunnyFortnights: 24 - (heavyRains + mediumRains)
        };
    }

    /**
     * Interpolate rain percentage for a given year
     */
    static getRainPercentForYear(difficulty, year) {
        const data = this.RAIN_PER_YEAR_DATA[difficulty] || this.RAIN_PER_YEAR_DATA.Normal;

        if (year <= data[0].year) {
            return data[0].rainPercent;
        }

        if (year >= data[data.length - 1].year) {
            return data[data.length - 1].rainPercent;
        }

        // Linear interpolation
        for (let i = 0; i < data.length - 1; i++) {
            if (year >= data[i].year && year <= data[i + 1].year) {
                const lowerPoint = data[i];
                const upperPoint = data[i + 1];
                const yearRange = upperPoint.year - lowerPoint.year;
                const rainRange = upperPoint.rainPercent - lowerPoint.rainPercent;
                const yearOffset = year - lowerPoint.year;
                return lowerPoint.rainPercent + (rainRange / yearRange) * yearOffset;
            }
        }

        return 300; // Fallback
    }

    /**
     * Estimate monthly rainwater collection - EXACT game replica
     * 
     * @param {string} difficulty - 'Easy', 'Normal', or 'Hard'
     * @param {number} year - Game year (1-50+)
     * @param {number} farmCount - Number of farms
     * @param {number} rainYieldBonus - Research bonus percentage (0-100+)
     * @returns {object} Detailed water collection estimate
     */
    static estimateMonthlyRainwater(difficulty, year, farmCount = 1, rainYieldBonus = 0) {
        // Get base rain percentage for the year
        const rainPercentForYear = this.getRainPercentForYear(difficulty, year);

        // Calculate weather composition
        const weather = this.calculateWeatherComposition(rainPercentForYear);

        // Calculate average daily rain intensity across the year
        // Each fortnight is 15 days, year has 24 fortnights = 360 days
        const heavyRainDays = weather.heavyRainFortnights * 15;
        const mediumRainDays = weather.mediumRainFortnights * 15;

        // Weighted average intensity per day across the whole year
        const avgDailyRainIntensity =
            (heavyRainDays * this.HEAVY_RAIN_WEATHER_RAIN_INTENSITY +
                mediumRainDays * this.RAINY_WEATHER_RAIN_INTENSITY) / 360;

        // Apply research bonus (RainYieldMultiplier)
        const rainYieldMultiplier = 1.0 + (rainYieldBonus / 100);

        // Calculate water collection per farm per day
        // Formula from RainHarvestingHelper.onNewDay():
        // waterCollected = WaterCollectedPerDayFullRain * RainYieldMultiplier * RainIntensity
        const waterPerFarmPerDay =
            this.WATER_COLLECTED_PER_DAY_FULL_RAIN *
            rainYieldMultiplier *
            avgDailyRainIntensity;

        // Calculate monthly and total values
        const baseWaterPerFarmPerDay =
            this.WATER_COLLECTED_PER_DAY_FULL_RAIN * avgDailyRainIntensity;
        const perFarmPerMonth = waterPerFarmPerDay * 30;
        const basePerFarmPerMonth = baseWaterPerFarmPerDay * 30;
        const totalPerMonth = perFarmPerMonth * farmCount;
        const baseTotalPerMonth = basePerFarmPerMonth * farmCount;

        return {
            difficulty,
            year,
            farmCount,
            rainYieldBonus,

            // Rain data
            baseRainPercent: parseFloat(rainPercentForYear.toFixed(1)),

            // Weather breakdown
            weatherComposition: {
                heavyRainFortnights: parseFloat(weather.heavyRainFortnights.toFixed(2)),
                mediumRainFortnights: parseFloat(weather.mediumRainFortnights.toFixed(2)),
                heavyRainDays: parseFloat(heavyRainDays.toFixed(1)),
                mediumRainDays: parseFloat(mediumRainDays.toFixed(1)),
                totalRainyDays: parseFloat((heavyRainDays + mediumRainDays).toFixed(1)),
                avgDailyRainIntensity: parseFloat((avgDailyRainIntensity * 100).toFixed(2)) + '%'
            },

            // Water collection
            perFarmPerDay: parseFloat(waterPerFarmPerDay.toFixed(2)),
            perFarmPerMonth: parseFloat(perFarmPerMonth.toFixed(1)),
            totalPerMonth: parseFloat(totalPerMonth.toFixed(1)),
            baseRainwater: parseFloat(baseTotalPerMonth.toFixed(1)), // Without research bonus
            totalPerYear: parseFloat((totalPerMonth * 12).toFixed(1))
        };
    }

    /**
     * Get all available difficulties
     */
    static getDifficulties() {
        return Object.keys(this.RAIN_PER_YEAR_DATA);
    }

    /**
     * Get year range
     */
    static getYearRange() {
        return {
            min: 1,
            max: 50,
            recommended: [1, 5, 10, 15, 20, 25, 30, 40, 50]
        };
    }

    /**
     * Get difficulty description
     */
    static getDifficultyDescription(difficulty) {
        const descriptions = {
            Easy: 'Frequent rain, reliable water supply',
            Normal: 'Standard rainfall patterns',
            Hard: 'Reduced rainfall, irrigation recommended'
        };
        return descriptions[difficulty] || descriptions.Normal;
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

export default RainwaterEstimator;