import { getCategoryBannerPost, getCategoryBySlug } from './categories';
import { getPopularPosts, getPostBySlug, getPosts } from './posts';

const wordpressApiCalls = {
  getCategoryBannerPost,
  getCategoryBySlug,
  getPopularPosts,
  getPostBySlug,
  getPosts,
};

export default wordpressApiCalls;
