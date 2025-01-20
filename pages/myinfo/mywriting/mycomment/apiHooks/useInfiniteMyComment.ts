import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { MYPAGE_COMMENTS } from '@pages/myinfo/constants/apiConstants';
import { MYCOMMENT_VIEW_SIZE } from '@pages/myinfo/constants/myCommentConstants';

import { MyCommentData } from '../components/MyComments';
import { CommentFilterKey } from '../index.page';

interface GetMyCommentProps {
  size?: number;
  pickCommentId?: number;
  techCommentId?: number;
  commentFilter: CommentFilterKey;
}

const getMyComments = async ({
  size,
  pickCommentId,
  techCommentId,
  commentFilter,
}: GetMyCommentProps) => {
  const res = await axios.get(
    `${MYPAGE_COMMENTS}?size=${size}&pickCommentId=${pickCommentId}&techCommentId=${techCommentId}&commentFilter=${commentFilter}`,
  );

  return res.data;
};

export const useInfiniteMyComments = ({
  size,
  pickCommentId,
  techCommentId,
  commentFilter,
}: GetMyCommentProps) => {
  const {
    data: myCommentData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['myCommentsData', size, pickCommentId, techCommentId, commentFilter],
    queryFn: ({ pageParam }) => {
      const { pickCommentId, techCommentId } = pageParam || {
        pickCommentId: Number.MAX_SAFE_INTEGER,
        techCommentId: Number.MAX_SAFE_INTEGER,
      };

      return getMyComments({
        size: MYCOMMENT_VIEW_SIZE,
        pickCommentId,
        techCommentId,
        commentFilter,
      });
    },
    initialPageParam: {
      pickCommentId: Number.MAX_SAFE_INTEGER,
      techCommentId: Number.MAX_SAFE_INTEGER,
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.data.last) {
        return undefined;
      }

      const myComments = lastPage.data.content;

      let minPickId = lastPageParam.pickCommentId;
      let minTechId = lastPageParam.techCommentId;

      myComments.forEach((comment: MyCommentData) => {
        if (comment.commentType === 'PICK') {
          minPickId = Math.min(minPickId, comment.commentId);
        } else if (comment.commentType === 'TECH_ARTICLE') {
          minTechId = Math.min(minTechId, comment.commentId);
        }
      });

      return {
        pickCommentId: minPickId ?? undefined,
        techCommentId: minTechId ?? undefined,
      };
    },
  });

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!isFetching && entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

  return { myCommentData, isFetchingNextPage, hasNextPage, status, onIntersect };
};
