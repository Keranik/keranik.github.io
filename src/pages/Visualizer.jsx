import { useCallback, useState, useEffect, useMemo } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
    MarkerType,
    addEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { getMachineImage, getProductIcon, getGeneralIcon } from '../utils/AssetHelper';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';

// NEW IMPORTS - Connection System
import connectionManager from '../utils/ConnectionManager';
import pathfindingHelper from '../utils/PathfindingHelper';
import ConnectionEdge from '../components/visualizer/ConnectionEdge';
import PriorityModal from '../components/visualizer/PriorityModal';
import ConnectionWarning from '../components/visualizer/ConnectionWarning';
import LayerFilter from '../components/visualizer/LayerFilter';

// ═══════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const PORT_TYPES = {
    countable: { char: '#', color: '#4a90e2', name: 'Flat Conveyor', shape: 'square' },
    loose: { char: '~', color: '#FFD700', name: 'Loose Conveyor', shape: 'ellipse' },
    molten: { char: "'", color: '#FF8C00', name: 'Molten Channel', shape: 'diamond' },
    fluid: { char: '@', color: '#50C878', name: 'Pipe', shape: 'circle' },
    shaft: { char: '|', color: '#9966CC', name: 'Mechanical Shaft', shape: 'star' }
};

const LAYERS = [
    { height: 0, name: 'Ground', color: '#ffffff', zIndex: 1 },
    { height: 1, name: 'Layer 1', color: '#ff6b6b', zIndex: 2 },
    { height: 2, name: 'Layer 2', color: '#4ecdc4', zIndex: 3 },
    { height: 3, name: 'Layer 3', color: '#ffe66d', zIndex: 4 },
    { height: 4, name: 'Layer 4', color: '#a8dadc', zIndex: 5 },
    { height: 5, name: 'Layer 5', color: '#f1a7fe', zIndex: 6 }
];

const DEFAULT_SCALE = 2.5;
const GRID_SNAP_SIZE = 1;
const NODE_SPACING_TILES = 1;

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

const parseLayoutPorts = (layoutString, ports) => {
    const lines = layoutString.split('\n');
    const portMap = new Map(ports.map(p => [p.id, { ...p, inferredType: 'unknown' }]));

    lines.forEach((line) => {
        for (let col = 0; col < line.length; col += 3) {
            const token = line.substring(col, col + 3);
            if (token.length !== 3) continue;

            let portName = null;
            let shapeChar = null;

            for (let i = 0; i < 3; i++) {
                const char = token[i];
                if (char >= 'A' && char <= 'Z') {
                    portName = char;
                } else if (['#', '~', "'", '@', '|'].includes(char)) {
                    shapeChar = char;
                }
            }

            if (portName && shapeChar) {
                const port = portMap.get(portName);
                if (port) {
                    let type = 'unknown';
                    switch (shapeChar) {
                        case '#': type = 'countable'; break;
                        case '~': type = 'loose'; break;
                        case "'": type = 'molten'; break;
                        case '@': type = 'fluid'; break;
                        case '|': type = 'shaft'; break;
                    }
                    portMap.set(portName, { ...port, inferredType: type });
                }
            }
        }
    });

    return Array.from(portMap.values());
};

const snapToGrid = (position, gridSize, scale) => {
    const snapSize = gridSize * 20 * scale;
    return {
        x: Math.round(position.x / snapSize) * snapSize,
        y: Math.round(position.y / snapSize) * snapSize
    };
};

const calculateProduction = (machine, recipe) => {
    if (!recipe) return null;

    const cyclesPerSecond = 1 / recipe.durationSeconds;
    const cyclesPerMinute = cyclesPerSecond * 60;

    const outputs = recipe.visibleOutputs.map(output => ({
        productId: output.productId,
        quantityPerMinute: output.quantity * cyclesPerMinute
    }));

    const inputs = recipe.visibleInputs.map(input => ({
        productId: input.productId,
        quantityPerMinute: input.quantity * cyclesPerMinute
    }));

    return { inputs, outputs, cyclesPerMinute };
};

const nodesOverlap = (node1Pos, node1Width, node1Height, node2Pos, node2Width, node2Height) => {
    return !(
        node1Pos.x + node1Width < node2Pos.x ||
        node2Pos.x + node2Width < node1Pos.x ||
        node1Pos.y + node1Height < node2Pos.y ||
        node2Pos.y + node2Height < node1Pos.y
    );
};

// ═══════════════════════════════════════════════════════════════════
// STORAGE NODE COMPONENT
// ═══════════════════════════════════════════════════════════════════

