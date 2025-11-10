// src/components/FloatingSettingsButton.jsx - COMPLETE UPDATED VERSION
import { useSettings } from '../contexts/SettingsContext';
import SettingsModal from './SettingsModal';
import { getGeneralIcon } from '../utils/AssetHelper';

const FloatingSettingsButton = () => {
    const { isSettingsOpen, openSettings, closeSettings } = useSettings();

    const settingsIcon = getGeneralIcon('Settings');

    return (
        <>
<button
    onClick={openSettings}
    style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#4a90e2',
                    color: '#fff',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(74, 144, 226, 0.5)',
                    transition: 'all 0.3s',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
    onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 144, 226, 0.7)';
                }}
    onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.5)';
                }}
    title="Settings"
>
    {settingsIcon ? (
        <img
            src={settingsIcon}
            alt="Settings"
            style={{
                            width: '32px',
                            height: '32px',
                            objectFit: 'contain',
                            filter: 'brightness(0) invert(1)',
                            transition: 'transform 0.3s'
                        }}
        />
    ) : (
        '⚙️'
    )}
</button>

<SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
</>
    );
};

export default FloatingSettingsButton;