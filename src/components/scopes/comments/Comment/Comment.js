'use client';

import { useEffect, useState } from 'react';

import Date from '@/components/Date/Date';
import Wrapper from '@/components/Wrapper/Wrapper';
import { formatString } from '@/utils/strings';

import CommentForm from '../CommentForm/CommentForm';
import CommentPagination from '../CommentPagination/CommentPagination';

import styles from './Comment.module.scss';

const CommentMarkup = ({ comment = {}, isChild, handleReply }) => {
  const { content, createdAt, author, blocked, blockReason } = comment;
  const { name } = author;

  return (
    <div className={`${styles.comment} ${isChild ? styles.child : ''}`}>
      {blocked ? (
        <p>Comment has been blocked: {blockReason}</p>
      ) : (
        <>
          <div className={styles.header}>
            <Wrapper>
              <p className={styles.name}>{formatString(name)}</p>
              <Date date={createdAt} includeTime />
            </Wrapper>
            {!isChild && (
              <button type="button" onClick={handleReply}>
                Reply
              </button>
            )}
          </div>

          <div className={styles.content}>{content}</div>
        </>
      )}
    </div>
  );
};

const flattenChildren = (comments) => {
  const flattened = [];

  const recursiveFunction = (comment) => {
    flattened.push(comment);

    if (comment.children && comment.children.length > 0) {
      comment.children.forEach((child) => recursiveFunction(child));
    }
  };

  comments.forEach((comment) => recursiveFunction(comment));
  return flattened;
};

const VISIBLE_STEP = 1;

const Comment = ({ comment = {}, postId }) => {
  const { children } = comment;

  const [formatedChildren, setFormatedChildren] = useState([]);
  const [visible, setVisible] = useState(VISIBLE_STEP);
  const [reply, setReply] = useState(false);
  const updateVisible = (newStep) => setVisible(newStep);

  useEffect(() => {
    if (!children) return;
    const data = flattenChildren(children);
    setFormatedChildren(data);
  }, [children]);

  return (
    <>
      <CommentMarkup comment={comment} handleReply={() => setReply(true)} />
      {formatedChildren?.slice(0, visible).map((child) => (
        <CommentMarkup key={child.id} comment={comment} isChild />
      ))}
      {reply && <CommentForm postId={postId} />}
      <CommentPagination
        comments={formatedChildren}
        step={VISIBLE_STEP}
        visible={visible}
        updateCallback={updateVisible}
      />
    </>
  );
};

export default Comment;
