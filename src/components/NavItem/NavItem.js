'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavItem.module.scss';

const NavItem = ({ href, label }) => {
  const pathname = usePathname();

  const url = `/${href || ''}`;

  return (
    <li className={`${styles.item} ${pathname === url?.split('?')?.[0] ? styles.active : ''}`}>
      <Link href={url}>{label}</Link>
    </li>
  );
};

export default NavItem;
