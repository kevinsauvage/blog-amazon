import NavItem from './NavItem';

import styles from './Navbar.module.scss';

const Navbar = ({ categories }) => (
  <nav className={styles.navbar}>
    <ul className={styles.list}>
      <NavItem href="/" label="Home" />
      {categories.map((category) => (
        <NavItem key={category.id} href={`/category/${category.slug}`} label={category.name} />
      ))}
    </ul>
  </nav>
);

export default Navbar;
