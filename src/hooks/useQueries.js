import getCategories from '@/lib/api/categories';
import { getPosts } from '@/lib/api/posts';
import { fetchSorts } from '@/lib/api/sorts';
import { decodeURL } from '@/utils/url';

const PER_PAGE = 12;

export const getPostsQueryHelper = (searchParameters, categorySlug) => {
  const { q = '', page = 1, sorting, categories = [] } = searchParameters || {};

  let categoryIds;

  if (categorySlug) {
    categoryIds = [categorySlug];
  } else if (Array.isArray(categories)) {
    categoryIds = categories;
  } else {
    categoryIds = categories?.split(',');
  }
  const extraParameters = sorting ? decodeURL(sorting) : '';

  return { PER_PAGE, categoryIds, extraParameters, page, q, sorting };
};

const useQueries = async (context) => {
  const { searchParams, params } = context;

  const { categorySlug } = params;

  const {
    q = '',
    categoryIds,
    extraParameters,
    page,
    PER_PAGE: perPage,
  } = getPostsQueryHelper(searchParams, categorySlug) || {};

  const promises = [
    getPosts({ categories: categoryIds, extraParams: extraParameters, page, perPage, query: q }),
    fetchSorts({ slug: 'search' }),
  ];

  if (categorySlug) {
    promises.push(getCategories({ slug: categorySlug })); // If the page is category, only fetch that category
  }

  const [results, sortsResponse, categoriesResponse] = await Promise.all(promises);

  const { posts, totalPosts, totalPages } = results || {};

  return {
    categoriesResponse,
    page,
    posts,
    q,
    sortsResponse,
    totalPages,
    totalPosts,
  };
};

export default useQueries;
