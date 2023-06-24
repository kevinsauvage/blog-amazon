import FiltersCategories from '../FiltersCategories/FiltersCategories';
import Sorting from '../Sorting/Sorting';

import styles from './ListingConfig.module.scss';

const ListingConfig = ({ sorts, categories }) => (
  <div className={styles.config}>
    {categories && <FiltersCategories categories={categories} />}
    {sorts && <Sorting sorts={sorts} />}
  </div>
);

export default ListingConfig;
