import { Handle } from '@xyflow/react';
import GameData from '../GameData';

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

const MachineNode = ({ data, setNodes }) => {
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
                {/* Shaped Ports */}
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

// Export for App.jsx
export { MachineNode, parseLayoutPorts, getPortStyle };