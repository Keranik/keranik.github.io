import React, { useState } from 'react';
import { getProductIcon, getGeneralIcon } from '../utils/AssetHelper';
import ProductionCalculator from '../utils/ProductionCalculator';
import ProductSelectorModal from './ProductSelectorModal'; // Adjust path as necessary

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
    onRemoveResourceConstraint
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
        onChangeConstraints({
            ...optimizationConstraints,
            [key]: value ? parseFloat(value) : null
        });
    };

    const productsForModal = ProductionCalculator.products || [];

    return (
        <div style={{
            backgroundColor: '#2a4a2a',
            padding: '1.5rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: '2px solid #50C878',
            boxShadow: '0 4px 12px rgba(80, 200, 120, 0.2)'
        }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700', color: '#50C878', display: 'flex', alignItems: 'center' }}>
                {getGeneralIcon('Stats') && (
                    <img
                        src={getGeneralIcon('Stats')}
                        alt="Settings"
                        style={{
                            width: '20px',
                            height: '20px',
                            objectFit: 'contain',
                            marginRight: '8px'
                        }}
                    />
                )}
                Optimization Settings
            </h3>
            {/* Optimization Goal Grid */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                    Optimization Goal
                </label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '1rem',
                    justifyItems: 'stretch',
                    alignItems: 'start'
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
                                    backgroundColor: isSelected ? '#2a5a3a' : '#1a1a1a',
                                    border: isSelected ? '2px solid #50C878' : '1px solid #444',
                                    borderRadius: '8px',
                                    padding: '12px 8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'center',
                                    fontSize: '0.9rem',
                                    minHeight: '90px'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#252525';
                                        e.currentTarget.style.borderColor = '#666';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                                        e.currentTarget.style.borderColor = '#444';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }
                                }}
                            >
                                {goalIcon && (
                                    <img
                                        src={goalIcon}
                                        alt={goal.label}
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            objectFit: 'contain',
                                            marginBottom: '4px'
                                        }}
                                    />
                                )}
                                <span style={{
                                    color: '#fff',
                                    fontWeight: isSelected ? '700' : '500',
                                    lineHeight: '1.2',
                                    wordBreak: 'break-word',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '4px'
                                }}>
                                    {goal.label}
                                </span>
                                <div style={{ height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {isSelected && (
                                        <div style={{
                                            padding: '2px 4px',
                                            backgroundColor: 'rgba(80, 200, 120, 0.2)',
                                            borderRadius: '4px',
                                            fontSize: '0.65rem',
                                            color: '#50C878',
                                            fontWeight: '700',
                                            border: '1px solid rgba(80, 200, 120, 0.3)'
                                        }}>
                                            ✓ SELECTED
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Constraints Sliders */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                    Constraints (Optional)
                </label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                }}>
                    {Object.entries(CONSTRAINT_RANGES).map(([key, range]) => {
                        const currentValue = optimizationConstraints[key];
                        const displayValue = currentValue || range.min;
                        const constraintIconKey = CONSTRAINT_ICON_MAP[key];
                        const constraintIcon = constraintIconKey ? getGeneralIcon(constraintIconKey) : null;
                        const labelText = key.replace('max', '').replace(/([A-Z])/g, ' $1').trim();
                        return (
                            <div key={key} style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #444' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    {constraintIcon && (
                                        <img
                                            src={constraintIcon}
                                            alt={labelText}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                objectFit: 'contain',
                                                marginRight: '8px'
                                            }}
                                        />
                                    )}
                                    <label style={{ color: '#fff', fontWeight: '600', fontSize: '0.85rem', margin: 0 }}>
                                        Max {labelText}
                                    </label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <input
                                        type="range"
                                        min={range.min}
                                        max={range.max}
                                        step={range.step}
                                        value={displayValue}
                                        onChange={(e) => handleConstraintChange(key, e.target.value)}
                                        style={{
                                            flex: 1,
                                            height: '6px',
                                            backgroundColor: '#444',
                                            borderRadius: '3px',
                                            outline: 'none',
                                            appearance: 'none'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = '#50C878';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = '#444';
                                        }}
                                    />
                                    <span style={{ color: '#50C878', fontWeight: '600', minWidth: '70px', textAlign: 'right', flexShrink: 0 }}>
                                        {displayValue}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    min={range.min}
                                    max={range.max}
                                    step={range.step}
                                    value={currentValue || ''}
                                    onChange={(e) => handleConstraintChange(key, e.target.value)}
                                    placeholder={range.min}
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        padding: '6px 8px',
                                        backgroundColor: '#333',
                                        color: 'white',
                                        border: '1px solid #555',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Resource Constraints Section */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                    Resource Limits (Optional)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px auto', gap: '1rem', alignItems: 'end', marginBottom: '1rem' }}>
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
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#50C878';
                            e.target.style.backgroundColor = '#252525';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = '#555';
                            e.target.style.backgroundColor = '#333';
                        }}
                    >
                        {resourceInput.productName || 'Select resource...'}
                    </button>
                    <input
                        type="number"
                        placeholder="Max/min"
                        value={resourceInput.quantity || ''}
                        onChange={(e) => onChangeResourceInput({ ...resourceInput, quantity: parseFloat(e.target.value) || null })}
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
                        type="button"
                        onClick={handleAddResourceConstraint}
                        disabled={!resourceInput.productId || !resourceInput.quantity}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: resourceInput.productId && resourceInput.quantity ? '#50C878' : '#555',
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
                    color: '#50C878',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {getGeneralIcon('Checkmark') && (
                        <img
                            src={getGeneralIcon('Checkmark')}
                            alt="Success"
                            style={{
                                width: '16px',
                                height: '16px',
                                objectFit: 'contain',
                                marginRight: '4px'
                            }}
                        />
                    )}
                    <span>
                        {optimizationResult.explanation}
                        {optimizationResult.alternatives?.length > 0 && (
                            <span style={{ color: '#888', marginLeft: '8px' }}>
                                ({optimizationResult.alternatives.length} alternative{optimizationResult.alternatives.length > 1 ? 's' : ''} found)
                            </span>
                        )}
                    </span>
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
                    color: '#ff6b6b',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {getGeneralIcon('Warning') && (
                        <img
                            src={getGeneralIcon('Warning')}
                            alt="Warning"
                            style={{
                                width: '16px',
                                height: '16px',
                                objectFit: 'contain',
                                marginRight: '4px'
                            }}
                        />
                    )}
                    <span>{optimizationResult.error}</span>
                </div>
            )}
            {/* Resource Product Selector Modal */}
            <ProductSelectorModal
                isOpen={isResourceModalOpen}
                onClose={() => {
                    setIsResourceModalOpen(false);
                }}
                onSelectProduct={handleResourceProductSelect}
                products={productsForModal}
                currentProductId={resourceInput.productId}
            />
        </div>
    );
};

export default OptimizationControls;