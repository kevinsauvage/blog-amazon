import Listing from '@/components/_scopes/listing/Listing/Listing';
import apiCalls from '@/lib/api/index';
import { formatString } from '@/utils/strings';
import { decodeURL } from '@/utils/url';

const { getCategories, getPosts, fetchSorts } = apiCalls;

const getData = async (slug, page, sort, q) => {
  const category = await getCategories({ slug });
  const posts = await getPosts({
    categories: [category?.[0]?.slug],
    extraParams: sort,
    page,
    perPage: 12,
    query: q,
  });
  return { category, posts };
};

const CategoryPage = async (context) => {
  const { params, searchParams } = context;
  const { page = 1, sorting, q } = searchParams || {};
  const { categorySlug } = params;

  const [results, sorts] = await Promise.all([
    getData(categorySlug, page, sorting ? decodeURL(sorting) : '', q),
    fetchSorts({ slug: 'search' }),
  ]);

  const { posts, totalPages, totalPosts } = results?.posts || {};
  const { label, description } = results?.category?.[0] || {};

  return (
    <Listing
      title={`Explore ${formatString(label)}: A Deep Dive into ${formatString(
        label
      )} Topics and Insights`}
      query={q}
      subtitle={description}
      posts={posts}
      totalPosts={totalPosts}
      totalPages={totalPages}
      page={page}
      sorts={sorts}
    />
  );
};

export default CategoryPage;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = await getCategories({ slug });

  const { label, description, seo = {} } = category?.[0] || {};

  return {
    category: seo?.metaTitle || label,
    description: seo?.metaDescription || description,
    keywords: seo?.keywords?.split(','),
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
        noarchive: true,
        noimageindex: true,
      },
      index: true,
      nocache: true,
    },
    title: seo?.metaTitle || label,
  };
}
