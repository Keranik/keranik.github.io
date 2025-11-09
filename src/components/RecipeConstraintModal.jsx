import { useState, useEffect, useRef, useMemo } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import MiniRecipeCard from './MiniRecipeCard';
import { getGeneralIcon } from '../utils/AssetHelper';

const RecipeConstraintModal = ({
    isOpen,
    onClose,
    disabledRecipes = new Set(),
    onApply,
    availableRecipes = null
}) => {
    const [localDisabledRecipes, setLocalDisabledRecipes] = useState(new Set(disabledRecipes));
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filterMachine, setFilterMachine] = useState('all');
    const [filterTechLevel, setFilterTechLevel] = useState('all');
    const [showOnlyDisabled, setShowOnlyDisabled] = useState(false);
    const [enabledTiers, setEnabledTiers] = useState(new Set([0, 1, 2, 3, 4, 5]));
    const searchInputRef = useRef(null);

    // Load icons
    const searchIcon = getGeneralIcon('Search');
    const clockIcon = getGeneralIcon('Clock');
    const workerIcon = getGeneralIcon('Worker');
    const powerIcon = getGeneralIcon('Electricity');
    const computingIcon = getGeneralIcon('Computing');

    // Sync local state with props when modal opens
    useEffect(() => {
        if (isOpen) {
            setLocalDisabledRecipes(new Set(disabledRecipes));
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isOpen, disabledRecipes]);

    // Get all recipes and machines
    const allRecipes = availableRecipes || ProductionCalculator.recipes;
    const allResearch = ProductionCalculator.getAllResearch();

    const allMachines = useMemo(() => {
        const machines = new Set();
        allRecipes.forEach(recipe => {
            const recipeMachines = ProductionCalculator.getMachinesForRecipe(recipe.id);
            recipeMachines.forEach(m => machines.add(m.id));
        });
        return Array.from(machines).map(id => ProductionCalculator.getMachine(id)).filter(Boolean);
    }, []);

    // Build recipe -> tech tier map
    const recipeToTechTier = useMemo(() => {
        const map = new Map();

        allRecipes.forEach(recipe => {
            const researchNode = ProductionCalculator.getResearchForRecipe(recipe.id);

            if (researchNode) {
                map.set(recipe.id, researchNode.tier);
            } else {
                const machines = ProductionCalculator.getMachinesForRecipe(recipe.id);
                if (machines.length > 0) {
                    const machineResearch = ProductionCalculator.getResearchForMachine(machines[0].id);
                    if (machineResearch) {
                        map.set(recipe.id, machineResearch.tier);
                    } else {
                        map.set(recipe.id, 0);
                    }
                } else {
                    map.set(recipe.id, 0);
                }
            }
        });

        console.log('📊 Recipe tech tiers mapped:', map.size, 'recipes');
        return map;
    }, [allRecipes, allResearch]);

    // Tech tiers configuration
    const techTiers = [
        { tier: 0, label: 'T0', description: 'Basic/Starter', color: '#888888' },
        { tier: 1, label: 'T1', description: 'Early Game', color: '#66bb66' },
        { tier: 2, label: 'T2', description: 'Mid Game', color: '#66aaff' },
        { tier: 3, label: 'T3', description: 'Late Game', color: '#aa66ff' },
        { tier: 4, label: 'T4', description: 'End Game', color: '#ff6666' },
        { tier: 5, label: 'T5', description: 'Post-Game', color: '#ffaa00' }
    ];

    // Toggle individual tier
    const toggleTier = (tier) => {
        setEnabledTiers(prev => {
            const next = new Set(prev);
            if (next.has(tier)) {
                next.delete(tier);
            } else {
                next.add(tier);
            }
            return next;
        });
    };

    // Enable all tiers
    const enableAllTiers = () => {
        setEnabledTiers(new Set([0, 1, 2, 3, 4, 5]));
    };

    // Check if all tiers are enabled
    const allTiersEnabled = enabledTiers.size === 6;

    // Apply tier selection to disabled recipes
    const applyTierSelection = () => {
        const recipesToDisable = new Set();
        allRecipes.forEach(recipe => {
            const tier = recipeToTechTier.get(recipe.id) || 0;
            if (!enabledTiers.has(tier)) {
                recipesToDisable.add(recipe.id);
            }
        });
        setLocalDisabledRecipes(recipesToDisable);
        console.log(`🎯 Tier selection applied: ${recipesToDisable.size} recipes disabled`);
    };

    // Filter and sort recipes
    const filteredAndSortedRecipes = useMemo(() => {
        let filtered = allRecipes;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(recipe => {
                const recipeName = recipe.name?.toLowerCase() || '';
                const recipeId = recipe.id?.toLowerCase() || '';
                const machines = ProductionCalculator.getMachinesForRecipe(recipe.id);
                const machineName = machines[0]?.name?.toLowerCase() || '';

                const inputMatches = recipe.inputs.some(input => {
                    const product = ProductionCalculator.getProduct(input.productId);
                    return product?.name?.toLowerCase().includes(query);
                });

                const outputMatches = recipe.outputs.some(output => {
                    const product = ProductionCalculator.getProduct(output.productId);
                    return product?.name?.toLowerCase().includes(query);
                });

                return recipeName.includes(query) ||
                    recipeId.includes(query) ||
                    machineName.includes(query) ||
                    inputMatches ||
                    outputMatches;
            });
        }

        if (filterMachine !== 'all') {
            filtered = filtered.filter(recipe => {
                const machines = ProductionCalculator.getMachinesForRecipe(recipe.id);
                return machines.some(m => m.id === filterMachine);
            });
        }

        if (filterTechLevel !== 'all') {
            const maxTier = parseInt(filterTechLevel);
            filtered = filtered.filter(recipe => {
                const tier = recipeToTechTier.get(recipe.id) || 0;
                return tier <= maxTier;
            });
        }

        if (showOnlyDisabled) {
            filtered = filtered.filter(recipe => localDisabledRecipes.has(recipe.id));
        }

        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return (a.name || a.id).localeCompare(b.name || b.id);

                case 'input': {
                    const aInput = a.inputs[0] ? ProductionCalculator.getProduct(a.inputs[0].productId)?.name || '' : '';
                    const bInput = b.inputs[0] ? ProductionCalculator.getProduct(b.inputs[0].productId)?.name || '' : '';
                    return aInput.localeCompare(bInput);
                }

                case 'output': {
                    const aOutput = a.outputs[0] ? ProductionCalculator.getProduct(a.outputs[0].productId)?.name || '' : '';
                    const bOutput = b.outputs[0] ? ProductionCalculator.getProduct(b.outputs[0].productId)?.name || '' : '';
                    return aOutput.localeCompare(bOutput);
                }

                case 'workers': {
                    const aMachines = ProductionCalculator.getMachinesForRecipe(a.id);
                    const bMachines = ProductionCalculator.getMachinesForRecipe(b.id);
                    const aWorkers = aMachines[0]?.workers || 0;
                    const bWorkers = bMachines[0]?.workers || 0;
                    return aWorkers - bWorkers;
                }

                case 'power': {
                    const aMachines = ProductionCalculator.getMachinesForRecipe(a.id);
                    const bMachines = ProductionCalculator.getMachinesForRecipe(b.id);
                    const aPower = aMachines[0]?.electricityKw || 0;
                    const bPower = bMachines[0]?.electricityKw || 0;
                    return aPower - bPower;
                }

                case 'computing': {
                    const aMachines = ProductionCalculator.getMachinesForRecipe(a.id);
                    const bMachines = ProductionCalculator.getMachinesForRecipe(b.id);
                    const aComputing = aMachines[0]?.computingTFlops || 0;
                    const bComputing = bMachines[0]?.computingTFlops || 0;
                    return aComputing - bComputing;
                }

                case 'techLevel': {
                    const aTier = recipeToTechTier.get(a.id) || 0;
                    const bTier = recipeToTechTier.get(b.id) || 0;
                    return aTier - bTier;
                }

                default:
                    return 0;
            }
        });

        return filtered;
    }, [allRecipes, searchQuery, sortBy, filterMachine, filterTechLevel, showOnlyDisabled, localDisabledRecipes, recipeToTechTier]);

    // Toggle recipe enabled/disabled
    const toggleRecipe = (recipeId) => {
        setLocalDisabledRecipes(prev => {
            const next = new Set(prev);
            if (next.has(recipeId)) {
                next.delete(recipeId);
            } else {
                next.add(recipeId);
            }
            return next;
        });
    };

    // Enable all recipes
    const enableAll = () => {
        setLocalDisabledRecipes(new Set());
    };

    // Disable all recipes (or all filtered recipes)
    const disableAll = () => {
        const recipesToDisable = new Set(filteredAndSortedRecipes.map(r => r.id));
        setLocalDisabledRecipes(recipesToDisable);
    };

    // Apply changes and close
    const handleApply = () => {
        console.log('🔧 Applying recipe constraints:', localDisabledRecipes.size, 'disabled');
        if (onApply) {
            onApply(localDisabledRecipes);
        }
        onClose();
    };

    // Cancel and close
    const handleCancel = () => {
        setLocalDisabledRecipes(new Set(disabledRecipes));
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '20px'
            }}
            onClick={handleCancel}
        >
            <div
                style={{
                    backgroundColor: '#1a1a1a',
                    border: '2px solid #333',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '1200px',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '2px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#fff' }}>
                            <img
                                src={getGeneralIcon('Filter')}
                                alt="Filter Recipes"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    objectFit: 'contain',
                                    marginRight: '12px',
                                    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))'
                                }}
                            /> Recipe Filter
                        </h2>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#888' }}>
                            Disable recipes to exclude them from production calculations
                        </p>
                    </div>
                    <button
                        onClick={handleCancel}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#888',
                            fontSize: '1.8rem',
                            cursor: 'pointer',
                            padding: '4px 12px',
                            lineHeight: 1,
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                    >
                        ✕
                    </button>
                </div>

                {/* Search and Controls */}
                <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #2a2a2a',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    {/* Search Bar - FIXED WIDTH */}
                    <div style={{ position: 'relative', maxWidth: '600px' }}>
                        {searchIcon && (
                            <img
                                src={searchIcon}
                                alt="Search"
                                style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '18px',
                                    height: '18px',
                                    opacity: 0.5
                                }}
                            />
                        )}
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search recipes, machines, or products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px 10px 40px',
                                backgroundColor: '#0a0a0a',
                                border: '1px solid #333',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '0.95rem',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = '#4a90e2'}
                            onBlur={(e) => e.currentTarget.style.borderColor = '#333'}
                        />
                    </div>

                    {/* Tech Tier Selection */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        padding: '12px',
                        backgroundColor: '#0a0a0a',
                        borderRadius: '6px',
                        border: '1px solid #2a2a2a'
                    }}>
                        <span style={{
                            color: '#aaa',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            marginRight: '8px'
                        }}>
                            <img
                                src={getGeneralIcon('ResearchUnlocked')}
                                alt="Unlocked Recipes"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    objectFit: 'contain',
                                    marginRight: '12px',
                                    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))'
                                }}
                            /> TECH TIERS:
                        </span>

                        {/* All Tech Button */}
                        <button
                            onClick={enableAllTiers}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: allTiersEnabled ? '#4a90e2' : '#2a2a2a',
                                border: `2px solid ${allTiersEnabled ? '#5aa0f2' : '#444'}`,
                                borderRadius: '6px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                transition: 'all 0.2s',
                                marginRight: '4px'
                            }}
                            onMouseEnter={(e) => {
                                if (!allTiersEnabled) {
                                    e.currentTarget.style.backgroundColor = '#3a3a3a';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!allTiersEnabled) {
                                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                                }
                            }}
                        >
                            ✓ All Tech
                        </button>

                        <span style={{ color: '#555', marginRight: '4px' }}>|</span>

                        {/* Individual Tier Toggles */}
                        {techTiers.map(({ tier, label, description, color }) => {
                            const isEnabled = enabledTiers.has(tier);
                            return (
                                <button
                                    key={tier}
                                    onClick={() => toggleTier(tier)}
                                    title={description}
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: isEnabled ? color : '#1a1a1a',
                                        border: `2px solid ${color}`,
                                        borderRadius: '6px',
                                        color: isEnabled ? '#fff' : color,
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        transition: 'all 0.2s',
                                        opacity: isEnabled ? 1 : 0.5
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = isEnabled ? '1' : '0.5';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    {isEnabled ? '✓' : '✕'} {label}
                                </button>
                            );
                        })}

                        <button
                            onClick={applyTierSelection}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#2a5a2a',
                                border: '2px solid #3a7a3a',
                                borderRadius: '6px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                transition: 'all 0.2s',
                                marginLeft: 'auto'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a7a3a'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a5a2a'}
                        >
                            → Apply Tier Selection
                        </button>
                    </div>

                    {/* Bulk Actions */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <button
                            onClick={enableAll}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#2a5a2a',
                                border: '1px solid #3a7a3a',
                                borderRadius: '6px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a7a3a'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a5a2a'}
                        >
                            ✓ Enable All
                        </button>
                        <button
                            onClick={disableAll}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#5a2a2a',
                                border: '1px solid #7a3a3a',
                                borderRadius: '6px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7a3a3a'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5a2a2a'}
                        >
                            ✕ Disable All {searchQuery || filterMachine !== 'all' || filterTechLevel !== 'all' ? '(Filtered)' : ''}
                        </button>

                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#aaa', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={showOnlyDisabled}
                                    onChange={(e) => setShowOnlyDisabled(e.target.checked)}
                                    style={{ cursor: 'pointer' }}
                                />
                                Show only disabled
                            </label>
                        </div>
                    </div>

                    {/* Sort and Filter */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#aaa', fontSize: '0.9rem', fontWeight: '600' }}>Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '6px 10px',
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #333',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="name">Name (A-Z)</option>
                                <option value="input">Input Product</option>
                                <option value="output">Output Product</option>
                                <option value="workers">Workers (Low → High)</option>
                                <option value="power">Power (Low → High)</option>
                                <option value="computing">Computing (Low → High)</option>
                                <option value="techLevel">Tech Level (Low → High)</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#aaa', fontSize: '0.9rem', fontWeight: '600' }}>Machine:</span>
                            <select
                                value={filterMachine}
                                onChange={(e) => setFilterMachine(e.target.value)}
                                style={{
                                    padding: '6px 10px',
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #333',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    maxWidth: '200px'
                                }}
                            >
                                <option value="all">All Machines</option>
                                {allMachines.map(machine => (
                                    <option key={machine.id} value={machine.id}>
                                        {machine.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#aaa', fontSize: '0.9rem', fontWeight: '600' }}>Tech Filter:</span>
                            <select
                                value={filterTechLevel}
                                onChange={(e) => setFilterTechLevel(e.target.value)}
                                style={{
                                    padding: '6px 10px',
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #333',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="all">All Tech Levels</option>
                                <option value="0">T0 Only (Basic)</option>
                                <option value="1">T0-T1 (Early Game)</option>
                                <option value="2">T0-T2 (Mid Game)</option>
                                <option value="3">T0-T3 (Late Game)</option>
                                <option value="4">T0-T4 (End Game)</option>
                                <option value="5">T0-T5 (Post-Game)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Recipe List */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '12px 24px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                    }}>
                        {filteredAndSortedRecipes.map(recipe => {
                            const isDisabled = localDisabledRecipes.has(recipe.id);
                            const machines = ProductionCalculator.getMachinesForRecipe(recipe.id);
                            const machine = machines[0];
                            const techTier = recipeToTechTier.get(recipe.id) || 0;
                            const tierInfo = techTiers.find(t => t.tier === techTier) || techTiers[0];

                            return (
                                <div
                                    key={recipe.id}
                                    onClick={() => toggleRecipe(recipe.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '8px 12px',
                                        backgroundColor: isDisabled ? 'rgba(90, 42, 42, 0.2)' : 'rgba(26, 26, 26, 0.5)',
                                        border: `1px solid ${isDisabled ? '#7a3a3a' : '#333'}`,
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        opacity: isDisabled ? 0.5 : 1
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = isDisabled ? 'rgba(90, 42, 42, 0.3)' : 'rgba(42, 42, 42, 0.8)';
                                        e.currentTarget.style.borderColor = isDisabled ? '#9a4a4a' : '#4a90e2';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = isDisabled ? 'rgba(90, 42, 42, 0.2)' : 'rgba(26, 26, 26, 0.5)';
                                        e.currentTarget.style.borderColor = isDisabled ? '#7a3a3a' : '#333';
                                    }}
                                >
                                    {/* Checkbox */}
                                    <input
                                        type="checkbox"
                                        checked={!isDisabled}
                                        onChange={() => { }}
                                        style={{
                                            cursor: 'pointer',
                                            width: '18px',
                                            height: '18px',
                                            flexShrink: 0
                                        }}
                                    />

                                    {/* Tech Tier Badge */}
                                    <div
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: tierInfo.color,
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            minWidth: '32px',
                                            textAlign: 'center',
                                            flexShrink: 0
                                        }}
                                        title={tierInfo.description}
                                    >
                                        {tierInfo.label}
                                    </div>

                                    {/* Mini Recipe Card */}
                                    <div style={{ flex: 1 }}>
                                        <MiniRecipeCard recipe={recipe} iconSize={22} />
                                    </div>

                                    {/* Recipe Name */}
                                    <div style={{
                                        flex: 1,
                                        minWidth: '200px',
                                        textDecoration: isDisabled ? 'line-through' : 'none'
                                    }}>
                                        <div style={{ fontSize: '0.95rem', color: '#ddd', fontWeight: '600' }}>
                                            {recipe.name}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '2px' }}>
                                            {machine?.name || 'Unknown Machine'}
                                        </div>
                                    </div>

                                    {/* Stats with ICONS */}
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#888' }}>
                                        {machine && (
                                            <>
                                                <div title="Workers" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    {workerIcon && (
                                                        <img src={workerIcon} alt="Workers" style={{ width: '14px', height: '14px' }} />
                                                    )}
                                                    {machine.workers}
                                                </div>

                                                <div title="Power" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    {powerIcon && (
                                                        <img src={powerIcon} alt="Power" style={{ width: '14px', height: '14px' }} />
                                                    )}
                                                    {machine.electricityKw}kW
                                                </div>

                                                {machine.computingTFlops > 0 && (
                                                    <div title="Computing" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        {computingIcon && (
                                                            <img src={computingIcon} alt="Computing" style={{ width: '14px', height: '14px' }} />
                                                        )}
                                                        {machine.computingTFlops}
                                                    </div>
                                                )}

                                                {clockIcon && (
                                                    <div title="Duration" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <img src={clockIcon} alt="Time" style={{ width: '14px', height: '14px' }} />
                                                        {recipe.durationSeconds}s
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {filteredAndSortedRecipes.length === 0 && (
                            <div style={{
                                textAlign: 'center',
                                padding: '40px',
                                color: '#666',
                                fontSize: '1.1rem'
                            }}>
                                No recipes found matching your filters
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 24px',
                    borderTop: '2px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ fontSize: '0.95rem', color: '#aaa' }}>
                        <strong style={{ color: '#ff6666' }}>{localDisabledRecipes.size}</strong> recipe{localDisabledRecipes.size !== 1 ? 's' : ''} disabled
                        {' · '}
                        <strong style={{ color: '#66ff66' }}>{allRecipes.length - localDisabledRecipes.size}</strong> enabled
                        {' · '}
                        Showing <strong style={{ color: '#66aaff' }}>{filteredAndSortedRecipes.length}</strong> recipes
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={handleCancel}
                            style={{
                                padding: '10px 24px',
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #444',
                                borderRadius: '6px',
                                color: '#aaa',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#3a3a3a';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#2a2a2a';
                                e.currentTarget.style.color = '#aaa';
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApply}
                            style={{
                                padding: '10px 24px',
                                backgroundColor: '#4a90e2',
                                border: '1px solid #5aa0f2',
                                borderRadius: '6px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5aa0f2'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                        >
                            Apply Constraints
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeConstraintModal;