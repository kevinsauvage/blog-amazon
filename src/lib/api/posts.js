import fetchStrapiEndpoint, { formatPosts } from './utils';

const ARTICLES_PATH = 'articles';
const TOKEN = process.env.STRAPI_TOKEN;

// sort : publishedAt:DESC
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

  let URL = `${ARTICLES_PATH}?pagination[pageSize]=${perPage}&pagination[page]=${page}`;

  if (populate) URL += `&populate=*`;
  if (category) URL += `&filters[categories][slug][$eqi]=${category}`;
  if (slug) URL += `&filters[slug][$eqi]=${slug}`;
  if (query) URL += `&filters[title][$containsi]=${query}`;
  if (sort) URL += `&sort=${sort}`;
  if (extraParams) URL += `&${extraParams}`;

  const { data, meta } = (await fetchStrapiEndpoint(URL)) || {};
  const { pagination } = meta || {};

  return {
    posts: formatPosts(data),
    totalPages: pagination.pageCount,
    totalPosts: pagination.total,
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
