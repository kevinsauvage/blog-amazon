import fetchStrapiEndpoint, { normalizePostsData } from './utils';

const ARTICLES_PATH = 'articles';
const TOKEN = process.env.STRAPI_TOKEN;

// sort : &sort=publishedAt:DESC / &sort=viewCount:DESC
export const getPosts = async (properties) => {
  const {
    perPage = 10,
    page = 1,
    categories,
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
  if (Array.isArray(categories)) {
    categories.forEach((cat) => parameters.append('filters[categories][slug][$eqi]', cat));
  }
  if (slug) parameters.append('filters[slug][$eqi]', slug);
  if (query) parameters.append('filters[title][$containsi]', query);
  if (sort) parameters.append('sort', sort);

  const url = `${ARTICLES_PATH}?${parameters.toString()}${extraParams || ''}`;

  const response = await fetchStrapiEndpoint(decodeURI(url));

  const { data, meta } = response || {};
  const { pagination } = meta || {};

  return {
    posts: normalizePostsData(data),
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
