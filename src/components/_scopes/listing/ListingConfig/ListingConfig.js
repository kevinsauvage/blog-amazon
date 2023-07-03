import Sorting from '../Sorting/Sorting';

import styles from './ListingConfig.module.scss';

const ListingConfig = ({ sorts }) => (
  <div className={styles.config}>{sorts && <Sorting sorts={sorts} />}</div>
);

export default ListingConfig;
