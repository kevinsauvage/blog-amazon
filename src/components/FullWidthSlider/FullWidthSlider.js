'use client';

import { Children, useCallback, useState } from 'react';

import IconChevronBackOutline from '@/svg/IconChevronBackOutline';
import IconChevronForwardOutline from '@/svg/IconChevronForwardOutline';

import styles from './FullWidthSlider.module.scss';

const FullWidthSlider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const childrensCount = Children.count(children);

  // PAGE CHANGE
  const updateActive = useCallback(
    (newIndex) => {
      setTouchEnd();
      setTouchStart();
      if (newIndex < 0) setPage(childrensCount / 1 - 1);
      else if (newIndex >= childrensCount / 1) setPage(0);
      else setPage(newIndex);
    },
    [childrensCount]
  );

  // SLIDER
  const handleTouchStart = (event) => setTouchStart(event.targetTouches[0].clientX);

  const handleTouchMove = (event) => setTouchEnd(event.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) updateActive(page + 1);
    if (touchStart - touchEnd < -100) updateActive(page - 1);
  };

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <ul className={`${styles.slides} `} style={{ transform: `translateX(-${page * 100}%)` }}>
        {Children.toArray(children.map((child) => <li className={`${styles.slide}`}>{child}</li>))}
      </ul>
      <button
        type="button"
        className={`${styles['prev-button']} `}
        onClick={() => updateActive(page - 1)}
      >
        <IconChevronBackOutline />
      </button>
      <button
        type="button"
        className={`${styles['next-button']}`}
        onClick={() => updateActive(page + 1)}
      >
        <IconChevronForwardOutline />
      </button>
    </div>
  );
};

export default FullWidthSlider;
