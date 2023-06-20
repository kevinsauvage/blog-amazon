/* eslint-disable import/prefer-default-export */
import fetchStrapiEndpoint, { formatSortItems } from './utils';

export const fetchSorts = async (properties) => {
  const { slug } = properties || {};
  if (!slug) return console.error('Please provide a valid slug for the menu');
  const URL = `sorts?filters[title][$eqi]=${slug}&populate=*&locale=en`;
  const response = await fetchStrapiEndpoint(URL);
  const normalizedSort = response?.data && formatSortItems(response?.data);
  return normalizedSort || [];
};
