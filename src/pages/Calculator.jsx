import { useEffect, useState } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { getProductIcon, getMachineImage, getGeneralIcon, getProductTypeIcon } from '../utils/AssetHelper';

const Calculator = () => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);

    // Load game data on mount and when mod settings change
 

    // ALL OTHER STATE HOOKS GO HERE (before the return check)
    const [calculatorMode, setCalculatorMode] = useState('forward');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [targetRate, setTargetRate] = useState(60);
    const [reverseProduct, setReverseProduct] = useState('');
    const [reverseRecipe, setReverseRecipe] = useState('');
    const [reverseSearchTerm, setReverseSearchTerm] = useState('');
    const [availableResources, setAvailableResources] = useState(new Map());
    const [resourceInput, setResourceInput] = useState({ productId: '', productName: '', quantity: 0 });
    const [productionChain, setProductionChain] = useState(null);
    const [requirements, setRequirements] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [availableRecipes, setAvailableRecipes] = useState([]);
    const [recipeOverrides, setRecipeOverrides] = useState(new Map());
    const [recipeModalOpen, setRecipeModalOpen] = useState(false);
    const [recipeModalProductId, setRecipeModalProductId] = useState(null);
    const [recipeModalRecipes, setRecipeModalRecipes] = useState([]);

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
        const productId = calculatorMode === 'forward' ? selectedProduct : reverseProduct;
        if (productId) {
            const recipes = ProductionCalculator.getRecipesForProduct(productId);
            setAvailableRecipes(recipes);
            // Auto-select first recipe if only one exists
            if (recipes.length === 1) {
                if (calculatorMode === 'forward') {
                    setSelectedRecipe(recipes[0].id);
                } else {
                    setReverseRecipe(recipes[0].id);
                }
            } else {
                if (calculatorMode === 'forward') {
                    setSelectedRecipe('');
                } else {
                    setReverseRecipe('');
                }
            }
        } else {
            setAvailableRecipes([]);
            setSelectedRecipe('');
            setReverseRecipe('');
        }
    }, [selectedProduct, reverseProduct, calculatorMode]);

    // NOW it's safe to do the early return
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

  // Get producible products for reverse mode (filtered by search)
  const reverseProducibleProducts = ProductionCalculator.products
    .filter(product => {
      const recipes = ProductionCalculator.getRecipesForProduct(product.id);
      return recipes.length > 0;
    })
    .filter(product => {
      if (!reverseSearchTerm) return true;
      return product.name.toLowerCase().includes(reverseSearchTerm.toLowerCase());
    })
    .sort((a, b) => a.name.localeCompare(b.name));



  const handleCalculate = () => {
    if (calculatorMode === 'forward') {
      if (!selectedProduct || !targetRate) return;

      const recipeToUse = selectedRecipe || null;
      const chain = ProductionCalculator.calculateProductionChain(
        selectedProduct, 
        targetRate, 
        recipeToUse,
        recipeOverrides
      );
      const reqs = ProductionCalculator.calculateTotalRequirements(chain);

      setProductionChain(chain);
      setRequirements(reqs);
    } else {
      // Reverse mode
      if (!reverseProduct || availableResources.size === 0) return;

      const result = ProductionCalculator.calculateMaxProduction(
        reverseProduct,
        availableResources,
        reverseRecipe || null,
        recipeOverrides
      );

      if (result.chain) {
        setProductionChain(result.chain);
        setRequirements(ProductionCalculator.calculateTotalRequirements(result.chain));
      }
    }
  };

  const handleRecipeOverride = (productId, newRecipeId) => {
    // Create new overrides map with the update
    const newOverrides = new Map(recipeOverrides);
    if (newRecipeId) {
      newOverrides.set(productId, newRecipeId);
    } else {
      newOverrides.delete(productId);
    }
    
    // Update the state
    setRecipeOverrides(newOverrides);
    
    // IMMEDIATELY recalculate the ENTIRE chain with the new overrides
    if (calculatorMode === 'forward') {
      if (selectedProduct && targetRate) {
        const recipeToUse = selectedRecipe || null;
        
        // Force recalculation with the new overrides map
        const newChain = ProductionCalculator.calculateProductionChain(
          selectedProduct, 
          targetRate, 
          recipeToUse,
          newOverrides // Use the UPDATED overrides
        );
        const newReqs = ProductionCalculator.calculateTotalRequirements(newChain);
        
        // Update both chain and requirements
        setProductionChain(newChain);
        setRequirements(newReqs);
      }
    } else {
      if (reverseProduct && availableResources.size > 0) {
        const result = ProductionCalculator.calculateMaxProduction(
          reverseProduct,
          availableResources,
          reverseRecipe || null,
          newOverrides // Use the UPDATED overrides
        );
        
        if (result.chain) {
          setProductionChain(result.chain);
          setRequirements(ProductionCalculator.calculateTotalRequirements(result.chain));
        }
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
      // This will trigger handleRecipeOverride which does the full recalculation
      handleRecipeOverride(recipeModalProductId, recipeId);
    }
    closeRecipeModal();
  };

  const addResource = () => {
    if (!resourceInput.productId || resourceInput.quantity <= 0) return;
    
    const newResources = new Map(availableResources);
    newResources.set(resourceInput.productId, resourceInput.quantity);
    setAvailableResources(newResources);
    setResourceInput({ productId: '', productName: '', quantity: 0 });
  };

  const removeResource = (productId) => {
    const newResources = new Map(availableResources);
    newResources.delete(productId);
    setAvailableResources(newResources);
  };

  // Enhanced recipe card renderer - with sizing parameters for different contexts
  const renderRecipeCard = (recipe, size = 'normal', isClickable = false, onClick = null) => {
    const machines = ProductionCalculator.getMachinesForRecipe(recipe.id);
    const machine = machines[0];
    const machineIcon = machine ? getMachineImage(machine) : null;

    // Size configurations for premium readability
    const sizes = {
      compact: {
        machineIcon: 32,
        productIcon: 20,
        quantityFont: '0.85rem',
        arrowFont: '1.1rem',
        padding: '10px',
        gap: '8px',
        showMachineName: false
      },
      normal: {
        machineIcon: 40,
        productIcon: 26,
        quantityFont: '1rem',
        arrowFont: '1.4rem',
        padding: '12px',
        gap: '10px',
        showMachineName: true
      },
      large: {
        machineIcon: 48,
        productIcon: 30,
        quantityFont: '1.1rem',
        arrowFont: '1.6rem',
        padding: '16px',
        gap: '12px',
        showMachineName: true
      }
    };

    const config = sizes[size];

    // Get ALL inputs with their icons
    const inputs = recipe.inputs.map(input => {
      const product = ProductionCalculator.getProduct(input.productId);
      return {
        product,
        quantity: input.quantity,
        icon: getProductIcon(product)
      };
    });

    // Get ALL outputs with their icons
    const outputs = recipe.outputs.map(output => {
      const product = ProductionCalculator.getProduct(output.productId);
      return {
        product,
        quantity: output.quantity,
        icon: getProductIcon(product)
      };
    });

    return (
      <div 
        key={recipe.id} 
        onClick={onClick}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: config.gap,
          padding: config.padding,
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'all 0.2s',
          borderRadius: '6px',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          if (isClickable) {
            e.currentTarget.style.backgroundColor = '#1a1a1a';
          }
        }}
        onMouseLeave={(e) => {
          if (isClickable) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {/* Machine Icon */}
        {machineIcon && (
          <img 
            src={machineIcon} 
            alt={machine?.name} 
            title={machine?.name}
            style={{ 
              width: `${config.machineIcon}px`, 
              height: `${config.machineIcon}px`, 
              objectFit: 'contain', 
              flexShrink: 0 
            }} 
          />
        )}
        
        {/* All Inputs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {inputs.map((input, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ 
                color: '#bbb', 
                fontSize: config.quantityFont, 
                fontWeight: '700',
                lineHeight: 1
              }}>
                {input.quantity}×
              </span>
              {input.icon && (
                <img 
                  src={input.icon} 
                  alt={input.product?.name}
                  title={input.product?.name}
                  style={{ 
                    width: `${config.productIcon}px`, 
                    height: `${config.productIcon}px`, 
                    objectFit: 'contain' 
                  }} 
                />
              )}
              {idx < inputs.length - 1 && (
                <span style={{ color: '#555', margin: '0 2px', fontSize: config.quantityFont }}>+</span>
              )}
            </div>
          ))}
        </div>
        
        <span style={{ 
          color: '#888', 
          fontSize: config.arrowFont, 
          margin: '0 6px',
          fontWeight: '300'
        }}>
          →
        </span>
        
        {/* All Outputs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {outputs.map((output, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ 
                color: '#5aa0f2', 
                fontSize: config.quantityFont, 
                fontWeight: '700',
                lineHeight: 1
              }}>
                {output.quantity}×
              </span>
              {output.icon && (
                <img 
                  src={output.icon} 
                  alt={output.product?.name}
                  title={output.product?.name}
                  style={{ 
                    width: `${config.productIcon}px`, 
                    height: `${config.productIcon}px`, 
                    objectFit: 'contain' 
                  }} 
                />
              )}
              {idx < outputs.length - 1 && (
                <span style={{ color: '#555', margin: '0 2px', fontSize: config.quantityFont }}>+</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Machine Name (conditional) */}
        {config.showMachineName && (
          <div style={{ flex: 1, marginLeft: '12px', minWidth: '140px' }}>
            <div style={{ fontSize: '0.95rem', color: '#ddd', fontWeight: '600', lineHeight: 1.3 }}>
              {machine?.name || 'Unknown'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '3px', lineHeight: 1.2 }}>
              {recipe.name}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Enhanced recipe dropdown option renderer
  const renderRecipeDropdownOption = (recipe, productId) => {
    const machines = ProductionCalculator.getMachinesForRecipe(recipe.id);
    const machine = machines[0];

    const inputs = recipe.inputs.map(input => ({
      product: ProductionCalculator.getProduct(input.productId),
      quantity: input.quantity,
      icon: getProductIcon(ProductionCalculator.getProduct(input.productId))
    }));

    const outputs = recipe.outputs.map(output => ({
      product: ProductionCalculator.getProduct(output.productId),
      quantity: output.quantity,
      icon: getProductIcon(ProductionCalculator.getProduct(output.productId))
    }));

    const inputText = inputs.map(i => `${i.quantity}× ${i.product?.name}`).join(' + ');
    const outputText = outputs.map(o => `${o.quantity}× ${o.product?.name}`).join(' + ');
    const displayText = `${machine?.name || 'Unknown'}: ${inputText} → ${outputText}`;

    return {
      recipe,
      machine,
      inputs,
      outputs,
      displayText
    };
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
    
    const hasMultipleRecipes = node.availableRecipes && node.availableRecipes.length > 1;
    
    // Get the CURRENT recipe being used (from overrides or default)
    const currentRecipeId = recipeOverrides.get(node.productId) || node.recipe?.id;
    const currentRecipe = node.availableRecipes?.find(r => r.id === currentRecipeId) || node.recipe;

    return (
      <div key={`${node.productId}-${level}-${currentRecipeId}`} style={{ marginLeft: `${indent}px`, marginBottom: '10px' }}>
        <div style={{
          backgroundColor: isRaw ? '#3a3a3a' : '#2a2a2a',
          padding: '14px',
          borderRadius: '8px',
          border: isRaw ? '2px solid #666' : hasMultipleRecipes ? '2px solid #4a90e2' : '1px solid #444',
          transition: 'all 0.2s ease'
        }}>
          {/* Product Header */}
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
                <strong style={{ color: isRaw ? '#FFD700' : '#4a90e2', fontSize: '1.2rem', lineHeight: 1.3 }}>
                  {product?.name || node.productId}
                </strong>
                {isRaw && <span style={{ color: '#FFD700', marginLeft: '10px', fontSize: '0.85rem' }}>(Raw Material)</span>}
                
                {/* Recipe Card - Clickable to open modal */}
                {hasMultipleRecipes && currentRecipe && (
                  <div style={{ marginTop: '12px' }}>
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
                        {renderRecipeCard(currentRecipe, 'normal', false)}
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

          {/* Machine Info */}
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
              
              {/* Resource Requirements Icons */}
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

          {/* Inputs List */}
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

        {/* Render child chains */}
        {node.inputChains && node.inputChains.length > 0 && (
          <div style={{ marginTop: '14px' }}>
            {node.inputChains.map((childNode, idx) => renderProductionNode(childNode, level + 1))}
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
            {/* Page Header */}
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
                {/* Recipe Selection Modal */}
                {recipeModalOpen && (
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
          onClick={closeRecipeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#2a2a2a',
              borderRadius: '16px',
              padding: '2.5rem',
              maxWidth: '1100px',
              width: '100%',
              maxHeight: '85vh',
              overflow: 'auto',
              border: '2px solid #4a90e2',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>
                Select Recipe
                <span style={{ fontSize: '1.1rem', color: '#888', fontWeight: '400', marginLeft: '12px' }}>
                  ({recipeModalRecipes.length} available)
                </span>
              </h3>
              <button
                onClick={closeRecipeModal}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#555',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#666';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#555';
                }}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {recipeModalRecipes.map(recipe => {
                const currentRecipeId = recipeOverrides.get(recipeModalProductId) || recipeModalRecipes[0]?.id;
                const isSelected = recipe.id === currentRecipeId;
                
                return (
                  <div
                    key={recipe.id}
                    onClick={() => selectRecipeFromModal(recipe.id)}
                    style={{
                      backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                      border: isSelected ? '3px solid #4a90e2' : '2px solid #444',
                      borderRadius: '10px',
                      padding: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#252525';
                        e.currentTarget.style.borderColor = '#666';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#1a1a1a';
                        e.currentTarget.style.borderColor = '#444';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {renderRecipeCard(recipe, 'large', false)}
                    {isSelected && (
                      <div style={{ 
                        marginTop: '10px',
                        padding: '8px 16px', 
                        backgroundColor: 'rgba(74, 144, 226, 0.2)',
                        borderRadius: '6px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: '#5aa0f2',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        border: '1px solid rgba(74, 144, 226, 0.3)'
                      }}>
                        ✓ CURRENTLY SELECTED
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mode Toggle */}
      <div style={{ 
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '1rem',
        backgroundColor: '#2a2a2a',
        padding: '0.5rem',
        borderRadius: '8px',
        width: 'fit-content',
        border: '1px solid #444'
      }}>
        <button
          onClick={() => setCalculatorMode('forward')}
          style={{
            padding: '10px 24px',
            backgroundColor: calculatorMode === 'forward' ? '#4a90e2' : 'transparent',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >
          Forward Mode
        </button>
        <button
          onClick={() => setCalculatorMode('reverse')}
          style={{
            padding: '10px 24px',
            backgroundColor: calculatorMode === 'reverse' ? '#4a90e2' : 'transparent',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >
          Reverse Mode
        </button>
      </div>

      {/* Input Section */}
      {calculatorMode === 'forward' ? (
        // FORWARD MODE
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

            {/* Recipe Selection */}
            <div style={{ opacity: availableRecipes.length > 1 ? 1 : 0.5 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                Recipe {availableRecipes.length > 1 && <span style={{ color: '#4a90e2' }}>({availableRecipes.length} available)</span>}
              </label>
              <select
                value={selectedRecipe}
                onChange={(e) => setSelectedRecipe(e.target.value)}
                disabled={availableRecipes.length <= 1}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: availableRecipes.length > 1 ? '#333' : '#2a2a2a',
                  color: 'white',
                  border: '2px solid #555',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: availableRecipes.length > 1 ? 'pointer' : 'not-allowed'
                }}
              >
                <option value="">
                  {availableRecipes.length === 0 ? 'Select product first' : 
                   availableRecipes.length === 1 ? availableRecipes[0].name : 
                   'Select recipe...'}
                </option>
                {availableRecipes.length > 1 && availableRecipes.map(recipe => {
                  const option = renderRecipeDropdownOption(recipe, selectedProduct);
                  return (
                    <option key={recipe.id} value={recipe.id}>
                      {option.displayText}
                    </option>
                  );
                })}
              </select>
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

          {/* Recipe Preview */}
          {availableRecipes.length > 1 && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '10px' }}>Available Recipes:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '10px' }}>
                {availableRecipes.map(recipe => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe.id)}
                    style={{
                      backgroundColor: selectedRecipe === recipe.id ? '#2a4a6a' : '#252525',
                      border: selectedRecipe === recipe.id ? '2px solid #4a90e2' : '1px solid #333',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {renderRecipeCard(recipe, 'normal', true)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // REVERSE MODE
        <div style={{
          backgroundColor: '#2a2a2a',
          padding: '2rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          border: '1px solid #444',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem', fontWeight: '600' }}>
            What can I make with my resources?
          </h3>

          {/* Resource Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
              Add Available Resources
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px auto', gap: '1rem', alignItems: 'end' }}>
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
                placeholder="Quantity"
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
                onClick={addResource}
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
                Add
              </button>
            </div>
          </div>

          {/* Resource List */}
          {availableResources.size > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                Available Resources:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {Array.from(availableResources.entries()).map(([productId, quantity]) => {
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
                      border: '1px solid #444'
                    }}>
                      {icon && <img src={icon} alt={product?.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />}
                      <span style={{ color: '#fff', fontWeight: '600' }}>{product?.name}</span>
                      <span style={{ color: '#888' }}>×</span>
                      <span style={{ color: '#4a90e2', fontWeight: 'bold' }}>{quantity}</span>
                      <button
                        onClick={() => removeResource(productId)}
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
            </div>
          )}

          {/* Product and Recipe Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1.5rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                What do you want to make?
              </label>
              <input
                type="text"
                list="reverse-products-list"
                placeholder="Select product..."
                value={reverseSearchTerm}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setReverseSearchTerm(inputValue);
                  const match = reverseProducibleProducts.find(p => p.name.toLowerCase() === inputValue.toLowerCase());
                  if (match) {
                    setReverseProduct(match.id);
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
              <datalist id="reverse-products-list">
                {reverseProducibleProducts.length > 0 ? (
                  reverseProducibleProducts.slice(0, 200).map(product => (
                    <option key={product.id} value={product.name}>
                      {product.name} ({product.type})
                    </option>
                  ))
                ) : (
                  <option value="">No producible products found</option>
                )}
              </datalist>
              {reverseSearchTerm && reverseProducibleProducts.length === 0 && (
                <div style={{ 
                  marginTop: '8px', 
                  padding: '8px 12px', 
                  backgroundColor: '#3a2a2a', 
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  color: '#ff6b6b',
                  border: '1px solid #ff6b6b'
                }}>
                  ⚠️ No recipes available for products matching "{reverseSearchTerm}"
                </div>
              )}
              {!reverseSearchTerm && availableResources.size > 0 && (
                <div style={{ 
                  marginTop: '8px', 
                  padding: '8px 12px', 
                  backgroundColor: '#1a4a2a', 
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  color: '#50C878'
                }}>
                  ✓ Resources ready - Type to search for products you can make
                </div>
              )}
            </div>

            <div style={{ opacity: availableRecipes.length > 1 ? 1 : 0.5 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontWeight: '600', fontSize: '0.95rem' }}>
                Recipe {availableRecipes.length > 1 && <span style={{ color: '#4a90e2' }}>({availableRecipes.length} available)</span>}
              </label>
              <select
                value={reverseRecipe}
                onChange={(e) => setReverseRecipe(e.target.value)}
                disabled={availableRecipes.length <= 1}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: availableRecipes.length > 1 ? '#333' : '#2a2a2a',
                  color: 'white',
                  border: '2px solid #555',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: availableRecipes.length > 1 ? 'pointer' : 'not-allowed'
                }}
              >
                <option value="">
                  {availableRecipes.length === 0 ? 'Select product first' : 
                   availableRecipes.length === 1 ? availableRecipes[0].name : 
                   'Select recipe...'}
                </option>
                {availableRecipes.map(recipe => {
                  const option = renderRecipeDropdownOption(recipe, reverseProduct);
                  return (
                    <option key={recipe.id} value={recipe.id}>
                      {option.displayText}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!reverseProduct || availableResources.size === 0}
              style={{
                padding: '12px 32px',
                backgroundColor: reverseProduct && availableResources.size > 0 ? '#4a90e2' : '#555',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: reverseProduct && availableResources.size > 0 ? 'pointer' : 'not-allowed',
                fontWeight: '700',
                height: '48px'
              }}
            >
              Calculate
            </button>
          </div>
        </div>
      )}

      {/* Results Section - Side by Side Layout */}
      {productionChain && requirements && (
        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left Column: Total Requirements (Sticky) */}
          <div style={{ position: 'sticky', top: '2rem' }}>
            <div style={{
              backgroundColor: '#2a2a2a',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid #444',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                Total Requirements
              </h3>
              
              {/* Summary Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '6px', border: '1px solid #333' }}>
                  <div style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '4px' }}>Total Machines</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2' }}>
                    {Array.from(requirements.machines.values()).reduce((a, b) => a + b, 0)}
                  </div>
                </div>
                
                <div style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '6px', border: '1px solid #333' }}>
                  <div style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Total Power
                    {getGeneralIcon('Electricity') && (
                      <img src={getGeneralIcon('Electricity')} alt="Electricity" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                    )}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFD700' }}>
                    {requirements.power.toFixed(0)} <span style={{ fontSize: '1rem', color: '#aaa' }}>kW</span>
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

              {/* Machines Breakdown */}
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

              {/* Raw Materials */}
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

              {/* Maintenance */}
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
            </div>
          </div>

          {/* Right Column: Production Chain */}
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '1.5rem',
            borderRadius: '10px',
            border: '1px solid #444',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
              Production Chain
              {recipeOverrides.size > 0 && (
                <span style={{ fontSize: '0.9rem', color: '#4a90e2', marginLeft: '12px', fontWeight: '400' }}>
                  ({recipeOverrides.size} custom recipe{recipeOverrides.size > 1 ? 's' : ''})
                </span>
              )}
            </h3>
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
                  Click the recipe card to view and select alternatives!
                </div>
                {renderProductionNode(productionChain)}
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