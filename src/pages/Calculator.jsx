import { useEffect, useState } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
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
import ConsolidatedResourcesPanel from '../components/ConsolidatedResourcesPanel';
import OptimizationAlternativesPanel from '../components/OptimizationAlternativesPanel';

const Calculator = () => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);

    // Core calculator state
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [targetRate, setTargetRate] = useState(60);
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
        selectedTier: null
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
    const [solver] = useState(() => ProductionSolver);

    const [recipeSelectionModalOpen, setRecipeSelectionModalOpen] = useState(false);

    // Load game data on mount
    useEffect(() => {
        document.title = 'Production Calculator - Captain of Industry Tools';

        const loadData = async () => {
            const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
            const gameData = await DataLoader.loadGameData(enabledMods);
            ProductionCalculator.initialize(gameData);
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

    const trashIcon = getGeneralIcon('Trash');
    const optimizationOn = getGeneralIcon('LogisticsAuto');
    const optimizationOff = getGeneralIcon('LogisticsOff');

    const producibleProducts = ProductionCalculator.products
        .filter(product => {
            const recipes = ProductionCalculator.getRecipesForProduct(product.id);
            return recipes.length > 0;
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

    const handleNodeClick = (node) => {
        // If clicking the same node, deselect it (go back to total requirements)
        if (selectedNode && selectedNode.nodeKey === node.nodeKey) {
            setSelectedNode(null);
        } else {
            setSelectedNode(node);
        }
    };

    const handleCalculate = () => {
        if (!selectedProduct || !targetRate) return;

        // Use ProductionSolver for all calculations
        const result = solver.solve({
            targetProductId: selectedProduct,
            targetRate: targetRate,
            useConsolidation: useConsolidation,
            resourceSources: resourceSources,
            recipeOverrides: recipeOverrides,
            optimizationMode: optimizationMode,
            optimizationGoal: optimizationGoal,
            constraints: optimizationMode ? {
                ...optimizationConstraints,
                resourceLimits: resourceConstraints
            } : {},
            resourceConstraints: resourceConstraints
        });

        if (result.error) {
            console.error('Calculation error:', result.error);
            setProductionChain({ error: result.error });
            setRequirements(null);
            setOptimizationResult(null);
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
    };

    const handleSelectAlternative = (alternativeId, recipeOverrides) => {
        setSelectedAlternative(alternativeId);

        // Apply the alternative's recipe overrides
        setRecipeOverrides(recipeOverrides);

        // Recalculate with these overrides
        if (selectedProduct && targetRate) {
            const result = solver.solve({
                targetProductId: selectedProduct,
                targetRate: targetRate,
                useConsolidation: useConsolidation,
                resourceSources: resourceSources,
                recipeOverrides: recipeOverrides,
                optimizationMode: false, // Switch to manual mode with these recipes
                optimizationGoal: optimizationGoal,
                constraints: {},
                resourceConstraints: new Map()
            });

            if (!result.error) {
                setProductionChain(result.chain);
                setRequirements(result.requirements);
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
                optimizationMode: false, // Recipe override = manual mode
                optimizationGoal: optimizationGoal,
                constraints: {},
                resourceConstraints: new Map()
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
                setResourceSourceModal({
                    open: false,
                    nodeKey: null,
                    productId: null,
                    productName: null,
                    requiredRate: 0,
                    currentSource: null
                });

                // Recalculate chain
                if (selectedProduct && targetRate) {
                    let newChain = solver.solve(
                        selectedProduct,
                        targetRate,
                        selectedRecipe || null,
                        recipeOverrides,
                        newSources
                    );

                    // Apply consolidation if enabled
                    if (useConsolidation) {
                        newChain = ResourceConsolidator.consolidateChain(newChain, ProductionCalculator);
                    }

                    const newReqs = useConsolidation
                        ? ResourceConsolidator.calculateConsolidatedRequirements(newChain)
                        : ProductionCalculator.calculateTotalRequirements(newChain);

                    setProductionChain(newChain);
                    setRequirements(newReqs);
                }
            } else if (recipeModalProductId === selectedProduct) {
                // Main product recipe selection
                setSelectedRecipe(recipeId);
                setRecipeModalOpen(false);
                setRecipeModalProductId(null);
                setRecipeModalRecipes([]);

                if (targetRate) {
                    let newChain = solver.solve(
                        selectedProduct,
                        targetRate,
                        recipeId,
                        recipeOverrides,
                        resourceSources
                    );

                    // Apply consolidation if enabled
                    if (useConsolidation) {
                        newChain = ResourceConsolidator.consolidateChain(newChain, ProductionCalculator);
                    }

                    const newReqs = useConsolidation
                        ? ResourceConsolidator.calculateConsolidatedRequirements(newChain)
                        : ProductionCalculator.calculateTotalRequirements(newChain);

                    setProductionChain(newChain);
                    setRequirements(newReqs);
                }
            } else {
                // Recipe override for a node (intermediate product in chain)
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

    const selectResourceSource = (sourceType) => {
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
                selectedTier: optimal
            });
        } else if (sourceType === 'machine') {
            const recipes = ProductionCalculator.getRecipesForProduct(productId);
            if (recipes.length > 0) {
                setRecipeModalProductId(productId);
                setRecipeModalRecipes(recipes);
                setRecipeModalOpen(true);
            }
        } else {
            const newSources = new Map(resourceSources);
            newSources.set(nodeKey, { type: sourceType });
            setResourceSources(newSources);
            setResourceSourceModal({ open: false, nodeKey: null, productId: null, productName: null, requiredRate: 0, currentSource: null });

            if (selectedProduct && targetRate) {
                let newChain = solver.solve(
                    selectedProduct,
                    targetRate,
                    selectedRecipe || null,
                    recipeOverrides,
                    newSources
                );

                // Apply consolidation if enabled
                if (useConsolidation) {
                    newChain = ResourceConsolidator.consolidateChain(newChain, ProductionCalculator);
                }

                const newReqs = useConsolidation
                    ? ResourceConsolidator.calculateConsolidatedRequirements(newChain)
                    : ProductionCalculator.calculateTotalRequirements(newChain);

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

        setStorageTierModal({ open: false, product: null, requiredRate: 0, tiers: [], selectedTier: null });
        setResourceSourceModal({ open: false, nodeKey: null, productId: null, productName: null, requiredRate: 0, currentSource: null });

        if (selectedProduct && targetRate) {
            let newChain = solver.solve(
                selectedProduct,
                targetRate,
                selectedRecipe || null,
                recipeOverrides,
                newSources
            );

            // Apply consolidation if enabled
            if (useConsolidation) {
                newChain = ResourceConsolidator.consolidateChain(newChain, ProductionCalculator);
            }

            const newReqs = useConsolidation
                ? ResourceConsolidator.calculateConsolidatedRequirements(newChain)
                : ProductionCalculator.calculateTotalRequirements(newChain);

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

                {/* Recipe Selection Modal (for node recipes AND resource source machine production) */}
                <RecipeModal
                    isOpen={recipeModalOpen}
                    onClose={() => {
                        if (resourceSourceModal.open) {
                            // If resource source modal is open, just close recipe modal
                            setRecipeModalOpen(false);
                            setRecipeModalProductId(null);
                            setRecipeModalRecipes([]);
                        } else {
                            // Otherwise use the full close function
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

                        // Recalculate the chain with the new recipe
                        if (targetRate && selectedProduct) {
                            let newChain = solver.solve(
                                selectedProduct,
                                targetRate,
                                recipeId,
                                recipeOverrides,
                                resourceSources
                            );

                            // Apply consolidation if enabled
                            if (useConsolidation) {
                                newChain = ResourceConsolidator.consolidateChain(newChain, ProductionCalculator);
                            }

                            const newReqs = useConsolidation
                                ? ResourceConsolidator.calculateConsolidatedRequirements(newChain)
                                : ProductionCalculator.calculateTotalRequirements(newChain);

                            setProductionChain(newChain);
                            setRequirements(newReqs);
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
                />

                <StorageTierModal
                    isOpen={storageTierModal.open}
                    onClose={() => setStorageTierModal({ open: false, product: null, requiredRate: 0, tiers: [], selectedTier: null })}
                    storageTierModal={storageTierModal}
                    onSelectStorageTier={selectStorageTier}
                />

                {/* Consolidated Resources Detail Modal */}
                {showResourcePoolDetail && productionChain && productionChain.consolidatedResources && (
                    <ConsolidatedResourcesPanel
                        consolidatedResources={productionChain.consolidatedResources}
                        onClose={() => setShowResourcePoolDetail(false)}
                    />
                )}

                {/* Mode Toggle and Controls */}
                <div style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
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
                            boxShadow: optimizationMode
                                ? '0 4px 10px rgba(80, 200, 120, 0.4)'
                                : '0 2px 6px rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4))'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = optimizationMode
                                ? '0 6px 14px rgba(80, 200, 120, 0.5)'
                                : '0 4px 10px rgba(0, 0, 0, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = optimizationMode
                                ? '0 4px 10px rgba(80, 200, 120, 0.4)'
                                : '0 2px 6px rgba(0, 0, 0, 0.3)';
                        }}
                    >
                        {optimizationMode ? (
                            <>
                                <img
                                    src={optimizationOff}
                                    alt="Off"
                                    style={{
                                        width: '43px',
                                        height: '24px',
                                        filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4))'
                                    }}
                                />
                                Disable Optimization
                            </>
                        ) : (
                            <>
                                <img
                                    src={optimizationOn}
                                    alt="On"
                                    style={{
                                        width: '43px',
                                        height: '24px',
                                        filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4))'
                                    }}
                                />
                                Enable Optimization
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => {
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
                            setSelectedNode(null);
                            setSelectedAlternative('best');
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
                            boxShadow: '0 4px 10px rgba(255, 107, 107, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4))'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff5252';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 14px rgba(255, 107, 107, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff6b6b';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(255, 107, 107, 0.4)';
                        }}
                    >
                        <img
                            src={trashIcon}
                            alt="Trash"
                            style={{
                                width: '24px',
                                height: '24px',
                                filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4))'
                            }}
                        />
                        Clear All
                    </button>
                </div>

                {/* Optimization Controls Component */}
                <OptimizationControls
                    optimizationMode={optimizationMode}
                    optimizationGoal={optimizationGoal}
                    optimizationConstraints={optimizationConstraints}
                    resourceConstraints={resourceConstraints}
                    resourceInput={resourceInput}
                    optimizationResult={optimizationResult}
                    onToggleOptimization={() => setOptimizationMode(!optimizationMode)}
                    onChangeGoal={setOptimizationGoal}
                    onChangeConstraints={setOptimizationConstraints}
                    onChangeResourceInput={setResourceInput}
                    onAddResourceConstraint={addResourceConstraint}
                    onRemoveResourceConstraint={removeResourceConstraint}
                />

                {/* Input Section */}
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '2rem',
                    borderRadius: '10px',
                    marginBottom: '2rem',
                    border: '1px solid #444',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 200px', gap: '1.5rem', alignItems: 'end', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                                Target Product
                            </label>
                            <button
                                onClick={() => setProductModalOpen(true)}
                                disabled={!dataLoaded}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: '2px solid #555',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
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
                                <span>
                                    {selectedProduct ? ProductionCalculator.getProduct(selectedProduct)?.name : 'Select product...'}
                                </span>
                                <span style={{ color: '#4a90e2' }}>▼</span>
                            </button>
                        </div>

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
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        {/* Consolidation Toggle - Updated */}
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
                            <span style={{ fontWeight: '600' }}>
                                🔗 Consolidate Resources
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#888' }}>
                                {useConsolidation ? '(Sharing enabled)' : '(Independent chains)'}
                            </span>
                        </label>

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
                                {viewMode === 'compact' && selectedNode && (
                                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                                        Node Details
                                    </h3>
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
                                />
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
                                            <CompactNode
                                                node={productionChain}
                                                level={0}
                                                parentPath=""
                                                collapsedNodes={collapsedNodes}
                                                onToggleCollapse={toggleNodeCollapse}
                                                onSelectNode={handleNodeClick}
                                                selectedNodeKey={selectedNode?.nodeKey}
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