import { Children, useCallback, useEffect, useState } from 'react';

const useCarousel = (children, itemToShow, slideReference) => {
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const childrensCount = Children.count(children);

  useEffect(() => {
    const handleResize = () => {
      const initialSlideWidth = slideReference.current.offsetWidth;
      setItemWidth(initialSlideWidth);
      setMaxTranslate(initialSlideWidth * (childrensCount - itemToShow));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slideReference, itemToShow, childrensCount]);

  const updateActive = useCallback(
    (newIndex) => {
      setTouchEnd();
      setTouchStart();
      if (newIndex < 0) return;
      if (newIndex > childrensCount / itemToShow) return;
      if (newIndex * (itemToShow * itemWidth) > maxTranslate) setTranslate(maxTranslate);
      else setTranslate(newIndex * (itemToShow * itemWidth));
      setPage(newIndex);
    },
    [childrensCount, itemToShow, itemWidth, maxTranslate]
  );

  const handleTouchStart = (event) => setTouchStart(event.targetTouches[0].clientX);

  const handleTouchMove = (event) => setTouchEnd(event.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) updateActive(page + 1);
    if (touchStart - touchEnd < -100) updateActive(page - 1);
  };

  return {
    childrensCount,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    maxTranslate,
    page,
    translate,
    updateActive,
  };
};

export default useCarousel;
