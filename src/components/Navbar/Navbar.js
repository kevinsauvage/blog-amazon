import NavItem from '../NavItem/NavItem';

import styles from './Navbar.module.scss';

const navItems = [
  { href: '/', id: 1, label: 'Home' },
  { href: '/contact', id: 1, label: 'Contact' },
  { href: '/search', id: 2, label: 'Search' },
  { href: '/about', id: 2, label: 'About' },
];

const Navbar = () => (
  <nav className={styles.navbar}>
    <ul className={styles.list}>
      {navItems.map((item) => (
        <NavItem key={item.id} href={item.href} label={item.label} />
      ))}
    </ul>
  </nav>
);

export default Navbar;
