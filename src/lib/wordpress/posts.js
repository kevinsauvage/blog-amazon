import { formatPost, formatPosts } from '@/utils/posts';

import { handleFetch } from './utils';

const { WORDPRESS_API_URL, WORDPRESS_API_CUSTOM_URL } = process.env;

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

export const getPopularPosts = async (count = 10, categorySlug = '') => {
  const URL = `${WORDPRESS_API_CUSTOM_URL}/popular-posts/?count=${count}&_embed&category=${categorySlug}`;
  const { data } = (await handleFetch(URL)) || {};
  return formatPosts(data);
};
