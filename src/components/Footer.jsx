export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="app-container">
        
        <div className="footer-columns">
          <div>
            <h4 className="footer-col-header">Dexter Catalog</h4>
            <ul className="footer-link-list">
              <li><span onClick={() => navigate('shop', { type: 'Courses' })} style={{ cursor: 'pointer' }}>All Courses</span></li>
              <li><span onClick={() => navigate('shop', { type: 'Templates' })} style={{ cursor: 'pointer' }}>Design Templates</span></li>
              <li><span onClick={() => navigate('shop', { type: 'Resources' })} style={{ cursor: 'pointer' }}>Agency Assets</span></li>
              <li><span onClick={() => navigate('shop', { type: 'Automation' })} style={{ cursor: 'pointer' }}>AI automation</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Unlimited Access Pass</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-header">Support Desk</h4>
            <ul className="footer-link-list">
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Downloads delivery</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Licensing terms</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Refund guarantees</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Community Slack channels</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Submit technical ticket</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-header">Dexter Workspace</h4>
            <ul className="footer-link-list">
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Brand mission</span></li>
              <li><span onClick={() => navigate('profile')} style={{ cursor: 'pointer' }}>Customer dashboard</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Partner program</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Terms of sale</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Privacy Policy</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-header">Expert System</h4>
            <ul className="footer-link-list">
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Apex Membership</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Affiliate networks</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Partner developers</span></li>
              <li><span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Weekly releases schedule</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-divider"></div>

        <div className="footer-fine-print-row">
          <div className="footer-fine-print-left">
            <span className="footer-locale">
              🌐 India (English)
            </span>
            <span>© 2026 D E X T E R  S Y S T E M S  I N C. All Rights Reserved</span>
          </div>
          <div className="footer-fine-print-links">
            <span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Guides</span>
            <span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Terms of Sale</span>
            <span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Terms of Use</span>
            <span onClick={() => navigate('membership')} style={{ cursor: 'pointer' }}>Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
