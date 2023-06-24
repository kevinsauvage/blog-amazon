import Listing from '@/components/_scopes/listing/Listing/Listing';
import useQueries from '@/hooks/useQueries';
import getCategories from '@/lib/api/categories';

const CategoryPage = async (context) => {
  const { page, posts, q, sortsResponse, totalPages, totalPosts, categoriesResponse } =
    await useQueries(context);

  const { description, title } = categoriesResponse?.[0] || {};

  return (
    <Listing
      title={title}
      query={q}
      subtitle={description}
      posts={posts}
      totalPosts={totalPosts}
      totalPages={totalPages}
      page={page}
      sorts={sortsResponse}
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
