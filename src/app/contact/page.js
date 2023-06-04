import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import ContactForm from '@/components/ContactForm/ContactForm';
import Container from '@/components/Container/Container';

import styles from './page.module.scss';

export const metadata = {
  description:
    "Get in touch with us for inquiries, feedback, or collaborations. We're here to assist you and provide a prompt response. Contact us today!",
  title: 'Contact Us | Get in Touch',
};

function page() {
  return (
    <div className={styles.page}>
      <Container classname={styles.container}>
        <Breadcrumb />
        <h1>Let’s see how we can help</h1>
        <p className={styles.subtitle}>
          Engage with Us: Utilize Our Contact Form to Connect, Inquire, Collaborate, and Share Your
          Valuable Feedback.
        </p>
        <ContactForm />
      </Container>
    </div>
  );
}

export default page;
