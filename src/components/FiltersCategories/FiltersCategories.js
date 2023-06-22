import Select from '../Select/Select';

import styles from './FiltersCategories.module.scss';

const FiltersCategories = ({ categories }) => (
  <div className={styles.categories}>
    <Select
      label="Filter by category"
      queryKey="category"
      options={[
        { id: 'all', label: 'All', slug: '' },
        ...categories.map(({ label, slug, id }) => ({ id, label, slug })),
      ]}
    />
  </div>
);

export default FiltersCategories;
