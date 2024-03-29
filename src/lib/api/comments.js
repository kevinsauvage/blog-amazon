import fetchStrapiEndpoint from './utils';

const COMMENT_PATH = 'comments';
const TOKEN = process.env.STRAPI_TOKEN;

export const postComment = async (properties) => {
  const { postId, email, name, comment, threadOf } = properties;
  const URL = `${COMMENT_PATH}/api::article.article:${postId}`;

  return fetchStrapiEndpoint(URL, {
    body: JSON.stringify({
      author: {
        email,
        id: '<any ID like value>',
        name,
      },
      content: comment,
      threadOf, // id of comment we would like to start / continue the thread (Optional)
    }),
    headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    method: 'POST',
  });
};

export const getComments = async (properties) => {
  const { postId, page = 1, pageSize = 5 } = properties;
  const URL = `${COMMENT_PATH}/api::article.article:${postId}/flat?pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true&sort[0]=createdAt:desc&filters[blocked][$eq]=false&filters[blockedThread][$eq]=false`;
  return fetchStrapiEndpoint(URL, { next: { revalidate: 0 } });
};
