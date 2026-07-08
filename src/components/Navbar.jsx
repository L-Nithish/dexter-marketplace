import Icons from './Icons';

export default function Navbar({ 
  currentView, 
  navigate, 
  user, 
  wishlist, 
  cart, 
  searchQuery, 
  setSearchQuery 
}) {
  const totalCartQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={{ width: '100%' }}>
      {/* 1. TOP UTILITY BAR */}
      <div className="utility-bar">
        <div className="utility-bar-links">
          <span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Find a Plan</span>
          <span>|</span>
          <span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Help</span>
          <span>|</span>
          <span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Join Us</span>
          <span>|</span>
          <span onClick={() => navigate('profile')} style={{ cursor: 'pointer', fontWeight: 600 }}>
            {user.loggedIn ? `Hi, ${user.name}` : 'Sign In'}
          </span>
        </div>
      </div>

      {/* 2. PRIMARY NAV - Elevated DEXTER Brand */}
      <nav className="primary-nav">
        <div className="primary-nav-logo" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
          D E X T E R<span style={{ color: 'var(--color-accent-pink)' }}>.</span>
        </div>
        
        <div className="primary-nav-links">
          <span 
            className={`primary-nav-link ${currentView.name === 'shop' && !currentView.params.type ? 'active' : ''}`}
            onClick={() => navigate('shop')}
          >
            All Products
          </span>
          <span 
            className={`primary-nav-link ${currentView.name === 'shop' && currentView.params.type === 'Courses' ? 'active' : ''}`}
            onClick={() => navigate('shop', { type: 'Courses' })}
          >
            Courses
          </span>
          <span 
            className={`primary-nav-link ${currentView.name === 'shop' && currentView.params.type === 'Templates' ? 'active' : ''}`}
            onClick={() => navigate('shop', { type: 'Templates' })}
          >
            Templates
          </span>
          <span 
            className={`primary-nav-link ${currentView.name === 'shop' && currentView.params.type === 'Resources' ? 'active' : ''}`}
            onClick={() => navigate('shop', { type: 'Resources' })}
          >
            Resources & Tools
          </span>
          <span 
            className={`primary-nav-link ${currentView.name === 'membership' ? 'active' : ''}`}
            onClick={() => navigate('membership')}
          >
            Apex Membership
          </span>
        </div>

        <div className="primary-nav-right">
          <div className="search-pill-container">
            <span className="search-icon-nav"><Icons.Search /></span>
            <input 
              type="text" 
              className="search-pill" 
              placeholder="Search assets..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView.name !== 'shop') {
                  navigate('shop');
                }
              }}
            />
          </div>

          <button 
            className="nav-icon-btn" 
            onClick={() => navigate('profile')}
            aria-label="Wishlist & Profile"
          >
            <Icons.Heart active={wishlist.length > 0} />
            {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
          </button>

          <button 
            className="nav-icon-btn" 
            onClick={() => navigate('cart')}
            aria-label="Shopping bag"
          >
            <Icons.Bag />
            {totalCartQty > 0 && <span className="nav-badge">{totalCartQty}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}
