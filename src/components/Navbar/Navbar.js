'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import styles from './Navbar.module.scss';

const Navbar = ({ categories }) => {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={`${styles.item} ${activeSegment === null ? styles.active : ''}`}>
          <Link href="/">Home</Link>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`${styles.item} ${activeSegment === category.name ? styles.active : ''}`}
          >
            <Link href={`/category/${category.slug}_${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
