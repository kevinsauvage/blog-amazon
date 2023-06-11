import pageMetadatas from '@/metadatas/pages';

import styles from './page.module.scss';

function page() {
  return (
    <div className={styles.content}>
      <h1>Privacy policy</h1>

      <p className={styles.subtitle}>
        [Your Blog Name] is committed to protecting your privacy. This Privacy Policy outlines how
        we collect, use, and safeguard your personal information when you use our website. By using
        our website, you consent to the practices described in this policy.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          We may collect personal information such as your name, email address, and any other
          information you voluntarily provide when you interact with our website.
        </li>
        <li>
          We may also collect non-personal information, such as browser type, IP address, and usage
          data, through cookies and similar technologies.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>
          We may use the information we collect to:
          <ul>
            <li>Provide and personalize our services.</li>
            <li>Communicate with you, respond to inquiries, and provide support.</li>
            <li>Analyze and improve our website&apos;s performance and functionality.</li>
            <li>
              Send you promotional materials or newsletters (if you have opted-in to receive them).
            </li>
            <li>Comply with legal obligations and enforce our terms and conditions.</li>
          </ul>
        </li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <ul>
        <li>
          We may share your information with:
          <ul>
            <li>
              Service providers who assist us in operating our website and providing our services.
            </li>
            <li>
              Third-party analytics and advertising providers to help us analyze website usage and
              deliver targeted advertisements.
            </li>
            <li>
              Law enforcement agencies, government officials, or other third parties when required
              by law or to protect our rights and the rights of others.
            </li>
          </ul>
        </li>
        <li>
          We do not sell, trade, or rent your personal information to third parties for their
          marketing purposes.
        </li>
      </ul>

      <h2>4. Your Rights and Choices</h2>
      <ul>
        <li>
          You have the right to:
          <ul>
            <li>Access, rectify, or erase your personal information by contacting us.</li>
            <li>
              Object to or restrict the processing of your personal information in certain
              circumstances.
            </li>
            <li>Withdraw your consent for the processing of your personal information.</li>
            <li>
              Receive a copy of your personal information in a structured, commonly used, and
              machine-readable format.
            </li>
          </ul>
        </li>
      </ul>

      <h2>5. Security</h2>
      <ul>
        <li>
          We take reasonable measures to protect your personal information from unauthorized access,
          disclosure, or misuse.
        </li>
        <li>
          However, please be aware that no security measure is perfect or impenetrable, and we
          cannot guarantee the absolute security of your information.
        </li>
      </ul>

      <h2>6. Third-Party Links</h2>
      <ul>
        <li>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices or content of those third-party websites.
        </li>
        <li>
          We encourage you to review the privacy policies of any third-party websites you visit.
        </li>
      </ul>

      <h2>7. Children&apos;s Privacy</h2>
      <ul>
        <li>
          Our website is not intended for children under the age of 16. We do not knowingly collect
          personal information from children under the age of 16.
        </li>
        <li>
          If we become aware that we have collected personal information from a child under the age
          of 16 without parental consent, we will take steps to remove that information.
        </li>
      </ul>

      <h2>8. Data Transfers</h2>
      <ul>
        <li>
          If we transfer your personal information outside of the European Economic Area (EEA), we
          will ensure appropriate safeguards are in place to protect your data in accordance with
          applicable data protection laws.
        </li>
      </ul>

      <h2>9. Changes to this Privacy Policy</h2>
      <ul>
        <li>
          We reserve the right to update or modify this Privacy Policy at any time. Any changes will
          be effective immediately upon posting on our website.
        </li>
        <li>
          We encourage you to review this Privacy Policy periodically to stay informed about how we
          collect, use, and protect your information.
        </li>
      </ul>

      <h2>10. Contact Information</h2>
      <ul>
        <li>
          If you have any questions or concerns regarding our Privacy Policy, please contact us at
          [Your Contact Email].
        </li>
      </ul>
    </div>
  );
}

export default page;

export const metadata = pageMetadatas.privacy;
