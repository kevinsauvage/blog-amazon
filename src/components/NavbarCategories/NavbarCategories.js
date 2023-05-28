import NavItem from '../NavItem/NavItem';

import styles from './NavbarCategories.module.scss';

const NavbarCategories = ({ categories }) => (
  <nav className={styles.navbar}>
    <ul className={styles.list}>
      {categories.map((category) => (
        <NavItem key={category.id} href={`/category/${category.slug}`} label={category.name} />
      ))}
    </ul>
  </nav>
);

export default NavbarCategories;
