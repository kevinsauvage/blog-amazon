import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';

import styles from './page.module.scss';

export const metadata = {
  description:
    'Review our terms and conditions. Learn about guidelines and agreements for website or service usage. Stay informed and ensure compliance.',
  keywords: ['cookie policy', 'cookies', 'technologies', 'information', 'data collection'],
  title: 'Terms & Conditions | Guidelines for Usage',
};

function page() {
  return (
    <div className={styles.page}>
      <Container>
        <Breadcrumb last="Terms and conditions" />
        <div className={styles.content}>
          <h1>Terms and conditions</h1>
          <p className={styles.subtitle}>
            Welcome to [Your Blog Name]! These terms and conditions govern your use of our website
            and any content, features, or services provided through it. By accessing or using our
            website, you agree to be bound by these terms and conditions. If you do not agree with
            any part of these terms, please do not use our website.
          </p>

          <h2>1. Content Ownership</h2>
          <ul>
            <li>
              All content on this blog, including articles, images, videos, and other materials, is
              protected by copyright laws and is the property of [Your Blog Name] unless otherwise
              stated.
            </li>
            <li>
              You may not reproduce, distribute, modify, or republish any content from this blog
              without our prior written consent.
            </li>
          </ul>

          <h2>2. User Contributions</h2>
          <ul>
            <li>
              By posting or submitting any content (including comments, feedback, or suggestions) on
              our blog, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license
              to use, modify, display, reproduce, and distribute that content in any media.
            </li>
            <li>
              You are solely responsible for any content you contribute, and you represent and
              warrant that you have the necessary rights to grant us the license described above.
            </li>
          </ul>

          <h2>3. Privacy</h2>
          <ul>
            <li>
              Our privacy practices regarding the collection, use, and disclosure of personal
              information are outlined in our Privacy Policy.
            </li>
            <li>
              By using our website, you consent to the collection, use, and disclosure of your
              personal information as described in our Privacy Policy.
            </li>
          </ul>

          <h2>4. User Conduct</h2>
          <ul>
            <li>
              By using our website, you agree to abide by the following rules of conduct:
              <ul>
                <li>Do not engage in any unlawful, abusive, or fraudulent activities.</li>
                <li>Respect the intellectual property rights of others.</li>
                <li>Do not harass, threaten, or intimidate others.</li>
                <li>Do not upload or transmit any viruses, malware, or harmful code.</li>
              </ul>
            </li>
          </ul>

          <h2>5. Third-Party Links and Services</h2>
          <ul>
            <li>
              Our website may contain links to third-party websites and services that are not owned
              or controlled by us. We are not responsible for the content, privacy policies, or
              practices of any third-party websites or services.
            </li>
            <li>
              We encourage you to review the terms and conditions and privacy policies of any
              third-party websites or services you access through our website.
            </li>
          </ul>

          <h2>6. Disclaimers and Limitations of Liability</h2>
          <ul>
            <li>
              We strive to provide accurate and up-to-date information on our blog. However, we make
              no representations or warranties of any kind, express or implied, regarding the
              accuracy, completeness, reliability, or suitability of the information.
            </li>
            <li>
              Your use of our website is at your own risk. We shall not be liable for any direct,
              indirect, incidental, consequential, or punitive damages arising out of or in
              connection with your use of our website.
            </li>
          </ul>

          <h2>7. Modifications to the Terms and Conditions</h2>
          <ul>
            <li>
              We reserve the right to modify, suspend, or discontinue any part of our website at any
              time without prior notice.
            </li>
            <li>
              We may also revise these terms and conditions from time to time. Your continued use of
              our website after any modifications constitutes your acceptance of the revised terms.
            </li>
          </ul>

          <h2>8. Governing Law and Jurisdiction</h2>
          <ul>
            <li>
              These terms and conditions shall be governed by and construed in accordance with the
              laws of Spain.
            </li>
            <li>
              Any disputes arising out of or relating to these terms shall be subject to the
              exclusive jurisdiction of the courts of Spain.
            </li>
          </ul>

          <h2>9. Contact Information</h2>
          <ul>
            <li>
              If you have any questions or concerns regarding these terms and conditions, please
              contact us at [Your Contact Email].
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default page;
