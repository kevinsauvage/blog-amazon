import ListingConfig from '../ListingConfig/ListingConfig';
import TotalFound from '../TotalFound/TotalFound';

import styles from './ListingHeader.module.scss';

const ListingHeader = ({ totalPosts, sorts }) => (
  <div className={styles.header}>
    <TotalFound total={totalPosts} />
    <ListingConfig sorts={sorts} />
  </div>
);

export default ListingHeader;
