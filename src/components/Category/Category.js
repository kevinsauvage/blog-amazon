import Link from 'next/link';

import routes from '@/utils/routes';

import styles from './Category.module.scss';

const Category = ({ category }) => (
  <Link
    href={`${routes.posts}/${category?.slug}`}
    className={styles.category}
    style={{ backgroundColor: category?.color }}
  >
    {category?.label}
  </Link>
);

export default Category;
