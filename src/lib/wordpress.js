import { formatPost, formatPosts } from '@/utils/posts';

const { WORDPRESS_API_URL, WORDPRESS_API_CUSTOM_URL } = process.env;
const PER_PAGE = 9;
const REVALIDATE = 60 * 60; // 1hour

export const getPosts = async () => {
  const URL = `${WORDPRESS_API_URL}/posts/?sticky=true&_embed`;
  const response = await fetch(URL, { next: { revalidate: REVALIDATE } });
  const data = await response.json();
  return formatPosts(data);
};

export const getPostsByCategory = async (category, perPage, page = 1) => {
  const url = `${WORDPRESS_API_URL}/posts/?per_page=${perPage}&page=${page}&categories=${category}&_embed`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE } });
  const data = await response.json();
  return formatPosts(data);
};

export const getPopularPosts = async (count = 10, category = '') => {
  const URL = `${WORDPRESS_API_CUSTOM_URL}/popular-posts/?count=${count}&_embed&category=${category}`;
  const response = await fetch(URL, { next: { revalidate: REVALIDATE } });
  const data = await response.json();
  return formatPosts(data);
};

export const getSearch = async ({ searchParams }) => {
  const { q = '', page = 1 } = searchParams || {};
  const URL = `${WORDPRESS_API_URL}/posts?search=${q}&per_page=${PER_PAGE}&page=${page}&_embed`;
  const response = await fetch(URL, { next: { revalidate: REVALIDATE } });
  const totalPosts = response.headers.get('X-WP-Total');
  const data = await response.json();

  return {
    currentPage: Number(page),
    posts: formatPosts(data),
    query: q,
    totalPages: Math.ceil(totalPosts / PER_PAGE),
    totalPosts,
  };
};

export const getPostBySlug = async (context) => {
  const { slug } = context.params;
  const URL = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`;
  const response = await fetch(URL, { next: { revalidate: REVALIDATE } });
  const dataJson = await response.json();
  const post = dataJson?.[0];

  if (post) {
    try {
      await fetch(`${WORDPRESS_API_CUSTOM_URL}/posts/${post.id}/view_count`);
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  }

  return formatPost(post);
};

export const getPostsFromCategory = async (page, id) => {
  const url = `${WORDPRESS_API_URL}/posts/?per_page=${PER_PAGE}&page=${page}&categories=${id}&_embed`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE } });
  const totalPosts = response.headers.get('X-WP-Total');
  const data = await response.json();
  const totalPages = Math.ceil(totalPosts / PER_PAGE);

  return {
    posts: formatPosts(data),
    totalPages,
    totalPosts,
  };
};

export const getBannerPost = async (name) => {
  const url = `${WORDPRESS_API_CUSTOM_URL}/banner-post/${name}?_embed`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!response.ok) return {};
  const data = await response.json();
  return formatPost(data);
};
