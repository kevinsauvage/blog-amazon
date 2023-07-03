import Listing from '@/components/_scopes/listing/Listing/Listing';
import PageBannerWrapper from '@/components/_scopes/listing/PageBannerWrapper/PageBannerWrapper';
import Pagination from '@/components/Pagination/Pagination';
import useQueries from '@/hooks/useQueries';
import { fetchPage } from '@/lib/api/pages';
import { generateSeoData } from '@/lib/api/utils';

const PAGE_SLUG = 'home';

const Home = async (context) => {
  const [pageData, searchData] = await Promise.all([
    fetchPage({ slug: PAGE_SLUG }),
    useQueries(context),
  ]);

  const { title, description, subtitle } = pageData || {};
  const { page, posts, q, sortsResponse, totalPages, totalPosts } = searchData || {};

  return (
    <>
      <PageBannerWrapper title={title} subtitle={subtitle} description={description} query={q} />

      <Listing totalPosts={totalPosts} posts={posts} sorts={sortsResponse} />

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
