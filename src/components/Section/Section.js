import Link from 'next/link';

import styles from './Section.module.scss';

const Section = ({ children, title, buttonUrl, buttonText = 'View all' }) => (
  <section className={styles.section}>
    <h3 className={styles.title}>{title}</h3>
    {children}

    {buttonUrl && (
      <Link href={buttonUrl} className={styles.button}>
        {buttonText}
      </Link>
    )}
  </section>
);

export default Section;
