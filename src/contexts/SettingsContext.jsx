// src/contexts/SettingsContext.jsx - SIMPLIFIED VERSION

import { createContext, useContext, useState, useEffect } from 'react';
import { GameDataManager } from '../managers/GameDataManager';

const SettingsContext = createContext();

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
    // ==========================================
    // STATE - Settings Only
    // ==========================================

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
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // ==========================================
    // MODAL CONTROLS
    // ==========================================

    const openSettings = () => {
        console.log('📖 SettingsContext: Opening settings modal');
        setIsSettingsOpen(true);
    };

    const closeSettings = () => {
        console.log('📕 SettingsContext: Closing settings modal');
        setIsSettingsOpen(false);
    };

    // ==========================================
    // INITIAL LOAD - Runs once on app start
    // ==========================================

    useEffect(() => {
        const initializeData = async () => {
            try {
                console.log('🔄 SettingsContext: Initial data load...');
                setIsLoadingData(true);

                // Load mod manifest (just metadata)
                try {
                    const manifestModule = await import('../manifest.json');
                    const manifest = manifestModule.default;
                    setAvailableMods(manifest.mods || []);
                    console.log(`✅ SettingsContext: Found ${manifest.mods?.length || 0} available mods`);
                } catch (error) {
                    console.warn('⚠️ SettingsContext: Could not load mod manifest:', error);
                    setAvailableMods([]);
                }

                // ✅ Load game data via GameDataManager
                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
                await GameDataManager.getGameData(enabledMods);

                // ✅ Get research definitions (lazy-initialized by GameDataManager)
                const researchDefs = await GameDataManager.getResearchDefinitions();
                setResearchDefinitions(researchDefs);

                console.log(`✅ SettingsContext: Loaded ${Object.keys(researchDefs).length} research bonuses`);

                // Merge research definitions with saved settings
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
                console.error('❌ SettingsContext: Failed to initialize:', error);
                setIsLoadingData(false);
            }
        };

        initializeData();
    }, []);

    // ==========================================
    // RELOAD WHEN MODS CHANGE
    // ==========================================

    useEffect(() => {
        if (isLoadingData) {
            console.log('⏭️ SettingsContext: Skipping mod reload (initial load in progress)');
            return;
        }

        const reloadGameData = async () => {
            try {
                console.log('🔄 SettingsContext: Mod configuration changed, reloading...');
                setIsLoadingData(true);

                // ✅ Ask GameDataManager to reload
                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
                await GameDataManager.getGameData(enabledMods);

                // ✅ Get fresh research definitions
                const researchDefs = await GameDataManager.getResearchDefinitions();
                setResearchDefinitions(researchDefs);

                console.log(`✅ SettingsContext: Reloaded with ${Object.keys(researchDefs).length} research bonuses`);

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
                console.error('❌ SettingsContext: Failed to reload:', error);
                setIsLoadingData(false);
            }
        };

        reloadGameData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    // ==========================================
    // PERSIST SETTINGS TO LOCALSTORAGE
    // ==========================================

    useEffect(() => {
        localStorage.setItem('coi-tools-settings', JSON.stringify(settings));
    }, [settings]);

    // ==========================================
    // SETTINGS UPDATERS
    // ==========================================

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
                isLoadingData,
                isSettingsOpen,
                openSettings,
                closeSettings,
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