import PageBannerWrapper from '@/components/_scopes/listing/PageBannerWrapper/PageBannerWrapper';
import ContactForm from '@/components/ContactForm/ContactForm';
import Container from '@/components/Container/Container';
import pageMetadatas from '@/metadatas/pages';

import styles from './page.module.scss';

function page() {
  return (
    <div className={styles.page}>
      <PageBannerWrapper
        title="Let’s see how we can help"
        subtitle="Engage with Us: Utilize Our Contact Form to Connect, Inquire, Collaborate, and Share Your
        Valuable Feedback."
      />
      <Container classname={styles.container}>
        <ContactForm />
      </Container>
    </div>
  );
}

export default page;

export const metadata = pageMetadatas.contact;
