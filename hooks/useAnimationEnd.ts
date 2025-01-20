import { RefObject, useEffect } from 'react';

export const useAnimationEnd = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  useEffect(() => {
    const handleAnimationEnd = () => {
      if (ref.current) {
        ref.current.style.backgroundImage = 'none';
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, []);
};
