import { getProductIcon } from '../utils/AssetHelper';
import ProductionCalculator from '../utils/ProductionCalculator';

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
    if (!optimizationMode) {
        return null;
    }

    return (
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
                        onChange={(e) => onChangeGoal(e.target.value)}
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
                            onChange={(e) => onChangeConstraints({
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
                            onChange={(e) => onChangeConstraints({
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
                            onChange={(e) => onChangeConstraints({
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
                                onChangeResourceInput({ ...resourceInput, productName: inputValue });
                                const match = ProductionCalculator.products.find(p => p.name.toLowerCase() === inputValue.toLowerCase());
                                if (match) {
                                    onChangeResourceInput({ ...resourceInput, productId: match.id, productName: match.name });
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
                        onChange={(e) => onChangeResourceInput({ ...resourceInput, quantity: parseFloat(e.target.value) })}
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
                        onClick={onAddResourceConstraint}
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
                                        onClick={() => onRemoveResourceConstraint(productId)}
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
    );
};

export default OptimizationControls;