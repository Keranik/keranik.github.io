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
            width: '240px',
            background: '#2a2a2a',
            color: 'white',
            padding: '1rem',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRight: '2px solid #4a90e2',
            boxShadow: '4px 0 12px rgba(0, 0, 0, 0.3)'
        }}>
            <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', whiteSpace: 'nowrap' }}>
                <img src={machinesIcon} alt="Machines" style={{ width: '20px', height: '20px', verticalAlign: 'middle' }} /> Machines ({ProductionCalculator.machines?.length || 0})
            </h3>

            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: '100%',
                    marginBottom: '1rem',
                    padding: '8px 10px',
                    background: '#1a1a1a',
                    color: 'white',
                    border: '2px solid #4a90e2',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                }}
            />

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#aaa', fontSize: '0.85rem' }}>
                    Layer:
                </label>
                <select
                    value={selectedLayer}
                    onChange={(e) => onChangeLayer(Number(e.target.value))}
                    style={{
                        width: '100%',
                        padding: '8px',
                        background: '#1a1a1a',
                        color: 'white',
                        border: '2px solid #4a90e2',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box'
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
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#aaa', fontSize: '0.85rem' }}>
                    Mode:
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                        onClick={() => onChangeConnectionMode('auto')}
                        style={{
                            flex: 1,
                            padding: '8px',
                            background: connectionMode === 'auto' ? '#4a90e2' : '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem'
                        }}
                    >
                        Auto
                    </button>
                    <button
                        onClick={() => onChangeConnectionMode('manual')}
                        style={{
                            flex: 1,
                            padding: '8px',
                            background: connectionMode === 'manual' ? '#4a90e2' : '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem'
                        }}
                    >
                        Manual
                    </button>
                </div>
            </div>

            {connectingFrom && (
                <div style={{
                    padding: '10px',
                    background: '#4a90e2',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '0.85rem'
                }}>
                    Connecting from port {connectingFrom.portId}...
                    <button
                        onClick={onCancelConnectingFrom}
                        style={{
                            marginTop: '6px',
                            padding: '4px 8px',
                            background: '#ff6b6b',
                            border: 'none',
                            borderRadius: '4px',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            display: 'block',
                            width: '100%'
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
                gap: '6px'
            }}>
                {results.length > 0 ? results.map((machine) => {
                    const machineImage = getMachineImage(machine);
                    return (
                        <li
                            key={machine.id}
                            onClick={() => onMachineClick(machine)}
                            title={machine.name}
                            style={{
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '6px',
                                color: 'white',
                                backgroundColor: '#1a1a1a',
                                border: '2px solid #333',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                minWidth: 0
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
                                    style={{ width: '32px', height: '32px', objectFit: 'contain', flexShrink: 0 }}
                                />
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontWeight: '600',
                                    fontSize: '0.85rem',
                                    marginBottom: '2px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {machine.name}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#888', whiteSpace: 'nowrap' }}>
                                    {machine.layout.width}x{machine.layout.height} tiles
                                </div>
                            </div>
                        </li>
                    );
                }) : (
                    <li style={{
                        color: '#666',
                        textAlign: 'center',
                        padding: '2rem 0.5rem',
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        lineHeight: '1.5'
                    }}>
                        {ProductionCalculator.machines?.length > 0
                            ? 'Start typing to search...'
                            : 'No machines found'}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MachineSidebar;