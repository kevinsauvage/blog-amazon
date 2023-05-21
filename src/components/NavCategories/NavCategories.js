'use client';

import Link from 'next/link';

import Carousel from '../Carousel/Carousel';

import styles from './NavCatagories.module.scss';

const NavCategories = ({ categories }) => (
  <nav className={styles.nav}>
    <Carousel>
      {categories.map((category) => (
        <div
          key={category.id}
          className={styles.item}
          style={{ backgroundColor: category.acf.background_color }}
        >
          <Link href={`/category/${category.slug}_${category.id}`}>{category.name}</Link>
          {console.log(category.name)}
        </div>
      ))}
    </Carousel>
  </nav>
);

export default NavCategories;
