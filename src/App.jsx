import { useCallback, useState } from 'react';
import { ReactFlow, Background, Controls, MiniMap, ReactFlowProvider, useNodesState, useEdgesState, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GameData from './GameData';

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

function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);

    // Shape/color map by type
    const getPortStyle = (portType, inferredType = 'unknown') => {
        const base = {
            width: 12, height: 12,
            border: '1px solid #fff',
            position: 'absolute'
        };
        switch (inferredType) {
            case 'countable':
                return { ...base, background: '#4a90e2', borderRadius: '0' };  // Square
            case 'fluid':
                return { ...base, background: '#50C878', borderRadius: '50%' };  // Circle
            case 'loose':
                return { ...base, background: '#FFD700', borderRadius: '50% / 25%' };  // Oval
            case 'virtual':
                return { ...base, background: '#9966CC', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' };  // Diamond
            case 'molten':
                return { ...base, background: '#FF8C00', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', transform: 'rotate(45deg)' };  // Triangle
            default:
                return { ...base, background: portType === 'input' ? '#4a90e2' : '#50C878', borderRadius: '50%' };
        }
    };

    const onAddNode = useCallback((machine) => {
        // Parse ports with layout symbols
        const parsedPorts = parseLayoutPorts(machine.layout.layoutString, machine.layout.ports);

        // Base node
        const newNode = {
            id: machine.id,
            type: 'machineNode',
            data: { label: machine.name, parsedPorts, rotation: 0 },
            position: { x: Math.random() * 20, y: Math.random() * 400 },
            style: {
                width: Math.max(100, machine.layout.width * 15),
                height: Math.max(60, machine.layout.height * 15),
                backgroundColor: 'transparent',
                border: 'none',
                position: 'relative'
            }
        };

        // Custom node
        const MachineNode = ({ data }) => {
            const { label, parsedPorts, rotation } = data;
            const scale = 15;

            const handleRotate = () => {
                const newRotation = (rotation + 90) % 360;
                setNodes((nds) =>
                    nds.map((node) =>
                        node.id === data.id
                            ? { ...node, data: { ...node.data, rotation: newRotation } }
                            : node
                    )
                );
            };

            return (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    {/* Fixed Label */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 10,
                        pointerEvents: 'none'
                    }}>
                        {label}
                    </div>

                    {/* Fixed Rotate Button */}
                    <button
                        onClick={handleRotate}
                        style={{
                            position: 'absolute',
                            top: '1px',
                            right: '1px',
                            background: 'transparent',
                            color: 'white',
                            border: 'none',
                            fontSize: 14,
                            cursor: 'pointer',
                            zIndex: 10,
                            padding: '1px'
                        }}
                    >
                        🔄
                    </button>

                    {/* Rotatable Inner */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: 'center center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: '#333',
                        border: '1px solid #666'
                    }}>
                        {/* Shaped Ports from parsed layout */}
                        {parsedPorts.map((port) => {
                            const style = getPortStyle(port.type, port.inferredType);
                            return (
                                <Handle
                                    key={port.id}
                                    type={port.type}
                                    position="custom"
                                    style={{
                                        left: `${port.pos.x * scale}px`,
                                        top: `${port.pos.y * scale}px`,
                                        ...style
                                    }}
                                    id={port.id}
                                />
                            );
                        })}
                    </div>
                </div>
            );
        };

        setNodes((nds) => nds.concat(newNode));
        nodeTypes.machineNode = MachineNode;
    }, [setNodes]);

    const onMachineClick = useCallback((machine) => {
        onAddNode(machine);
    }, [onAddNode]);

    return (
        <ReactFlowProvider>
            <style>{`
        .react-flow__controls { background: #333 !important; border: 1px solid #555 !important; }
        .react-flow__controls-button { background: #444 !important; color: white !important; border: '1px solid #555 !important; }
        .react-flow__controls-button:hover { background: #555 !important; }
        .react-flow__minimap { background: #333 !important; border: 1px solid #555 !important; }
        .react-flow__minimap-mask { fill: #444 !important; }
        .react-flow__minimap-node { stroke: #666 !important; fill: #555 !important; }
      `}</style>
            <div style={{ width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#1a1a1a' }}>
                {/* Left Palette Sidebar */}
                <div style={{ width: '250px', background: '#2a2a2a', color: 'white', padding: '10px', overflowY: 'auto' }}>
                    <h3 style={{ color: 'white' }}>Machines ({GameData.machines.length})</h3>
                    <input
                        type="text"
                        placeholder="Search machines..."
                        onChange={(e) => setSelectedMachines(GameData.machines.filter(m => m.name.toLowerCase().includes(e.target.value.toLowerCase())))}
                        style={{ width: '100%', marginBottom: '10px', background: '#333', color: 'white', border: '1px solid #555' }}
                    />
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {selectedMachines.length > 0 ? selectedMachines.slice(0, 10).map((machine) => (
                            <li key={machine.id} style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #444', color: 'white' }} onClick={() => onMachineClick(machine)}>
                                {machine.name} ({machine.layout.width}x{machine.layout.height})
                            </li>
                        )) : (
                            <li style={{ color: '#aaa' }}>No matches</li>
                        )}
                    </ul>
                </div>

                {/* Canvas */}
                <div style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={nodeTypes}
                        fitView
                        style={{ backgroundColor: '#1a1a1a' }}
                    >
                        <Background color="#333" />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>
            </div>
        </ReactFlowProvider>
    );
}

export default App;