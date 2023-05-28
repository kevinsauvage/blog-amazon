import { formatPost, formatPosts } from '@/utils/posts';

const { WORDPRESS_API_URL, WORDPRESS_API_CUSTOM_URL } = process.env;
const REVALIDATE = 60 * 60; // 1hour

const handleFetch = async (url) => {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATE } });
    const totalResult = response.headers.get('X-WP-Total');
    const data = await response.json();
    return { data, totalResult };
  } catch (error) {
    console.error({ error: error.stack, message: error.message, url });
  }
};

export const getPosts = async (properties) => {
  const { perPage = 10, page = 1, sticky, categories, query } = properties || {};

  let URL = `${WORDPRESS_API_URL}/posts?per_page=${perPage}&page=${page}&_embed`;
  if (sticky) URL += `&sticky=true`;
  if (categories) URL += `&categories=${categories}`;
  if (query) URL += `&search=${query}`;

  const { data, totalResult } = (await handleFetch(URL)) || {};
  const totalPages = Math.ceil(totalResult / perPage);

  return {
    posts: formatPosts(data),
    totalPages,
    totalPosts: totalResult,
  };
};

export const getPostBySlug = async (slug) => {
  const URL = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`;
  const { data } = (await handleFetch(URL)) || {};
  const post = data?.[0];

  if (post) {
    try {
      await fetch(`${WORDPRESS_API_CUSTOM_URL}/posts/${post.id}/view_count`);
    } catch (error) {
      console.error('Error updating view count:', error.stack, { URL });
    }
  }

  return formatPost(post);
};

export const getCategoryBySlug = async (slug) => {
  const URL = `${WORDPRESS_API_URL}/categories?slug=${slug}&_embed`;
  const { data } = (await handleFetch(URL)) || {};
  return data;
};

export const getPopularPosts = async (count = 10, categorySlug = '') => {
  try {
    const URL = `${WORDPRESS_API_CUSTOM_URL}/popular-posts/?count=${count}&_embed&category=${categorySlug}`;
    const response = await fetch(URL, { next: { revalidate: REVALIDATE } });
    const data = await response.json();
    return formatPosts(data);
  } catch (error) {
    console.error('Error fetching popular posts', error.stack);
  }
};

export const getCategoryBannerPost = async (name) => {
  const url = `${WORDPRESS_API_CUSTOM_URL}/banner-post/${name}?_embed`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE } });
  const data = await response.json();
  return formatPost(data);
};
