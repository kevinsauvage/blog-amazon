import { handleFetch } from './utils';

const { WORDPRESS_API_URL } = process.env;

export const getCategoryBySlug = async (slug) => {
  const URL = `${WORDPRESS_API_URL}/categories?slug=${slug}&_embed`;
  const { data } = (await handleFetch(URL)) || {};
  return data;
};

export const getCategories = async () => {
  const URL = `${WORDPRESS_API_URL}/categories?acf_format=standard`;
  const response = await fetch(URL, { next: { revalidate: 60 * 60 * 24 } });
  return response.json();
};
