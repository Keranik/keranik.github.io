import { getProductIcon, getMachineImage, getGeneralIcon } from '../utils/AssetHelper';
import RecipeCard from './RecipeCard';
import ProductionCalculator from '../utils/ProductionCalculator';
import ResourceConsolidator from '../utils/ResourceConsolidator';

const DetailsPanel = ({
    selectedNode,
    requirements,
    powerUnit,
    viewMode,
    recipeOverrides,
    formatPower,
    onOpenRecipeModal,
    onSetPowerUnit,
    getRecipeTimeDisplay,
    onToggleRecipeTime,
    productionChain,
    useConsolidation,
    onViewResourcePoolDetails
}) => {
    // In compact mode:
    // - If no node selected OR if requirements exist but no selectedNode, show total requirements
    // - If a node is selected, show node details

    const shouldShowTotalRequirements = viewMode === 'detailed' ||
        (viewMode === 'compact' && (!selectedNode || !selectedNode.productId));

    // Show node details in compact mode when a node is selected
    if (viewMode === 'compact' && selectedNode && selectedNode.productId) {
        const product = selectedNode.product;
        const productIcon = getProductIcon(product);
        const machineImage = selectedNode.machine ? getMachineImage(selectedNode.machine) : null;
        const hasMultipleRecipes = selectedNode.availableRecipes && selectedNode.availableRecipes.length > 1;
        const currentRecipeId = recipeOverrides.get(selectedNode.productId) || selectedNode.recipe?.id;
        const currentRecipe = selectedNode.availableRecipes?.find(r => r.id === currentRecipeId) || selectedNode.recipe;

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #444' }}>
                    {productIcon && (
                        <img src={productIcon} alt={product?.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                    )}
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                            {product?.name || selectedNode.productId}
                        </h4>
                        <div style={{ color: '#4a90e2', fontSize: '1rem', fontWeight: '600' }}>
                            {selectedNode.targetRate?.toFixed(2)} /min
                        </div>
                    </div>
                    {selectedNode.isRawMaterial && (
                        <span style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(255, 215, 0, 0.15)',
                            color: '#FFD700',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            border: '1px solid rgba(255, 215, 0, 0.3)'
                        }}>
                            RAW MATERIAL
                        </span>
                    )}
                </div>

                {currentRecipe && !selectedNode.isRawMaterial && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px', fontWeight: '600' }}>
                            Current Recipe:
                        </div>
                        <div style={{
                            backgroundColor: '#1a1a1a',
                            border: '2px solid #4a90e2',
                            borderRadius: '8px',
                            padding: '8px',
                            marginBottom: '8px'
                        }}>
                            <RecipeCard
                                recipe={currentRecipe}
                                size="normal"
                                isClickable={false}
                                showPerMinute={getRecipeTimeDisplay(currentRecipe.id)}
                                onToggleTime={onToggleRecipeTime}
                            />
                        </div>

                        {hasMultipleRecipes && (
                            <button
                                onClick={() => onOpenRecipeModal(selectedNode.productId, selectedNode.availableRecipes)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: '#4a90e2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#5aa0f2';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#4a90e2';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                View {selectedNode.availableRecipes.length} Available Recipes
                            </button>
                        )}
                    </div>
                )}

                {selectedNode.machine && !selectedNode.isRawMaterial && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px', fontWeight: '600' }}>
                            Machine:
                        </div>
                        <div style={{
                            backgroundColor: '#1a1a1a',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #444'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                {machineImage && (
                                    <img src={machineImage} alt={selectedNode.machine.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                                )}
                                <div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff' }}>
                                        {selectedNode.machine.name}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#4a90e2', fontWeight: '600' }}>
                                        × {selectedNode.machineCount}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFD700' }}>
                                    {getGeneralIcon('Electricity') && <img src={getGeneralIcon('Electricity')} style={{ width: '18px', height: '18px' }} />}
                                    <span style={{ fontWeight: '700' }}>
                                        {(selectedNode.machine.electricityKw * selectedNode.machineCount).toFixed(0)} kW
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#50C878' }}>
                                    {getGeneralIcon('Worker') && <img src={getGeneralIcon('Worker')} style={{ width: '18px', height: '18px' }} />}
                                    <span style={{ fontWeight: '700' }}>
                                        {selectedNode.machine.workers * selectedNode.machineCount} workers
                                    </span>
                                </div>
                                {selectedNode.machine.computingTFlops > 0 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4a90e2' }}>
                                        {getGeneralIcon('Computing') && <img src={getGeneralIcon('Computing')} style={{ width: '18px', height: '18px' }} />}
                                        <span style={{ fontWeight: '700' }}>
                                            {(selectedNode.machine.computingTFlops * selectedNode.machineCount).toFixed(1)} TF
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {selectedNode.inputs && selectedNode.inputs.length > 0 && (
                    <div>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px', fontWeight: '600' }}>
                            Inputs Required:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {selectedNode.inputs.map((input, idx) => {
                                const inputIcon = getProductIcon(input.product);
                                return (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        backgroundColor: '#1a1a1a',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #444'
                                    }}>
                                        {inputIcon && (
                                            <img src={inputIcon} alt={input.product?.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                                        )}
                                        <span style={{ flex: 1, color: '#ddd', fontSize: '0.95rem', fontWeight: '600' }}>
                                            {input.product?.name || input.productId}
                                        </span>
                                        <span style={{ color: '#4a90e2', fontWeight: '700', fontSize: '0.95rem' }}>
                                            {input.ratePerMin.toFixed(2)} /min
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Show total requirements view (both in detailed mode and compact mode when no node selected)
    if (!requirements) {
        return (
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: '#888',
                fontSize: '0.95rem',
                fontStyle: 'italic'
            }}>
                {viewMode === 'compact' ? 'Run calculation to view requirements' : 'No data available'}
            </div>
        );
    }

    // Get consolidation stats if applicable
    const stats = useConsolidation && productionChain?.consolidatedResources
        ? ResourceConsolidator.getConsolidationStats(productionChain)
        : null;

    return (
        <>
            {/* Header for compact mode */}
            {viewMode === 'compact' && (
                <div style={{
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '2px solid #444'
                }}>
                    <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#4a90e2',
                        margin: 0
                    }}>
                        Total Requirements
                    </h3>
                    <div style={{
                        fontSize: '0.85rem',
                        color: '#888',
                        marginTop: '4px'
                    }}>
                        Click a node to view details
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '6px', border: '1px solid #333' }}>
                    <div style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '4px' }}>Total Machines</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2' }}>
                        {Array.from(requirements.machines.values()).reduce((a, b) => a + b, 0)}
                    </div>
                </div>

                <div style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '6px', border: '1px solid #333' }}>
                    <div style={{
                        color: '#aaa',
                        fontSize: '0.85rem',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Total Power
                            {getGeneralIcon('Electricity') && (
                                <img src={getGeneralIcon('Electricity')} alt="Electricity" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '4px',
                            backgroundColor: '#2a2a2a',
                            padding: '2px',
                            borderRadius: '4px',
                            border: '1px solid #444'
                        }}>
                            {['kW', 'MW', 'GW'].map(unit => (
                                <button
                                    key={unit}
                                    onClick={() => onSetPowerUnit(unit)}
                                    style={{
                                        padding: '2px 6px',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        backgroundColor: powerUnit === unit ? '#4a90e2' : 'transparent',
                                        color: powerUnit === unit ? '#fff' : '#888',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                        letterSpacing: '0.3px'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (powerUnit !== unit) {
                                            e.currentTarget.style.backgroundColor = '#333';
                                            e.currentTarget.style.color = '#aaa';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (powerUnit !== unit) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#888';
                                        }
                                    }}
                                >
                                    {unit}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFD700' }}>
                        {formatPower(requirements.power, powerUnit)} <span style={{ fontSize: '1rem', color: '#aaa' }}>{powerUnit}</span>
                    </div>
                </div>

                <div style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '6px', border: '1px solid #333' }}>
                    <div style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Total Workers
                        {getGeneralIcon('Worker') && (
                            <img src={getGeneralIcon('Worker')} alt="Workers" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                        )}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#50C878' }}>
                        {requirements.workers}
                    </div>
                </div>
            </div>

            {requirements.machines.size > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.75rem', color: '#ccc', fontSize: '1.1rem', fontWeight: '600' }}>
                        Machines:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {Array.from(requirements.machines.entries()).map(([machineId, count]) => {
                            const machine = ProductionCalculator.getMachine(machineId);
                            return (
                                <div key={machineId} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#1a1a1a',
                                    padding: '8px 12px',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem'
                                }}>
                                    <span style={{ color: '#ddd' }}>{machine?.name || machineId}</span>
                                    <span style={{ color: '#fff', fontWeight: 'bold' }}>×{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {requirements.rawMaterials.size > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.75rem', color: '#FFD700', fontSize: '1.1rem', fontWeight: '600' }}>
                        Raw Materials:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {Array.from(requirements.rawMaterials.entries()).map(([productId, rate]) => {
                            const product = ProductionCalculator.getProduct(productId);
                            const rawIcon = getProductIcon(product);
                            return (
                                <div key={productId} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    backgroundColor: '#1a1a1a',
                                    padding: '8px 12px',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem'
                                }}>
                                    {rawIcon && (
                                        <img
                                            src={rawIcon}
                                            alt={product?.name}
                                            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                        />
                                    )}
                                    <span style={{ flex: 1, color: '#ddd' }}>{product?.name || productId}</span>
                                    <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{rate.toFixed(2)}/min</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {requirements.maintenance.size > 0 && (
                <div style={{ marginBottom: stats ? '1.5rem' : '0' }}>
                    <h4 style={{ marginBottom: '0.75rem', color: '#ccc', fontSize: '1.1rem', fontWeight: '600' }}>
                        Maintenance:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {Array.from(requirements.maintenance.entries())
                            .reverse()
                            .map(([productId, perMonth], index) => {
                                const product = ProductionCalculator.getProduct(productId);
                                const maintenanceIcon = getProductIcon(product);
                                const colors = ['#fff', '#FFD700', '#ff4444']; // white, yellow, red
                                const amountColor = colors[index] || '#fff';
                                return (
                                    <div key={productId} style={{
                                        backgroundColor: '#1a1a1a',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%'
                                        }}>
                                            {maintenanceIcon && (
                                                <img
                                                    src={maintenanceIcon}
                                                    alt={product?.name}
                                                    style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                                />
                                            )}
                                            <span style={{
                                                flex: 1,
                                                textAlign: 'left',
                                                color: '#ddd',
                                                padding: '0 8px'
                                            }}>
                                                {product?.name || productId}
                                            </span>
                                            <span style={{ color: amountColor, fontWeight: 'bold' }}>
                                                {perMonth.toFixed(2)}/mo
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}

            {/* Resource Pool Summary - integrated seamlessly at the bottom */}
            {stats && stats.totalResources > 0 && (
                <div>
                    <h4 style={{ marginBottom: '0.75rem', color: '#ccc', fontSize: '1.1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        
                        Shared Resource Pool:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#1a1a1a',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                        }}>
                            <span style={{ color: '#ddd' }}>Shared Resources</span>
                            <span style={{ color: '#4a90e2', fontWeight: 'bold' }}>{stats.sharedResources}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#1a1a1a',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                        }}>
                            <span style={{ color: '#ddd' }}>Single-Use Resources</span>
                            <span style={{ color: '#ccc', fontWeight: 'bold' }}>{stats.singleUseResources}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#1a1a1a',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                        }}>
                            <span style={{ color: '#ddd' }}>Avg. Utilization</span>
                            <span style={{
                                fontWeight: 'bold',
                                color: parseFloat(stats.averageUtilization) >= 90 ? '#4caf50' :
                                    parseFloat(stats.averageUtilization) >= 70 ? '#ff9800' : '#f44336'
                            }}>
                                {stats.averageUtilization}%
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onViewResourcePoolDetails}
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
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#5aa0f2';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#4a90e2';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        View Detailed Breakdown →
                    </button>
                </div>
            )}
        </>
    );
};

export default DetailsPanel;