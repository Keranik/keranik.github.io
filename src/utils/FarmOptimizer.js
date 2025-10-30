import ProductionCalculator from './ProductionCalculator';
import { FarmConstants } from './FarmConstants';

export class FarmOptimizer {
  
  /**
   * Main optimization entry point
   */
  static optimizeFarms(config) {
    const { 
      farms,           // Array of { farmId, tier }
      edicts,          // Array of active edict IDs
      research,        // { cropYield: levels, waterReduction: levels, etc. }
      goal,            // { type, ...params }
      foodMultiplier   // Consumption multiplier (from edicts)
    } = config;
    
    // Calculate effective multipliers for all farms
    const effectiveFarms = farms.map(f => 
      this.calculateEffectiveFarmStats(f, edicts, research)
    );
    
    // Route to appropriate optimizer
    switch (goal.type) {
      case 'maxCalories':
        return this.optimizeMaxCalories(effectiveFarms, goal.farmCount);
      case 'balancedDiet':
        return this.optimizeBalancedDiet(effectiveFarms);
      case 'targetProducts':
        return this.optimizeForProducts(effectiveFarms, goal.targets);
      case 'minWater':
        return this.optimizeMinWater(effectiveFarms, goal.minCalories);
      case 'minFertility':
        return this.optimizeMinFertility(effectiveFarms, goal.minCalories);
      default:
        return null;
    }
  }
  
  /**
   * Calculate effective farm stats with all multipliers (additive stacking)
   */
  static calculateEffectiveFarmStats(farm, edictIds, research) {
    const farmProto = ProductionCalculator.farms.find(f => f.id === farm.farmId);
    if (!farmProto) return null;
    
    let yieldMult = farmProto.yieldMultiplierPercent;
    let waterMult = farmProto.demandsMultiplierPercent;
    
    // Apply edicts (additive)
    const farmYieldEdicts = this.getActiveEdictBonuses(edictIds, 'FarmYield');
    farmYieldEdicts.forEach(bonus => {
      yieldMult += bonus.yieldBonus;
      waterMult += bonus.waterIncrease;
    });
    
    // Apply research (additive)
    const cropYieldBonus = (research.cropYield || 0) * 1.0; // +1% per level
    const waterReductionBonus = (research.waterReduction || 0) * -1.0; // -1% per level
    
    yieldMult += cropYieldBonus;
    waterMult += waterReductionBonus;
    
    return {
      ...farmProto,
      originalYield: farmProto.yieldMultiplierPercent,
      originalWater: farmProto.demandsMultiplierPercent,
      effectiveYieldMult: yieldMult / 100, // Convert to decimal
      effectiveWaterMult: waterMult / 100,
      effectiveFertilityReplenish: farmProto.fertilityReplenishPercent
    };
  }
  
  /**
   * Get active edict bonuses
   */
  static getActiveEdictBonuses(edictIds, type) {
    const bonuses = [];
    edictIds.forEach(id => {
      const research = ProductionCalculator.farmResearch?.find(r => r.id === id);
      if (research && research.perLevelBonuses) {
        if (type === 'FarmYield' && research.perLevelBonuses['FarmYieldMultiplier']) {
          bonuses.push({
            yieldBonus: research.perLevelBonuses['FarmYieldMultiplier'] * 100,
            waterIncrease: research.perLevelBonuses['FarmWaterConsumptionMultiplier'] * 100
          });
        }
      }
    });
    return bonuses;
  }
  
  /**
   * Calculate crop production per month for a farm
   */
  static calculateCropYield(crop, farm) {
    const baseProduction = crop.output.quantity;
    const daysPerMonth = 30;
    const productionPerMonth = (baseProduction / crop.growthDays) * daysPerMonth;
    return productionPerMonth * farm.effectiveYieldMult;
  }
  
  /**
   * Calculate water needs per day for a crop on a farm
   */
  static calculateWaterPerDay(crop, farm) {
    return crop.waterPerDay * farm.effectiveWaterMult;
  }
  
