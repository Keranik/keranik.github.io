// src/pages/FertilizerAnalysisTest.jsx
// Interactive tuning tool for fertilizer production cost analysis

import { useState, useEffect } from 'react';
import ProductionCalculator from '../utils/ProductionCalculator';
import { GameDataManager } from '../managers/GameDataManager';
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
                console.log('🔄 Loading game data...');
                const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];

                await GameDataManager.getGameData(enabledMods);
                await ProductionCalculator.initialize();

                const allFertilizers = ProductionCalculator.products?.filter(p =>
                    p.fertilizer &&
                    p.fertilizer.fertilityPerQuantityPercent !== undefined &&
                    p.fertilizer.maxFertilityPercent !== undefined
                ) || [];

                const fertIds = allFertilizers.map(f => f.id);
                console.log('✅ Found fertilizers:', fertIds, allFertilizers.map(f => f.name));
                setFertilizerIds(fertIds);

                console.log('📊 Data loaded:', {
                    products: ProductionCalculator.products?.length,
                    recipes: ProductionCalculator.recipes?.length,
                    machines: ProductionCalculator.machines?.length,
                    fertilizers: fertIds.length
                });

                setDataLoaded(true);
            } catch (error) {
                console.error('❌ Error loading data:', error);
                setError(error.message);
            }
        };
        loadData();
    }, [settings.enableModdedContent, settings.enabledMods]);

    useEffect(() => {
        if (dataLoaded && fertilizerIds.length > 0 && !analysis) {
            console.log('🚀 Data loaded, running initial analysis');
            runAnalysis();
        }
    }, [dataLoaded, fertilizerIds]);

    const runAnalysis = () => {
        if (!dataLoaded || fertilizerIds.length === 0) {
            console.warn('⚠️ Cannot run analysis: data not loaded or no fertilizers');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('\n' + '='.repeat(80));
            console.log('🧪 RUNNING FERTILIZER ANALYSIS');
            console.log('='.repeat(80));

            FertilizerProductionAnalyzer.updateConversionFactors(conversionFactors);

            const { results, replacementData: repData } =
                FertilizerProductionAnalyzer.generateReplacementData(fertilizerIds);

            console.log('✅ Analysis complete');
            console.log('📊 Results:', results);

            setAnalysis(results);
            setReplacementData(repData);

            // Generate detailed reports with per-recipe analysis
            const reports = {};
            fertilizerIds.forEach(id => {
                const recipes = FertilizerProductionAnalyzer.findRecipesProducing(id);
                if (recipes.length > 0) {
                    reports[id] = {
                        fertilizerId: id,
                        name: ProductionCalculator.getProduct(id)?.name,
                        productionChains: recipes.map(recipe => {
                            const recipeCost = FertilizerProductionAnalyzer.calculateRecipeCost(recipe);
                            const recipeBreakdown = FertilizerProductionAnalyzer.getDetailedBreakdown(recipeCost);

                            return {
                                recipeId: recipe.id,
                                recipeName: recipe.name,
                                durationSeconds: recipe.durationSeconds,
                                recipeCost: recipeCost,
                                recipeBreakdown: recipeBreakdown,
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
            console.error('❌ Error during analysis:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateFactor = (key, value) => {
        const newValue = parseFloat(value) || 0;
        console.log(`🔧 Updating factor ${key}: ${conversionFactors[key]} -> ${newValue}`);
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
            alert('✅ Copied replacement data to clipboard!');
        }
    };

    const copyConversionFactors = () => {
        const factorsCode = `// Calibrated Conversion Factors for FertilizerProductionAnalyzer.js
// Paste these into line ~28 of FertilizerProductionAnalyzer.js

static CONVERSION_FACTORS = ${JSON.stringify(conversionFactors, null, 4)};`;
        navigator.clipboard.writeText(factorsCode);
        alert('✅ Copied conversion factors!\n\nPaste into FertilizerProductionAnalyzer.js (line ~28)');
    };

    if (error) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ color: '#ff6b6b' }}>❌ Error</h2>
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
                    🔄 Reload Page
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
                🧪 Fertilizer Economic Analysis - Tuning Tool
            </h1>

            <InfoPanel />

            <DebugPanel
                productCount={ProductionCalculator.products?.length || 0}
                recipeCount={ProductionCalculator.recipes?.length || 0}
                machineCount={ProductionCalculator.machines?.length || 0}
                fertilizerCount={fertilizerIds.length}
                fertilizerNames={fertilizerIds.map(id => ProductionCalculator.getProduct(id)?.name)}
            />

            <ConversionFactorPanel
                conversionFactors={conversionFactors}
                updateFactor={updateFactor}
                runAnalysis={runAnalysis}
                copyConversionFactors={copyConversionFactors}
                loading={loading}
                disabled={fertilizerIds.length === 0}
            />

            {analysis && analysis.length > 0 && replacementData && (
                <ReplacementDataPanel
                    replacementData={replacementData}
                    analysis={analysis}
                    copyReplacementData={copyReplacementData}
                />
            )}

            {analysis && analysis.length > 0 ? (
                <AnalysisResultsPanel
                    analysis={analysis}
                    detailedReports={detailedReports}
                    expandedFertilizers={expandedFertilizers}
                    toggleExpanded={toggleExpanded}
                />
            ) : (
                <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid #444',
                    textAlign: 'center',
                    color: '#888'
                }}>
                    {loading ? '⏳ Analyzing...' :
                        fertilizerIds.length === 0 ? '❌ No fertilizers found in game data.' :
                            '📊 No analysis results yet. Click "Recalculate Analysis" to run.'}
                </div>
            )}
        </div>
    );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const InfoPanel = () => (
    <div style={{
        backgroundColor: '#1a1a1a',
        padding: '1.5rem',
        borderRadius: '6px',
        marginBottom: '2rem',
        border: '2px solid #FFD700'
    }}>
        <h3 style={{ color: '#FFD700', marginBottom: '1rem' }}>📖 What This Tool Does</h3>
        <div style={{ color: '#ddd', fontSize: '0.9rem', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1rem' }}>
                This tool calculates the <strong>true economic cost</strong> of fertilizer production by measuring
                the total <strong>worker-months</strong> required to produce each unit, including all upstream
                production chains (inputs, electricity, water, maintenance, etc.).
            </p>
            <p style={{ marginBottom: '1rem' }}>
                <strong>Why this matters:</strong> Fertilizer increases farm yield, but requires workers to produce it.
                Those workers consume food. The tool helps determine if the extra food from fertilizer exceeds
                the food cost of workers making it.
            </p>
            <p style={{ marginBottom: '1rem' }}>
                <strong>Example:</strong> If Fertilizer II increases yield by +30 people, but requires 5 workers
                to produce, the net benefit is only +25 people. Sometimes a simpler fertilizer is more efficient!
            </p>
        </div>
        <div style={{
            backgroundColor: '#0a0a0a',
            padding: '1rem',
            borderRadius: '4px',
            marginTop: '1rem',
            border: '1px solid #333'
        }}>
            <strong style={{ color: '#4a90e2' }}>🎮 Game Time System:</strong>
            <div style={{ marginLeft: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#aaa' }}>
                • 10 ticks/second<br />
                • 2 seconds/day<br />
                • 30 days/month<br />
                • <strong style={{ color: '#FFD700' }}>60 seconds/month</strong> (this is the base unit for all calculations)
            </div>
        </div>
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#0a0a0a', borderRadius: '4px' }}>
            <strong style={{ color: '#50C878' }}>✅ How to Use:</strong>
            <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', fontSize: '0.85rem', lineHeight: '1.8' }}>
                <li>Adjust conversion factors below (how much "worker effort" each resource type costs)</li>
                <li>Click "Recalculate Analysis" to see updated rankings</li>
                <li>Review efficiency ratings - does the ranking match your intuition?</li>
                <li>Expand recipes to see individual production chain costs</li>
                <li>Once satisfied, copy the conversion factors back to the source code</li>
            </ol>
        </div>
    </div>
);

const DebugPanel = ({ productCount, recipeCount, machineCount, fertilizerCount, fertilizerNames }) => (
    <div style={{
        backgroundColor: '#1a1a1a',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '2rem',
        border: '1px solid #333',
        fontSize: '0.85rem',
        color: '#888'
    }}>
        <strong style={{ color: '#ddd' }}>🔍 Debug Info:</strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div>Products: <span style={{ color: '#4a90e2', fontWeight: '600' }}>{productCount}</span></div>
            <div>Recipes: <span style={{ color: '#4a90e2', fontWeight: '600' }}>{recipeCount}</span></div>
            <div>Machines: <span style={{ color: '#4a90e2', fontWeight: '600' }}>{machineCount}</span></div>
            <div>Fertilizers: <span style={{ color: '#50C878', fontWeight: '600' }}>{fertilizerCount}</span></div>
        </div>
        {fertilizerCount > 0 && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>
                {fertilizerNames.join(', ')}
            </div>
        )}
    </div>
);

const ConversionFactorPanel = ({ conversionFactors, updateFactor, runAnalysis, copyConversionFactors, loading, disabled }) => (
    <div style={{
        backgroundColor: '#2a2a2a',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '2px solid #50C878'
    }}>
        <h3 style={{ marginBottom: '1rem', color: '#50C878' }}>
            ⚙️ Conversion Factors (Economic Tuning)
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
            These values represent: <strong>"How many worker-months does it take to produce 1 unit/month of this resource?"</strong>
            <br />
            Higher values = resource is more "expensive" in terms of worker effort.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <TuningInput
                label="Maintenance Per Month"
                value={conversionFactors.maintenancePerMonth}
                onChange={(v) => updateFactor('maintenancePerMonth', v)}
                description="Worker-months per 1 maintenance/month"
                min={0.001}
                max={1}
                step={0.001}
            />
            <TuningInput
                label="Electricity (kW) Per Month"
                value={conversionFactors.electricityKwPerMonth}
                onChange={(v) => updateFactor('electricityKwPerMonth', v)}
                description="Worker-months per 1 kW/month"
                min={0.0001}
                max={0.1}
                step={0.0001}
            />
            <TuningInput
                label="Computing Per Month"
                value={conversionFactors.computingPerMonth}
                onChange={(v) => updateFactor('computingPerMonth', v)}
                description="Worker-months per 1 computing unit/month"
                min={0.001}
                max={1}
                step={0.001}
            />
            <TuningInput
                label="Water Per Month"
                value={conversionFactors.waterPerMonth}
                onChange={(v) => updateFactor('waterPerMonth', v)}
                description="Worker-months per 1 water unit/month"
                min={0.001}
                max={1}
                step={0.001}
            />
            <TuningInput
                label="Ammonia Per Month"
                value={conversionFactors.ammoniaPerMonth}
                onChange={(v) => updateFactor('ammoniaPerMonth', v)}
                description="Worker-months per 1 ammonia unit/month"
                min={0.001}
                max={1}
                step={0.001}
            />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
                onClick={runAnalysis}
                disabled={loading || disabled}
                style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    backgroundColor: loading || disabled ? '#666' : '#4a90e2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading || disabled ? 'not-allowed' : 'pointer',
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
);

const ReplacementDataPanel = ({ replacementData, analysis, copyReplacementData }) => (
    <div style={{
        backgroundColor: '#2a2a2a',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '2px solid #FFD700',
        marginBottom: '2rem'
    }}>
        <h3 style={{ marginBottom: '1rem', color: '#FFD700' }}>
            📋 Calculated Production Costs
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
            FertilizerCalculator uses these values dynamically. You only need to copy this if you want
            to hardcode values for performance or testing.
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
                📋 Copy JSON
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
                            • <strong>{r.unitsPerWorkerMonth.toFixed(2)} units/worker-month</strong> (1 worker produces this many units per month)<br />
                            • <strong>{r.fertilityPerWorkerMonth.toFixed(2)}% fertility/worker-month</strong> (fertility provided per worker per month)<br />
                            • <strong>{r.workerMonthsPerUnit.toFixed(4)} worker-months/unit</strong> (total worker effort to make 1 unit)<br />
                            • Averaged across {r.recipeCount} recipe{r.recipeCount > 1 ? 's' : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const AnalysisResultsPanel = ({ analysis, detailedReports, expandedFertilizers, toggleExpanded }) => (
    <div style={{
        backgroundColor: '#2a2a2a',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #444'
    }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#FFD700' }}>
            📊 Efficiency Rankings ({analysis.length} fertilizer{analysis.length !== 1 ? 's' : ''})
        </h3>

        {analysis.map((result, index) => {
            const isExpanded = expandedFertilizers.has(result.fertilizerId);
            const report = detailedReports[result.fertilizerId];
            const product = ProductionCalculator.getProduct(result.fertilizerId);
            const icon = product ? getProductIcon(product) : null;

            return (
                <FertilizerCard
                    key={result.fertilizerId}
                    result={result}
                    index={index}
                    icon={icon}
                    isExpanded={isExpanded}
                    report={report}
                    toggleExpanded={toggleExpanded}
                />
            );
        })}
    </div>
);

const FertilizerCard = ({ result, index, icon, isExpanded, report, toggleExpanded }) => (
    <div style={{
        backgroundColor: '#1a1a1a',
        padding: '1.5rem',
        borderRadius: '6px',
        marginBottom: '1rem',
        border: index === 0 ? '2px solid #50C878' : '1px solid #333'
    }}>
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
            <EfficiencyBadge rating={result.efficiencyRating} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <StatBox label="Fertility Per Unit" value={`${result.fertilityPerUnit}%`} color="#FFD700" />
            <StatBox label="Max Fertility" value={`${result.maxFertility}%`} color="#FFD700" />
            <StatBox
                label="Worker-Months Per Unit"
                value={result.workerMonthsPerUnit.toFixed(4)}
                color="#4a90e2"
            />
            <StatBox
                label="Units Per Worker-Month"
                value={result.unitsPerWorkerMonth.toFixed(2)}
                color="#50C878"
            />
        </div>

        <CostBreakdown breakdown={result.breakdown} />

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
                Cost per % fertility:
            </span>
            <span style={{ color: '#4a90e2', fontSize: '1.2rem', fontWeight: '700' }}>
                {result.costPerFertilityPoint.toFixed(6)} worker-months
            </span>
        </div>

        {report && (
            <RecipeDetails
                report={report}
                result={result}
                isExpanded={isExpanded}
                toggleExpanded={toggleExpanded}
            />
        )}
    </div>
);

const EfficiencyBadge = ({ rating }) => {
    const colors = {
        'Excellent': { bg: 'rgba(80, 200, 120, 0.2)', text: '#50C878' },
        'Good': { bg: 'rgba(74, 144, 226, 0.2)', text: '#4a90e2' },
        'Fair': { bg: 'rgba(255, 215, 0, 0.2)', text: '#FFD700' },
        'Poor': { bg: 'rgba(255, 107, 107, 0.2)', text: '#ff6b6b' }
    };
    const style = colors[rating] || colors['Poor'];

    return (
        <div style={{
            padding: '0.5rem 1rem',
            backgroundColor: style.bg,
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: style.text
        }}>
            {rating}
        </div>
    );
};

const CostBreakdown = ({ breakdown }) => (
    <>
        <h5 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.75rem', marginTop: '1.5rem' }}>
            Worker-Equivalent Breakdown (per unit):
        </h5>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            <CostBox label="Direct Workers" value={breakdown.workerEquivalents.workers.toFixed(4)} />
            <CostBox label="Maintenance" value={breakdown.workerEquivalents.maintenance.toFixed(4)} />
            <CostBox label="Electricity" value={breakdown.workerEquivalents.electricity.toFixed(4)} />
            <CostBox label="Computing" value={breakdown.workerEquivalents.computing.toFixed(4)} />
            <CostBox label="Water" value={breakdown.workerEquivalents.water.toFixed(4)} />
            <CostBox label="Ammonia" value={breakdown.workerEquivalents.ammonia.toFixed(4)} />
        </div>
    </>
);

const RecipeDetails = ({ report, result, isExpanded, toggleExpanded }) => (
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
            <span>🔍 Recipe Details ({result.recipeCount} recipe{result.recipeCount > 1 ? 's' : ''})</span>
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
                {report.productionChains.map((chain, chainIndex) => (
                    <RecipeCard
                        key={chainIndex}
                        chain={chain}
                        allChains={report.productionChains}
                        chainIndex={chainIndex}
                    />
                ))}
            </div>
        )}
    </div>
);

const RecipeCard = ({ chain, allChains, chainIndex }) => {
    const allScores = allChains.map(c => c.recipeBreakdown.totalWorkerMonths);
    const bestScore = Math.min(...allScores);
    const isBestRecipe = chain.recipeBreakdown.totalWorkerMonths === bestScore;
    const scoreDiff = chain.recipeBreakdown.totalWorkerMonths - bestScore;
    const percentDiff = bestScore > 0 ? ((scoreDiff / bestScore) * 100) : 0;

    return (
        <div style={{
            padding: '0.75rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '4px',
            marginBottom: chainIndex < allChains.length - 1 ? '0.5rem' : '0',
            border: isBestRecipe ? '2px solid #50C878' : '1px solid #222'
        }}>
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
                    {chain.recipeBreakdown.totalWorkerMonths.toFixed(4)} worker-months
                    {!isBestRecipe && ` (+${percentDiff.toFixed(1)}%)`}
                </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                Duration: {chain.durationSeconds}s | {(chain.durationSeconds / 60 * 30).toFixed(1)} days
            </div>

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

            <MachineDetails machines={chain.machines} />
            <InputDetails inputs={chain.inputs} />
            <OutputDetails outputs={chain.outputs} />
        </div>
    );
};

const MachineDetails = ({ machines }) => (
    <div style={{ marginBottom: '0.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#FFD700', fontWeight: '600', marginBottom: '0.25rem' }}>
            Machine(s):
        </div>
        {machines.map((machine, idx) => (
            <div key={idx} style={{
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
);

const InputDetails = ({ inputs }) => (
    <div style={{ marginBottom: '0.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#ff6b6b', fontWeight: '600', marginBottom: '0.25rem' }}>
            Inputs:
        </div>
        <div style={{ fontSize: '0.7rem', color: '#aaa', marginLeft: '1rem' }}>
            {inputs.map((inp, idx) => (
                <div key={idx}>
                    {inp.quantity}x {inp.productName}
                    {inp.isFertilizer && <span style={{ color: '#FFD700', marginLeft: '0.5rem' }}>🌾 (Fertilizer)</span>}
                </div>
            ))}
        </div>
    </div>
);

const OutputDetails = ({ outputs }) => (
    <div>
        <div style={{ fontSize: '0.75rem', color: '#50C878', fontWeight: '600', marginBottom: '0.25rem' }}>
            Outputs:
        </div>
        <div style={{ fontSize: '0.7rem', color: '#aaa', marginLeft: '1rem' }}>
            {outputs.map((out, idx) => (
                <div key={idx}>{out.quantity}x {out.productName}</div>
            ))}
        </div>
    </div>
);

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

const TuningInput = ({ label, value, onChange, description, min, max, step }) => (
    <div style={{
        backgroundColor: '#0a0a0a',
        padding: '1rem',
        borderRadius: '6px',
        border: '1px solid #444'
    }}>
        <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.85rem',
            color: '#ddd',
            fontWeight: '600'
        }}>
            {label}
        </label>
        <input
            type="number"
            step={step}
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #444',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '0.9rem'
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