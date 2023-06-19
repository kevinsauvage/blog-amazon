import getCategories from './categories';
import { getComments, postComment } from './comments';
import { fetchMenu } from './menus';
import { getPosts, updatePost } from './posts';

const apiCalls = {
  fetchMenu,
  getCategories,
  getComments,
  getPosts,
  postComment,
  updatePost,
};

export default apiCalls;