  /**
   * Calculate fertility equilibrium for a rotation
   */
  static calculateFertilityEquilibrium(rotation, farm) {
    let totalFertilityUsed = 0;
    let totalDays = 0;
    let prevCrop = null;
    
    rotation.forEach((cropId, index) => {
      if (!cropId) return; // Empty slot
      
      const crop = ProductionCalculator.crops.find(c => c.id === cropId);
      if (!crop) return;
      
      let fertilityPerDay = crop.fertilityPerDayPercent;
      
      // Apply same-crop penalty (50% extra if same crop follows itself)
      if (prevCrop && prevCrop.id === crop.id && fertilityPerDay > 0) {
        fertilityPerDay *= (1 + FarmConstants.FERTILITY_PENALTY_FOR_SAME_CROP / 100);
      }
      
      totalFertilityUsed += fertilityPerDay * crop.growthDays;
      totalDays += crop.growthDays;
      prevCrop = crop;
    });
    
    if (totalDays === 0) return { naturalEquilibrium: 100, avgFertilityPerDay: 0 };
    
    const avgFertilityPerDay = totalFertilityUsed / totalDays;
    const replenishRate = farm.effectiveFertilityReplenish;
    const naturalEquilibrium = Math.max(0, 100 - (avgFertilityPerDay / replenishRate) * 100);
    
    return {
      naturalEquilibrium,
      avgFertilityPerDay,
      totalRotationDays: totalDays,
      fertilityDeficit: Math.max(0, avgFertilityPerDay - replenishRate)
    };
  }
  
  /**
   * Calculate people fed from food production
   */
  static calculatePeopleFed(production, foodConsumptionMult = 1.0) {
    let totalPopDays = 0;
    
    Object.entries(production).forEach(([productId, quantityPerMonth]) => {
      const food = ProductionCalculator.foods?.find(f => f.productId === productId);
      if (!food) return;
      
      // Formula from FoodProto.GetPopDaysFromQuantity:
      // popDays = (quantity / consumedPerHundredPopsPerMonth) * 3000
      const consumedPerHundred = food.consumedPerHundredPopsPerMonth * foodConsumptionMult;
      const popDays = (quantityPerMonth / consumedPerHundred) * 3000;
      totalPopDays += popDays;
    });
    
    // Convert to people (average over 30 days)
    return Math.floor(totalPopDays / 30);
  }
  
  /**
   * Calculate fertilizer requirements for target fertility
   */
  static calculateFertilizerNeeds(targetFertility, naturalEquilibrium, avgFertilityPerDay, farmCount = 1) {
    if (targetFertility <= naturalEquilibrium) {
      return { 
        needed: false, 
        fertilizer: null,
        quantityPerDay: 0,
        quantityPerMonth: 0
      };
    }
    
    const extraFertilityNeeded = (targetFertility - naturalEquilibrium);
    
    // Find best fertilizer that can reach target
    const fertilizers = ProductionCalculator.fertilizers
      ?.filter(f => f.maxFertility >= targetFertility)
      .sort((a, b) => b.fertilityPerQuantity - a.fertilityPerQuantity);
    
    if (!fertilizers || fertilizers.length === 0) {
      return { 
        needed: true, 
        error: `No fertilizer can reach ${targetFertility}% fertility`,
        quantityPerDay: 0
      };
    }
    
    const fertilizer = fertilizers[0];
    
    // Calculate quantity needed per day per farm
    const quantityPerDayPerFarm = extraFertilityNeeded / fertilizer.fertilityPerQuantity;
    const totalQuantityPerDay = quantityPerDayPerFarm * farmCount;
    
    return {
      needed: true,
      fertilizer,
      quantityPerDay: totalQuantityPerDay,
      quantityPerMonth: totalQuantityPerDay * 30,
      quantityPerYear: totalQuantityPerDay * 360
    };
  }
  
