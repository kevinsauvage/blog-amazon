import apiCalls from '@/lib/api/index';

const { getPosts } = apiCalls;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  const postsResponse = await getPosts({ perPage: 100 });

  const posts = postsResponse?.posts?.map(({ slug, date, categories }) => ({
    lastModified: date,
    url: `${BASE_URL}/posts/${slug}`,
  }));

  const routes = ['', '/about', '/contact', '/search', '/terms', '/privacy', '/cookie'].map(
    (route) => ({
      lastModified: new Date().toISOString(),
      url: `${BASE_URL}${route}`,
    })
  );

  return [...routes, ...posts];
}
