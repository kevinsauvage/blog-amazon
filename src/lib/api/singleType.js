/* eslint-disable import/prefer-default-export */

import fetchStrapiEndpoint, { normalizeMenuData } from './utils';

export const getSingleType = async (properties) => {
  const { slug, extraParams } = properties || {};

  const url = `${slug}?populate=deep&${extraParams || ''}`;

  const response = await fetchStrapiEndpoint(url);

  if (!response?.data) return {};
  return {
    ...response.data.attributes,
    menus: normalizeMenuData(response.data.attributes?.menus?.data),
  };
};
