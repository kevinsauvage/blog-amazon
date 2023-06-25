'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useDebounceFunction from '@/hooks/useDebounceFunction';
import IconIconSearch from '@/svg/IconIconSearch';

import Input from '../Input/Input';

import styles from './SearchForm.module.scss';

const SearchForm = ({ query, className }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(query);

  const handleSearch = (input = '') => {
    if (input?.trim() === query) return;
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.set('q', input);
    push(`${pathname}?${newParameters}`);
  };
  const debouncedSearch = useDebounceFunction(handleSearch, 300);

  const handleInputChange = ({ value }) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className={`${styles.search} ${className || ''}`}>
      <form
        className={styles.form}
        title="Search a post"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch(searchTerm);
        }}
      >
        <IconIconSearch className={styles.iconSearch} />
        <Input
          id="searchInput"
          type="text"
          name="input"
          title="input"
          placeholder="Searh a post..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchForm;
