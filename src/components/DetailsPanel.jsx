import { getProductIcon, getMachineImage, getGeneralIcon } from '../utils/AssetHelper';
import MiniRecipeCard from './MiniRecipeCard';
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
    onViewResourcePoolDetails,
    onOpenResourceSourceModal,
    targetProductId  // NEW: Need this to identify main product
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

        // Resource source info for raw materials
        const currentSource = selectedNode.resourceSource || { type: 'mining' };
        const sourceLabels = {
            mining: 'Mining',
            worldMine: 'World Mine',
            trade: 'Trading Dock',
            storage: 'Storage',
            machine: 'Production Machine'
        };

        return (
            <div>
                {/* Compact Product Header */}
                <div style={{
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '2px solid #444',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/* Icon and Name Stacked */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px'
                    }}>
                        {productIcon && (
                            <img
                                src={productIcon}
                                alt={product?.name}
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                                }}
                            />
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h4 style={{
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                color: '#fff',
                                margin: 0,
                                lineHeight: 1.2,
                                textAlign: 'center'
                            }}>
                                {product?.name || selectedNode.productId}
                            </h4>
                            {selectedNode.isRawMaterial && (
                                <span style={{
                                    padding: '4px 10px',
                                    backgroundColor: 'rgba(255, 215, 0, 0.15)',
                                    color: '#FFD700',
                                    borderRadius: '4px',
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    RAW
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Production Rate Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '6px',
                        border: '1px solid #333'
                    }}>
                        <span style={{
                            fontSize: '0.75rem',
                            color: '#888',
                            textTransform: 'uppercase',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}>
                            Production Rate
                        </span>
                        <div style={{
                            width: '1px',
                            height: '16px',
                            backgroundColor: '#444'
                        }} />
                        <span style={{
                            color: '#4a90e2',
                            fontSize: '1.1rem',
                            fontWeight: '700'
                        }}>
                            {selectedNode.targetRate?.toFixed(2)}
                        </span>
                        <span style={{
                            fontSize: '0.85rem',
                            color: '#888',
                            fontWeight: '600'
                        }}>
                            /min
                        </span>
                    </div>
                </div>


                {/* RAW MATERIAL - Show Resource Source */}
                {selectedNode.isRawMaterial && onOpenResourceSourceModal && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px', fontWeight: '600' }}>
                            Resource Source:
                        </div>
                        <div style={{
                            backgroundColor: '#1a1a1a',
                            border: '2px solid #FFD700',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '8px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                color: '#FFD700',
                                fontWeight: '600',
                                fontSize: '1rem'
                            }}>
                                <span>{sourceLabels[currentSource.type] || currentSource.type}</span>
                                {currentSource.type === 'storage' && currentSource.config && (
                                    <span style={{ fontSize: '0.9rem', color: '#aaa' }}>
                                        Tier {currentSource.config.tier}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => onOpenResourceSourceModal(selectedNode)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#FFD700',
                                color: '#1a1a1a',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#FFC107';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 215, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#FFD700';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {getGeneralIcon('Plus') && (
                                <img
                                    src={getGeneralIcon('Plus')}
                                    alt="Change"
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        filter: 'brightness(0) saturate(100%) invert(0%)'
                                    }}
                                />
                            )}
                            Change Resource Source
                        </button>
                    </div>
                )}

                {/* PRODUCED ITEM - Show Recipe */}
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
                            <MiniRecipeCard
                                recipe={currentRecipe}
                                size="normal"
                                isClickable={false}
                                iconSize={24}
                                showNumbers={true}
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b19cd9' }}>
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

    // Calculate total outputs (byproducts, waste, etc.)
    const outputAnalysis = productionChain && targetProductId
        ? ProductionCalculator.calculateTotalOutputs(productionChain, targetProductId)
        : null;

    const totalMachines = Array.from(requirements.machines.values()).reduce((a, b) => a + b, 0);
    const totalWorkers = requirements.workers;

    return (
        <>
            {/* Embossed "Production Summary" Badge */}
            <div style={{
                margin: '-1.5rem -1.5rem 1.5rem -1.5rem',
                padding: '12px 0',
                background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
                borderBottom: '2px solid #333',
                boxShadow:
                    'inset 0 3px 8px rgba(0, 0, 0, 0.7), ' +
                    'inset 0 -3px 8px rgba(255, 255, 255, 0.03), ' +
                    '0 4px 10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '10px 10px 0 0'
            }}>
                <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: '#4a90e2',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'

                }}>
                    Production Summary
                </span>
                {getGeneralIcon('Machines') && (
                    <img
                        src={getGeneralIcon('Machines')}
                        alt="Summary"
                        style={{
                            width: '16px',
                            height: '16px',
                            opacity: 0.7,
                            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8))'
                        }}
                    />
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Combined Stats Grid - 2x2 */}
                <div style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '6px',
                    border: '1px solid #333',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr'
                }}>
                    {/* Machines */}
                    <div style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '2px solid #333',
                        borderBottom: '2px solid #333'
                    }}>
                        {getGeneralIcon('Machines') && (
                            <img
                                src={getGeneralIcon('Machines')}
                                alt="Machines"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    marginBottom: '8px',
                                    opacity: 0.8
                                }}
                            />
                        )}
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2', lineHeight: 1 }}>
                            {totalMachines}
                        </div>
                        <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '4px' }}>
                            Machines
                        </div>
                    </div>

                    {/* Workers */}
                    <div style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '2px solid #333'
                    }}>
                        {getGeneralIcon('Worker') && (
                            <img
                                src={getGeneralIcon('Worker')}
                                alt="Workers"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    marginBottom: '8px',
                                    opacity: 0.8
                                }}
                            />
                        )}
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#50C878', lineHeight: 1 }}>
                            {totalWorkers}
                        </div>
                        <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '4px' }}>
                            Workers
                        </div>
                    </div>

                    {/* Power */}
                    <div style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '2px solid #333'
                    }}>
                        {getGeneralIcon('Electricity') && (
                            <img
                                src={getGeneralIcon('Electricity')}
                                alt="Power"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    marginBottom: '8px',
                                    opacity: 0.8
                                }}
                            />
                        )}
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFD700', lineHeight: 1 }}>
                            {formatPower(requirements.power, powerUnit)}
                        </div>
                        <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '4px' }}>
                            Power ({powerUnit})
                        </div>
                    </div>

                    {/* Computing */}
                    <div style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {getGeneralIcon('Computing') && (
                            <img
                                src={getGeneralIcon('Computing')}
                                alt="Computing"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    marginBottom: '8px',
                                    opacity: 0.8
                                }}
                            />
                        )}
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#b19cd9', lineHeight: 1 }}>
                            {requirements.computing ? requirements.computing.toFixed(1) : '0.0'}
                        </div>
                        <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '4px' }}>
                            Computing (TF)
                        </div>
                    </div>
                </div>

                {/* Power Unit Selector - Moved Below */}
                <div style={{
                    backgroundColor: '#1a1a1a',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '-0.5rem'
                }}>
                    <div style={{
                        fontSize: '0.85rem',
                        color: '#aaa',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        Power Unit:
                        {getGeneralIcon('Electricity') && (
                            <img src={getGeneralIcon('Electricity')} alt="Electricity" style={{ width: '16px', height: '16px', opacity: 0.6 }} />
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
                                    padding: '4px 12px',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    backgroundColor: powerUnit === unit ? '#FFD700' : 'transparent',
                                    color: powerUnit === unit ? '#1a1a1a' : '#888',
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
            </div>

            {/* NEW: Total Outputs Section */}
            {outputAnalysis && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.75rem', color: '#50C878', fontSize: '1.1rem', fontWeight: '600' }}>
                        Total Outputs:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {/* Main Product */}
                        {outputAnalysis.mainProduct && outputAnalysis.mainProduct.rate > 0 && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: '#1a3a1a',
                                padding: '10px 12px',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                border: '1px solid #50C878'
                            }}>
                                {getProductIcon(outputAnalysis.mainProduct.product) && (
                                    <img
                                        src={getProductIcon(outputAnalysis.mainProduct.product)}
                                        alt={outputAnalysis.mainProduct.product?.name}
                                        style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                    />
                                )}
                                <span style={{ flex: 1, color: '#50C878', fontWeight: '700' }}>
                                    {outputAnalysis.mainProduct.product?.name || outputAnalysis.mainProduct.productId}
                                </span>
                                <span style={{
                                    padding: '2px 6px',
                                    backgroundColor: 'rgba(80, 200, 120, 0.2)',
                                    borderRadius: '3px',
                                    fontSize: '0.75rem',
                                    color: '#50C878',
                                    fontWeight: '600'
                                }}>
                                    TARGET
                                </span>
                                <span style={{ color: '#50C878', fontWeight: 'bold' }}>
                                    {outputAnalysis.mainProduct.rate.toFixed(2)}/min
                                </span>
                            </div>
                        )}

                        {/* Byproducts (useful intermediates) */}
                        {outputAnalysis.byproducts.length > 0 && (
                            <>
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: '#888',
                                    marginTop: '8px',
                                    marginBottom: '4px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Unused Byproducts
                                </div>
                                {outputAnalysis.byproducts.map((item, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#1a1a1a',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem',
                                        border: '1px solid #444'
                                    }}>
                                        {getProductIcon(item.product) && (
                                            <img
                                                src={getProductIcon(item.product)}
                                                alt={item.product?.name}
                                                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                            />
                                        )}
                                        <span style={{ flex: 1, color: '#ddd' }}>
                                            {item.product?.name || item.productId}
                                        </span>
                                        <span style={{ color: '#4a90e2', fontWeight: 'bold' }}>
                                            +{item.rate.toFixed(2)}/min
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Waste products */}
                        {outputAnalysis.waste.length > 0 && (
                            <>
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: '#ff6b6b',
                                    marginTop: '8px',
                                    marginBottom: '4px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Waste / Pollution
                                </div>
                                {outputAnalysis.waste.map((item, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#2a1a1a',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem',
                                        border: '1px solid #ff6b6b'
                                    }}>
                                        {getProductIcon(item.product) && (
                                            <img
                                                src={getProductIcon(item.product)}
                                                alt={item.product?.name}
                                                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                            />
                                        )}
                                        <span style={{ flex: 1, color: '#ff6b6b' }}>
                                            {item.product?.name || item.productId}
                                        </span>
                                        <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                                            +{item.rate.toFixed(2)}/min
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* No byproducts message */}
                        {outputAnalysis.byproducts.length === 0 && outputAnalysis.waste.length === 0 && (
                            <div style={{
                                padding: '8px 12px',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                color: '#666',
                                fontStyle: 'italic',
                                textAlign: 'center'
                            }}>
                                No unused byproducts or waste
                            </div>
                        )}
                    </div>
                </div>
            )}

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
                            .sort(([productIdA], [productIdB]) => {
                                const productA = ProductionCalculator.getProduct(productIdA);
                                const productB = ProductionCalculator.getProduct(productIdB);
                                const nameA = productA?.name || productIdA;
                                const nameB = productB?.name || productIdB;

                                const getTier = (name) => {
                                    if (name.includes('III') || name.includes('3')) return 3;
                                    if (name.includes('II') || name.includes('2')) return 2;
                                    if (name.includes('I') || name.includes('1')) return 1;
                                    return 0;
                                };

                                return getTier(nameA) - getTier(nameB);
                            })
                            .map(([productId, perMonth]) => {
                                const product = ProductionCalculator.getProduct(productId);
                                const maintenanceIcon = getProductIcon(product);
                                const productName = product?.name || productId;

                                const getTier = (name) => {
                                    if (name.includes('III') || name.includes('3')) return 3;
                                    if (name.includes('II') || name.includes('2')) return 2;
                                    if (name.includes('I') || name.includes('1')) return 1;
                                    return 1;
                                };

                                const tier = getTier(productName);
                                const colorMap = {
                                    1: '#fff',
                                    2: '#FFD700',
                                    3: '#ff4444'
                                };
                                const amountColor = colorMap[tier] || '#fff';

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
                                                {productName}
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

            {/* Resource Pool Summary */}
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