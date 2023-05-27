import Button from '../Button/Button';

import styles from './Section.module.scss';

const Section = ({ children, title, buttonUrl, buttonText = 'See more' }) => (
  <section className={styles.section}>
    <header>
      <h3 className={styles.title}>{title}</h3>
      {buttonUrl && <Button href={buttonUrl} text={buttonText} />}
    </header>
    {children}
  </section>
);

export default Section;
