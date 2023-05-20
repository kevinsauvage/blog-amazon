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
      <div className={styles.logo}>
        <Link href="/">
          <strong>Bloglytics</strong>
        </Link>
      </div>
      <ul className={styles.list}>
        {navItems.map((item) => (
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
