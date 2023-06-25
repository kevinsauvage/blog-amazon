import fetchStrapiEndpoint, { normalizeCategoryData } from './utils';

const getCategories = async (properties) => {
  const { slug } = properties || {};
  let URL = `categories?populate=*`;
  if (slug) URL += `&filters[slug][$eqi]=${slug}`;
  const response = await fetchStrapiEndpoint(URL);
  return normalizeCategoryData(response.data);
};

export default getCategories;
