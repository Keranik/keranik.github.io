import { getProductIcon, getGeneralIcon, getProductTypeIcon } from '../utils/AssetHelper';
const CompactNode = ({
    node,
    level = 0,
    parentPath = '',
    collapsedNodes,
    onToggleCollapse,
    onSelectNode,
    selectedNode,
    onOpenResourceSourceModal,
    onOpenRecipeModal,
    recipeOverrides
}) => {
    if (!node) return null;
    const nodeId = `${parentPath}-${node.productId}-${level}`;
    const isCollapsed = collapsedNodes.has(nodeId);
    const hasChildren = node.inputChains && node.inputChains.length > 0;
    const product = node.product;
    const productIcon = getProductIcon(product);
    const recipeIcon = getGeneralIcon('Recipes');
    const plusIcon = getGeneralIcon('Plus'); 
    // Calculate subtree metrics
    const calculateSubtreeMetrics = (n) => {
        const metrics = { workers: 0, powerKw: 0, machines: 0, computing: 0, maintenance: 0 };
        const traverse = (node) => {
            if (!node) return;
            if (node.machine && !node.isRawMaterial) {
                const count = node.machineCount || 0;
                metrics.workers += (node.machine.workers || 0) * count;
                metrics.powerKw += (node.machine.electricityKw || 0) * count;
                metrics.machines += count;
                metrics.computing += (node.machine.computingTFlops || 0) * count;
                if (node.machine.maintenance?.perMonth) {
                    metrics.maintenance += node.machine.maintenance.perMonth * count;
                }
            }
            if (node.inputChains) {
                node.inputChains.forEach(traverse);
            }
        };
        traverse(n);
        return metrics;
    };
    const subtreeMetrics = calculateSubtreeMetrics(node);
    const isSelected = selectedNode?.nodeKey === node.nodeKey;
    // Resource source info
    const currentSource = node.resourceSource || { type: 'mining' };
    const sourceIcons = {
        mining: getGeneralIcon('Mining'),
        worldMine: getGeneralIcon('Mine'),
        trade: getGeneralIcon('Trade'),
        storage: getProductTypeIcon(product?.type),
        machine: getGeneralIcon('Machines')
    };
    const hasMultipleRecipes = node.availableRecipes && node.availableRecipes.length > 1;
    // Condition for showing + button: raw materials OR single-recipe hybrids using machine
    const showSourceButton = node.isRawMaterial || (!node.isRawMaterial && node.availableRecipes && node.availableRecipes.length === 1);
    return (
        <div style={{ marginBottom: '4px' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                    border: isSelected ? '2px solid #4a90e2' : '1px solid #333',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    marginLeft: `${level * 20}px`
                }}
                onMouseEnter={(e) => {
                    if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#252525';
                        e.currentTarget.style.borderColor = '#555';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                        e.currentTarget.style.borderColor = '#333';
                    }
                }}
            >
                {/* Expand/collapse button */}
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        if (hasChildren) onToggleCollapse(nodeId);
                    }}
                    style={{
                        width: '20px',
                        color: '#888',
                        fontSize: '0.9rem',
                        flexShrink: 0,
                        cursor: hasChildren ? 'pointer' : 'default',
                        userSelect: 'none'
                    }}
                >
                    {hasChildren ? (isCollapsed ? '▶' : '▼') : ''}
                </span>
                {/* Node content */}
                <div
                    onClick={() => onSelectNode(node)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                        gap: '8px'
                    }}
                >
                    {productIcon && (
                        <img src={productIcon} alt={product?.name} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '180px' }}>
                        <span style={{ fontWeight: '600', color: '#fff', fontSize: '0.95rem' }}>
                            {product?.name || node.productId}
                            {node.isRawMaterial && (
                                <span style={{ marginLeft: '6px', fontSize: '0.7rem', color: '#FFD700', backgroundColor: 'rgba(255,215,0,0.15)', padding: '2px 6px', borderRadius: '3px' }}>
                                    RAW
                                </span>
                            )}
                        </span>
                    </div>
                    <span style={{ color: '#4a90e2', fontWeight: '700', fontSize: '0.9rem', marginLeft: '12px', minWidth: '80px' }}>
                        {node.targetRate?.toFixed(1)}/min
                    </span>
                    {!node.isRawMaterial && node.machine && (
                        <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: '12px', flex: 1 }}>
                            {node.machineCount}× {node.machine.name}
                        </span>
                    )}
                    {node.isRawMaterial && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                            {sourceIcons[currentSource.type] && (
                                <img
                                    src={sourceIcons[currentSource.type]}
                                    alt={currentSource.type}
                                    title={`Source: ${currentSource.type}`}
                                    style={{ width: '16px', height: '16px', objectFit: 'contain', opacity: 0.7 }}
                                />
                            )}
                        </div>
                    )}
                    <span style={{ marginLeft: 'auto', color: '#777', fontSize: '0.8rem', display: 'flex', gap: '12px', flexShrink: 0 }}>
                        {subtreeMetrics.powerKw > 0 && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {getGeneralIcon('Electricity') && <img src={getGeneralIcon('Electricity')} alt="Power" style={{ width: '14px', height: '14px' }} />}
                                {(subtreeMetrics.powerKw / 1000).toFixed(1)}MW
                            </span>
                        )}
                        {subtreeMetrics.workers > 0 && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {getGeneralIcon('Worker') && <img src={getGeneralIcon('Worker')} alt="Workers" style={{ width: '14px', height: '14px' }} />}
                                {subtreeMetrics.workers}
                            </span>
                        )}
                        {subtreeMetrics.machines > 0 && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {getGeneralIcon('Machines') && <img src={getGeneralIcon('Machines')} alt="Machines" style={{ width: '14px', height: '14px' }} />}
                                {subtreeMetrics.machines}
                            </span>
                        )}
                    </span>
                </div>
                {/* Recipe change button for non-raw materials with multiple recipes - original styling, positioned at end */}
                {!node.isRawMaterial && hasMultipleRecipes && onOpenRecipeModal && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenRecipeModal(node.productId, node.availableRecipes);
                        }}
                        style={{
                            marginLeft: '8px',
                            padding: '3px',
                            backgroundColor: 'rgba(74, 144, 226, 0.2)',
                            border: '1px solid rgba(74, 144, 226, 0.4)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s',
                            flexShrink: 0,
                            position: 'relative',
                            minWidth: '22px',
                            minHeight: '22px'
                        }}
                        title={`Change recipe (${node.availableRecipes.length} available)`}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.3)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.4)';
                        }}
                    >
                        {recipeIcon ? (
                            <img
                                src={recipeIcon}
                                alt="Change recipe"
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    objectFit: 'contain',
                                    transform: 'translateX(-17%) translateY(-17%)',
                                    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))'
                                    
                                }}
                            />
                        ) : (
                            <span style={{ fontSize: '14px' }}>📋</span>
                        )}
                        {/* Recipe count - just the number */}
                        <span style={{
                            position: 'absolute',
                            bottom: '0px',
                            right: '1px',
                            color: '#ffffff',
                            fontSize: '0.65rem',
                            fontWeight: '900',
                            lineHeight: 1,
                            //filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.4))'
                            textShadow: '-0.2px -0.2px 0 #000000, -0.2px -0.2px 0 #000000, -0.2px -0.2px 0 #000000, -0.2px -0.2px 0 #000000'
                        }}>
                            {node.availableRecipes.length}
                        </span>
                    </button>
                )}
                {/* + Button for raw materials OR single-recipe hybrids using machine - matched to recipe button styling with min size */}
                {showSourceButton && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenResourceSourceModal(node);
                        }}
                        style={{
                            marginLeft: '8px',
                            padding: '3px',
                            backgroundColor: 'rgba(74, 144, 226, 0.2)',
                            border: '1px solid rgba(74, 144, 226, 0.4)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s',
                            flexShrink: 0,
                            position: 'relative',
                            color: '#fff',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            minWidth: '22px',
                            minHeight: '22px'
                        }}
                        title="Change resource source"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.3)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.4)';
                        }}
                    >
                        <img
                            src={plusIcon}
                            alt="Change resource source"
                            style={{
                                width: '16px',
                                height: '16px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))'

                            }}
                        />
                    </button>
                )}
            </div>
            {hasChildren && !isCollapsed && (
                <div style={{ marginTop: '4px' }}>
                    {node.inputChains.map((child, idx) => (
                        <CompactNode
                            key={`${nodeId}-${idx}`}
                            node={child}
                            level={level + 1}
                            parentPath={nodeId}
                            collapsedNodes={collapsedNodes}
                            onToggleCollapse={onToggleCollapse}
                            onSelectNode={onSelectNode}
                            selectedNode={selectedNode}
                            onOpenResourceSourceModal={onOpenResourceSourceModal}
                            onOpenRecipeModal={onOpenRecipeModal}
                            recipeOverrides={recipeOverrides}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default CompactNode;