import React, { useState } from 'react';
import './Product.css';

function Product({ catalog, addToCart }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRange, setSelectedRange] = useState([0, Infinity]);

    const priceRanges = [
        { label: 'All Prices', range: [0, Infinity] },
        { label: '10-50', range: [10, 50] },
        { label: '50-100', range: [50, 100] },
        { label: '100-150', range: [100, 150] },
        { label: '150-200', range: [150, 200] }
    ];

    const filteredCatalog = catalog.filter(item => {
        return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            item.price >= selectedRange[0] &&
            item.price <= selectedRange[1]
        );
    });

    return (
        <div className="product-container">
            {/* Search and Filter Row */}
            <div className="filters">
                <input
                    type="text"
                    className="form-control search-bar"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="price-filter">
                    {priceRanges.map((range, index) => (
                        <label key={index} className="form-check-label">
                            <input
                                type="radio"
                                name="price-range"
                                className="form-check-input"
                                value={range.label}
                                checked={selectedRange === range.range}
                                onChange={() => setSelectedRange(range.range)}
                            />
                            {range.label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Catalog Display */}
            <div className="catalog">
                {filteredCatalog.map((item, index) => (
                    <div key={index} className="catalog-item">
                        <div className="catalog-image-container">
                            <img src={item.image} alt={item.name} />
                            <button className="add-to-cart" onClick={() => addToCart(item)}>
                                ADD TO CART
                            </button>
                        </div>
                        <h2>{item.name}</h2>
                        <span>RM {item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;
