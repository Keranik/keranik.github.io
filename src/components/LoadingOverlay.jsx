import { getGeneralIcon } from '../utils/AssetHelper';

const LoadingOverlay = ({
    isVisible = false,
    title = 'Processing...',
    message = 'Please wait while we process your request.',
    showOptimizationTip = false,
    icon = '⚙️'
}) => {
    if (!isVisible) return null;

    // Try to get a relevant icon from game assets, fallback to emoji
    const machinesIcon = getGeneralIcon('Machines');

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-in-out'
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                border: '8px solid #333',
                borderTop: '8px solid #4a90e2',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '2rem'
            }}></div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '0.5rem'
            }}>
                {machinesIcon ? (
                    <img
                        src={machinesIcon}
                        alt="Processing"
                        style={{
                            width: '40px',
                            height: '40px',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                        }}
                    />
                ) : (
                    <span style={{ fontSize: '2rem' }}>{icon}</span>
                )}
                <h2 style={{
                    color: '#fff',
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    margin: 0,
                    textAlign: 'center'
                }}>
                    {title}
                </h2>
            </div>

            <p style={{
                color: '#aaa',
                fontSize: '1.1rem',
                textAlign: 'center',
                maxWidth: '500px',
                lineHeight: '1.6',
                margin: '0 0 1rem 0',
                padding: '0 1rem'
            }}>
                {message}
            </p>

            {showOptimizationTip && (
                <div style={{
                    marginTop: '1rem',
                    padding: '0.8rem 1.5rem',
                    backgroundColor: 'rgba(74, 144, 226, 0.2)',
                    border: '1px solid rgba(74, 144, 226, 0.4)',
                    borderRadius: '8px',
                    color: '#4a90e2',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span>💡</span>
                    <span>Optimization may take a few moments for complex chains</span>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default LoadingOverlay;