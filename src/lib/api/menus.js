import fetchStrapiEndpoint from './utils';

const getMenu = async (properties) => {
  const { slug } = properties || {};
  if (!slug) return console.error('Please provide a valid slug for the menu');
  const URL = `navigation/render/${slug}?locale=en`;
  return fetchStrapiEndpoint(URL);
};

export default getMenu;
