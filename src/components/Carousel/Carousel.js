'use client';

import { Children, useRef } from 'react';

import useCarousel from '@/hooks/useCarousel';

import styles from './Carousel.module.scss';

const Carousel = ({ children }) => {
  const carouselReference = useRef(null);
  const slideReference = useRef(null);

  const { handleNext, handlePrevious, maxTranslate, translate } = useCarousel(
    carouselReference,
    slideReference
  );

  return (
    <div className={styles.carousel} ref={carouselReference}>
      <ul
        className={styles.slides}
        ref={slideReference}
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {Children.toArray(children.map((child) => <li className={styles.slide}>{child}</li>))}
      </ul>
      <button
        type="button"
        disabled={translate === 0}
        className={styles['prev-button']}
        onClick={handlePrevious}
      >
        {'<'}
      </button>
      <button
        type="button"
        disabled={translate === maxTranslate}
        className={styles['next-button']}
        onClick={handleNext}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
