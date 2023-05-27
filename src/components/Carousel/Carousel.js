'use client';

import { Children, useRef } from 'react';

import useCarousel from '@/hooks/useCarousel';
import IconChevronBackOutline from '@/svg/IconChevronBackOutline';
import IconChevronForwardOutline from '@/svg/IconChevronForwardOutline';

import styles from './Carousel.module.scss';

const Carousel = ({ children, slideClass }) => {
  const carouselReference = useRef(null);
  const slidesReference = useRef(null);
  const slideReference = useRef(null);

  const { handleNext, handlePrevious, maxTranslate, translate } = useCarousel(
    carouselReference,
    slidesReference,
    slideReference
  );

  return (
    <div className={styles.container}>
      <div className={styles.carousel} ref={carouselReference}>
        <ul
          className={styles.slides}
          ref={slidesReference}
          style={{ transform: `translateX(-${translate}px)` }}
        >
          {Children.toArray(
            children.map((child) => (
              <li ref={slideReference} className={`${styles.slide} ${slideClass}`}>
                {child}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          disabled={translate === 0}
          className={styles['prev-button']}
          onClick={handlePrevious}
        >
          <IconChevronBackOutline />
        </button>
        <button
          type="button"
          disabled={translate >= maxTranslate}
          className={styles['next-button']}
          onClick={handleNext}
        >
          <IconChevronForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
