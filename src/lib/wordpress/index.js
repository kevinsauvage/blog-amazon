import { getCategories, getCategoryBannerPost, getCategoryBySlug } from './categories';
import { getPopularPosts, getPostBySlug, getPosts } from './posts';

const wordpressApiCalls = {
  getCategories,
  getCategoryBannerPost,
  getCategoryBySlug,
  getPopularPosts,
  getPostBySlug,
  getPosts,
};

export default wordpressApiCalls;
