import Listing from '@/components/_scopes/listing/Listing/Listing';
import useQueries from '@/hooks/useQueries';
import { fetchPage } from '@/lib/api/pages';

const pageDataSlug = 'home';

const Home = async (context) => {
  const pageData = await fetchPage({ slug: pageDataSlug });
  const { title, description, subtitle } = pageData || {};
  const { categoriesResponse, page, posts, q, sortsResponse, totalPages, totalPosts } =
    await useQueries(context);

  return (
    <Listing
      title={title}
      description={description}
      subtitle={subtitle}
      totalPosts={totalPosts}
      query={q}
      posts={posts}
      totalPages={totalPages}
      page={page}
      sorts={sortsResponse}
      categories={categoriesResponse}
    />
  );
};

export default Home;
