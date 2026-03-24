export default function Privacy() {
  return (
    <main className="min-h-screen pb-16 md:pb-24">
      <div className="nav-spacer" />
      <div className="page-container" style={{ maxWidth: '800px' }}>
        <h1 className="font-display font-light text-charcoal" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '2rem' }}>
          Privacy Policy
        </h1>
        <p className="font-body text-muted" style={{ fontSize: '13px', marginBottom: '2.5rem' }}>
          Last updated: March 17, 2026
        </p>

        <div className="legal-content">
          <h2>Overview</h2>
          <p>
            Drae Haye Photography ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website at draehaye.netlify.app (the "Site") or contact us through our contact form.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information you voluntarily provide when you submit our contact form, including:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Subject and message content</li>
          </ul>
          <p>We do not collect any information automatically, use cookies for tracking, or use analytics services.</p>

          <h2>How We Use Your Information</h2>
          <p>The information you provide through our contact form is used solely to:</p>
          <ul>
            <li>Respond to your inquiry</li>
            <li>Send you an SMS notification confirming we received your message</li>
            <li>Communicate with you about potential photography projects</li>
          </ul>
          <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

          <h2>SMS/Text Messaging</h2>
          <p>
            When you submit our contact form, you consent to an SMS notification being sent to our business phone number to alert us of your inquiry. This is a one-way, internal notification only — no SMS messages are sent to you, the form submitter. The SMS contains your name, email, subject, and a preview of your message so we can respond promptly.
          </p>
          <p>
            We use Twilio, a third-party service provider, to deliver these SMS notifications. No marketing or promotional messages are sent. Message frequency is limited to one SMS per form submission. Standard message and data rates may apply to our business line only. You may opt out of this process by contacting us directly via email instead. Twilio's privacy policy can be found at <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>twilio.com/legal/privacy</a>.
          </p>

          <h2>Data Storage</h2>
          <p>
            Your contact form submissions are stored by Netlify (our hosting provider) and processed by Twilio for SMS delivery. We retain your information only as long as necessary to respond to your inquiry. You may request deletion of your data at any time by emailing us.
          </p>

          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Netlify</strong> — Website hosting and form submission processing</li>
            <li><strong>Twilio</strong> — SMS notification delivery</li>
            <li><strong>Google Fonts</strong> — Font delivery</li>
            <li><strong>Squarespace CDN</strong> — Image hosting</li>
          </ul>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction or deletion of your personal data</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>Our Site is not directed at children under 13. We do not knowingly collect personal information from children.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:<br />
            <a href="mailto:andraehaye@gmail.com" style={{ color: 'var(--color-accent)' }}>andraehaye@gmail.com</a>
          </p>
        </div>
      </div>
    </main>
  )
}
