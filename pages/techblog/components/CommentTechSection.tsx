import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { InfiniteData } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';

import { useCheckAndScrollToComment } from '@hooks/useCheckAndScrollToComment';
import useIsMobile from '@hooks/useIsMobile';
import { useObserver } from '@hooks/useObserver';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';
import {
  CommentSkeletonList,
  MobileCommentSkeletonList,
} from '@components/common/skeleton/commentSkeleton';

import { useGetBestComments } from '../api/useGetBestComments';
import { useInfiniteTechBlogComments } from '../api/useInfiniteGetTechComments';
import { TechBlogCommentsDropdownProps, TechCommentProps } from '../types/techCommentsType';

const DynamicTechCommentSet = dynamic(() => import('@/pages/techblog/components/CommentSet'));
const DynamicBestComments = dynamic(() => import('@/pages/techblog/components/BestComments'));

export default function CommentTechSection({ articleId }: { articleId: string }) {
  const router = useRouter();

  const isMobile = useIsMobile();
  const { sortOption } = useDropdownStore();

  const bottomDiv = useRef(null);
  const { techBlogComments, isFetchingNextPage, hasNextPage, status, onIntersect, fetchNextPage } =
    useInfiniteTechBlogComments(sortOption as TechBlogCommentsDropdownProps, articleId);
  const TECH_COMMENT_TOTAL_COUNT = techBlogComments?.pages[0]?.data.totalElements;
  const TECH_COMMENT_PARENT_TOTAL_COUNT =
    techBlogComments?.pages[0]?.data.totalOriginParentComments;

  // 베스트댓글
  const { data: bestCommentsData, status: bestStatus } = useGetBestComments({
    techArticleId: articleId as string,
    size: 3,
    parentCommentTotal: TECH_COMMENT_PARENT_TOTAL_COUNT,
  });

  useObserver({
    target: bottomDiv,
    onIntersect,
  });

  const { commentId } = router.query;

  useCheckAndScrollToComment({
    commentId: commentId as string,
    hasNextPage,
    fetchNextPage,
    status,
  });

  // 일반댓글
  const getStatusTechCommentComponent = (
    CurTechBlogComments: InfiniteData<any, unknown> | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    if (!articleId) {
      return <></>;
    }

    switch (status) {
      case 'pending':
        if (isMobile) {
          return <MobileCommentSkeletonList itemsInRows={10} />;
        } else {
          return <CommentSkeletonList itemsInRows={10} />;
        }

      default:
        return (
          <>
            <div className='border-b-[0.1rem] border-b-gray400'>
              {CurTechBlogComments?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCommentProps) => {
                    return (
                      <DynamicTechCommentSet
                        key={data.techCommentId}
                        data={data}
                        articleId={articleId}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                {isMobile ? (
                  <MobileCommentSkeletonList itemsInRows={10} />
                ) : (
                  <CommentSkeletonList itemsInRows={10} />
                )}
              </div>
            )}
          </>
        );
    }
  };

  // 베댓
  const getStatusBestTechCommentComponent = (status: 'success' | 'error' | 'pending') => {
    if (TECH_COMMENT_PARENT_TOTAL_COUNT <= 3) return;

    if (!articleId) {
      return <></>;
    }

    switch (status) {
      case 'pending':
        if (isMobile) {
          return <MobileCommentSkeletonList itemsInRows={3} />;
        } else {
          return <CommentSkeletonList itemsInRows={3} />;
        }

      default:
        return (
          <React.Fragment>
            {/* 베스트댓글 */}
            {bestCommentsData?.datas.map((data: TechCommentProps) => {
              return (
                <DynamicBestComments key={data.techCommentId} data={data} articleId={articleId} />
              );
            })}
          </React.Fragment>
        );
    }
  };

  return (
    <>
      <div className='flex justify-between items-center mb-[2.8rem]'>
        <p className='p1'>
          <span className='text-secondary500'>{TECH_COMMENT_TOTAL_COUNT}</span>개의 댓글
        </p>
        {isMobile ? <MobileDropdown type='comment' /> : <Dropdown type='techComment' />}
      </div>

      {TECH_COMMENT_TOTAL_COUNT === 0 && (
        <p className='text-center text-gray200 p1 my-[14rem]'>
          작성된 댓글이 없어요! 첫 댓글을 작성해주세요{' '}
        </p>
      )}

      {getStatusBestTechCommentComponent(bestStatus)}
      {getStatusTechCommentComponent(techBlogComments, status)}
      <div ref={bottomDiv} />
    </>
  );
}
