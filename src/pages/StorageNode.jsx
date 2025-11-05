import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { getProductIcon, getGeneralIcon } from '../utils/AssetHelper';
import { PORT_TYPES, DEFAULT_SCALE } from './VisualizerConfig';

const StorageNode = ({ data }) => {
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

    const getBorderColor = () => {
        switch (connectionStatus) {
            case 'satisfied': return '#50C878';
            case 'partial': return '#FFEB3B';
            case 'error': return '#F44336';
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
                    <img src={productIcon} alt={product?.name} style={{ width: `${32 * globalScale}px`, height: `${32 * globalScale}px`, objectFit: 'contain' }} />
                ) : (
                    <img src={allCategoryIcon} alt="Any" style={{ width: `${32 * globalScale}px`, height: `${32 * globalScale}px`, objectFit: 'contain' }} />
                )}

                <div style={{ fontSize: `${10 * globalScale}px`, fontWeight: '700', color: '#fff', textAlign: 'center' }}>
                    {storageType === 'source' ? 'SOURCE' : 'SINK'}
                </div>

                <div style={{ fontSize: `${8 * globalScale}px`, color: '#aaa', textAlign: 'center' }}>
                    Tier {tier} {productType}
                </div>

                <Handle
                    id="default"
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

export default StorageNode;