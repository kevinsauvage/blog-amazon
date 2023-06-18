import getCategories from './categories';
import { getComments, postComment } from './comments';
import getMenu from './menus';
import { getPosts, updatePost } from './posts';

const apiCalls = {
  getCategories,
  getComments,
  getMenu,
  getPosts,
  postComment,
  updatePost,
};

export default apiCalls;
