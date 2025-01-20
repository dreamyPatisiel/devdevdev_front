import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { usePostBookmarkStatus } from '@pages/techblog/api/usePostBookmarkStatus';
import { ArticleViewBtn } from '@pages/techblog/components/techDetailCardSubComponent';
import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponents';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import { ROUTES } from '@/constants/routes';

import TechBlogImg from './techBlogImg';

export default function DesktopMainTechCard({
  techData,
  type,
}: {
  techData: TechCardProps;
  type: 'main' | 'myinfo';
}) {
  const {
    id,
    thumbnailUrl,
    techArticleUrl,
    title,
    isBookmarked,
    author,
    regDate,
    company,
    contents,
  } = techData;

  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();
  const { mutate: bookmarkMutation } = usePostBookmarkStatus();

  const handleBookmarkClick = ({
    id,
    isBookmarkActive,
  }: {
    id: number;
    isBookmarkActive: boolean;
  }) => {
    bookmarkMutation(
      {
        techArticleId: id,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });
          setToastVisible({ message: '북마크에서 삭제했어요' });
        },
      },
    );
  };

  return (
    <div
      key={id}
      className='grid grid-flow-col border-white gap-[3.2rem] text-white py-[2.8rem] border-b border-b-gray500 border-solid select-none'
    >
      <div>
        <TechBlogImg id={id} thumbnailUrl={thumbnailUrl} rounded='rounded-[0.8rem]' size='small' />

        <ArticleViewBtn
          techArticleUrl={techArticleUrl}
          fontSize='c1'
          textIconGap={'mr-[0.8rem]'}
          paddingY='pt-[1.6rem]'
          iconSize='w-[6px] h-[20px]'
        />
      </div>
      <div>
        <div className='flex items-center justify-between border-white'>
          <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
            <p className='font-bold st2 py-[0.7rem]'>{title}</p>
          </Link>
          {type === 'myinfo' && (
            <Image
              src={isBookmarked ? bookmarkActive : bookmarkNonActive}
              width={15}
              height={16}
              alt='북마크활성아이콘'
              className='cursor-pointer'
              onClick={() =>
                handleBookmarkClick({
                  id: id,
                  isBookmarkActive: isBookmarked,
                })
              }
            />
          )}
        </div>
        <TechInfo
          type='main'
          author={author}
          date={regDate}
          company={company?.name}
          companyId={id}
        />
        <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
          <TechContent content={contents} maxLines={4} className='mr-4' />
        </Link>
      </div>
    </div>
  );
}
