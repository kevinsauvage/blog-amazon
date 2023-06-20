import getCategories from './categories';
import { getComments, postComment } from './comments';
import { fetchMenu } from './menus';
import { getPosts, updatePost } from './posts';
import { fetchSorts } from './sorts';

const apiCalls = {
  fetchMenu,
  fetchSorts,
  getCategories,
  getComments,
  getPosts,
  postComment,
  updatePost,
};

export default apiCalls;
