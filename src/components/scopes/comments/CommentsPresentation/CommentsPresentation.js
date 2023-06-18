import apiCalls from '@/lib/api';

import CommentForm from '../CommentForm/CommentForm';
import Comments from '../Comments/Comments';

import styles from './CommentsPresentation.module.scss';

const { getComments } = apiCalls;

const CommentsPresentation = async ({ postId }) => {
  const comments = await getComments({ postId });

  return (
    <div className={styles.presentation}>
      <Comments comments={comments} postId={postId} />
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentsPresentation;
