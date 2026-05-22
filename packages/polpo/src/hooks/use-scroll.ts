import { useEffect, useRef, useState } from 'react';

export const useScroll = () => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    const element = ref.current;

    const handleScroll = () => {
      if (!element) return;

      setPosition([element.scrollLeft, element.scrollTop]);
    };

    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return {
    ref,
    position,
  };
};
