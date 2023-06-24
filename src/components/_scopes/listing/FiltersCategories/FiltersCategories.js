import Select from '../../../Select/Select';

const FiltersCategories = ({ categories }) => (
  <Select
    label="Filter by category"
    queryKey="categories"
    resetPage
    unique={false}
    options={categories.map(({ label, slug, id }) => ({ id, label, slug }))}
  />
);

export default FiltersCategories;
