import { useEffect, useState } from 'react';

const useCarousel = (carouselReference, slidesReference, slideReference) => {
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translateStep, setTranslateStep] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();

  useEffect(() => {
    const handleResize = () => {
      const initialSlidesWidth = slidesReference.current.offsetWidth;
      const initialSlideWidth = slideReference.current.offsetWidth;
      const initialContainerWidth = carouselReference.current.offsetWidth;
      const totalVisibleItems = Math.floor(initialContainerWidth / initialSlideWidth);
      setTranslateStep(totalVisibleItems * initialSlideWidth);

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

  // SLIDER
  const handleTouchStart = (event) => setTouchStart(event.targetTouches[0].clientX);

  const handleTouchMove = (event) => setTouchEnd(event.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) handleNext();
    if (touchStart - touchEnd < -100) handlePrevious();
  };

  return {
    handleNext,
    handlePrevious,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    maxTranslate,
    translate,
  };
};

export default useCarousel;
