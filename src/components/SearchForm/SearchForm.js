'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './SearchForm.module.scss';

const SearchForm = ({ query }) => {
  const [input, setInput] = useState('');
  const { push } = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === query) return;
    push(`/search?q=${input}`);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input placeholder="Search..." type="search" value={input} onChange={handleChange} />
    </form>
  );
};

export default SearchForm;
