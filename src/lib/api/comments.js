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
  const { postId } = properties;
  const URL = `${COMMENT_PATH}/api::article.article:${postId}`;
  return fetchStrapiEndpoint(URL);
};
