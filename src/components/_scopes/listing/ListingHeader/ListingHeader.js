import Nav from '@/components/Nav/Nav';

import Sorting from '../Sorting/Sorting';
import TotalFound from '../TotalFound/TotalFound';

import styles from './ListingHeader.module.scss';

const ListingHeader = ({ totalPosts, sorts, menu = [] }) => (
  <div className={styles.header}>
    <TotalFound total={totalPosts} />
    {Array.isArray(menu?.items) && (
      <div>
        <Nav
          variant="row"
          menu={menu?.items}
          itemActiveClass={styles.itemActive}
          itemClass={styles.item}
        />
      </div>
    )}
    <Sorting sorts={sorts} />
  </div>
);

export default ListingHeader;
