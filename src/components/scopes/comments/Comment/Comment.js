import Date from '@/components/Date/Date';
import { formatString } from '@/utils/strings';

import styles from './Comment.module.scss';

const Comment = ({ comment = {} }) => {
  const { content, createdAt, author, blocked, blockReason } = comment;
  const { name } = author;

  return (
    <div className={styles.comment}>
      {blocked ? (
        <p>Comment has been blocked: {blockReason}</p>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.meta}>
              <p className={styles.name}>{formatString(name)}</p>
              <Date date={createdAt} includeTime />
            </div>
          </div>

          <div className={styles.content}>{content}</div>
        </>
      )}
    </div>
  );
};

export default Comment;
