import { formatPost, formatPosts } from '@/utils/posts';

const { WORDPRESS_API_URL, WORDPRESS_API_CUSTOM_URL } = process.env;
const REVALIDATE = 60 * 60; // 1hour

export const getPopularPosts = async (count = 10, categorySlug = '') => {
  const URL = `${WORDPRESS_API_CUSTOM_URL}/popular-posts/?count=${count}&_embed&category=${categorySlug}`;
  const response = await fetch(URL, { next: { revalidate: REVALIDATE } });
  const data = await response.json();
  return formatPosts(data);
};

export const getStickyPosts = async (perPage = 10, page = 1) => {
  const URL = `${WORDPRESS_API_URL}/posts?sticky=true&per_page=${perPage}&page=${page}&_embed`;
  const response = await fetch(URL, { next: { revalidate: REVALIDATE } });
  const data = await response.json();
  return formatPosts(data);
};

export const getSearch = async (query, page, perPage = 9) => {
  const URL = `${WORDPRESS_API_URL}/posts?search=${query}&per_page=${perPage}&page=${page}&_embed`;
  const response = await fetch(URL, { next: { revalidate: REVALIDATE } });
  const totalPosts = response.headers.get('X-WP-Total');
  const data = await response.json();

  return {
    currentPage: Number(page),
    posts: formatPosts(data),
    query,
    totalPages: Math.ceil(totalPosts / perPage),
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

export const getPostsFromCategorySlug = async (slug, page = 1, perPage = 10) => {
  const url = `${WORDPRESS_API_CUSTOM_URL}/category/${slug}?per_page=${perPage}&page=${page}&_embed`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE } });
  const totalPosts = response.headers.get('X-WP-Total');
  const data = await response.json();
  const totalPages = Math.ceil(totalPosts / perPage);

  return {
    posts: formatPosts(data),
    totalPages,
    totalPosts,
  };
};

export const getCategoryBannerPost = async (name) => {
  const url = `${WORDPRESS_API_CUSTOM_URL}/banner-post/${name}?_embed`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!response.ok) return {};
  const data = await response.json();
  return formatPost(data);
};
