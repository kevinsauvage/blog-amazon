'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import IconIconSearch from '@/svg/IconIconSearch';

import Input from '../Input/Input';

import styles from './SearchForm.module.scss';

const SearchForm = ({ className }) => {
  const { push } = useRouter();
  const searchParameters = useSearchParams();
  const parameters = useParams();
  const [searchTerm, setSearchTerm] = useState(searchParameters.get('q') || '');

  const handleSearch = (input = '') => {
    if (input?.trim() === searchParameters.get('q')) return;
    const newParameters = new URLSearchParams([...searchParameters.entries()]);

    let path = '/search';
    if (parameters.categorySlug) path += `/${parameters.categorySlug}`;

    newParameters.set('q', input);
    push(`${path}?${newParameters}`, { shallow: true });
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
