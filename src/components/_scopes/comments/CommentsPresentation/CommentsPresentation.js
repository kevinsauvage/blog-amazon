'use client';

import { useCallback, useEffect, useState } from 'react';

import apiCalls from '@/lib/api';

import CommentForm from '../CommentForm/CommentForm';
import Comments from '../Comments/Comments';

import styles from './CommentsPresentation.module.scss';

const { getComments } = apiCalls;

const CommentsPresentation = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  const fetchComments = useCallback(async () => {
    const response = await getComments({ page, postId });
    setComments(response.data);
    setPagination(response.meta.pagination);
  }, [postId, page]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className={styles.presentation}>
      <Comments
        comments={comments}
        postId={postId}
        pagination={pagination}
        updatePage={(newPage) => setPage(newPage)}
      />
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentsPresentation;
