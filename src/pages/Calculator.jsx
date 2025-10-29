import { useEffect, useState } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { getProductIcon, getMachineImage, getGeneralIcon, getProductTypeIcon } from '../utils/AssetHelper';

const Calculator = () => {
  useEffect(() => {
    document.title = 'Production Calculator - Captain of Industry Tools';
  }, []);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [targetRate, setTargetRate] = useState(60);
  const [productionChain, setProductionChain] = useState(null);
  const [requirements, setRequirements] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all products that can be produced (have recipes)
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

  const handleCalculate = () => {
    if (!selectedProduct || !targetRate) return;

    const chain = ProductionCalculator.calculateProductionChain(selectedProduct, targetRate);
    const reqs = ProductionCalculator.calculateTotalRequirements(chain);

    setProductionChain(chain);
    setRequirements(reqs);
  };

  const renderProductionNode = (node, level = 0) => {
    if (!node) return null;

    const indent = level * 20;
    const product = node.product;
    const isRaw = node.isRawMaterial;
    const productIcon = getProductIcon(product);
    const machineImage = node.machine ? getMachineImage(node.machine) : null;
    const electricityIcon = getGeneralIcon('Electricity');
    const workerIcon = getGeneralIcon('Worker');
    const computingIcon = getGeneralIcon('Computing');

    return (
      <div key={`${node.productId}-${level}`} style={{ marginLeft: `${indent}px`, marginBottom: '10px' }}>
        <div style={{
          backgroundColor: isRaw ? '#3a3a3a' : '#2a2a2a',
          padding: '10px',
          borderRadius: '5px',
          border: isRaw ? '2px solid #666' : '1px solid #444'
        }}>
          {/* Product Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Product Icon */}
              {productIcon && (
                <img 
                  src={productIcon} 
                  alt={product?.name}
                  style={{ 
                    width: '32px', 
                    height: '32px',
                    objectFit: 'contain'
                  }}
                />
              )}
              <div>
                <strong style={{ color: isRaw ? '#FFD700' : '#4a90e2', fontSize: '1.1rem' }}>
                  {product?.name || node.productId}
                </strong>
                {isRaw && <span style={{ color: '#FFD700', marginLeft: '10px', fontSize: '0.9rem' }}>(Raw Material)</span>}
              </div>
            </div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
              {node.targetRate?.toFixed(2)} /min
            </div>
          </div>

          {/* Machine Info */}
          {!isRaw && node.machine && (
            <div style={{ marginTop: '8px', color: '#aaa', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Machine Image */}
                {machineImage && (
                  <img 
                    src={machineImage} 
                    alt={node.machine.name}
                    style={{ 
                      width: '40px', 
                      height: '40px',
                      objectFit: 'contain'
                    }}
                  />
                )}
                <div>
                  <div>🏭 <strong>{node.machine.name}</strong> × {node.machineCount}</div>
                  <div style={{ marginTop: '4px' }}>
                    📋 Recipe: <strong>{node.recipe?.name}</strong> ({node.recipe?.durationSeconds}s/cycle)
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {electricityIcon ? (
                    <img src={electricityIcon} alt="Electricity" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                  ) : '⚡'} {(node.machine.electricityKw * node.machineCount).toFixed(0)} kW
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {workerIcon ? (
                    <img src={workerIcon} alt="Workers" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                  ) : '👷'} {node.machine.workers * node.machineCount} workers
                </span>
                {node.machine.computingTFlops > 0 && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {computingIcon ? (
                      <img src={computingIcon} alt="Computing" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                    ) : '💻'} {(node.machine.computingTFlops * node.machineCount).toFixed(1)} TFLOPS
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Inputs/Outputs */}
          {!isRaw && node.inputs && node.inputs.length > 0 && (
            <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#999' }}>
              <div><strong>Inputs:</strong></div>
              {node.inputs.map((input, idx) => {
                const inputIcon = getProductIcon(input.product);
                return (
                  <div key={idx} style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    {inputIcon && (
                      <img 
                        src={inputIcon} 
                        alt={input.product?.name}
                        style={{ 
                          width: '20px', 
                          height: '20px',
                          objectFit: 'contain'
                        }}
                      />
                    )}
                    <span>
                      {input.product?.name || input.productId}: {input.ratePerMin.toFixed(2)} /min
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Render child chains */}
        {node.inputChains && node.inputChains.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            {node.inputChains.map((childNode, idx) => renderProductionNode(childNode, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Production Calculator</h2>
      <p style={{ color: '#aaa', marginBottom: '2rem' }}>
        Calculate production chains, resource requirements, and optimize your factory planning.
      </p>

      {/* Input Section */}
      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid #444'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Production Goal</h3>

        {/* Product Search */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>
            Search Product:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search products..."
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#333',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Product Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>
            Target Product:
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#333',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          >
            <option value="">-- Select a product --</option>
            {producibleProducts.slice(0, 100).map(product => {
              const typeIcon = getProductTypeIcon(product.type);
              return (
                <option key={product.id} value={product.id}>
                  {product.name} {typeIcon ? '●' : `(${product.type})`}
                </option>
              );
            })}
          </select>
          {producibleProducts.length > 100 && (
            <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '5px' }}>
              Showing first 100 results. Use search to narrow down.
            </p>
          )}
        </div>

        {/* Target Rate */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>
            Target Production Rate (items/min):
          </label>
          <input
            type="number"
            value={targetRate}
            onChange={(e) => setTargetRate(parseFloat(e.target.value))}
            min="0"
            step="1"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#333',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={!selectedProduct || !targetRate}
          style={{
            padding: '12px 24px',
            backgroundColor: selectedProduct && targetRate ? '#4a90e2' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: selectedProduct && targetRate ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          Calculate Production Chain
        </button>
      </div>

      {/* Results Section */}
      {productionChain && requirements && (
        <div>
          {/* Summary Stats */}
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: '1px solid #444'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Total Requirements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Total Machines</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4a90e2' }}>
                  {Array.from(requirements.machines.values()).reduce((a, b) => a + b, 0)}
                </div>
              </div>
              <div style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ color: '#aaa', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Total Power {getGeneralIcon('Electricity') && (
                    <img src={getGeneralIcon('Electricity')} alt="Electricity" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                  )}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700' }}>
                  {requirements.power.toFixed(0)} kW
                </div>
              </div>
              <div style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ color: '#aaa', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Total Workers {getGeneralIcon('Worker') && (
                    <img src={getGeneralIcon('Worker')} alt="Workers" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                  )}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#50C878' }}>
                  {requirements.workers}
                </div>
              </div>
            </div>

            {/* Machines Breakdown */}
            {requirements.machines.size > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Machines Needed:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                  {Array.from(requirements.machines.entries()).map(([machineId, count]) => {
                    const machine = ProductionCalculator.getMachine(machineId);
                    return (
                      <div key={machineId} style={{ color: '#aaa', fontSize: '0.9rem' }}>
                        • {machine?.name || machineId}: <strong style={{ color: '#fff' }}>{count}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Raw Materials */}
            {requirements.rawMaterials.size > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#FFD700' }}>Raw Materials Required:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                  {Array.from(requirements.rawMaterials.entries()).map(([productId, rate]) => {
                    const product = ProductionCalculator.getProduct(productId);
                    const rawIcon = getProductIcon(product);
                    return (
                      <div key={productId} style={{ color: '#aaa', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {rawIcon && (
                          <img 
                            src={rawIcon} 
                            alt={product?.name}
                            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                          />
                        )}
                        <span>
                          {product?.name || productId}: <strong style={{ color: '#FFD700' }}>{rate.toFixed(2)} /min</strong>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Maintenance */}
            {requirements.maintenance.size > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Maintenance Required:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                  {Array.from(requirements.maintenance.entries()).map(([productId, perMonth]) => {
                    const product = ProductionCalculator.getProduct(productId);
                    return (
                      <div key={productId} style={{ color: '#aaa', fontSize: '0.9rem' }}>
                        • {product?.name || productId}: <strong style={{ color: '#fff' }}>{perMonth.toFixed(2)} /month</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Production Chain Tree */}
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #444'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Production Chain</h3>
            {productionChain.error ? (
              <div style={{ color: '#ff6b6b', padding: '1rem', backgroundColor: '#3a2a2a', borderRadius: '4px' }}>
                Error: {productionChain.error}
              </div>
            ) : (
              renderProductionNode(productionChain)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;