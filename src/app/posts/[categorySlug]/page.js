import Listing from '@/components/_scopes/listing/Listing/Listing';
import PageBannerWrapper from '@/components/_scopes/listing/PageBannerWrapper/PageBannerWrapper';
import SearchForm from '@/components/SearchForm/SearchForm';
import useQueries from '@/hooks/useQueries';
import getCategories from '@/lib/api/categories';
import { generateSeoData } from '@/lib/api/utils';

const CategoryPage = async (context) => {
  const { page, posts, q, sortsResponse, totalPages, totalPosts, categoriesResponse } =
    await useQueries(context);

  const { description, title, subtitle } = categoriesResponse?.[0] || {};

  return (
    <>
      <PageBannerWrapper title={title} query={q} subtitle={subtitle} description={description}>
        <SearchForm query={q} />
      </PageBannerWrapper>
      <Listing
        posts={posts}
        totalPosts={totalPosts}
        totalPages={totalPages}
        page={page}
        sorts={sortsResponse}
      />
    </>
  );
};

export default CategoryPage;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = await getCategories({ slug });

  const { seo = {} } = category?.[0] || {};

  return {
    ...generateSeoData(seo),
  };
}
