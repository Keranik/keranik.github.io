// src/components/farm-optimizer/ConstraintsPanel.jsx
import { getEntityIcon, getCropIcon, getProductIcon, getGeneralIcon } from '../../utils/AssetHelper';

const ConstraintsPanel = ({
    constraints,
    constraintsExpanded,
    activeConstraintTab,
    availableFarms,
    availableFoodCrops,
    allIntermediates,
    onToggleExpand,
    onTabChange,
    onConstraintsChange
}) => {
    const toggleFarmType = (farmId) => {
        const newAllowed = constraints.allowedFarmTypes.includes(farmId)
            ? constraints.allowedFarmTypes.filter(id => id !== farmId)
            : [...constraints.allowedFarmTypes, farmId];
        onConstraintsChange({ ...constraints, allowedFarmTypes: newAllowed });
    };

    const toggleCrop = (cropId) => {
        const newAllowed = constraints.allowedCrops.includes(cropId)
            ? constraints.allowedCrops.filter(id => id !== cropId)
            : [...constraints.allowedCrops, cropId];
        onConstraintsChange({ ...constraints, allowedCrops: newAllowed });
    };

    const toggleIntermediate = (productId) => {
        if (constraints.allowedIntermediates === null) {
            // First time toggling - start with all enabled except this one
            const allIntermediateIds = allIntermediates.map(p => p.id);
            onConstraintsChange({
                ...constraints,
                allowedIntermediates: allIntermediateIds.filter(id => id !== productId)
            });
        } else if (constraints.allowedIntermediates.includes(productId)) {
            // Remove this one
            onConstraintsChange({
                ...constraints,
                allowedIntermediates: constraints.allowedIntermediates.filter(id => id !== productId)
            });
        } else {
            // Add this one
            onConstraintsChange({
                ...constraints,
                allowedIntermediates: [...constraints.allowedIntermediates, productId]
            });
        }
    };

    const activeFilterCount = () => {
        let count = 0;
        if (constraints.allowedFarmTypes.length > 0) count++;
        if (constraints.allowedCrops.length > 0) count++;
        if (constraints.allowedIntermediates !== null) count++;
        if (constraints.allowedRecipes !== null) count++;
        if (constraints.maxWaterPerDay !== null) count++;
        if (constraints.maxFertilityPerDay !== null) count++;
        if (constraints.naturalFertilityOnly) count++;
        return count;
    };

    return (
        <div style={{
            marginBottom: '1.5rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '6px',
            border: '1px solid #333',
            overflow: 'hidden'
        }}>
            {/* Header (Collapsible) */}
            <button
                onClick={onToggleExpand}
                style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#252525'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                        fontSize: '1.2rem',
                        transform: constraintsExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: '#4a90e2'
                    }}>
                        ▶
                    </span>
                    {getGeneralIcon('Filter') && (
                        <img
                            src={getGeneralIcon('Filter')}
                            alt="Constraints"
                            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                        />
                    )}
                    <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#ddd' }}>
                        Constraints & Filters
                    </span>
                    {activeFilterCount() > 0 && (
                        <span style={{
                            padding: '0.125rem 0.5rem',
                            backgroundColor: '#4a90e2',
                            borderRadius: '10px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: '#fff'
                        }}>
                            {activeFilterCount()} active
                        </span>
                    )}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {constraintsExpanded ? 'Collapse' : 'Expand'}
                </span>
            </button>

            {/* Expanded Content */}
            {constraintsExpanded && (
                <div style={{
                    padding: '1.25rem',
                    borderTop: '1px solid #333',
                    animation: 'slideDown 0.2s ease'
                }}>
                    {/* Tab Navigation */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        borderBottom: '1px solid #333',
                        paddingBottom: '0.5rem'
                    }}>
                        {[
                            { id: 'farms', label: 'Farm Types', count: constraints.allowedFarmTypes.length === 0 ? availableFarms.length : constraints.allowedFarmTypes.length },
                            { id: 'crops', label: 'Crops', count: constraints.allowedCrops.length === 0 ? availableFoodCrops.length : constraints.allowedCrops.length },
                            { id: 'intermediates', label: 'Intermediates', count: constraints.allowedIntermediates === null ? allIntermediates.length : constraints.allowedIntermediates.length },
                            { id: 'advanced', label: 'Advanced', count: null }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: activeConstraintTab === tab.id ? '#4a90e2' : 'transparent',
                                    border: activeConstraintTab === tab.id ? '1px solid #4a90e2' : '1px solid #444',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: activeConstraintTab === tab.id ? '#fff' : '#aaa',
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span>{tab.label}</span>
                                {tab.count !== null && (
                                    <span style={{
                                        padding: '0.125rem 0.5rem',
                                        backgroundColor: activeConstraintTab === tab.id ? 'rgba(255,255,255,0.2)' : '#333',
                                        borderRadius: '10px',
                                        fontSize: '0.75rem'
                                    }}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div style={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                        padding: '0.5rem',
                        backgroundColor: '#2a2a2a',
                        borderRadius: '4px'
                    }}>
                        {/* Farm Types Tab */}
                        {activeConstraintTab === 'farms' && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {availableFarms.slice().sort((a, b) => {
                                    const getTier = (farm) => {
                                        const match = farm.id.match(/T(\d+)/);
                                        return match ? parseInt(match[1]) : 0;
                                    };
                                    return getTier(a) - getTier(b);
                                }).map(farm => {
                                    const farmIcon = getEntityIcon(farm);
                                    const isAllowed = constraints.allowedFarmTypes.length === 0 || constraints.allowedFarmTypes.includes(farm.id);

                                    return (
                                        <button
                                            key={farm.id}
                                            onClick={() => toggleFarmType(farm.id)}
                                            title={farm.name}
                                            style={{
                                                padding: '0.5rem',
                                                backgroundColor: isAllowed ? 'rgba(74, 144, 226, 0.15)' : 'transparent',
                                                border: isAllowed ? '2px solid #4a90e2' : '2px solid #444',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.15s ease',
                                                opacity: isAllowed ? 1 : 0.5,
                                                width: '56px',
                                                height: '56px'
                                            }}
                                        >
                                            {farmIcon && (
                                                <img
                                                    src={farmIcon}
                                                    alt={farm.name}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        objectFit: 'contain',
                                                        filter: isAllowed ? 'none' : 'grayscale(100%)'
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Crops Tab */}
                        {activeConstraintTab === 'crops' && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {availableFoodCrops.map(crop => {
                                    const cropIcon = getCropIcon(crop);
                                    const isAllowed = constraints.allowedCrops.length === 0 || constraints.allowedCrops.includes(crop.id);

                                    return (
                                        <button
                                            key={crop.id}
                                            onClick={() => toggleCrop(crop.id)}
                                            title={crop.name}
                                            style={{
                                                padding: '0.5rem',
                                                backgroundColor: isAllowed ? 'rgba(80, 200, 120, 0.15)' : 'transparent',
                                                border: isAllowed ? '2px solid #50C878' : '2px solid #444',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.15s ease',
                                                opacity: isAllowed ? 1 : 0.5,
                                                width: '56px',
                                                height: '56px'
                                            }}
                                        >
                                            {cropIcon && (
                                                <img
                                                    src={cropIcon}
                                                    alt={crop.name}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        objectFit: 'contain',
                                                        filter: isAllowed ? 'none' : 'grayscale(100%)'
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Intermediates Tab */}
                        {activeConstraintTab === 'intermediates' && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {allIntermediates.map(product => {
                                    const productIcon = getProductIcon(product);
                                    const isAllowed = constraints.allowedIntermediates === null || constraints.allowedIntermediates.includes(product.id);

                                    return (
                                        <button
                                            key={product.id}
                                            onClick={() => toggleIntermediate(product.id)}
                                            title={product.name}
                                            style={{
                                                padding: '0.5rem',
                                                backgroundColor: isAllowed ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
                                                border: isAllowed ? '2px solid #FFD700' : '2px solid #444',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.15s ease',
                                                opacity: isAllowed ? 1 : 0.5,
                                                width: '56px',
                                                height: '56px'
                                            }}
                                        >
                                            {productIcon && (
                                                <img
                                                    src={productIcon}
                                                    alt={product.name}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        objectFit: 'contain',
                                                        filter: isAllowed ? 'none' : 'grayscale(100%)'
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Advanced Tab */}
                        {activeConstraintTab === 'advanced' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Natural Fertility Only */}
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer',
                                    padding: '0.75rem',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '6px',
                                    border: '1px solid #333'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={constraints.naturalFertilityOnly}
                                        onChange={(e) => onConstraintsChange({ ...constraints, naturalFertilityOnly: e.target.checked })}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd' }}>
                                            Natural Fertility Only
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                            Don't use fertilizer in calculations
                                        </div>
                                    </div>
                                </label>

                                {/* Max Farms (optional constraint) */}
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '6px',
                                    border: '1px solid #333'
                                }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ddd', marginBottom: '0.5rem', display: 'block' }}>
                                        Max Farms (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="No limit"
                                        value={constraints.maxFarms || ''}
                                        onChange={(e) => onConstraintsChange({ ...constraints, maxFarms: e.target.value ? parseInt(e.target.value) : null })}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            backgroundColor: '#2a2a2a',
                                            color: '#fff',
                                            border: '1px solid #444',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem' }}>
                                        Leave empty for unlimited
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ConstraintsPanel;