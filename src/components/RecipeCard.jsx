import { getProductIcon, getMachineImage, getGeneralIcon } from '../utils/AssetHelper';
import ProductionCalculator from '../utils/ProductionCalculator';
import { useSettings } from '../contexts/SettingsContext';
import { useState } from 'react';

const RecipeCard = ({
    recipe,
    size = 'normal',
    isClickable = false,
    onClick = null,
    showPerMinute = null, // If null, uses settings default
    onToggleTime = null   // Optional callback when time is toggled
}) => {
    const { settings } = useSettings();
    const [localTimeToggle, setLocalTimeToggle] = useState(null);

    const machines = ProductionCalculator.getMachinesForRecipe(recipe.id);
    const machine = machines[0];
    const machineIcon = machine ? getMachineImage(machine) : null;
    const clockIcon = getGeneralIcon('Clock');
    const gearsIcon = getGeneralIcon('Gears');

    // Use provided showPerMinute, or local toggle, or settings default
    const shouldShowPerMinute = showPerMinute !== null
        ? showPerMinute
        : (localTimeToggle !== null ? localTimeToggle : settings.showRecipeTimePerMinute);

    const normalized = ProductionCalculator.normalizeRecipeToPerMinute(recipe);

    const handleToggleTime = (e) => {
        e.stopPropagation();
        if (onToggleTime) {
            onToggleTime(recipe.id);
        } else {
            setLocalTimeToggle(!shouldShowPerMinute);
        }
    };

    const sizes = {
        compact: {
            machineIcon: 32,
            productIcon: 20,
            quantityFont: '0.85rem',
            arrowFont: '1.1rem',
            padding: '10px',
            gap: '8px',
            showMachineName: false,
            timeFont: '0.75rem',
            toggleSize: 16
        },
        normal: {
            machineIcon: 40,
            productIcon: 26,
            quantityFont: '1rem',
            arrowFont: '1.4rem',
            padding: '12px',
            gap: '10px',
            showMachineName: true,
            timeFont: '0.85rem',
            toggleSize: 18
        },
        large: {
            machineIcon: 48,
            productIcon: 30,
            quantityFont: '1.1rem',
            arrowFont: '1.6rem',
            padding: '16px',
            gap: '12px',
            showMachineName: true,
            timeFont: '0.9rem',
            toggleSize: 20
        }
    };

    const config = sizes[size];

    const inputs = shouldShowPerMinute ? normalized.normalizedInputs : recipe.inputs.map(input => ({
        ...input,
        quantity: input.quantity,
        product: ProductionCalculator.getProduct(input.productId)
    }));

    const outputs = shouldShowPerMinute ? normalized.normalizedOutputs : recipe.outputs.map(output => ({
        ...output,
        quantity: output.quantity,
        product: ProductionCalculator.getProduct(output.productId)
    }));

    const displayTime = shouldShowPerMinute ? '60' : `${recipe.durationSeconds}s`;

    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: config.gap,
                padding: config.padding,
                cursor: isClickable ? 'pointer' : 'default',
                transition: 'all 0.2s',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                position: 'relative'
            }}
            onMouseEnter={(e) => {
                if (isClickable) {
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                }
            }}
            onMouseLeave={(e) => {
                if (isClickable) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }
            }}
        >
            {/* Machine Icon + Colon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    {machineIcon ? (
                        <img
                            src={machineIcon}
                            alt={machine?.name}
                            title={machine?.name}
                            style={{
                                width: `${config.machineIcon}px`,
                                height: `${config.machineIcon}px`,
                                objectFit: 'contain',
                                flexShrink: 0
                            }}
                        />
                    ) : gearsIcon && (
                        <img
                            src={gearsIcon}
                            alt="Machine"
                            style={{
                                width: `${config.machineIcon}px`,
                                height: `${config.machineIcon}px`,
                                objectFit: 'contain',
                                flexShrink: 0
                            }}
                        />
                    )}
                </div>
                <span style={{
                    color: '#666',
                    fontSize: config.arrowFont,
                    fontWeight: '300',
                    opacity: 0.7
                }}>
                    :
                </span>
            </div>

            {/* Inputs OR Gears + ∞ */}
            {inputs.length > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {inputs.map((input, idx) => {
                        const icon = getProductIcon(input.product);
                        const displayQty = shouldShowPerMinute ? input.perMinute.toFixed(1) : input.quantity;

                        return (
                            <div key={idx} style={{ display: 'contents' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                    {icon && (
                                        <img
                                            src={icon}
                                            alt={input.product?.name}
                                            title={input.product?.name}
                                            style={{
                                                width: `${config.productIcon}px`,
                                                height: `${config.productIcon}px`,
                                                objectFit: 'contain'
                                            }}
                                        />
                                    )}
                                    <span style={{
                                        color: '#ff9966',
                                        fontSize: config.quantityFont,
                                        fontWeight: '700',
                                        lineHeight: 1
                                    }}>
                                        {displayQty}
                                    </span>
                                </div>
                                {idx < inputs.length - 1 && (
                                    <span style={{
                                        color: '#888',
                                        fontSize: config.quantityFont,
                                        fontWeight: '700',
                                        margin: '0 2px'
                                    }}>
                                        +
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                gearsIcon && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <img
                            src={gearsIcon}
                            alt="Machine processes without inputs"
                            title="This recipe requires no inputs"
                            style={{
                                width: `${config.productIcon}px`,
                                height: `${config.productIcon}px`,
                                objectFit: 'contain'
                            }}
                        />
                        <span style={{
                            color: '#ff9966',
                            fontSize: config.quantityFont,
                            fontWeight: '700',
                            lineHeight: 1
                        }}>
                            ∞
                        </span>
                    </div>
                )
            )}

            {/* Arrow with Time */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', position: 'relative' }}>
                <button
                    onClick={handleToggleTime}
                    style={{
                        padding: '2px 4px',
                        backgroundColor: 'rgba(74, 144, 226, 0.2)',
                        border: '1px solid rgba(74, 144, 226, 0.4)',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s',
                        marginBottom: '2px'
                    }}
                    title={shouldShowPerMinute ? 'Show raw recipe time' : 'Show per-minute rate'}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.3)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {clockIcon && (
                        <img
                            src={clockIcon}
                            alt="Toggle time"
                            style={{
                                width: `${config.toggleSize}px`,
                                height: `${config.toggleSize}px`,
                                objectFit: 'contain'
                            }}
                        />
                    )}
                </button>
                <span style={{
                    color: '#888',
                    fontSize: config.arrowFont,
                    fontWeight: '300',
                    lineHeight: 1
                }}>
                    →
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{
                        color: '#aaa',
                        fontSize: config.timeFont,
                        fontWeight: '600',
                        lineHeight: 1
                    }}>
                        {displayTime}
                    </span>
                    {clockIcon && (
                        <img
                            src={clockIcon}
                            alt="Time"
                            style={{
                                width: `${config.toggleSize}px`,
                                height: `${config.toggleSize}px`,
                                objectFit: 'contain'
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Outputs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {outputs.map((output, idx) => {
                    const icon = getProductIcon(output.product);
                    const displayQty = shouldShowPerMinute ? output.perMinute.toFixed(1) : output.quantity;

                    return (
                        <div key={idx} style={{ display: 'contents' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                {icon && (
                                    <img
                                        src={icon}
                                        alt={output.product?.name}
                                        title={output.product?.name}
                                        style={{
                                            width: `${config.productIcon}px`,
                                            height: `${config.productIcon}px`,
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                                <span style={{
                                    color: '#5aa0f2',
                                    fontSize: config.quantityFont,
                                    fontWeight: '700',
                                    lineHeight: 1
                                }}>
                                    {displayQty}
                                </span>
                            </div>
                            {idx < outputs.length - 1 && (
                                <span style={{
                                    color: '#888',
                                    fontSize: config.quantityFont,
                                    fontWeight: '700',
                                    margin: '0 2px'
                                }}>
                                    +
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Machine Name */}
            {config.showMachineName && (
                <div style={{ flex: 1, marginLeft: '12px', minWidth: '140px' }}>
                    <div style={{ fontSize: '0.95rem', color: '#ddd', fontWeight: '600', lineHeight: 1.3 }}>
                        {machine?.name || 'Unknown'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '3px', lineHeight: 1.2 }}>
                        {recipe.name}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeCard;