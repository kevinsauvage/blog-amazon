'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const usePreserveScroll = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollPositions = useRef({});
  const isBack = useRef(false);

  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true;
      return true;
    });

    const onRouteChangeStart = () => {
      const url = pathname;
      scrollPositions.current[url] = window.scrollY;
    };

    const onRouteChangeComplete = (url) => {
      if (isBack.current && scrollPositions.current[url]) {
        window.scroll({
          behavior: 'auto',
          top: scrollPositions.current[url],
        });
      }

      isBack.current = false;
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router, pathname]);
};

export default usePreserveScroll;
