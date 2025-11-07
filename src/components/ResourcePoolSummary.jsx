import React from 'react';
import ResourceConsolidator from '../utils/ResourceConsolidator';

const ResourcePoolSummary = ({ chain, onViewDetails }) => {
    if (!chain || !chain.consolidatedResources) {
        return null;
    }

    const stats = ResourceConsolidator.getConsolidationStats(chain);

    if (stats.totalResources === 0) {
        return null;
    }

    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #444'  // Changed from blue to match other panels
        }}>
            <div style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#ccc',  // Changed from blue to lighter gray
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span>🔗</span>
                Resource Pool Summary
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.9rem',
                marginBottom: '12px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    backgroundColor: '#252525',
                    borderRadius: '4px'
                }}>
                    <span style={{ color: '#888' }}>Shared Resources:</span>
                    <strong style={{ color: '#4a90e2' }}>{stats.sharedResources}</strong>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    backgroundColor: '#252525',
                    borderRadius: '4px'
                }}>
                    <span style={{ color: '#888' }}>Single-Use Resources:</span>
                    <strong style={{ color: '#ccc' }}>{stats.singleUseResources}</strong>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    backgroundColor: '#252525',
                    borderRadius: '4px'
                }}>
                    <span style={{ color: '#888' }}>Avg. Utilization:</span>
                    <strong style={{
                        color: parseFloat(stats.averageUtilization) >= 90 ? '#4caf50' :
                            parseFloat(stats.averageUtilization) >= 70 ? '#ff9800' : '#f44336'
                    }}>
                        {stats.averageUtilization}%
                    </strong>
                </div>
            </div>

            <button
                onClick={onViewDetails}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#4a90e2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#357abd'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4a90e2'}
            >
                View Detailed Breakdown →
            </button>
        </div>
    );
};

export default ResourcePoolSummary;