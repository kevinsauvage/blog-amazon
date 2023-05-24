'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavItem.module.scss';

const NavItem = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <li className={`${styles.item} ${pathname === href ? styles.active : ''}`}>
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default NavItem;
