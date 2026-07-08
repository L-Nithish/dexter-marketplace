import Icons from '../components/Icons';
import { PRODUCTS_DATA, formatINR } from '../data/products';

export default function HomeView({ navigate, wishlist, toggleWishlist }) {
  const scrollRail = (id, direction) => {
    const el = document.getElementById(id);
    if (el) {
      const amt = direction === 'left' ? -320 : 320;
      el.scrollBy({ left: amt, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-view-wrapper">
      {/* Campaign Hero Banner */}
      <header className="hero-section" style={{ backgroundImage: `url('/hero_marketing_workspace.png')` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-tag" style={{ letterSpacing: '4px' }}>D E X T E R  S Y S T E M S</div>
          <h1 className="hero-title" style={{ letterSpacing: '-2px' }}>
            BUILD.<br />
            SCALE.<br />
            DOMINATE.
          </h1>
          <p className="hero-description">
            The premium marketplace for high-performance marketing courses, automated lead generators, and copy-paste funnel blueprints. Custom systems built to scale.
          </p>
          <div className="hero-actions">
            <button className="btn-outline-on-image" onClick={() => navigate('shop')}>
              Shop Catalog
            </button>
            <button className="btn-outline-on-image" onClick={() => navigate('membership')} style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff' }}>
              Join Membership
            </button>
          </div>
        </div>
      </header>

      <main className="app-container">
        {/* Shop by Category Rail */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">Shop by Track</h2>
            <div className="section-nav-buttons">
              <button className="btn-icon-circular" onClick={() => scrollRail('home-cat-rail', 'left')} aria-label="Scroll left">
                <Icons.ChevronLeft />
              </button>
              <button className="btn-icon-circular" onClick={() => scrollRail('home-cat-rail', 'right')} aria-label="Scroll right">
                <Icons.ChevronRight />
              </button>
            </div>
          </div>

          <div className="horizontal-scroll-container" id="home-cat-rail">
            <div className="category-card" onClick={() => navigate('shop', { category: 'Meta Ads' })}>
              <img src="/meta_ads_mockup.png" alt="Meta Ads Cover" className="category-card-img" />
              <div className="category-card-overlay"></div>
              <button className="btn-outline-on-image category-card-btn">Meta Ads</button>
            </div>
            <div className="category-card" onClick={() => navigate('shop', { category: 'AI Marketing' })}>
              <img src="/ai_automation_mockup.png" alt="AI Marketing" className="category-card-img" />
              <div className="category-card-overlay"></div>
              <button className="btn-outline-on-image category-card-btn">AI Automation</button>
            </div>
            <div className="category-card" onClick={() => navigate('shop', { category: 'SEO' })}>
              <img src="/seo_dashboard.png" alt="SEO Masterclasses" className="category-card-img" />
              <div className="category-card-overlay"></div>
              <button className="btn-outline-on-image category-card-btn">SEO Dominator</button>
            </div>
            <div className="category-card" onClick={() => navigate('shop', { category: 'Canva Templates' })}>
              <img src="/canva_templates.png" alt="Canva Premium Templates" className="category-card-img" />
              <div className="category-card-overlay"></div>
              <button className="btn-outline-on-image category-card-btn">Canva Designs</button>
            </div>
            <div className="category-card" onClick={() => navigate('shop', { category: 'Sales Funnels' })}>
              <img src="/sales_funnel_mockup.png" alt="Funnel Kits" className="category-card-img" />
              <div className="category-card-overlay"></div>
              <button className="btn-outline-on-image category-card-btn">Sales Funnels</button>
            </div>
          </div>
        </section>

        {/* Trending Releases */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">Trending Products</h2>
            <button className="link-md" onClick={() => navigate('shop')}>View All</button>
          </div>

          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {PRODUCTS_DATA.slice(0, 4).map(product => (
              <article key={product.id} className="product-card" onClick={() => navigate('pdp', { product })}>
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
                  <h3 className="product-card-title">{product.title}</h3>
                  <div className="product-card-category">{product.category}</div>
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
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Middle Campaign Hero Section */}
        <section className="section-container">
          <div 
            className="hero-section" 
            style={{ 
              backgroundImage: `url('/ai_automation_mockup.png')`, 
              height: '450px',
              borderRadius: '0px'
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="hero-tag" style={{ letterSpacing: '4px' }}>D E X T E R  S Y S T E M S</div>
              <h2 className="hero-title" style={{ fontSize: '64px' }}>AUTOMATION ENGINE</h2>
              <p className="hero-description" style={{ fontSize: '18px' }}>
                Connect and qualify inbound pipelines automatically using pre-coded JSON profiles and Make.com maps.
              </p>
              <button className="btn-outline-on-image" onClick={() => navigate('shop', { type: 'Automation' })}>
                Browse Tools
              </button>
            </div>
          </div>
        </section>

        {/* Hot Releases */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">New Releases</h2>
            <button className="link-md" onClick={() => navigate('shop')}>View All</button>
          </div>

          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {PRODUCTS_DATA.slice(4, 8).map(product => (
              <article key={product.id} className="product-card" onClick={() => navigate('pdp', { product })}>
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
                  <h3 className="product-card-title">{product.title}</h3>
                  <div className="product-card-category">{product.category}</div>
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
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Membership Vault Banner */}
        <section className="section-container" style={{ marginTop: '60px' }}>
          <div className="membership-grid">
            <div className="member-benefit-card" style={{ gridColumn: 'span 3', padding: '60px' }}>
              <div style={{ maxWidth: '600px' }}>
                <div className="member-benefit-icon" style={{ fontSize: '40px' }}>⚡</div>
                <h3 className="display-campaign" style={{ fontSize: '64px', margin: '24px 0', color: 'var(--color-on-primary)', letterSpacing: '2px' }}>
                  D E X T E R  V A U L T
                </h3>
                <p className="body-md" style={{ color: 'var(--color-stone)', marginBottom: '32px' }}>
                  Skip checkout sheets and cart processing. Get instant downloads for all 16+ courses, templates, contract suites, and automation profiles in the vault.
                </p>
                <button className="btn-outline-on-image" onClick={() => navigate('membership')}>
                  Unlock Membership Plans
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
