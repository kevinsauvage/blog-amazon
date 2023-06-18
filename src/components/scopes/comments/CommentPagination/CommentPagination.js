import styles from './CommentPagination.module.scss';

const CommentPagination = ({ comments, step = 3, updateCallback, visible }) => {
  const updateVisible = (newStep) => {
    if (newStep > comments.length) return updateCallback(comments.length);
    updateCallback(newStep);
  };

  if (comments?.length > visible || visible > step) {
    return (
      <div className={styles.buttons}>
        <button
          disabled={visible === step}
          className={styles.seeLess}
          type="button"
          onClick={() => updateVisible(step)}
        >
          See less
        </button>
        <button
          disabled={visible >= comments.length}
          className={styles.seeMore}
          type="button"
          onClick={() => updateVisible((previous) => previous + 2)}
        >
          See more
        </button>
      </div>
    );
  }
};

export default CommentPagination;
