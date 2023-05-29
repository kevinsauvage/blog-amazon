import styles from './Navbar.module.scss';

const Navbar = ({ children, title }) => (
  <nav className={styles.navbar}>
    {title && <p className={styles.title}>{title}</p>}
    <ul className={styles.list}>{children}</ul>
  </nav>
);

export default Navbar;
