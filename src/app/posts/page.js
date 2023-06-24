import Listing from '@/components/_scopes/listing/Listing/Listing';
import apiCalls from '@/lib/api/index';
import pageMetadatas from '@/metadatas/pages';
import { decodeURL } from '@/utils/url';

const { getPosts, fetchSorts, getCategories } = apiCalls;

const search = async (context) => {
  const { q = '', page = 1, sorting, categories = [] } = context?.searchParams || {};

  const [results, sorts, categoriesResponse] = await Promise.all([
    getPosts({
      categories: Array.isArray(categories) ? categories : categories?.split(','),
      extraParams: sorting ? decodeURL(sorting) : '',
      page,
      perPage: 12,
      query: q,
    }),
    fetchSorts({ slug: 'search' }),
    getCategories(),
  ]);

  const { posts, totalPosts, totalPages } = results || {};

  return (
    <Listing
      title="Unleashing the Power of Knowledge: Your Ultimate Blog Hub"
      subtitle="Dive into a vast collection of blog posts curated by experts and enthusiasts from various domains, offering you a rich tapestry of ideas, insights, and perspectives to explore, filter, search, and sort according to your interests and preferences"
      totalPosts={totalPosts}
      query={q}
      posts={posts}
      totalPages={totalPages}
      page={page}
      sorts={sorts}
      categories={categoriesResponse}
    />
  );
};

export default search;

export const metadata = pageMetadatas.search;
