export default function CreditCardVisualizer({ 
  cardNumber, 
  cardName, 
  cardExpiry, 
  cardCvv, 
  focusedField 
}) {
  return (
    <div className="payment-card-visual-wrapper">
      <div className={`visual-credit-card ${focusedField === 'cvv' ? 'flipped' : ''}`}>
        
        {/* Card Front */}
        <div className="visual-card-front">
          <div className="visual-card-header">
            <span className="visual-card-logo" style={{ letterSpacing: '2px' }}>D E X T E R</span>
            <div className="visual-card-chip"></div>
          </div>
          
          <div className={`visual-card-number ${focusedField === 'number' ? 'focused' : ''}`}>
            {cardNumber || '•••• •••• •••• ••••'}
          </div>

          <div className="visual-card-footer">
            <div className={`visual-card-holder-info ${focusedField === 'name' ? 'focused' : ''}`}>
              <span className="visual-card-label">CARDHOLDER</span>
              <span className="visual-card-value">{cardName || 'DEXTER'}</span>
            </div>
            <div className={`visual-card-expiry-info ${focusedField === 'expiry' ? 'focused' : ''}`}>
              <span className="visual-card-label">EXPIRES</span>
              <span className="visual-card-value">{cardExpiry || 'MM/YY'}</span>
            </div>
          </div>
        </div>

        {/* Card Back */}
        <div className="visual-card-back">
          <div className="visual-card-magnetic-strip"></div>
          <div className="visual-card-signature-strip">
            <div className="visual-card-signature-text">{cardName || 'DEXTER'}</div>
            <div className="visual-card-cvv-value">{cardCvv || '•••'}</div>
          </div>
          <div className="visual-card-back-footer">
            <span>SECURITY CODE AUTHENTICATED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
