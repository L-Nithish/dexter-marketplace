import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import PdpView from './views/PdpView';
import MembershipView from './views/MembershipView';
import ProfileView from './views/ProfileView';
import CartView from './views/CartView';
import PaymentView from './views/PaymentView';
import { PRODUCTS_DATA, formatINR } from './data/products';

export default function App() {
  // 1. ROUTING STATE
  const [currentView, setCurrentView] = useState({ name: 'home', params: {} });
  
  // 2. USER PROFILE STATE (Persisted membership + unlocked products)
  const [user, setUser] = useState({
    loggedIn: true,
    name: 'Dexter',
    email: 'dexter@dexter.com',
    isMember: false,
    planName: 'Free Account',
    purchasedProducts: ['meta-ads-blueprint']
  });

  // 3. CART & FILTER STATES
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('featured');
  const [wishlist, setWishlist] = useState(['seo-organic-domination']);
  const [cart, setCart] = useState([]);

  // Toast notifications
  const [toast, setToast] = useState(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  // Credit Card Form States
  const [cardName, setCardName] = useState('DEXTER');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [focusedField, setFocusedField] = useState('');

  // Payment Timeline Animation States
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [processingStep, setProcessingStep] = useState(0);
  const [processingMsg, setProcessingMsg] = useState('');

  // Profile forms toggles
  const [loginTab, setLoginTab] = useState('signin');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const triggerToast = (message, type = 'cart') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Route transition handler
  const navigate = (viewName, params = {}) => {
    setCurrentView({ name: viewName, params });
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    if (viewName === 'shop') {
      if (params.type) {
        setSelectedTypes([params.type]);
        setSelectedCategories([]);
      } else if (params.category) {
        setSelectedCategories([params.category]);
        setSelectedTypes([]);
      } else {
        setSelectedTypes([]);
        setSelectedCategories([]);
      }
    }
  };

  // Cart operations
  const addToCart = (product, swatchId) => {
    const swatch = product.swatches.find(s => s.id === swatchId) || product.swatches[0];
    const cartItemId = `${product.id}-${swatch.id}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        cartItemId,
        id: product.id,
        title: product.title,
        price: product.price,
        cover: product.cover,
        swatchLabel: swatch.label,
        quantity: 1
      }];
    });
    
    triggerToast(`Added ${product.title} (${swatch.label}) to Bag.`, 'cart');
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQty = (cartItemId, amount) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const nextQty = item.quantity + amount;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Navigation from cart to payment gateway
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setCardName(user.name.toUpperCase());
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setPaymentStatus('idle');
    navigate('payment');
  };

  // Card input mask helper
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  // Date input mask helper
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  // Secure payment process submission
  const handleCompleteSecurePayment = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');
    setProcessingStep(1);
    setProcessingMsg('Connecting to encrypted gateway (SSL AES-256)...');

    setTimeout(() => {
      setProcessingStep(2);
      setProcessingMsg('Verifying Indian banking credentials & secure token hashes...');
    }, 1200);

    setTimeout(() => {
      setProcessingStep(3);
      setProcessingMsg('Securing transactional file access keys...');
    }, 2400);

    setTimeout(() => {
      setPaymentStatus('success');
      const orderId = `DX-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 899)}`;
      
      const newOrder = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: [...cart],
        subtotal: cartSubtotal,
        billingEmail: user.email
      };

      setLastCompletedOrder(newOrder);

      const purchasedIds = cart.map(item => item.id);
      setUser(prev => ({
        ...prev,
        purchasedProducts: Array.from(new Set([...prev.purchasedProducts, ...purchasedIds]))
      }));

      setCart([]);
      triggerToast("Payment successful! Access unlocked.", "cart");
    }, 3800);
  };

  // Toggle wishlist items
  const toggleWishlist = (productId, event) => {
    if (event) event.stopPropagation();
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    
    setWishlist(prev => {
      if (prev.includes(productId)) {
        triggerToast(`Removed "${product.title}" from Wishlist.`, 'wishlist');
        return prev.filter(id => id !== productId);
      } else {
        triggerToast(`Added "${product.title}" to Wishlist.`, 'wishlist');
        return [...prev, productId];
      }
    });
  };

  // Upgrade Plan status
  const handleUpgradePlan = (planName) => {
    setUser(prev => ({
      ...prev,
      isMember: true,
      planName: planName,
      purchasedProducts: PRODUCTS_DATA.map(p => p.id)
    }));
    triggerToast(`Welcome to ${planName}! All catalog downloads unlocked.`, 'cart');
    navigate('profile');
  };

  const handleResetUser = () => {
    setUser({
      loggedIn: true,
      name: 'Dexter',
      email: 'dexter@dexter.com',
      isMember: false,
      planName: 'Free Account',
      purchasedProducts: ['meta-ads-blueprint']
    });
    triggerToast("User account reset to default.", "wishlist");
  };

  // Filter toggles
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(product => {
      const text = searchQuery.toLowerCase();
      const matchesSearch = product.title.toLowerCase().includes(text) || 
                            product.category.toLowerCase().includes(text) ||
                            product.description.toLowerCase().includes(text);
      
      const matchesCategories = selectedCategories.length === 0 || 
                                selectedCategories.includes(product.category);
      
      const matchesTypes = selectedTypes.length === 0 || 
                           selectedTypes.includes(product.type);

      return matchesSearch && matchesCategories && matchesTypes;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'newest') return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [searchQuery, selectedCategories, selectedTypes, sortOption]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  // Auth submits
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, loggedIn: true }));
    triggerToast("Successfully signed in to your workspace.", "cart");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setUser({
      loggedIn: true,
      name: registerName || 'Dexter',
      email: registerEmail || 'dexter@dexter.com',
      isMember: false,
      planName: 'Starter Free Pass',
      purchasedProducts: []
    });
    triggerToast("Registration successful! Starter profile created.", "cart");
  };

  return (
    <div className="app-root">
      
      <Navbar 
        currentView={currentView}
        navigate={navigate}
        user={user}
        wishlist={wishlist}
        cart={cart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Renders Active View component */}
      {currentView.name === 'home' && (
        <HomeView 
          navigate={navigate}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      )}

      {currentView.name === 'shop' && (
        <ShopView 
          filteredProducts={filteredProducts}
          selectedTypes={selectedTypes}
          handleTypeToggle={handleTypeToggle}
          selectedCategories={selectedCategories}
          handleCategoryToggle={handleCategoryToggle}
          clearAllFilters={clearAllFilters}
          sortOption={sortOption}
          setSortOption={setSortOption}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          navigate={navigate}
          addToCart={addToCart}
          searchQuery={searchQuery}
        />
      )}

      {currentView.name === 'pdp' && currentView.params.product && (
        <PdpView 
          product={currentView.params.product}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          navigate={navigate}
          addToCart={addToCart}
        />
      )}

      {currentView.name === 'membership' && (
        <MembershipView 
          user={user}
          handleUpgradePlan={handleUpgradePlan}
          navigate={navigate}
        />
      )}

      {currentView.name === 'profile' && (
        <ProfileView 
          user={user}
          setUser={setUser}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          navigate={navigate}
          addToCart={addToCart}
          triggerToast={triggerToast}
          handleResetUser={handleResetUser}
          loginTab={loginTab}
          setLoginTab={setLoginTab}
          registerName={registerName}
          setRegisterName={setRegisterName}
          registerEmail={registerEmail}
          setRegisterEmail={setRegisterEmail}
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
          handleSignInSubmit={handleSignInSubmit}
          handleRegisterSubmit={handleRegisterSubmit}
        />
      )}

      {currentView.name === 'cart' && (
        <CartView 
          cart={cart}
          updateCartQty={updateCartQty}
          removeFromCart={removeFromCart}
          cartSubtotal={cartSubtotal}
          handleProceedToPayment={handleProceedToPayment}
          navigate={navigate}
        />
      )}

      {currentView.name === 'payment' && (
        <PaymentView 
          paymentStatus={paymentStatus}
          processingMsg={processingMsg}
          processingStep={processingStep}
          lastCompletedOrder={lastCompletedOrder}
          triggerToast={triggerToast}
          navigate={navigate}
          cart={cart}
          cartSubtotal={cartSubtotal}
          cardName={cardName}
          setCardName={setCardName}
          cardNumber={cardNumber}
          handleCardNumberChange={handleCardNumberChange}
          cardExpiry={cardExpiry}
          handleExpiryChange={handleExpiryChange}
          cardCvv={cardCvv}
          setCardCvv={setCardCvv}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          handleCompleteSecurePayment={handleCompleteSecurePayment}
        />
      )}

      {/* 4. TOAST NOTIFICATIONS */}
      {toast && (
        <div className="toast-notification">
          <span>{toast.message}</span>
          {toast.type === 'cart' && (
            <button className="toast-view-bag-btn" onClick={() => { navigate('cart'); setToast(null); }}>
              Checkout Bag
            </button>
          )}
        </div>
      )}

      <Footer navigate={navigate} />

    </div>
  );
}
