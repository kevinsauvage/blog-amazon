import Button from '../Button/Button';

import styles from './Section.module.scss';

const Section = ({ children, title, buttonUrl, buttonText = 'See more' }) => (
  <section className={styles.section}>
    <header>
      <span />
      <h3 className={styles.title}>{title}</h3>
      <span />
    </header>
    {children}

    {buttonUrl && <Button href={buttonUrl} text={buttonText} className={styles.button} />}
  </section>
);

export default Section;
