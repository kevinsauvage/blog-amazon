import Select from '../../../Select/Select';

const Sorting = ({ sorts }) => (
  <Select
    queryKey="sorting"
    options={sorts.map(({ label, query, id }) => ({ id, label, slug: query }))}
  />
);

export default Sorting;
