import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTechBlogIdStore } from '@stores/techBlogStore';

import Tooltip from '@components/tooltips/tooltip';

import HeartNonActive from '@public/image/techblog/heart.svg';
import HeartActive from '@public/image/techblog/heart_active.svg';

import { TechCardProps } from '../types/techBlogType';
import { Tag } from './tag';
import { ImgWrapper, TechCardWrapper, TechContent, TechInfo, TechTitle } from './techSubComponent';

//----------------------------------------------------------------------------------------

export default function TechCard({ techData }: { techData: TechCardProps }) {
  const router = useRouter();
  const { pathname } = router;
  const { setTechArticleId } = useTechBlogIdStore();

  const {
    id,
    elasticId,
    thumbnailUrl,
    title,
    company,
    regDate,
    author,
    contents,
    viewTotalCount,
    recommendTotalCount,
    commentTotalCount,
    popularScore,
    isBookmarked,
  } = techData;

  const [heart, setHeart] = useState(isBookmarked);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleHeartClick = () => {
    setHeart((prev) => !prev);
    setShowTooltip(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const hideTooltipAfterDelay = () => {
      timeoutId = setTimeout(() => {
        setShowTooltip(false);
      }, 2 * 1000);
    };
    if (showTooltip) {
      hideTooltipAfterDelay();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [heart, showTooltip]);

  const heartIcon = heart ? (
    <HeartActive className='cursor-pointer' onClick={handleHeartClick} alt='좋아요버튼' />
  ) : (
    <HeartNonActive className='cursor-pointer' onClick={handleHeartClick} alt='좋아요취소버튼' />
  );

  const handleOnClick = () => {
    setTechArticleId(id);
    console.log(id, '저장');
  };

  return (
    <>
      <TechCardWrapper>
        <ImgWrapper width='w-[20rem]' height='h-[13.6rem]'>
          <img width='240' height='184' src={thumbnailUrl} alt='기술블로그 썸네일' />
        </ImgWrapper>
        <div>
          <div className='flex items-center justify-between border-white'>
            <Link href={`${pathname}/${id}`}>
              <TechTitle title={title} onClick={handleOnClick} />
            </Link>

            <div className='flex flex-row items-center relative'>
              <Tooltip variant='grayTt' direction='right' isVisible={showTooltip}>
                {heart ? '북마크로 저장했어요' : '북마크에서 삭제했어요'}
              </Tooltip>
              {heartIcon}
            </div>
          </div>
          <TechInfo author={author} date={regDate} company={company?.name} />
          <Link href={`${pathname}/${id}`}>
            <TechContent content={contents} onClick={handleOnClick} />
          </Link>
          {/* 2차 UI */}
          {/* <TagWrapper>
            <Tag text='다양하면 좋지요' />
            <Tag text='따끈따끈' />
            <Tag text='프론트' />
          </TagWrapper> */}
        </div>
      </TechCardWrapper>
    </>
  );
}
