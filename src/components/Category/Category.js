import Link from 'next/link';

import styles from './Category.module.scss';

const Category = ({ category }) => (
  <Link
    href={`/category/${category.slug}`}
    className={styles.category}
    style={{ backgroundColor: category.acf?.background_color }}
  >
    <span>{category.name}</span>
  </Link>
);

export default Category;
