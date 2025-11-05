import { useMemo, useState } from 'react';
import { getGeneralIcon, getMachineImage } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';
import { LAYERS } from '../VisualizerConfig';

const MachineSidebar = ({
    selectedLayer,
    onChangeLayer,
    connectionMode,
    onChangeConnectionMode,
    connectingFrom,
    onCancelConnectingFrom,
    onMachineClick
}) => {
    const [search, setSearch] = useState('');

    const results = useMemo(() => {
        const list = ProductionCalculator.machines || [];
        if (!search) return [];
        const s = search.toLowerCase();
        return list.filter(m => m.name.toLowerCase().includes(s)).slice(0, 30);
    }, [search]);

    const machinesIcon = getGeneralIcon('Machines');

    return (
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
                <img src={machinesIcon} alt="Machines" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} /> Machines ({ProductionCalculator.machines?.length || 0})
            </h3>

            <input
                type="text"
                placeholder="Search machines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#aaa' }}>
                    Connection Layer:
                </label>
                <select
                    value={selectedLayer}
                    onChange={(e) => onChangeLayer(Number(e.target.value))}
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

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#aaa' }}>
                    Connection Mode:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => onChangeConnectionMode('auto')}
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
                        onClick={() => onChangeConnectionMode('manual')}
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
                        onClick={onCancelConnectingFrom}
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

            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                {results.length > 0 ? results.map((machine) => {
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
                                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                />
                            )}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '2px' }}>
                                    {machine.name}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                    {/* Use ASCII 'x' instead of Unicode multiplication sign */}
                                    {machine.layout.width}x{machine.layout.height} tiles
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
                        {ProductionCalculator.machines?.length > 0
                            ? 'Start typing to search for machines...'
                            : 'No machines found'}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MachineSidebar;