'use client';

import { useRouter } from 'next/navigation';

import useForm from '@/hooks/useForm';

import Input from '../Input/Input';

import styles from './SearchForm.module.scss';

const SearchForm = ({ query }) => {
  const { push } = useRouter();

  const handleSubmitCallback = ({ input }) => {
    if (input === query) return;
    push(`/posts?q=${input}`);
  };

  const { formData, handleInputChange, handleSubmit } = useForm(handleSubmitCallback, {
    input: query,
  });

  return (
    <form onSubmit={handleSubmit} className={styles.form} title="Search a post">
      <Input
        id="searchInput"
        type="text"
        name="input"
        title="input"
        placeholder="Searh a post..."
        value={formData.input}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchForm;
