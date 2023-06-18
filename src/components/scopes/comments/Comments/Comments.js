'use client';

import { useState } from 'react';

import Comment from '../Comment/Comment';
import CommentPagination from '../CommentPagination/CommentPagination';

import styles from './Comments.module.scss';

const VISIBLE_STEP = 3;

const Comments = ({ comments, postId }) => {
  const [visible, setVisible] = useState(VISIBLE_STEP);
  const updateVisible = (newStep) => setVisible(newStep);

  return (
    <div className={styles.comments}>
      <h4 className={styles.title}>Comments ({comments.length})</h4>
      <div>
        {Array.isArray(comments) && comments.length > 0 ? (
          <div>
            {comments.slice(0, visible).map((comment) => (
              <Comment key={comment.id} comment={comment} postId={postId} />
            ))}
            <CommentPagination
              comments={comments}
              step={VISIBLE_STEP}
              visible={visible}
              updateCallback={updateVisible}
            />
          </div>
        ) : (
          <p>There is no comment to show</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
