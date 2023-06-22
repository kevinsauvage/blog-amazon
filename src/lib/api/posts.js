import fetchStrapiEndpoint, { formatPosts } from './utils';

const ARTICLES_PATH = 'articles';
const TOKEN = process.env.STRAPI_TOKEN;

// sort : &sort=publishedAt:DESC / &sort=viewCount:DESC
export const getPosts = async (properties) => {
  const {
    perPage = 10,
    page = 1,
    category,
    query,
    populate = true,
    slug,
    sort,
    extraParams,
  } = properties || {};

  const parameters = new URLSearchParams();
  parameters.set('pagination[pageSize]', perPage);
  parameters.set('pagination[page]', page);

  if (populate) parameters.set('populate', '*');
  if (category) parameters.set('filters[categories][slug][$eqi]', category);
  if (slug) parameters.set('filters[slug][$eqi]', slug);
  if (query) parameters.set('filters[title][$containsi]', query);
  if (sort) parameters.set('sort', sort);

  const url = `${ARTICLES_PATH}?${parameters.toString()}${extraParams || ''}`;

  console.log('🚀 ~  file: posts.js:32 ~  getPosts ~  url:', url);

  const response = await fetchStrapiEndpoint(url);
  const { data, meta } = response || {};
  const { pagination } = meta || {};

  return {
    posts: formatPosts(data),
    totalPages: pagination?.pageCount || 0,
    totalPosts: pagination?.total || 0,
  };
};

export const updatePost = async (properties) => {
  const { id, body } = properties;
  const URL = `${ARTICLES_PATH}/${id}`;
  return fetchStrapiEndpoint(URL, {
    body: JSON.stringify(body),
    headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    method: 'PUT',
  });
};
