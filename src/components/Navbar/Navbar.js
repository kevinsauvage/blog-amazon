import styles from './Navbar.module.scss';

const Navbar = ({ children, title, variant = 'column' }) => {
  const getStyles = () => {
    if (variant === 'row') return styles.row;
    return styles.column;
  };
  return (
    <nav className={`${styles.navbar} ${getStyles()}`}>
      {title && <p className={styles.title}>{title}</p>}
      <ul className={styles.list}>{children}</ul>
    </nav>
  );
};

export default Navbar;
