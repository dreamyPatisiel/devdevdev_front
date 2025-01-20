import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { formatDate } from '@utils/formatDate';

import { useDropdownStore } from '@stores/dropdownStore';

import useIsMobile from '@hooks/useIsMobile';

import SearchInput from '@components/common/searchInput';

import TechHeaderImg from '@public/image/techblog/TechHeaderImg.png';

import { ROUTES } from '@/constants/routes';

import { TechCardProps } from '../types/techBlogType';
import {
  ArticleRecommendButton,
  ArticleViewRoundButton,
  TechBookMarkAndToolTip,
  TechDetailInfo,
  TechMainContent,
} from './techDetailCardSubComponent';

export default function TechDetailCard({
  techDetailProps,
  techArticleId,
}: {
  techDetailProps: TechCardProps;
  techArticleId: string;
}) {
  const {
    id,
    author,
    company,
    contents,
    regDate,
    thumbnailUrl,
    title,
    isBookmarked,
    techArticleUrl,
    recommendTotalCount,
    isRecommended,
  } = techDetailProps;

  const queryClient = useQueryClient();

  const isMobile = useIsMobile();
  const { setSort } = useDropdownStore();

  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [techImgUrl, setTechImgUrl] = useState<string>(TechHeaderImg.src);

  useEffect(() => {
    if (thumbnailUrl) {
      setTechImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  useEffect(() => {
    setBookmarkActive(isBookmarked);
  }, [isBookmarked]);

  const ImageTitleStyle = {
    base: 'bg-black bg-opacity-50 bg-cover bg-center bg-blend-darken rounded-[16px]',
    desktop: 'px-[4rem] py-[3.2rem]',
    mobile: 'px-[2.4rem] py-[2rem]',
  };

  return (
    <section className={`${isMobile ? 'mb-[5.6rem]' : 'mb-[9.6rem]'}`}>
      <div className={`flex items-center justify-between  ${isMobile ? '' : 'mb-[4.8rem]'}`}>
        {!isMobile && (
          <>
            <Link
              href={ROUTES.TECH_BLOG}
              className='font-bold h3'
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
                setSort('LATEST');
              }}
            >
              기술블로그 🧪
            </Link>
            <SearchInput />
          </>
        )}
      </div>
      {/* ----------------------------------------------------- */}
      <div
        className={`w-full ${ImageTitleStyle.base} ${isMobile ? ImageTitleStyle.mobile : ImageTitleStyle.desktop}`}
        style={{
          backgroundImage: `url("${techImgUrl}")`,
        }}
      >
        <div className='grid grid-flow-col justify-between items-start mb-[2.4rem] z-10'>
          <h2 className={`font-bold ${isMobile ? 'st2' : 'h2'}`}>{title}</h2>
          {!isMobile && (
            <TechBookMarkAndToolTip
              isBookmarkActive={isBookmarkActive}
              setBookmarkActive={setBookmarkActive}
              techArticleId={techArticleId}
            />
          )}
        </div>

        <div className='grid'>
          <TechDetailInfo
            isMobile={isMobile}
            company={company.name}
            author={author}
            date={regDate}
          />
          {isMobile && (
            <div className='flex flex-row justify-between items-center'>
              <time className='p1 text-white' dateTime={regDate}>
                {formatDate(regDate)}
              </time>
              <TechBookMarkAndToolTip
                isBookmarkActive={isBookmarkActive}
                setBookmarkActive={setBookmarkActive}
                techArticleId={techArticleId}
              />
            </div>
          )}
        </div>
      </div>
      {/* 아티클 전체보기 버튼 - 모바일 위치 */}
      {isMobile && (
        <ArticleViewRoundButton
          className='mx-auto mt-[3.2rem] mb-[2.4rem]'
          techArticleUrl={techArticleUrl}
        />
      )}
      {/* 본문 */}
      <div className={`${isMobile ? 'px-[1.6rem]' : 'px-[4rem] mt-20'}`}>
        <TechMainContent isMobile={isMobile} content={contents} />
      </div>
      {/* 추천 & 아티클 전체보기 버튼 */}
      <div
        className={`flex flex-row justify-center items-center gap-[1rem] mb-[4.8rem] ${isMobile ? 'mt-[3rem]' : 'mt-[8.1rem]'}`}
      >
        <ArticleRecommendButton
          techArticleId={techArticleId}
          isRecommended={isRecommended}
          recommendTotalCount={recommendTotalCount}
        />
        {!isMobile && <ArticleViewRoundButton techArticleUrl={techArticleUrl} />}
      </div>
      {/* 수평선 */}
      <div className={`border-b border-b-gray500 ${isMobile ? 'mx-[1.6rem]' : 'mx-[4rem]'}`} />
    </section>
  );
}
