import styles from './PostSkeleton.module.scss';

const PostSkeleton = () => (
  <article className={styles.post}>
    <div className={styles.skeletonImage} />
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.skeletonCategory} />
        <div className={styles.skeletonDate} />
        <div className={styles.skeletonViews} />
      </div>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonExcerpt} />
      <div className={styles.skeletonExcerpt} />
      <div className={styles.skeletonExcerpt} />
      <div className={styles.skeletonExcerpt} />
    </div>
  </article>
);

export default PostSkeleton;
