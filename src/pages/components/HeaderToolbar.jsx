import { getGeneralIcon, getProductIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';

const HeaderToolbar = ({
    nodesCount,
    edgesCount,
    globalScale,
    onScaleChange,
    snapToGridEnabled,
    onToggleSnap,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    exportBlueprint,
    importBlueprint,
    totalCosts
}) => {
    const workerIcon = getGeneralIcon('Worker');
    const electricityIcon = getGeneralIcon('Electricity');
    const computingIcon = getGeneralIcon('Computing');

    return (
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
                        Design, optimize, and share your factory layouts • {nodesCount} machines • {edgesCount} connections
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                            onChange={(e) => onScaleChange(Number(e.target.value))}
                            style={{ width: '120px' }}
                        />
                        {/* Use ASCII 'x' instead of Unicode multiplication sign to avoid missing glyphs */}
                        <span style={{ color: 'white', fontWeight: '700', minWidth: '40px' }}>{globalScale.toFixed(1)}x</span>
                    </div>

                    <button
                        onClick={onToggleSnap}
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

                    <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                            onClick={onUndo}
                            disabled={!canUndo}
                            style={{
                                padding: '10px 14px',
                                background: canUndo ? '#4a90e2' : '#333',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: canUndo ? 'pointer' : 'not-allowed',
                                fontWeight: '600',
                                fontSize: '1rem'
                            }}
                            title="Undo (Ctrl+Z)"
                        >
                            <img src={getGeneralIcon('Undo')} alt="Undo" style={{ width: '24px', height: '24px' }} />
                        </button>
                        <button
                            onClick={onRedo}
                            disabled={!canRedo}
                            style={{
                                padding: '10px 14px',
                                background: canRedo ? '#4a90e2' : '#333',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: canRedo ? 'pointer' : 'not-allowed',
                                fontWeight: '600',
                                fontSize: '1rem'
                            }}
                            title="Redo (Ctrl+Y)"
                        >
                            <img src={getGeneralIcon('Redo')} alt="Redo" style={{ width: '24px', height: '24px' }} />
                        </button>
                    </div>

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
    );
};

export default HeaderToolbar;