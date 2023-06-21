/* eslint-disable import/prefer-default-export */
import fetchStrapiEndpoint, { normalizeMenuData } from './utils';

export const fetchMenu = async (properties) => {
  const { slug } = properties || {};
  if (!slug) return console.error('Please provide a slug for the menu');
  const URL = `menus?filters[title][$eqi]=${slug}&populate=*&locale=en`;
  const response = await fetchStrapiEndpoint(URL);
  const normalizedMenu = response && normalizeMenuData(response?.data);
  return normalizedMenu?.[0];
};
