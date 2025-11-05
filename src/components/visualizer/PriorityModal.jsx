import React, { useState, useEffect } from 'react';
import { getGeneralIcon, getProductIcon } from '../../utils/AssetHelper';
import connectionManager from '../../utils/ConnectionManager';

/**
 * PriorityModal.jsx
 * Modal for configuring connection flow distribution
 * Modes: Auto (balanced/priority) and Manual (custom allocation)
 * RPG-style stats display with live allocation preview
 */

const PriorityModal = ({
    isOpen = false,
    onClose = () => {},
    sourceNodeId = null,
    sourcePortId = null,
    connections = [],
    totalProduction = 0,
    product = null,
    onUpdate = () => {}
}) => {
    const [mode, setMode] = useState('auto'); // 'auto' or 'manual'
    const [autoMode, setAutoMode] = useState('balanced'); // 'balanced' or 'priority'
    const [allocations, setAllocations] = useState({});
    const [remaining, setRemaining] = useState(0);

    const productIcon = product ? getProductIcon(product) : null;
    const balanceIcon = getGeneralIcon('Balance');
    const priorityIcon = getGeneralIcon('Priority');

    // Initialize allocations when modal opens
    useEffect(() => {
        if (isOpen && connections.length > 0) {
            const initialAllocations = {};
            let currentRemaining = totalProduction;

            connections.forEach(conn => {
                initialAllocations[conn.id] = {
                    current: conn.flow || 0,
                    requested: conn.maxFlow || 0,
                    priority: conn.priority || 0
                };
                currentRemaining -= conn.flow || 0;
            });

            setAllocations(initialAllocations);
            setRemaining(currentRemaining);

            // Detect current mode
            const hasManual = connections.some(c => c.mode === 'manual');
            if (hasManual) {
                setMode('manual');
            } else {
                setMode('auto');
                // Detect if priority or balanced
                const hasPriority = connections.some(c => c.priority > 0);
                setAutoMode(hasPriority ? 'priority' : 'balanced');
            }
        }
    }, [isOpen, connections, totalProduction]);

    // Calculate balanced distribution
    const calculateBalanced = () => {
        const newAllocations = { ...allocations };
        let remainingToDistribute = totalProduction;

        // Calculate total requested
        const totalRequested = connections.reduce((sum, conn) => {
            return sum + (allocations[conn.id]?.requested || 0);
        }, 0);

        if (totalRequested === 0) {
            // No requests, distribute evenly
            const perConnection = totalProduction / connections.length;
            connections.forEach(conn => {
                newAllocations[conn.id].current = perConnection;
            });
        } else if (totalRequested <= totalProduction) {
            // Can satisfy all requests
            connections.forEach(conn => {
                newAllocations[conn.id].current = allocations[conn.id].requested;
                remainingToDistribute -= allocations[conn.id].requested;
            });
        } else {
            // Scale down proportionally
            const scale = totalProduction / totalRequested;
            connections.forEach(conn => {
                const allocated = allocations[conn.id].requested * scale;
                newAllocations[conn.id].current = allocated;
                remainingToDistribute -= allocated;
            });
        }

        setAllocations(newAllocations);
        setRemaining(Math.max(0, remainingToDistribute));
    };

    // Calculate priority-based distribution
    const calculatePriority = () => {
        const newAllocations = { ...allocations };
        let remainingToDistribute = totalProduction;

        // Sort connections by priority (lower number = higher priority)
        const sortedConnections = [...connections].sort((a, b) => {
            return (allocations[a.id]?.priority || 0) - (allocations[b.id]?.priority || 0);
        });

        // Distribute in priority order
        sortedConnections.forEach(conn => {
            const requested = allocations[conn.id]?.requested || 0;
            const toAllocate = Math.min(requested, remainingToDistribute);
            newAllocations[conn.id].current = toAllocate;
            remainingToDistribute -= toAllocate;
        });

        setAllocations(newAllocations);
        setRemaining(Math.max(0, remainingToDistribute));
    };

    // Update allocation for a specific connection
    const updateAllocation = (connectionId, value) => {
        const newAllocations = { ...allocations };
        const newValue = Math.max(0, Math.min(value, totalProduction));
        
        newAllocations[connectionId].current = newValue;

        // Recalculate remaining
        const totalAllocated = Object.values(newAllocations).reduce((sum, alloc) => {
            return sum + alloc.current;
        }, 0);

        setAllocations(newAllocations);
        setRemaining(Math.max(0, totalProduction - totalAllocated));
    };

    // Increment/decrement allocation
    const adjustAllocation = (connectionId, delta) => {
        const current = allocations[connectionId]?.current || 0;
        updateAllocation(connectionId, current + delta);
    };

    // Update priority
    const updatePriority = (connectionId, newPriority) => {
        const newAllocations = { ...allocations };
        newAllocations[connectionId].priority = newPriority;
        setAllocations(newAllocations);
    };

    // Apply changes
    const handleApply = () => {
        if (mode === 'auto') {
            if (autoMode === 'balanced') {
                calculateBalanced();
            } else {
                calculatePriority();
            }
        }

        // Update connections via callback
        const updates = connections.map(conn => ({
            id: conn.id,
            mode: mode,
            flow: allocations[conn.id]?.current || 0,
            priority: allocations[conn.id]?.priority || 0
        }));

        onUpdate(updates);
        onClose();
    };

    if (!isOpen) return null;

    return (
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
                zIndex: 10000,
                padding: '2rem'
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#2a2a2a',
                    borderRadius: '12px',
                    padding: '2rem',
                    maxWidth: '600px',
                    width: '100%',
                    border: '2px solid #4a90e2',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)',
                    maxHeight: '80vh',
                    overflowY: 'auto'
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {productIcon && (
                            <img src={productIcon} alt={product?.name} style={{ width: '32px', height: '32px' }} />
                        )}
                        Flow Configuration
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: '#888' }}>
                        {product?.name || 'Product'} • Total Production: {totalProduction.toFixed(1)}/min
                    </div>
                </div>

                {/* Mode Selection */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#aaa' }}>
                        Distribution Mode:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => setMode('auto')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                backgroundColor: mode === 'auto' ? '#4a90e2' : '#333',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            Auto
                        </button>
                        <button
                            onClick={() => setMode('manual')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                backgroundColor: mode === 'manual' ? '#4a90e2' : '#333',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            Manual
                        </button>
                    </div>
                </div>

                {/* Auto Mode Options */}
                {mode === 'auto' && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#aaa' }}>
                            Auto Distribution:
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => {
                                    setAutoMode('balanced');
                                    calculateBalanced();
                                }}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    backgroundColor: autoMode === 'balanced' ? '#50C878' : '#333',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {balanceIcon && <img src={balanceIcon} alt="Balance" style={{ width: '16px', height: '16px' }} />}
                                Balanced
                            </button>
                            <button
                                onClick={() => {
                                    setAutoMode('priority');
                                    calculatePriority();
                                }}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    backgroundColor: autoMode === 'priority' ? '#50C878' : '#333',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {priorityIcon && <img src={priorityIcon} alt="Priority" style={{ width: '16px', height: '16px' }} />}
                                Priority
                            </button>
                        </div>
                    </div>
                )}

                {/* Allocation Display - RPG Style */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '600', 
                        color: '#aaa', 
                        marginBottom: '0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>Connections ({connections.length})</span>
                        <span style={{ color: remaining > 0 ? '#FFEB3B' : '#50C878' }}>
                            Remaining: {remaining.toFixed(1)}/min
                        </span>
                    </div>

                    {/* Connection List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {connections.map((conn, index) => {
                            const alloc = allocations[conn.id] || { current: 0, requested: 0, priority: 0 };
                            const percentage = totalProduction > 0 ? (alloc.current / totalProduction) * 100 : 0;

                            return (
                                <div
                                    key={conn.id}
                                    style={{
                                        padding: '1rem',
                                        backgroundColor: '#1a1a1a',
                                        border: '2px solid #333',
                                        borderRadius: '8px'
                                    }}
                                >
                                    {/* Connection Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>
                                            Connection #{index + 1}
                                        </span>
                                        {mode === 'auto' && autoMode === 'priority' && (
                                            <select
                                                value={alloc.priority}
                                                onChange={(e) => updatePriority(conn.id, parseInt(e.target.value))}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    backgroundColor: '#333',
                                                    color: '#fff',
                                                    border: '1px solid #555',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                {connections.map((_, i) => (
                                                    <option key={i} value={i}>Priority {i + 1}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>

                                    {/* Current Allocation */}
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Current:</span>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#4a90e2' }}>
                                                {alloc.current.toFixed(1)}/min
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                            Requested: {alloc.requested.toFixed(1)}/min ({percentage.toFixed(0)}%)
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        backgroundColor: '#333',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <div style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            backgroundColor: alloc.current >= alloc.requested ? '#50C878' : '#FFEB3B',
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </div>

                                    {/* Manual Controls */}
                                    {mode === 'manual' && (
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <button
                                                onClick={() => adjustAllocation(conn.id, -1)}
                                                style={{
                                                    padding: '0.5rem',
                                                    backgroundColor: '#ff6b6b',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontWeight: '700',
                                                    fontSize: '1rem',
                                                    width: '32px',
                                                    height: '32px'
                                                }}
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={alloc.current.toFixed(1)}
                                                onChange={(e) => updateAllocation(conn.id, parseFloat(e.target.value) || 0)}
                                                style={{
                                                    flex: 1,
                                                    padding: '0.5rem',
                                                    backgroundColor: '#333',
                                                    color: '#fff',
                                                    border: '1px solid #555',
                                                    borderRadius: '4px',
                                                    fontSize: '0.9rem',
                                                    textAlign: 'center'
                                                }}
                                                step="0.1"
                                                min="0"
                                                max={totalProduction}
                                            />
                                            <button
                                                onClick={() => adjustAllocation(conn.id, 1)}
                                                style={{
                                                    padding: '0.5rem',
                                                    backgroundColor: '#50C878',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontWeight: '700',
                                                    fontSize: '1rem',
                                                    width: '32px',
                                                    height: '32px'
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Actions */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            backgroundColor: '#555',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            backgroundColor: '#4a90e2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PriorityModal;