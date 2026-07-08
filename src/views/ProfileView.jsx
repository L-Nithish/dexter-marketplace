import { useState } from 'react';
import Icons from '../components/Icons';
import { PRODUCTS_DATA, formatINR } from '../data/products';

export default function ProfileView({
  user,
  setUser,
  wishlist,
  toggleWishlist,
  navigate,
  addToCart,
  triggerToast,
  handleResetUser,
  loginTab,
  setLoginTab,
  registerName,
  setRegisterName,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  handleSignInSubmit,
  handleRegisterSubmit
}) {
  return (
    <main className="app-container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      
      {!user.loggedIn ? (
        <div className="login-split-container">
          {/* Left Panel */}
          <div className="login-visual-panel">
            <div className="login-visual-overlay"></div>
            <div className="login-visual-content">
              <span className="visual-badge" style={{ letterSpacing: '2px' }}>D E X T E R  L O C K E R</span>
              <h2 className="visual-headline">ELITE MARKETING VAULT</h2>
              <p className="visual-subtext">Sign in to unlock your direct files, custom dashboards, automation kits, and active subscriptions.</p>
              
              <div className="visual-perks-list">
                <div className="visual-perk-item">
                  <span className="perk-icon">⚡</span>
                  <div>
                    <strong>Instant Vault Downloads</strong>
                    <p>Access ZIP, JSON, and PDF blueprints immediately.</p>
                  </div>
                </div>
                <div className="visual-perk-item">
                  <span className="perk-icon">🔒</span>
                  <div>
                    <strong>AES-256 Encryption</strong>
                    <p>Fully secure account authentication protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="login-form-panel">
            <div className="login-tabs-header">
              <button 
                className={`login-tab-btn ${loginTab === 'signin' ? 'active' : ''}`}
                onClick={() => setLoginTab('signin')}
              >
                SIGN IN
              </button>
              <button 
                className={`login-tab-btn ${loginTab === 'register' ? 'active' : ''}`}
                onClick={() => setLoginTab('register')}
              >
                CREATE ACCOUNT
              </button>
            </div>

            {loginTab === 'signin' ? (
              <form onSubmit={handleSignInSubmit}>
                <h3 className="form-title">Welcome Back</h3>
                <p className="form-subtitle">Enter your credentials to access your workspace downloads.</p>

                <div className="form-input-group">
                  <label className="form-input-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input-field" 
                    value={user.email} 
                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} 
                    placeholder="name@company.com"
                    required 
                  />
                </div>

                <div className="form-input-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="form-input-label" style={{ marginBottom: 0 }}>Password</label>
                    <span className="form-link-action" onClick={() => triggerToast('Reset link sent to your email.', 'wishlist')}>Forgot?</span>
                  </div>
                  <input 
                    type="password" 
                    className="form-input-field" 
                    defaultValue="••••••••" 
                    placeholder="••••••••"
                    required 
                  />
                </div>

                <label className="form-checkbox-container" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--color-charcoal)', cursor: 'pointer', margin: '20px 0' }}>
                  <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px', accentColor: 'var(--color-accent-pink)' }} />
                  Keep me signed in for 30 days
                </label>

                <button type="submit" className="btn-primary" style={{ width: '100%', height: '48px' }}>SIGN IN</button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <h3 className="form-title">Create Apex Profile</h3>
                <p className="form-subtitle">Register to unlock free marketing checklists and save wishlists.</p>

                <div className="form-input-group">
                  <label className="form-input-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-input-field" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Dexter"
                    required 
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-input-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input-field" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="name@company.com"
                    required 
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-input-label">Password</label>
                  <input 
                    type="password" 
                    className="form-input-field" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="••••••••"
                    required 
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', height: '48px', marginTop: '24px' }}>CREATE PROFILE</button>
              </form>
            )}

            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-hairline)' }}></div>
                <span style={{ fontSize: '12px', color: 'var(--color-mute)', textTransform: 'uppercase' }}>or continue with</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-hairline)' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <button className="btn-secondary" style={{ height: '44px', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', fontSize: '13px' }} onClick={() => { setUser(prev => ({ ...prev, loggedIn: true })); triggerToast('Signed in via Google.', 'cart'); }}>
                  Google
                </button>
                <button className="btn-secondary" style={{ height: '44px', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', fontSize: '13px' }} onClick={() => { setUser(prev => ({ ...prev, loggedIn: true })); triggerToast('Signed in via Apple ID.', 'cart'); }}>
                  Apple ID
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        // User Dashboard Workspace
        <div>
          <div className="section-header" style={{ borderBottom: '1px solid var(--color-hairline)', paddingBottom: '24px', marginBottom: '32px' }}>
            <div>
              <div className="caption-sm" style={{ color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '1px' }}>DEXTER WORKSPACE</div>
              <h1 className="heading-xl" style={{ fontSize: '36px', marginTop: '4px' }}>Welcome back, {user.name}</h1>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-secondary" style={{ height: '40px', padding: '0 20px' }} onClick={handleResetUser}>
                Reset Account
              </button>
              <button className="btn-primary" style={{ height: '40px', padding: '0 20px' }} onClick={() => setUser(prev => ({ ...prev, loggedIn: false }))}>
                Sign Out
              </button>
            </div>
          </div>

          {/* Status Banner */}
          <div className="member-benefit-card" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <h3 className="heading-lg" style={{ color: '#fff' }}>Plan status: {user.planName}</h3>
              <p className="body-md" style={{ color: 'var(--color-stone)', marginTop: '4px' }}>
                {user.isMember 
                  ? 'You have unlimited access to download every template, sheet, script, and course in the vault.' 
                  : 'Unlock all 16 digital products instantly by joining the Apex Pro Pass.'}
              </p>
            </div>
            {!user.isMember && (
              <button className="btn-outline-on-image" onClick={() => navigate('membership')}>
                Get All-Access Pass
              </button>
            )}
          </div>

          {/* Dashboard Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px' }}>
            
            {/* Left Column: Purchased Downloads */}
            <div>
              <h2 className="heading-lg" style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '8px' }}>
                Your Digital Files ({user.purchasedProducts.length})
              </h2>

              {user.purchasedProducts.length === 0 ? (
                <div style={{ padding: '40px', border: '1px dashed var(--color-hairline)', textAlign: 'center', color: 'var(--color-mute)' }}>
                  <p>You haven't purchased any items yet.</p>
                  <button className="btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('shop')}>Browse Catalog</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {user.purchasedProducts.map(productId => {
                    const product = PRODUCTS_DATA.find(p => p.id === productId);
                    if (!product) return null;

                    return (
                      <div key={product.id} style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid var(--color-hairline)', background: '#fff', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <img src={product.cover} alt={product.title} style={{ width: '60px', height: '60px', objectFit: 'cover', background: 'var(--color-soft-cloud)' }} />
                          <div>
                            <h4 className="body-strong" style={{ fontSize: '15px' }}>{product.title}</h4>
                            <span className="caption-sm" style={{ color: 'var(--color-mute)' }}>{product.category}</span>
                          </div>
                        </div>
                        <button 
                          className="btn-primary" 
                          style={{ height: '36px', padding: '0 16px', fontSize: '13px', display: 'flex', gap: '6px', alignItems: 'center' }}
                          onClick={() => triggerToast(`Downloading ${product.downloadFile}...`, 'cart')}
                        >
                          <Icons.Download />
                          Download File
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Wishlist */}
            <div>
              <h2 className="heading-lg" style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '8px' }}>
                Your Wishlist ({wishlist.length})
              </h2>

              {wishlist.length === 0 ? (
                <div style={{ padding: '40px', border: '1px dashed var(--color-hairline)', textAlign: 'center', color: 'var(--color-mute)' }}>
                  <p>Your wishlist is empty.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {wishlist.map(productId => {
                    const product = PRODUCTS_DATA.find(p => p.id === productId);
                    if (!product) return null;

                    return (
                      <div key={product.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('pdp', { product })}>
                          <img src={product.cover} alt={product.title} style={{ width: '48px', height: '48px', objectFit: 'cover', background: 'var(--color-soft-cloud)' }} />
                          <div>
                            <h4 className="caption-md" style={{ fontSize: '13px', lineHeight: 1.2 }}>{product.title}</h4>
                            <span className="badge-sale-text" style={{ fontSize: '12px' }}>{formatINR(product.price)}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button 
                            className="btn-icon-circular" 
                            style={{ width: '32px', height: '32px' }}
                            onClick={() => addToCart(product, product.swatches[0]?.id)}
                            title="Add to Bag"
                          >
                            <Icons.Bag />
                          </button>
                          <button 
                            className="btn-icon-circular" 
                            style={{ width: '32px', height: '32px' }}
                            onClick={(e) => toggleWishlist(product.id, e)}
                            title="Remove"
                          >
                            <Icons.Close />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </main>
  );
}
