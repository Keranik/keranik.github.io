// src/components/farm-optimizer/ConstraintsPanel.jsx
import { useState } from 'react';
import { getEntityIcon, getCropIcon, getGeneralIcon } from '../../utils/AssetHelper';
import RecipeConstraintModal from '../RecipeConstraintModal';
import MiniRecipeCard from '../MiniRecipeCard';
import { FoodChainResolver } from '../../utils/FoodChainResolver';
import ProductionCalculator from '../../utils/ProductionCalculator';
import ToggleSwitch from '../common/ToggleSwitch';  // Add at top of file

const ConstraintsPanel = ({
    constraints,
    availableFarms,
    availableFoodCrops,
    onConstraintsChange
}) => {
    const [recipeFilterOpen, setRecipeFilterOpen] = useState(false);

    const filterIcon = getGeneralIcon('Filter');
    const successIcon = getGeneralIcon('Success');
    const blockedIcon = getGeneralIcon('Blocked');
    const checkmarkIcon = getGeneralIcon('Checkmark');
    const plusIcon = getGeneralIcon('Plus');

    // Get all food-related recipes
    const getAllFoodRecipes = () => {
        const foodRecipeIds = new Set();

        availableFoodCrops.forEach(crop => {
            const paths = FoodChainResolver.getFoodsFromCrop(crop.output.productId);
            paths.forEach(path => {
                path.recipeChain?.forEach(recipeId => {
                    foodRecipeIds.add(recipeId);
                });
            });
        });

        return Array.from(foodRecipeIds)
            .map(id => ProductionCalculator.getRecipe(id))
            .filter(recipe => recipe !== null);
    };

    const allFoodRecipes = getAllFoodRecipes();
    const allFoodRecipeIds = new Set(allFoodRecipes.map(r => r.id));

    // Convert allowedRecipes to disabled recipes format
    const getDisabledRecipes = () => {
        if (constraints.allowedRecipes === null) {
            return new Set();
        }

        const disabled = new Set();
        allFoodRecipeIds.forEach(recipeId => {
            if (!constraints.allowedRecipes.includes(recipeId)) {
                disabled.add(recipeId);
            }
        });
        return disabled;
    };

    const handleRecipeFilterApply = (disabledRecipes) => {
        if (disabledRecipes.size === 0) {
            onConstraintsChange({ ...constraints, allowedRecipes: null });
        } else {
            const allowed = Array.from(allFoodRecipeIds).filter(id => !disabledRecipes.has(id));
            onConstraintsChange({ ...constraints, allowedRecipes: allowed });
        }
        setRecipeFilterOpen(false);
    };

    const disabledRecipes = getDisabledRecipes();
    const enabledRecipes = allFoodRecipes.filter(r => !disabledRecipes.has(r.id));
    const disabledRecipesList = allFoodRecipes.filter(r => disabledRecipes.has(r.id));
    const showDisabled = disabledRecipes.size < enabledRecipes.length;
    const displayRecipes = showDisabled ? disabledRecipesList : enabledRecipes;
    const maxPreviewRecipes = 12;

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

    // Determine if filters are active
    const farmFilterActive = constraints.allowedFarmTypes.length > 0 &&
        constraints.allowedFarmTypes.length < availableFarms.length;
    const cropFilterActive = constraints.allowedCrops.length > 0 &&
        constraints.allowedCrops.length < availableFoodCrops.length;

    return (
        <>
            {/* NO outer container - part of parent controls */}

            {/* Section Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1rem'
            }}>
                {filterIcon && (
                    <img src={filterIcon} alt="Filters" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                )}
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#ccc' }}>
                    Constraints & Filters
                </h4>
            </div>

            {/* Farm Types Section */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                }}>
                    <label style={{ color: '#ccc', fontWeight: '600', fontSize: '0.9rem' }}>
                        Farm Types
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            color: farmFilterActive ? '#4a90e2' : '#888',
                            fontWeight: '600'
                        }}>
                            {constraints.allowedFarmTypes.length === 0 ? availableFarms.length : constraints.allowedFarmTypes.length} / {availableFarms.length}
                        </span>
                        {farmFilterActive && (
                            <button
                                onClick={() => onConstraintsChange({ ...constraints, allowedFarmTypes: [] })}
                                style={{
                                    padding: '3px 8px',
                                    backgroundColor: 'rgba(255, 107, 107, 0.15)',
                                    border: '1px solid rgba(255, 107, 107, 0.4)',
                                    borderRadius: '4px',
                                    color: '#ff6b6b',
                                    cursor: 'pointer',
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.15)';
                                }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {availableFarms.slice().sort((a, b) => {
                        const getTier = (farm) => {
                            const match = farm.id.match(/T(\d+)/);
                            return match ? parseInt(match[1]) : 0;
                        };
                        return getTier(a) - getTier(b);
                    }).map(farm => {
                        const farmIcon = getEntityIcon(farm);
                        const isAllowed = constraints.allowedFarmTypes.length === 0 ||
                            constraints.allowedFarmTypes.includes(farm.id);

                        return (
                            <button
                                key={farm.id}
                                onClick={() => toggleFarmType(farm.id)}
                                title={farm.name}
                                style={{
                                    padding: '0.5rem',
                                    backgroundColor: isAllowed ? 'rgba(74, 144, 226, 0.15)' : 'transparent',
                                    border: isAllowed ? '2px solid #4a90e2' : '2px solid #444',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.15s ease',
                                    opacity: isAllowed ? 1 : 0.5,
                                    width: '64px',
                                    height: '72px',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
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
                                            filter: isAllowed ? 'none' : 'grayscale(100%)',
                                            marginBottom: '4px'
                                        }}
                                    />
                                )}
                                <span style={{
                                    fontSize: '0.65rem',
                                    color: isAllowed ? '#4a90e2' : '#666',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    lineHeight: '1.1'
                                }}>
                                    {farm.name.replace('Farm ', '')}
                                </span>
                                {isAllowed && successIcon && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '4px',
                                        backgroundColor: '#4a90e2',
                                        borderRadius: '50%',
                                        padding: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            src={successIcon}
                                            alt="Selected"
                                            style={{ width: '10px', height: '10px' }}
                                        />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Crops Section */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                }}>
                    <label style={{ color: '#ccc', fontWeight: '600', fontSize: '0.9rem' }}>
                        Allowed Crops
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            color: cropFilterActive ? '#50C878' : '#888',
                            fontWeight: '600'
                        }}>
                            {constraints.allowedCrops.length === 0 ? availableFoodCrops.length : constraints.allowedCrops.length} / {availableFoodCrops.length}
                        </span>
                        {cropFilterActive && (
                            <button
                                onClick={() => onConstraintsChange({ ...constraints, allowedCrops: [] })}
                                style={{
                                    padding: '3px 8px',
                                    backgroundColor: 'rgba(255, 107, 107, 0.15)',
                                    border: '1px solid rgba(255, 107, 107, 0.4)',
                                    borderRadius: '4px',
                                    color: '#ff6b6b',
                                    cursor: 'pointer',
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.15)';
                                }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {availableFoodCrops.map(crop => {
                        const cropIcon = getCropIcon(crop);
                        const isAllowed = constraints.allowedCrops.length === 0 ||
                            constraints.allowedCrops.includes(crop.id);

                        return (
                            <button
                                key={crop.id}
                                onClick={() => toggleCrop(crop.id)}
                                title={crop.name}
                                style={{
                                    padding: '0.5rem',
                                    backgroundColor: isAllowed ? 'rgba(80, 200, 120, 0.15)' : 'transparent',
                                    border: isAllowed ? '2px solid #50C878' : '2px solid #444',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.15s ease',
                                    opacity: isAllowed ? 1 : 0.5,
                                    width: '64px',
                                    height: '72px',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
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
                                            filter: isAllowed ? 'none' : 'grayscale(100%)',
                                            marginBottom: '4px'
                                        }}
                                    />
                                )}
                                <span style={{
                                    fontSize: '0.65rem',
                                    color: isAllowed ? '#50C878' : '#666',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    lineHeight: '1.1'
                                }}>
                                    {crop.name}
                                </span>
                                {isAllowed && successIcon && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '4px',
                                        backgroundColor: '#50C878',
                                        borderRadius: '50%',
                                        padding: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            src={successIcon}
                                            alt="Selected"
                                            style={{ width: '10px', height: '10px' }}
                                        />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Food Recipe Constraints Section */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                }}>
                    <label style={{ color: '#ccc', fontWeight: '600', fontSize: '0.9rem' }}>
                        Food Recipe Constraints
                    </label>
                    <button
                        onClick={() => setRecipeFilterOpen(true)}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: disabledRecipes.size > 0 ? 'rgba(255, 107, 107, 0.15)' : '#333',
                            border: disabledRecipes.size > 0 ? '1px solid rgba(255, 107, 107, 0.4)' : '1px solid #555',
                            borderRadius: '4px',
                            color: disabledRecipes.size > 0 ? '#ff6b6b' : '#ddd',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = disabledRecipes.size > 0 ? 'rgba(255, 107, 107, 0.25)' : '#3a3a3a';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = disabledRecipes.size > 0 ? 'rgba(255, 107, 107, 0.15)' : '#333';
                        }}
                    >
                        {filterIcon && (
                            <img src={filterIcon} alt="Filter" style={{ width: '14px', height: '14px' }} />
                        )}
                        Recipe Filter
                        {disabledRecipes.size > 0 && (
                            <span style={{
                                padding: '2px 5px',
                                backgroundColor: 'rgba(255, 107, 107, 0.3)',
                                borderRadius: '3px',
                                fontSize: '0.7rem',
                                fontWeight: '700'
                            }}>
                                {disabledRecipes.size}
                            </span>
                        )}
                    </button>
                </div>

                {/* Recipe Preview */}
                {disabledRecipes.size > 0 ? (
                    <div style={{
                        backgroundColor: '#1a1a1a',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #333'
                    }}>
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#888',
                            marginBottom: '8px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            {showDisabled ? (
                                <>
                                    {blockedIcon && (
                                        <img src={blockedIcon} alt="Blocked" style={{ width: '16px', height: '16px' }} />
                                    )}
                                    {disabledRecipes.size} disabled
                                </>
                            ) : (
                                <>
                                    {checkmarkIcon && (
                                        <img src={checkmarkIcon} alt="Enabled" style={{ width: '16px', height: '16px' }} />
                                    )}
                                    {enabledRecipes.length} enabled
                                </>
                            )}
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                            gap: '6px',
                            maxHeight: '150px',
                            overflowY: 'auto'
                        }}>
                            {displayRecipes.slice(0, maxPreviewRecipes).map(recipe => (
                                <div
                                    key={recipe.id}
                                    style={{
                                        backgroundColor: '#0a0a0a',
                                        padding: '6px',
                                        borderRadius: '4px',
                                        border: showDisabled ? '1px solid rgba(255, 107, 107, 0.3)' : '1px solid rgba(80, 200, 120, 0.3)',
                                        opacity: showDisabled ? 0.6 : 1
                                    }}
                                >
                                    <MiniRecipeCard recipe={recipe} iconSize={16} />
                                </div>
                            ))}
                        </div>
                        {displayRecipes.length > maxPreviewRecipes && (
                            <div style={{
                                marginTop: '8px',
                                fontSize: '0.7rem',
                                color: '#666',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px'
                            }}>
                                {plusIcon && (
                                    <img src={plusIcon} alt="More" style={{ width: '12px', height: '12px' }} />
                                )}
                                +{displayRecipes.length - maxPreviewRecipes} more...
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        fontStyle: 'italic',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        {checkmarkIcon && (
                            <img src={checkmarkIcon} alt="All Enabled" style={{ width: '14px', height: '14px' }} />
                        )}
                        All {allFoodRecipes.length} food recipes enabled
                    </div>
                )}
            </div>

            {/* Advanced Options Section */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#ccc',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                }}>
                    Advanced Options
                </label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                }}>
                    {/* Natural Fertility Only */}
                    <div style={{
                        backgroundColor: constraints.naturalFertilityOnly ? 'rgba(80, 200, 120, 0.05)' : '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '6px',
                        border: constraints.naturalFertilityOnly ? '1px solid rgba(80, 200, 120, 0.3)' : '1px solid #444',
                        transition: 'all 0.3s',
                        boxShadow: constraints.naturalFertilityOnly ? '0 0 8px rgba(80, 200, 120, 0.15)' : 'none'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem'
                        }}>
                            <label style={{
                                color: constraints.naturalFertilityOnly ? '#50C878' : '#ddd',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                transition: 'color 0.3s'
                            }}>
                                Natural Fertility Only
                            </label>
                            <ToggleSwitch
                                value={constraints.naturalFertilityOnly}
                                onChange={() => onConstraintsChange({
                                    ...constraints,
                                    naturalFertilityOnly: !constraints.naturalFertilityOnly
                                })}
                                size="sm"
                                showIcons={false}
                                onColor="#50C878"
                            />
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#888' }}>
                            Don't use fertilizer in calculations
                        </div>
                        {constraints.naturalFertilityOnly && (
                            <div style={{
                                marginTop: '8px',
                                fontSize: '0.7rem',
                                color: '#50C878',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <span style={{
                                    width: '6px',
                                    height: '6px',
                                    backgroundColor: '#50C878',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 6px rgba(80, 200, 120, 0.6)'
                                }}></span>
                                Active Constraint
                            </div>
                        )}
                    </div>

                    {/* Max Farms */}
                    <div style={{
                        backgroundColor: constraints.maxFarms !== null ? 'rgba(80, 200, 120, 0.05)' : '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '6px',
                        border: constraints.maxFarms !== null ? '1px solid rgba(80, 200, 120, 0.3)' : '1px solid #444',
                        transition: 'all 0.3s',
                        boxShadow: constraints.maxFarms !== null ? '0 0 8px rgba(80, 200, 120, 0.15)' : 'none'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem'
                        }}>
                            <label style={{
                                color: constraints.maxFarms !== null ? '#50C878' : '#ddd',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                transition: 'color 0.3s'
                            }}>
                                Max Farms
                            </label>
                            <ToggleSwitch
                                value={constraints.maxFarms !== null}
                                onChange={() => {
                                    if (constraints.maxFarms !== null) {
                                        onConstraintsChange({ ...constraints, maxFarms: null });
                                    } else {
                                        onConstraintsChange({ ...constraints, maxFarms: 5 });
                                    }
                                }}
                                size="sm"
                                showIcons={false}
                                onColor="#50C878"
                            />
                        </div>
                        {constraints.maxFarms !== null ? (
                            <>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '0.75rem'
                                }}>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        value={constraints.maxFarms}
                                        onChange={(e) => onConstraintsChange({
                                            ...constraints,
                                            maxFarms: parseInt(e.target.value)
                                        })}
                                        style={{
                                            flex: 1,
                                            height: '6px',
                                            backgroundColor: 'rgba(80, 200, 120, 0.2)',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <span style={{
                                        color: '#50C878',
                                        fontWeight: '700',
                                        minWidth: '30px',
                                        textAlign: 'right'
                                    }}>
                                        {constraints.maxFarms}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={constraints.maxFarms}
                                    onChange={(e) => onConstraintsChange({
                                        ...constraints,
                                        maxFarms: parseInt(e.target.value) || 1
                                    })}
                                    style={{
                                        width: '100%',
                                        padding: '6px',
                                        backgroundColor: '#333',
                                        color: 'white',
                                        border: '2px solid rgba(80, 200, 120, 0.3)',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem'
                                    }}
                                />
                                <div style={{
                                    marginTop: '8px',
                                    fontSize: '0.7rem',
                                    color: '#50C878',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        backgroundColor: '#50C878',
                                        borderRadius: '50%',
                                        boxShadow: '0 0 6px rgba(80, 200, 120, 0.6)'
                                    }}></span>
                                    Active Constraint
                                </div>
                            </>
                        ) : (
                            <div style={{ fontSize: '0.7rem', color: '#888', fontStyle: 'italic' }}>
                                No limit
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recipe Constraint Modal */}
            <RecipeConstraintModal
                isOpen={recipeFilterOpen}
                onClose={() => setRecipeFilterOpen(false)}
                disabledRecipes={disabledRecipes}
                onApply={handleRecipeFilterApply}
                availableRecipes={allFoodRecipes}
            />
        </>
    );
};

export default ConstraintsPanel;