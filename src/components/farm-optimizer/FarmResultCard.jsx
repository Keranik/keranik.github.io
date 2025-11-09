// src/components/farm-optimizer/FarmResultCard.jsx
import { useState } from 'react';
import { getCropIcon, getProductIcon, getGeneralIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';
import FertilizerSelector from './FertilizerSelector';
import FertilityBreakdownPanel from './FertilityBreakdownPanel';

const FarmResultCard = ({
    farmNumber,
    farmResult,
    research,
    onFertilizerSelect,
    onCustomFertilityChange
}) => {
    const [showFertilityBreakdown, setShowFertilityBreakdown] = useState(false);

    const {
        farm,
        effectiveFarm,
        rotation,
        production,
        fertilityInfo,
        actualFertility,
        usingFertilizer,
        peopleFed,
        totalWaterPerDay,
        farmWaterPerDay,
        processingWaterPerDay,
        totalRotationMonths,
        processingChains,
        slotDetails,
        fertilizerOptions
    } = farmResult;

    return (
        <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333'
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#4a90e2', marginBottom: '0.5rem' }}>
                    Farm #{farmNumber} - {effectiveFarm.name}
                </h4>
                <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    Feeds {peopleFed.toFixed(1)} people/month • {totalWaterPerDay.toFixed(1)} water/day
                    {processingWaterPerDay > 0 && (
                        <span style={{ color: '#666', marginLeft: '8px' }}>
                            (Farm: {farmWaterPerDay.toFixed(1)} + Processing: {processingWaterPerDay.toFixed(1)})
                        </span>
                    )}
                </div>
            </div>

            {/* Crop Rotation Display */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                {rotation.map((cropId, idx) => {
                    const crop = cropId ? ProductionCalculator.crops.find(c => c.id === cropId) : null;
                    const icon = crop ? getCropIcon(crop) : null;
                    const slotDetail = slotDetails?.find(s => s.cropId === cropId);

                    return (
                        <div
                            key={idx}
                            style={{
                                padding: '0.75rem',
                                backgroundColor: crop ? '#2a4a6a' : '#2a2a2a',
                                border: crop ? '2px solid #4a90e2' : '2px dashed #444',
                                borderRadius: '6px',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>
                                SLOT {idx + 1}
                            </div>
                            {crop && icon && (
                                <img
                                    src={icon}
                                    alt={crop.name}
                                    style={{ width: '24px', height: '24px', objectFit: 'contain', margin: '0.25rem auto' }}
                                />
                            )}
                            <div style={{ fontSize: '0.8rem', fontWeight: '600', color: crop ? '#fff' : '#666' }}>
                                {crop ? crop.name : 'Empty'}
                            </div>
                            {slotDetail && (
                                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #444', fontSize: '0.7rem' }}>
                                    <div style={{ color: '#4a90e2', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                                        {getGeneralIcon('Population') && (
                                            <img
                                                src={getGeneralIcon('Population')}
                                                alt="People"
                                                style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                            />
                                        )}
                                        {slotDetail.peopleFed.toFixed(0)} /mo
                                    </div>
                                    <div style={{ color: '#50C878', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                                        {getProductIcon(ProductionCalculator.products?.find(p => p.name?.toLowerCase() === 'water')) && (
                                            <img
                                                src={getProductIcon(ProductionCalculator.products?.find(p => p.name?.toLowerCase() === 'water'))}
                                                alt="Water"
                                                style={{ width: '12px', height: '12px', objectFit: 'contain' }}
                                            />
                                        )}
                                        {(slotDetail.waterPerDay * 30).toFixed(0)} /mo
                                    </div>
                                    {slotDetail.processingChain && !slotDetail.processingChain.isDirect && (
                                        <div style={{ color: '#FFD700', marginTop: '2px', fontSize: '0.65rem' }}>
                                            {getGeneralIcon('Machines') && (
                                                <img
                                                    src={getGeneralIcon('Machines')}
                                                    alt="Processed"
                                                    style={{ width: '10px', height: '10px', objectFit: 'contain', display: 'inline', marginRight: '2px' }}
                                                />
                                            )}
                                            Processed
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Processing Chains */}
            {processingChains && processingChains.some(c => !c.isDirect) && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    border: '1px solid #4a90e2'
                }}>
                    <div style={{ fontSize: '0.9rem', color: '#4a90e2', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getGeneralIcon('Machines') && (
                            <img
                                src={getGeneralIcon('Machines')}
                                alt="Processing"
                                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                            />
                        )}
                        Processing Required
                    </div>
                    {processingChains.filter(c => !c.isDirect).map((chain, idx) => {
                        const cropProduct = ProductionCalculator.getProduct(chain.cropProductId);
                        const foodProduct = ProductionCalculator.getProduct(chain.finalFoodProductId);

                        return (
                            <div key={idx} style={{
                                fontSize: '0.8rem',
                                color: '#ddd',
                                padding: '6px 8px',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '4px',
                                marginBottom: '4px'
                            }}>
                                <div style={{ marginBottom: '4px' }}>
                                    <strong>{cropProduct?.name}</strong> → <strong style={{ color: '#FFD700' }}>{foodProduct?.name}</strong>
                                </div>
                                {chain.machines && chain.machines.length > 0 && (
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                        {chain.machines.map(m => `${m.machineName} ×${m.count}`).join(', ')}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Fertility Stats */}
            <div style={{
                padding: '1rem',
                backgroundColor: '#2a2a2a',
                borderRadius: '6px',
                marginBottom: '1rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    fontSize: '0.85rem'
                }}>
                    <div>
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>Natural Equilibrium</div>
                        <div style={{ color: '#FFD700', fontWeight: '700', fontSize: '1rem' }}>
                            {fertilityInfo.naturalEquilibrium.toFixed(1)}%
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>
                            {usingFertilizer ? 'With Fertilizer' : 'Actual Fertility'}
                        </div>
                        <div style={{
                            color: usingFertilizer ? '#4a90e2' : '#50C878',
                            fontWeight: '700',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            {actualFertility.toFixed(1)}%
                            {usingFertilizer && getGeneralIcon('Fertilizer') && (
                                <img
                                    src={getGeneralIcon('Fertilizer')}
                                    alt="Fertilizer"
                                    style={{ width: '14px', height: '14px', objectFit: 'contain' }}
                                />
                            )}
                        </div>
                        {usingFertilizer && (
                            <div style={{ fontSize: '0.65rem', color: '#4a90e2', marginTop: '2px' }}>
                                Using fertilizer
                            </div>
                        )}
                    </div>
                    <div>
                        <div style={{ color: '#888', marginBottom: '0.25rem' }}>Rotation Length</div>
                        <div style={{ color: '#50C878', fontWeight: '700', fontSize: '1rem' }}>
                            {totalRotationMonths > 0
                                ? `${totalRotationMonths.toFixed(1)} ${totalRotationMonths === 1 ? 'month' : 'months'}`
                                : '0 months'}
                        </div>
                    </div>
                </div>

                {/* Toggle Fertility Breakdown */}
                <button
                    onClick={() => setShowFertilityBreakdown(!showFertilityBreakdown)}
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#1a1a1a',
                        color: '#4a90e2',
                        border: '1px solid #4a90e2',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {showFertilityBreakdown ? '▼' : '▶'} {showFertilityBreakdown ? 'Hide' : 'Show'} Fertility Breakdown
                </button>
            </div>

            {/* Fertility Breakdown Panel */}
            {showFertilityBreakdown && (
                <FertilityBreakdownPanel
                    farmResult={farmResult}
                    effectiveFarm={effectiveFarm}
                    rotation={rotation}
                    research={research}
                    onFertilityChange={(farmId, newFertility) => {
                        onCustomFertilityChange(farmId, newFertility);
                    }}
                />
            )}

            {/* Fertilizer Options - ALWAYS show for planning */}
            {fertilizerOptions && fertilizerOptions.length > 0 && (
                <FertilizerSelector
                    farmIndex={farmNumber - 1}
                    fertilizerOptions={fertilizerOptions}
                    selectedFertilizerId={farm.selectedFertilizerId}
                    onSelectFertilizer={onFertilizerSelect}
                    isActivelyUsed={usingFertilizer}
                    naturalEquilibrium={fertilityInfo.naturalEquilibrium}
                />
            )}

            {/* Production */}
            {Object.keys(production).length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Production (per month):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {Object.entries(production).map(([productId, quantity]) => {
                            const product = ProductionCalculator.getProduct(productId);
                            const icon = getProductIcon(product);
                            return (
                                <div
                                    key={productId}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        backgroundColor: '#2a2a2a',
                                        borderRadius: '4px',
                                        border: '1px solid #444'
                                    }}
                                >
                                    {icon && (
                                        <img
                                            src={icon}
                                            alt={product?.name}
                                            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                        />
                                    )}
                                    <span style={{ color: '#ddd', fontSize: '0.85rem' }}>
                                        {product?.name}
                                    </span>
                                    <span style={{ color: '#4a90e2', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                        {quantity.toFixed(0)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FarmResultCard;