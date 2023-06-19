/* eslint-disable import/prefer-default-export */
import fetchStrapiEndpoint from './utils';

export const fetchMenu = async (properties) => {
  const { slug } = properties || {};
  if (!slug) return console.error('Please provide a valid slug for the menu');
  const URL = `menus?filters[title][$eqi]=${slug}&populate=*&locale=en`;
  const response = await fetchStrapiEndpoint(URL);
  return response?.data?.[0]?.attributes;
};
