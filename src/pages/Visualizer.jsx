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
    MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { getMachineImage, getProductIcon, getGeneralIcon } from '../utils/AssetHelper';

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

// ═══════════════════════════════════════════════════════════════════
// MACHINE NODE COMPONENT
// ═══════════════════════════════════════════════════════════════════

const MachineNode = ({ data, id }) => {
    const {
        label,
        parsedPorts,
        rotation = 0,
        machineImage,
        layoutWidth,
        layoutHeight,
        machine,
        selectedRecipe,
        globalScale = DEFAULT_SCALE,
        onRotate,
        onDelete,
        onRecipeChange,
        onPortConnect
    } = data;

    const [isHovered, setIsHovered] = useState(false);
    const [showRecipeMenu, setShowRecipeMenu] = useState(false);

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

    // Get game icons
    const workerIcon = getGeneralIcon('Worker');
    const electricityIcon = getGeneralIcon('Electricity');
    const computingIcon = getGeneralIcon('Computing');

    // Get maintenance icon (Product_Maintenance1, Product_Maintenance2, or Product_Maintenance3)
    const maintenanceIcon = costs.maintenanceProductId ?
        getProductIcon(ProductionCalculator.getProduct(costs.maintenanceProductId)) : null;

    // AllCategory fallback icon
    const allCategoryIcon = getGeneralIcon('AllCategory');

    // Calculate card dimensions
    const cardWidth = layoutWidth * 20 * globalScale;
    const cardHeight = layoutHeight * 20 * globalScale;

    // Percentage-based sizing
    const nameFontSize = `${Math.max(10, Math.min(cardWidth * 0.04, 28))}px`;
    const sizeIndicatorFontSize = `${Math.max(8, Math.min(cardWidth * 0.025, 14))}px`;
    const costBadgeWidth = Math.max(60, cardWidth * 0.18); // Min 60px, ~18% of width
    const costBadgeHeight = Math.max(24, cardHeight * 0.08); // Min 24px, ~8% of height
    const costFontSize = `${Math.max(9, Math.min(cardWidth * 0.022, 12))}px`;
    const costIconSize = Math.max(12, Math.min(cardWidth * 0.03, 16));
    const recipeFontSize = `${Math.max(10, Math.min(cardWidth * 0.028, 14))}px`;

    const getPortStyle = (port) => {
        const config = PORT_TYPES[port.inferredType] || PORT_TYPES.countable;
        const baseSize = 18 * globalScale;

        const base = {
            width: baseSize,
            height: baseSize,
            border: `${2 * globalScale}px solid #fff`,
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

    // ✅ SMART PORT PRODUCT MAPPING
    const getPortProduct = (port) => {
        if (!recipeData) {
            return 'AllCategory';
        }

        // Step 1: Try exact match (single-port recipes)
        // Check inputs
        const exactInput = recipeData.inputs?.find(inp =>
            inp.ports?.length === 1 && inp.ports[0].id === port.id
        );
        if (exactInput) {
            return ProductionCalculator.getProduct(exactInput.productId);
        }

        // Check outputs
        const exactOutput = recipeData.outputs?.find(out =>
            out.ports?.length === 1 && out.ports[0].id === port.id
        );
        if (exactOutput) {
            return ProductionCalculator.getProduct(exactOutput.productId);
        }

        // Step 2: Wildcard distribution (multiple ports per product)
        // Group ports by type
        const inputPorts = parsedPorts.filter(p => p.type === 'input').sort((a, b) => a.id.localeCompare(b.id));
        const outputPorts = parsedPorts.filter(p => p.type === 'output').sort((a, b) => a.id.localeCompare(b.id));

        if (port.type === 'input') {
            // Find wildcard inputs (those with multiple ports)
            const wildcardInputs = recipeData.inputs?.filter(inp => inp.ports?.length > 1) || [];

            if (wildcardInputs.length > 0) {
                // Distribute: assign each input to a different port by index
                const portIndex = inputPorts.findIndex(p => p.id === port.id);

                if (portIndex >= 0 && portIndex < wildcardInputs.length) {
                    return ProductionCalculator.getProduct(wildcardInputs[portIndex].productId);
                }
            }
        } else if (port.type === 'output') {
            // Find wildcard outputs (those with multiple ports)
            const wildcardOutputs = recipeData.outputs?.filter(out => out.ports?.length > 1) || [];

            if (wildcardOutputs.length > 0) {
                // Distribute: assign each output to a different port by index
                const portIndex = outputPorts.findIndex(p => p.id === port.id);

                if (portIndex >= 0 && portIndex < wildcardOutputs.length) {
                    return ProductionCalculator.getProduct(wildcardOutputs[portIndex].productId);
                }
            }
        }

        return 'AllCategory';
    };

    const portProductIconSize = 20 * globalScale;

    return (
        <div
            style={{ width: '100%', height: '100%', position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Rotating machine container */}
            <div style={{
                width: '100%',
                height: '100%',
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center center',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#2a2a2a',
                border: `${3 * globalScale}px solid #4a90e2`,
                borderRadius: `${12 * globalScale}px`,
                boxShadow: isHovered
                    ? '0 12px 32px rgba(74, 144, 226, 0.5)'
                    : '0 6px 16px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s',
                overflow: 'visible'
            }}>
                {/* Machine Image (FIXED SIZE, just centered) */}
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

                {/* Ports (SCALE with grid) */}
                {parsedPorts.map((port) => {
                    const productOrMarker = getPortProduct(port);
                    let productIcon = null;

                    if (productOrMarker === 'AllCategory') {
                        productIcon = allCategoryIcon;
                    } else {
                        productIcon = getProductIcon(productOrMarker);
                    }

                    const portScale = 20 * globalScale;

                    return (
                        <div
                            key={port.id}
                            style={{
                                position: 'absolute',
                                left: `${port.pos.x * portScale}px`,
                                top: `${port.pos.y * portScale}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title={`${port.id} (${port.inferredType}) - ${productOrMarker === 'AllCategory' ? 'Any' : productOrMarker?.name || 'Unknown'}`}
                        >
                            <Handle
                                type={port.type}
                                position={Position.Left}
                                id={port.id}
                                style={getPortStyle(port)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onPortConnect?.(id, port);
                                }}
                            />
                            {/* Port product icons SCALE */}
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
            </div>

            {/* Static overlays */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none'
            }}>
                {/* Machine name (SCALES - max 60% width, centered top) */}
                <div style={{
                    position: 'absolute',
                    top: `${8 * globalScale}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: nameFontSize,
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
                    textAlign: 'center',
                    maxWidth: '60%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: `${4 * globalScale}px ${8 * globalScale}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: `${6 * globalScale}px`,
                    border: '1px solid rgba(74, 144, 226, 0.5)'
                }}>
                    {label}
                </div>

                {/* Recipe indicator (50-60% width, centered bottom) */}
                {recipeData && (
                    <div style={{
                        position: 'absolute',
                        bottom: `${8 * globalScale}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: `${4 * globalScale}px ${8 * globalScale}px`,
                        backgroundColor: 'rgba(80, 200, 120, 0.95)',
                        borderRadius: `${4 * globalScale}px`,
                        fontSize: recipeFontSize,
                        fontWeight: '600',
                        color: 'white',
                        whiteSpace: 'nowrap',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        maxWidth: '60%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        📋 {recipeData.name}
                    </div>
                )}

                {/* Size indicator (SCALES - max 15% width, top right) */}
                <div style={{
                    position: 'absolute',
                    top: `${8 * globalScale}px`,
                    right: `${8 * globalScale}px`,
                    fontSize: sizeIndicatorFontSize,
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: '600',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: `${3 * globalScale}px ${6 * globalScale}px`,
                    borderRadius: `${4 * globalScale}px`,
                    maxWidth: '15%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {layoutWidth}×{layoutHeight}
                </div>

                {/* Production rate (bottom right) */}
                {production && (
                    <div style={{
                        position: 'absolute',
                        bottom: `${8 * globalScale}px`,
                        right: `${8 * globalScale}px`,
                        fontSize: recipeFontSize,
                        color: '#fff',
                        fontWeight: '600',
                        backgroundColor: 'rgba(80, 200, 120, 0.95)',
                        padding: `${4 * globalScale}px ${8 * globalScale}px`,
                        borderRadius: `${4 * globalScale}px`,
                        whiteSpace: 'nowrap',
                        maxWidth: '30%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }} title={`${production.cyclesPerMinute.toFixed(1)} cycles/min`}>
                        ⚙️ {production.cyclesPerMinute.toFixed(1)}/min
                    </div>
                )}
            </div>

            {/* ✅ HOVER CONTROLS ABOVE CARD */}
            {isHovered && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: `${8 * globalScale}px`,
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
                            transition: 'all 0.2s'
                        }}
                    >
                        🔄
                    </button>

                    {machine.recipes?.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowRecipeMenu(!showRecipeMenu);
                            }}
                            style={{
                                padding: `${10 * globalScale}px ${14 * globalScale}px`,
                                background: 'rgba(80, 200, 120, 0.95)',
                                color: 'white',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: `${8 * globalScale}px`,
                                fontSize: `${14 * globalScale}px`,
                                cursor: 'pointer',
                                fontWeight: '600',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                                transition: 'all 0.2s'
                            }}
                        >
                            📋
                        </button>
                    )}

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
                            transition: 'all 0.2s'
                        }}
                    >
                        🗑️
                    </button>
                </div>
            )}

            {/* Recipe menu (appears below when recipe button clicked) */}
            {showRecipeMenu && machine.recipes?.length > 1 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: `${8 * globalScale}px`,
                    background: '#2a2a2a',
                    border: '2px solid #4a90e2',
                    borderRadius: `${8 * globalScale}px`,
                    padding: `${8 * globalScale}px`,
                    zIndex: 300,
                    pointerEvents: 'auto',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    minWidth: '200px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
                }}>
                    {machine.recipes.map(recipeId => {
                        const recipe = ProductionCalculator.recipes?.find(r => r.id === recipeId);
                        if (!recipe) return null;

                        return (
                            <div
                                key={recipeId}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRecipeChange?.(recipeId);
                                    setShowRecipeMenu(false);
                                }}
                                style={{
                                    padding: `${8 * globalScale}px ${12 * globalScale}px`,
                                    cursor: 'pointer',
                                    borderRadius: `${4 * globalScale}px`,
                                    backgroundColor: selectedRecipe === recipeId ? '#4a90e2' : 'transparent',
                                    color: 'white',
                                    fontSize: recipeFontSize,
                                    transition: 'all 0.2s',
                                    marginBottom: `${4 * globalScale}px`
                                }}
                            >
                                {recipe.name}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ✅ COST BADGES BELOW CARD (HORIZONTAL) */}
            <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: `${6 * globalScale}px`,
                marginTop: `${8 * globalScale}px`,
                pointerEvents: 'none',
                flexWrap: 'wrap'
            }}>
                {costs.workers > 0 && (
                    <div style={{
                        minWidth: `${costBadgeWidth}px`,
                        height: `${costBadgeHeight}px`,
                        padding: `${2 * globalScale}px ${6 * globalScale}px`,
                        backgroundColor: 'rgba(255, 193, 7, 0.95)',
                        borderRadius: `${4 * globalScale}px`,
                        fontSize: costFontSize,
                        fontWeight: '600',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: `${4 * globalScale}px`,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                    }}>
                        {workerIcon && (
                            <img src={workerIcon} alt="Workers" style={{ width: `${costIconSize}px`, height: `${costIconSize}px`, flexShrink: 0 }} />
                        )}
                        <span style={{ whiteSpace: 'nowrap' }}>
                            {costs.workers}
                        </span>
                    </div>
                )}
                {costs.electricity > 0 && (
                    <div style={{
                        minWidth: `${costBadgeWidth}px`,
                        height: `${costBadgeHeight}px`,
                        padding: `${2 * globalScale}px ${6 * globalScale}px`,
                        backgroundColor: 'rgba(255, 235, 59, 0.95)',
                        borderRadius: `${4 * globalScale}px`,
                        fontSize: costFontSize,
                        fontWeight: '600',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: `${4 * globalScale}px`,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                    }}>
                        {electricityIcon && (
                            <img src={electricityIcon} alt="Electricity" style={{ width: `${costIconSize}px`, height: `${costIconSize}px`, flexShrink: 0 }} />
                        )}
                        <span style={{ whiteSpace: 'nowrap' }}>
                            {costs.electricity}kW
                        </span>
                    </div>
                )}
                {costs.computing > 0 && (
                    <div style={{
                        minWidth: `${costBadgeWidth}px`,
                        height: `${costBadgeHeight}px`,
                        padding: `${2 * globalScale}px ${6 * globalScale}px`,
                        backgroundColor: 'rgba(156, 39, 176, 0.95)',
                        borderRadius: `${4 * globalScale}px`,
                        fontSize: costFontSize,
                        fontWeight: '600',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: `${4 * globalScale}px`,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                    }}>
                        {computingIcon && (
                            <img src={computingIcon} alt="Computing" style={{ width: `${costIconSize}px`, height: `${costIconSize}px`, flexShrink: 0 }} />
                        )}
                        <span style={{ whiteSpace: 'nowrap' }}>
                            {costs.computing}TF
                        </span>
                    </div>
                )}
                {costs.maintenance > 0 && (
                    <div style={{
                        minWidth: `${costBadgeWidth}px`,
                        height: `${costBadgeHeight}px`,
                        padding: `${2 * globalScale}px ${6 * globalScale}px`,
                        backgroundColor: 'rgba(244, 67, 54, 0.95)',
                        borderRadius: `${4 * globalScale}px`,
                        fontSize: costFontSize,
                        fontWeight: '600',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: `${4 * globalScale}px`,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                    }}>
                        {maintenanceIcon && (
                            <img src={maintenanceIcon} alt="Maintenance" style={{ width: `${costIconSize}px`, height: `${costIconSize}px`, flexShrink: 0 }} />
                        )}
                        <span style={{ whiteSpace: 'nowrap' }}>
                            {costs.maintenance.toFixed(1)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

const nodeTypes = {
    machineNode: MachineNode
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

    // Load icons
    const workerIcon = getGeneralIcon('Worker');
    const electricityIcon = getGeneralIcon('Electricity');
    const computingIcon = getGeneralIcon('Computing');

    // Load game data
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

    // ✅ UPDATE NODES WHEN SCALE CHANGES
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.type === 'machineNode') {
                    const basePixelPerGrid = 20;
                    const scaledPixelPerGrid = basePixelPerGrid * globalScale;
                    const width = node.data.layoutWidth * scaledPixelPerGrid;
                    const height = node.data.layoutHeight * scaledPixelPerGrid;

                    return {
                        ...node,
                        data: { ...node.data, globalScale },
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
            eds.map((edge) => ({
                ...edge,
                style: {
                    ...edge.style,
                    strokeWidth: 4 * globalScale
                },
                markerEnd: {
                    ...edge.markerEnd,
                    width: 20 * globalScale,
                    height: 20 * globalScale
                }
            }))
        );
    }, [globalScale, setNodes, setEdges]);

    // Calculate total costs with maintenance breakdown
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
                onRotate: null,
                onDelete: null,
                onRecipeChange: null,
                onPortConnect: null
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
            setNodes((nds) => nds.filter(node => node.id !== nodeId));
            setEdges((eds) => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
            saveHistory();
        };

        newNode.data.onRecipeChange = (recipeId) => {
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
            saveHistory();
        };

        newNode.data.onPortConnect = (nodeId, port) => {
            handlePortClick(nodeId, port);
        };

        setNodes((nds) => nds.concat(newNode));
        saveHistory();
    }, [setNodes, globalScale, snapToGridEnabled, saveHistory]);

    const handlePortClick = useCallback((nodeId, port) => {
        if (connectionMode === 'manual') {
            if (!connectingFrom) {
                setConnectingFrom({ nodeId, portId: port.id, portType: port.type, inferredType: port.inferredType });
            } else {
                const sourceNode = nodes.find(n => n.id === connectingFrom.nodeId);
                const targetNode = nodes.find(n => n.id === nodeId);

                if (!sourceNode || !targetNode) {
                    setConnectingFrom(null);
                    return;
                }

                const sourcePort = sourceNode.data.parsedPorts.find(p => p.id === connectingFrom.portId);
                const targetPort = port;

                const isValidDirection = (sourcePort.type === 'output' && targetPort.type === 'input') ||
                    (sourcePort.type === 'input' && targetPort.type === 'output');
                const isCompatibleType = sourcePort.inferredType === targetPort.inferredType;

                if (isValidDirection && isCompatibleType) {
                    createEdge(
                        sourcePort.type === 'output' ? connectingFrom.nodeId : nodeId,
                        sourcePort.type === 'output' ? connectingFrom.portId : port.id,
                        sourcePort.type === 'output' ? nodeId : connectingFrom.nodeId,
                        sourcePort.type === 'output' ? port.id : connectingFrom.portId,
                        sourcePort.inferredType
                    );
                }

                setConnectingFrom(null);
            }
        }
    }, [connectionMode, connectingFrom, nodes]);

    const createEdge = useCallback((sourceId, sourceHandle, targetId, targetHandle, portType) => {
        const newEdge = {
            id: `e${sourceId}-${sourceHandle}-${targetId}-${targetHandle}`,
            source: sourceId,
            sourceHandle,
            target: targetId,
            targetHandle,
            type: 'smoothstep',
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
                portType,
                flow: 0
            },
            label: `Layer ${selectedLayer}`,
            zIndex: LAYERS[selectedLayer].zIndex
        };

        setEdges((eds) => [...eds, newEdge]);
        saveHistory();
    }, [selectedLayer, globalScale, setEdges, saveHistory]);

    const exportBlueprint = useCallback(() => {
        const blueprint = {
            version: '1.0.0',
            name: 'My Factory Layout',
            scale: globalScale,
            nodes: nodes.map(node => ({
                id: node.id,
                machineId: node.data.machineId,
                position: node.position,
                rotation: node.data.rotation,
                recipe: node.data.selectedRecipe
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
                            🏭 Factory Blueprint Designer
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
                            📐 Snap: {snapToGridEnabled ? 'ON' : 'OFF'}
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
                                ↶
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
                                ↷
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
                            💾 Export
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
                            📁 Import
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
                            🏭 Machines ({ProductionCalculator.machines?.length || 0})
                        </h3>

                        <input
                            type="text"
                            placeholder="🔍 Search machines..."
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
                                        ? '💡 Start typing to search for machines...'
                                        : '❌ No machines found'}
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
                            nodeTypes={nodeTypes}
                            fitView
                            snapToGrid={snapToGridEnabled}
                            snapGrid={[20 * globalScale * GRID_SNAP_SIZE, 20 * globalScale * GRID_SNAP_SIZE]}
                            style={{ backgroundColor: '#1a1a1a' }}
                        >
                            <Background
                                color="#444"
                                gap={20 * globalScale}
                                size={1}
                            />
                            <Controls
                                style={{
                                    background: '#2a2a2a',
                                    border: '2px solid #4a90e2',
                                    borderRadius: '8px'
                                }}
                            />
                            <MiniMap
                                nodeColor={() => '#2a4a6a'}
                                maskColor="rgba(26, 26, 26, 0.8)"
                                style={{
                                    background: '#2a2a2a',
                                    border: '2px solid #4a90e2',
                                    borderRadius: '8px'
                                }}
                            />
                        </ReactFlow>
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
                            <div style={{ fontWeight: '700', marginBottom: '12px', color: '#4a90e2', fontSize: '1.1rem' }}>
                                🎨 Port Types
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
        </div>
    );
};

export default Visualizer;