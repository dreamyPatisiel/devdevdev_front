import { useState } from 'react';

import Image from 'next/image';

import useIsMobile from '@hooks/useIsMobile';

import AngleDownPoint from '@public/image/pickpickpick/angle-down-point.svg';
import AngleUpPoint from '@public/image/pickpickpick/angle-up-point.svg';

import { PickOptionData } from '../types/pickDetailData';
import MarkdownViewer from './MarkdownViewer';
import VoteButton from './VoteButton';

export default function VoteCard({
  dataIsVoted,
  pickDetailOptionData,
}: {
  dataIsVoted?: boolean;
  pickDetailOptionData?: PickOptionData;
}) {
  const [isFullContents, setFullContents] = useState(false);
  const isMobile = useIsMobile();

  const handleFullContents = () => {
    setFullContents(!isFullContents);
  };

  return (
    <div
      className={`flex pb-[1.6rem] min-h-[12.2rem] ${isMobile ? 'flex-col gap-[2.4rem]' : 'p-[4rem] gap-[4rem]'}`}
    >
      <div
        className={` py-[1.6rem] rounded-[1.6rem] border border-gray300 flex flex-col w-full overflow-hidden justify-center ${isMobile ? 'px-[2.4rem]' : 'px-[4rem]'}`}
      >
        <p className='py-[2.4rem] pb-[3.2rem] text-st1 leading-[2.8rem] font-semibold '>
          {pickDetailOptionData?.title}
        </p>

        {(pickDetailOptionData?.content ||
          pickDetailOptionData?.pickDetailOptionImages.length !== 0) && (
          <div className='border-t-[0.1rem] border-t-gray600 pt-[2.4rem] flex flex-col gap-[2.4rem]'>
            <div
              className={`${
                isFullContents
                  ? ''
                  : `bg-gradient-to-t from-black to-transparent overflow-hidden
                ${isMobile ? 'max-h-[34.4rem]' : 'max-h-[8.9rem]'}`
              }`}
            >
              <div className='relative -z-[1]'>
                <MarkdownViewer pickDetailOptionContents={pickDetailOptionData?.content} />

                {pickDetailOptionData?.pickDetailOptionImages.length !== 0 && (
                  <p className='p2 font-light text-gray200 py-[2.4rem]'>첨부 이미지</p>
                )}
                <div className='flex flex-col gap-[2.4rem]'>
                  {pickDetailOptionData?.pickDetailOptionImages?.map((optionImage) => (
                    <img
                      src={optionImage.imageUrl}
                      alt={`픽픽픽 옵션 이미지-${optionImage.id}`}
                      key={optionImage.id}
                      className='rounded-[1.2rem]'
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              className={`p2 font-bold text-secondary400 flex items-center gap-[0.8rem] justify-center`}
              onClick={handleFullContents}
            >
              {isFullContents ? (
                <>
                  <span>내용 접기</span>
                  <Image src={AngleUpPoint} alt='위 방향 화살표' />
                </>
              ) : (
                <>
                  <span>내용 전체보기</span>
                  <Image src={AngleDownPoint} alt='아래 방향 화살표' />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <VoteButton pickOptionData={pickDetailOptionData} dataIsVoted={dataIsVoted} />
    </div>
  );
}
