import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { bottomBtnVisibleStore } from '@stores/mobile/bottomBtnVisibleStore';

import useShowByScroll from '@hooks/useShowByScroll';

import listDots from '@public/image/list-dots.svg';

export default function MobileToListButton({ route }: { route: string }) {
  const { setIsVisibleBottomBtn } = bottomBtnVisibleStore();
  const { showBottom } = useShowByScroll();

  useEffect(() => {
    setIsVisibleBottomBtn(showBottom);
  }, [showBottom]);

  if (!showBottom) return <></>;

  return (
    <div className='fixed h-[5.8rem] z-40'>
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
