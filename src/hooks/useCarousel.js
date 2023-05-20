import { useEffect, useState } from 'react';

const useCarousel = (carouselReference, slideReference) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const initialSlideWidth = slideReference.current.offsetWidth;
      const initialContainerWidth = carouselReference.current.offsetWidth;
      setContainerWidth(initialContainerWidth);
      setMaxTranslate((initialContainerWidth - initialSlideWidth) * -1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [carouselReference, slideReference]);

  const handleNext = () => {
    const translateX = translate + containerWidth;
    if (translateX > maxTranslate) setTranslate(maxTranslate);
    else setTranslate(translateX);
  };

  const handlePrevious = () => {
    const translateX = translate - containerWidth;
    if (translateX < 0) setTranslate(0);
    else setTranslate(translateX);
  };
  return { handleNext, handlePrevious, maxTranslate, translate };
};

export default useCarousel;
