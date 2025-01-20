import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import ThreeballButton from '@public/image/pickpickpick/ellipsis-v.svg';
import SmallThreeballButton from '@public/image/smallThreeball.svg';

import BottomButton from './bottomContents/BottomButton';
import BottomContainer from './bottomContents/BottomContainer';

interface MoreButtonProps {
  type?: 'default' | 'small';
  moreButtonList: {
    buttonType: string;
    moreButtonOnclick?: () => void;
  }[];
}

export default function MoreButton({ moreButtonList, type = 'default' }: MoreButtonProps) {
  const [onMoreButton, setMoreButton] = useState(false);
  const moreButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreButtonRef.current && !moreButtonRef.current.contains(e.target as Node)) {
        setMoreButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [moreButtonRef]);

  const isMobile = useIsMobile();

  const MobileContents = (
    <BottomContainer onClose={() => setMoreButton(false)}>
      {moreButtonList &&
        moreButtonList.map((menuItem, index) => (
          <BottomButton
            text={menuItem.buttonType}
            onClick={menuItem.moreButtonOnclick}
            key={index}
            className={`${menuItem.buttonType?.includes('삭제') ? 'text-red300' : ''}`}
          />
        ))}
    </BottomContainer>
  );

  const DesktopContents = (
    <ul className='bg-gray600 border-[0.1rem] border-gray400 rounded-[0.4rem] py-[0.4rem] c1 text-gray100 w-[7.2rem] flex flex-col absolute top-0 left-[2rem]'>
      {moreButtonList &&
        moreButtonList.map((menuItem, index) => (
          <li
            key={index}
            onClick={menuItem.moreButtonOnclick}
            className={`w-full text-left hover:bg-gray500 cursor-pointer px-[1.2rem] py-[0.6rem]
          ${menuItem.buttonType?.includes('삭제') ? 'text-red300' : ''}
          `}
          >
            {menuItem.buttonType}
          </li>
        ))}
    </ul>
  );

  return (
    <div className='relative flex items-center' ref={moreButtonRef}>
      <button onClick={() => setMoreButton(!onMoreButton)}>
        {type === 'small' ? (
          <Image src={SmallThreeballButton} alt='원 세개 버튼' />
        ) : (
          <Image src={ThreeballButton} alt='원 세개 버튼' />
        )}
      </button>

      {onMoreButton && <>{isMobile ? MobileContents : DesktopContents}</>}
    </div>
  );
}
