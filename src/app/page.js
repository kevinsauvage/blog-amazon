import Listing from '@/components/_scopes/listing/Listing/Listing';
import { fetchPage } from '@/lib/api/pages';
import { generateSeoData } from '@/lib/api/utils';

const PAGE_SLUG = 'home';

const Home = async (context) => {
  const [pageData] = await Promise.all([fetchPage({ slug: PAGE_SLUG })]);
  const { title, description, subtitle } = pageData || {};
  return <Listing context={context} title={title} subtitle={subtitle} description={description} />;
};

export default Home;

export async function generateMetadata() {
  const pageData = await fetchPage({ slug: PAGE_SLUG });
  const { seo } = pageData || {};
  return { ...generateSeoData(seo) };
}
