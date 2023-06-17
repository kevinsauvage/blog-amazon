import Link from 'next/link';

import styles from './Category.module.scss';

const Category = ({ category }) => (
  <Link
    href={`/category/${category?.slug}`}
    className={styles.category}
    style={{ backgroundColor: category?.color }}
  >
    {category?.label}
  </Link>
);

export default Category;
