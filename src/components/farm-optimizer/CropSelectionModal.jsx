// src/components/farm-optimizer/CropSelectionModal.jsx
import { useState } from 'react';
import { getCropIcon } from '../../utils/AssetHelper';

const CropSelectionModal = ({ isOpen, crops, onSelect, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filteredCrops = crops.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                padding: '1.5rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                border: '2px solid #444'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                        Select Crop
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#ff6b6b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        ✕
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search crops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        border: '2px solid #555',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                    }}
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '0.75rem'
                }}>
                    <button
                        onClick={() => onSelect(null)}
                        style={{
                            padding: '0.75rem',
                            backgroundColor: '#1a1a1a',
                            border: '2px dashed #555',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#252525';
                            e.currentTarget.style.borderColor = '#666';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                            e.currentTarget.style.borderColor = '#555';
                        }}
                    >
                        <div style={{ fontSize: '1.5rem' }}>🚫</div>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            color: '#888'
                        }}>
                            Empty
                        </div>
                    </button>

                    {filteredCrops.map(crop => {
                        const icon = getCropIcon(crop);

                        return (
                            <button
                                key={crop.id}
                                onClick={() => onSelect(crop.id)}
                                style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#1a1a1a',
                                    border: '2px solid #444',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    transition: 'all 0.15s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#2a4a6a';
                                    e.currentTarget.style.borderColor = '#4a90e2';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                                    e.currentTarget.style.borderColor = '#444';
                                }}
                            >
                                {icon && (
                                    <img
                                        src={icon}
                                        alt={crop.name}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                                <div style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>
                                    {crop.name}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#888' }}>
                                    {crop.growthDays / 30}mo
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CropSelectionModal;