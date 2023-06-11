'use client';

import { useEffect, useState } from 'react';

import styles from './ScrollTopButton.module.scss';

const handleClick = () => window.scrollTo({ behavior: 'smooth', top: 0 });

const ScrollTopButton = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => setShow(window.scrollY > window.screen.height);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="scroll to the top of the page"
      className={`${styles.button} ${show ? styles.visible : ''}`}
      onClick={handleClick}
    >
      <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
        <path d="M16 8A8 8 0 100 8a8 8 0 0016 0zm-7.5 3.5a.5.5 0 01-1 0V5.707L5.354 7.854a.5.5 0 11-.708-.708l3-3a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8.5 5.707V11.5z" />
      </svg>
    </button>
  );
};

export default ScrollTopButton;
