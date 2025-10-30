import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';

const SettingsModal = ({ isOpen, onClose }) => {
  const { settings, updateSetting, updateNestedSetting, resetSettings, exportSettings, importSettings } = useSettings();
  const [activeTab, setActiveTab] = useState('gameplay');

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
        maxWidth: '800px',
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
            ⚙️ Settings
          </h2>
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
            { id: 'gameplay', label: '🎮 Gameplay', icon: '🎮' },
            { id: 'data', label: '📦 Data & Mods', icon: '📦' },
            { id: 'display', label: '🎨 Display', icon: '🎨' },
            { id: 'advanced', label: '⚡ Advanced', icon: '⚡' }
          ].map(tab => (
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
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          padding: '1.5rem',
          overflow: 'auto',
          flex: 1
        }}>
          {activeTab === 'gameplay' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Gameplay Defaults
              </h3>

              {/* Food Consumption */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem' }}>
                  Food Consumption Multiplier
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.foodConsumptionMultiplier}
                    onChange={(e) => updateSetting('foodConsumptionMultiplier', parseFloat(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ 
                    minWidth: '60px', 
                    fontWeight: '700', 
                    color: '#4a90e2',
                    fontSize: '1.1rem'
                  }}>
                    {settings.foodConsumptionMultiplier.toFixed(1)}x
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                  Applied to all food calculations (difficulty setting)
                </div>
              </div>

              {/* Default Research Levels */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '0.75rem' }}>
                  Default Research Levels
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.85rem' }}>Crop Yield Increase</span>
                      <span style={{ color: '#4a90e2', fontWeight: '600' }}>+{settings.defaultResearch.cropYield}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="250"
                      step="10"
                      value={settings.defaultResearch.cropYield}
                      onChange={(e) => updateNestedSetting('defaultResearch.cropYield', parseInt(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.85rem' }}>Water Saver</span>
                      <span style={{ color: '#50C878', fontWeight: '600' }}>-{settings.defaultResearch.waterSaver}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="5"
                      value={settings.defaultResearch.waterSaver}
                      onChange={(e) => updateNestedSetting('defaultResearch.waterSaver', parseInt(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                  These values will be pre-filled in calculators
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Data Sources & Mods
              </h3>

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
                    onChange={(e) => updateSetting('enableModdedContent', e.target.checked)}
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      cursor: 'pointer'
                    }}
                  />
                </label>
              </div>

              {/* Mod Selection (placeholder for future) */}
              {settings.enableModdedContent && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  border: '1px solid #333'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Installed Mods
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>
                    No mods detected. Place your exported mod data in the data folder.
                  </div>
                  {/* Future: List of detected mods with checkboxes */}
                </div>
              )}

              <div style={{
                padding: '1rem',
                backgroundColor: '#2a4a2a',
                borderRadius: '8px',
                border: '1px solid #4a7a4a'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#88dd88', marginBottom: '0.5rem' }}>
                  💡 <strong>How to add mods:</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#aaddaa', lineHeight: '1.6' }}>
                  1. Export your modded game data using the data exporter<br/>
                  2. Place the exported JSON file in <code style={{ backgroundColor: '#1a1a1a', padding: '2px 6px', borderRadius: '3px' }}>/public/data/mods/</code><br/>
                  3. Refresh this page to detect new mods
                </div>
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Display Preferences
              </h3>

              {/* Decimal Precision */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem' }}>
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

              {/* Theme (placeholder for future) */}
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

              {/* Colorblind Mode (placeholder) */}
              <div style={{
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333',
                opacity: 0.5
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'not-allowed',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                      Colorblind Mode <span style={{ fontSize: '0.8rem', color: '#888' }}>(Coming Soon)</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>
                      Adjust colors for better accessibility
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    disabled
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      cursor: 'not-allowed'
                    }}
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Advanced Options
              </h3>

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
                  User: {window.navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'}<br/>
                  Storage: {typeof localStorage !== 'undefined' ? 'Available' : 'Unavailable'}<br/>
                  Settings Version: 1.0.0
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