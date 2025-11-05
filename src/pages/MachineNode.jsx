import { useState, useMemo } from 'react';
import { Handle, Position } from '@xyflow/react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { getProductIcon, getGeneralIcon } from '../utils/AssetHelper';
import RecipeCard from '../components/RecipeCard';
import { PORT_TYPES, DEFAULT_SCALE } from './VisualizerConfig';

const MachineNode = ({ data, id }) => {
    const {
        label,
        parsedPorts = [],
        rotation = 0,
        machineImage,
        layoutWidth = 1,
        layoutHeight = 1,
        machine,
        selectedRecipe,
        globalScale = DEFAULT_SCALE,
        onRotate,
        onDelete,
        onRecipeChange,
        onPortClick,
        connectionStatus = 'unassigned'
    } = data;

    const [isHovered, setIsHovered] = useState(false);

    const recipeData = useMemo(() => {
        if (!selectedRecipe) return null;
        return ProductionCalculator.recipes?.find(r => r.id === selectedRecipe);
    }, [selectedRecipe]);

    const costs = useMemo(() => {
        const workers = machine.workers || 0;
        const electricity = machine.electricityKw || 0;
        const computing = machine.computingTFlops || 0;
        const maintenance = machine.maintenance?.perMonth || 0;
        const maintenanceProductId = machine.maintenance?.productId || '';
        return { workers, electricity, computing, maintenance, maintenanceProductId };
    }, [machine]);

    const workerIcon = getGeneralIcon('Worker');
    const electricityIcon = getGeneralIcon('Electricity');
    const computingIcon = getGeneralIcon('Computing');
    const allCategoryIcon = getGeneralIcon('AllCategory');

    const cardWidth = layoutWidth * 20 * globalScale;
    const nameFontSize = `${Math.max(10, Math.min(cardWidth * 0.04, 28))}px`;
    const sizeIndicatorFontSize = `${Math.max(8, Math.min(cardWidth * 0.025, 14))}px`;

    const getBorderColor = () => {
        switch (connectionStatus) {
            case 'satisfied': return '#50C878';
            case 'partial': return '#FFEB3B';
            case 'error': return '#F44336';
            case 'unassigned':
            default: return '#4a90e2';
        }
    };

    const getPortStyle = (port) => {
        const config = PORT_TYPES[port.inferredType] || PORT_TYPES.countable;
        const baseSize = 18 * globalScale;
        const base = {
            width: baseSize,
            height: baseSize,
            border: `${0.5 * globalScale}px solid #fff`,
            position: 'absolute',
            cursor: 'crosshair',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
            zIndex: 100
        };
        const shapeStyle = {};
        switch (config.shape) {
            case 'square': shapeStyle.borderRadius = '3px'; break;
            case 'circle': shapeStyle.borderRadius = '50%'; break;
            case 'ellipse': shapeStyle.borderRadius = '50% / 35%'; break;
            case 'diamond': shapeStyle.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'; break;
            case 'star': shapeStyle.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'; break;
            default: break;
        }
        return { ...base, ...shapeStyle, background: config.color };
    };

    const getPortProduct = (port) => {
        if (!recipeData) return 'AllCategory';

        const exactInput = recipeData.inputs?.find(inp => inp.ports?.length === 1 && inp.ports[0].id === port.id);
        if (exactInput) return ProductionCalculator.getProduct(exactInput.productId);

        const exactOutput = recipeData.outputs?.find(out => out.ports?.length === 1 && out.ports[0].id === port.id);
        if (exactOutput) return ProductionCalculator.getProduct(exactOutput.productId);

        const inputPorts = parsedPorts.filter(p => p.type === 'input').sort((a, b) => a.id.localeCompare(b.id));
        const outputPorts = parsedPorts.filter(p => p.type === 'output').sort((a, b) => a.id.localeCompare(b.id));

        if (port.type === 'input') {
            const wildcardInputs = recipeData.inputs?.filter(inp => inp.ports?.length > 1) || [];
            if (wildcardInputs.length > 0) {
                const portIndex = inputPorts.findIndex(p => p.id === port.id);
                if (portIndex >= 0 && portIndex < wildcardInputs.length) {
                    return ProductionCalculator.getProduct(wildcardInputs[portIndex].productId);
                }
            }
        } else if (port.type === 'output') {
            const wildcardOutputs = recipeData.outputs?.filter(out => out.ports?.length > 1) || [];
            if (wildcardOutputs.length > 0) {
                const portIndex = outputPorts.findIndex(p => p.id === port.id);
                if (portIndex >= 0 && portIndex < wildcardOutputs.length) {
                    return ProductionCalculator.getProduct(wildcardOutputs[portIndex].productId);
                }
            }
        }

        return 'AllCategory';
    };

    const portProductIconSize = 14 * globalScale;

    const maintenanceData = useMemo(() => {
        const { maintenance, maintenanceProductId } = costs;
        const maintenanceProduct = maintenanceProductId ? ProductionCalculator.getProduct(maintenanceProductId) : null;
        const maintenanceIconFixed = maintenanceProduct ? getProductIcon(maintenanceProduct) : null;

        let maintenanceColor = '#444';
        if (maintenance > 0 && maintenanceProductId) {
            if (maintenanceProductId.includes('MaintenanceT1')) maintenanceColor = '#FFFFFF';
            else if (maintenanceProductId.includes('MaintenanceT2')) maintenanceColor = '#FFEB3B';
            else maintenanceColor = '#F44336';
        }
        return { maintenanceIconFixed, maintenanceColor };
    }, [costs]);

    return (
        <div
            style={{ width: '100%', height: '100%', position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                width: '100%',
                height: '100%',
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center center',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#2a2a2a',
                border: `${1 * globalScale}px solid ${getBorderColor()}`,
                borderRadius: `${12 * globalScale}px`,
                boxShadow: isHovered ? '0 12px 32px rgba(74, 144, 226, 0.5)' : '0 6px 16px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s',
                overflow: 'visible'
            }}>
                {machineImage && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0.3,
                        width: '80%',
                        height: '80%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                    }}>
                        <img
                            src={machineImage}
                            alt={label}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'brightness(1.5) contrast(0.9)' }}
                        />
                    </div>
                )}

                {parsedPorts.map((port) => {
                    const productOrMarker = getPortProduct(port);
                    let productIcon = null;

                    if (productOrMarker === 'AllCategory') {
                        productIcon = allCategoryIcon;
                    } else {
                        productIcon = getProductIcon(productOrMarker);
                    }

                    const portScale = 20 * globalScale;

                    let adjustedX = port.pos.x;
                    if (port.type === 'output' && port.dir === '+X' && port.pos.x === layoutWidth - 1) {
                        adjustedX += 1;
                    }

                    return (
                        <div
                            key={port.id}
                            style={{
                                position: 'absolute',
                                left: `${adjustedX * portScale}px`,
                                top: `${port.pos.y * portScale}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title={`${port.id} (${port.inferredType}) - ${productOrMarker === 'AllCategory' ? 'Any' : productOrMarker?.name || 'Unknown'}`}
                        >
                            <Handle
                                type={port.type}
                                position={port.type === 'input' ? Position.Left : Position.Right}
                                id={port.id}
                                data-nodeid={id}
                                data-handleid={port.id}
                                style={getPortStyle(port)}
                                isConnectable={true}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onPortClick?.(id, port, productOrMarker);
                                }}
                            />
                            {productIcon && (
                                <img
                                    src={productIcon}
                                    alt={productOrMarker === 'AllCategory' ? 'Any' : productOrMarker?.name}
                                    style={{
                                        position: 'absolute',
                                        width: `${portProductIconSize}px`,
                                        height: `${portProductIconSize}px`,
                                        pointerEvents: 'none',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                                        zIndex: 101
                                    }}
                                />
                            )}
                        </div>
                    );
                })}

                {(() => {
                    const hasBottomPorts = parsedPorts.some(port => port.pos.y === layoutHeight - 1);
                    const bottomOffset = hasBottomPorts ? 24 + globalScale : globalScale;

                    return (
                        <div style={{
                            position: 'absolute',
                            bottom: `${bottomOffset}px`,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            padding: `${2 * globalScale}px 0`,
                            backgroundColor: 'rgba(0, 0, 0, 0.0)',
                            borderRadius: `${6 * globalScale}px`,
                            fontSize: `${Math.max(7, 8 * globalScale)}px`,
                            fontWeight: '700',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            overflow: 'hidden',
                            height: `${18 * globalScale}px`
                        }}>
                            <div style={{
                                flex: '0 0 15%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: `${2 * globalScale}px`,
                                color: costs.workers > 0 ? '#FFC107' : '#444'
                            }}>
                                {workerIcon && (
                                    <img
                                        src={workerIcon}
                                        alt="Workers"
                                        style={{ width: `${10 * globalScale}px`, height: `${10 * globalScale}px`, opacity: costs.workers > 0 ? 1 : 0.3 }}
                                    />
                                )}
                                <span style={{ fontSize: '1em' }}>{costs.workers || 0}</span>
                            </div>

                            <div style={{
                                flex: '0 0 32%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: `${2 * globalScale}px`,
                                color: costs.electricity > 0 ? '#FFEB3B' : '#444'
                            }}>
                                {electricityIcon && (
                                    <img
                                        src={electricityIcon}
                                        alt="Electricity"
                                        style={{ width: `${10 * globalScale}px`, height: `${10 * globalScale}px`, opacity: costs.electricity > 0 ? 1 : 0.3 }}
                                    />
                                )}
                                <span style={{ fontSize: '0.95em' }}>
                                    {costs.electricity > 0
                                        ? costs.electricity >= 1000
                                            ? `${(costs.electricity / 1000).toFixed(1)}MW`
                                            : `${costs.electricity}kW`
                                        : '0kW'}
                                </span>
                            </div>

                            <div style={{
                                flex: '0 0 22%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: `${2 * globalScale}px`,
                                color: costs.computing > 0 ? '#9C27B0' : '#444'
                            }}>
                                {computingIcon && (
                                    <img
                                        src={computingIcon}
                                        alt="Computing"
                                        style={{ width: `${10 * globalScale}px`, height: `${10 * globalScale}px`, opacity: costs.computing > 0 ? 1 : 0.3 }}
                                    />
                                )}
                                <span style={{ fontSize: '1em' }}>
                                    {costs.computing > 0 ? `${costs.computing}TF` : '0TF'}
                                </span>
                            </div>

                            <div style={{
                                flex: '0 0 15%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: `${2 * globalScale}px`,
                                color: maintenanceData.maintenanceColor
                            }}>
                                {maintenanceData.maintenanceIconFixed ? (
                                    <img
                                        src={maintenanceData.maintenanceIconFixed}
                                        alt="Maintenance"
                                        style={{ width: `${10 * globalScale}px`, height: `${10 * globalScale}px`, opacity: costs.maintenance > 0 ? 1 : 0.3 }}
                                    />
                                ) : (
                                    <span style={{ opacity: 0.3, fontSize: '0.8em' }}>🔧</span>
                                )}
                                <span style={{ fontSize: '1em' }}>
                                    {costs.maintenance > 0 ? costs.maintenance.toFixed(1) : '0'}
                                </span>
                            </div>
                        </div>
                    );
                })()}
            </div>

            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                <div style={{
                    position: 'absolute',
                    top: `${2 * globalScale}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: nameFontSize,
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                    textAlign: 'center',
                    maxWidth: '60%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: `${4 * globalScale}px ${8 * globalScale}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    borderRadius: `${6 * globalScale}px`,
                    border: '1px solid rgba(74, 144, 226, 0.0)'
                }}>
                    {label}
                </div>

                <div style={{
                    position: 'absolute',
                    top: `${4 * globalScale}px`,
                    right: `${2 * globalScale}px`,
                    fontSize: sizeIndicatorFontSize,
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: '600',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    padding: `${3 * globalScale}px ${6 * globalScale}px`,
                    borderRadius: `${4 * globalScale}px`,
                    maxWidth: '15%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {/* Use ASCII 'x' instead of Unicode multiplication sign */}
                    {layoutWidth}x{layoutHeight}
                </div>
            </div>

            {isHovered && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: `${globalScale}px`,
                    display: 'flex',
                    gap: `${8 * globalScale}px`,
                    pointerEvents: 'auto',
                    zIndex: 200
                }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onRotate?.(); }}
                        style={{
                            padding: `${10 * globalScale}px ${14 * globalScale}px`,
                            background: 'rgba(74, 144, 226, 0.95)',
                            color: 'white',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: `${8 * globalScale}px`,
                            fontSize: `${14 * globalScale}px`,
                            cursor: 'pointer',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="Rotate 90°"
                    >
                        <img src={getGeneralIcon('Rotate')} alt="Rotate" style={{ width: `${16 * globalScale}px`, height: `${16 * globalScale}px` }} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                        style={{
                            padding: `${10 * globalScale}px ${14 * globalScale}px`,
                            background: 'rgba(255, 107, 107, 0.95)',
                            color: 'white',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: `${8 * globalScale}px`,
                            fontSize: `${14 * globalScale}px`,
                            cursor: 'pointer',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="Delete"
                    >
                        <img src={getGeneralIcon('Trash')} alt="Delete" style={{ width: `${16 * globalScale}px`, height: `${16 * globalScale}px` }} />
                    </button>
                </div>
            )}

            {recipeData && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: `${4 * globalScale}px`,
                        pointerEvents: 'auto',
                        transition: 'all 0.2s',
                        opacity: isHovered ? 1 : 0.85,
                        filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                        cursor: machine.recipes?.length > 1 ? 'pointer' : 'default',
                        backgroundColor: '#2a2a2a',
                        borderRadius: `${8 * globalScale}px`,
                        padding: `${6 * globalScale}px`,
                        border: machine.recipes?.length > 1 ? `2px solid ${isHovered ? '#5aa0f2' : '#4a90e2'}` : '2px solid #333',
                        boxShadow: isHovered ? '0 8px 24px rgba(74, 144, 226, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.4)',
                        width: 'fit-content',
                        whiteSpace: 'nowrap'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (machine.recipes?.length > 1) {
                            onRecipeChange?.(selectedRecipe);
                        }
                    }}
                    title={machine.recipes?.length > 1 ? 'Click to change recipe' : recipeData.name}
                >
                    <RecipeCard recipe={recipeData} size="compact" isClickable={false} />
                    {machine.recipes?.length > 1 && (() => {
                        const recipesIcon = getGeneralIcon('Recipes');
                        return (
                            <div style={{
                                marginTop: `${2 * globalScale}px`,
                                paddingTop: `${3 * globalScale}px`,
                                borderTop: '1px solid rgba(74, 144, 226, 0.2)',
                                fontSize: `${Math.max(7, 5 * globalScale)}px`,
                                color: '#888',
                                textAlign: 'center',
                                fontWeight: '500',
                                letterSpacing: '0.3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: `${3 * globalScale}px`
                            }}>
                                {recipesIcon && (
                                    <img
                                        src={recipesIcon}
                                        alt="Recipes"
                                        style={{ width: `${8 * globalScale}px`, height: `${8 * globalScale}px`, opacity: 0.7 }}
                                    />
                                )}
                                <span>Click to view {machine.recipes.length} available recipes</span>
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
};

export default MachineNode;