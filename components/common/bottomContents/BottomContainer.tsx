import { ReactNode, useEffect } from 'react';

export default function BottomContainer({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed z-[70] inset-0'>
      <div className='absolute inset-0 bg-black bg-opacity-50 ' onClick={() => onClose()}>
        <div className='fixed bg-gray700 left-0 right-0 w-full bottom-0  rounded-t-[2.4rem] px-[2rem] py-[4rem] flex flex-col gap-[1.2rem]'>
          {children}
        </div>
      </div>
    </div>
  );
}
