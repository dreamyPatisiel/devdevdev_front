import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import useIsMobile from '@hooks/useIsMobile';

import Tooltip from '@components/common/tooltips/tooltip';
import TechBlogImg from '@components/features/techblog/techBlogImg';

import { ROUTES } from '@/constants/routes';

import { TechCardProps } from '../types/techBlogType';
import BookmarkIcon from './bookmarkIcon';
import { Tag } from './tag';
import { TechCardWrapper, TechContent, TechInfo, TechTitle } from './techSubComponents';

export default function TechCard({
  techData,
  type,
}: {
  techData: TechCardProps;
  type: 'main' | 'techblog' | 'myinfo';
}) {
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
    isLogoImage,
  } = techData;

  const isMobile = useIsMobile();
  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');

  useEffect(() => {
    setBookmarkActive(isBookmarked);
  }, [isBookmarked]);

  return (
    <TechCardWrapper>
      <TechBlogImg
        id={id}
        isLogoImage={isLogoImage}
        thumbnailUrl={thumbnailUrl}
        size={isMobile ? 'mobile' : 'large'}
      />
      <div>
        <div className='flex items-center justify-between border-white'>
          <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
            <TechTitle title={title} width={isMobile ? 'w-full' : 'w-[77rem]'} />
          </Link>

          {type !== 'main' && (
            <div className='flex flex-row items-center relative flex-shrink-0'>
              <Tooltip variant='grayTt' direction='right' isVisible={tooltipMessage !== ''}>
                {tooltipMessage}
              </Tooltip>
              <BookmarkIcon
                type={type}
                id={id}
                tooltipMessage={tooltipMessage}
                isBookmarkActive={isBookmarkActive}
                setBookmarkActive={setBookmarkActive}
                setTooltipMessage={setTooltipMessage}
              />
            </div>
          )}
        </div>
        <TechInfo author={author} date={regDate} company={company?.name} companyId={company?.id} />
        {type !== 'myinfo' && (
          <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
            <TechContent
              content={contents}
              maxLines={isMobile ? 4 : 3}
              className={isMobile ? '' : 'mr-[4rem]'}
            />
          </Link>
        )}
        {/* 2차 UI */}
        {/* <TagWrapper>
            <Tag text='다양하면 좋지요' />
            <Tag text='따끈따끈' />
            <Tag text='프론트' />
          </TagWrapper> */}
      </div>
    </TechCardWrapper>
  );
}
