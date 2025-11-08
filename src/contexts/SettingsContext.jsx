import { createContext, useContext, useState, useEffect } from 'react';
import { DataLoader } from '../utils/DataLoader';
import ProductionCalculator from '../utils/ProductionCalculator';

const SettingsContext = createContext();

// Build default research settings from game data
// Build default research settings from game data
const buildDefaultResearchSettings = () => {
    if (!ProductionCalculator._gameData || !ProductionCalculator.research) {
        console.log('⚠️ No game data or research available');
        return {};
    }

    console.log(`📊 Processing ${ProductionCalculator.research.length} research nodes...`);
    const researchSettings = {};

    // Map of bonus IDs to their display configuration
    // Map of bonus IDs to their display configuration
    const bonusConfig = {
        // Farming
        'FarmYieldMultiplier': {
            name: 'Crop Yield Increase',
            icon: 'Farm',
            description: 'Increases crop yield from farms',
            category: 'farming',
            unit: '%',
            isNegative: false
        },
        'FarmWaterConsumptionMultiplier': {
            name: 'Crop Water Consumption',
            icon: 'Water',
            description: 'Water consumed by crops (increases with yield research)',
            category: 'farming',
            unit: '%',
            isNegative: false
        },
        'RainYieldMultiplier': {
            name: 'Rainwater Yield',
            icon: 'Water',
            description: 'Increases rainwater collection',
            category: 'farming',
            unit: '%',
            isNegative: false
        },
        'SettlementWaterConsumptionMultiplier': {
            name: 'Settlement Water Use',
            icon: 'Water',
            description: 'Reduces water consumption of settlements',
            category: 'farming',
            unit: '%',
            isNegative: true
        },

        // Vehicles (NEW CATEGORY)
        'VehiclesFuelConsumptionMultiplier': {
            name: 'Vehicle Fuel Use',
            icon: 'Diesel',
            description: 'Reduces vehicle fuel consumption',
            category: 'vehicles',
            unit: '%',
            isNegative: true
        },
        'ShipsFuelConsumptionMultiplier': {
            name: 'Ship Fuel Use',
            icon: 'Diesel',
            description: 'Reduces ship fuel consumption',
            category: 'vehicles',
            unit: '%',
            isNegative: true
        },
        'VehicleLimitBonus': {
            name: 'Vehicle Limit',
            icon: 'Excavator',
            description: 'Increases vehicle limit',
            category: 'vehicles',
            unit: '',
            isNegative: false
        },

        // Production
        'MaintenanceProductionMultiplier': {
            name: 'Maintenance Production',
            icon: 'MaintenanceT1',
            description: 'Increases maintenance production bonus',
            category: 'production',
            unit: '%',
            isNegative: false
        },

        // Efficiency
        'SolarPowerMultiplier': {
            name: 'Solar Power',
            icon: 'PowerGenerator',
            description: 'Increases solar power production',
            category: 'efficiency',
            unit: '%',
            isNegative: false
        },

        // General
        'HousingCapacityMultiplier': {
            name: 'Housing Capacity',
            icon: 'Settlement',
            description: 'Increases housing capacity',
            category: 'general',
            unit: '%',
            isNegative: false
        },
        'UnityCapacityMultiplier': {
            name: 'Unity Capacity',
            icon: 'Unity',
            description: 'Increases Unity capacity',
            category: 'general',
            unit: '%',
            isNegative: false
        }
    };

    // Process all research nodes to find repeatable research with bonuses
    ProductionCalculator.research.forEach(node => {
        // Only process nodes with multiple levels and bonuses
        if (node.maxLevels > 1 && node.perLevelBonuses) {
            Object.entries(node.perLevelBonuses).forEach(([bonusId, perLevelAmount]) => {
                // Skip if already added
                if (researchSettings[bonusId]) return;

                // Get config or create default
                const config = bonusConfig[bonusId] || {
                    name: bonusId.replace(/([A-Z])/g, ' $1').trim(),
                    icon: 'Research',
                    description: `Research bonus: ${bonusId}`,
                    category: 'general',
                    unit: '%',
                    isNegative: false
                };

                // Calculate total possible bonus (maxLevels * perLevelAmount)
                // Convert from 0-1 scale to percentage (multiply by 100)
                const maxTotalBonus = Math.abs(node.maxLevels * perLevelAmount * 100);

                // Determine step size (5% increments for most, or based on per-level amount)
                const perLevelPercent = Math.abs(perLevelAmount * 100);
                let step = 5;
                if (perLevelPercent < 1) {
                    step = 1; // For small bonuses
                } else if (perLevelPercent >= 5) {
                    step = Math.round(perLevelPercent); // Match per-level for large bonuses
                }

                researchSettings[bonusId] = {
                    id: bonusId,
                    name: config.name,
                    icon: config.icon,
                    description: config.description,
                    bonusType: 'percentage',
                    minValue: 0,
                    maxValue: Math.ceil(maxTotalBonus / step) * step, // Round up to nearest step
                    step: step,
                    currentValue: 0,
                    unit: config.unit,
                    category: config.category,
                    isNegative: config.isNegative, // For display (show as -X% or +X%)
                    perLevelAmount: perLevelAmount, // Store for future calculations
                    maxLevels: node.maxLevels,
                    researchNodeId: node.id // Track which node this came from
                };
            });
        }
    });

    console.log(`✅ Found ${Object.keys(researchSettings).length} research bonuses:`, Object.keys(researchSettings));

    // Debug log each bonus
    Object.entries(researchSettings).forEach(([id, bonus]) => {
        console.log(`  ${id}: ${bonus.minValue}-${bonus.maxValue}${bonus.unit} (${bonus.maxLevels} levels max)`);
    });

    return researchSettings;
};

