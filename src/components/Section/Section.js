import Button from '../Button/Button';

import styles from './Section.module.scss';

const Section = ({ children, title, buttonUrl, buttonText = 'View all' }) => (
  <section className={styles.section}>
    <h3 className={styles.title}>{title}</h3>
    {children}

    {buttonUrl && <Button href={buttonUrl} text={buttonText} className={styles.button} />}
  </section>
);

export default Section;
