import { useEffect, useState, useCallback } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { useSettings } from '../contexts/SettingsContext';
import { getProductIcon, getMachineImage, getGeneralIcon, getProductTypeIcon, getEntityIcon } from '../utils/AssetHelper';
import RecipeModal from '../components/RecipeModal';
import ProductSelectorModal from '../components/ProductSelectorModal';
import ResourceSourceModal from '../components/ResourceSourceModal';
import StorageTierModal from '../components/StorageTierModal';
import OptimizationControls from '../components/OptimizationControls';
import DetailsPanel from '../components/DetailsPanel';
import ProductionNode from '../components/ProductionNode';
import CompactNode from '../components/CompactNode';
import ProductionSolver from '../utils/ProductionSolver';
import { GameDataManager } from '../managers/GameDataManager';
import ConsolidatedResourcesPanel from '../components/ConsolidatedResourcesPanel';
import LoadingOverlay from '../components/LoadingOverlay';
import RecipeCard from '../components/RecipeCard';
import { getProducibleProducts } from '../utils/ProductHelper';

const Calculator = () => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);

    // Core calculator state
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [targetRate, setTargetRate] = useState(60);
    const [isEditingRate, setIsEditingRate] = useState(false);
    const [productionChain, setProductionChain] = useState(null);
    const [requirements, setRequirements] = useState(null);
    const [availableRecipes, setAvailableRecipes] = useState([]);
    const [recipeOverrides, setRecipeOverrides] = useState(new Map());
    const [recipeModalOpen, setRecipeModalOpen] = useState(false);
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [recipeModalProductId, setRecipeModalProductId] = useState(null);
    const [recipeModalRecipes, setRecipeModalRecipes] = useState([]);
    const [powerUnit, setPowerUnit] = useState('kW');
    const [collapsedNodes, setCollapsedNodes] = useState(new Set());
    const [useConsolidation, setUseConsolidation] = useState(false);
    const [showResourcePoolDetail, setShowResourcePoolDetail] = useState(false);
    const [selectedAlternative, setSelectedAlternative] = useState('best');
    const [disabledRecipes, setDisabledRecipes] = useState(new Set());
    const [isCalculating, setIsCalculating] = useState(false);
    const [showAdvancedOptimization, setShowAdvancedOptimization] = useState(false);

    // Resource source management
    const [resourceSources, setResourceSources] = useState(new Map());
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
        selectedTier: null,
        applyToAll: false
    });

    // Recipe time display toggles
    const [recipeTimeToggles, setRecipeTimeToggles] = useState(new Map());

    // Resource constraints
    const [resourceConstraints, setResourceConstraints] = useState(new Map());
    const [resourceInput, setResourceInput] = useState({ productId: '', productName: '', quantity: 0 });

    // View mode and optimization state
    const [viewMode, setViewMode] = useState('compact');
    const [selectedNode, setSelectedNode] = useState(null);
    const [optimizationMode, setOptimizationMode] = useState(false);
    const [optimizationGoal, setOptimizationGoal] = useState('maximizeProduction');
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
    const [solver] = useState(() => ProductionSolver);

    const [recipeSelectionModalOpen, setRecipeSelectionModalOpen] = useState(false);

    // Helper: Find all nodes in chain with the same productId (for "apply to all" feature)
    // Matches nodes that show the "+" button (raw materials OR single-recipe hybrids)
    const findAllNodesWithProduct = useCallback((chain, productId, excludeNodeKey = null) => {
        if (!chain || !productId) return [];

        const matches = [];

        const search = (node) => {
            // Match the same condition as showSourceButton in CompactNode:
            // raw materials OR single-recipe hybrids using machine
            const showsSourceButton = node.isRawMaterial ||
                (!node.isRawMaterial && node.availableRecipes && node.availableRecipes.length === 1);

            if (node.productId === productId && showsSourceButton && node.nodeKey !== excludeNodeKey) {
                matches.push(node);
            }
            if (node.inputChains && node.inputChains.length > 0) {
                for (const child of node.inputChains) {
                    search(child);
                }
            }
        };

        search(chain);
        return matches;
    }, []);

    // Helper: Count matching nodes for the "apply to all" toggle
    const getMatchingNodeCount = useCallback(() => {
        if (!productionChain || !resourceSourceModal.productId) return 0;
        const matches = findAllNodesWithProduct(
            productionChain,
            resourceSourceModal.productId,
            resourceSourceModal.nodeKey
        );
        return matches.length;
    }, [productionChain, resourceSourceModal.productId, resourceSourceModal.nodeKey, findAllNodesWithProduct]);

    const handleCalculate = useCallback(async () => {
        if (!selectedProduct || !targetRate) return;

        setIsCalculating(true);

        setTimeout(() => {
            try {
                const effectiveOverrides = new Map(recipeOverrides);
                if (selectedRecipe && !effectiveOverrides.has(selectedProduct)) {
                    effectiveOverrides.set(selectedProduct, selectedRecipe);
                }

                const result = solver.solve({
                    targetProductId: selectedProduct,
                    targetRate: targetRate,
                    useConsolidation: useConsolidation,
                    resourceSources: resourceSources,
                    recipeOverrides: effectiveOverrides,
                    optimizationMode: optimizationMode,
                    optimizationGoal: optimizationGoal,
                    constraints: optimizationMode ? {
                        ...optimizationConstraints,
                        resourceLimits: resourceConstraints,
                        disabledRecipes: disabledRecipes
                    } : {
                        disabledRecipes: disabledRecipes
                    },
                    resourceConstraints: resourceConstraints,
                    disabledRecipes: disabledRecipes
                });

                if (result.error) {
                    console.error('Calculation error:', result.error);
                    setProductionChain({ error: result.error });
                    setRequirements(null);
                    setOptimizationResult({
                        error: result.error,
                        alternatives: []
                    });
                    setSelectedAlternative('best');
                    return;
                }

                setProductionChain(result.chain);
                setRequirements(result.requirements);

                if (result.optimized) {
                    setOptimizationResult({
                        score: result.score,
                        metrics: result.metrics,
                        alternatives: result.alternatives,
                        explanation: result.explanation
                    });
                    setRecipeOverrides(result.recipeOverrides || new Map());
                } else {
                    setOptimizationResult(null);
                }
            } finally {
                setIsCalculating(false);
            }
        }, 10);
    }, [
        selectedProduct,
        targetRate,
        selectedRecipe,
        recipeOverrides,
        useConsolidation,
        resourceSources,
        optimizationMode,
        optimizationGoal,
        optimizationConstraints,
        resourceConstraints,
        disabledRecipes,
        solver
    ]);

    // Load game data on mount
    useEffect(() => {
        document.title = 'Production Calculator - Captain of Industry Tools';

        const loadData = async () => {
            const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
            await GameDataManager.getGameData(enabledMods);
            await ProductionCalculator.initialize();
            setDataLoaded(true);
        };

        loadData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    useEffect(() => {
        if (dataLoaded && !selectedProduct) {
            const defaultProductId = 'Product_ConstructionParts';
            setSelectedProduct(defaultProductId);
        }
    }, [dataLoaded, selectedProduct]);

    useEffect(() => {
        if (productionChain && !productionChain.error && selectedProduct && targetRate > 0) {
            handleCalculate();
        }
    }, [targetRate]);

    // When product changes, update available recipes
    useEffect(() => {
        if (selectedProduct) {
            const recipes = ProductionCalculator.getRecipesForProduct(selectedProduct);
            setAvailableRecipes(recipes);

            if (recipes.length > 0) {
                setSelectedRecipe(recipes[0].id);
            } else {
                setSelectedRecipe('');
            }
        } else {
            setAvailableRecipes([]);
            setSelectedRecipe('');
        }
    }, [selectedProduct]);

    // Recalculate when consolidation toggle changes
    useEffect(() => {
        if (productionChain && !productionChain.error && selectedProduct && targetRate) {
            handleCalculate();
        }
    }, [useConsolidation]);

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

    const trashIcon = getGeneralIcon('Trash');
    const tipIcon = getGeneralIcon('Tip');

    const producibleProducts = getProducibleProducts(
        ProductionCalculator.products,
        (productId) => ProductionCalculator.getRecipesForProduct(productId)
    );

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

    const handleNodeClick = (node) => {
        if (selectedNode && selectedNode.nodeKey === node.nodeKey) {
            setSelectedNode(null);
        } else {
            setSelectedNode(node);
        }
    };

    const handleClearAll = () => {
        setSelectedProduct('');
        setSelectedRecipe('');
        setTargetRate(60);
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
        setUseConsolidation(false);
        setShowResourcePoolDetail(false);
        setDisabledRecipes(new Set());
        setSelectedNode(null);
        setSelectedAlternative('best');
        setShowAdvancedOptimization(false);
        setOptimizationConstraints({
            maxPower: null,
            maxWorkers: null,
            maxMachines: null,
            maxMaintenance: null,
            maxComputing: null,
            excludedRecipes: [],
            tierRestrictions: null
        });
    };

    const handleSelectAlternative = (alternativeId, alternativeRecipeOverrides) => {
        console.log('Selecting alternative:', alternativeId, 'with overrides:', alternativeRecipeOverrides);

        setSelectedAlternative(alternativeId);

        const overrides = alternativeRecipeOverrides instanceof Map
            ? alternativeRecipeOverrides
            : new Map(Object.entries(alternativeRecipeOverrides || {}));

        setRecipeOverrides(overrides);

        if (selectedProduct && targetRate) {
            const result = solver.solve({
                targetProductId: selectedProduct,
                targetRate: targetRate,
                useConsolidation: useConsolidation,
                resourceSources: resourceSources,
                recipeOverrides: overrides,
                optimizationMode: false,
                optimizationGoal: optimizationGoal,
                constraints: {},
                resourceConstraints: new Map()
            });

            if (!result.error) {
                setProductionChain(result.chain);
                setRequirements(result.requirements);
            } else {
                console.error('Error recalculating with alternative:', result.error);
            }
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
            const result = solver.solve({
                targetProductId: selectedProduct,
                targetRate: targetRate,
                useConsolidation: useConsolidation,
                resourceSources: resourceSources,
                recipeOverrides: newOverrides,
                optimizationMode: false,
                optimizationGoal: optimizationGoal,
                constraints: {},
                resourceConstraints: new Map(),
                disabledRecipes: disabledRecipes
            });

            if (!result.error) {
                setProductionChain(result.chain);
                setRequirements(result.requirements);
            }
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
            if (resourceSourceModal.open && recipeModalProductId === resourceSourceModal.productId) {
                const newSources = new Map(resourceSources);
                newSources.set(resourceSourceModal.nodeKey, {
                    type: 'machine',
                    config: { recipeId: recipeId }
                });
                setResourceSources(newSources);

                setRecipeModalOpen(false);
                setRecipeModalProductId(null);
                setRecipeModalRecipes([]);
                setResourceSourceModal({
                    open: false,
                    nodeKey: null,
                    productId: null,
                    productName: null,
                    requiredRate: 0,
                    currentSource: null
                });

                if (selectedProduct && targetRate && targetRate > 0) {
                    const result = solver.solve({
                        targetProductId: selectedProduct,
                        targetRate: targetRate,
                        useConsolidation: useConsolidation,
                        resourceSources: newSources,
                        recipeOverrides: recipeOverrides,
                        optimizationMode: false,
                        disabledRecipes: disabledRecipes
                    });

                    if (!result.error) {
                        setProductionChain(result.chain);
                        setRequirements(result.requirements);
                    }
                }
            } else if (recipeModalProductId === selectedProduct) {
                setSelectedRecipe(recipeId);
                setRecipeModalOpen(false);
                setRecipeModalProductId(null);
                setRecipeModalRecipes([]);

                const newOverrides = new Map(recipeOverrides);
                newOverrides.set(selectedProduct, recipeId);
                setRecipeOverrides(newOverrides);

                if (targetRate && targetRate > 0 && selectedProduct && productionChain) {
                    const result = solver.solve({
                        targetProductId: selectedProduct,
                        targetRate: targetRate,
                        useConsolidation: useConsolidation,
                        resourceSources: resourceSources,
                        recipeOverrides: newOverrides,
                        optimizationMode: false,
                        disabledRecipes: disabledRecipes
                    });

                    if (!result.error) {
                        setProductionChain(result.chain);
                        setRequirements(result.requirements);
                    }
                }
            } else {
                handleRecipeOverride(recipeModalProductId, recipeId);
                setRecipeModalOpen(false);
                setRecipeModalProductId(null);
                setRecipeModalRecipes([]);
            }
        }
    };

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

    const selectResourceSource = (sourceType, applyToAll = false) => {
        const { nodeKey, productId, requiredRate } = resourceSourceModal;

        if (sourceType === 'storage') {
            const product = ProductionCalculator.getProduct(productId);
            const tiers = ProductionCalculator.getStorageTierOptions(product, requiredRate);
            const optimal = tiers.find(t => t.isOptimal);

            setStorageTierModal({
                open: true,
                product,
                requiredRate,
                tiers,
                selectedTier: optimal,
                applyToAll: applyToAll
            });
        } else if (sourceType === 'machine') {
            const recipes = ProductionCalculator.getRecipesForProduct(productId);
            if (recipes.length > 0) {
                setRecipeModalProductId(productId);
                setRecipeModalRecipes(recipes);
                setRecipeModalOpen(true);
                // Note: For machine source, applyToAll is not supported since each node
                // might need different recipe selections based on available inputs
            }
        } else {
            // For mining, worldMine, trade sources
            const newSources = new Map(resourceSources);

            // Always apply to the current node
            newSources.set(nodeKey, { type: sourceType });

            // If applyToAll is enabled, apply to all matching nodes
            if (applyToAll && productionChain) {
                const matchingNodes = findAllNodesWithProduct(productionChain, productId, nodeKey);
                matchingNodes.forEach(node => {
                    newSources.set(node.nodeKey, { type: sourceType });
                });
                console.log(`Applied "${sourceType}" source to ${matchingNodes.length + 1} nodes for ${productId}`);
            }

            setResourceSources(newSources);
            setResourceSourceModal({
                open: false,
                nodeKey: null,
                productId: null,
                productName: null,
                requiredRate: 0,
                currentSource: null
            });

            if (selectedProduct && targetRate && targetRate > 0) {
                const result = solver.solve({
                    targetProductId: selectedProduct,
                    targetRate: targetRate,
                    useConsolidation: useConsolidation,
                    resourceSources: newSources,
                    recipeOverrides: recipeOverrides,
                    optimizationMode: false,
                    disabledRecipes: disabledRecipes
                });

                if (!result.error) {
                    setProductionChain(result.chain);
                    setRequirements(result.requirements);
                }
            }
        }
    };

    const selectStorageTier = (tier) => {
        const { nodeKey, productId } = resourceSourceModal;
        const { applyToAll } = storageTierModal;

        const newSources = new Map(resourceSources);

        // Always apply to the current node
        newSources.set(nodeKey, {
            type: 'storage',
            config: { tier: tier.tier, entityId: tier.entityId, count: tier.count }
        });

        // If applyToAll is enabled, apply to all matching nodes
        if (applyToAll && productionChain) {
            const matchingNodes = findAllNodesWithProduct(productionChain, productId, nodeKey);
            matchingNodes.forEach(node => {
                // Recalculate tier for each node based on its required rate
                const nodeTiers = ProductionCalculator.getStorageTierOptions(
                    ProductionCalculator.getProduct(productId),
                    node.targetRate
                );
                const nodeTier = nodeTiers.find(t => t.tier === tier.tier) || tier;
                newSources.set(node.nodeKey, {
                    type: 'storage',
                    config: { tier: nodeTier.tier, entityId: nodeTier.entityId, count: nodeTier.count }
                });
            });
            console.log(`Applied storage tier ${tier.tier} to ${matchingNodes.length + 1} nodes for ${productId}`);
        }

        setResourceSources(newSources);

        setStorageTierModal({ open: false, product: null, requiredRate: 0, tiers: [], selectedTier: null, applyToAll: false });
        setResourceSourceModal({ open: false, nodeKey: null, productId: null, productName: null, requiredRate: 0, currentSource: null });

        if (selectedProduct && targetRate && targetRate > 0) {
            const result = solver.solve({
                targetProductId: selectedProduct,
                targetRate: targetRate,
                useConsolidation: useConsolidation,
                resourceSources: newSources,
                recipeOverrides: recipeOverrides,
                optimizationMode: false,
                disabledRecipes: disabledRecipes
            });

            if (!result.error) {
                setProductionChain(result.chain);
                setRequirements(result.requirements);
            }
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

    const toggleRecipeTime = (recipeId) => {
        setRecipeTimeToggles(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(recipeId);
            if (current === undefined) {
                newMap.set(recipeId, !settings.showRecipeTimePerMinute);
            } else {
                newMap.set(recipeId, !current);
            }
            return newMap;
        });
    };

    const handleApplyRecipeConstraints = (newDisabledRecipes) => {
        console.log('📝 Applying recipe constraints:', newDisabledRecipes.size, 'disabled');
        setDisabledRecipes(newDisabledRecipes);

        if (selectedProduct && targetRate) {
            handleCalculate();
        }
    };

    const getRecipeTimeDisplay = (recipeId) => {
        const toggle = recipeTimeToggles.get(recipeId);
        return toggle !== undefined ? toggle : settings.showRecipeTimePerMinute;
    };

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

    // Get selected product and recipe objects
    const selectedProductObj = selectedProduct ? ProductionCalculator.getProduct(selectedProduct) : null;
    const selectedRecipeObj = selectedRecipe ? ProductionCalculator.getRecipe(selectedRecipe) : null;

    return (
        <div style={{
            maxWidth: '1920px',
            margin: '0 auto',
            minHeight: '100vh'
        }}>
            <LoadingOverlay
                isVisible={isCalculating}
                title={optimizationMode ? 'Optimizing Production Chains...' : 'Calculating Production Chains...'}
                message={optimizationMode
                    ? 'Finding optimal machine combinations and recipe selections...'
                    : 'Processing production requirements and resource dependencies...'}
                showOptimizationTip={optimizationMode}
                icon={optimizationMode ? '🔍' : '⚙️'}
            />

            <div style={{ padding: '0 2rem 2rem' }}>
                {/* MODALS */}
                <RecipeModal
                    isOpen={recipeModalOpen}
                    onClose={() => {
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

                <RecipeModal
                    isOpen={recipeSelectionModalOpen && availableRecipes.length > 1}
                    onClose={() => setRecipeSelectionModalOpen(false)}
                    recipes={availableRecipes}
                    currentRecipeId={selectedRecipe}
                    onSelectRecipe={(recipeId) => {
                        setSelectedRecipe(recipeId);
                        setRecipeSelectionModalOpen(false);

                        const newOverrides = new Map(recipeOverrides);
                        newOverrides.set(selectedProduct, recipeId);
                        setRecipeOverrides(newOverrides);

                        if (targetRate && targetRate > 0 && selectedProduct && productionChain) {
                            const result = solver.solve({
                                targetProductId: selectedProduct,
                                targetRate: targetRate,
                                useConsolidation: useConsolidation,
                                resourceSources: resourceSources,
                                recipeOverrides: newOverrides,
                                optimizationMode: false,
                                disabledRecipes: disabledRecipes
                            });

                            if (!result.error) {
                                setProductionChain(result.chain);
                                setRequirements(result.requirements);
                            }
                        }
                    }}
                    getRecipeTimeDisplay={getRecipeTimeDisplay}
                    onToggleTime={toggleRecipeTime}
                />

                <ProductSelectorModal
                    isOpen={productModalOpen}
                    onClose={() => setProductModalOpen(false)}
                    onSelectProduct={(id) => {
                        setSelectedProduct(id);
                        setProductModalOpen(false);
                    }}
                    products={producibleProducts}
                    currentProductId={selectedProduct}
                />

                <ResourceSourceModal
                    isOpen={resourceSourceModal.open}
                    onClose={() => {
                        if (!recipeModalOpen) {
                            setResourceSourceModal({ open: false, nodeKey: null, productId: null, productName: null, requiredRate: 0, currentSource: null });
                        }
                    }}
                    resourceSourceModal={resourceSourceModal}
                    onSelectResourceSource={selectResourceSource}
                    matchingNodeCount={getMatchingNodeCount()}
                />

                <StorageTierModal
                    isOpen={storageTierModal.open}
                    onClose={() => setStorageTierModal({ open: false, product: null, requiredRate: 0, tiers: [], selectedTier: null, applyToAll: false })}
                    storageTierModal={storageTierModal}
                    onSelectStorageTier={selectStorageTier}
                />

                {showResourcePoolDetail && productionChain && productionChain.consolidatedResources && (
                    <ConsolidatedResourcesPanel
                        consolidatedResources={productionChain.consolidatedResources}
                        onClose={() => setShowResourcePoolDetail(false)}
                    />
                )}

                {/* MODERN INPUT SECTION */}
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '2rem',
                    borderRadius: '10px',
                    marginBottom: '2rem',
                    border: '1px solid #444',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    position: 'relative'
                }}>

                    {/* Integrated Header */}
                    <div style={{
                        marginBottom: '2rem',
                        paddingBottom: '1.5rem',
                        borderBottom: '2px solid #444'
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

                    {/* Clear All Button - Top Right Corner */}
                    <button
                        onClick={handleClearAll}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            padding: '8px 16px',
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            zIndex: 10
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff5252';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff6b6b';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        {trashIcon && (
                            <img
                                src={trashIcon}
                                alt="Clear"
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                                }}
                            />
                        )}
                        Clear All
                    </button>

                    {/* Top Row: Product Selection & Target Rate Cards */}
                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        marginBottom: '1.5rem',
                        paddingTop: '3rem'
                    }}>
                        {/* Product Selection Card */}
                        <div
                            onClick={() => setProductModalOpen(true)}
                            style={{
                                flex: '0 0 280px',
                                backgroundColor: '#1a1a1a',
                                border: '2px solid #444',
                                borderRadius: '8px',
                                padding: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#252525';
                                e.currentTarget.style.borderColor = '#4a90e2';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#1a1a1a';
                                e.currentTarget.style.borderColor = '#444';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px', fontWeight: '600' }}>
                                Currently Selected
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                {selectedProductObj && (
                                    <>
                                        <img
                                            src={getProductIcon(selectedProductObj)}
                                            alt={selectedProductObj.name}
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                        <div style={{
                                            fontSize: '1rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            textAlign: 'center'
                                        }}>
                                            {selectedProductObj.name}
                                        </div>
                                    </>
                                )}
                                {!selectedProductObj && (
                                    <div style={{
                                        fontSize: '0.95rem',
                                        color: '#888',
                                        fontStyle: 'italic',
                                        padding: '2rem 0',
                                        textAlign: 'center'
                                    }}>
                                        Click to select a product...
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Target Rate Card */}
                        <div
                            style={{
                                flex: '0 0 200px',
                                backgroundColor: '#1a1a1a',
                                border: '2px solid #444',
                                borderRadius: '8px',
                                padding: '1rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px', fontWeight: '600' }}>
                                Target Rate
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                paddingTop: '8px'
                            }}>
                                {isEditingRate ? (
                                    <input
                                        type="number"
                                        value={targetRate}
                                        onChange={(e) => setTargetRate(parseFloat(e.target.value) || 0)}
                                        onBlur={() => setIsEditingRate(false)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setIsEditingRate(false);
                                            }
                                        }}
                                        autoFocus
                                        min="1"
                                        step="1"
                                        style={{
                                            fontSize: '2rem',
                                            fontWeight: '700',
                                            color: '#4a90e2',
                                            backgroundColor: '#252525',
                                            border: '2px solid #4a90e2',
                                            borderRadius: '6px',
                                            padding: '4px 12px',
                                            textAlign: 'center',
                                            width: '120px'
                                        }}
                                    />
                                ) : (
                                    <div
                                        onClick={() => setIsEditingRate(true)}
                                        style={{
                                            fontSize: '2rem',
                                            fontWeight: '700',
                                            color: '#4a90e2',
                                            cursor: 'pointer',
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#252525';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {targetRate}
                                    </div>
                                )}
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>
                                    /min
                                </div>
                            </div>
                        </div>

                        {/* Recipe Card */}
                        <div
                            onClick={() => {
                                if (availableRecipes.length > 1) {
                                    setRecipeSelectionModalOpen(true);
                                }
                            }}
                            style={{
                                flex: 1,
                                backgroundColor: '#1a1a1a',
                                border: availableRecipes.length > 1 ? '2px solid #444' : '2px solid #333',
                                borderRadius: '8px',
                                padding: '1rem',
                                cursor: availableRecipes.length > 1 ? 'pointer' : 'default',
                                transition: 'all 0.2s',
                                minWidth: 0
                            }}
                            onMouseEnter={(e) => {
                                if (availableRecipes.length > 1) {
                                    e.currentTarget.style.backgroundColor = '#252525';
                                    e.currentTarget.style.borderColor = '#4a90e2';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (availableRecipes.length > 1) {
                                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                                    e.currentTarget.style.borderColor = '#444';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            }}>
                                <div style={{ fontSize: '0.8rem', color: '#888', fontWeight: '600' }}>
                                    Current Recipe
                                </div>
                                {availableRecipes.length > 1 && (
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: '#4a90e2',
                                        fontWeight: '600'
                                    }}>
                                        {availableRecipes.length} available
                                    </div>
                                )}
                            </div>
                            {selectedRecipeObj ? (
                                <RecipeCard
                                    recipe={selectedRecipeObj}
                                    size="normal"
                                    isClickable={false}
                                    showPerMinute={getRecipeTimeDisplay(selectedRecipeObj.id)}
                                    onToggleTime={() => toggleRecipeTime(selectedRecipeObj.id)}
                                />
                            ) : (
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#888',
                                    fontStyle: 'italic',
                                    padding: '1rem',
                                    textAlign: 'center'
                                }}>
                                    {availableRecipes.length === 0 ? 'Select a product first' : 'No recipe available'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Row: Controls */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1.5rem'
                    }}>
                        {/* Left: Consolidate Checkbox */}
                        <label style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            color: '#e0e0e0',
                            padding: '10px 16px',
                            backgroundColor: '#333',
                            borderRadius: '6px',
                            border: '1px solid #555',
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#3a3a3a';
                                e.currentTarget.style.borderColor = '#4a90e2';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#333';
                                e.currentTarget.style.borderColor = '#555';
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={useConsolidation}
                                onChange={(e) => setUseConsolidation(e.target.checked)}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    cursor: 'pointer',
                                    accentColor: '#4a90e2'
                                }}
                            />
                            {getGeneralIcon('LogisticsAuto') && (
                                <img
                                    src={getGeneralIcon('LogisticsAuto')}
                                    alt="Consolidate"
                                    style={{
                                        width: '31px',
                                        height: '20px',
                                        opacity: 0.8
                                    }}
                                />
                            )}
                            <span style={{ fontWeight: '600' }}>
                                Consolidate Resources
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#888' }}>
                                {useConsolidation ? '(Sharing enabled)' : '(Independent chains)'}
                            </span>
                        </label>

                        {/* Right: Calculate Button */}
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
                                boxShadow: selectedProduct && targetRate ? '0 4px 10px rgba(74, 144, 226, 0.4)' : 'none',
                                height: '48px'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedProduct && targetRate) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(74, 144, 226, 0.5)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedProduct && targetRate) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(74, 144, 226, 0.4)';
                                }
                            }}
                        >
                            Calculate
                        </button>
                    </div>

                    {/* Collapsible Advanced Optimization Section */}
                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const newOptimizationMode = !optimizationMode;
                                setOptimizationMode(newOptimizationMode);
                                if (newOptimizationMode) {
                                    setShowAdvancedOptimization(true);
                                } else {
                                    setShowAdvancedOptimization(!showAdvancedOptimization);
                                }
                            }}
                            type="button"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                backgroundColor: '#333',
                                border: '2px solid #444',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#3a3a3a';
                                e.currentTarget.style.borderColor = '#4a90e2';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#333';
                                e.currentTarget.style.borderColor = '#444';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {getGeneralIcon('Filter') && (
                                    <img
                                        src={getGeneralIcon('Filter')}
                                        alt="Advanced"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            opacity: 0.8,
                                            filter: 'brightness(0) saturate(100%) invert(79%) sepia(85%) saturate(494%) hue-rotate(359deg) brightness(104%) contrast(101%)'
                                        }}
                                    />
                                )}
                                <span>Advanced Constraints & Optimization</span>
                                {optimizationMode && (
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: '#50C878',
                                        fontWeight: '600',
                                        padding: '2px 8px',
                                        backgroundColor: 'rgba(80, 200, 120, 0.15)',
                                        borderRadius: '4px',
                                        marginLeft: '8px'
                                    }}>
                                        ENABLED
                                    </span>
                                )}
                                {!optimizationMode && (
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: '#888',
                                        fontWeight: '600',
                                        padding: '2px 8px',
                                        backgroundColor: 'rgba(136, 136, 136, 0.15)',
                                        borderRadius: '4px',
                                        marginLeft: '8px'
                                    }}>
                                        DISABLED
                                    </span>
                                )}
                            </div>
                            <span style={{
                                transform: showAdvancedOptimization ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s',
                                fontSize: '1.2rem'
                            }}>
                                ▼
                            </span>
                        </button>

                        {showAdvancedOptimization && (
                            <div style={{
                                marginTop: '1rem',
                                paddingTop: '1.5rem',
                                borderTop: '1px solid #444'
                            }}>
                                <OptimizationControls
                                    optimizationMode={optimizationMode}
                                    optimizationGoal={optimizationGoal}
                                    optimizationConstraints={optimizationConstraints}
                                    resourceConstraints={resourceConstraints}
                                    resourceInput={resourceInput}
                                    optimizationResult={optimizationResult}
                                    disabledRecipes={disabledRecipes}
                                    onToggleOptimization={() => setOptimizationMode(!optimizationMode)}
                                    onChangeGoal={setOptimizationGoal}
                                    onChangeConstraints={setOptimizationConstraints}
                                    onChangeResourceInput={setResourceInput}
                                    onAddResourceConstraint={addResourceConstraint}
                                    onRemoveResourceConstraint={removeResourceConstraint}
                                    onSelectAlternative={handleSelectAlternative}
                                    onApplyRecipeConstraints={handleApplyRecipeConstraints}
                                    currentAlternative={selectedAlternative}
                                />
                            </div>
                        )}
                    </div>

                </div>

                {/* Results Section */}
                {productionChain && requirements && (
                    <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start', paddingBottom: '3rem' }}>
                        {/* LEFT: Details Panel */}
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
                                {viewMode === 'compact' && selectedNode && (
                                    <>
                                        <div style={{
                                            margin: '-1.5rem -1.5rem 0 -1.5rem',
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
                                            borderRadius: '10px 10px 0 0',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <span style={{
                                                fontSize: '0.9rem',
                                                fontWeight: '700',
                                                color: '#4a90e2',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1.5px',
                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                                            }}>
                                                Node Details
                                            </span>
                                            {getGeneralIcon('Info') && (
                                                <img
                                                    src={getGeneralIcon('Info')}
                                                    alt="Info"
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                        opacity: 0.7,
                                                        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8))'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </>
                                )}

                                <DetailsPanel
                                    selectedNode={selectedNode ? findNodeInChain(productionChain, selectedNode.nodeKey) || selectedNode : null}
                                    requirements={requirements}
                                    powerUnit={powerUnit}
                                    viewMode={viewMode}
                                    recipeOverrides={recipeOverrides}
                                    formatPower={formatPower}
                                    onOpenRecipeModal={openRecipeModal}
                                    onSetPowerUnit={setPowerUnit}
                                    getRecipeTimeDisplay={getRecipeTimeDisplay}
                                    onToggleRecipeTime={toggleRecipeTime}
                                    productionChain={productionChain}
                                    useConsolidation={useConsolidation}
                                    onViewResourcePoolDetails={() => setShowResourcePoolDetail(true)}
                                    onOpenResourceSourceModal={openResourceSourceModal}
                                    targetProductId={selectedProduct}
                                />
                            </div>
                        </div>

                        {/* RIGHT: Production Chain */}
                        <div style={{
                            backgroundColor: '#2a2a2a',
                            padding: '1.5rem',
                            borderRadius: '10px',
                            border: '1px solid #444',
                            borderBottom: '2px solid #333',
                            boxShadow:
                                'inset 0 3px 8px rgba(0, 0, 0, 0.7), ' +
                                'inset 0 -3px 8px rgba(255, 255, 255, 0.03), ' +
                                '0 4px 10px rgba(0, 0, 0, 0.5)'
                        }}>
                            {/* Control Banner */}
                            <div style={{
                                margin: '-1.5rem -1.5rem 1.5rem -1.5rem',
                                padding: '8px 16px',
                                minHeight: '30px',
                                background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                                borderBottom: '2px solid #333',
                                boxShadow:
                                    'inset 0 3px 8px rgba(0, 0, 0, 0.7), ' +
                                    'inset 0 -3px 8px rgba(255, 255, 255, 0.03), ' +
                                    '0 4px 10px rgba(0, 0, 0, 0.5)',
                                borderRadius: '10px 10px 0 0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '10px'
                            }}>
                                {/* Expand All */}
                                <button
                                    onClick={() => setCollapsedNodes(new Set())}
                                    title="Expand all nodes"
                                    style={{
                                        padding: '3px 6px',
                                        backgroundColor: 'transparent',
                                        color: '#50C878',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        lineHeight: 1
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(80, 200, 120, 0.15)';
                                        e.currentTarget.style.transform = 'scale(1.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    ⊞
                                </button>

                                {/* Collapse All */}
                                <button
                                    onClick={() => {
                                        const getAllNodeIds = (node, path = '', level = 0) => {
                                            const ids = new Set();
                                            const nodeId = `${path}-${node.productId}-${level}`;
                                            ids.add(nodeId);

                                            if (node.inputChains && node.inputChains.length > 0) {
                                                node.inputChains.forEach((child) => {
                                                    const childIds = getAllNodeIds(child, nodeId, level + 1);
                                                    childIds.forEach(id => ids.add(id));
                                                });
                                            }
                                            return ids;
                                        };

                                        if (productionChain) {
                                            const allIds = getAllNodeIds(productionChain);
                                            setCollapsedNodes(allIds);
                                        }
                                    }}
                                    title="Collapse all nodes"
                                    style={{
                                        padding: '3px 6px',
                                        backgroundColor: 'transparent',
                                        color: '#ff6b6b',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        lineHeight: 1
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.15)';
                                        e.currentTarget.style.transform = 'scale(1.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    ⊟
                                </button>

                                <span style={{ color: '#444', fontSize: '1rem', fontWeight: '300' }}>|</span>

                                {/* Compact Button */}
                                <button
                                    onClick={() => setViewMode('compact')}
                                    style={{
                                        padding: '4px 12px',
                                        backgroundColor: viewMode === 'compact' ? '#4a90e2' : 'transparent',
                                        color: viewMode === 'compact' ? 'white' : '#888',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.2s',
                                        lineHeight: 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (viewMode !== 'compact') {
                                            e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
                                            e.currentTarget.style.color = '#aaa';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (viewMode !== 'compact') {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#888';
                                        }
                                    }}
                                >
                                    Compact
                                </button>

                                {/* Detailed Button */}
                                <button
                                    onClick={() => setViewMode('detailed')}
                                    style={{
                                        padding: '4px 12px',
                                        backgroundColor: viewMode === 'detailed' ? '#4a90e2' : 'transparent',
                                        color: viewMode === 'detailed' ? 'white' : '#888',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.2s',
                                        lineHeight: 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (viewMode !== 'detailed') {
                                            e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
                                            e.currentTarget.style.color = '#aaa';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (viewMode !== 'detailed') {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#888';
                                        }
                                    }}
                                >
                                    Detailed
                                </button>
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
                                            <ProductionNode
                                                node={productionChain}
                                                level={0}
                                                parentPath=""
                                                collapsedNodes={collapsedNodes}
                                                onToggleCollapse={toggleNodeCollapse}
                                                onOpenRecipeModal={openRecipeModal}
                                                onOpenResourceSourceModal={openResourceSourceModal}
                                                recipeOverrides={recipeOverrides}
                                                getRecipeTimeDisplay={getRecipeTimeDisplay}
                                                onToggleRecipeTime={toggleRecipeTime}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div style={{
                                                marginBottom: '1rem',
                                                padding: '4px',
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                color: '#888',
                                                border: '1px solid #333'
                                            }}>
                                                {tipIcon && (
                                                    <img
                                                        src={tipIcon}
                                                        alt="Tip"
                                                        style={{
                                                            width: '16px',
                                                            height: '16px',
                                                            opacity: 0.8,
                                                            filter: 'brightness(0) saturate(100%) invert(79%) sepia(85%) saturate(494%) hue-rotate(359deg) brightness(104%) contrast(101%)'
                                                        }}
                                                    />
                                                )} <strong style={{ color: '#4a90e2' }}>TIP:</strong> Click ▶/▼ to expand/collapse. Click a node to view details.
                                                Click "+" to change source.
                                            </div>
                                            <CompactNode
                                                node={productionChain}
                                                level={0}
                                                parentPath=""
                                                collapsedNodes={collapsedNodes}
                                                onToggleCollapse={toggleNodeCollapse}
                                                onSelectNode={handleNodeClick}
                                                selectedNodeKey={selectedNode?.nodeKey}
                                                selectedNode={selectedNode}
                                                onOpenResourceSourceModal={openResourceSourceModal}
                                                onOpenRecipeModal={openRecipeModal}
                                                recipeOverrides={recipeOverrides}
                                            />
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