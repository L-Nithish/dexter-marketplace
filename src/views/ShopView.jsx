import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { categories, productTypes } from '../data/products';

export default function ShopView({
  filteredProducts,
  selectedTypes,
  handleTypeToggle,
  selectedCategories,
  handleCategoryToggle,
  clearAllFilters,
  sortOption,
  setSortOption,
  wishlist,
  toggleWishlist,
  navigate,
  addToCart,
  searchQuery
}) {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <main className="app-container" style={{ paddingTop: '24px' }}>
      
      <section className="sub-nav-strip" style={{ padding: '0px', marginBottom: '24px' }}>
        <div className="sub-nav-breadcrumbs">
          Shop / <span>{selectedTypes.length > 0 ? selectedTypes.join(', ') : 'All Products'}</span>
          {filteredProducts.length > 0 && ` (${filteredProducts.length} assets)`}
        </div>
        
        <div className="sub-nav-controls">
          <button className="sub-nav-control-btn" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showFilters ? 'none' : 'rotate(180deg)' }}>
              <polyline points="4 9 12 17 20 9"></polyline>
            </svg>
          </button>

          <div className="sub-nav-control-btn">
            <span>Sort:</span>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontWeight: 600, fontSize: '16px', outline: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <option value="featured">Best Seller</option>
              <option value="newest">Popularity</option>
              <option value="price-low">Price: Low-High</option>
              <option value="price-high">Price: High-Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </section>

      <div className={`plp-layout ${showFilters ? '' : 'filters-hidden'}`}>
        
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-group">
            <div className="filter-group-header">
              <span>Resource Type</span>
            </div>
            <div className="filter-group-content">
              {productTypes.map(type => (
                <label key={type} className="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="filter-checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-group-header">
              <span>Categories</span>
            </div>
            <div className="filter-group-content">
              {categories.map(cat => (
                <label key={cat} className="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="filter-checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {(selectedCategories.length > 0 || selectedTypes.length > 0 || searchQuery) && (
            <button 
              className="btn-secondary" 
              style={{ width: '100%', height: '40px', marginTop: '24px', padding: '0px' }}
              onClick={clearAllFilters}
            >
              Reset Filters
            </button>
          )}
        </aside>

        {/* Products Grid */}
        <div className="plp-grid-container">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--color-hairline)', color: 'var(--color-mute)' }}>
              <p className="heading-lg" style={{ marginBottom: '16px' }}>No marketing assets match your criteria.</p>
              <button className="btn-primary" onClick={clearAllFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  navigate={navigate}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
