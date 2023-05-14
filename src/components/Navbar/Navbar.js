'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import styles from './Navbar.module.scss';

const navItems = [
  // eslint-disable-next-line unicorn/no-null
  { href: '/', id: 1, label: 'Home', targetSegment: null },
  { href: '/contact', id: 2, label: 'Contact', targetSegment: 'contact' },
  { href: '/archive', id: 3, label: 'Archive', targetSegment: 'archive' },
  { href: '/search', id: 4, label: 'Search', targetSegment: 'search' },
];

const Navbar = () => {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.left}>
        {navItems.slice(0, 2).map((item) => (
          <li
            key={item.id}
            className={`${styles.item} ${
              activeSegment === item.targetSegment ? styles.active : ''
            }`}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.middle}>
        <Link href="/">
          <h1>My Blog</h1>
        </Link>
      </div>
      <ul className={styles.right}>
        {navItems.slice(2, 4).map((item) => (
          <li
            key={item.id}
            className={`${styles.item} ${
              activeSegment === item.targetSegment ? styles.active : ''
            }`}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
