import React, { useState } from 'react';
import { getProductIcon, getGeneralIcon } from '../utils/AssetHelper';
import ProductionCalculator from '../utils/ProductionCalculator';
import ProductSelectorModal from './ProductSelectorModal';

const CONSTRAINT_RANGES = {
    maxWorkers: { min: 1, max: 1000, step: 1 },
    maxPower: { min: 0, max: 10000, step: 100 },
    maxMachines: { min: 1, max: 500, step: 1 },
    maxComputing: { min: 0, max: 5000, step: 100 },
    maxMaintenance: { min: 0, max: 1000, step: 10 }
};

const GOAL_OPTIONS = [
    { value: 'minimizeWorkers', label: 'Min Workers', icon: 'Worker' },
    { value: 'minimizePower', label: 'Min Power', icon: 'Electricity' },
    { value: 'minimizeMachines', label: 'Min Machines', icon: 'Machines' },
    { value: 'minimizeMaintenance', label: 'Min Maintenance', icon: 'Maintenance' },
    { value: 'minimizeComputing', label: 'Min Computing', icon: 'Computing' },
    { value: 'maximizeProduction', label: 'Max Production', icon: 'Buildings' }
];

const CONSTRAINT_ICON_MAP = {
    maxWorkers: 'Worker',
    maxPower: 'Electricity',
    maxMachines: 'Machines',
    maxComputing: 'Computing',
    maxMaintenance: 'Maintenance'
};

