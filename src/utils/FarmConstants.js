// Farm mechanics constants from Farm.cs
export const FarmConstants = {
  // Fertility mechanics
  FERTILITY_PENALTY_FOR_SAME_CROP: 50, // percent
  FERTILITY_REPLENISH_MULT_WHEN_ABOVE_100: 20, // percent
  CROP_FERTILITY_DEMAND_MULT_WHEN_ABOVE_100: 200, // percent
  STARTING_FERTILITY: 80, // percent
  NO_YIELD_BEFORE_GROWTH_PERC: 50, // percent
  
  // Water mechanics
  SOIL_WATER_CAPACITY: 50,
  IMPORTED_WATER_CAPACITY: 60,
  WATER_PER_RAINY_DAY: 2.0, // Actually 3.0 / rain_intensity from code
  IRRIGATION_START: 10, // percent
  IRRIGATION_STOP: 65, // percent
  MIN_IRRIGATION_PER_DAY: 1,
  
  // Fertilizer
  FERTILIZER_CAPACITY: 40,
  FERTILITY_PER_SLIDER_STEP: 10, // percent
  MAX_FERTILITY_SLIDER_VALUE: 140, // 14 steps * 10
  
  // Crop slots
  CROP_SLOTS_COUNT: 4,
  MAX_DAYS_DISABLED: 15 // Before crops die
};