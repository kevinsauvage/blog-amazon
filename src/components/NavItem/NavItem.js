'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavItem.module.scss';

const NavItem = ({ href, label, className = '', activeClass = '' }) => {
  const pathname = usePathname();

  const url = `/${href || ''}`;

  return (
    <li className={styles.item}>
      <Link
        className={`${styles.link} ${className} ${pathname === url ? activeClass : ''}`}
        href={url}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
