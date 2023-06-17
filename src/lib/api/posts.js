import fetchStrapiEndpoint, { formatPosts } from './utils';

// sort : publishedAt:DESC
const getPosts = async (properties) => {
  const { perPage = 10, page = 1, category, query, populate = true, slug, sort } = properties || {};

  let URL = `articles?pagination[pageSize]=${perPage}&pagination[page]=${page}`;
  if (populate) URL += `&populate=*`;

  if (category) URL += `&filters[categories][slug][$eqi]=${category}`;
  if (slug) URL += `&filters[slug][$eqi]=${slug}`;
  if (query) URL += `&filters[title][$$containsi]=${query}`;
  if (sort) URL += `&sort=${sort}`;

  const { data, meta } = (await fetchStrapiEndpoint(URL)) || {};

  const { pagination } = meta || {};

  return {
    posts: formatPosts(data),
    totalPages: pagination.pageCount,
    totalPosts: pagination.total,
  };
};

export default getPosts;
