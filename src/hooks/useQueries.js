/* eslint-disable unicorn/no-nested-ternary */
import apiCalls from '@/lib/api/index';
import { decodeURL } from '@/utils/url';

const { getPosts, fetchSorts, getCategories } = apiCalls;

const useQueries = async (context) => {
  const { searchParams, params } = context;
  const { q = '', page = 1, sorting, categories = [] } = searchParams || {};

  const { categorySlug } = params;

  const categoryIds = categorySlug
    ? [categorySlug] // If the page is category, only fetch article for that category
    : Array.isArray(categories)
    ? categories // If there is query params categories, and it is an array, just return
    : categories?.split(','); // The categoies could be a string, split it to return and array

  const extraParameters = sorting ? decodeURL(sorting) : '';
  const perPage = 12;

  const promises = [
    getPosts({ categories: categoryIds, extraParams: extraParameters, page, perPage, query: q }),
    fetchSorts({ slug: 'search' }),
  ];

  if (categorySlug) {
    promises.push(getCategories({ slug: categorySlug })); // If the page is category, only fetch that category
  } else {
    promises.push(getCategories()); // Else fetch all categories
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
