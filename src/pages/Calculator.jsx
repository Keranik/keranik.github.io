import { useEffect, useState } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { getProductIcon, getMachineImage, getGeneralIcon, getProductTypeIcon, getEntityIcon } from '../utils/AssetHelper';
import OptimizationEngine from '../utils/OptimizationEngine';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';

const Calculator = () => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);

    // Core calculator state
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [targetRate, setTargetRate] = useState(60);
    const [productionChain, setProductionChain] = useState(null);
    const [requirements, setRequirements] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [availableRecipes, setAvailableRecipes] = useState([]);
    const [recipeOverrides, setRecipeOverrides] = useState(new Map());
    const [recipeModalOpen, setRecipeModalOpen] = useState(false);
    const [recipeModalProductId, setRecipeModalProductId] = useState(null);
    const [recipeModalRecipes, setRecipeModalRecipes] = useState([]);
    const [powerUnit, setPowerUnit] = useState('kW');
    const [collapsedNodes, setCollapsedNodes] = useState(new Set());

    // NEW: Resource source management
    const [resourceSources, setResourceSources] = useState(new Map()); // Map<nodeKey, {type, config}>
    const [resourceSourceModal, setResourceSourceModal] = useState({
        open: false,
        nodeKey: null,
        productId: null,
        productName: null,
        requiredRate: 0,
        currentSource: null
    });
    const [storageTierModal, setStorageTierModal] = useState({
        open: false,
        product: null,
        requiredRate: 0,
        tiers: [],
        selectedTier: null
    });

    // NEW: Recipe time display toggles (per-card overrides)
    const [recipeTimeToggles, setRecipeTimeToggles] = useState(new Map()); // Map<recipeId, boolean>

    // Resource constraints
    const [resourceConstraints, setResourceConstraints] = useState(new Map());
    const [resourceInput, setResourceInput] = useState({ productId: '', productName: '', quantity: 0 });

    // View mode and optimization state
    const [viewMode, setViewMode] = useState('compact');
    const [selectedNode, setSelectedNode] = useState(null);
    const [optimizationMode, setOptimizationMode] = useState(false);
    const [optimizationGoal, setOptimizationGoal] = useState('minimizeWorkers');
    const [optimizationConstraints, setOptimizationConstraints] = useState({
        maxPower: null,
        maxWorkers: null,
        maxMachines: null,
        maxMaintenance: null,
        maxComputing: null,
        excludedRecipes: [],
        tierRestrictions: null
    });
    const [optimizationResult, setOptimizationResult] = useState(null);
    const [optimizer, setOptimizer] = useState(null);

    const [recipeSelectionModalOpen, setRecipeSelectionModalOpen] = useState(false);

    // Load game data on mount
    useEffect(() => {
        document.title = 'Production Calculator - Captain of Industry Tools';

        const loadData = async () => {
            const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
            const gameData = await DataLoader.loadGameData(enabledMods);
            ProductionCalculator.initialize(gameData);

            const engine = new OptimizationEngine(ProductionCalculator);
            setOptimizer(engine);

            setDataLoaded(true);
        };

        loadData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    // When product changes, update available recipes
    useEffect(() => {
        if (selectedProduct) {
            const recipes = ProductionCalculator.getRecipesForProduct(selectedProduct);
            setAvailableRecipes(recipes);
            if (recipes.length === 1) {
                setSelectedRecipe(recipes[0].id);
            } else {
                setSelectedRecipe('');
            }
        } else {
            setAvailableRecipes([]);
            setSelectedRecipe('');
        }
    }, [selectedProduct]);

    if (!dataLoaded) {
        return (
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading game data...</h2>
                <p style={{ color: '#888', fontSize: '1.1rem' }}>
                    {settings.enableModdedContent && settings.enabledMods?.length > 0
                        ? `Loading base game + ${settings.enabledMods.length} mod(s)...`
                        : 'Loading base game data...'}
                </p>
                <div style={{
                    marginTop: '2rem',
                    width: '60px',
                    height: '60px',
                    border: '6px solid #333',
                    borderTop: '6px solid #4a90e2',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    const producibleProducts = ProductionCalculator.products
        .filter(product => {
            const recipes = ProductionCalculator.getRecipesForProduct(product.id);
            return recipes.length > 0;
        })
        .filter(product => {
            if (!searchTerm) return true;
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    const formatPower = (kw, unit) => {
        switch (unit) {
            case 'MW':
                return (kw / 1000).toFixed(2);
            case 'GW':
                return (kw / 1000000).toFixed(3);
            default:
                return kw.toFixed(0);
        }
    };

    const toggleNodeCollapse = (nodeId) => {
        setCollapsedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeId)) {
                newSet.delete(nodeId);
            } else {
                newSet.add(nodeId);
            }
            return newSet;
        });
    };

    const calculateSubtreeMetrics = (node) => {
        const metrics = { workers: 0, powerKw: 0, machines: 0, computing: 0, maintenance: 0 };

        const traverse = (n) => {
            if (!n) return;
            if (n.machine && !n.isRawMaterial) {
                const count = n.machineCount || 0;
                metrics.workers += (n.machine.workers || 0) * count;
                metrics.powerKw += (n.machine.electricityKw || 0) * count;
                metrics.machines += count;
                metrics.computing += (n.machine.computingTFlops || 0) * count;
                if (n.machine.maintenance?.perMonth) {
                    metrics.maintenance += n.machine.maintenance.perMonth * count;
                }
            }
            if (n.inputChains) {
                n.inputChains.forEach(traverse);
            }
        };

        traverse(node);
        return metrics;
    };

    const handleCalculate = () => {
        if (optimizationMode && optimizer) {
            const mergedConstraints = {
                ...optimizationConstraints,
                resourceLimits: resourceConstraints
            };

            const result = optimizer.optimize({
                targetProductId: selectedProduct,
                targetRate: targetRate,
                optimizationGoal,
                availableResources: resourceConstraints,
                constraints: mergedConstraints
            });

            setOptimizationResult(result);

            if (result.chain) {
                setProductionChain(result.chain);
                setRequirements(ProductionCalculator.calculateTotalRequirements(result.chain));
                setRecipeOverrides(result.recipeOverrides || new Map());
            }
        } else {
            if (!selectedProduct || !targetRate) return;

            const recipeToUse = selectedRecipe || null;
            const chain = ProductionCalculator.calculateProductionChain(
                selectedProduct,
                targetRate,
                recipeToUse,
                recipeOverrides,
                resourceSources
            );
            const reqs = ProductionCalculator.calculateTotalRequirements(chain);

            setProductionChain(chain);
            setRequirements(reqs);
            setOptimizationResult(null);
        }
    };

    const handleRecipeOverride = (productId, newRecipeId) => {
        const newOverrides = new Map(recipeOverrides);
        if (newRecipeId) {
            newOverrides.set(productId, newRecipeId);
        } else {
            newOverrides.delete(productId);
        }

        setRecipeOverrides(newOverrides);

        if (selectedProduct && targetRate) {
            const recipeToUse = selectedRecipe || null;
            const newChain = ProductionCalculator.calculateProductionChain(
                selectedProduct,
                targetRate,
                recipeToUse,
                newOverrides,
                resourceSources
            );
            const newReqs = ProductionCalculator.calculateTotalRequirements(newChain);
            setProductionChain(newChain);
            setRequirements(newReqs);
        }
    };

    const openRecipeModal = (productId, recipes) => {
        setRecipeModalProductId(productId);
        setRecipeModalRecipes(recipes);
        setRecipeModalOpen(true);
    };

    const closeRecipeModal = () => {
        setRecipeModalOpen(false);
        setRecipeModalProductId(null);
        setRecipeModalRecipes([]);
    };

    const selectRecipeFromModal = (recipeId) => {
        if (recipeModalProductId) {
            // Check if this is for resource source selection (machine production)
            if (resourceSourceModal.open && recipeModalProductId === resourceSourceModal.productId) {
                // User selected a recipe for machine production from resource source modal
                const newSources = new Map(resourceSources);
                newSources.set(resourceSourceModal.nodeKey, {
                    type: 'machine',
                    config: { recipeId: recipeId }
                });
                setResourceSources(newSources);

                // Close both modals
                setRecipeModalOpen(false);
                setRecipeModalProductId(null);
                setRecipeModalRecipes([]);
                setResourceSourceModal({ open: false, nodeKey: null, productId: null, productName: null, requiredRate: 0, currentSource: null });

                // Recalculate chain
                if (selectedProduct && targetRate) {
                    const newChain = ProductionCalculator.calculateProductionChain(
                        selectedProduct,
                        targetRate,
                        selectedRecipe || null,
                        recipeOverrides,
                        newSources
                    );
                    const newReqs = ProductionCalculator.calculateTotalRequirements(newChain);
                    setProductionChain(newChain);
                    setRequirements(newReqs);
                }
            } else if (recipeModalProductId === selectedProduct) {
                // Main product recipe selection
                setSelectedRecipe(recipeId);
                if (targetRate) {
                    const newChain = ProductionCalculator.calculateProductionChain(
                        selectedProduct,
                        targetRate,
                        recipeId,
                        recipeOverrides,
                        resourceSources
                    );
                    const newReqs = ProductionCalculator.calculateTotalRequirements(newChain);
                    setProductionChain(newChain);
                    setRequirements(newReqs);
                }
                setRecipeModalOpen(false);
                setRecipeModalProductId(null);
                setRecipeModalRecipes([]);
            } else {
                // Recipe override for a node
                handleRecipeOverride(recipeModalProductId, recipeId);
                setRecipeModalOpen(false);
                setRecipeModalProductId(null);
                setRecipeModalRecipes([]);
            }
        }
    };

    // NEW: Resource source management
    const openResourceSourceModal = (node) => {
        setResourceSourceModal({
            open: true,
            nodeKey: node.nodeKey,
            productId: node.productId,
            productName: node.product?.name || node.productId,
            requiredRate: node.targetRate,
            currentSource: node.resourceSource || { type: 'mining' }
        });
    };

    const selectResourceSource = (sourceType) => {
        const { nodeKey, productId, requiredRate } = resourceSourceModal;

        if (sourceType === 'storage') {
            // Open storage tier selector
            const product = ProductionCalculator.getProduct(productId);
            const tiers = ProductionCalculator.getStorageTierOptions(product, requiredRate);
            const optimal = tiers.find(t => t.isOptimal);

            setStorageTierModal({
                open: true,
                product,
                requiredRate,
                tiers,
                selectedTier: optimal
            });
        } else if (sourceType === 'machine') {
            // Open recipe selection for this product
            const recipes = ProductionCalculator.getRecipesForProduct(productId);
            if (recipes.length > 0) {
                // IMPORTANT: Keep source modal open, open recipe modal on top
                setRecipeModalProductId(productId);
                setRecipeModalRecipes(recipes);
                setRecipeModalOpen(true);
                // DON'T close resourceSourceModal - it stays open behind the recipe modal
            }
        } else {
            // Direct source selection (mining, worldMine, trade)
            const newSources = new Map(resourceSources);
            newSources.set(nodeKey, { type: sourceType });
            setResourceSources(newSources);
            setResourceSourceModal({ open: false, nodeKey: null, productId: null, productName: null, requiredRate: 0, currentSource: null });

            // Recalculate chain
            if (selectedProduct && targetRate) {
                const newChain = ProductionCalculator.calculateProductionChain(
                    selectedProduct,
                    targetRate,
                    selectedRecipe || null,
                    recipeOverrides,
                    newSources
                );
                const newReqs = ProductionCalculator.calculateTotalRequirements(newChain);
                setProductionChain(newChain);
                setRequirements(newReqs);
            }
        }
    };

    const selectStorageTier = (tier) => {
        const { nodeKey } = resourceSourceModal;

        const newSources = new Map(resourceSources);
        newSources.set(nodeKey, {
            type: 'storage',
            config: { tier: tier.tier, entityId: tier.entityId, count: tier.count }
        });
        setResourceSources(newSources);

        // Close modals
        setStorageTierModal({ open: false, product: null, requiredRate: 0, tiers: [], selectedTier: null });
        setResourceSourceModal({ open: false, nodeKey: null, productId: null, productName: null, requiredRate: 0, currentSource: null });

        // Recalculate chain
        if (selectedProduct && targetRate) {
            const newChain = ProductionCalculator.calculateProductionChain(
                selectedProduct,
                targetRate,
                selectedRecipe || null,
                recipeOverrides,
                newSources
            );
            const newReqs = ProductionCalculator.calculateTotalRequirements(newChain);
            setProductionChain(newChain);
            setRequirements(newReqs);
        }
    };

    const addResourceConstraint = () => {
        if (!resourceInput.productId || resourceInput.quantity <= 0) return;

        const newConstraints = new Map(resourceConstraints);
        newConstraints.set(resourceInput.productId, resourceInput.quantity);
        setResourceConstraints(newConstraints);
        setResourceInput({ productId: '', productName: '', quantity: 0 });
    };

    const removeResourceConstraint = (productId) => {
        const newConstraints = new Map(resourceConstraints);
        newConstraints.delete(productId);
        setResourceConstraints(newConstraints);
    };

    // NEW: Recipe time toggle handler
    const toggleRecipeTime = (recipeId) => {
        setRecipeTimeToggles(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(recipeId);
            // If undefined, use global setting; otherwise toggle
            if (current === undefined) {
                newMap.set(recipeId, !settings.showRecipeTimePerMinute);
            } else {
                newMap.set(recipeId, !current);
            }
            return newMap;
        });
    };

    const getRecipeTimeDisplay = (recipeId) => {
        const toggle = recipeTimeToggles.get(recipeId);
        return toggle !== undefined ? toggle : settings.showRecipeTimePerMinute;
    };

    // Compact node rendering (with + button for raw materials)
    const renderCompactNode = (node, level = 0, parentPath = '') => {
        if (!node) return null;

        const nodeId = `${parentPath}-${node.productId}-${level}`;
        const isCollapsed = collapsedNodes.has(nodeId);
        const hasChildren = node.inputChains && node.inputChains.length > 0;
        const product = node.product;
        const productIcon = getProductIcon(product);

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

        return (
            <div key={nodeId} style={{ marginBottom: '4px' }}>
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
                            if (hasChildren) toggleNodeCollapse(nodeId);
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
                        onClick={() => setSelectedNode(node)}
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

                        <span style={{ fontWeight: '600', color: '#fff', fontSize: '0.95rem', minWidth: '180px' }}>
                            {product?.name || node.productId}
                            {node.isRawMaterial && (
                                <span style={{ marginLeft: '6px', fontSize: '0.7rem', color: '#FFD700', backgroundColor: 'rgba(255,215,0,0.15)', padding: '2px 6px', borderRadius: '3px' }}>
                                    RAW
                                </span>
                            )}
                        </span>

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

                    {/* + Button for raw materials */}
                    {node.isRawMaterial && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openResourceSourceModal(node);
                            }}
                            style={{
                                marginLeft: '8px',
                                padding: '4px 8px',
                                backgroundColor: '#4a90e2',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                fontWeight: '700',
                                transition: 'all 0.15s'
                            }}
                            title="Change resource source"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#5aa0f2';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#4a90e2';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            +
                        </button>
                    )}
                </div>

                {hasChildren && !isCollapsed && (
                    <div style={{ marginTop: '4px' }}>
                        {node.inputChains.map((child, idx) => renderCompactNode(child, level + 1, nodeId))}
                    </div>
                )}

            </div>
        );
    };

    const renderProductionNode = (node, level = 0, parentPath = '') => {
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
            <div key={nodeId} style={{ marginLeft: `${indent}px`, marginBottom: '10px' }}>
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
                            onClick={() => toggleNodeCollapse(nodeId)}
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
                                        {/* Source icon */}
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
                                            onClick={() => openResourceSourceModal(node)}
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
                                            onClick={() => openRecipeModal(node.productId, node.availableRecipes)}
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
                                                    onToggleTime={toggleRecipeTime}
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
                        {node.inputChains.map((childNode, idx) => renderProductionNode(childNode, level + 1, nodeId))}
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

    // Helper function to find the updated node in the new chain by matching nodeKey
    const findNodeInChain = (chain, nodeKey) => {
        if (!chain || !nodeKey) return null;

        const search = (node) => {
            if (node.nodeKey === nodeKey) return node;
            if (node.inputChains && node.inputChains.length > 0) {
                for (const child of node.inputChains) {
                    const found = search(child);
                    if (found) return found;
                }
            }
            return null;
        };

        return search(chain);
    };

    const renderDetailsPanel = () => {
        if (!selectedNode) {
            return (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#888',
                    fontSize: '0.95rem',
                    fontStyle: 'italic'
                }}>
                    Click on a node to view details
                </div>
            );
        }

        // CRITICAL FIX: Get the UPDATED node from the current production chain
        // This ensures we show fresh data after recipe changes
        const updatedNode = findNodeInChain(productionChain, selectedNode.nodeKey) || selectedNode;

        const product = updatedNode.product;
        const productIcon = getProductIcon(product);
        const machineImage = updatedNode.machine ? getMachineImage(updatedNode.machine) : null;
        const hasMultipleRecipes = updatedNode.availableRecipes && updatedNode.availableRecipes.length > 1;
        const currentRecipeId = recipeOverrides.get(updatedNode.productId) || updatedNode.recipe?.id;
        const currentRecipe = updatedNode.availableRecipes?.find(r => r.id === currentRecipeId) || updatedNode.recipe;

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #444' }}>
                    {productIcon && (
                        <img src={productIcon} alt={product?.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                    )}
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                            {product?.name || updatedNode.productId}
                        </h4>
                        <div style={{ color: '#4a90e2', fontSize: '1rem', fontWeight: '600' }}>
                            {updatedNode.targetRate?.toFixed(2)} /min
                        </div>
                    </div>
                    {updatedNode.isRawMaterial && (
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

                {currentRecipe && !updatedNode.isRawMaterial && (
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
                                onToggleTime={toggleRecipeTime}
                            />
                        </div>

                        {hasMultipleRecipes && (
                            <button
                                onClick={() => openRecipeModal(updatedNode.productId, updatedNode.availableRecipes)}
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
                                View {updatedNode.availableRecipes.length} Available Recipes
                            </button>
                        )}
                    </div>
                )}

                {updatedNode.machine && !updatedNode.isRawMaterial && (
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
                                    <img src={machineImage} alt={updatedNode.machine.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                                )}
                                <div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff' }}>
                                        {updatedNode.machine.name}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#4a90e2', fontWeight: '600' }}>
                                        × {updatedNode.machineCount}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFD700' }}>
                                    {getGeneralIcon('Electricity') && <img src={getGeneralIcon('Electricity')} style={{ width: '18px', height: '18px' }} />}
                                    <span style={{ fontWeight: '700' }}>
                                        {(updatedNode.machine.electricityKw * updatedNode.machineCount).toFixed(0)} kW
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#50C878' }}>
                                    {getGeneralIcon('Worker') && <img src={getGeneralIcon('Worker')} style={{ width: '18px', height: '18px' }} />}
                                    <span style={{ fontWeight: '700' }}>
                                        {updatedNode.machine.workers * updatedNode.machineCount} workers
                                    </span>
                                </div>
                                {updatedNode.machine.computingTFlops > 0 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4a90e2' }}>
                                        {getGeneralIcon('Computing') && <img src={getGeneralIcon('Computing')} style={{ width: '18px', height: '18px' }} />}
                                        <span style={{ fontWeight: '700' }}>
                                            {(updatedNode.machine.computingTFlops * updatedNode.machineCount).toFixed(1)} TF
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {updatedNode.inputs && updatedNode.inputs.length > 0 && (
                    <div>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px', fontWeight: '600' }}>
                            Inputs Required:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {updatedNode.inputs.map((input, idx) => {
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
    };

    return (
        <div style={{
            maxWidth: '1920px',
            margin: '0 auto',
            minHeight: '100vh'
        }}>
            <div style={{
                padding: '1.5rem 2rem',
                backgroundColor: '#2a2a2a',
                borderBottom: '2px solid #4a90e2',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                marginBottom: '2rem'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #4a90e2 0%, #5aa0f2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Production Calculator
                </h2>
                <p style={{
                    color: '#aaa',
                    fontSize: '1rem',
                    margin: 0
                }}>
                    Calculate production chains, resource requirements, and optimize your factory planning • {ProductionCalculator.products.length} products available
                </p>
            </div>

            <div style={{ padding: '0 2rem 2rem' }}>
                {/* MODALS */}

                {/* Recipe Selection Modal (for node recipes) */}
                <RecipeModal
                    isOpen={recipeModalOpen}
                    onClose={() => {
                        // If source modal is open, just close recipe modal
                        if (resourceSourceModal.open) {
                            setRecipeModalOpen(false);
                            setRecipeModalProductId(null);
                            setRecipeModalRecipes([]);
                        } else {
                            closeRecipeModal();
                        }
                    }}
                    recipes={recipeModalRecipes}
                    currentRecipeId={recipeOverrides.get(recipeModalProductId) || recipeModalRecipes[0]?.id}
                    onSelectRecipe={selectRecipeFromModal}
                    getRecipeTimeDisplay={getRecipeTimeDisplay}
                    onToggleTime={toggleRecipeTime}
                />

                {/* Main Product Recipe Selection Modal */}
                <RecipeModal
                    isOpen={recipeSelectionModalOpen && availableRecipes.length > 1}
                    onClose={() => setRecipeSelectionModalOpen(false)}
                    recipes={availableRecipes}
                    currentRecipeId={selectedRecipe}
                    onSelectRecipe={(recipeId) => {
                        setSelectedRecipe(recipeId);
                        setRecipeSelectionModalOpen(false);
                    }}
                    getRecipeTimeDisplay={getRecipeTimeDisplay}
                    onToggleTime={toggleRecipeTime}
                />

                {/* Resource Source Modal */}
                {resourceSourceModal.open && (
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
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={(e) => {
                            // Only close if NOT clicking inside modal and recipe modal is not open
                            if (e.target === e.currentTarget && !recipeModalOpen) {
                                setResourceSourceModal({ open: false, nodeKey: null, productId: null, productName: null, requiredRate: 0, currentSource: null });
                            }
                        }}
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
                                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)'
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
                                Select Source for {resourceSourceModal.productName}
                            </h3>
                            <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                                Required: {resourceSourceModal.requiredRate?.toFixed(1)}/min
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    {
                                        type: 'mining',
                                        icon: getGeneralIcon('Mining'),
                                        label: 'Mining (Local)',
                                        description: 'Extract from local deposits',
                                        emoji: null // No emoji, use icon only
                                    },
                                    {
                                        type: 'worldMine',
                                        icon: getGeneralIcon('Mine'),
                                        label: 'World Mine',
                                        description: 'Import from world map mines',
                                        emoji: null // No emoji, use icon only
                                    },
                                    {
                                        type: 'trade',
                                        icon: getGeneralIcon('Trade'),
                                        label: 'Trade/Contract',
                                        description: 'Purchase via contracts',
                                        emoji: null // No emoji, use icon only
                                    },
                                    {
                                        type: 'storage',
                                        icon: getProductTypeIcon(ProductionCalculator.getProduct(resourceSourceModal.productId)?.type),
                                        label: 'Storage',
                                        description: 'Provided from storage',
                                        emoji: null // No emoji, use icon only
                                    },
                                    {
                                        type: 'machine',
                                        icon: getGeneralIcon('Machines'),
                                        label: 'Machine Production',
                                        description: 'Produce with recipes',
                                        disabled: !ProductionCalculator.getRecipesForProduct(resourceSourceModal.productId)?.length,
                                        emoji: null // No emoji, use icon only
                                    }
                                ].map(option => {
                                    if (option.disabled) return null;
                                    const isSelected = resourceSourceModal.currentSource?.type === option.type;

                                    return (
                                        <button
                                            key={option.type}
                                            onClick={() => selectResourceSource(option.type)}
                                            style={{
                                                padding: '1rem',
                                                backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                                                border: isSelected ? '2px solid #4a90e2' : '2px solid #444',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                textAlign: 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.backgroundColor = '#252525';
                                                    e.currentTarget.style.borderColor = '#5aa0f2';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                                                    e.currentTarget.style.borderColor = '#444';
                                                }
                                            }}
                                        >
                                            {option.icon ? (
                                                <img src={option.icon} alt={option.label} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                                            ) : option.emoji && (
                                                <span style={{ fontSize: '32px', lineHeight: 1 }}>{option.emoji}</span>
                                            )}
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '2px' }}>
                                                    {option.emoji && <span style={{ marginRight: '8px' }}>{option.emoji}</span>}
                                                    {option.label}
                                                    {isSelected && (
                                                        <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: '#4a90e2', backgroundColor: 'rgba(74, 144, 226, 0.2)', padding: '2px 6px', borderRadius: '3px' }}>
                                                            DEFAULT
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                                    {option.description}
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div style={{ fontSize: '1.5rem', color: '#4a90e2' }}>⦿</div>
                                            )}
                                            {!isSelected && (
                                                <div style={{ fontSize: '1.5rem', color: '#555' }}>○</div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Storage Tier Selection Modal */}
                {storageTierModal.open && (
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
                            zIndex: 1001,
                            padding: '2rem'
                        }}
                        onClick={() => setStorageTierModal({ open: false, product: null, requiredRate: 0, tiers: [], selectedTier: null })}
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
                                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)'
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
                                Storage Tiers for {storageTierModal.product?.name}
                            </h3>
                            <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                                Required throughput: {storageTierModal.requiredRate?.toFixed(1)}/min
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {storageTierModal.tiers.map(tier => {
                                    const storageIcon = getEntityIcon({ id: tier.entityId });
                                    const isOptimal = tier.isOptimal;

                                    return (
                                        <button
                                            key={tier.tier}
                                            onClick={() => selectStorageTier(tier)}
                                            style={{
                                                padding: '1rem',
                                                backgroundColor: isOptimal ? 'rgba(255, 215, 0, 0.1)' : '#1a1a1a',
                                                border: isOptimal ? '2px solid #FFD700' : '2px solid #444',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                textAlign: 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isOptimal) {
                                                    e.currentTarget.style.backgroundColor = '#252525';
                                                    e.currentTarget.style.borderColor = '#5aa0f2';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isOptimal) {
                                                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                                                    e.currentTarget.style.borderColor = '#444';
                                                }
                                            }}
                                        >
                                            {storageIcon && (
                                                <img src={storageIcon} alt={`Tier ${tier.tier}`} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                            )}
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                                                    {storageTierModal.product?.type} Storage {tier.tier > 1 ? `Tier ${tier.tier}` : ''}
                                                    {isOptimal && (
                                                        <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#50C878', backgroundColor: 'rgba(80, 200, 120, 0.2)', padding: '2px 8px', borderRadius: '3px', fontWeight: '700' }}>
                                                            ⭐ BEST
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '4px' }}>
                                                    Throughput: {tier.throughput}/min each
                                                </div>
                                                <div style={{ fontSize: '0.9rem', color: tier.count === 1 ? '#50C878' : '#FFD700', fontWeight: '600' }}>
                                                    → Need {tier.count} storage{tier.count > 1 ? 's' : ''} {tier.count === 1 ? '✅' : ''}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mode Toggle and Controls */}
                <div style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    {/* Optimization toggle */}
                    <button
                        onClick={() => setOptimizationMode(!optimizationMode)}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: optimizationMode ? '#50C878' : '#555',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            fontWeight: '700',
                            transition: 'all 0.2s',
                            boxShadow: optimizationMode ? '0 2px 8px rgba(80, 200, 120, 0.3)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {optimizationMode ? '✓ Optimization ON' : '⚙️ Enable Optimization'}
                    </button>

                    {/* Clear/Reset Button */}
                    <button
                        onClick={() => {
                            setSelectedProduct('');
                            setSelectedRecipe('');
                            setTargetRate(60);
                            setSearchTerm('');
                            setResourceConstraints(new Map());
                            setResourceInput({ productId: '', productName: '', quantity: 0 });
                            setProductionChain(null);
                            setRequirements(null);
                            setRecipeOverrides(new Map());
                            setResourceSources(new Map());
                            setRecipeTimeToggles(new Map());
                            setCollapsedNodes(new Set());
                            setOptimizationMode(false);
                            setOptimizationResult(null);
                            setSelectedNode(null);
                            setOptimizationConstraints({
                                maxPower: null,
                                maxWorkers: null,
                                maxMachines: null,
                                maxMaintenance: null,
                                maxComputing: null,
                                excludedRecipes: [],
                                tierRestrictions: null
                            });
                        }}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            fontWeight: '700',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff5252';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff6b6b';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)';
                        }}
                    >
                        🗑️ Clear All
                    </button>
                </div>

                {/* Optimization Controls */}
                {optimizationMode && (
                    <div style={{
                        backgroundColor: '#2a4a2a',
                        padding: '1.5rem',
                        borderRadius: '10px',
                        marginBottom: '1.5rem',
                        border: '2px solid #50C878',
                        boxShadow: '0 4px 12px rgba(80, 200, 120, 0.2)'
                    }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700', color: '#50C878' }}>
                            ⚙️ Optimization Settings
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {/* Optimization Goal */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                                    Optimization Goal
                                </label>
                                <select
                                    value={optimizationGoal}
                                    onChange={(e) => setOptimizationGoal(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#333',
                                        color: 'white',
                                        border: '2px solid #50C878',
                                        borderRadius: '6px',
                                        fontSize: '1rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="minimizeWorkers">Minimize Workers</option>
                                    <option value="minimizePower">Minimize Power (kW)</option>
                                    <option value="minimizeMachines">Minimize Machines</option>
                                    <option value="minimizeMaintenance">Minimize Maintenance</option>
                                    <option value="minimizeComputing">Minimize Computing</option>
                                    <option value="maximizeProduction">Maximize Production</option>
                                </select>
                            </div>

                            {/* Constraints */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                                    Constraints (Optional)
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="number"
                                        placeholder="Max Power (kW)"
                                        value={optimizationConstraints.maxPower || ''}
                                        onChange={(e) => setOptimizationConstraints({
                                            ...optimizationConstraints,
                                            maxPower: e.target.value ? parseFloat(e.target.value) : null
                                        })}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            backgroundColor: '#333',
                                            color: 'white',
                                            border: '2px solid #555',
                                            borderRadius: '6px',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max Workers"
                                        value={optimizationConstraints.maxWorkers || ''}
                                        onChange={(e) => setOptimizationConstraints({
                                            ...optimizationConstraints,
                                            maxWorkers: e.target.value ? parseFloat(e.target.value) : null
                                        })}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            backgroundColor: '#333',
                                            color: 'white',
                                            border: '2px solid #555',
                                            borderRadius: '6px',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max Machines"
                                        value={optimizationConstraints.maxMachines || ''}
                                        onChange={(e) => setOptimizationConstraints({
                                            ...optimizationConstraints,
                                            maxMachines: e.target.value ? parseFloat(e.target.value) : null
                                        })}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            backgroundColor: '#333',
                                            color: 'white',
                                            border: '2px solid #555',
                                            borderRadius: '6px',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Resource Constraints Section */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                                Resource Limits (Optional)
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px auto', gap: '1rem', alignItems: 'end', marginBottom: '1rem' }}>
                                <div>
                                    <input
                                        type="text"
                                        list="all-products-list"
                                        placeholder="Select resource..."
                                        value={resourceInput.productName}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            setResourceInput({ ...resourceInput, productName: inputValue });
                                            const match = ProductionCalculator.products.find(p => p.name.toLowerCase() === inputValue.toLowerCase());
                                            if (match) {
                                                setResourceInput({ ...resourceInput, productId: match.id, productName: match.name });
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            backgroundColor: '#333',
                                            color: 'white',
                                            border: '2px solid #555',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <datalist id="all-products-list">
                                        {ProductionCalculator.products.map(product => (
                                            <option key={product.id} value={product.name} />
                                        ))}
                                    </datalist>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Max /min"
                                    value={resourceInput.quantity || ''}
                                    onChange={(e) => setResourceInput({ ...resourceInput, quantity: parseFloat(e.target.value) })}
                                    min="0"
                                    step="1"
                                    style={{
                                        padding: '12px',
                                        backgroundColor: '#333',
                                        color: 'white',
                                        border: '2px solid #555',
                                        borderRadius: '6px',
                                        fontSize: '1rem'
                                    }}
                                />
                                <button
                                    onClick={addResourceConstraint}
                                    disabled={!resourceInput.productId || !resourceInput.quantity}
                                    style={{
                                        padding: '12px 24px',
                                        backgroundColor: resourceInput.productId && resourceInput.quantity ? '#4a90e2' : '#555',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '1rem',
                                        cursor: resourceInput.productId && resourceInput.quantity ? 'pointer' : 'not-allowed',
                                        fontWeight: '600'
                                    }}
                                >
                                    Add Limit
                                </button>
                            </div>

                            {/* Resource Constraint List */}
                            {resourceConstraints.size > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {Array.from(resourceConstraints.entries()).map(([productId, maxRate]) => {
                                        const product = ProductionCalculator.getProduct(productId);
                                        const icon = getProductIcon(product);
                                        return (
                                            <div key={productId} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                backgroundColor: '#1a1a1a',
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid #50C878'
                                            }}>
                                                {icon && <img src={icon} alt={product?.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />}
                                                <span style={{ color: '#fff', fontWeight: '600' }}>{product?.name}</span>
                                                <span style={{ color: '#888' }}>≤</span>
                                                <span style={{ color: '#50C878', fontWeight: 'bold' }}>{maxRate}/min</span>
                                                <button
                                                    onClick={() => removeResourceConstraint(productId)}
                                                    style={{
                                                        marginLeft: '8px',
                                                        padding: '2px 8px',
                                                        backgroundColor: '#ff6b6b',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Optimization Result Summary */}
                        {optimizationResult && !optimizationResult.error && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '12px',
                                backgroundColor: 'rgba(80, 200, 120, 0.1)',
                                border: '1px solid rgba(80, 200, 120, 0.3)',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                color: '#50C878'
                            }}>
                                ✓ {optimizationResult.explanation}
                                {optimizationResult.alternatives?.length > 0 && (
                                    <span style={{ color: '#888', marginLeft: '8px' }}>
                                        ({optimizationResult.alternatives.length} alternative{optimizationResult.alternatives.length > 1 ? 's' : ''} found)
                                    </span>
                                )}
                            </div>
                        )}

                        {optimizationResult?.error && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '12px',
                                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                border: '1px solid rgba(255, 107, 107, 0.3)',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                color: '#ff6b6b'
                            }}>
                                ⚠️ {optimizationResult.error}
                            </div>
                        )}
                    </div>
                )}

                {/* Input Section */}
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '2rem',
                    borderRadius: '10px',
                    marginBottom: '2rem',
                    border: '1px solid #444',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 200px auto', gap: '1.5rem', alignItems: 'end' }}>
                        {/* Product Search/Select */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                                Target Product
                            </label>
                            <input
                                type="text"
                                list="products-list"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    const match = producibleProducts.find(p => p.name.toLowerCase() === e.target.value.toLowerCase());
                                    if (match) {
                                        setSelectedProduct(match.id);
                                    }
                                }}
                                onBlur={(e) => {
                                    const match = producibleProducts.find(p => p.name.toLowerCase() === e.target.value.toLowerCase());
                                    if (match) {
                                        setSelectedProduct(match.id);
                                        setSearchTerm(match.name);
                                    }
                                }}
                                placeholder="Search and select product..."
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: '2px solid #555',
                                    borderRadius: '6px',
                                    fontSize: '1rem'
                                }}
                            />
                            <datalist id="products-list">
                                {producibleProducts.slice(0, 200).map(product => (
                                    <option key={product.id} value={product.name}>
                                        {product.name} ({product.type})
                                    </option>
                                ))}
                            </datalist>
                        </div>

                        {/* Recipe Selection - BUTTON */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                                Recipe {availableRecipes.length > 1 && <span style={{ color: '#4a90e2' }}>({availableRecipes.length} available)</span>}
                            </label>
                            <button
                                onClick={() => {
                                    if (availableRecipes.length > 1) {
                                        setRecipeSelectionModalOpen(true);
                                    }
                                }}
                                disabled={availableRecipes.length <= 1}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: availableRecipes.length > 1 ? '#333' : '#2a2a2a',
                                    color: 'white',
                                    border: '2px solid #555',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    cursor: availableRecipes.length > 1 ? 'pointer' : 'not-allowed',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (availableRecipes.length > 1) {
                                        e.currentTarget.style.backgroundColor = '#3a3a3a';
                                        e.currentTarget.style.borderColor = '#4a90e2';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (availableRecipes.length > 1) {
                                        e.currentTarget.style.backgroundColor = '#333';
                                        e.currentTarget.style.borderColor = '#555';
                                    }
                                }}
                            >
                                <span>
                                    {availableRecipes.length === 0 ? 'Select product first' :
                                        availableRecipes.length === 1 ? availableRecipes[0].name :
                                            selectedRecipe ? availableRecipes.find(r => r.id === selectedRecipe)?.name : 'Select recipe...'}
                                </span>
                                {availableRecipes.length > 1 && <span style={{ color: '#4a90e2' }}>▼</span>}
                            </button>
                        </div>

                        {/* Target Rate */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                                Rate (/min)
                            </label>
                            <input
                                type="number"
                                value={targetRate}
                                onChange={(e) => setTargetRate(parseFloat(e.target.value))}
                                min="0.1"
                                step="1"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: '2px solid #555',
                                    borderRadius: '6px',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {/* Calculate Button */}
                        <button
                            onClick={handleCalculate}
                            disabled={!selectedProduct || !targetRate}
                            style={{
                                padding: '12px 32px',
                                backgroundColor: selectedProduct && targetRate ? '#4a90e2' : '#555',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                cursor: selectedProduct && targetRate ? 'pointer' : 'not-allowed',
                                fontWeight: '700',
                                transition: 'all 0.2s',
                                boxShadow: selectedProduct && targetRate ? '0 2px 8px rgba(74, 144, 226, 0.4)' : 'none',
                                height: '48px'
                            }}
                        >
                            Calculate
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                {productionChain && requirements && (
                    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem', alignItems: 'start', paddingBottom: '3rem' }}>
                        {/* LEFT: Details Panel - STICKY with scroll */}
                        <div style={{
                            position: 'sticky',
                            top: '2rem',
                            maxHeight: 'calc(100vh - 4rem)',
                            overflowY: 'auto'
                        }}>
                            <div style={{
                                backgroundColor: '#2a2a2a',
                                padding: '1.5rem',
                                borderRadius: '10px',
                                border: '1px solid #444',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                            }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                                    {viewMode === 'compact' && selectedNode ? 'Node Details' : 'Total Requirements'}
                                </h3>

                                {viewMode === 'compact' ? (
                                    renderDetailsPanel()
                                ) : (
                                    <>
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
                                                                onClick={() => setPowerUnit(unit)}
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
                                            <div>
                                                <h4 style={{ marginBottom: '0.75rem', color: '#ccc', fontSize: '1.1rem', fontWeight: '600' }}>
                                                    Maintenance:
                                                </h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    {Array.from(requirements.maintenance.entries()).map(([productId, perMonth]) => {
                                                        const product = ProductionCalculator.getProduct(productId);
                                                        return (
                                                            <div key={productId} style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                backgroundColor: '#1a1a1a',
                                                                padding: '8px 12px',
                                                                borderRadius: '4px',
                                                                fontSize: '0.9rem'
                                                            }}>
                                                                <span style={{ color: '#ddd' }}>{product?.name || productId}</span>
                                                                <span style={{ color: '#fff', fontWeight: 'bold' }}>{perMonth.toFixed(2)}/mo</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Production Chain */}
                        <div style={{
                            backgroundColor: '#2a2a2a',
                            padding: '1.5rem',
                            borderRadius: '10px',
                            border: '1px solid #444',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
                                    Production Chain
                                    {recipeOverrides.size > 0 && (
                                        <span style={{ fontSize: '0.9rem', color: '#4a90e2', marginLeft: '12px', fontWeight: '400' }}>
                                            ({recipeOverrides.size} custom recipe{recipeOverrides.size > 1 ? 's' : ''})
                                        </span>
                                    )}
                                </h3>

                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    backgroundColor: '#1a1a1a',
                                    padding: '0.3rem',
                                    borderRadius: '6px',
                                    border: '1px solid #444'
                                }}>
                                    <button
                                        onClick={() => setViewMode('compact')}
                                        style={{
                                            padding: '6px 16px',
                                            backgroundColor: viewMode === 'compact' ? '#4a90e2' : 'transparent',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Compact
                                    </button>
                                    <button
                                        onClick={() => setViewMode('detailed')}
                                        style={{
                                            padding: '6px 16px',
                                            backgroundColor: viewMode === 'detailed' ? '#4a90e2' : 'transparent',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Detailed
                                    </button>
                                </div>
                            </div>

                            {productionChain.error ? (
                                <div style={{
                                    color: '#ff6b6b',
                                    padding: '1.5rem',
                                    backgroundColor: '#3a2a2a',
                                    borderRadius: '6px',
                                    border: '1px solid #ff6b6b'
                                }}>
                                    <strong>Error:</strong> {productionChain.error}
                                </div>
                            ) : (
                                <div>
                                    {viewMode === 'detailed' ? (
                                        <>
                                            <div style={{
                                                marginBottom: '1rem',
                                                padding: '10px',
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                color: '#888',
                                                border: '1px solid #333'
                                            }}>
                                                💡 <strong style={{ color: '#4a90e2' }}>Tip:</strong> Nodes with a blue border have multiple recipes available.
                                                Click the recipe card to view and select alternatives! Raw materials show a "+ Change Source" button.
                                            </div>
                                            {renderProductionNode(productionChain)}
                                        </>
                                    ) : (
                                        <>
                                            <div style={{
                                                marginBottom: '1rem',
                                                padding: '10px',
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                color: '#888',
                                                border: '1px solid #333'
                                            }}>
                                                💡 <strong style={{ color: '#4a90e2' }}>Compact Mode:</strong> Click ▶/▼ to expand/collapse. Click a node to view details.
                                                Raw materials show a "+" button to change their source.
                                            </div>
                                            {renderCompactNode(productionChain)}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calculator;
