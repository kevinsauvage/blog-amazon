'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import IconChevronDown from '@/svg/IconChevronDown';
import IconChevronUp from '@/svg/IconChevronUp';

import styles from './Select.module.scss';

const Select = ({ label, options, queryKey, unique = true, resetPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const [selectedOption, setSelectedOption] = useState(() => {
    const actualParameters = searchParameters.getAll(queryKey);
    if (actualParameters?.length > 0) return actualParameters;
    return unique ? [options[0]?.slug] : [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const containerReference = useRef(null);
  const optionsListReference = useRef(null);

  const handleOptionClick = (value) => {
    const parameters = new URLSearchParams(searchParameters);
    const currentValues = parameters.getAll(queryKey);
    const isValueIncluded = currentValues.includes(value);
    if (resetPage) parameters.set('page', 1);

    if (unique) {
      setIsOpen(false);
      parameters.set(queryKey, value);
      setSelectedOption([value]);
      return router.push(`${pathname}?${parameters.toString()}`);
    }

    const updatedValues = isValueIncluded
      ? currentValues.filter((value_) => value_ !== value)
      : [...currentValues, value];

    parameters.delete(queryKey);
    updatedValues.forEach((value_) => parameters.append(queryKey, value_));
    setSelectedOption(updatedValues);
    router.push(`${pathname}?${parameters.toString()}`);
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
      {label && <label htmlFor={label}>{label}</label>}
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
        <div className={styles.selectedOption} aria-label="Select an option" role="button">
          {!unique && selectedOption.length > 1
            ? `${selectedOption.length} selected`
            : options.find((option) => selectedOption.includes(option.slug))?.label || label}

          {isOpen ? <IconChevronUp /> : <IconChevronDown />}
        </div>
        {isOpen && (
          <ul
            className={styles.optionsList}
            id="options-list"
            ref={optionsListReference}
            role="listbox"
          >
            {Array.isArray(options) &&
              options.map((option) => {
                const { id, slug: optionSlug, label: optionLabel } = option;
                return (
                  <li
                    key={id}
                    value={optionSlug}
                    onKeyDown={handleKeyDown}
                    onClick={() => handleOptionClick(optionSlug)}
                    className={`${styles.option} ${
                      selectedOption.includes(optionSlug) ? styles.selected : ''
                    }`}
                    role="option"
                    tabIndex="0"
                    aria-selected={false}
                  >
                    {optionLabel}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
