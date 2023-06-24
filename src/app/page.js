import Listing from '@/components/_scopes/listing/Listing/Listing';
import useQueries from '@/hooks/useQueries';

const Home = async (context) => {
  const { categoriesResponse, page, posts, q, sortsResponse, totalPages, totalPosts } =
    await useQueries(context);

  return (
    <Listing
      title={
        <>
          Unleashing the Power of Knowledge: Your Ultimate <strong>Blog Hub</strong>
        </>
      }
      subtitle="Dive into a vast collection of blog posts curated by experts and enthusiasts from various domains, offering you a rich tapestry of ideas, insights, and perspectives to explore, filter, search, and sort according to your interests and preferences"
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
