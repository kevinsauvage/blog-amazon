import ContactForm from '@/components/_scopes/form/ContactForm/ContactForm';
import DynamicPage from '@/components/DynamicPage/DynamicPage';
import { fetchPage } from '@/lib/api/pages';
import { generateSeoData } from '@/lib/api/utils';

const PAGE_SLUG = 'contact';

const page = async () => (
  <DynamicPage slug={PAGE_SLUG}>
    <ContactForm />
  </DynamicPage>
);

export default page;

export async function generateMetadata() {
  const pageData = await fetchPage({ slug: PAGE_SLUG });
  const { seo } = pageData || {};

  return {
    ...generateSeoData(seo),
  };
}
