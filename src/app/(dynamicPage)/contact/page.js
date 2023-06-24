import ContactForm from '@/components/ContactForm/ContactForm';
import DynamicPage from '@/components/DynamicPage/DynamicPage';
import pageMetadatas from '@/metadatas/pages';

const page = async () => (
  <DynamicPage slug="contact">
    <ContactForm />
  </DynamicPage>
);

export default page;

export const metadata = pageMetadatas.contact;