const StorageNode = ({ data, id }) => {
    const {
        storageType,
        productType,
        tier,
        product,
        globalScale = DEFAULT_SCALE,
        onDelete,
        connectionStatus = 'unassigned'
    } = data;

    const [isHovered, setIsHovered] = useState(false);
    const productIcon = product ? getProductIcon(product) : null;
    const allCategoryIcon = getGeneralIcon('AllCategory');
    const portConfig = PORT_TYPES[productType] || PORT_TYPES.countable;

    // Determine border color based on connection status
    const getBorderColor = () => {
        switch (connectionStatus) {
            case 'satisfied': return '#50C878'; // Green
            case 'partial': return '#FFEB3B'; // Yellow
            case 'error': return '#F44336'; // Red
            case 'unassigned':
            default: return storageType === 'source' ? '#50C878' : '#ff6b6b';
        }
    };

    return (
        <div
            style={{ width: '100%', height: '100%', position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: storageType === 'source' ? '#2a4a2a' : '#4a2a2a',
                border: `${3 * globalScale}px solid ${getBorderColor()}`,
                borderRadius: `${12 * globalScale}px`,
                boxShadow: isHovered
                    ? `0 12px 32px rgba(${storageType === 'source' ? '80, 200, 120' : '255, 107, 107'}, 0.5)`
                    : '0 6px 16px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: `${8 * globalScale}px`,
                padding: `${12 * globalScale}px`
            }}>
                <div style={{ fontSize: `${32 * globalScale}px`, lineHeight: 1 }}>
                    {storageType === 'source' ? '∞' : '🗑️'}
                </div>

                {productIcon ? (
                    <img src={productIcon} alt={product.name} style={{ width: `${32 * globalScale}px`, height: `${32 * globalScale}px`, objectFit: 'contain' }} />
                ) : (
                    <img src={allCategoryIcon} alt="Any" style={{ width: `${32 * globalScale}px`, height: `${32 * globalScale}px`, objectFit: 'contain' }} />
                )}

                <div style={{
                    fontSize: `${10 * globalScale}px`,
                    fontWeight: '700',
                    color: '#fff',
                    textAlign: 'center'
                }}>
                    {storageType === 'source' ? 'SOURCE' : 'SINK'}
                </div>

                <div style={{
                    fontSize: `${8 * globalScale}px`,
                    color: '#aaa',
                    textAlign: 'center'
                }}>
                    Tier {tier} {productType}
                </div>

                <Handle
                    type={storageType === 'source' ? 'source' : 'target'}
                    position={storageType === 'source' ? Position.Right : Position.Left}
                    style={{
                        width: 18 * globalScale,
                        height: 18 * globalScale,
                        background: portConfig.color,
                        border: `${2 * globalScale}px solid #fff`,
                        borderRadius: portConfig.shape === 'circle' ? '50%' : portConfig.shape === 'square' ? '3px' : '50%'
                    }}
                />
            </div>

            {isHovered && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.();
                    }}
                    style={{
                        position: 'absolute',
                        top: `-${30 * globalScale}px`,
                        right: 0,
                        padding: `${8 * globalScale}px ${12 * globalScale}px`,
                        background: 'rgba(255, 107, 107, 0.95)',
                        color: 'white',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: `${8 * globalScale}px`,
                        fontSize: `${12 * globalScale}px`,
                        cursor: 'pointer',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                        transition: 'all 0.2s',
                        zIndex: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: `${4 * globalScale}px`
                    }}
                >
                    <img src={getGeneralIcon('Trash')} alt="Delete" style={{ width: `${14 * globalScale}px`, height: `${14 * globalScale}px` }} />
                </button>
            )}
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════
// MACHINE NODE COMPONENT
// ═══════════════════════════════════════════════════════════════════

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

    const production = useMemo(() => {
        if (!recipeData) return null;
        return calculateProduction(machine, recipeData);
    }, [machine, recipeData]);

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
    const cardHeight = layoutHeight * 20 * globalScale;

    const nameFontSize = `${Math.max(10, Math.min(cardWidth * 0.04, 28)) * Math.min(globalScale, 2.5)}px`;
    const sizeIndicatorFontSize = `${Math.max(8, Math.min(cardWidth * 0.025, 14))}px`;

    useEffect(() => {
        console.log('Node rendered:', { id, hasPorts: !!parsedPorts?.length, portCount: parsedPorts?.length });
    }, [id, parsedPorts]);

    // Determine border color based on connection status
    const getBorderColor = () => {
        switch (connectionStatus) {
            case 'satisfied': return '#50C878'; // Green - all connections satisfied
            case 'partial': return '#FFEB3B'; // Yellow - partially satisfied
            case 'error': return '#F44336'; // Red - errors/unsatisfied
            case 'unassigned':
            default: return '#4a90e2'; // Blue - default/no connections
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
            case 'square':
                shapeStyle.borderRadius = '3px';
                break;
            case 'circle':
                shapeStyle.borderRadius = '50%';
                break;
            case 'ellipse':
                shapeStyle.borderRadius = '50% / 35%';
                break;
            case 'diamond':
                shapeStyle.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
                break;
            case 'star':
                shapeStyle.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
                break;
        }

        return {
            ...base,
            ...shapeStyle,
            background: config.color
        };
    };

    const getPortProduct = (port) => {
        if (!recipeData) {
            return 'AllCategory';
        }

        const exactInput = recipeData.inputs?.find(inp =>
            inp.ports?.length === 1 && inp.ports[0].id === port.id
        );
        if (exactInput) {
            return ProductionCalculator.getProduct(exactInput.productId);
        }

        const exactOutput = recipeData.outputs?.find(out =>
            out.ports?.length === 1 && out.ports[0].id === port.id
        );
        if (exactOutput) {
            return ProductionCalculator.getProduct(exactOutput.productId);
        }

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
                boxShadow: isHovered
                    ? '0 12px 32px rgba(74, 144, 226, 0.5)'
                    : '0 6px 16px rgba(0, 0, 0, 0.4)',
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
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                filter: 'brightness(1.5) contrast(0.9)'
                            }}
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
                    const hasBottomPorts = parsedPorts.some(port => {
                        const portY = port.pos.y;
                        return portY === layoutHeight - 1;
                    });

                    const bottomOffset = hasBottomPorts ? 24 + globalScale : globalScale;

                    const maintenanceProduct = costs.maintenanceProductId
                        ? ProductionCalculator.getProduct(costs.maintenanceProductId)
                        : null;
                    const maintenanceIconFixed = maintenanceProduct ? getProductIcon(maintenanceProduct) : null;

                    let maintenanceColor = '#444';
                    if (costs.maintenance > 0 && costs.maintenanceProductId) {
                        if (costs.maintenanceProductId.includes('MaintenanceT1')) {
                            maintenanceColor = '#FFFFFF';
                        } else if (costs.maintenanceProductId.includes('MaintenanceT2')) {
                            maintenanceColor = '#FFEB3B';
                        } else if (costs.maintenanceProductId.includes('MaintenanceT3')) {
                            maintenanceColor = '#F44336';
                        } else {
                            maintenanceColor = '#F44336';
                        }
                    }

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
                                        style={{
                                            width: `${10 * globalScale}px`,
                                            height: `${10 * globalScale}px`,
                                            opacity: costs.workers > 0 ? 1 : 0.3
                                        }}
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
                                        style={{
                                            width: `${10 * globalScale}px`,
                                            height: `${10 * globalScale}px`,
                                            opacity: costs.electricity > 0 ? 1 : 0.3
                                        }}
                                    />
                                )}
                                <span style={{ fontSize: '0.95em' }}>
                                    {costs.electricity > 0
                                        ? costs.electricity >= 1000
                                            ? `${(costs.electricity / 1000).toFixed(1)}MW`
                                            : `${costs.electricity}kW`
                                        : '0kW'
                                    }
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
                                        style={{
                                            width: `${10 * globalScale}px`,
                                            height: `${10 * globalScale}px`,
                                            opacity: costs.computing > 0 ? 1 : 0.3
                                        }}
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
                                color: maintenanceColor
                            }}>
                                {maintenanceIconFixed ? (
                                    <img
                                        src={maintenanceIconFixed}
                                        alt="Maintenance"
                                        style={{
                                            width: `${10 * globalScale}px`,
                                            height: `${10 * globalScale}px`,
                                            opacity: costs.maintenance > 0 ? 1 : 0.3
                                        }}
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

            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none'
            }}>
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
                    {layoutWidth}×{layoutHeight}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            onRotate?.();
                        }}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.();
                        }}
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
                        border: machine.recipes?.length > 1
                            ? `2px solid ${isHovered ? '#5aa0f2' : '#4a90e2'}`
                            : '2px solid #333',
                        boxShadow: isHovered
                            ? '0 8px 24px rgba(74, 144, 226, 0.4)'
                            : '0 4px 12px rgba(0, 0, 0, 0.4)',
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
                    <RecipeCard
                        recipe={recipeData}
                        size="compact"
                        isClickable={false}
                    />
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
                                        style={{
                                            width: `${8 * globalScale}px`,
                                            height: `${8 * globalScale}px`,
                                            opacity: 0.7
                                        }}
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

