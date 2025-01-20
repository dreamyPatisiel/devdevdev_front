import { AnimatePresence, motion } from 'framer-motion';

import { useEffect } from 'react';

import Image from 'next/image';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';

import ErrorExclamationCircle from '@public/image/exclamation-circle-red.svg';
import ExclamationCircle from '@public/image/exclamation-circle.svg';

export default function Toast() {
  const isMobile = useIsMobile();
  const {
    isToastVisible,
    toastMessage,
    setToastInvisible,
    toastType,
    toastIcon,
    toastMessageColor,
  } = useToastVisibleStore();

  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(() => {
        setToastInvisible();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isToastVisible]);

  const showToast = () => {
    return (
      <motion.div
        key={'toast-modal'}
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <div className='flex items-center justify-center'>
          <div className={`${isMobile ? 'fixed' : 'fixed right-1/2 translate-x-1/2'} z-10`}>
            <div
              className={`${isMobile ? 'px-[1.4rem]' : 'px-[2rem]'} bg-gray500 p1 py-[1rem] rounded-[1.2rem] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)]`}
            >
              <p
                className={`${toastType === 'error' ? 'text-red200' : toastMessageColor ?? 'text-secondary400'}
                flex items-center gap-[1.4rem] font-bold`}
              >
                {toastType === 'error' ? (
                  <Image src={ErrorExclamationCircle} alt='토스트 에러 알림 아이콘' />
                ) : (
                  <Image src={toastIcon ?? ExclamationCircle} alt={'토스트 알림 아이콘'} />
                )}
                {toastMessage}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return <AnimatePresence>{isToastVisible && showToast()}</AnimatePresence>;
}