  /**
   * Optimize for maximum calories
   */
  static optimizeMaxCalories(farms, farmCount = null) {
    const targetFarms = farmCount || farms.length;
    
    // Calculate calories per crop per farm
    const cropEfficiency = [];
    
    ProductionCalculator.crops?.forEach(crop => {
      if (!crop.output || !crop.output.productId) return;
      
      const food = ProductionCalculator.foods?.find(f => f.productId === crop.output.productId);
      if (!food) return; // Not a food crop
      
      // Calculate for best available farm
      const bestFarm = farms.reduce((best, farm) => {
        const production = this.calculateCropYield(crop, farm);
        return production > best.production ? { farm, production } : best;
      }, { farm: farms[0], production: 0 });
      
      const productionPerMonth = bestFarm.production;
      const popsFed = this.calculatePeopleFed({ [crop.output.productId]: productionPerMonth });
      
      cropEfficiency.push({
        crop,
        farm: bestFarm.farm,
        productionPerMonth,
        popsFed,
        category: food.categoryId,
        efficiency: popsFed / (crop.growthDays / 30) // Pops per month of growth
      });
    });
    
    // Sort by efficiency
    cropEfficiency.sort((a, b) => b.efficiency - a.efficiency);
    
    // Assign to rotation slots (4 per farm)
    const farmRotations = farms.slice(0, targetFarms).map(() => [null, null, null, null]);
    
    let cropIndex = 0;
    for (let farmIdx = 0; farmIdx < targetFarms; farmIdx++) {
      for (let slot = 0; slot < FarmConstants.CROP_SLOTS_COUNT; slot++) {
        if (cropIndex < cropEfficiency.length) {
          farmRotations[farmIdx][slot] = cropEfficiency[cropIndex].crop.id;
          cropIndex++;
        }
      }
    }
    
    return {
      rotations: farmRotations,
      efficiency: cropEfficiency
    };
  }
  
  /**
   * Optimize for balanced diet (placeholder)
   */
  static optimizeBalancedDiet(farms) {
    // TODO: Implement balanced diet optimization
    return this.optimizeMaxCalories(farms);
  }
  
  /**
   * Optimize for target products (placeholder)
   */
  static optimizeForProducts(farms, targets) {
    // TODO: Implement target products optimization
    return this.optimizeMaxCalories(farms);
  }
  
  /**
   * Optimize for minimum water (placeholder)
   */
  static optimizeMinWater(farms, minCalories) {
    // TODO: Implement min water optimization
    return this.optimizeMaxCalories(farms);
  }
  
  /**
   * Optimize for minimum fertility (placeholder)
   */
  static optimizeMinFertility(farms, minCalories) {
    // TODO: Implement min fertility optimization
    return this.optimizeMaxCalories(farms);
  }
  
  /**
   * Calculate raw resource requirements (trace back to farm products)
   */
  static calculateRawResourceRequirements(productId, quantityNeeded) {
    const product = ProductionCalculator.getProduct(productId);
    if (!product) return null;
    
    // Check if this is directly a crop output
    const cropDirectly = ProductionCalculator.crops?.find(c => 
      c.output && c.output.productId === productId
    );
    
    if (cropDirectly) {
      return [{
        cropId: cropDirectly.id,
        cropName: cropDirectly.name,
        quantityNeeded: quantityNeeded,
        isDirect: true
      }];
    }
    
    // Find recipes that produce this product
    const recipes = ProductionCalculator.getRecipesForProduct(productId);
    if (!recipes || recipes.length === 0) return null;
    
    // Use first recipe (or let user select)
    const recipe = recipes[0];
    const output = recipe.outputs.find(o => o.productId === productId);
    const outputQuantity = output ? output.quantity : 1;
    
    // Calculate input requirements
    const requirements = [];
    recipe.inputs.forEach(input => {
      const inputQuantityNeeded = (quantityNeeded / outputQuantity) * input.quantity;
      
      // Recursively check if input is a crop
      const subRequirements = this.calculateRawResourceRequirements(input.productId, inputQuantityNeeded);
      
      if (subRequirements) {
        requirements.push(...subRequirements);
      } else {
        // This input might be a raw resource itself
        requirements.push({
          productId: input.productId,
          productName: ProductionCalculator.getProduct(input.productId)?.name,
          quantityNeeded: inputQuantityNeeded,
          isDirect: false
        });
      }
    });
    
    return requirements;
  }
}