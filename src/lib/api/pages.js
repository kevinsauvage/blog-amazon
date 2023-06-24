/* eslint-disable import/prefer-default-export */
import fetchStrapiEndpoint, { normalizePageData } from './utils';

export const fetchPage = async (properties) => {
  const { slug } = properties || {};
  if (!slug) return console.error('Please provide a slug for the menu');
  const URL = `pages?filters[slug][$eqi]=${slug}&populate=*&locale=en`;
  const response = await fetchStrapiEndpoint(URL);
  const normalizedPage = response && normalizePageData(response?.data);
  return normalizedPage?.[0];
};
