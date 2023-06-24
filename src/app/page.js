import Listing from '@/components/_scopes/listing/Listing/Listing';
import useQueries from '@/hooks/useQueries';
import { getSingleType } from '@/lib/api/singleType';

const Home = async (context) => {
  const globalContext = await getSingleType({ slug: 'global' });

  const { categoriesResponse, page, posts, q, sortsResponse, totalPages, totalPosts } =
    await useQueries(context);

  return (
    <Listing
      title={globalContext?.mainTitle}
      description={globalContext?.mainDescription}
      subtitle={globalContext?.mainSubtitle}
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
