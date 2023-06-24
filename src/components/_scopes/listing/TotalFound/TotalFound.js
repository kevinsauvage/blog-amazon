import styles from './TotalFound.module.scss';

const TotalFound = ({ total }) => (
  <span className={styles.totalFound}>
    {total} {total > 1 ? 'posts' : 'post'}
  </span>
);

export default TotalFound;
