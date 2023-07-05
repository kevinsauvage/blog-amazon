import Listing from '@/components/_scopes/listing/Listing/Listing';
import { fetchPage } from '@/lib/api/pages';
import { generateSeoData } from '@/lib/api/utils';

const PAGE_SLUG = 'search';

const Search = async (context) => {
  const pageData = await fetchPage({ slug: PAGE_SLUG });
  const { title, description, subtitle } = pageData || {};
  return <Listing context={context} title={title} subtitle={subtitle} description={description} />;
};

export default Search;

export async function generateMetadata() {
  const pageData = await fetchPage({ slug: PAGE_SLUG });
  const { seo } = pageData || {};
  return { ...generateSeoData(seo) };
}
