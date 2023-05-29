import { formatPost } from '@/utils/posts';

import { handleFetch } from './utils';

const { WORDPRESS_API_URL, WORDPRESS_API_CUSTOM_URL } = process.env;

export const getCategoryBySlug = async (slug) => {
  const URL = `${WORDPRESS_API_URL}/categories?slug=${slug}&_embed`;
  const { data } = (await handleFetch(URL)) || {};
  return data;
};

export const getCategoryBannerPost = async (name) => {
  const URL = `${WORDPRESS_API_CUSTOM_URL}/banner-post/${name}?_embed`;
  const { data } = (await handleFetch(URL)) || {};
  return formatPost(data);
};
