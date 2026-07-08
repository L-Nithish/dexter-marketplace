import { useState } from 'react';
import Icons from './Icons';
import { formatINR } from '../data/products';

export default function ProductCard({ 
  product, 
  wishlist, 
  toggleWishlist, 
  navigate, 
  addToCart 
}) {
  const [selectedSwatchId, setSelectedSwatchId] = useState(product.swatches[0]?.id);
  const activeSwatch = product.swatches.find(s => s.id === selectedSwatchId) || product.swatches[0];

  return (
    <article className="product-card" onClick={() => navigate('pdp', { product })}>
      <div className="product-card-image-wrapper">
        <img src={product.cover} alt={product.title} className="product-card-image" />
        <div className="product-card-badges">
          {product.badges.map(b => <span key={b} className="badge-promo">{b}</span>)}
        </div>
        <button 
          className={`product-card-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
          onClick={(e) => toggleWishlist(product.id, e)}
          aria-label="Wishlist"
        >
          <Icons.Heart active={wishlist.includes(product.id)} />
        </button>
      </div>

      <div className="product-card-info">
        
        {product.swatches.length > 1 && (
          <div className="swatches-row" onClick={(e) => e.stopPropagation()} style={{ marginBottom: '8px' }}>
            {product.swatches.map(swatch => (
              <button 
                key={swatch.id}
                className={`swatch-dot ${swatch.color === '#ffffff' ? 'light' : ''} ${selectedSwatchId === swatch.id ? 'active' : ''}`}
                style={{ backgroundColor: swatch.color }}
                onClick={() => setSelectedSwatchId(swatch.id)}
                title={swatch.label}
                aria-label={swatch.label}
              />
            ))}
          </div>
        )}

        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-category">{product.category} · {activeSwatch?.label}</div>
        
        <div className="product-card-price-row">
          {product.discount > 0 ? (
            <>
              <span className="price-sale">{formatINR(product.price)}</span>
              <span className="price-original">{formatINR(product.originalPrice)}</span>
            </>
          ) : (
            <span className="price-regular">{formatINR(product.price)}</span>
          )}
        </div>

        <div className="product-card-rating" style={{ marginTop: '8px', fontSize: '13px' }}>
          <span className="product-card-stars"><Icons.Star /></span>
          <span>{product.rating} ({product.reviewsCount} buyers)</span>
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%', height: '40px', marginTop: '12px', padding: '0' }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, selectedSwatchId);
          }}
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}
