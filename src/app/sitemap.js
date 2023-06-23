import apiCalls from '@/lib/api/index';

const { getPosts, getCategories } = apiCalls;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  const postsResponse = await getPosts({ perPage: 100 });

  const categoriesResponse = await getCategories();

  const categoriesPath = categoriesResponse.map((category) => ({
    lastModified: new Date().toISOString(),
    url: `${BASE_URL}/posts/${category?.slug}`,
  }));

  const posts = postsResponse?.posts?.map(({ slug, updatedAt, categories }) => ({
    lastModified: updatedAt,
    url: `${BASE_URL}/posts/${categories?.[0]?.slug}/${slug}`,
  }));

  const routes = [
    '',
    '/about',
    '/contact',
    '/search',
    '/terms',
    '/privacy',
    '/cookie',
    '/posts',
  ].map((route) => ({
    lastModified: new Date().toISOString(),
    url: `${BASE_URL}${route}`,
  }));

  return [...routes, ...categoriesPath, ...posts];
}
