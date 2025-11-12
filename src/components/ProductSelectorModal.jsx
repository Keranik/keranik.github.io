import React, { useState, useRef, useEffect } from 'react';
import { getProductIcon, getProductTypeIcon } from '../utils/AssetHelper';

const ProductSelectorModal = ({
    isOpen,
    onClose,
    onSelectProduct,
    products = [],
    currentProductId = null
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen || products.length === 0) return null;

    // Get unique product types from products
    const productTypes = ['all', ...new Set(products.map(p => p.type).filter(Boolean))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || product.type === selectedType;
        return matchesSearch && matchesType;
    });

    const handleSelect = (productId) => {
        onSelectProduct(productId);
        onClose();
    };

    return (
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
                zIndex: 1100,
                padding: '2rem'
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>
                        Select Product
                        <span style={{ fontSize: '1.1rem', color: '#888', fontWeight: '400', marginLeft: '12px' }}>
                            ({filteredProducts.length} available)
                        </span>
                    </h3>
                    <button
                        onClick={onClose}
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

                {/* Product Type Filter */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    padding: '1rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    border: '1px solid #333'
                }}>
                    {productTypes
                        .sort((a, b) => {
                            // Sort: 'all' first, 'Virtual' last, rest alphabetically
                            if (a === 'all') return -1;
                            if (b === 'all') return 1;
                            if (a === 'Virtual') return 1;
                            if (b === 'Virtual') return -1;
                            return a.localeCompare(b);
                        })
                        .map(type => {
                            const isSelected = selectedType === type;
                            const typeIcon = type !== 'all' ? getProductTypeIcon(type) : null;

                            // Capitalize the display name
                            const displayName = type === 'all'
                                ? 'All Types'
                                : type.charAt(0).toUpperCase() + type.slice(1);

                            return (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 16px',
                                        backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.2)' : 'transparent',
                                        color: isSelected ? '#4a90e2' : '#aaa',
                                        border: isSelected ? '2px solid #4a90e2' : '2px solid #444',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
                                            e.currentTarget.style.borderColor = '#4a90e2';
                                            e.currentTarget.style.color = '#4a90e2';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.borderColor = '#444';
                                            e.currentTarget.style.color = '#aaa';
                                        }
                                    }}
                                >
                                    {typeIcon && (
                                        <img
                                            src={typeIcon}
                                            alt={type}
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                objectFit: 'contain',
                                                filter: isSelected ? 'brightness(1.2)' : 'brightness(0.8)'
                                            }}
                                        />
                                    )}
                                    {displayName}
                                </button>
                            );
                        })}
                </div>

                {/* Search Box */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: '#1a1a1a',
                            border: '2px solid #444',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.2s'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#4a90e2';
                            e.target.style.backgroundColor = '#252525';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = searchTerm ? '#4a90e2' : '#444';
                            e.target.style.backgroundColor = '#1a1a1a';
                        }}
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))',
                    gap: '1.5rem',
                    justifyItems: 'stretch'
                }}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => {
                            const isSelected = product.id === currentProductId;
                            const icon = getProductIcon(product);
                            return (
                                <div
                                    key={product.id}
                                    onClick={() => handleSelect(product.id)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: isSelected ? '#2a4a6a' : '#1a1a1a',
                                        border: isSelected ? '2px solid #4a90e2' : '1px solid #444',
                                        borderRadius: '8px',
                                        padding: '8px 6px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        width: '100%',
                                        textAlign: 'center'
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
                                    {icon && (
                                        <img
                                            src={icon}
                                            alt={product.name}
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
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        wordBreak: 'break-word',
                                        lineHeight: '1.2',
                                        display: 'block',
                                        padding: '0 2px'
                                    }}>
                                        {product.name}
                                    </span>
                                    {isSelected && (
                                        <div style={{
                                            marginTop: '4px',
                                            padding: '2px 4px',
                                            backgroundColor: 'rgba(74, 144, 226, 0.2)',
                                            borderRadius: '4px',
                                            fontSize: '0.65rem',
                                            color: '#5aa0f2',
                                            fontWeight: '700',
                                            border: '1px solid rgba(74, 144, 226, 0.3)'
                                        }}>
                                            ✓ SELECTED
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '2rem',
                            color: '#888',
                            fontSize: '1rem'
                        }}>
                            No products match your search. Try a different term.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSelectorModal;