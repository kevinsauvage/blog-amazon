import ListingConfig from '../ListingConfig/ListingConfig';
import TotalFound from '../TotalFound/TotalFound';

import styles from './ListingHeader.module.scss';

const ListingHeader = ({ totalPosts, sorts, menu = [] }) => (
  <div className={styles.header}>
    <TotalFound total={totalPosts} />
    {Array.isArray(menu?.items) && (
      <ul className={styles.menu}>
        {menu.items.map((menuItem) => (
          <li key={menuItem.id}>{menuItem?.label}</li>
        ))}
      </ul>
    )}
    <ListingConfig sorts={sorts} />
  </div>
);

export default ListingHeader;
