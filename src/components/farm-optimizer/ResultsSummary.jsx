// src/components/farm-optimizer/ResultsSummary.jsx
import { getProductIcon, getGeneralIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';

const ResultsSummary = ({ results }) => {
    return (
        <div style={{ position: 'sticky', top: '2rem' }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid #444',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                    Summary
                </h3>

                {/* People Fed */}
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    border: '1px solid #333'
                }}>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getGeneralIcon('Population') && (
                            <img
                                src={getGeneralIcon('Population')}
                                alt="People"
                                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                            />
                        )}
                        People Fed (per month)
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2' }}>
                        {results.totals.peopleFed.toLocaleString()}
                    </div>
                </div>

                {/* Food Variety Bonuses */}
                {results.totals.foodCategories && results.totals.foodCategories.count > 0 && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '6px',
                        marginBottom: '1rem',
                        border: results.totals.foodCategories.healthBonuses > 0 ? '2px solid #50C878' : '1px solid #333'
                    }}>
                        <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                            Food Variety Bonuses
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700' }}>
                                    {results.totals.foodCategories.count}/4
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#888' }}>Categories</div>
                            </div>

                            {results.totals.foodCategories.healthBonuses > 0 && (
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#50C878' }}>
                                        +{results.totals.foodCategories.healthBonuses}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#888' }}>Health</div>
                                </div>
                            )}

                            {results.totals.foodCategories.totalUnity > 0 && (
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9b59b6' }}>
                                        +{results.totals.foodCategories.totalUnity.toFixed(0)}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#888' }}>Unity/mo</div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '0.75rem' }}>
                            {results.totals.foodCategories.categories.map(cat => (
                                <div key={cat.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '0.8rem',
                                    padding: '4px 8px',
                                    backgroundColor: '#2a2a2a',
                                    borderRadius: '4px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ color: '#ddd' }}>{cat.name}</span>
                                        {cat.hasHealthBenefit && (
                                            <span style={{ fontSize: '0.7rem', color: '#50C878', backgroundColor: 'rgba(80, 200, 120, 0.15)', padding: '1px 4px', borderRadius: '2px' }}>
                                                +HP
                                            </span>
                                        )}
                                    </div>
                                    <span style={{ color: '#888', fontSize: '0.75rem' }}>
                                        {cat.peopleFed.toFixed(0)} ppl
                                    </span>
                                </div>
                            ))}
                        </div>

                        {results.totals.foodCategories.unityBreakdown && results.totals.foodCategories.unityBreakdown.length > 0 && (
                            <details style={{ marginTop: '0.75rem', fontSize: '0.75rem' }}>
                                <summary style={{ color: '#9b59b6', cursor: 'pointer', userSelect: 'none', padding: '4px' }}>
                                    Unity Breakdown ({results.totals.foodCategories.unityBreakdown.length} foods)
                                </summary>
                                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    {results.totals.foodCategories.unityBreakdown.map((food, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '2px 6px',
                                            backgroundColor: '#1a1a1a',
                                            borderRadius: '3px'
                                        }}>
                                            <span style={{ color: '#bbb' }}>{food.productName}</span>
                                            <span style={{ color: '#9b59b6', fontWeight: '600' }}>+{food.unityProvided}</span>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        )}
                    </div>
                )}

                {/* Water Usage */}
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    border: '1px solid #333'
                }}>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Water Usage
                        {getProductIcon(ProductionCalculator.products?.find(p => p.name?.toLowerCase() === 'water')) && (
                            <img
                                src={getProductIcon(ProductionCalculator.products?.find(p => p.name?.toLowerCase() === 'water'))}
                                alt="Water"
                                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                            />
                        )}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#50C878' }}>
                        {results.totals.waterPerMonth.toFixed(0)} /month
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div>Farm: {(results.totals.farmWaterPerDay * 30).toFixed(0)} /month</div>
                        <div>Processing: {(results.totals.processingWaterPerDay * 30).toFixed(0)} /month</div>
                    </div>
                    {results.rainwaterEstimate && (
                        <div style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem',
                            backgroundColor: 'rgba(74, 144, 226, 0.1)',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            color: '#4a90e2'
                        }}>
                            🌧️ Rainwater credit applied: -{results.rainwaterEstimate.totalPerMonth.toFixed(0)}/mo
                        </div>
                    )}
                </div>

                {/* Processing Machines */}
                {results.totals.processingMachines && results.totals.processingMachines.length > 0 && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '6px',
                        marginBottom: '1rem',
                        border: '1px solid #333'
                    }}>
                        <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {getGeneralIcon('Machines') && (
                                <img
                                    src={getGeneralIcon('Machines')}
                                    alt="Machines"
                                    style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                                />
                            )}
                            Processing Machines
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {results.totals.processingMachines.map(machine => (
                                <div key={machine.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.8rem',
                                    padding: '4px 8px',
                                    backgroundColor: '#2a2a2a',
                                    borderRadius: '4px'
                                }}>
                                    <span style={{ color: '#ddd' }}>{machine.name}</span>
                                    <span style={{ color: '#fff', fontWeight: '700' }}>×{machine.count}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #444', fontSize: '0.75rem', color: '#888' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {getGeneralIcon('Electricity') && (
                                    <img
                                        src={getGeneralIcon('Electricity')}
                                        alt="Electricity"
                                        style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                    />
                                )}
                                {results.totals.processingElectricity.toFixed(0)} kW
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                {getGeneralIcon('Worker') && (
                                    <img
                                        src={getGeneralIcon('Worker')}
                                        alt="Workers"
                                        style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                    />
                                )}
                                {results.totals.processingWorkers} workers
                            </div>
                        </div>
                    </div>
                )}

                {/* Production Summary */}
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ddd', marginBottom: '0.75rem' }}>
                        Production (per month)
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {Object.entries(results.totals.production).map(([productId, quantity]) => {
                            const product = ProductionCalculator.getProduct(productId);
                            const icon = getProductIcon(product);
                            return (
                                <div
                                    key={productId}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.5rem',
                                        backgroundColor: '#1a1a1a',
                                        borderRadius: '4px'
                                    }}
                                >
                                    {icon && (
                                        <img
                                            src={icon}
                                            alt={product?.name}
                                            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                        />
                                    )}
                                    <span style={{ flex: 1, color: '#ddd', fontSize: '0.9rem' }}>
                                        {product?.name || productId}
                                    </span>
                                    <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                        {quantity.toFixed(0)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsSummary;