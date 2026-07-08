import Icons from '../components/Icons';
import CreditCardVisualizer from '../components/CreditCardVisualizer';
import { formatINR } from '../data/products';

export default function PaymentView({
  paymentStatus,
  processingMsg,
  processingStep,
  lastCompletedOrder,
  triggerToast,
  navigate,
  cart,
  cartSubtotal,
  cardName,
  setCardName,
  cardNumber,
  handleCardNumberChange,
  cardExpiry,
  handleExpiryChange,
  cardCvv,
  setCardCvv,
  focusedField,
  setFocusedField,
  handleCompleteSecurePayment
}) {
  return (
    <main className="app-container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      
      <div className="checkout-stepper" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '40px', fontSize: '14px', fontWeight: 500 }}>
        <span style={{ color: 'var(--color-stone)' }}>1. BAG</span>
        <span style={{ color: 'var(--color-stone)' }}>—</span>
        <span style={{ color: 'var(--color-accent-pink)', borderBottom: '2px solid var(--color-accent-pink)', paddingBottom: '4px' }}>2. SECURE PAYMENT</span>
        <span style={{ color: 'var(--color-stone)' }}>—</span>
        <span style={{ color: paymentStatus === 'success' ? 'var(--color-success)' : 'var(--color-stone)' }}>3. RECEIPT</span>
      </div>

      {paymentStatus === 'processing' && (
        <div style={{ maxWidth: '550px', margin: '60px auto', textAlign: 'center', padding: '60px 40px', border: '1px solid var(--color-hairline)', background: '#fff' }}>
          <div className="processing-spinner-ring" style={{ width: '56px', height: '56px', border: '4px solid var(--color-soft-cloud)', borderTop: '4px solid var(--color-primary)', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }}></div>
          <h2 className="heading-lg" style={{ marginBottom: '8px', letterSpacing: '-0.5px' }}>SECURING TRANSACTION</h2>
          <p className="body-md" style={{ color: 'var(--color-mute)', minHeight: '24px' }}>{processingMsg}</p>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '32px' }}>
            <div style={{ width: '40px', height: '4px', background: processingStep >= 1 ? 'var(--color-primary)' : 'var(--color-soft-cloud)', transition: 'background 0.3s' }}></div>
            <div style={{ width: '40px', height: '4px', background: processingStep >= 2 ? 'var(--color-primary)' : 'var(--color-soft-cloud)', transition: 'background 0.3s' }}></div>
            <div style={{ width: '40px', height: '4px', background: processingStep >= 3 ? 'var(--color-primary)' : 'var(--color-soft-cloud)', transition: 'background 0.3s' }}></div>
          </div>
        </div>
      )}

      {paymentStatus === 'success' && lastCompletedOrder && (
        <div style={{ maxWidth: '650px', margin: '40px auto', border: '1px solid var(--color-hairline)', background: '#fff', padding: '48px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff' }}>
              <Icons.Check />
            </div>
            <h2 className="heading-xl" style={{ fontSize: '32px', textTransform: 'uppercase' }}>ORDER COMPLETED</h2>
            <p className="caption-md" style={{ color: 'var(--color-success)', fontWeight: 600, marginTop: '4px' }}>TRANSACTION SECURED & DOWNLOADS UNLOCKED</p>
          </div>

          {/* Receipt Box */}
          <div style={{ border: '1px solid var(--color-hairline-soft)', padding: '24px', background: 'var(--color-soft-cloud)', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', fontSize: '14px', marginBottom: '20px', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '16px' }}>
              <div>
                <span style={{ color: 'var(--color-mute)', display: 'block' }}>Receipt Code</span>
                <strong style={{ fontSize: '15px' }}>{lastCompletedOrder.orderId}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-mute)', display: 'block' }}>Transaction Date</span>
                <strong>{lastCompletedOrder.date}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-mute)', display: 'block' }}>Securely Delivered To</span>
                <strong>{lastCompletedOrder.billingEmail}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-mute)', display: 'block' }}>Payment Method</span>
                <strong>Credit Card (Ending 4444)</strong>
              </div>
            </div>

            <h4 className="body-strong" style={{ fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px' }}>Itemized Purchased Assets</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {lastCompletedOrder.items.map(item => (
                <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--color-charcoal)' }}>{item.title} ({item.swatchLabel}) <span style={{ color: 'var(--color-mute)' }}>x{item.quantity}</span></span>
                  <strong>{formatINR(item.price * item.quantity)}</strong>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-hairline)', paddingTop: '12px', marginTop: '8px', fontWeight: 600, fontSize: '16px' }}>
                <span>Total Billed</span>
                <span>{formatINR(lastCompletedOrder.subtotal)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <button 
              className="btn-secondary" 
              style={{ width: '100%' }}
              onClick={() => triggerToast(`Receipt downloaded successfully as ${lastCompletedOrder.orderId}.pdf`, 'wishlist')}
            >
              Download Invoice PDF
            </button>
            <button 
              className="btn-primary" 
              style={{ width: '100%' }}
              onClick={() => navigate('profile')}
            >
              Access Digital Files
            </button>
          </div>

        </div>
      )}

      {paymentStatus === 'idle' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px' }}>
          
          {/* Left Column: Form */}
          <div style={{ border: '1px solid var(--color-hairline)', padding: '40px', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Icons.Shield />
              <h2 className="heading-lg" style={{ fontSize: '22px' }}>SECURE GATEWAY ENCRYPTED</h2>
            </div>
            <p style={{ color: 'var(--color-mute)', fontSize: '14px', marginBottom: '32px' }}>
              Your checkout credentials are encrypted using industry-standard SSL AES-256 secure protocols.
            </p>

            <form onSubmit={handleCompleteSecurePayment}>
              <div style={{ marginBottom: '20px' }}>
                <label className="body-strong" style={{ display: 'block', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase' }}>Cardholder Name</label>
                <input 
                  type="text" 
                  value={cardName} 
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  placeholder="DEXTER"
                  style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid var(--color-hairline)', outline: 'none', fontFamily: 'inherit' }} 
                  required 
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="body-strong" style={{ display: 'block', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase' }}>Card Number</label>
                <input 
                  type="text" 
                  value={cardNumber} 
                  onChange={handleCardNumberChange}
                  onFocus={() => setFocusedField('number')}
                  onBlur={() => setFocusedField('')}
                  placeholder="4111 2222 3333 4444"
                  style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid var(--color-hairline)', outline: 'none', fontFamily: 'inherit' }} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                <div>
                  <label className="body-strong" style={{ display: 'block', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase' }}>Expiration Date</label>
                  <input 
                    type="text" 
                    value={cardExpiry} 
                    onChange={handleExpiryChange}
                    onFocus={() => setFocusedField('expiry')}
                    onBlur={() => setFocusedField('')}
                    placeholder="MM/YY"
                    style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid var(--color-hairline)', outline: 'none', fontFamily: 'inherit' }} 
                    required 
                  />
                </div>

                <div>
                  <label className="body-strong" style={{ display: 'block', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase' }}>CVV Code</label>
                  <input 
                    type="password" 
                    value={cardCvv} 
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 3);
                      setCardCvv(val);
                    }}
                    onFocus={() => setFocusedField('cvv')}
                    onBlur={() => setFocusedField('')}
                    placeholder="•••"
                    style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid var(--color-hairline)', outline: 'none', fontFamily: 'inherit' }} 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', height: '52px', textTransform: 'uppercase', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <Icons.Lock />
                AUTHORIZE ORDER & PAY
              </button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px', opacity: 0.6 }}>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>🔒 PCI-DSS COMPLIANT</span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>🛡️ SSL ENCRYPTED</span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>✓ VERIFIED BY VISA</span>
            </div>
          </div>

          {/* Right Column: Visual card & Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <CreditCardVisualizer 
              cardNumber={cardNumber}
              cardName={cardName}
              cardExpiry={cardExpiry}
              cardCvv={cardCvv}
              focusedField={focusedField}
            />

            <div style={{ border: '1px solid var(--color-hairline)', padding: '24px', background: '#fff' }}>
              <h3 className="heading-md" style={{ marginBottom: '16px', borderBottom: '1px solid var(--color-hairline-soft)', paddingBottom: '8px' }}>Your Selected Assets</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cart.map(item => (
                  <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--color-charcoal)' }}>{item.title} <span style={{ color: 'var(--color-mute)' }}>x{item.quantity}</span></span>
                    <strong>{formatINR(item.price * item.quantity)}</strong>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-hairline)', paddingTop: '12px', marginTop: '4px', fontWeight: 600, fontSize: '16px' }}>
                  <span>Total Due</span>
                  <span>{formatINR(cartSubtotal)}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </main>
  );
}
