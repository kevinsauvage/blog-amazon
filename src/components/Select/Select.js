'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { createQueryString } from '@/utils/url';

import styles from './Select.module.scss';

const Select = ({ label, options, queryKey }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const [selectedOption, setSelectedOption] = useState(() => {
    const querySelected = options.find((option) => searchParameters.get(queryKey) === option.slug);
    if (querySelected?.slug) return querySelected.slug;
    return options[0]?.slug;
  });
  const [isOpen, setIsOpen] = useState(false);
  const containerReference = useRef(null);
  const optionsListReference = useRef(null);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    const path = `${pathname}?${createQueryString(
      { page: 1, [queryKey]: value },
      searchParameters
    )}`;
    router.push(path);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Space': {
        if (isOpen) {
          event.preventDefault();
          const focusedOption = document.activeElement;
          handleOptionClick(focusedOption.getAttribute('value'));
        } else {
          setIsOpen(true);
        }
        break;
      }
      case 'Escape': {
        setIsOpen(false);
        containerReference.current.focus();
        break;
      }
      case 'ArrowDown': {
        if (isOpen) {
          event.preventDefault();
          const focusedOption = document.activeElement;
          const nextOption = focusedOption.nextElementSibling;
          if (nextOption) nextOption.focus();
        }
        break;
      }
      case 'ArrowUp': {
        if (isOpen) {
          event.preventDefault();
          const focusedOption = document.activeElement;
          const previousOption = focusedOption.previousElementSibling;
          if (previousOption) previousOption.focus();
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleClickOutside = (event) => {
    if (containerReference.current && !containerReference.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.select} ref={containerReference}>
      <label htmlFor={label}>{label}</label>
      <div
        className={`${styles.dropDown} ${isOpen ? styles.open : ''}`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="options-list"
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex="0"
      >
        <div
          className={styles.selectedOption}
          aria-label={selectedOption ? 'Selected option' : 'Select an option'}
          role="button"
        >
          {selectedOption
            ? options.find((option) => option.slug === selectedOption)?.label
            : options[0]?.label}
        </div>
        {isOpen && (
          <ul
            className={styles.optionsList}
            id="options-list"
            ref={optionsListReference}
            role="listbox"
          >
            {options
              .filter((item) => item.slug !== selectedOption)
              .map((option) => (
                <li
                  key={option.id}
                  value={option.slug}
                  onKeyDown={handleKeyDown}
                  onClick={() => handleOptionClick(option.slug)}
                  className={`${styles.option} ${
                    option.slug === selectedOption ? styles.selected : ''
                  }`}
                  role="option"
                  tabIndex="0"
                  aria-selected={false}
                >
                  {option.label}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
