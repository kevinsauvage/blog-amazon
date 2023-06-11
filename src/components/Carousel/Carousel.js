'use client';

import { Children, useRef } from 'react';

import useCarousel from '@/hooks/useCarousel';
import IconChevronBackOutline from '@/svg/IconChevronBackOutline';
import IconChevronForwardOutline from '@/svg/IconChevronForwardOutline';

import styles from './Carousel.module.scss';

const Carousel = ({ children, slideClass, itemToShow }) => {
  const slideReference = useRef(null);

  const {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    page,
    updateActive,
    childrensCount,
    translate,
    maxTranslate,
  } = useCarousel(children, itemToShow, slideReference);

  return (
    <div className={styles.container}>
      <div
        className={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <ul
          className={styles.slides}
          style={{
            transform:
              translate === maxTranslate
                ? `translateX(-${translate}px)`
                : `translateX(-${page * 100}%)`,
          }}
        >
          {Children.toArray(
            children.map((child) => (
              <li
                id="slide"
                ref={slideReference}
                style={{
                  width: `${100 / itemToShow}%`,
                }}
                className={`${styles.slide} ${slideClass}`}
              >
                {child}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          disabled={page === 0}
          className={styles['prev-button']}
          onClick={() => updateActive(page - 1)}
          aria-label="Previous"
        >
          <IconChevronBackOutline />
        </button>
        <button
          type="button"
          disabled={page + 1 >= childrensCount / itemToShow}
          className={styles['next-button']}
          onClick={() => updateActive(page + 1)}
          aria-label="Next"
        >
          <IconChevronForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
