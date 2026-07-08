import { useState } from 'react';
import Icons from '../components/Icons';

export default function MembershipView({ user, handleUpgradePlan, navigate }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <main className="app-container" style={{ paddingTop: '32px' }}>
      
      <div className="member-benefit-card" style={{ padding: '60px', textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ fontSize: '32px' }}>✦</span>
        <h1 className="display-campaign" style={{ margin: '16px 0', fontSize: '72px', color: 'var(--color-on-primary)', letterSpacing: '4px' }}>
          D E X T E R  A P E X
        </h1>
        <p className="body-md" style={{ color: 'var(--color-stone)', maxWidth: '600px', margin: '0 auto 32px' }}>
          Gain unlimited downloads for all premium courses, funnel wireframes, copywriting manuals, and technical automation workflows in our master vault.
        </p>
        {user.isMember ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: 'var(--color-success)', color: '#fff', borderRadius: '30px' }}>
            <Icons.Check />
            <span className="body-strong">You are an active {user.planName} Member</span>
          </div>
        ) : (
          <button className="btn-outline-on-image" onClick={() => handleUpgradePlan('Apex Pro Pass')}>
            Activate Apex Membership
          </button>
        )}
      </div>

      {/* Pricing Grid */}
      <section className="section-container">
        <div className="section-header" style={{ justifyContent: 'center' }}>
          <h2 className="section-title">Choose Your Access Level</h2>
        </div>

        <div className="membership-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          
          {/* Free Tier */}
          <div className="member-benefit-card" style={{ backgroundColor: 'var(--color-soft-cloud)', color: 'var(--color-ink)', border: '1px solid var(--color-hairline)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px', height: '420px' }}>
            <div>
              <h3 className="heading-lg">Starter Pass</h3>
              <div style={{ fontSize: '48px', fontWeight: 600, margin: '24px 0' }}>₹0<span style={{ fontSize: '16px', color: 'var(--color-mute)', fontWeight: 400 }}> / lifetime</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--color-charcoal)' }}>
                <li>✓ Access to free templates</li>
                <li>✓ Access to account workspace</li>
                <li>✗ No course access</li>
                <li>✗ No premium automations</li>
              </ul>
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate('profile')}>
              Current Account status
            </button>
          </div>

          {/* Pro Member */}
          <div className="member-benefit-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px', height: '420px', border: '2px solid var(--color-accent-pink)' }}>
            <div>
              <div className="badge-promo" style={{ color: 'var(--color-accent-pink)', borderColor: 'var(--color-accent-pink)', marginBottom: '12px', alignSelf: 'flex-start' }}>BEST VALUE</div>
              <h3 className="heading-lg" style={{ color: 'var(--color-on-primary)' }}>Apex Pro Pass</h3>
              <div style={{ fontSize: '48px', fontWeight: 600, margin: '24px 0', color: '#fff' }}>₹2,499<span style={{ fontSize: '16px', color: 'var(--color-stone)', fontWeight: 400 }}> / month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--color-stone)' }}>
                <li>✓ <strong>Unlimited Downloads</strong> for all courses</li>
                <li>✓ Canva & Figma UI frameworks</li>
                <li>✓ Complete Make.com automation blueprints</li>
                <li>✓ Member-only support Discord access</li>
              </ul>
            </div>
            <button className="btn-outline-on-image" style={{ width: '100%' }} onClick={() => handleUpgradePlan('Apex Pro Member')}>
              {user.planName === 'Apex Pro Member' ? 'Active Plan' : 'Select Pro Pass'}
            </button>
          </div>

          {/* Agency Pass */}
          <div className="member-benefit-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px', height: '420px' }}>
            <div>
              <h3 className="heading-lg" style={{ color: 'var(--color-on-primary)' }}>Agency All-Access</h3>
              <div style={{ fontSize: '48px', fontWeight: 600, margin: '24px 0', color: '#fff' }}>₹6,499<span style={{ fontSize: '16px', color: 'var(--color-stone)', fontWeight: 400 }}> / month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--color-stone)' }}>
                <li>✓ <strong>Everything in Pro Pass</strong></li>
                <li>✓ Multi-seat team license (up to 10 users)</li>
                <li>✓ Vetted legal agency agreement vault</li>
                <li>✓ Monthly 1-on-1 strategy audit calls</li>
              </ul>
            </div>
            <button className="btn-outline-on-image" style={{ width: '100%' }} onClick={() => handleUpgradePlan('Apex Agency All-Access')}>
              {user.planName === 'Apex Agency All-Access' ? 'Active Plan' : 'Select Agency Pass'}
            </button>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="section-container" style={{ marginTop: '80px' }}>
        <div className="section-header" style={{ justifyContent: 'center' }}>
          <h2 className="section-title">Membership FAQs</h2>
        </div>
        <div className="faq-container">
          
          <div className={`faq-row ${openFaqIndex === 0 ? 'open' : ''}`}>
            <div className="faq-row-header" onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}>
              <span className="faq-row-title">Does the Pro Pass unlock courses instantly?</span>
              <span className="faq-row-icon"><Icons.ChevronDown /></span>
            </div>
            <div className="faq-row-content">
              <p>Yes. The moment you activate your Pro Pass, every product in the catalog is unlocked. You will see instant download buttons on the product detail pages and in your account profile view.</p>
            </div>
          </div>

          <div className={`faq-row ${openFaqIndex === 1 ? 'open' : ''}`}>
            <div className="faq-row-header" onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}>
              <span className="faq-row-title">Can I cancel my membership at any time?</span>
              <span className="faq-row-icon"><Icons.ChevronDown /></span>
            </div>
            <div className="faq-row-content">
              <p>Absolutely. You can cancel your subscription inside your account profile settings with one click. You will retain downloads access until your active billing period finishes.</p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
