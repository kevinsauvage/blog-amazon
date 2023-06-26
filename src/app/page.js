import Listing from '@/components/_scopes/listing/Listing/Listing';
import PageBannerWrapper from '@/components/_scopes/listing/PageBannerWrapper/PageBannerWrapper';
import Pagination from '@/components/Pagination/Pagination';
import SearchForm from '@/components/SearchForm/SearchForm';
import useQueries from '@/hooks/useQueries';
import { fetchPage } from '@/lib/api/pages';
import { generateSeoData } from '@/lib/api/utils';

const PAGE_SLUG = 'home';

const Home = async (context) => {
  const pageData = await fetchPage({ slug: PAGE_SLUG });
  const { title, description, subtitle } = pageData || {};
  const { categoriesResponse, page, posts, q, sortsResponse, totalPages, totalPosts } =
    await useQueries(context);

  return (
    <>
      <PageBannerWrapper title={title} query={q} subtitle={subtitle} description={description}>
        <SearchForm query={q} />
      </PageBannerWrapper>
      <Listing
        totalPosts={totalPosts}
        posts={posts}
        sorts={sortsResponse}
        categories={categoriesResponse}
      />
      <Pagination totalPages={totalPages} currentPage={page} navigate />
    </>
  );
};

export default Home;

export async function generateMetadata() {
  const pageData = await fetchPage({ slug: PAGE_SLUG });
  const { seo } = pageData || {};

  return {
    ...generateSeoData(seo),
  };
}
