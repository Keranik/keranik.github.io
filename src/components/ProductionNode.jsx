import { getProductIcon, getMachineImage, getGeneralIcon, getProductTypeIcon } from '../utils/AssetHelper';
import RecipeCard from './RecipeCard';

const ProductionNode = ({
    node,
    level = 0,
    parentPath = '',
    collapsedNodes,
    onToggleCollapse,
    onOpenRecipeModal,
    onOpenResourceSourceModal,
    recipeOverrides,
    getRecipeTimeDisplay,
    onToggleRecipeTime
}) => {
    if (!node) return null;

    const nodeId = `${parentPath}-${node.productId}-${level}`;
    const isCollapsed = collapsedNodes.has(nodeId);
    const hasChildren = node.inputChains && node.inputChains.length > 0;

    const indent = level * 20;
    const product = node.product;
    const isRaw = node.isRawMaterial;
    const productIcon = getProductIcon(product);
    const machineImage = node.machine ? getMachineImage(node.machine) : null;
    const electricityIcon = getGeneralIcon('Electricity');
    const workerIcon = getGeneralIcon('Worker');
    const computingIcon = getGeneralIcon('Computing');

    const hasMultipleRecipes = node.availableRecipes && node.availableRecipes.length > 1;

    const currentRecipeId = recipeOverrides.get(node.productId) || node.recipe?.id;
    const currentRecipe = node.availableRecipes?.find(r => r.id === currentRecipeId) || node.recipe;

    // Resource source info
    const currentSource = node.resourceSource || { type: 'mining' };
    const sourceLabels = {
        mining: 'Mining (Local)',
        worldMine: 'World Mine',
        trade: 'Trade/Contract',
        storage: 'Storage',
        machine: 'Machine Production'
    };

    return (
        <div style={{ marginLeft: `${indent}px`, marginBottom: '10px' }}>
            {level > 0 && (
                <div style={{
                    position: 'absolute',
                    left: `${indent - 15}px`,
                    top: '20px',
                    width: '10px',
                    height: '2px',
                    backgroundColor: '#555',
                    pointerEvents: 'none'
                }} />
            )}

            <div style={{
                backgroundColor: isRaw ? '#3a3a3a' : '#2a2a2a',
                padding: '14px',
                borderRadius: '8px',
                border: isRaw ? '2px solid #666' : hasMultipleRecipes ? '2px solid #4a90e2' : '1px solid #444',
                transition: 'all 0.2s ease',
                position: 'relative'
            }}>
                {hasChildren && (
                    <button
                        onClick={() => onToggleCollapse(nodeId)}
                        style={{
                            position: 'absolute',
                            top: '14px',
                            left: '-30px',
                            width: '24px',
                            height: '24px',
                            backgroundColor: '#4a90e2',
                            border: '2px solid #5aa0f2',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: '#fff',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 6px rgba(74, 144, 226, 0.4)',
                            zIndex: 10
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#5aa0f2';
                            e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#4a90e2';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title={isCollapsed ? 'Expand inputs' : 'Collapse inputs'}
                    >
                        {isCollapsed ? '▶' : '▼'}
                    </button>
                )}

                {level > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        padding: '2px 6px',
                        backgroundColor: 'rgba(74, 144, 226, 0.2)',
                        border: '1px solid rgba(74, 144, 226, 0.4)',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        color: '#4a90e2',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}>
                        L{level}
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                        {productIcon && (
                            <img
                                src={productIcon}
                                alt={product?.name}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    objectFit: 'contain',
                                    marginTop: '2px'
                                }}
                            />
                        )}
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <strong style={{ color: isRaw ? '#FFD700' : '#4a90e2', fontSize: '1.2rem', lineHeight: 1.3 }}>
                                    {product?.name || node.productId}
                                </strong>
                                {isRaw && <span style={{ color: '#FFD700', fontSize: '0.75rem', backgroundColor: 'rgba(255, 215, 0, 0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(255, 215, 0, 0.3)' }}>RAW</span>}
                                {hasChildren && (
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: '#888',
                                        backgroundColor: '#1a1a1a',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        border: '1px solid #333'
                                    }}>
                                        {node.inputChains.length} input{node.inputChains.length > 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>

                            {/* Raw material source display */}
                            {isRaw && (
                                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {(() => {
                                        const sourceIcons = {
                                            mining: getGeneralIcon('Mining'),
                                            worldMine: getGeneralIcon('Mine'),
                                            trade: getGeneralIcon('Trade'),
                                            storage: getProductTypeIcon(product?.type),
                                            machine: getGeneralIcon('Machines')
                                        };
                                        const icon = sourceIcons[currentSource.type];
                                        return icon && (
                                            <img
                                                src={icon}
                                                alt={sourceLabels[currentSource.type]}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        );
                                    })()}

                                    <span style={{ fontSize: '0.9rem', color: '#aaa' }}>
                                        Source: {sourceLabels[currentSource.type]}
                                    </span>

                                    {currentSource.type === 'storage' && currentSource.config && (
                                        <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '4px' }}>
                                            (Tier {currentSource.config.tier}, {currentSource.config.count}× needed)
                                        </span>
                                    )}

                                    <button
                                        onClick={() => onOpenResourceSourceModal(node)}
                                        style={{
                                            marginLeft: 'auto',
                                            padding: '4px 12px',
                                            backgroundColor: '#4a90e2',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            transition: 'all 0.15s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5aa0f2'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                                    >
                                        + Change Source
                                    </button>
                                </div>
                            )}

                            {hasMultipleRecipes && currentRecipe && (
                                <div style={{ marginTop: '8px' }}>
                                    <div
                                        onClick={() => onOpenRecipeModal(node.productId, node.availableRecipes)}
                                        style={{
                                            padding: '0',
                                            backgroundColor: '#1a1a1a',
                                            border: '2px solid #4a90e2',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            overflow: 'hidden'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#252525';
                                            e.currentTarget.style.borderColor = '#5aa0f2';
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                                            e.currentTarget.style.borderColor = '#4a90e2';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <div style={{ padding: '4px 8px' }}>
                                            <RecipeCard
                                                recipe={currentRecipe}
                                                size="normal"
                                                isClickable={false}
                                                showPerMinute={getRecipeTimeDisplay(currentRecipe.id)}
                                                onToggleTime={onToggleRecipeTime}
                                            />
                                        </div>
                                        <div style={{
                                            padding: '6px 12px',
                                            backgroundColor: 'rgba(74, 144, 226, 0.1)',
                                            borderTop: '1px solid rgba(74, 144, 226, 0.2)',
                                            fontSize: '0.7rem',
                                            color: '#888',
                                            textAlign: 'center',
                                            fontWeight: '500',
                                            letterSpacing: '0.3px'
                                        }}>
                                            ✨ Click to view {node.availableRecipes.length} available recipes
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{
                        color: '#fff',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        backgroundColor: '#1a1a1a',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                        marginLeft: '14px'
                    }}>
                        {node.targetRate?.toFixed(2)} /min
                    </div>
                </div>

                {!isRaw && node.machine && (
                    <div style={{ marginTop: '14px', color: '#aaa', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                            {machineImage && (
                                <img
                                    src={machineImage}
                                    alt={node.machine.name}
                                    style={{
                                        width: '52px',
                                        height: '52px',
                                        objectFit: 'contain'
                                    }}
                                />
                            )}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1.05rem', color: '#fff', lineHeight: 1.3 }}>
                                    <strong>{node.machine.name}</strong> × {node.machineCount}
                                </div>
                                <div style={{ marginTop: '4px', color: '#999', fontSize: '0.85rem', lineHeight: 1.3 }}>
                                    {node.recipe?.name} ({node.recipe?.durationSeconds}s cycle)
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            marginTop: '10px',
                            flexWrap: 'wrap',
                            backgroundColor: '#1a1a1a',
                            padding: '10px 14px',
                            borderRadius: '6px'
                        }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#FFD700' }}>
                                {electricityIcon ? (
                                    <img src={electricityIcon} alt="Electricity" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                ) : '⚡'}
                                <strong style={{ fontSize: '1rem' }}>{(node.machine.electricityKw * node.machineCount).toFixed(0)}</strong>
                                <span style={{ fontSize: '0.9rem', color: '#ccc' }}>kW</span>
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#50C878' }}>
                                {workerIcon ? (
                                    <img src={workerIcon} alt="Workers" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                ) : '👷'}
                                <strong style={{ fontSize: '1rem' }}>{node.machine.workers * node.machineCount}</strong>
                                <span style={{ fontSize: '0.9rem', color: '#ccc' }}>workers</span>
                            </span>
                            {node.machine.computingTFlops > 0 && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#4a90e2' }}>
                                    {computingIcon ? (
                                        <img src={computingIcon} alt="Computing" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                    ) : '💻'}
                                    <strong style={{ fontSize: '1rem' }}>{(node.machine.computingTFlops * node.machineCount).toFixed(1)}</strong>
                                    <span style={{ fontSize: '0.9rem', color: '#ccc' }}>TFLOPS</span>
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {!isRaw && node.inputs && node.inputs.length > 0 && (
                    <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#999' }}>
                        <div style={{ marginBottom: '8px', color: '#ccc', fontWeight: 'bold', fontSize: '0.95rem' }}>Inputs:</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {node.inputs.map((input, idx) => {
                                const inputIcon = getProductIcon(input.product);
                                return (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        backgroundColor: '#1a1a1a',
                                        padding: '8px 12px',
                                        borderRadius: '5px'
                                    }}>
                                        {inputIcon && (
                                            <img
                                                src={inputIcon}
                                                alt={input.product?.name}
                                                style={{
                                                    width: '22px',
                                                    height: '22px',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        )}
                                        <span style={{ flex: 1, color: '#ddd', fontSize: '0.95rem' }}>
                                            {input.product?.name || input.productId}
                                        </span>
                                        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>
                                            {input.ratePerMin.toFixed(2)} /min
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {hasChildren && !isCollapsed && (
                <div style={{
                    marginTop: '14px',
                    marginLeft: '20px',
                    borderLeft: '2px solid #555',
                    paddingLeft: '10px',
                    position: 'relative'
                }}>
                    {node.inputChains.map((childNode, idx) => (
                        <ProductionNode
                            key={`${nodeId}-${idx}`}
                            node={childNode}
                            level={level + 1}
                            parentPath={nodeId}
                            collapsedNodes={collapsedNodes}
                            onToggleCollapse={onToggleCollapse}
                            onOpenRecipeModal={onOpenRecipeModal}
                            onOpenResourceSourceModal={onOpenResourceSourceModal}
                            recipeOverrides={recipeOverrides}
                            getRecipeTimeDisplay={getRecipeTimeDisplay}
                            onToggleRecipeTime={onToggleRecipeTime}
                        />
                    ))}
                </div>
            )}

            {hasChildren && isCollapsed && (
                <div style={{
                    marginTop: '8px',
                    marginLeft: '20px',
                    padding: '8px 12px',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    color: '#888',
                    fontStyle: 'italic'
                }}>
                    🔽 {node.inputChains.length} collapsed input chain{node.inputChains.length > 1 ? 's' : ''} - click ▶ to expand
                </div>
            )}
        </div>
    );
};

export default ProductionNode;