const OptimizationControls = ({
    optimizationMode,
    optimizationGoal,
    optimizationConstraints,
    resourceConstraints,
    resourceInput,
    optimizationResult,
    onToggleOptimization,
    onChangeGoal,
    onChangeConstraints,
    onChangeResourceInput,
    onAddResourceConstraint,
    onRemoveResourceConstraint,
    onSelectAlternative,
    currentAlternative = 'best'
}) => {
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

    if (!optimizationMode) {
        return null;
    }

    const handleGoalSelect = (goalValue) => {
        onChangeGoal(goalValue);
    };

    const handleResourceProductSelect = (productId) => {
        const product = ProductionCalculator.getProduct(productId);
        if (product) {
            onChangeResourceInput({ ...resourceInput, productId, productName: product.name });
        }
        setIsResourceModalOpen(false);
    };

    const handleAddResourceConstraint = () => {
        if (resourceInput.productId && resourceInput.quantity) {
            onAddResourceConstraint(resourceInput.productId, resourceInput.quantity);
            onChangeResourceInput({ productId: null, productName: '', quantity: null });
        }
    };

    const handleConstraintChange = (key, value) => {
        // If value is explicitly null, disable the constraint
        if (value === null) {
            onChangeConstraints({
                ...optimizationConstraints,
                [key]: null
            });
            return;
        }

        // Convert to number, keep 0 as valid
        const numValue = typeof value === 'number' ? value : parseFloat(value);

        // Only set null if the value is NaN or empty string
        onChangeConstraints({
            ...optimizationConstraints,
            [key]: isNaN(numValue) ? null : numValue
        });
    };

    const productsForModal = ProductionCalculator.products || [];

    return (
        <div style={{
            backgroundColor: '#2a2a2a',
            padding: '2rem',
            borderRadius: '10px',
            marginBottom: '2rem',
            border: '1px solid #444',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
            <h3 style={{
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#50C878',
                display: 'flex',
                alignItems: 'center'
            }}>
                {getGeneralIcon('Stats') && (
                    <img
                        src={getGeneralIcon('Stats')}
                        alt="Settings"
                        style={{
                            width: '24px',
                            height: '24px',
                            objectFit: 'contain',
                            marginRight: '12px'
                        }}
                    />
                )}
                Optimization Settings
            </h3>

            {/* Optimization Goal Grid */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#ccc',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                }}>
                    Optimization Goal
                </label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '1rem'
                }}>
                    {GOAL_OPTIONS.map(goal => {
                        const isSelected = goal.value === optimizationGoal;
                        const goalIcon = getGeneralIcon(goal.icon);
                        return (
                            <div
                                key={goal.value}
                                onClick={() => handleGoalSelect(goal.value)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.1)' : '#1a1a1a',
                                    border: isSelected ? '2px solid #4a90e2' : '1px solid #333',
                                    borderRadius: '8px',
                                    padding: '14px 10px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'center',
                                    minHeight: '100px'
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
                                {goalIcon && (
                                    <img
                                        src={goalIcon}
                                        alt={goal.label}
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            objectFit: 'contain',
                                            marginBottom: '8px',
                                            opacity: isSelected ? 1 : 0.7
                                        }}
                                    />
                                )}
                                <span style={{
                                    color: isSelected ? '#4a90e2' : '#ddd',
                                    fontWeight: isSelected ? '700' : '600',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.3'
                                }}>
                                    {goal.label}
                                </span>
                                {isSelected && (
                                    <div style={{
                                        marginTop: '6px',
                                        padding: '2px 6px',
                                        backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        color: '#4a90e2',
                                        fontWeight: '700',
                                        border: '1px solid rgba(74, 144, 226, 0.4)'
                                    }}>
                                        ✓ SELECTED
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Constraints Sliders */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#ccc',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                }}>
                    Constraints (Optional)
                </label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                }}>
                    {Object.entries(CONSTRAINT_RANGES).map(([key, range]) => {
                        const currentValue = optimizationConstraints[key];
                        const isEnabled = currentValue !== null && currentValue !== undefined;
                        const displayValue = isEnabled ? currentValue : range.min;
                        const constraintIconKey = CONSTRAINT_ICON_MAP[key];
                        const constraintIcon = constraintIconKey ? getGeneralIcon(constraintIconKey) : null;
                        const labelText = key.replace('max', '').replace(/([A-Z])/g, ' $1').trim();

                        return (
                            <div
                                key={key}
                                style={{
                                    backgroundColor: isEnabled ? 'rgba(80, 200, 120, 0.05)' : '#1a1a1a',
                                    padding: '1rem',
                                    borderRadius: '6px',
                                    border: isEnabled ? '1px solid rgba(80, 200, 120, 0.3)' : '1px solid #444',
                                    transition: 'all 0.3s',
                                    boxShadow: isEnabled ? '0 0 8px rgba(80, 200, 120, 0.15)' : 'none'
                                }}
                            >
                                {/* Header with toggle */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.75rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {constraintIcon && (
                                            <img
                                                src={constraintIcon}
                                                alt={labelText}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    objectFit: 'contain',
                                                    marginRight: '8px',
                                                    opacity: isEnabled ? 1 : 0.5
                                                }}
                                            />
                                        )}
                                        <label style={{
                                            color: isEnabled ? '#50C878' : '#888',
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            margin: 0,
                                            transition: 'color 0.3s'
                                        }}>
                                            Max {labelText}
                                        </label>
                                    </div>

                                    {/* Toggle Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (isEnabled) {
                                                // Disable: set to null
                                                handleConstraintChange(key, null);
                                            } else {
                                                // Enable: set to current display value
                                                handleConstraintChange(key, displayValue);
                                            }
                                        }}
                                        style={{
                                            padding: '4px 10px',
                                            backgroundColor: isEnabled ? 'rgba(80, 200, 120, 0.2)' : '#333',
                                            color: isEnabled ? '#50C878' : '#888',
                                            border: isEnabled ? '1px solid rgba(80, 200, 120, 0.4)' : '1px solid #555',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            transition: 'all 0.2s',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (isEnabled) {
                                                e.target.style.backgroundColor = 'rgba(80, 200, 120, 0.3)';
                                                e.target.style.borderColor = 'rgba(80, 200, 120, 0.6)';
                                            } else {
                                                e.target.style.backgroundColor = '#3a3a3a';
                                                e.target.style.borderColor = '#666';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (isEnabled) {
                                                e.target.style.backgroundColor = 'rgba(80, 200, 120, 0.2)';
                                                e.target.style.borderColor = 'rgba(80, 200, 120, 0.4)';
                                            } else {
                                                e.target.style.backgroundColor = '#333';
                                                e.target.style.borderColor = '#555';
                                            }
                                        }}
                                    >
                                        {isEnabled ? '✓ On' : 'Off'}
                                    </button>
                                </div>

                                {/* Slider */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '0.75rem',
                                    opacity: isEnabled ? 1 : 0.4,
                                    transition: 'opacity 0.3s'
                                }}>
                                    <input
                                        type="range"
                                        min={range.min}
                                        max={range.max}
                                        step={range.step}
                                        value={displayValue}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value);
                                            handleConstraintChange(key, newValue);
                                        }}
                                        disabled={!isEnabled}
                                        style={{
                                            flex: 1,
                                            height: '6px',
                                            backgroundColor: isEnabled ? 'rgba(80, 200, 120, 0.2)' : '#333',
                                            borderRadius: '3px',
                                            outline: 'none',
                                            appearance: 'none',
                                            cursor: isEnabled ? 'pointer' : 'not-allowed',
                                            transition: 'background-color 0.3s'
                                        }}
                                    />
                                    <span style={{
                                        color: isEnabled ? '#50C878' : '#666',
                                        fontWeight: '700',
                                        minWidth: '80px',
                                        textAlign: 'right',
                                        fontSize: '0.95rem',
                                        transition: 'color 0.3s'
                                    }}>
                                        {isEnabled ? displayValue : '—'}
                                    </span>
                                </div>

                                {/* Number Input */}
                                <input
                                    type="number"
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    value={isEnabled ? currentValue : ''}
                                    onChange={(e) => {
                                        const newValue = e.target.value ? parseFloat(e.target.value) : range.min;
                                        handleConstraintChange(key, newValue);
                                    }}
                                    placeholder={isEnabled ? `${range.min}` : 'Disabled'}
                                    disabled={!isEnabled}
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        padding: '8px 10px',
                                        backgroundColor: isEnabled ? '#333' : '#2a2a2a',
                                        color: isEnabled ? 'white' : '#666',
                                        border: isEnabled ? '2px solid rgba(80, 200, 120, 0.3)' : '2px solid #444',
                                        borderRadius: '6px',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.3s',
                                        cursor: isEnabled ? 'text' : 'not-allowed'
                                    }}
                                    onFocus={(e) => {
                                        if (isEnabled) {
                                            e.target.style.borderColor = '#50C878';
                                            e.target.style.backgroundColor = '#3a3a3a';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (isEnabled) {
                                            e.target.style.borderColor = 'rgba(80, 200, 120, 0.3)';
                                            e.target.style.backgroundColor = '#333';
                                        }
                                    }}
                                />

                                {/* Status indicator */}
                                {isEnabled && (
                                    <div style={{
                                        marginTop: '8px',
                                        fontSize: '0.75rem',
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
                                            display: 'inline-block',
                                            boxShadow: '0 0 6px rgba(80, 200, 120, 0.6)'
                                        }}></span>
                                        Active Constraint
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Resource Constraints Section */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    color: '#ccc',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                }}>
                    Resource Limits (Optional)
                </label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 140px auto',
                    gap: '1rem',
                    alignItems: 'end',
                    marginBottom: '1rem'
                }}>
                    <button
                        type="button"
                        onClick={() => setIsResourceModalOpen(true)}
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
                            transition: 'all 0.2s',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#4a90e2';
                            e.target.style.backgroundColor = '#3a3a3a';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = '#555';
                            e.target.style.backgroundColor = '#333';
                        }}
                    >
                        <span>{resourceInput.productName || 'Select resource...'}</span>
                        <span style={{ color: '#4a90e2' }}>▼</span>
                    </button>
                    <input
                        type="number"
                        placeholder="Max rate"
                        value={resourceInput.quantity || ''}
                        onChange={(e) => onChangeResourceInput({
                            ...resourceInput,
                            quantity: parseFloat(e.target.value) || null
                        })}
                        min="0"
                        step="1"
                        style={{
                            padding: '12px',
                            backgroundColor: '#333',
                            color: 'white',
                            border: '2px solid #555',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                        onBlur={(e) => e.target.style.borderColor = '#555'}
                    />
                    <button
                        type="button"
                        onClick={handleAddResourceConstraint}
                        disabled={!resourceInput.productId || !resourceInput.quantity}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: resourceInput.productId && resourceInput.quantity ? '#4a90e2' : '#555',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            cursor: resourceInput.productId && resourceInput.quantity ? 'pointer' : 'not-allowed',
                            fontWeight: '700',
                            transition: 'all 0.2s',
                            boxShadow: resourceInput.productId && resourceInput.quantity
                                ? '0 2px 8px rgba(74, 144, 226, 0.3)'
                                : 'none'
                        }}
                        onMouseEnter={(e) => {
                            if (resourceInput.productId && resourceInput.quantity) {
                                e.target.style.backgroundColor = '#5aa0f2';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (resourceInput.productId && resourceInput.quantity) {
                                e.target.style.backgroundColor = '#4a90e2';
                            }
                        }}
                    >
                        Add Limit
                    </button>
                </div>

                {/* Resource Constraint List */}
                {resourceConstraints.size > 0 && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>
                        {Array.from(resourceConstraints.entries()).map(([productId, maxRate]) => {
                            const product = ProductionCalculator.getProduct(productId);
                            const icon = getProductIcon(product);
                            return (
                                <div
                                    key={productId}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#1a1a1a',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #444'
                                    }}
                                >
                                    {icon && (
                                        <img
                                            src={icon}
                                            alt={product?.name}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    )}
                                    <span style={{ color: '#ddd', fontWeight: '600', fontSize: '0.9rem' }}>
                                        {product?.name}
                                    </span>
                                    <span style={{ color: '#888' }}>≤</span>
                                    <span style={{ color: '#4a90e2', fontWeight: 'bold' }}>
                                        {maxRate}/min
                                    </span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRemoveResourceConstraint(productId);
                                        }}
                                        style={{
                                            marginLeft: '8px',
                                            padding: '2px 8px',
                                            backgroundColor: '#ff6b6b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5252'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b6b'}
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
                <div>
                    {/* Main success message */}
                    <div style={{
                        padding: '12px 16px',
                        backgroundColor: 'rgba(80, 200, 120, 0.1)',
                        border: '1px solid rgba(80, 200, 120, 0.3)',
                        borderRadius: '6px',
                        fontSize: '0.95rem',
                        color: '#50C878',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        {getGeneralIcon('Checkmark') && (
                            <img
                                src={getGeneralIcon('Checkmark')}
                                alt="Success"
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    objectFit: 'contain',
                                    marginRight: '10px',
                                    flexShrink: 0
                                }}
                            />
                        )}
                        <span style={{ fontWeight: '600' }}>
                            {optimizationResult.explanation}
                        </span>
                    </div>

                    {/* Alternatives Expandable Section */}
                    {optimizationResult.alternatives?.length > 0 && (
                        <AlternativesSection
                            optimizationResult={optimizationResult}
                            onSelectAlternative={onSelectAlternative}
                            currentAlternative={currentAlternative}
                        />
                    )}
                </div>
            )}

            {optimizationResult?.error && (
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    border: '1px solid rgba(255, 107, 107, 0.3)',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    color: '#ff6b6b',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {getGeneralIcon('Warning') && (
                        <img
                            src={getGeneralIcon('Warning')}
                            alt="Warning"
                            style={{
                                width: '18px',
                                height: '18px',
                                objectFit: 'contain',
                                marginRight: '10px',
                                flexShrink: 0
                            }}
                        />
                    )}
                    <span style={{ fontWeight: '600' }}>
                        {optimizationResult.error}
                    </span>
                </div>
            )}

            {/* Resource Product Selector Modal */}
            <ProductSelectorModal
                isOpen={isResourceModalOpen}
                onClose={() => setIsResourceModalOpen(false)}
                onSelectProduct={handleResourceProductSelect}
                products={productsForModal}
                currentProductId={resourceInput.productId}
            />
        </div>
    );
};

