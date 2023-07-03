'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import IconIconSearch from '@/svg/IconIconSearch';

import Input from '../Input/Input';

import styles from './SearchForm.module.scss';

const SearchForm = ({ className }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParameters.get('q'));

  const handleSearch = (input = '') => {
    if (input?.trim() === searchParameters.get('q')) return;
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.set('q', input);
    push(`${pathname}?${newParameters}`, { shallow: true });
  };

  const handleInputChange = ({ value }) => setSearchTerm(value);

  return (
    <div className={`${styles.search} ${className || ''}`}>
      <form
        className={styles.form}
        title="Search"
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
          placeholder="Searh..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchForm;
