import { useEffect, useState } from 'react';

const useCarousel = (carouselReference, slidesReference, slideReference) => {
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translateStep, setTranslateStep] = useState(0);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const initialSlidesWidth = slidesReference.current.offsetWidth;

      console.log(
        '🚀 ~  file: useCarousel.js:12 ~  handleResize ~  initialSlidesWidth:',
        initialSlidesWidth
      );

      const initialSlideWidth = slideReference.current.offsetWidth;
      const initialContainerWidth = carouselReference.current.offsetWidth;

      console.log(
        '🚀 ~  file: useCarousel.js:17 ~  handleResize ~  initialContainerWidth:',
        initialContainerWidth
      );

      const visibleItems = Math.floor(initialContainerWidth / initialSlideWidth);

      setTranslateStep(visibleItems * initialSlideWidth);

      if (initialSlidesWidth > initialContainerWidth) {
        setMaxTranslate(initialSlidesWidth - initialContainerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [carouselReference, slideReference, slidesReference]);

  const handleNext = () => {
    const translateX = translate + translateStep;
    if (translateX > maxTranslate) setTranslate(maxTranslate);
    else setTranslate(translateX);
  };

  const handlePrevious = () => {
    const translateX = translate - translateStep;
    if (translateX < 0) setTranslate(0);
    else setTranslate(translateX);
  };
  return { handleNext, handlePrevious, maxTranslate, translate };
};

export default useCarousel;
