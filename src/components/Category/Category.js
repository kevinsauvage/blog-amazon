import styles from './Category.module.scss';

const Category = ({ category }) => (
  <div className={styles.category} style={{ backgroundColor: category.acf?.background_color }}>
    {category.name}
  </div>
);

export default Category;
