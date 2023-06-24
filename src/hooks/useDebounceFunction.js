import { useRef } from 'react';

const useDebounceFunction = (function_, delay) => {
  const timeoutReference = useRef(null);

  return (...arguments_) => {
    clearTimeout(timeoutReference.current);

    timeoutReference.current = setTimeout(() => {
      function_(...arguments_);
    }, delay);
  };
};

export default useDebounceFunction;
