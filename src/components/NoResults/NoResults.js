import styles from './NoResults.module.scss';

const NoResults = ({ title, subtitle, description }) => (
  <div className={styles.noResults}>
    <h2 className={styles.title}>{title}</h2>
    <h3 className={styles.subtitle}>{subtitle}</h3>
    <p className={styles.description}>{description}</p>
  </div>
);

export default NoResults;
