// src/components/farm-optimizer/FertilizerSelector.jsx
import { getProductIcon, getGeneralIcon } from '../../utils/AssetHelper';
import ProductionCalculator from '../../utils/ProductionCalculator';

const FertilizerSelector = ({
    farmIndex,
    fertilizerOptions,
    selectedFertilizerId,
    onSelectFertilizer,
    isActivelyUsed = false,
    naturalEquilibrium
}) => {
    if (!fertilizerOptions || fertilizerOptions.length === 0) {
        return (
            <div style={{
                fontSize: '0.8rem',
                color: '#888',
                fontStyle: 'italic',
                padding: '0.75rem',
                backgroundColor: '#2a2a2a',
                borderRadius: '6px',
                border: '1px solid #333',
                marginTop: '1rem'
            }}>
                {getGeneralIcon('Success') && (
                    <img
                        src={getGeneralIcon('Success')}
                        alt="Success"
                        style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }}
                    />
                )}
                No fertilizer needed (natural fertility sufficient)
            </div>
        );
    }

    const fertilizerIcon = getGeneralIcon('Fertilizer');

    const selectedOption = fertilizerOptions.find(
        opt => opt.fertilizerId === (selectedFertilizerId || fertilizerOptions[0].fertilizerId)
    );

    return (
        <div style={{
            padding: '1rem',
            backgroundColor: '#2a2a2a',
            borderRadius: '6px',
            border: isActivelyUsed ? '2px solid #FFD700' : '2px solid #666',
            marginTop: '1rem',
            opacity: isActivelyUsed ? 1 : 0.8
        }}>
            {!isActivelyUsed && (
                <div style={{
                    padding: '0.5rem',
                    backgroundColor: 'rgba(255, 165, 0, 0.1)',
                    border: '1px solid #FFA500',
                    borderRadius: '4px',
                    marginBottom: '0.75rem',
                    fontSize: '0.75rem',
                    color: '#FFA500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {getGeneralIcon('Info') && (
                        <img
                            src={getGeneralIcon('Info')}
                            alt="Info"
                            style={{ width: '12px', height: '12px' }}
                        />
                    )}
                    <span>
                        <strong>Planning Info:</strong> "Natural Fertility Only" is active. This shows what you'd need to boost fertility. Uncheck constraint to use fertilizer.
                    </span>
                </div>
            )}

            <div style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: isActivelyUsed ? '#FFD700' : '#888',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                {fertilizerIcon && (
                    <img
                        src={fertilizerIcon}
                        alt="Fertilizer"
                        style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                    />
                )}
                Fertilizer Options {!isActivelyUsed && '(Planning)'}
            </div>

            <select
                value={selectedFertilizerId || fertilizerOptions[0].fertilizerId}
                onChange={(e) => onSelectFertilizer(farmIndex, e.target.value)}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}
            >
                {fertilizerOptions.map(opt => (
                    <option key={opt.fertilizerId} value={opt.fertilizerId}>
                        {opt.fertilizerName} - {opt.quantityPerMonth.toFixed(0)}/mo
                        ({opt.workerMonthsPerYear.toFixed(0)} worker-months/yr)
                        {opt.isBest ? ' - BEST' : ''}
                    </option>
                ))}
            </select>

            {/* Details of selected fertilizer */}
            {selectedOption && (
                <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '6px',
                    border: '1px solid #333'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '1px solid #333'
                    }}>
                        {(() => {
                            const product = ProductionCalculator.getProduct(selectedOption.fertilizerId);
                            const icon = getProductIcon(product);
                            return icon ? (
                                <img
                                    src={icon}
                                    alt={selectedOption.fertilizerName}
                                    style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                />
                            ) : null;
                        })()}
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#FFD700' }}>
                            {selectedOption.fertilizerName}
                        </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#ddd', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Required per month:</span>
                            <span style={{ fontWeight: '600' }}>{selectedOption.quantityPerMonth.toFixed(1)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Required per year:</span>
                            <span style={{ fontWeight: '600' }}>{selectedOption.quantityPerYear.toFixed(0)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid #333' }}>
                            <span style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {getGeneralIcon('Worker') && (
                                    <img
                                        src={getGeneralIcon('Worker')}
                                        alt="Worker"
                                        style={{ width: '12px', height: '12px' }}
                                    />
                                )}
                                Worker cost/year:
                            </span>
                            <span style={{ fontWeight: '600', color: '#ff8c42' }}>
                                {selectedOption.workerMonthsPerYear.toFixed(1)} worker-months
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Net people fed:</span>
                            <span style={{ fontWeight: '600', color: selectedOption.netPeopleFed > 0 ? '#50C878' : '#ff6b6b' }}>
                                {selectedOption.netPeopleFed.toFixed(0)}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid #333' }}>
                            <span style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {getGeneralIcon('Target') && (
                                    <img
                                        src={getGeneralIcon('Target')}
                                        alt="Target"
                                        style={{ width: '12px', height: '12px' }}
                                    />
                                )}
                                Max fertility:
                            </span>
                            <span style={{ fontWeight: '600', color: '#4a90e2' }}>
                                {selectedOption.maxFertility}% (+{selectedOption.fertilityPerQuantity}%/unit)
                            </span>
                        </div>
                    </div>

                    {selectedOption.isBest && (
                        <div style={{
                            marginTop: '0.75rem',
                            padding: '0.5rem',
                            backgroundColor: 'rgba(80, 200, 120, 0.1)',
                            border: '1px solid #50C878',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            color: '#50C878',
                            fontWeight: '600',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                        }}>
                            {getGeneralIcon('Star') && (
                                <img
                                    src={getGeneralIcon('Star')}
                                    alt="Best"
                                    style={{ width: '12px', height: '12px' }}
                                />
                            )}
                            Most Efficient Option (Best Net People Fed)
                        </div>
                    )}
                </div>
            )}

            <div style={{
                marginTop: '0.75rem',
                fontSize: '0.7rem',
                color: '#666',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '4px'
            }}>
                {getGeneralIcon('Info') && (
                    <img
                        src={getGeneralIcon('Info')}
                        alt="Info"
                        style={{ width: '12px', height: '12px', marginTop: '1px' }}
                    />
                )}
                <span>
                    Worker cost accounts for entire production chain. Net people fed = farm output - workers needed.
                </span>
            </div>
        </div>
    );
};

export default FertilizerSelector;