import { Fragment, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { InfiniteData, UseQueryResult } from '@tanstack/react-query';

import { PickOptionType } from '@pages/pickpickpick/types/pick';

import { PickCommentDropdownProps, useDropdownStore } from '@stores/dropdownStore';

import { useCheckAndScrollToComment } from '@hooks/useCheckAndScrollToComment';
import useIsMobile from '@hooks/useIsMobile';
import { useObserver } from '@hooks/useObserver';

import CommentCheckFilter from '@components/common/comments/CommentCheckFilter';
import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';
import {
  CommentSkeletonList,
  MobileCommentSkeletonList,
} from '@components/common/skeleton/commentSkeleton';

import { useGetBestComments } from '../apiHooks/comment/useGetBestComments';
import { useInfinitePickComments } from '../apiHooks/comment/useInfinitePickComments';
import BestComments from './BestComments';
import CommentSet, { CommentsProps } from './CommentSet';

export default function Comments({ pickId }: { pickId: string }) {
  const [currentPickOptionTypes, setCurrentPickOptionTypes] = useState<PickOptionType[]>([]);
  const router = useRouter();

  const bottomDiv = useRef(null);

  const { sortOption } = useDropdownStore();
  const isMobile = useIsMobile();

  const { pickCommentsData, isFetchingNextPage, hasNextPage, status, onIntersect, fetchNextPage } =
    useInfinitePickComments({
      pickId,
      currentPickOptionTypes,
      pickCommentSort: sortOption as PickCommentDropdownProps,
    });
  const PICK_COMMENT_TOTAL_COUNT = pickCommentsData?.pages[0].data.totalElements;

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

  const { data: bestCommentsData } = useGetBestComments({
    pickId,
    size: 3,
    parentCommentTotal: pickCommentsData?.pages[0].data.totalOriginParentComments,
  });

  const handleFilterChange = (optionType: PickOptionType) => {
    if (optionType === '') {
      return setCurrentPickOptionTypes([]);
    }

    if (optionType === 'firstPickOption' || optionType === 'secondPickOption') {
      setCurrentPickOptionTypes((prev) =>
        prev.includes(optionType)
          ? prev.filter((option) => option !== optionType)
          : [...prev, optionType],
      );
    }
  };

  const getStatusCommentComponent = (
    bestCommentsData: UseQueryResult<any, Error>,
    pickCommentsData: InfiniteData<any, unknown> | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    if (!pickId) {
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
          <div className='border-t-[0.1rem] border-t-gray400'>
            {PICK_COMMENT_TOTAL_COUNT === 0 && (
              <p className='p1 text-gray200 text-center my-[14rem]'>
                작성된 댓글이 없어요! 첫 댓글을 작성해주세요
              </p>
            )}

            {currentPickOptionTypes.length === 0 ? (
              bestCommentsData?.data?.datas.map((bestComment: CommentsProps) => (
                <BestComments key={bestComment.pickCommentId} {...bestComment} pickId={pickId} />
              ))
            ) : (
              <></>
            )}

            {pickCommentsData?.pages.map((group, index) => (
              <Fragment key={index}>
                {group.data.content.map((pickComment: CommentsProps) => (
                  <CommentSet key={pickComment.pickCommentId} {...pickComment} pickId={pickId} />
                ))}
              </Fragment>
            ))}

            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                {isMobile ? (
                  <MobileCommentSkeletonList itemsInRows={10} />
                ) : (
                  <CommentSkeletonList itemsInRows={10} />
                )}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className='flex flex-col gap-[3.2rem]'>
      <div className={`flex  ${isMobile ? 'flex-col ' : 'items-center justify-between'}`}>
        <span className={`p1 font-bold text-gray200 ${isMobile ? 'mb-[1.6rem]' : ''}`}>
          <span className={`text-secondary500`}>{PICK_COMMENT_TOTAL_COUNT}</span>
          개의 댓글
        </span>

        <div className={`flex gap-[1.6rem] justify-between`}>
          <div className='flex gap-[1.6rem]'>
            <CommentCheckFilter
              checkOptionTitle='전체'
              onFilterChange={() => handleFilterChange('')}
              isChecked={currentPickOptionTypes.length === 0}
            />
            <CommentCheckFilter
              checkOptionTitle='PICK A'
              onFilterChange={() => handleFilterChange('firstPickOption')}
              isChecked={currentPickOptionTypes.includes('firstPickOption')}
            />
            <CommentCheckFilter
              checkOptionTitle='PICK B'
              onFilterChange={() => handleFilterChange('secondPickOption')}
              isChecked={currentPickOptionTypes.includes('secondPickOption')}
            />
          </div>

          {isMobile ? <MobileDropdown type='pickComment' /> : <Dropdown type='pickComment' />}
        </div>
      </div>

      {getStatusCommentComponent(bestCommentsData, pickCommentsData, status)}
      <div ref={bottomDiv} />
    </div>
  );
}
