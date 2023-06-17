import fetchStrapiEndpoint, { formatCategories } from './utils';

const getCategories = async (properties) => {
  const { slug } = properties || {};
  let URL = `categories?`;
  if (slug) URL += `filters[slug][$eqi]=${slug}`;
  const response = await fetchStrapiEndpoint(URL);
  return formatCategories(response.data);
};

export default getCategories;
