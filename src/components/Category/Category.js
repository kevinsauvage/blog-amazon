import Link from 'next/link';

import styles from './Category.module.scss';

const Category = ({ category }) => (
  <Link
    href={`/category/${category.slug}`}
    className={styles.category}
    style={{ backgroundColor: category.acf?.background_color }}
  >
    {category.name}
  </Link>
);

export default Category;
