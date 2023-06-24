import ListingConfig from '../ListingConfig/ListingConfig';
import TotalFound from '../TotalFound/TotalFound';

import styles from './ListingHeader.module.scss';

const ListingHeader = ({ totalPosts, sorts, categories }) => (
  <div className={styles.header}>
    <TotalFound total={totalPosts} />
    <ListingConfig sorts={sorts} categories={categories} />
  </div>
);

export default ListingHeader;
