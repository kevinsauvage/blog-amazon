import Select from '../Select/Select';

import styles from './sorting.module.scss';

const Sorting = ({ sorts }) => (
  <div className={styles.sorting}>
    <Select
      label="Sort by"
      queryKey="sorting"
      options={sorts.map(({ label, query, id }) => ({ id, label, slug: query }))}
    />
  </div>
);

export default Sorting;
