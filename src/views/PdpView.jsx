import { useState, useEffect } from 'react';
import Icons from '../components/Icons';
import { PRODUCTS_DATA, formatINR } from '../data/products';

export default function PdpView({ product, wishlist, toggleWishlist, navigate, addToCart }) {
  const [pdpMainImage, setPdpMainImage] = useState(product.cover);
  const [selectedSwatch, setSelectedSwatch] = useState(product.swatches[0]);
  const [openAccordion, setOpenAccordion] = useState('details');

  useEffect(() => {
    if (product) {
      setPdpMainImage(product.cover);
      setSelectedSwatch(product.swatches[0]);
    }
  }, [product]);

  const relatedProducts = PRODUCTS_DATA.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <main className="app-container" style={{ paddingTop: '32px' }}>
      <button className="link-md" onClick={() => navigate('shop')} style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        ← Back to Marketplace Shop
      </button>

      <div className="modal-content" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', position: 'static', boxShadow: 'none', padding: '0px' }}>
        
        {/* Left Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-thumbnails">
            {product.thumbnails.map((img, idx) => (
              <div 
                key={idx} 
                className={`pdp-thumbnail ${pdpMainImage === img ? 'active' : ''}`}
                onClick={() => setPdpMainImage(img)}
              >
                <img src={img} alt={`Thumbnail ${idx}`} />
              </div>
            ))}
          </div>
          <div className="pdp-main-image-container">
            <img src={pdpMainImage} alt={product.title} className="pdp-main-image" />
          </div>
        </div>

        {/* Right Sidebar Details */}
        <div className="pdp-details">
          <div>
            <div className="pdp-promo-badge" style={{ letterSpacing: '1px' }}>DEXTER SYSTEMS SECURED</div>
            <h1 className="heading-xl" style={{ marginTop: '8px', fontSize: '36px' }}>{product.title}</h1>
            <p className="pdp-category" style={{ marginTop: '8px' }}>Category: <strong>{product.category}</strong> · Class: <strong>{product.type}</strong></p>
          </div>

          <div className="pdp-rating-row" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="product-card-stars"><Icons.Star /></span>
            <span><strong>{product.rating}</strong> ({product.reviewsCount} verified user ratings)</span>
          </div>

          {product.discount > 0 ? (
            <div className="product-card-price-row" style={{ fontSize: '20px' }}>
              <span className="price-sale" style={{ fontSize: '28px' }}>{formatINR(product.price)}</span>
              <span className="price-original" style={{ fontSize: '20px' }}>{formatINR(product.originalPrice)}</span>
              <span className="price-discount" style={{ color: 'var(--color-sale)', fontWeight: 600 }}>({product.discount}% off sale)</span>
            </div>
          ) : (
            <div className="pdp-price" style={{ fontSize: '28px', fontWeight: 600 }}>{formatINR(product.price)}</div>
          )}

          {/* Swatches Picker */}
          <div>
            <div className="pdp-selection-title" style={{ fontWeight: 600, marginBottom: '8px' }}>Select Format Option:</div>
            <div className="swatches-row pdp-swatches">
              {product.swatches.map(swatch => (
                <button
                  key={swatch.id}
                  className={`swatch-dot ${swatch.color === '#ffffff' ? 'light' : ''} ${selectedSwatch?.id === swatch.id ? 'active' : ''}`}
                  style={{ backgroundColor: swatch.color, width: '18px', height: '18px' }}
                  onClick={() => setSelectedSwatch(swatch)}
                  title={swatch.label}
                  aria-label={swatch.label}
                />
              ))}
            </div>
            <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--color-charcoal)' }}>
              Active selection: <strong>{selectedSwatch?.label}</strong>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="pdp-actions" style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <button 
              className="btn-primary" 
              style={{ flex: 1 }}
              onClick={() => addToCart(product, selectedSwatch?.id)}
            >
              Add to Bag
            </button>
            <button 
              className="btn-secondary" 
              style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}
              onClick={(e) => toggleWishlist(product.id, e)}
            >
              <Icons.Heart active={wishlist.includes(product.id)} />
              {wishlist.includes(product.id) ? 'Saved' : 'Favorite'}
            </button>
          </div>

          {/* Disclosure Accordions */}
          <div style={{ marginTop: '32px', borderTop: '1px solid var(--color-hairline)' }}>
            
            <div className={`pdp-disclosure-row ${openAccordion === 'details' ? 'open' : ''}`}>
              <div className="pdp-disclosure-header" onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}>
                <span>Asset & Curriculum Overview</span>
                <span className="pdp-disclosure-icon"><Icons.ChevronDown /></span>
              </div>
              <div className="pdp-disclosure-content">
                <p style={{ marginBottom: '12px' }}>{product.description}</p>
                <p><strong>Worksheets & Files included:</strong> {product.details}</p>
              </div>
            </div>

            <div className={`pdp-disclosure-row ${openAccordion === 'licensing' ? 'open' : ''}`}>
              <div className="pdp-disclosure-header" onClick={() => setOpenAccordion(openAccordion === 'licensing' ? '' : 'licensing')}>
                <span>Licensing Terms</span>
                <span className="pdp-disclosure-icon"><Icons.ChevronDown /></span>
              </div>
              <div className="pdp-disclosure-content">
                <p>{product.licensing}</p>
              </div>
            </div>

            <div className={`pdp-disclosure-row ${openAccordion === 'delivery' ? 'open' : ''}`}>
              <div className="pdp-disclosure-header" onClick={() => setOpenAccordion(openAccordion === 'delivery' ? '' : 'delivery')}>
                <span>Delivery & Help desk</span>
                <span className="pdp-disclosure-icon"><Icons.ChevronDown /></span>
              </div>
              <div className="pdp-disclosure-content">
                <p>Instant file download links are sent to your profile and billing email within 10 seconds of secured checkout. Access is permanent and includes lifetime upgrades.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Related items row */}
      {relatedProducts.length > 0 && (
        <section className="section-container" style={{ marginTop: '80px' }}>
          <div className="section-header">
            <h2 className="section-title">You May Also Like</h2>
          </div>
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {relatedProducts.map(rel => (
              <article key={rel.id} className="product-card" onClick={() => navigate('pdp', { product: rel })}>
                <div className="product-card-image-wrapper">
                  <img src={rel.cover} alt={rel.title} className="product-card-image" />
                </div>
                <div className="product-card-info">
                  <h3 className="product-card-title">{rel.title}</h3>
                  <div className="product-card-price-row">
                    <span className="price-regular">{formatINR(rel.price)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
