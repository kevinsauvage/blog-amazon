import Listing from '@/components/_scopes/listing/Listing/Listing';
import useQueries from '@/hooks/useQueries';
import getCategories from '@/lib/api/categories';
import { generateSeoData } from '@/lib/api/utils';

const CategoryPage = async (context) => {
  const searchData = await useQueries(context);
  const { categoriesResponse } = searchData;
  const { description, title, subtitle } = categoriesResponse?.[0] || {};
  return <Listing context={context} title={title} subtitle={subtitle} description={description} />;
};

export default CategoryPage;

export async function generateMetadata({ params }) {
  const { categorySlug } = params;
  const category = await getCategories({ slug: categorySlug });
  const { seo = {} } = category?.[0] || {};
  return { ...generateSeoData(seo) };
}
