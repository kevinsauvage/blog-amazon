import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';

import styles from './page.module.scss';

export const metadata = {
  description:
    'Learn how cookies enhance your browsing. Understand website functionality, traffic analysis, and data privacy. Make informed cookie choices.',
  keywords: ['cookie policy', 'cookies', 'technologies', 'information', 'data collection'],
  title: 'Cookie Policy | Enhancing Your Experience',
};

function page() {
  return (
    <div className={styles.page}>
      <Container>
        <Breadcrumb last="Privacy policy" />
        <div className={styles.content}>
          <h1>Privacy policy</h1>

          <p className={styles.subtitle}>
            [Your Blog Name] (&quot;we&quot; or &quot;us&quot;) uses cookies on our website. By
            using our website, you consent to the use of cookies as described in this Cookie Policy.
          </p>

          <h2>1. What are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website.
            They are widely used to make websites work or improve their efficiency, as well as to
            provide reporting information and personalized advertising.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the functioning of
              our website and cannot be disabled in our systems. They are usually set in response to
              your actions, such as setting your privacy preferences, logging in, or filling out
              forms.
            </li>
            <li>
              <strong>Performance and Analytics Cookies:</strong> These cookies allow us to analyze
              website traffic and measure the performance of our website. We use Google Analytics, a
              popular web analytics service provided by Google, Inc. Google Analytics uses cookies
              to help us understand how users engage with our website, track trends, and compile
              reports.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> These cookies are used to deliver personalized
              advertisements based on your interests and browsing behavior. We may use Google
              AdSense or other advertising partners to display these ads.
            </li>
          </ul>

          <h2>3. Your Cookie Choices</h2>
          <p>
            You can manage and control your cookie preferences by adjusting your browser settings.
            Most web browsers allow you to accept or reject cookies, delete cookies, or receive a
            notification when a cookie is set. Please note that disabling or deleting certain
            cookies may impact the functionality and performance of our website.
          </p>

          <h2>4. Third-Party Cookies</h2>
          <p>
            We may use third-party cookies on our website, including but not limited to cookies from
            Google, Inc. for Google Analytics and Google AdSense. These third-party cookies are
            subject to the respective privacy policies of these providers. We recommend reviewing
            their privacy policies for more information on how they collect, use, and process your
            data.
          </p>

          <h2>5. Changes to this Cookie Policy</h2>
          <p>
            We reserve the right to update or modify this Cookie Policy at any time. Any changes
            will be effective immediately upon posting on our website.
          </p>

          <h2>6. Contact Information</h2>
          <p>
            If you have any questions or concerns regarding our Cookie Policy, please contact us at
            [Your Contact Email].
          </p>
        </div>
      </Container>
    </div>
  );
}

export default page;
