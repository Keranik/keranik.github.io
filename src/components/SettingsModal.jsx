import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { getGeneralIcon } from '../utils/AssetHelper';

const SettingsModal = ({ isOpen, onClose }) => {
    const {
        settings,
        availableMods,
        researchDefinitions,
        isLoadingData,
        updateSetting,
        updateNestedSetting,
        updateResearchValue,
        resetSettings,
        exportSettings,
        importSettings,
        getResearchByCategory
    } = useSettings();
    const [activeTab, setActiveTab] = useState('research');

    if (!isOpen) return null;

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const success = importSettings(event.target.result);
                if (success) {
                    alert('Settings imported successfully!');
                } else {
                    alert('Failed to import settings. Please check the file format.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    const clockIcon = getGeneralIcon('Clock');

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '12px',
                maxWidth: '1000px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'hidden',
                border: '2px solid #444',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #444',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {getGeneralIcon('Settings') && (
                            <img
                                src={getGeneralIcon('Settings')}
                                alt="Settings"
                                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                            />
                        )}
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
                            Settings
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#ff6b6b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        ✕ Close
                    </button>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid #444',
                    backgroundColor: '#1a1a1a'
                }}>
                    {[
                        { id: 'research', label: 'Research', icon: 'ResearchUnlocked' },
                        { id: 'data', label: 'Data & Mods', icon: 'Countable' },
                        { id: 'display', label: 'Display', icon: 'Display' },
                        { id: 'advanced', label: 'Advanced', icon: 'Configure' }
                    ].map(tab => {
                        const tabIcon = getGeneralIcon(tab.icon);
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    backgroundColor: activeTab === tab.id ? '#4a90e2' : '#333',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: activeTab === tab.id ? '700' : '500',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {tabIcon && (
                                    <img
                                        src={tabIcon}
                                        alt={tab.label}
                                        style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                                    />
                                )}
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div style={{
                    padding: '1.5rem',
                    overflow: 'auto',
                    flex: 1
                }}>
                    {activeTab === 'research' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                {getGeneralIcon('Research') && (
                                    <img
                                        src={getGeneralIcon('Research')}
                                        alt="Research"
                                        style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                                    />
                                )}
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>
                                    Repeatable Research Settings
                                </h3>
                            </div>

                            {/* Dynamic Research Settings */}
                            <div>
                                {Object.keys(researchDefinitions).length === 0 ? (
                                    <div style={{
                                        padding: '1rem',
                                        backgroundColor: '#1a1a1a',
                                        borderRadius: '6px',
                                        color: '#888',
                                        fontSize: '0.85rem',
                                        fontStyle: 'italic',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {isLoadingData ? (
                                            <>
                                                <div style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    border: '2px solid #333',
                                                    borderTop: '2px solid #4a90e2',
                                                    borderRadius: '50%',
                                                    animation: 'spin 1s linear infinite'
                                                }}></div>
                                                Loading research data...
                                            </>
                                        ) : (
                                            'No research data found. Please refresh the page.'
                                        )}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {/* Group by category */}
                                        {[
                                            { id: 'farming', label: 'Farming', icon: 'Farms' },
                                            { id: 'vehicles', label: 'Vehicles', icon: 'Vehicles' },
                                            { id: 'production', label: 'Production', icon: 'Machines' },
                                            { id: 'efficiency', label: 'Efficiency', icon: 'Battery' },
                                            { id: 'general', label: 'General', icon: 'Buildings' }
                                        ].map(category => {
                                            const categoryResearch = getResearchByCategory(category.id);
                                            if (categoryResearch.length === 0) return null;

                                            const categoryIcon = getGeneralIcon(category.icon);

                                            return (
                                                <div key={category.id}>
                                                    <div style={{
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        color: '#4a90e2',
                                                        marginBottom: '0.75rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}>
                                                        {categoryIcon && (
                                                            <img
                                                                src={categoryIcon}
                                                                alt={category.label}
                                                                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                                            />
                                                        )}
                                                        {category.label}
                                                    </div>
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                                                        gap: '1rem'
                                                    }}>
                                                        {categoryResearch.map(research => {
                                                            const icon = getGeneralIcon(research.icon);
                                                            return (
                                                                <div key={research.id} style={{
                                                                    padding: '0.75rem',
                                                                    backgroundColor: '#1a1a1a',
                                                                    borderRadius: '6px',
                                                                    border: '1px solid #333'
                                                                }}>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', alignItems: 'center' }}>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                            {icon && (
                                                                                <img
                                                                                    src={icon}
                                                                                    alt={research.name}
                                                                                    style={{
                                                                                        width: '18px',
                                                                                        height: '18px',
                                                                                        objectFit: 'contain'
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                                                                                {research.name}
                                                                            </span>
                                                                        </div>
                                                                        <span style={{
                                                                            color: research.currentValue === 0 ? '#888' :
                                                                                research.isNegative ? '#50C878' :
                                                                                    '#4a90e2',
                                                                            fontWeight: '700',
                                                                            fontSize: '0.95rem'
                                                                        }}>
                                                                            {research.isNegative && research.currentValue > 0 ? '-' :
                                                                                !research.isNegative && research.currentValue > 0 ? '+' : ''}
                                                                            {research.currentValue}
                                                                            {research.unit}
                                                                        </span>
                                                                    </div>
                                                                    {research.description && (
                                                                        <div style={{
                                                                            fontSize: '0.7rem',
                                                                            color: '#888',
                                                                            marginBottom: '0.4rem'
                                                                        }}>
                                                                            {research.description}
                                                                        </div>
                                                                    )}
                                                                    <input
                                                                        type="range"
                                                                        min={research.minValue}
                                                                        max={research.maxValue}
                                                                        step={research.step}
                                                                        value={research.currentValue}
                                                                        onChange={(e) => updateResearchValue(research.id, parseInt(e.target.value))}
                                                                        style={{ width: '100%' }}
                                                                    />
                                                                    <div style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        fontSize: '0.65rem',
                                                                        color: '#666',
                                                                        marginTop: '0.2rem'
                                                                    }}>
                                                                        <span>{research.minValue}{research.unit}</span>
                                                                        <span>{research.maxValue}{research.unit}</span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.75rem' }}>
                                    <img
                                        src={getGeneralIcon('Tip')}
                                        alt="Change recipe"
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            objectFit: 'contain',
                                            paddingRight: '4px',
                                            filter: `
      brightness(0) saturate(100%)
      invert(100%) sepia(100%) saturate(5000%) hue-rotate(40deg)
      brightness(120%) contrast(110%)
      drop-shadow(2px 2px 0px rgba(0,0,0,0.5))
    `.trim(),
                                        }}
                                    /> These values will be pre-populated in calculators that support repeatable research bonuses.
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'data' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                {getGeneralIcon('Data') && (
                                    <img
                                        src={getGeneralIcon('Data')}
                                        alt="Data"
                                        style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                                    />
                                )}
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>
                                    Data Sources & Mods
                                </h3>
                            </div>

                            {/* Enable Modded Content */}
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '8px',
                                border: '1px solid #333'
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                            Enable Modded Content
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#888' }}>
                                            Show recipes and items from installed mods
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.enableModdedContent}
                                        onChange={(e) => {
                                            updateSetting('enableModdedContent', e.target.checked);
                                            if (!e.target.checked) {
                                                updateSetting('enabledMods', []);
                                            }
                                        }}
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Mod Selection */}
                            {settings.enableModdedContent && (
                                <div style={{
                                    padding: '1rem',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    border: '1px solid #333'
                                }}>
                                    <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                                        Available Mods ({availableMods.length})
                                    </div>

                                    {availableMods.length === 0 ? (
                                        <div style={{ fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>
                                            No mods detected. Check manifest.json configuration.
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {availableMods.map(mod => (
                                                <label
                                                    key={mod.id}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '1rem',
                                                        backgroundColor: '#2a2a2a',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        border: settings.enabledMods?.includes(mod.id)
                                                            ? '2px solid #4a90e2'
                                                            : '2px solid transparent',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: '600', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            {mod.name}
                                                            <span style={{ color: '#888', fontSize: '0.8rem' }}>v{mod.version}</span>
                                                            {mod.categories && (
                                                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                                    {mod.categories.map(cat => (
                                                                        <span key={cat} style={{
                                                                            fontSize: '0.7rem',
                                                                            padding: '2px 6px',
                                                                            backgroundColor: '#4a90e2',
                                                                            borderRadius: '3px',
                                                                            color: '#fff'
                                                                        }}>
                                                                            {cat}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>
                                                            {mod.description}
                                                        </div>
                                                        <div style={{ fontSize: '0.75rem', color: '#666' }}>
                                                            by {mod.author} • Requires {mod.requiredGameVersion}
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.enabledMods?.includes(mod.id) || false}
                                                        onChange={(e) => {
                                                            const newMods = e.target.checked
                                                                ? [...(settings.enabledMods || []), mod.id]
                                                                : (settings.enabledMods || []).filter(id => id !== mod.id);
                                                            updateSetting('enabledMods', newMods);
                                                        }}
                                                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Info Box */}
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#2a4a2a',
                                borderRadius: '8px',
                                border: '1px solid #4a7a4a'
                            }}>
                                <div style={{ fontSize: '0.9rem', color: '#88dd88', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    💡 How mods work
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#aaddaa', lineHeight: '1.6' }}>
                                    • Official mod support provided by Keranik<br />
                                    • Mods add new content or modify existing recipes<br />
                                    • Enable mods to see them in all calculators<br />
                                    • Changes apply after calculator page refresh
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'display' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                {getGeneralIcon('Display') && (
                                    <img
                                        src={getGeneralIcon('Display')}
                                        alt="Display"
                                        style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                                    />
                                )}
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>
                                    Display Preferences
                                </h3>
                            </div>

                            {/* Recipe Time Display */}
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '8px',
                                border: '1px solid #333'
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {clockIcon && <img src={clockIcon} alt="Clock" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />}
                                            Show Recipe Times Per Minute
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#888' }}>
                                            Display recipe inputs/outputs normalized to per-minute rates (recommended)
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.showRecipeTimePerMinute}
                                        onChange={(e) => updateSetting('showRecipeTimePerMinute', e.target.checked)}
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            cursor: 'pointer',
                                            marginLeft: '1rem'
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Decimal Precision */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    Decimal Precision
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="3"
                                        step="1"
                                        value={settings.decimalPrecision}
                                        onChange={(e) => updateSetting('decimalPrecision', parseInt(e.target.value))}
                                        style={{ flex: 1 }}
                                    />
                                    <span style={{
                                        minWidth: '80px',
                                        fontWeight: '700',
                                        color: '#4a90e2',
                                        fontSize: '1.1rem'
                                    }}>
                                        {settings.decimalPrecision} {settings.decimalPrecision === 1 ? 'digit' : 'digits'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                                    Example: {(123.456789).toFixed(settings.decimalPrecision)}
                                </div>
                            </div>

                            {/* Theme (placeholder) */}
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '8px',
                                border: '1px solid #333',
                                opacity: 0.5
                            }}>
                                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                    Theme <span style={{ fontSize: '0.8rem', color: '#888' }}>(Coming Soon)</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {['Dark', 'Light', 'Auto'].map(theme => (
                                        <button
                                            key={theme}
                                            disabled
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: theme === 'Dark' ? '#4a90e2' : '#333',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'not-allowed',
                                                opacity: 0.6
                                            }}
                                        >
                                            {theme}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'advanced' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                {getGeneralIcon('Settings') && (
                                    <img
                                        src={getGeneralIcon('Settings')}
                                        alt="Advanced"
                                        style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                                    />
                                )}
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>
                                    Advanced Options
                                </h3>
                            </div>

                            {/* Export/Import */}
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '8px',
                                border: '1px solid #333'
                            }}>
                                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                                    Backup & Restore
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={exportSettings}
                                        style={{
                                            padding: '0.75rem 1.25rem',
                                            backgroundColor: '#4a90e2',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        📥 Export Settings
                                    </button>
                                    <button
                                        onClick={handleImport}
                                        style={{
                                            padding: '0.75rem 1.25rem',
                                            backgroundColor: '#50C878',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        📤 Import Settings
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                                    Save your settings as a JSON file or restore from a previous backup
                                </div>
                            </div>

                            {/* Reset */}
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#3a2a2a',
                                borderRadius: '8px',
                                border: '1px solid #664444'
                            }}>
                                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#ff8888' }}>
                                    ⚠️ Danger Zone
                                </div>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
                                            resetSettings();
                                        }
                                    }}
                                    style={{
                                        padding: '0.75rem 1.25rem',
                                        backgroundColor: '#ff6b6b',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    🔄 Reset All Settings
                                </button>
                                <div style={{ fontSize: '0.8rem', color: '#ff8888', marginTop: '0.5rem' }}>
                                    This will restore all settings to their default values
                                </div>
                            </div>

                            {/* Debug Info */}
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '8px',
                                border: '1px solid #333'
                            }}>
                                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                                    🔍 Debug Info
                                </div>
                                <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#888' }}>
                                    User: Keranik<br />
                                    Browser: {window.navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'}<br />
                                    Storage: {typeof localStorage !== 'undefined' ? 'Available' : 'Unavailable'}<br />
                                    Settings Version: 1.2.0
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;