import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import listDots from '@public/image/list-dots.svg';

export default function MobileToListButton({ route }: { route: string }) {
  const [showBottom, setShowBottom] = useState(true);

  const handleScrollEvent = () => {
    if (window.scrollY === 0) {
      setShowBottom(true);
      return;
    }

    setShowBottom(false);
  };

  const handleClickEvent = () => {
    setShowBottom(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('click', handleClickEvent);
  }, []);

  if (!showBottom) return <></>;

  return (
    <div className='h-[5.8rem] z-40'>
      <div className={`fixed left-0 right-0 bottom-0 px-[3.2rem] py-[1.6rem] bg-gray1 flex}`}>
        <Link href={route}>
          <button className='st2 text-gray5 flex gap-[1rem] justify-center items-center'>
            <Image src={listDots} alt='목록 아이콘' height={20} width={20} />
            목록으로
          </button>
        </Link>
      </div>
    </div>
  );
}