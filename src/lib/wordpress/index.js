import { getCategories, getCategoryBySlug } from './categories';
import { getPopularPosts, getPostBySlug, getPosts } from './posts';

const wordpressApiCalls = {
  getCategories,
  getCategoryBySlug,
  getPopularPosts,
  getPostBySlug,
  getPosts,
};

export default wordpressApiCalls;