// Custom edge types
const edgeTypes = {
    connection: ConnectionEdge
};

const nodeTypes = {
    machineNode: MachineNode,
    storageNode: StorageNode
};

// ═══════════════════════════════════════════════════════════════════
// MAIN VISUALIZER COMPONENT
// ═══════════════════════════════════════════════════════════════════

const Visualizer = () => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(0);
    const [connectionMode, setConnectionMode] = useState('auto');
    const [connectingFrom, setConnectingFrom] = useState(null);
    const [globalScale, setGlobalScale] = useState(DEFAULT_SCALE);
    const [snapToGridEnabled, setSnapToGridEnabled] = useState(true);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // NEW: Connection system state
    const [visibleLayers, setVisibleLayers] = useState(new Set([0, 1, 2, 3, 4, 5]));
    const [priorityModalState, setPriorityModalState] = useState({
        open: false,
        sourceNodeId: null,
        sourcePortId: null,
        connections: [],
        totalProduction: 0,
        product: null
    });

    // Recipe modal state
    const [recipeModalState, setRecipeModalState] = useState({
        open: false,
        recipes: [],
        currentRecipeId: null,
        nodeId: null,
        context: null
    });

    // Port action modal state
    const [portActionModal, setPortActionModal] = useState({
        open: false,
        nodeId: null,
        port: null,
        product: null,
        type: null
    });

    const workerIcon = getGeneralIcon('Worker');
    const electricityIcon = getGeneralIcon('Electricity');
    const computingIcon = getGeneralIcon('Computing');
    const machinesIcon = getGeneralIcon('Machines');

    // NEW: Initialize connection manager with node getter
    useEffect(() => {
        connectionManager.setNodeGetter((nodeId) => {
            return nodes.find(n => n.id === nodeId);
        });
    }, [nodes]);

    useEffect(() => {
        document.title = 'Factory Visualizer - Captain of Industry Tools';

        const loadData = async () => {
            const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
            const gameData = await DataLoader.loadGameData(enabledMods);
            ProductionCalculator.initialize(gameData);
            setDataLoaded(true);
        };

        loadData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                // NEW: Update connection status for each node
                const connectionStatus = connectionManager.getNodeStatus(node.id);

                if (node.type === 'machineNode') {
                    const basePixelPerGrid = 20;
                    const scaledPixelPerGrid = basePixelPerGrid * globalScale;
                    const width = node.data.layoutWidth * scaledPixelPerGrid;
                    const height = node.data.layoutHeight * scaledPixelPerGrid;

                    return {
                        ...node,
                        data: { ...node.data, globalScale, connectionStatus },
                        style: {
                            ...node.style,
                            width,
                            height
                        }
                    };
                } else if (node.type === 'storageNode') {
                    const width = 120 * globalScale;
                    const height = 100 * globalScale;

                    return {
                        ...node,
                        data: { ...node.data, globalScale, connectionStatus },
                        style: {
                            ...node.style,
                            width,
                            height
                        }
                    };
                }
                return node;
            })
        );

        setEdges((eds) =>
            eds.map((edge) => {
                const conn = connectionManager.connections.get(edge.id);

                return {
                    ...edge,
                    type: 'connection',
                    style: {
                        ...edge.style,
                        strokeWidth: 4 * globalScale
                    },
                    markerEnd: {
                        ...edge.markerEnd,
                        width: 20 * globalScale,
                        height: 20 * globalScale
                    },
                    data: {
                        ...edge.data,
                        globalScale,
                        flow: conn?.flow || 0,
                        satisfied: conn?.satisfied || 'unassigned',
                        product: conn?.product || null,
                        warnings: conn?.warnings || [],
                        onFlowBadgeClick: (edgeId) => handleFlowBadgeClick(edgeId)
                    },
                    hidden: !visibleLayers.has(edge.data?.layer || 0)
                };
            })
        );
    }, [globalScale, setNodes, setEdges, visibleLayers]);

    // NEW: Calculate connections by layer for LayerFilter
    const connectionsByLayer = useMemo(() => {
        const counts = {};
        LAYERS.forEach(layer => {
            counts[layer.height] = 0;
        });

        edges.forEach(edge => {
            const layer = edge.data?.layer || 0;
            counts[layer] = (counts[layer] || 0) + 1;
        });

        return counts;
    }, [edges]);

    // NEW: Get all warnings
    const allWarnings = useMemo(() => {
        return connectionManager.getAllWarnings();
    }, [edges]);

    const totalCosts = useMemo(() => {
        let workers = 0;
        let electricity = 0;
        let computing = 0;
        const maintenanceByProduct = new Map();

        nodes.forEach(node => {
            if (node.data?.machine) {
                const m = node.data.machine;
                workers += m.workers || 0;
                electricity += m.electricityKw || 0;
                computing += m.computingTFlops || 0;

                if (m.maintenance?.perMonth > 0) {
                    const productId = m.maintenance.productId;
                    const current = maintenanceByProduct.get(productId) || 0;
                    maintenanceByProduct.set(productId, current + m.maintenance.perMonth);
                }
            }
        });

        return { workers, electricity, computing, maintenanceByProduct };
    }, [nodes]);

    const saveHistory = useCallback(() => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ nodes, edges });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [nodes, edges, history, historyIndex]);

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            const { nodes: prevNodes, edges: prevEdges } = history[newIndex];
            setNodes(prevNodes);
            setEdges(prevEdges);
            setHistoryIndex(newIndex);
        }
    }, [historyIndex, history, setNodes, setEdges]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            const { nodes: nextNodes, edges: nextEdges } = history[newIndex];
            setNodes(nextNodes);
            setEdges(nextEdges);
            setHistoryIndex(newIndex);
        }
    }, [historyIndex, history, setNodes, setEdges]);

    const findClearPosition = useCallback((idealPosition, nodeWidth, nodeHeight, priorityNodeId = null) => {
        let position = { ...idealPosition };
        const maxAttempts = 100;
        let attempt = 0;
        const bumpDistance = 20 * globalScale * GRID_SNAP_SIZE;

        // Check current nodes state
        const currentNodes = nodes; // Capture current state

        while (attempt < maxAttempts) {
            let hasCollision = false;

            for (const existingNode of currentNodes) {
                if (existingNode.id === priorityNodeId) continue;

                const existingPos = existingNode.position;
                const existingWidth = existingNode.style?.width || 100;
                const existingHeight = existingNode.style?.height || 100;

                if (nodesOverlap(position, nodeWidth, nodeHeight, existingPos, existingWidth, existingHeight)) {
                    hasCollision = true;

                    // DON'T bump - just find a new position for the NEW node instead
                    const dx = position.x - existingPos.x;
                    const dy = position.y - existingPos.y;

                    if (Math.abs(dx) > Math.abs(dy)) {
                        position.x += dx > 0 ? bumpDistance : -bumpDistance;
                    } else {
                        position.y += dy > 0 ? bumpDistance : -bumpDistance;
                    }

                    break;
                }
            }

            if (!hasCollision) {
                return position;
            }

            attempt++;
        }

        return position;
    }, [nodes, globalScale]); // ← CRITICAL: Include 'nodes' in dependencies

    // NEW: Handle connection creation
    const onConnect = useCallback((params) => {
        console.log('Connection params:', params);

        // Create connection via ConnectionManager
        const result = connectionManager.createConnection({
            ...params,
            layer: selectedLayer
        });

        if (result.error) {
            console.error('Connection error:', result.error);
            return;
        }

        // Create edge
        const newEdge = {
            id: result.connection.id,
            source: params.source,
            sourceHandle: params.sourceHandle,
            target: params.target,
            targetHandle: params.targetHandle,
            type: 'connection',
            animated: true,
            style: {
                stroke: LAYERS[selectedLayer].color,
                strokeWidth: 4 * globalScale
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20 * globalScale,
                height: 20 * globalScale,
                color: LAYERS[selectedLayer].color,
            },
            data: {
                layer: selectedLayer,
                flow: result.connection.flow,
                satisfied: result.connection.satisfied,
                product: result.connection.product,
                warnings: result.connection.warnings,
                globalScale,
                onFlowBadgeClick: (edgeId) => handleFlowBadgeClick(edgeId)
            },
            zIndex: LAYERS[selectedLayer].zIndex
        };

        setEdges((eds) => [...eds, newEdge]);
        saveHistory();

        // Update all node statuses
        connectionManager.updateAllStatuses();

        // Trigger node re-render to update border colors
        setNodes((nds) => [...nds]);

    }, [selectedLayer, globalScale, setEdges, saveHistory, setNodes]);

    // NEW: Handle flow badge click
    const handleFlowBadgeClick = useCallback((edgeId) => {
        const conn = connectionManager.connections.get(edgeId);
        if (!conn) return;

        // Get all connections from this output
        const outputConnections = [];
        connectionManager.connections.forEach((c) => {
            if (c.source === conn.source && c.sourceHandle === conn.sourceHandle) {
                outputConnections.push(c);
            }
        });

        const sourceNode = nodes.find(n => n.id === conn.source);
        if (!sourceNode) return;

        const sourcePort = sourceNode.data.parsedPorts?.find(p => p.id === conn.sourceHandle);
        if (!sourcePort) return;

        const totalProduction = connectionManager.getOutputProduction(sourceNode, sourcePort);

        setPriorityModalState({
            open: true,
            sourceNodeId: conn.source,
            sourcePortId: conn.sourceHandle,
            connections: outputConnections,
            totalProduction,
            product: conn.product
        });
    }, [nodes]);

    // NEW: Handle priority modal update
    const handlePriorityUpdate = useCallback((updates) => {
        updates.forEach(update => {
            connectionManager.setConnectionMode(update.id, update.mode, {
                manualFlow: update.flow,
                priority: update.priority
            });
        });

        // Update edges with new flow values
        setEdges((eds) =>
            eds.map((edge) => {
                const conn = connectionManager.connections.get(edge.id);
                if (!conn) return edge;

                return {
                    ...edge,
                    data: {
                        ...edge.data,
                        flow: conn.flow,
                        satisfied: conn.satisfied
                    }
                };
            })
        );

        // Update node statuses
        setNodes((nds) => [...nds]);

        saveHistory();
    }, [setEdges, setNodes, saveHistory]);

    // NEW: Handle layer toggle
    const handleToggleLayer = useCallback((layerHeight) => {
        setVisibleLayers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(layerHeight)) {
                newSet.delete(layerHeight);
            } else {
                newSet.add(layerHeight);
            }
            return newSet;
        });
    }, []);

    // NEW: Handle toggle all layers
    const handleToggleAllLayers = useCallback((show) => {
        if (show) {
            setVisibleLayers(new Set([0, 1, 2, 3, 4, 5]));
        } else {
            setVisibleLayers(new Set());
        }
    }, []);

    const onAddNode = useCallback((machine, position = null) => {
        const parsedPorts = parseLayoutPorts(machine.layout.layoutString, machine.layout.ports);
        const machineImage = getMachineImage(machine);
        const defaultRecipe = machine.recipes?.[0] || null;

        const basePixelPerGrid = 20;
        const scaledPixelPerGrid = basePixelPerGrid * globalScale;
        const width = machine.layout.width * scaledPixelPerGrid;
        const height = machine.layout.height * scaledPixelPerGrid;

        let nodePosition = position || { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 };
        if (snapToGridEnabled) {
            nodePosition = snapToGrid(nodePosition, GRID_SNAP_SIZE, globalScale);
        }

        nodePosition = findClearPosition(nodePosition, width, height);

        const newNode = {
            id: `${machine.id}-${Date.now()}`,
            type: 'machineNode',
            data: {
                label: machine.name,
                parsedPorts,
                rotation: 0,
                machineId: machine.id,
                machineImage,
                layoutWidth: machine.layout.width,
                layoutHeight: machine.layout.height,
                machine,
                selectedRecipe: defaultRecipe,
                globalScale,
                connectionStatus: 'unassigned',
                onRotate: null,
                onDelete: null,
                onRecipeChange: null,
                onPortClick: null
            },
            position: nodePosition,
            style: {
                width,
                height,
                backgroundColor: 'transparent',
                border: 'none',
                position: 'relative'
            }
        };

        const nodeId = newNode.id;

        newNode.data.onRotate = () => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        const newRotation = (node.data.rotation + 90) % 360;
                        const shouldSwap = (newRotation === 90 || newRotation === 270);
                        const currentWidth = node.style?.width;
                        const currentHeight = node.style?.height;

                        return {
                            ...node,
                            data: { ...node.data, rotation: newRotation },
                            style: {
                                ...node.style,
                                width: shouldSwap ? currentHeight : currentWidth,
                                height: shouldSwap ? currentWidth : currentHeight
                            }
                        };
                    }
                    return node;
                })
            );
            saveHistory();
        };

        newNode.data.onDelete = () => {
            // Delete all connections involving this node
            const connectedEdges = edges.filter(e => e.source === nodeId || e.target === nodeId);
            connectedEdges.forEach(edge => {
                connectionManager.deleteConnection(edge.id);
            });

            setNodes((nds) => nds.filter(node => node.id !== nodeId));
            setEdges((eds) => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
            saveHistory();
        };

        newNode.data.onRecipeChange = (currentRecipeId) => {
            const recipes = machine.recipes?.map(rId =>
                ProductionCalculator.recipes?.find(r => r.id === rId)
            ).filter(Boolean) || [];

            setRecipeModalState({
                open: true,
                recipes,
                currentRecipeId,
                nodeId: nodeId,
                context: 'nodeRecipeChange'
            });
        };

        newNode.data.onPortClick = (nodeId, port, product) => {
            handlePortClick(nodeId, port, product);
        };

        setNodes((nds) => nds.concat(newNode));
        saveHistory();
    }, [setNodes, globalScale, snapToGridEnabled, saveHistory, findClearPosition, edges, setEdges]);

    const onAddStorageNode = useCallback((storageType, productType, tier, product, position) => {
        const width = 120 * globalScale;
        const height = 100 * globalScale;

        let nodePosition = position || { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 };
        if (snapToGridEnabled) {
            nodePosition = snapToGrid(nodePosition, GRID_SNAP_SIZE, globalScale);
        }

        nodePosition = findClearPosition(nodePosition, width, height);

        const newNode = {
            id: `storage-${storageType}-${Date.now()}`,
            type: 'storageNode',
            data: {
                storageType,
                productType,
                tier,
                product,
                globalScale: DEFAULT_SCALE,
                layoutWidth: machine.layoutWidth,
                layoutHeight: machine.layoutHeight,
                parsedPorts,
                connectionStatus: 'unassigned',
                onDelete: null
            },
            position: nodePosition,
            style: {
                width,
                height,
                backgroundColor: 'transparent',
                border: 'none',
                position: 'relative'
            }
        };

        const nodeId = newNode.id;

        newNode.data.onDelete = () => {
            // Delete all connections involving this node
            const connectedEdges = edges.filter(e => e.source === nodeId || e.target === nodeId);
            connectedEdges.forEach(edge => {
                connectionManager.deleteConnection(edge.id);
            });

            setNodes((nds) => nds.filter(node => node.id !== nodeId));
            setEdges((eds) => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
            saveHistory();
        };

        setNodes((nds) => nds.concat(newNode));
        saveHistory();
    }, [setNodes, globalScale, snapToGridEnabled, saveHistory, findClearPosition, edges, setEdges]);

    const handlePortClick = useCallback((nodeId, port, product) => {
        console.log('Port clicked:', { nodeId, port, product });

        setPortActionModal({
            open: true,
            nodeId,
            port,
            product,
            type: port.type
        });
    }, []);

    const handleRecipeSelection = useCallback((recipeId) => {
        const { nodeId, context } = recipeModalState;

        if (context === 'nodeRecipeChange') {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        return {
                            ...node,
                            data: { ...node.data, selectedRecipe: recipeId }
                        };
                    }
                    return node;
                })
            );

            setRecipeModalState({ open: false, recipes: [], currentRecipeId: null, nodeId: null, context: null });

        } else if (context === 'portInputAdd' || context === 'portOutputAdd') {
            setRecipeModalState({ open: false, recipes: [], currentRecipeId: null, nodeId: null, context: null });

            const recipe = ProductionCalculator.recipes.find(r => r.id === recipeId);
            if (!recipe) return;

            const machines = ProductionCalculator.getMachinesForRecipe(recipeId);
            if (!machines || machines.length === 0) return;

            const machine = machines[0];

            const originalNode = nodes.find(n => n.id === nodeId);
            if (!originalNode) return;

            const { port } = portActionModal;
            const basePixelPerGrid = 20;
            const scaledPixelPerGrid = basePixelPerGrid * globalScale;
            const spacing = NODE_SPACING_TILES * scaledPixelPerGrid;

            let newNodePosition = { ...originalNode.position };

            if (context === 'portInputAdd') {
                newNodePosition.x -= (machine.layout.width * scaledPixelPerGrid) + spacing;
            } else {
                newNodePosition.x += (originalNode.data.layoutWidth * scaledPixelPerGrid) + spacing;
            }

            const parsedPorts = parseLayoutPorts(machine.layout.layoutString, machine.layout.ports);
            const machineImage = getMachineImage(machine);
            const width = machine.layout.width * scaledPixelPerGrid;
            const height = machine.layout.height * scaledPixelPerGrid;

            newNodePosition = findClearPosition(newNodePosition, width, height);

            const newNodeId = `${machine.id}-${Date.now()}`;

            const newNode = {
                id: newNodeId,
                type: 'machineNode',
                data: {
                    label: machine.name,
                    parsedPorts,
                    rotation: 0,
                    machineId: machine.id,
                    machineImage,
                    layoutWidth: machine.layout.width,
                    layoutHeight: machine.layout.height,
                    machine,
                    selectedRecipe: recipeId,
                    globalScale,
                    connectionStatus: 'unassigned',
                    onRotate: null,
                    onDelete: null,
                    onRecipeChange: null,
                    onPortClick: null
                },
                position: newNodePosition,
                style: {
                    width,
                    height,
                    backgroundColor: 'transparent',
                    border: 'none',
                    position: 'relative'
                }
            };

            newNode.data.onRotate = () => {
                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === newNodeId) {
                            const newRotation = (node.data.rotation + 90) % 360;
                            const shouldSwap = (newRotation === 90 || newRotation === 270);
                            const currentWidth = node.style?.width;
                            const currentHeight = node.style?.height;

                            return {
                                ...node,
                                data: { ...node.data, rotation: newRotation },
                                style: {
                                    ...node.style,
                                    width: shouldSwap ? currentHeight : currentWidth,
                                    height: shouldSwap ? currentWidth : currentHeight
                                }
                            };
                        }
                        return node;
                    })
                );
                saveHistory();
            };

            newNode.data.onDelete = () => {
                const connectedEdges = edges.filter(e => e.source === newNodeId || e.target === newNodeId);
                connectedEdges.forEach(edge => {
                    connectionManager.deleteConnection(edge.id);
                });

                setNodes((nds) => nds.filter(node => node.id !== newNodeId));
                setEdges((eds) => eds.filter(edge => edge.source !== newNodeId && edge.target !== newNodeId));
                saveHistory();
            };

            newNode.data.onRecipeChange = (currentRecipeId) => {
                const recipes = machine.recipes?.map(rId =>
                    ProductionCalculator.recipes?.find(r => r.id === rId)
                ).filter(Boolean) || [];

                setRecipeModalState({
                    open: true,
                    recipes,
                    currentRecipeId,
                    nodeId: newNodeId,
                    context: 'nodeRecipeChange'
                });
            };

            newNode.data.onPortClick = (nodeId, port, product) => {
                handlePortClick(nodeId, port, product);
            };

            setNodes((nds) => nds.concat(newNode));

            // Auto-connect if connection mode is auto
            if (connectionMode === 'auto') {
                const newNodePorts = parsedPorts;

                let sourceNodeId, sourceHandle, targetNodeId, targetHandle;

                if (context === 'portInputAdd') {
                    const newNodeOutputPort = newNodePorts.find(p => p.type === 'output');
                    if (newNodeOutputPort) {
                        sourceNodeId = newNodeId;
                        sourceHandle = newNodeOutputPort.id;
                        targetNodeId = nodeId;
                        targetHandle = port.id;
                    }
                } else {
                    const newNodeInputPort = newNodePorts.find(p => p.type === 'input');
                    if (newNodeInputPort) {
                        sourceNodeId = nodeId;
                        sourceHandle = port.id;
                        targetNodeId = newNodeId;
                        targetHandle = newNodeInputPort.id;
                    }
                }

                if (sourceNodeId && targetNodeId) {
                    // Use onConnect to create connection via ConnectionManager
                    setTimeout(() => {
                        onConnect({
                            source: sourceNodeId,
                            sourceHandle,
                            target: targetNodeId,
                            targetHandle
                        });
                    }, 100);
                }
            }

            saveHistory();
        }
    }, [recipeModalState, portActionModal, nodes, setNodes, connectionMode, selectedLayer, globalScale, setEdges, saveHistory, handlePortClick, findClearPosition, onConnect, edges]);

    const handlePortActionSelect = useCallback((action) => {
        const { nodeId, port, product } = portActionModal;

        if (action === 'machine') {
            let recipes = [];

            if (port.type === 'input') {
                recipes = ProductionCalculator.recipes.filter(r =>
                    r.outputs.some(o => product !== 'AllCategory' && o.productId === product.id)
                );
            } else {
                recipes = ProductionCalculator.recipes.filter(r =>
                    r.inputs.some(i => product !== 'AllCategory' && i.productId === product.id)
                );
            }

            if (recipes.length === 0) {
                console.log('No recipes found for this product');
                return;
            }

            setRecipeModalState({
                open: true,
                recipes,
                currentRecipeId: null,
                nodeId,
                context: port.type === 'input' ? 'portInputAdd' : 'portOutputAdd'
            });
        } else if (action.startsWith('storage-')) {
            const tier = parseInt(action.split('-')[1]);
            const productType = product !== 'AllCategory' ? port.inferredType : 'countable';
            const storageType = port.type === 'input' ? 'source' : 'sink';

            const originalNode = nodes.find(n => n.id === nodeId);
            if (!originalNode) return;

            const basePixelPerGrid = 20;
            const scaledPixelPerGrid = basePixelPerGrid * globalScale;
            const spacing = NODE_SPACING_TILES * scaledPixelPerGrid;

            let storagePosition = { ...originalNode.position };

            if (storageType === 'source') {
                storagePosition.x -= 120 * globalScale + spacing;
            } else {
                storagePosition.x += (originalNode.data.layoutWidth * scaledPixelPerGrid) + spacing;
            }

            onAddStorageNode(storageType, productType, tier, product !== 'AllCategory' ? product : null, storagePosition);

            // Auto-connect if connection mode is auto
            if (connectionMode === 'auto') {
                setTimeout(() => {
                    const storageNodes = nodes.filter(n => n.type === 'storageNode');
                    const latestStorage = storageNodes[storageNodes.length - 1];

                    if (latestStorage) {
                        if (storageType === 'source') {
                            onConnect({
                                source: latestStorage.id,
                                sourceHandle: 'default',
                                target: nodeId,
                                targetHandle: port.id
                            });
                        } else {
                            onConnect({
                                source: nodeId,
                                sourceHandle: port.id,
                                target: latestStorage.id,
                                targetHandle: 'default'
                            });
                        }
                    }
                }, 100);
            }
        }

        setPortActionModal({ open: false, nodeId: null, port: null, product: null, type: null });
    }, [portActionModal, nodes, globalScale, onAddStorageNode, connectionMode, onConnect]);

    const exportBlueprint = useCallback(() => {
        const blueprint = {
            version: '1.0.0',
            name: 'My Factory Layout',
            scale: globalScale,
            nodes: nodes.map(node => ({
                id: node.id,
                type: node.type,
                machineId: node.data.machineId,
                position: node.position,
                rotation: node.data.rotation,
                recipe: node.data.selectedRecipe,
                storageType: node.data.storageType,
                productType: node.data.productType,
                tier: node.data.tier
            })),
            edges: edges.map(edge => ({
                id: edge.id,
                source: edge.source,
                sourceHandle: edge.sourceHandle,
                target: edge.target,
                targetHandle: edge.targetHandle,
                layer: edge.data.layer
            }))
        };

        const dataStr = JSON.stringify(blueprint, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `factory-blueprint-${Date.now()}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }, [nodes, edges, globalScale]);

    const importBlueprint = useCallback((event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const blueprint = JSON.parse(e.target.result);
                console.log('Blueprint loaded:', blueprint);
                alert('Blueprint import coming soon!');
            } catch (error) {
                alert('Failed to load blueprint: ' + error.message);
            }
        };
        reader.readAsText(file);
    }, []);

    const onMachineClick = useCallback((machine) => {
        onAddNode(machine);
    }, [onAddNode]);

    if (!dataLoaded) {
        return (
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1a1a1a',
                color: 'white'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading Factory Visualizer...</h2>
                <div style={{
                    marginTop: '2rem',
                    width: '60px',
                    height: '60px',
                    border: '6px solid #333',
                    borderTop: '6px solid #4a90e2',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1a1a1a'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                backgroundColor: '#2a2a2a',
                borderBottom: '2px solid #4a90e2',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                zIndex: 1000
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            margin: 0,
                            marginBottom: '0.5rem',
                            background: 'linear-gradient(135deg, #4a90e2 0%, #5aa0f2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            <img src={getGeneralIcon('Buildings')} alt="Factory" style={{ width: '28px', height: '28px', verticalAlign: 'middle' }} /> Factory Blueprint Designer
                        </h2>
                        <p style={{ color: '#aaa', fontSize: '1rem', margin: 0 }}>
                            Design, optimize, and share your factory layouts • {nodes.length} machines • {edges.length} connections
                        </p>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Scale control */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '8px',
                            border: '2px solid #4a90e2'
                        }}>
                            <label style={{ color: '#aaa', fontSize: '0.9rem', fontWeight: '600' }}>Scale:</label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                step="0.5"
                                value={globalScale}
                                onChange={(e) => setGlobalScale(Number(e.target.value))}
                                style={{ width: '120px' }}
                            />
                            <span style={{ color: 'white', fontWeight: '700', minWidth: '40px' }}>{globalScale.toFixed(1)}×</span>
                        </div>

                        {/* Snap to grid */}
                        <button
                            onClick={() => setSnapToGridEnabled(!snapToGridEnabled)}
                            style={{
                                padding: '10px 16px',
                                background: snapToGridEnabled ? '#4a90e2' : '#333',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            <img src={getGeneralIcon('NoSnap')} alt="SnapToGrid" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} /> Snap: {snapToGridEnabled ? 'ON' : 'OFF'}
                        </button>

                        {/* Undo/Redo */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                                onClick={undo}
                                disabled={historyIndex <= 0}
                                style={{
                                    padding: '10px 14px',
                                    background: historyIndex > 0 ? '#4a90e2' : '#333',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: historyIndex > 0 ? 'pointer' : 'not-allowed',
                                    fontWeight: '600',
                                    fontSize: '1rem'
                                }}
                                title="Undo (Ctrl+Z)"
                            >
                                <img src={getGeneralIcon('Undo')} alt="Undo" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />
                            </button>
                            <button
                                onClick={redo}
                                disabled={historyIndex >= history.length - 1}
                                style={{
                                    padding: '10px 14px',
                                    background: historyIndex < history.length - 1 ? '#4a90e2' : '#333',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: historyIndex < history.length - 1 ? 'pointer' : 'not-allowed',
                                    fontWeight: '600',
                                    fontSize: '1rem'
                                }}
                                title="Redo (Ctrl+Y)"
                            >
                                <img src={getGeneralIcon('Redo')} alt="Redo" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />
                            </button>
                        </div>

                        {/* Export/Import */}
                        <button
                            onClick={exportBlueprint}
                            style={{
                                padding: '10px 16px',
                                background: '#50C878',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}
                        >
                            <img src={getGeneralIcon('ExportToString')} alt="Export" style={{ height: '20px', width: 'auto', verticalAlign: 'middle' }} /> Export
                        </button>
                        <label style={{
                            padding: '10px 16px',
                            background: '#FF8C00',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            <img src={getGeneralIcon('ImportFromString')} alt="Import" style={{ height: '20px', width: 'auto', verticalAlign: 'middle' }} /> Import
                            <input
                                type="file"
                                accept=".json"
                                onChange={importBlueprint}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>

                    {/* Total costs */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        padding: '12px 24px',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '12px',
                        border: '2px solid #4a90e2',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '4px' }}>Workers</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFC107', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                                {workerIcon && <img src={workerIcon} alt="Workers" style={{ width: '20px', height: '20px' }} />}
                                {totalCosts.workers}
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '4px' }}>Power</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFEB3B', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                                {electricityIcon && <img src={electricityIcon} alt="Electricity" style={{ width: '20px', height: '20px' }} />}
                                {totalCosts.electricity}kW
                            </div>
                        </div>
                        {totalCosts.computing > 0 && (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '4px' }}>Computing</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#9C27B0', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                                    {computingIcon && <img src={computingIcon} alt="Computing" style={{ width: '20px', height: '20px' }} />}
                                    {totalCosts.computing}TF
                                </div>
                            </div>
                        )}
                        {totalCosts.maintenanceByProduct.size > 0 && (
                            <>
                                {Array.from(totalCosts.maintenanceByProduct.entries()).map(([productId, amount]) => {
                                    const product = ProductionCalculator.getProduct(productId);
                                    const maintenanceIcon = product ? getProductIcon(product) : null;

                                    return (
                                        <div key={productId} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '4px' }}>Maintenance</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#F44336', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                                                {maintenanceIcon && <img src={maintenanceIcon} alt={product?.name} style={{ width: '20px', height: '20px' }} />}
                                                {amount.toFixed(1)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <ReactFlowProvider>
                <div style={{ flex: 1, display: 'flex', backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
                    {/* Sidebar */}
                    <div style={{
                        width: '320px',
                        background: '#2a2a2a',
                        color: 'white',
                        padding: '1.5rem',
                        overflowY: 'auto',
                        borderRight: '2px solid #4a90e2',
                        boxShadow: '4px 0 12px rgba(0, 0, 0, 0.3)'
                    }}>
                        <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>
                            <img src={getGeneralIcon('Machines')} alt="Machines" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} /> Machines ({ProductionCalculator.machines?.length || 0})
                        </h3>

                        <input
                            type="text"
                            placeholder="Search machines..."
                            onChange={(e) => {
                                const search = e.target.value.toLowerCase();
                                setSelectedMachines(
                                    search
                                        ? ProductionCalculator.machines.filter(m =>
                                            m.name.toLowerCase().includes(search)
                                        )
                                        : []
                                );
                            }}
                            style={{
                                width: '100%',
                                marginBottom: '1rem',
                                padding: '12px',
                                background: '#1a1a1a',
                                color: 'white',
                                border: '2px solid #4a90e2',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        />

                        {/* Layer selector */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#aaa' }}>
                                Connection Layer:
                            </label>
                            <select
                                value={selectedLayer}
                                onChange={(e) => setSelectedLayer(Number(e.target.value))}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: '#1a1a1a',
                                    color: 'white',
                                    border: '2px solid #4a90e2',
                                    borderRadius: '8px',
                                    fontSize: '1rem'
                                }}
                            >
                                {LAYERS.map((layer) => (
                                    <option key={layer.height} value={layer.height}>
                                        {layer.name} ({layer.height})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Connection mode */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#aaa' }}>
                                Connection Mode:
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setConnectionMode('auto')}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        background: connectionMode === 'auto' ? '#4a90e2' : '#333',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    Auto
                                </button>
                                <button
                                    onClick={() => {
                                        setConnectionMode('manual');
                                        setConnectingFrom(null);
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        background: connectionMode === 'manual' ? '#4a90e2' : '#333',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    Manual
                                </button>
                            </div>
                        </div>

                        {connectingFrom && (
                            <div style={{
                                padding: '12px',
                                background: '#4a90e2',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                textAlign: 'center',
                                fontWeight: '600'
                            }}>
                                Connecting from port {connectingFrom.portId}...
                                <button
                                    onClick={() => setConnectingFrom(null)}
                                    style={{
                                        marginLeft: '8px',
                                        padding: '4px 8px',
                                        background: '#ff6b6b',
                                        border: 'none',
                                        borderRadius: '4px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        {/* Machine list */}
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            {selectedMachines.length > 0 ? selectedMachines.slice(0, 30).map((machine) => {
                                const machineImage = getMachineImage(machine);
                                return (
                                    <li
                                        key={machine.id}
                                        onClick={() => onMachineClick(machine)}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            color: 'white',
                                            backgroundColor: '#1a1a1a',
                                            border: '2px solid #333',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#2a4a6a';
                                            e.currentTarget.style.borderColor = '#4a90e2';
                                            e.currentTarget.style.transform = 'translateX(4px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                                            e.currentTarget.style.borderColor = '#333';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        {machineImage && (
                                            <img
                                                src={machineImage}
                                                alt={machine.name}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontWeight: '600',
                                                fontSize: '0.95rem',
                                                marginBottom: '2px'
                                            }}>
                                                {machine.name}
                                            </div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: '#888'
                                            }}>
                                                {machine.layout.width}×{machine.layout.height} tiles
                                            </div>
                                        </div>
                                    </li>
                                );
                            }) : (
                                <li style={{
                                    color: '#666',
                                    textAlign: 'center',
                                    padding: '3rem 1rem',
                                    fontSize: '0.9rem',
                                    fontStyle: 'italic',
                                    lineHeight: '1.6'
                                }}>
                                    {selectedMachines.length === 0 && ProductionCalculator.machines?.length > 0
                                        ? 'Start typing to search for machines...'
                                        : 'No machines found'}
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Canvas */}
                    <div style={{ flex: 1, backgroundColor: '#1a1a1a', position: 'relative' }}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            fitView
                            snapToGrid={snapToGridEnabled}
                            snapGrid={[20 * globalScale * GRID_SNAP_SIZE, 20 * globalScale * GRID_SNAP_SIZE]}
                            style={{ backgroundColor: '#1a1a1a' }}
                            // ↓ ADD THESE NEW PROPS:
                            connectionLineType="step"
                            connectionLineStyle={{
                                stroke: LAYERS[selectedLayer].color,
                                strokeWidth: 3,
                                strokeDasharray: '5,5',
                                animation: 'dash 0.5s linear infinite'
                            }}
                            defaultEdgeOptions={{
                                type: 'connection',
                                animated: true
                            }}
                        >
                        </ReactFlow>

                        {/* Layer Filter */}
                        <LayerFilter
                            layers={LAYERS}
                            visibleLayers={visibleLayers}
                            onToggleLayer={handleToggleLayer}
                            onToggleAllLayers={handleToggleAllLayers}
                            connectionsByLayer={connectionsByLayer}
                            position="top-right"
                            globalScale={globalScale}
                        />

                        {/* Connection Warning */}
                        {allWarnings.length > 0 && (
                            <ConnectionWarning
                                warnings={allWarnings.flatMap(w => w.warnings)}
                                onDismiss={() => { }}
                                position="top-right"
                            />
                        )}

                        {/* Legend */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '20px',
                            background: 'rgba(42, 42, 42, 0.95)',
                            border: '2px solid #4a90e2',
                            borderRadius: '12px',
                            padding: '16px',
                            maxWidth: '280px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                            zIndex: 10
                        }}>
                            <div style={{ fontWeight: '700', marginBottom: '12px', color: '#4a90e2', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={getGeneralIcon('InfoBubble')} alt="Info" style={{ width: '20px', height: '20px' }} />
                                Port Types
                            </div>
                            {Object.entries(PORT_TYPES).map(([key, config]) => (
                                <div key={key} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '8px',
                                    padding: '6px',
                                    borderRadius: '6px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                                }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        background: config.color,
                                        border: '2px solid #fff',
                                        borderRadius: config.shape === 'circle' ? '50%' :
                                            config.shape === 'square' ? '3px' :
                                                config.shape === 'ellipse' ? '50% / 35%' : '3px',
                                        clipPath: config.shape === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                                            config.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none'
                                    }} />
                                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>
                                        {config.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ReactFlowProvider>

            {/* GLOBAL RECIPE MODAL */}
            <RecipeModal
                isOpen={recipeModalState.open}
                onClose={() => setRecipeModalState({ open: false, recipes: [], currentRecipeId: null, nodeId: null, context: null })}
                recipes={recipeModalState.recipes}
                currentRecipeId={recipeModalState.currentRecipeId}
                onSelectRecipe={handleRecipeSelection}
            />

            {/* PRIORITY MODAL */}
            <PriorityModal
                isOpen={priorityModalState.open}
                onClose={() => setPriorityModalState({ open: false, sourceNodeId: null, sourcePortId: null, connections: [], totalProduction: 0, product: null })}
                sourceNodeId={priorityModalState.sourceNodeId}
                sourcePortId={priorityModalState.sourcePortId}
                connections={priorityModalState.connections}
                totalProduction={priorityModalState.totalProduction}
                product={priorityModalState.product}
                onUpdate={handlePriorityUpdate}
            />

            {/* PORT ACTION MODAL */}
            {portActionModal.open && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '2rem'
                    }}
                    onClick={() => setPortActionModal({ open: false, nodeId: null, port: null, product: null, type: null })}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#2a2a2a',
                            borderRadius: '12px',
                            padding: '2rem',
                            maxWidth: '500px',
                            width: '100%',
                            border: '2px solid #4a90e2',
                            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)'
                        }}
                    >
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
                            {portActionModal.type === 'input' ? 'Add Input Source' : 'Add Output Destination'}
                        </h3>
                        <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                            Product: {portActionModal.product !== 'AllCategory' ? portActionModal.product?.name : 'Any'}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button
                                onClick={() => handlePortActionSelect('machine')}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: '#1a1a1a',
                                    border: '2px solid #444',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#252525';
                                    e.currentTarget.style.borderColor = '#5aa0f2';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                                    e.currentTarget.style.borderColor = '#444';
                                }}
                            >
                                {machinesIcon && (
                                    <img src={machinesIcon} alt="Machine" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                                )}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '2px' }}>
                                        From Machine...
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                        Select a recipe to produce/consume this product
                                    </div>
                                </div>
                            </button>

                            <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.5rem', fontWeight: '600' }}>
                                From Storage:
                            </div>

                            {[1, 2, 3, 4].map(tier => (
                                <button
                                    key={tier}
                                    onClick={() => handlePortActionSelect(`storage-${tier}`)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        backgroundColor: '#1a1a1a',
                                        border: '2px solid #444',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#252525';
                                        e.currentTarget.style.borderColor = '#5aa0f2';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                        e.currentTarget.style.borderColor = '#444';
                                    }}
                                >
                                    <div style={{ fontSize: '1.2rem' }}>
                                        {portActionModal.type === 'input' ? '∞' : '🗑️'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>
                                            Tier {tier} Storage
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                            {portActionModal.type === 'input' ? 'Infinite source' : 'Infinite sink'}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Visualizer;