import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { MYPICK_VIEW_SIZE } from '../constants/mypicks';

const getMyPicks = async ({ pageParam }: { pageParam: number }) => {
  const res = await axios.get(
    `/devdevdev/api/v1/mypage/picks?size=${MYPICK_VIEW_SIZE}&pickId=${pageParam}`,
  );

  return res;
};

export const useGetMyPicks = () => {
  const {
    data: myPicks,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['myPicksData'],
    queryFn: ({ pageParam }) => getMyPicks({ pageParam }),
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }
      const lastPickId = lastPage?.data?.content?.[MYPICK_VIEW_SIZE - 1].id;
      return lastPickId ?? undefined;
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

  return {
    myPicks,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  };
};
