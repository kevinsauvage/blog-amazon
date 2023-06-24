import FiltersCategories from '../FiltersCategories/FiltersCategories';
import Sorting from '../Sorting/Sorting';

import styles from './ListingConfig.module.scss';

const ListingConfig = ({ sorts, categories }) => (
  <div className={styles.config}>
    {sorts && <Sorting sorts={sorts} />}
    {categories && <FiltersCategories categories={categories} />}
  </div>
);

export default ListingConfig;
