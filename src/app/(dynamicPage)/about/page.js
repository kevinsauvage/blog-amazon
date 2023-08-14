import DynamicPage from '@/components/DynamicPage/DynamicPage';
import { fetchPage } from '@/lib/api/pages';
import { generateSeoData } from '@/lib/api/utils';

const PAGE_SLUG = 'about';

const page = async () => <DynamicPage slug={PAGE_SLUG} />;

export default page;

export async function generateMetadata() {
  const pageData = await fetchPage({ slug: PAGE_SLUG });
  const { seo } = pageData || {};
  return generateSeoData(seo);
}
