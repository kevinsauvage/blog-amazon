import Pagination from '@/components/Pagination/Pagination';

import Comment from '../Comment/Comment';

import styles from './Comments.module.scss';

const Comments = ({ comments, postId, pagination, updatePage }) => (
  <div className={styles.comments}>
    <h4 className={styles.title}>Comments ({pagination.total})</h4>
    <div>
      {Array.isArray(comments) && comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={postId} />
          ))}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pageCount}
            handleUpdate={updatePage}
          />
        </div>
      ) : (
        <p>There is no comment to show</p>
      )}
    </div>
  </div>
);

export default Comments;
