import Listing from '@/components/_scopes/listing/Listing/Listing';
import PageBannerWrapper from '@/components/_scopes/listing/PageBannerWrapper/PageBannerWrapper';
import Pagination from '@/components/Pagination/Pagination';
import useQueries from '@/hooks/useQueries';
import getCategories from '@/lib/api/categories';
import { fetchMenu } from '@/lib/api/menus';
import { generateSeoData } from '@/lib/api/utils';

const CategoryPage = async (context) => {
  const [searchData, menu] = await Promise.all([useQueries(context), fetchMenu({ slug: 'main' })]);
  const { page, posts, q, sortsResponse, totalPages, totalPosts, categoriesResponse } = searchData;

  const { description, title, subtitle } = categoriesResponse?.[0] || {};

  return (
    <>
      <PageBannerWrapper
        title={title}
        subtitle={subtitle}
        description={description}
        query={q}
        menu={menu}
      />
      <Listing posts={posts} totalPosts={totalPosts} sorts={sortsResponse} />
      <Pagination totalPages={totalPages} currentPage={page} navigate />
    </>
  );
};

export default CategoryPage;

export async function generateMetadata({ params }) {
  const { categorySlug } = params;

  const category = await getCategories({ slug: categorySlug });

  const { seo = {} } = category?.[0] || {};

  return {
    ...generateSeoData(seo),
  };
}
