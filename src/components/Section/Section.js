import styles from './Section.module.scss';

const Section = ({ children, title }) => (
  <section className={styles.section}>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </section>
);

export default Section;