/**
 * Alternatives Section - Nested inside OptimizationControls
 */
const AlternativesSection = ({ optimizationResult, onSelectAlternative, currentAlternative }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const totalSolutions = (optimizationResult.alternatives?.length || 0) + 1;

    return (
        <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '6px',
            overflow: 'hidden'
        }}>
            {/* Collapsible Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    color: '#ddd'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#252525'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                        fontSize: '1rem',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        color: '#888'
                    }}>
                        ▶
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#ddd' }}>
                        {totalSolutions} Solution{totalSolutions > 1 ? 's' : ''} Found
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>
                        ({isExpanded ? 'Click to collapse' : 'Click to compare alternatives'})
                    </span>
                </div>

                {!isExpanded && currentAlternative !== 'best' && (
                    <span style={{
                        fontSize: '0.8rem',
                        color: '#4a90e2',
                        fontWeight: '600',
                        padding: '4px 8px',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        borderRadius: '4px',
                        border: '1px solid rgba(74, 144, 226, 0.3)'
                    }}>
                        Alternative Active
                    </span>
                )}
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div style={{
                    padding: '16px',
                    borderTop: '1px solid #333'
                }}>
                    {/* Best Solution */}
                    <SolutionCard
                        solution={{
                            score: optimizationResult.score,
                            metrics: optimizationResult.metrics,
                            reason: 'Optimal solution for selected goal',
                            recipeOverrides: optimizationResult.recipeOverrides
                        }}
                        index={0}
                        isBest={true}
                        isSelected={currentAlternative === 'best'}
                        onSelect={() => onSelectAlternative('best', optimizationResult.recipeOverrides)}
                    />

                    {/* Alternative Solutions */}
                    {optimizationResult.alternatives.map((alt, idx) => (
                        <SolutionCard
                            key={idx}
                            solution={alt}
                            index={idx + 1}
                            isBest={false}
                            isSelected={currentAlternative === `alt-${idx}`}
                            onSelect={() => onSelectAlternative(`alt-${idx}`, alt.recipeOverrides)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * Individual Solution Card
 */
const SolutionCard = ({ solution, index, isBest, isSelected, onSelect }) => {
    const metrics = solution.metrics;

    return (
        <div
            onClick={onSelect}
            style={{
                marginBottom: '10px',
                padding: '12px',
                backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.08)' : '#0a0a0a',
                border: isSelected ? '1px solid rgba(74, 144, 226, 0.4)' : '1px solid #333',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
            }}
            onMouseEnter={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.borderColor = '#444';
                    e.currentTarget.style.backgroundColor = '#151515';
                }
            }}
            onMouseLeave={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.backgroundColor = '#0a0a0a';
                }
            }}
        >
            {/* Badge */}
            {isBest && (
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '3px 8px',
                    backgroundColor: 'rgba(80, 200, 120, 0.15)',
                    color: '#50C878',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    border: '1px solid rgba(80, 200, 120, 0.3)'
                }}>
                    ★ BEST
                </div>
            )}

            {/* Title */}
            <div style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                color: isSelected ? '#4a90e2' : '#ddd',
                marginBottom: '8px',
                paddingRight: isBest ? '70px' : '0'
            }}>
                Solution #{index + 1}
                {isSelected && (
                    <span style={{
                        marginLeft: '8px',
                        fontSize: '0.75rem',
                        color: '#4a90e2',
                        fontWeight: '600'
                    }}>
                        (Active)
                    </span>
                )}
            </div>

            {/* Compact Metrics */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                marginBottom: '8px'
            }}>
                <MetricBadge label="Workers" value={metrics.workers} />
                <MetricBadge label="Power" value={`${(metrics.powerKw / 1000).toFixed(1)}MW`} />
                <MetricBadge label="Machines" value={metrics.machines} />
                <MetricBadge label="Score" value={solution.score.toFixed(1)} highlight={true} />
            </div>

            {/* Reason */}
            <div style={{
                fontSize: '0.8rem',
                color: '#888',
                fontStyle: 'italic',
                lineHeight: '1.4'
            }}>
                {solution.reason}
            </div>
        </div>
    );
};

/**
 * Compact metric badge
 */
const MetricBadge = ({ label, value, highlight }) => (
    <div style={{
        padding: '6px',
        backgroundColor: highlight ? 'rgba(80, 200, 120, 0.08)' : '#1a1a1a',
        borderRadius: '4px',
        textAlign: 'center',
        border: '1px solid #333'
    }}>
        <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: highlight ? '#50C878' : '#ddd' }}>
            {value}
        </div>
    </div>
);

export default OptimizationControls;