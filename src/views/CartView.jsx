import Icons from '../components/Icons';
import { formatINR } from '../data/products';

export default function CartView({
  cart,
  updateCartQty,
  removeFromCart,
  cartSubtotal,
  handleProceedToPayment,
  navigate
}) {
  const totalCartQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="app-container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      
      <h1 className="heading-xl" style={{ fontSize: '32px', marginBottom: '24px' }}>Checkout Bag</h1>

      {cart.length === 0 ? (
        <div style={{ padding: '80px 0', border: '1px dashed var(--color-hairline)', textAlign: 'center', color: 'var(--color-mute)' }}>
          <p className="heading-lg">Your Checkout Bag is empty.</p>
          <button className="btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('shop')}>Shop Digital Assets</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px' }}>
          
          {/* Left Column: Items */}
          <div>
            <h3 className="body-strong" style={{ fontSize: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--color-hairline)', marginBottom: '20px' }}>
              Selected Items ({totalCartQty})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map(item => (
                <div key={item.cartItemId} style={{ display: 'flex', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--color-hairline-soft)' }}>
                  <img src={item.cover} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', background: 'var(--color-soft-cloud)' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h4 className="body-strong" style={{ fontSize: '16px' }}>{item.title}</h4>
                        <span className="caption-sm" style={{ color: 'var(--color-mute)' }}>Format: {item.swatchLabel}</span>
                      </div>
                      <span className="body-strong">{formatINR(item.price * item.quantity)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="cart-item-qty-row" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button className="btn-icon-circular" style={{ width: '28px', height: '28px' }} onClick={() => updateCartQty(item.cartItemId, -1)}>-</button>
                        <span className="body-strong">{item.quantity}</span>
                        <button className="btn-icon-circular" style={{ width: '28px', height: '28px' }} onClick={() => updateCartQty(item.cartItemId, 1)}>+</button>
                      </div>
                      <button className="link-md" style={{ fontSize: '13px', color: 'var(--color-mute)', border: 'none', background: 'none' }} onClick={() => removeFromCart(item.cartItemId)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Summary */}
          <div style={{ border: '1px solid var(--color-hairline)', padding: '32px', background: '#fff', alignSelf: 'start' }}>
            <h3 className="heading-lg" style={{ marginBottom: '20px', fontSize: '20px' }}>Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--color-hairline)', marginBottom: '20px', fontSize: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-mute)' }}>Subtotal</span>
                <span>{formatINR(cartSubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-mute)' }}>Handling Fee</span>
                <span>₹0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '18px', color: 'var(--color-ink)', paddingTop: '8px' }}>
                <span>Total Order</span>
                <span>{formatINR(cartSubtotal)}</span>
              </div>
            </div>

            <button onClick={handleProceedToPayment} className="btn-primary" style={{ width: '100%', textTransform: 'uppercase', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <Icons.Lock />
              PROCEED TO SECURE PAYMENT
            </button>
          </div>

        </div>
      )}

    </main>
  );
}
