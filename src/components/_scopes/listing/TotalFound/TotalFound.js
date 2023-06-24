import styles from './TotalFound.module.scss';

const TotalFound = ({ total }) => (
  <div className={styles.totalFound}>
    <p className={styles.label}>Total: </p>
    <p>
      {total} {total > 1 ? ' posts' : ' post'}
    </p>
  </div>
);

export default TotalFound;
