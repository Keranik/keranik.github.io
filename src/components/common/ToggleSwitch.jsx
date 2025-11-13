// src/components/common/ToggleSwitch.jsx

/**
 * ToggleSwitch - A modern sliding toggle component
 * 
 * Design principles:
 * - Clean sliding animation
 * - Universal ON/OFF visual language
 * - No text labels needed (optional via props)
 * - Modern iOS/Material Design aesthetic
 */
const ToggleSwitch = ({
    value,
    onChange,
    size = 'md',
    onColor = '#50C878',
    offColor = '#888',
    onLabel = 'ON',
    offLabel = 'OFF',
    onIcon = '✓',
    offIcon = '✗',
    showIcons = true,
    showLabels = false, // NEW: opt-in for labels instead of default
    disabled = false,
    useGlow = true,
    style = {},
    className = ''
}) => {
    // Size configurations
    const sizes = {
        sm: {
            track: { width: '44px', height: '24px' },
            thumb: { size: '18px' },
            translateX: '20px',
            iconSize: '0.6em'
        },
        md: {
            track: { width: '54px', height: '28px' },
            thumb: { size: '22px' },
            translateX: '26px',
            iconSize: '0.65em'
        },
        lg: {
            track: { width: '64px', height: '32px' },
            thumb: { size: '26px' },
            translateX: '32px',
            iconSize: '0.7em'
        }
    };

    const sizeStyle = sizes[size] || sizes.md;

    const handleClick = () => {
        if (!disabled) {
            onChange();
        }
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={value}
            aria-label={value ? onLabel : offLabel}
            disabled={disabled}
            onClick={handleClick}
            className={className}
            style={{
                position: 'relative',
                width: sizeStyle.track.width,
                height: sizeStyle.track.height,
                backgroundColor: value ? onColor : '#2a2a2a',
                borderRadius: '999px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: disabled ? 0.5 : 1,
                outline: 'none',
                boxShadow: value && useGlow
                    ? `0 0 12px ${onColor}60, inset 0 1px 3px rgba(0,0,0,0.2)`
                    : 'inset 0 1px 3px rgba(0,0,0,0.4)',
                WebkitTapHighlightColor: 'transparent',
                overflow: 'hidden',
                flexShrink: 0,
                ...style
            }}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    e.currentTarget.style.transform = 'scale(1)';
                }
            }}
        >
            {/* Sliding Thumb */}
            <div style={{
                position: 'absolute',
                top: '3px',
                left: '3px',
                width: sizeStyle.thumb.size,
                height: sizeStyle.thumb.size,
                backgroundColor: '#fff',
                borderRadius: '50%',
                transform: value ? `translateX(${sizeStyle.translateX})` : 'translateX(0)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: sizeStyle.iconSize,
                color: value ? onColor : offColor,
                fontWeight: '700'
            }}>
                {showIcons && (
                    <span style={{
                        opacity: 0.8,
                        transition: 'opacity 0.2s'
                    }}>
                        {value ? onIcon : offIcon}
                    </span>
                )}
            </div>

            {/* Optional track icons (subtle, behind thumb) */}
            {showLabels && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 8px',
                    fontSize: '0.5em',
                    fontWeight: '700',
                    color: 'rgba(255,255,255,0.4)',
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                    <span style={{
                        opacity: value ? 0 : 0.6,
                        transition: 'opacity 0.2s'
                    }}>
                        {offIcon}
                    </span>
                    <span style={{
                        opacity: value ? 0.6 : 0,
                        transition: 'opacity 0.2s'
                    }}>
                        {onIcon}
                    </span>
                </div>
            )}
        </button>
    );
};

export default ToggleSwitch;