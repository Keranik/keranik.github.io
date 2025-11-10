import { createContext, useContext, useState, useEffect } from 'react';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from './SettingsContext';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            // Prevent duplicate loads
            if (isLoading || dataLoaded) {
                console.log('⏭️ Data already loaded or loading, skipping...');
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                console.log('🚀 DataContext: Loading game data (ONE TIME)...');
                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
                await DataLoader.loadGameData(enabledMods);

                setDataLoaded(true);
                console.log('✅ DataContext: Game data loaded successfully');
            } catch (err) {
                console.error('❌ DataContext: Failed to load game data:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    const value = {
        dataLoaded,
        isLoading,
        error
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};