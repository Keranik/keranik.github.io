// src/components/common/ToggleSwitch.jsx

/**
 * ToggleSwitch - A dual-button toggle component with clear visual separation
 * 
 * Design principles:
 * - Active side has solid fill
 * - Inactive side is inset/recessed
 * - Clear visual divider between options
 * - Smooth transition animations
 * - Optional glow effect for active state
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
    disabled = false,
    useGlow = true,
    style = {},
    className = ''
}) => {
    // Size configurations
    const sizes = {
        sm: {
            container: { height: '26px', minWidth: '64px' },
            button: { padding: '4px 8px', fontSize: '0.65rem', gap: '3px' },
            iconSize: '0.75em'
        },
        md: {
            container: { height: '30px', minWidth: '74px' },
            button: { padding: '6px 12px', fontSize: '0.7rem', gap: '4px' },
            iconSize: '0.8em'
        },
        lg: {
            container: { height: '34px', minWidth: '84px' },
            button: { padding: '7px 14px', fontSize: '0.75rem', gap: '5px' },
            iconSize: '0.85em'
        }
    };

    const sizeStyle = sizes[size] || sizes.md;

    // Active/Inactive state styles
    const getButtonStyle = (isActive, isOff) => {
        if (isActive) {
            // Active state: filled, raised, with optional glow
            return {
                backgroundColor: isOff ? offColor : onColor,
                color: '#fff',
                fontWeight: '700',
                boxShadow: useGlow
                    ? `0 0 8px ${isOff ? offColor : onColor}80, inset 0 1px 0 rgba(255,255,255,0.2)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.2)',
                transform: 'translateY(0px)',
                zIndex: 2
            };
        } else {
            // Inactive state: recessed, darker, inset shadow
            return {
                backgroundColor: '#0a0a0a',
                color: '#555',
                fontWeight: '500',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
                transform: 'translateY(1px)',
                zIndex: 1
            };
        }
    };

    // Base button style
    const buttonBaseStyle = {
        flex: 1,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizeStyle.button.gap,
        padding: sizeStyle.button.padding,
        fontSize: sizeStyle.button.fontSize,
        outline: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        position: 'relative',
        letterSpacing: '0.5px'
    };

    const handleOffClick = (e) => {
        e.stopPropagation();
        if (!disabled && value) {
            onChange();
        }
    };

    const handleOnClick = (e) => {
        e.stopPropagation();
        if (!disabled && !value) {
            onChange();
        }
    };

    return (
        <div
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'stretch',
                backgroundColor: '#0a0a0a',
                border: '2px solid #1a1a1a',
                borderRadius: '6px',
                overflow: 'hidden',
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                height: sizeStyle.container.height,
                minWidth: sizeStyle.container.minWidth,
                padding: '2px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                ...style
            }}
        >
            {/* OFF Button */}
            <button
                type="button"
                disabled={disabled}
                aria-pressed={!value}
                aria-label={`Toggle ${offLabel}`}
                style={{
                    ...buttonBaseStyle,
                    ...getButtonStyle(!value, true),
                    borderRadius: '4px 0 0 4px',
                    marginRight: '1px'
                }}
                onClick={handleOffClick}
                onMouseEnter={(e) => {
                    if (!disabled && value) {
                        // Hovering over inactive OFF - show it's clickable
                        e.currentTarget.style.backgroundColor = '#151515';
                        e.currentTarget.style.color = '#777';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!disabled && value) {
                        e.currentTarget.style.backgroundColor = '#0a0a0a';
                        e.currentTarget.style.color = '#555';
                    }
                }}
            >
                {showIcons && offIcon && (
                    <span
                        style={{
                            fontSize: sizeStyle.iconSize,
                            opacity: !value ? 1 : 0.5,
                            transition: 'opacity 0.2s'
                        }}
                        aria-hidden="true"
                    >
                        {offIcon}
                    </span>
                )}
                <span style={{
                    textShadow: !value ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                    transition: 'text-shadow 0.2s'
                }}>
                    {offLabel}
                </span>
            </button>

            {/* Hard divider */}
            <div style={{
                width: '2px',
                backgroundColor: '#000',
                boxShadow: value
                    ? '-1px 0 2px rgba(0,0,0,0.5), 1px 0 2px rgba(0,0,0,0.3)'
                    : '-1px 0 2px rgba(0,0,0,0.3), 1px 0 2px rgba(0,0,0,0.5)',
                zIndex: 3,
                transition: 'box-shadow 0.25s'
            }} />

            {/* ON Button */}
            <button
                type="button"
                disabled={disabled}
                aria-pressed={value}
                aria-label={`Toggle ${onLabel}`}
                style={{
                    ...buttonBaseStyle,
                    ...getButtonStyle(value, false),
                    borderRadius: '0 4px 4px 0',
                    marginLeft: '1px'
                }}
                onClick={handleOnClick}
                onMouseEnter={(e) => {
                    if (!disabled && !value) {
                        // Hovering over inactive ON - show it's clickable
                        e.currentTarget.style.backgroundColor = '#151515';
                        e.currentTarget.style.color = '#777';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!disabled && !value) {
                        e.currentTarget.style.backgroundColor = '#0a0a0a';
                        e.currentTarget.style.color = '#555';
                    }
                }}
            >
                {showIcons && onIcon && (
                    <span
                        style={{
                            fontSize: sizeStyle.iconSize,
                            opacity: value ? 1 : 0.5,
                            transition: 'opacity 0.2s'
                        }}
                        aria-hidden="true"
                    >
                        {onIcon}
                    </span>
                )}
                <span style={{
                    textShadow: value ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                    transition: 'text-shadow 0.2s'
                }}>
                    {onLabel}
                </span>
            </button>
        </div>
    );
};

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export default ToggleSwitch;