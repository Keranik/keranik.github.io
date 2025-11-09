// src/pages/FertilizerAnalysisTest.jsx - FINAL VERSION WITH RECIPE SCORING

import { useState, useEffect } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { FertilizerProductionAnalyzer } from '../utils/FertilizerProductionAnalyzer';
import { useSettings } from '../contexts/SettingsContext';
import { getProductIcon } from '../utils/AssetHelper';

const FertilizerAnalysisTest = () => {
    const { settings } = useSettings();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [detailedReports, setDetailedReports] = useState({});
    const [replacementData, setReplacementData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fertilizerIds, setFertilizerIds] = useState([]);
    const [expandedFertilizers, setExpandedFertilizers] = useState(new Set());
    const [conversionFactors, setConversionFactors] = useState(
        FertilizerProductionAnalyzer.getConversionFactors()
    );

    useEffect(() => {
        const loadData = async () => {
            try {
                console.log('Loading game data...');
                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
                const gameData = await DataLoader.loadGameData(enabledMods);

                const allFertilizers = ProductionCalculator.products?.filter(p =>
                    p.fertilizer &&
                    p.fertilizer.fertilityPerQuantityPercent !== undefined &&
                    p.fertilizer.maxFertilityPercent !== undefined
                ) || [];

                const fertIds = allFertilizers.map(f => f.id);
                console.log('Found fertilizers:', fertIds, allFertilizers.map(f => f.name));
                setFertilizerIds(fertIds);

                console.log('Data loaded:', {
                    products: ProductionCalculator.products?.length,
                    recipes: ProductionCalculator.recipes?.length,
                    machines: ProductionCalculator.machines?.length,
                    fertilizers: fertIds.length
                });

                setDataLoaded(true);
            } catch (error) {
                console.error('Error loading data:', error);
                setError(error.message);
            }
        };
        loadData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    useEffect(() => {
        if (dataLoaded && fertilizerIds.length > 0 && !analysis) {
            console.log('Data loaded, running initial analysis with', fertilizerIds.length, 'fertilizers');
            runAnalysis();
        }
    }, [dataLoaded, fertilizerIds]);

    const runAnalysis = () => {
        if (!dataLoaded || fertilizerIds.length === 0) {
            console.warn('Cannot run analysis: data not loaded or no fertilizers');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('=== RUNNING NEW ANALYSIS ===');
            FertilizerProductionAnalyzer.updateConversionFactors(conversionFactors);

            const { results, replacementData: repData } = FertilizerProductionAnalyzer.generateReplacementData(fertilizerIds);

            console.log('Analysis complete. Results:', results);
            console.log('Replacement data:', repData);

            setAnalysis(results);
            setReplacementData(repData);

            // Generate detailed reports with recipe scores
            const reports = {};
            fertilizerIds.forEach(id => {
                const recipes = FertilizerProductionAnalyzer.findRecipesProducing(id);
                if (recipes.length > 0) {
                    reports[id] = {
                        fertilizerId: id,
                        name: ProductionCalculator.getProduct(id)?.name,
                        productionChains: recipes.map(recipe => {
                            // Calculate cost for this specific recipe
                            const recipeCost = FertilizerProductionAnalyzer.calculateRecipeCost(recipe);
                            const recipeNormalized = FertilizerProductionAnalyzer.normalizeToWorkerEquivalentHours(recipeCost);

                            return {
                                recipeId: recipe.id,
                                recipeName: recipe.name,
                                durationSeconds: recipe.durationSeconds,
                                recipeCost: recipeCost,
                                recipeScore: recipeNormalized.total,
                                machines: FertilizerProductionAnalyzer.getMachinesForRecipe(recipe.id).map(m => ({
                                    id: m.id,
                                    name: m.name,
                                    workers: m.workers || 0,
                                    maintenance: FertilizerProductionAnalyzer.getMaintenanceCost(m),
                                    electricityKw: m.electricityKw || 0,
                                    computing: m.computingTFlops || 0
                                })),
                                inputs: recipe.inputs.map(input => ({
                                    productId: input.productId,
                                    productName: ProductionCalculator.getProduct(input.productId)?.name,
                                    quantity: input.quantity,
                                    isFertilizer: FertilizerProductionAnalyzer.isFertilizer(input.productId)
                                })),
                                outputs: recipe.outputs.map(output => ({
                                    productId: output.productId,
                                    productName: ProductionCalculator.getProduct(output.productId)?.name,
                                    quantity: output.quantity
                                }))
                            };
                        })
                    };
                }
            });

            setDetailedReports(reports);
        } catch (error) {
            console.error('Error during analysis:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateFactor = (key, value) => {
        const newValue = parseFloat(value) || 0;
        console.log(`Updating factor ${key}: ${conversionFactors[key]} -> ${newValue}`);
        setConversionFactors(prev => ({
            ...prev,
            [key]: newValue
        }));
    };

    const toggleExpanded = (fertilizerId) => {
        setExpandedFertilizers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(fertilizerId)) {
                newSet.delete(fertilizerId);
            } else {
                newSet.add(fertilizerId);
            }
            return newSet;
        });
    };

    const copyReplacementData = () => {
        if (replacementData) {
            navigator.clipboard.writeText(JSON.stringify(replacementData, null, 4));
            alert('Copied to clipboard!');
        }
    };

    const copyConversionFactors = () => {
        const factorsCode = `// Paste these values into FertilizerProductionAnalyzer.js
// Line ~14: static CONVERSION_FACTORS = {
static CONVERSION_FACTORS = ${JSON.stringify(conversionFactors, null, 4)};`;
        navigator.clipboard.writeText(factorsCode);
        alert('Conversion factors copied! Paste into FertilizerProductionAnalyzer.js');
    };

    if (error) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ color: '#ff6b6b' }}>Error</h2>
                <p style={{ color: '#888' }}>{error}</p>
                <button
                    onClick={() => {
                        setError(null);
                        window.location.reload();
                    }}
                    style={{
                        marginTop: '1rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#4a90e2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                    }}
                >
                    Reload Page
                </button>
            </div>
        );
    }

    if (!dataLoaded) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Loading game data...</h2>
                <div style={{
                    marginTop: '1rem',
                    width: '60px',
                    height: '60px',
                    border: '6px solid #333',
                    borderTop: '6px solid #4a90e2',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '2rem auto'
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

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '1rem', color: '#4a90e2' }}>
                🧪 Fertilizer Production Cost Analysis - Tuning Tool
            </h1>
            <p style={{ color: '#888', marginBottom: '1rem' }}>
                This tool analyzes fertilizer production costs and allows you to tune the relative values of different resource types.
                Adjust the conversion factors below to change how resources are weighted, then copy the final values to the source code.
            </p>
            <div style={{
                backgroundColor: '#1a1a1a',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '2rem',
                border: '1px solid #FFD700'
            }}>
                <strong style={{ color: '#FFD700' }}>📝 Instructions:</strong>
                <ol style={{ color: '#ddd', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
                    <li>Adjust the conversion factors below to tune how different resources are valued</li>
                    <li>Click "Recalculate Analysis" to see how the values change</li>
                    <li>Review the rankings and efficiency ratings</li>
                    <li>Expand recipes to see individual recipe costs and compare them</li>
                    <li>Once satisfied, click "📋 Copy Conversion Factors" to copy the tuned values</li>
                    <li>Paste the values into <code style={{ backgroundColor: '#0a0a0a', padding: '0.2rem 0.4rem', borderRadius: '3px' }}>FertilizerProductionAnalyzer.js</code> (instructions in copied text)</li>
                </ol>
            </div>

            {/* Debug Info */}
            <div style={{
                backgroundColor: '#1a1a1a',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '2rem',
                border: '1px solid #333',
                fontSize: '0.85rem',
                color: '#888'
            }}>
                <strong style={{ color: '#ddd' }}>Debug Info:</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <div>Products loaded: <span style={{ color: '#4a90e2', fontWeight: '600' }}>{ProductionCalculator.products?.length || 0}</span></div>
                    <div>Recipes loaded: <span style={{ color: '#4a90e2', fontWeight: '600' }}>{ProductionCalculator.recipes?.length || 0}</span></div>
                    <div>Machines loaded: <span style={{ color: '#4a90e2', fontWeight: '600' }}>{ProductionCalculator.machines?.length || 0}</span></div>
                    <div>Fertilizers found: <span style={{ color: '#50C878', fontWeight: '600' }}>{fertilizerIds.length}</span></div>
                </div>
                {fertilizerIds.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>
                        {fertilizerIds.map(id => ProductionCalculator.getProduct(id)?.name).join(', ')}
                    </div>
                )}
            </div>

            {/* Conversion Factor Tuning */}
            <div style={{
                backgroundColor: '#2a2a2a',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                border: '2px solid #50C878'
            }}>
                <h3 style={{ marginBottom: '1rem', color: '#50C878', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⚙️ Conversion Factors (Tuning Parameters)
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
                    These values determine how different resource types are weighted relative to worker-hours.
                    Higher values mean that resource is considered "more expensive" in terms of worker effort.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <TuningInput
                        label="Worker Hours"
                        value={conversionFactors.workerHours}
                        onChange={(v) => updateFactor('workerHours', v)}
                        description="Base unit (always 1.0)"
                        min={1.0}
                        max={1.0}
                        step={0.1}
                        locked={true}
                    />
                    <TuningInput
                        label="Maintenance Per Month"
                        value={conversionFactors.maintenancePerMonth}
                        onChange={(v) => updateFactor('maintenancePerMonth', v)}
                        description="How many worker-hours equals 1 maintenance/month"
                        min={1}
                        max={100}
                        step={1}
                    />
                    <TuningInput
                        label="Electricity (kW) Per Month"
                        value={conversionFactors.electricityKwPerMonth}
                        onChange={(v) => updateFactor('electricityKwPerMonth', v)}
                        description="How many worker-hours equals 1 kW/month"
                        min={0.1}
                        max={50}
                        step={0.1}
                    />
                    <TuningInput
                        label="Computing Per Month"
                        value={conversionFactors.computingPerMonth}
                        onChange={(v) => updateFactor('computingPerMonth', v)}
                        description="How many worker-hours equals 1 computing unit/month"
                        min={1}
                        max={100}
                        step={1}
                    />
                    <TuningInput
                        label="Water Per Month"
                        value={conversionFactors.waterPerMonth}
                        onChange={(v) => updateFactor('waterPerMonth', v)}
                        description="How many worker-hours equals 1 water unit/month"
                        min={0.01}
                        max={10}
                        step={0.01}
                    />
                    <TuningInput
                        label="Ammonia Per Month"
                        value={conversionFactors.ammoniaPerMonth}
                        onChange={(v) => updateFactor('ammoniaPerMonth', v)}
                        description="How many worker-hours equals 1 ammonia unit/month"
                        min={0.1}
                        max={20}
                        step={0.1}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button
                        onClick={runAnalysis}
                        disabled={loading || fertilizerIds.length === 0}
                        style={{
                            flex: 1,
                            padding: '0.75rem 1.5rem',
                            backgroundColor: loading || fertilizerIds.length === 0 ? '#666' : '#4a90e2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: loading || fertilizerIds.length === 0 ? 'not-allowed' : 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {loading ? '⏳ Calculating...' : '🔄 Recalculate Analysis'}
                    </button>
                    <button
                        onClick={copyConversionFactors}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#50C878',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        📋 Copy Conversion Factors
                    </button>
                </div>
            </div>

            {/* Replacement Data Output */}
            {analysis && analysis.length > 0 && replacementData && (
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '2px solid #FFD700',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{ marginBottom: '1rem', color: '#FFD700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📋 Calculated Production Costs
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
                        These are the calculated production costs based on your tuning. The FertilizerCalculator already uses these dynamically,
                        so you don't need to copy this data unless you want to hardcode values for performance.
                    </p>

                    <div style={{
                        backgroundColor: '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '6px',
                        border: '1px solid #333',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        overflowX: 'auto',
                        position: 'relative'
                    }}>
                        <button
                            onClick={copyReplacementData}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#4a90e2',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                            }}
                        >
                            📋 Copy
                        </button>
                        <pre style={{ margin: 0, color: '#50C878', paddingTop: '2rem' }}>
                            {JSON.stringify(replacementData, null, 4)}
                        </pre>
                    </div>

                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '6px',
                        border: '1px solid #4a90e2'
                    }}>
                        <h4 style={{ fontSize: '0.9rem', color: '#4a90e2', marginBottom: '0.75rem' }}>
                            📊 What these values mean:
                        </h4>
                        <div style={{ fontSize: '0.8rem', color: '#ddd', lineHeight: '1.6' }}>
                            {analysis.map(r => (
                                <div key={r.fertilizerId} style={{ marginBottom: '0.75rem' }}>
                                    <div style={{ fontWeight: '700', color: '#FFD700' }}>{r.name}:</div>
                                    <div style={{ marginLeft: '1rem', fontSize: '0.75rem' }}>
                                        • Produces <strong>{r.unitsPerWorkerMonth.toFixed(2)} units/month</strong> per worker<br />
                                        • Provides <strong>{r.fertilityPerWorkerMonth.toFixed(2)}% fertility/month</strong> per worker<br />
                                        • Takes <strong>{r.workerMonthsPerUnit.toFixed(3)} worker-months</strong> to make 1 unit<br />
                                        • Averaged across {r.recipeCount} recipe{r.recipeCount > 1 ? 's' : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Analysis Results */}
            {analysis && analysis.length > 0 ? (
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #444'
                }}>
                    <h3 style={{ marginBottom: '1.5rem', color: '#FFD700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📊 Efficiency Rankings ({analysis.length} fertilizer{analysis.length !== 1 ? 's' : ''})
                    </h3>

                    {analysis.map((result, index) => {
                        const isExpanded = expandedFertilizers.has(result.fertilizerId);
                        const report = detailedReports[result.fertilizerId];
                        const product = ProductionCalculator.getProduct(result.fertilizerId);
                        const icon = product ? getProductIcon(product) : null;

                        return (
                            <div
                                key={result.fertilizerId}
                                style={{
                                    backgroundColor: '#1a1a1a',
                                    padding: '1.5rem',
                                    borderRadius: '6px',
                                    marginBottom: '1rem',
                                    border: index === 0 ? '2px solid #50C878' : '1px solid #333'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        {icon && (
                                            <img src={icon} alt={result.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                                        )}
                                        <h4 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>
                                            {index + 1}. {result.name}
                                            {index === 0 && <span style={{ color: '#50C878', marginLeft: '0.5rem' }}>★ Most Efficient</span>}
                                        </h4>
                                    </div>
                                    <div style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: result.efficiencyRating === 'Excellent' ? 'rgba(80, 200, 120, 0.2)' :
                                            result.efficiencyRating === 'Good' ? 'rgba(74, 144, 226, 0.2)' :
                                                result.efficiencyRating === 'Fair' ? 'rgba(255, 215, 0, 0.2)' :
                                                    'rgba(255, 107, 107, 0.2)',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        color: result.efficiencyRating === 'Excellent' ? '#50C878' :
                                            result.efficiencyRating === 'Good' ? '#4a90e2' :
                                                result.efficiencyRating === 'Fair' ? '#FFD700' :
                                                    '#ff6b6b'
                                    }}>
                                        {result.efficiencyRating}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                    <StatBox label="Fertility Per Unit" value={`${result.fertilityPerUnit}%`} color="#FFD700" />
                                    <StatBox label="Max Fertility" value={`${result.maxFertility}%`} color="#FFD700" />
                                    <StatBox
                                        label="Cost Per Unit"
                                        value={result.normalizedCostPerUnit.toFixed(2)}
                                        color="#4a90e2"
                                    />
                                    <StatBox
                                        label="Cost Per Fertility Point"
                                        value={result.costPerFertilityPoint.toFixed(4)}
                                        color="#50C878"
                                    />
                                </div>

                                <h5 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.75rem', marginTop: '1.5rem' }}>
                                    Cost Breakdown (averaged, per unit):
                                </h5>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                                    <CostBox label="Worker-Hours" value={result.costBreakdown.workerHours.toFixed(4)} />
                                    <CostBox label="Maintenance Equiv." value={result.costBreakdown.maintenanceEq.toFixed(4)} />
                                    <CostBox label="Electricity Equiv." value={result.costBreakdown.electricityEq.toFixed(4)} />
                                    <CostBox label="Computing Equiv." value={result.costBreakdown.computingEq.toFixed(4)} />
                                    <CostBox label="Water Equiv." value={result.costBreakdown.waterEq.toFixed(4)} />
                                    <CostBox label="Ammonia Equiv." value={result.costBreakdown.ammoniaEq.toFixed(4)} />
                                </div>

                                <div style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    backgroundColor: '#0a0a0a',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ color: '#888', fontSize: '0.85rem' }}>
                                        Total Worker-Equivalent Cost (per unit):
                                    </span>
                                    <span style={{ color: '#4a90e2', fontSize: '1.2rem', fontWeight: '700' }}>
                                        {result.normalizedCostPerUnit.toFixed(2)} hours
                                    </span>
                                </div>

                                {/* Production Chain Details */}
                                {report && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <button
                                            onClick={() => toggleExpanded(result.fertilizerId)}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                backgroundColor: isExpanded ? '#333' : '#0a0a0a',
                                                border: '1px solid #444',
                                                borderRadius: '4px',
                                                color: '#ddd',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <span>🔍 Production Chain Details ({result.recipeCount} recipe{result.recipeCount > 1 ? 's' : ''})</span>
                                            <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                                                ▼
                                            </span>
                                        </button>

                                        {isExpanded && (
                                            <div style={{
                                                marginTop: '1rem',
                                                padding: '1rem',
                                                backgroundColor: '#0a0a0a',
                                                borderRadius: '4px',
                                                border: '1px solid #333'
                                            }}>
                                                <h6 style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                                                    Recipe Comparison:
                                                </h6>
                                                {report.productionChains.map((chain, chainIndex) => {
                                                    // Find best recipe score
                                                    const allScores = report.productionChains.map(c => c.recipeScore);
                                                    const bestScore = Math.min(...allScores);
                                                    const isBestRecipe = chain.recipeScore === bestScore;
                                                    const scoreDiff = chain.recipeScore - bestScore;
                                                    const percentDiff = bestScore > 0 ? ((scoreDiff / bestScore) * 100) : 0;

                                                    return (
                                                        <div
                                                            key={chainIndex}
                                                            style={{
                                                                padding: '0.75rem',
                                                                backgroundColor: '#1a1a1a',
                                                                borderRadius: '4px',
                                                                marginBottom: '0.5rem',
                                                                border: isBestRecipe ? '2px solid #50C878' : '1px solid #222'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                                <div style={{ fontSize: '0.85rem', color: '#4a90e2', fontWeight: '600' }}>
                                                                    {chain.recipeName}
                                                                    {isBestRecipe && <span style={{ color: '#50C878', marginLeft: '0.5rem' }}>★ Best Recipe</span>}
                                                                </div>
                                                                <div style={{
                                                                    padding: '0.25rem 0.5rem',
                                                                    backgroundColor: isBestRecipe ? 'rgba(80, 200, 120, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                                                                    borderRadius: '3px',
                                                                    fontSize: '0.7rem',
                                                                    fontWeight: '700',
                                                                    color: isBestRecipe ? '#50C878' : '#ff6b6b'
                                                                }}>
                                                                    Score: {chain.recipeScore.toFixed(2)}
                                                                    {!isBestRecipe && ` (+${percentDiff.toFixed(1)}%)`}
                                                                </div>
                                                            </div>

                                                            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                                                                Duration: {chain.durationSeconds}s per cycle
                                                            </div>

                                                            {/* Recipe Cost Breakdown */}
                                                            <div style={{
                                                                display: 'grid',
                                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                                gap: '0.5rem',
                                                                marginBottom: '0.75rem',
                                                                padding: '0.5rem',
                                                                backgroundColor: '#0a0a0a',
                                                                borderRadius: '3px'
                                                            }}>
                                                                <RecipeCostDetail label="Workers" value={chain.recipeCost.workerMonths.toFixed(4)} />
                                                                <RecipeCostDetail label="Maint" value={chain.recipeCost.maintenanceMonths.toFixed(4)} />
                                                                <RecipeCostDetail label="Power" value={chain.recipeCost.electricityKwMonths.toFixed(4)} />
                                                                <RecipeCostDetail label="Computing" value={chain.recipeCost.computingMonths.toFixed(4)} />
                                                                <RecipeCostDetail label="Water" value={chain.recipeCost.waterMonths.toFixed(4)} />
                                                                <RecipeCostDetail label="Ammonia" value={chain.recipeCost.ammoniaMonths.toFixed(4)} />
                                                            </div>

                                                            {/* Machine Details */}
                                                            <div style={{ marginBottom: '0.5rem' }}>
                                                                <div style={{ fontSize: '0.75rem', color: '#FFD700', fontWeight: '600', marginBottom: '0.25rem' }}>
                                                                    Machine(s):
                                                                </div>
                                                                {chain.machines.map((machine, machineIndex) => (
                                                                    <div key={machineIndex} style={{
                                                                        fontSize: '0.7rem',
                                                                        color: '#aaa',
                                                                        marginLeft: '1rem',
                                                                        marginBottom: '0.25rem'
                                                                    }}>
                                                                        <div style={{ fontWeight: '600', color: '#ddd' }}>{machine.name}</div>
                                                                        <div style={{ marginLeft: '1rem', fontSize: '0.65rem' }}>
                                                                            Workers: {machine.workers} | Maintenance: {machine.maintenance} |
                                                                            Electricity: {machine.electricityKw} kW | Computing: {machine.computing}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Inputs */}
                                                            <div style={{ marginBottom: '0.5rem' }}>
                                                                <div style={{ fontSize: '0.75rem', color: '#ff6b6b', fontWeight: '600', marginBottom: '0.25rem' }}>
                                                                    Inputs:
                                                                </div>
                                                                <div style={{ fontSize: '0.7rem', color: '#aaa', marginLeft: '1rem' }}>
                                                                    {chain.inputs.map((inp, idx) => (
                                                                        <div key={idx}>
                                                                            {inp.quantity}x {inp.productName}
                                                                            {inp.isFertilizer && <span style={{ color: '#FFD700', marginLeft: '0.5rem' }}>🌾 (Fertilizer)</span>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Outputs */}
                                                            <div>
                                                                <div style={{ fontSize: '0.75rem', color: '#50C878', fontWeight: '600', marginBottom: '0.25rem' }}>
                                                                    Outputs:
                                                                </div>
                                                                <div style={{ fontSize: '0.7rem', color: '#aaa', marginLeft: '1rem' }}>
                                                                    {chain.outputs.map((out, idx) => (
                                                                        <div key={idx}>{out.quantity}x {out.productName}</div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid #444',
                    textAlign: 'center',
                    color: '#888'
                }}>
                    {loading ? 'Analyzing...' : fertilizerIds.length === 0 ? 'No fertilizers found in game data.' : 'No analysis results yet. Click "Recalculate Analysis" to run.'}
                </div>
            )}
        </div>
    );
};

const TuningInput = ({ label, value, onChange, description, min, max, step, locked = false }) => (
    <div style={{
        backgroundColor: locked ? '#1a1a1a' : '#0a0a0a',
        padding: '1rem',
        borderRadius: '6px',
        border: `1px solid ${locked ? '#333' : '#444'}`,
        opacity: locked ? 0.6 : 1
    }}>
        <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.85rem',
            color: '#ddd',
            fontWeight: '600'
        }}>
            {label} {locked && <span style={{ color: '#888', fontSize: '0.75rem' }}>(locked)</span>}
        </label>
        <input
            type="number"
            step={step}
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={locked}
            style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: locked ? '#0a0a0a' : '#1a1a1a',
                border: '1px solid #444',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '0.9rem',
                cursor: locked ? 'not-allowed' : 'text'
            }}
        />
        <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem', lineHeight: '1.4' }}>
            {description}
        </div>
    </div>
);

const StatBox = ({ label, value, color = '#4a90e2' }) => (
    <div style={{ backgroundColor: '#0a0a0a', padding: '0.75rem', borderRadius: '4px' }}>
        <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>{label}</div>
        <div style={{ fontSize: '1rem', fontWeight: '700', color }}>{value}</div>
    </div>
);

const CostBox = ({ label, value }) => (
    <div style={{ backgroundColor: '#0a0a0a', padding: '0.5rem', borderRadius: '4px' }}>
        <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '0.25rem' }}>{label}</div>
        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ddd' }}>{value}</div>
    </div>
);

const RecipeCostDetail = ({ label, value }) => (
    <div style={{ fontSize: '0.65rem' }}>
        <span style={{ color: '#888' }}>{label}:</span> <span style={{ color: '#ddd', fontWeight: '600' }}>{value}</span>
    </div>
);

export default FertilizerAnalysisTest;