const DEFAULT_SETTINGS = {
    foodConsumptionMultiplier: 1.0,
    research: {},
    enableModdedContent: false,
    enabledMods: [],
    theme: 'dark',
    colorblindMode: false,
    decimalPrecision: 1,
    showRecipeTimePerMinute: true,
    language: 'en',
    units: 'metric'
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('coi-tools-settings');
        if (saved) {
            try {
                return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
            } catch (e) {
                console.error('Failed to load settings:', e);
                return DEFAULT_SETTINGS;
            }
        }
        return DEFAULT_SETTINGS;
    });

    const [availableMods, setAvailableMods] = useState([]);
    const [researchDefinitions, setResearchDefinitions] = useState({});
    const [isLoadingData, setIsLoadingData] = useState(true);

    // ✅ Initial load - runs once on app start
    useEffect(() => {
        const initializeData = async () => {
            try {
                console.log('🔄 Loading game data...');

                // Load mods manifest
                const manifest = await DataLoader.loadModManifest();
                setAvailableMods(manifest.mods || []);

                // Load game data with current mod settings
                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
                const gameData = await DataLoader.loadGameData(enabledMods);

                // Initialize ProductionCalculator
                ProductionCalculator.initialize(gameData);

                console.log('✅ Game data loaded, building research definitions...');

                // Build research definitions
                const researchDefs = buildDefaultResearchSettings();
                setResearchDefinitions(researchDefs);

                console.log(`✅ Found ${Object.keys(researchDefs).length} research bonuses`);

                // Merge with existing settings
                setSettings(prev => ({
                    ...prev,
                    research: {
                        ...Object.keys(researchDefs).reduce((acc, key) => {
                            acc[key] = researchDefs[key].currentValue;
                            return acc;
                        }, {}),
                        ...prev.research // Keep any saved values
                    }
                }));

                setIsLoadingData(false);
            } catch (error) {
                console.error('❌ Failed to initialize game data:', error);
                setIsLoadingData(false);
            }
        };

        initializeData();
    }, []); // Only run once on mount

    // ✅ Reload when mod settings change
    useEffect(() => {
        // Skip if initial load hasn't finished
        if (isLoadingData) return;

        const reloadGameData = async () => {
            try {
                console.log('🔄 Reloading game data due to mod changes...');
                setIsLoadingData(true);

                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
                const gameData = await DataLoader.loadGameData(enabledMods);
                ProductionCalculator.initialize(gameData);

                // Rebuild research definitions
                const researchDefs = buildDefaultResearchSettings();
                setResearchDefinitions(researchDefs);

                console.log(`✅ Reloaded with ${Object.keys(researchDefs).length} research bonuses`);

                // Update research settings
                setSettings(prev => ({
                    ...prev,
                    research: {
                        ...Object.keys(researchDefs).reduce((acc, key) => {
                            acc[key] = researchDefs[key].currentValue;
                            return acc;
                        }, {}),
                        ...prev.research
                    }
                }));

                setIsLoadingData(false);
            } catch (error) {
                console.error('❌ Failed to reload game data:', error);
                setIsLoadingData(false);
            }
        };

        reloadGameData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    useEffect(() => {
        localStorage.setItem('coi-tools-settings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const updateNestedSetting = (path, value) => {
        setSettings(prev => {
            const newSettings = { ...prev };
            const keys = path.split('.');
            let current = newSettings;

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newSettings;
        });
    };

    const updateResearchValue = (researchId, value) => {
        setSettings(prev => ({
            ...prev,
            research: {
                ...prev.research,
                [researchId]: value
            }
        }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    const exportSettings = () => {
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `coi-settings-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const importSettings = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            setSettings({ ...DEFAULT_SETTINGS, ...imported });
            return true;
        } catch (e) {
            console.error('Failed to import settings:', e);
            return false;
        }
    };

    const getResearchValue = (researchId) => {
        return settings.research?.[researchId] || 0;
    };

    const getResearchByCategory = (category) => {
        return Object.entries(researchDefinitions)
            .filter(([_, def]) => def.category === category)
            .map(([id, def]) => ({
                ...def,
                currentValue: settings.research?.[id] || 0
            }));
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                availableMods,
                researchDefinitions,
                isLoadingData,  // ✅ Expose this so UI can show loading state
                updateSetting,
                updateNestedSetting,
                updateResearchValue,
                resetSettings,
                exportSettings,
                importSettings,
                getResearchValue,
                getResearchByCategory
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within SettingsProvider');
    }
    return context;
};