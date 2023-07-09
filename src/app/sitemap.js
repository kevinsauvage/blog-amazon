import apiCalls from '@/lib/api/index';

const { getPosts, getCategories } = apiCalls;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  const postsResponse = await getPosts({ perPage: 100 });

  const categoriesResponse = await getCategories();

  const postCategoriesPath = categoriesResponse.map((category) => ({
    lastModified: new Date().toISOString(),
    url: `${BASE_URL}/posts/${category?.slug}`,
  }));

  const searchCategoriesPath = categoriesResponse.map((category) => ({
    lastModified: new Date().toISOString(),
    url: `${BASE_URL}/search/${category?.slug}`,
  }));

  const posts = postsResponse?.posts?.map(({ slug, updatedAt, categories }) => ({
    lastModified: updatedAt,
    url: `${BASE_URL}/posts/${categories?.[0]?.slug}/${slug}`,
  }));

  const routes = [
    '',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/cookie',
    '/posts',
    '/search',
  ].map((route) => ({
    lastModified: new Date().toISOString(),
    url: `${BASE_URL}${route}`,
  }));

  return [...routes, ...postCategoriesPath, ...searchCategoriesPath, ...posts];
}
