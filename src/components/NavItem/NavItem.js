'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavItem.module.scss';

const NavItem = ({ href, label, className = '', activeClass = '', isActive }) => {
  const pathname = usePathname();

  const getUrl = () => {
    if (!href) return '/';
    if (href.charAt(0) === '/') return href;
    return `/${href}`;
  };

  return (
    <li className={styles.item}>
      <Link
        className={`${styles.link} ${className} ${
          pathname === getUrl() || isActive ? activeClass : ''
        }`}
        href={getUrl()}
        scroll={false}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
