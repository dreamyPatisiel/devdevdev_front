import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

type ClickCounterHookReturnType = [number, Dispatch<SetStateAction<number>>];

export default function useClickCounter({
  maxCount,
  threshold,
}: {
  maxCount: number;
  threshold: number;
}): ClickCounterHookReturnType {
  const [clickCount, setClickCount] = useState(0);
  const { setToastVisible, setToastInvisible } = useToastVisibleStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (clickCount > maxCount) {
      setToastVisible({
        message: '요청이 너무 많아요!  잠시 후에 다시 시도해주세요',
        type: 'error',
      });
      setClickCount(0);
    } else {
      timer = setTimeout(() => {
        setClickCount(0);
      }, threshold);
    }
    return () => clearTimeout(timer);
  }, [clickCount, maxCount, threshold]);

  return [clickCount, setClickCount];
}
