import { useCallback, useState, useEffect } from 'react';
import { ReactFlow, Background, Controls, MiniMap, ReactFlowProvider, useNodesState, useEdgesState, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { getMachineImage } from '../utils/AssetHelper';

const nodeTypes = {};

// Parser for layoutString: Scan 3-char tokens for dir (PORT_DIRECTIONS), name (A-Z), shape (# ~ @ `)
const parseLayoutPorts = (layoutString, ports) => {
    const lines = layoutString.split('\n');
    const portMap = new Map(ports.map(p => [p.id, { ...p, inferredType: 'unknown' }]));
    const directionChars = ['<', '>', '^', 'v', '+'];

    lines.forEach((line) => {
        for (let col = 0; col < line.length; col += 3) {
            const token = line.substring(col, col + 3);
            if (token.length !== 3) continue;

            let dir = null;
            let name = null;
            let shape = null;

            for (let i = 0; i < 3; i++) {
                const char = token[i];
                if (directionChars.includes(char)) {
                    dir = char;
                } else if (char >= 'A' && char <= 'Z') {
                    name = char;
                } else {
                    shape = char;
                }
            }

            if (dir && name && shape) {
                const port = portMap.get(name);
                if (port) {
                    let type = 'unknown';
                    switch (shape) {
                        case '#':
                            type = 'countable';
                            break;
                        case '~':
                            type = 'loose';
                            break;
                        case '@':
                            type = 'fluid';
                            break;
                        case '`':
                            type = 'molten';
                            break;
                        default:
                            type = 'virtual';
                    }
                    portMap.set(name, { ...port, inferredType: type });
                }
            }
        }
    });

    return Array.from(portMap.values());
};

// Rotate port position based on machine rotation
const rotatePortPosition = (x, y, rotation, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Translate to origin
    let relX = x - centerX;
    let relY = y - centerY;

    // Rotate
    const radians = (rotation * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const rotatedX = relX * cos - relY * sin;
    const rotatedY = relX * sin + relY * cos;

    // Translate back
    return {
        x: rotatedX + centerX,
        y: rotatedY + centerY
    };
};

const Visualizer = () => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);

    // Load game data on mount and when mod settings change
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

    // Shape/color map by type - premium styling
    const getPortStyle = useCallback((portType, inferredType = 'unknown', isInput) => {
        const base = {
            width: 16,
            height: 16,
            border: '2px solid #fff',
            position: 'absolute',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
            cursor: 'pointer'
        };

        const hoverStyle = {
            transform: 'scale(1.2)',
            boxShadow: '0 4px 12px rgba(74, 144, 226, 0.6)'
        };

        switch (inferredType) {
            case 'countable':
                return {
                    ...base,
                    background: isInput ? '#4a90e2' : '#5aa0f2',
                    borderRadius: '2px'
                };
            case 'fluid':
                return {
                    ...base,
                    background: isInput ? '#50C878' : '#60D888',
                    borderRadius: '50%'
                };
            case 'loose':
                return {
                    ...base,
                    background: isInput ? '#FFD700' : '#FFE44D',
                    borderRadius: '50% / 30%'
                };
            case 'virtual':
                return {
                    ...base,
                    background: isInput ? '#9966CC' : '#A976DC',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                };
            case 'molten':
                return {
                    ...base,
                    background: isInput ? '#FF8C00' : '#FF9C10',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    transform: 'rotate(45deg)'
                };
            default:
                return {
                    ...base,
                    background: isInput ? '#4a90e2' : '#50C878',
                    borderRadius: '50%'
                };
        }
    }, []);

    const onAddNode = useCallback((machine) => {
        const parsedPorts = parseLayoutPorts(machine.layout.layoutString, machine.layout.ports);
        const machineImage = getMachineImage(machine);

        const newNode = {
            id: `${machine.id}-${Date.now()}`, // Unique ID per instance
            type: 'machineNode',
            data: {
                label: machine.name,
                parsedPorts,
                rotation: 0,
                machineId: machine.id,
                machineImage,
                layoutWidth: machine.layout.width,
                layoutHeight: machine.layout.height
            },
            position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
            style: {
                width: Math.max(120, machine.layout.width * 20),
                height: Math.max(80, machine.layout.height * 20),
                backgroundColor: 'transparent',
                border: 'none',
                position: 'relative'
            }
        };

        const MachineNode = ({ data, id }) => {
            const { label, parsedPorts, rotation = 0, machineImage, layoutWidth, layoutHeight } = data;
            const scale = 20;
            const [isHovered, setIsHovered] = useState(false);

            const handleRotate = (e) => {
                e.stopPropagation();
                const newRotation = (rotation + 90) % 360;
                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === id) {
                            const shouldSwap = (newRotation === 90 || newRotation === 270);
                            const currentWidth = node.style?.width || 120;
                            const currentHeight = node.style?.height || 80;

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
            };

            const handleDelete = (e) => {
                e.stopPropagation();
                setNodes((nds) => nds.filter(node => node.id !== id));
            };

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
                        border: '2px solid #4a90e2',
                        borderRadius: '8px',
                        boxShadow: isHovered
                            ? '0 8px 24px rgba(74, 144, 226, 0.4)'
                            : '0 4px 12px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s',
                        overflow: 'hidden'
                    }}>
                        {/* Machine Image (rotates with container) */}
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
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={machineImage}
                                    alt={label}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        filter: 'brightness(1.2)'
                                    }}
                                />
                            </div>
                        )}

                        {/* Ports (rotate with container) */}
                        {parsedPorts.map((port) => {
                            const isInput = port.type === 'input';
                            const style = getPortStyle(port.type, port.inferredType, isInput);

                            return (
                                <Handle
                                    key={port.id}
                                    type={port.type}
                                    position="left"
                                    style={{
                                        left: `${port.pos.x * scale}px`,
                                        top: `${port.pos.y * scale}px`,
                                        ...style
                                    }}
                                    id={port.id}
                                    title={`${port.id} (${port.inferredType})`}
                                />
                            );
                        })}
                    </div>

                    {/* Static text overlay (does NOT rotate) */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        zIndex: 10,
                        pointerEvents: 'none',
                        textAlign: 'center',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                        maxWidth: '90%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        padding: '4px 8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '4px'
                    }}>
                        {label}
                    </div>

                    {/* Centered control buttons (visible on hover) */}
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '8px',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.2s',
                        zIndex: 20
                    }}>
                        <button
                            onClick={handleRotate}
                            style={{
                                padding: '8px 12px',
                                background: 'rgba(74, 144, 226, 0.95)',
                                color: 'white',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '6px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(90, 160, 242, 0.95)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(74, 144, 226, 0.95)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            🔄 Rotate
                        </button>

                        <button
                            onClick={handleDelete}
                            style={{
                                padding: '8px 12px',
                                background: 'rgba(255, 107, 107, 0.95)',
                                color: 'white',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '6px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 127, 127, 0.95)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.95)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            🗑️ Delete
                        </button>
                    </div>

                    {/* Size indicator */}
                    <div style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        fontSize: '0.7rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: '600',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        zIndex: 15
                    }}>
                        {layoutWidth}×{layoutHeight}
                    </div>
                </div>
            );
        };

        setNodes((nds) => nds.concat(newNode));
        nodeTypes.machineNode = MachineNode;
    }, [setNodes, getPortStyle]);

    const onMachineClick = useCallback((machine) => {
        onAddNode(machine);
    }, [onAddNode]);

    // Show loading screen if data not loaded yet
    if (!dataLoaded) {
        return (
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading visualizer data...</h2>
                <p style={{ color: '#888', fontSize: '1.1rem' }}>
                    {settings.enableModdedContent && settings.enabledMods?.length > 0
                        ? `Loading base game + ${settings.enabledMods.length} mod(s)...`
                        : 'Loading base game data...'}
                </p>
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
            {/* Premium Header */}
            <div style={{
                padding: '1.5rem 2rem',
                backgroundColor: '#2a2a2a',
                borderBottom: '2px solid #4a90e2',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #4a90e2 0%, #5aa0f2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Factory Visualizer
                </h2>
                <p style={{
                    color: '#aaa',
                    fontSize: '1rem',
                    margin: 0
                }}>
                    Design and visualize your factory layouts • {ProductionCalculator.machines.length} machines available
                </p>
            </div>

            <ReactFlowProvider>
                <style>{`
                    .react-flow__controls { 
                        background: #2a2a2a !important; 
                        border: 2px solid #4a90e2 !important; 
                        border-radius: 8px !important;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
                    }
                    .react-flow__controls-button { 
                        background: #333 !important; 
                        color: white !important; 
                        border-bottom: 1px solid #444 !important;
                        transition: all 0.2s !important;
                    }
                    .react-flow__controls-button:hover { 
                        background: #4a90e2 !important; 
                    }
                    .react-flow__minimap { 
                        background: #2a2a2a !important; 
                        border: 2px solid #4a90e2 !important;
                        border-radius: 8px !important;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
                    }
                    .react-flow__minimap-mask { 
                        fill: #1a1a1a !important; 
                    }
                    .react-flow__minimap-node { 
                        stroke: #4a90e2 !important; 
                        fill: #2a4a6a !important; 
                    }
                    .react-flow__node {
                        cursor: grab;
                    }
                    .react-flow__node:active {
                        cursor: grabbing;
                    }
                `}</style>

                <div style={{
                    flex: 1,
                    display: 'flex',
                    backgroundColor: '#1a1a1a',
                    overflow: 'hidden'
                }}>
                    {/* Premium Sidebar */}
                    <div style={{
                        width: '320px',
                        background: '#2a2a2a',
                        color: 'white',
                        padding: '1.5rem',
                        overflowY: 'auto',
                        borderRight: '2px solid #4a90e2',
                        boxShadow: '4px 0 12px rgba(0, 0, 0, 0.3)'
                    }}>
                        <h3 style={{
                            color: 'white',
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            🏭 Machines
                            <span style={{
                                fontSize: '0.9rem',
                                color: '#4a90e2',
                                fontWeight: '600',
                                marginLeft: 'auto'
                            }}>
                                {ProductionCalculator.machines.length}
                            </span>
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
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                                outline: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#5aa0f2';
                                e.target.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#4a90e2';
                                e.target.style.boxShadow = 'none';
                            }}
                        />

                        <div style={{
                            fontSize: '0.85rem',
                            color: '#888',
                            marginBottom: '1rem',
                            padding: '12px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            border: '1px solid #333'
                        }}>
                            💡 <strong style={{ color: '#4a90e2' }}>Tip:</strong> Click a machine to add it to the canvas. Hover over placed machines to rotate or delete them.
                        </div>

                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            {selectedMachines.length > 0 ? selectedMachines.slice(0, 20).map((machine) => {
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
                                                {machine.layout.width}×{machine.layout.height}
                                            </div>
                                        </div>
                                    </li>
                                );
                            }) : (
                                <li style={{
                                    color: '#666',
                                    textAlign: 'center',
                                    padding: '2rem',
                                    fontSize: '0.9rem',
                                    fontStyle: 'italic'
                                }}>
                                    {selectedMachines.length === 0 && ProductionCalculator.machines.length > 0
                                        ? 'Start typing to search...'
                                        : 'No matches found'}
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
                            style={{ backgroundColor: '#1a1a1a' }}
                        >
                            <Background
                                color="#333"
                                gap={20}
                                size={1}
                            />
                            <Controls />
                            <MiniMap
                                nodeColor={(node) => '#2a4a6a'}
                                maskColor="rgba(26, 26, 26, 0.8)"
                            />
                        </ReactFlow>
                    </div>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default Visualizer;