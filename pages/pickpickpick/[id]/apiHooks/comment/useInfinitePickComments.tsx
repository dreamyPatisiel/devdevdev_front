import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';
import { PICK_COMMENT_VIEW_SIZE } from '@pages/pickpickpick/constants/pickConstants';
import { PickOptionType } from '@pages/pickpickpick/types/pick';

import { PickCommentDropdownProps } from '@stores/dropdownStore';

import { pickCommentOptions } from '@/constants/DropdownOptionArr';

interface GetPickCommentsProp {
  pickId: string;
  pickCommentId?: number;
  size?: number;
  pickCommentSort: PickCommentDropdownProps;
  currentPickOptionTypes: PickOptionType[];
}

const getPickComments = async ({
  pickId,
  pickCommentId,
  size,
  pickCommentSort,
  currentPickOptionTypes,
}: GetPickCommentsProp) => {
  const getPickOptionType = (optionTypes: PickOptionType[]) => {
    if (!optionTypes || optionTypes.length === 0) {
      return '';
    }

    if (optionTypes.length === 1) {
      return optionTypes[0];
    }

    return optionTypes;
  };

  const queryParams = {
    pickCommentId,
    size,
    pickCommentSort,
    pickOptionTypes: getPickOptionType(currentPickOptionTypes),
  };

  const res = await axios.get(`${GET_PICK_DATA}/${pickId}/comments?`, {
    params: queryParams,
    paramsSerializer: (params) => {
      return Object.entries(params)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            const decodeValue = decodeURIComponent(value.map((v) => `${key}=${v}`).join('&'));

            return decodeValue;
          }

          return `${key}=${value}`;
        })
        .join('&');
    },
  });

  return res.data;
};

export const useInfinitePickComments = ({
  pickId,
  pickCommentSort,
  currentPickOptionTypes,
  size,
}: GetPickCommentsProp) => {
  const isValidSortOption = pickCommentOptions.includes(pickCommentSort);

  const {
    data: pickCommentsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['pickCommentData', pickId, currentPickOptionTypes, pickCommentSort, size],
    queryFn: ({ pageParam }) => {
      return getPickComments({
        pickId,
        pickCommentId: pageParam,
        size: PICK_COMMENT_VIEW_SIZE,
        pickCommentSort: pickCommentSort || 'LATEST',
        currentPickOptionTypes,
      });
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }

      const lastPickId = lastPage?.data.content[PICK_COMMENT_VIEW_SIZE - 1]?.pickCommentId;
      return lastPickId ?? undefined;
    },
    enabled: !!pickId && isValidSortOption,
  });

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!isFetching && entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

  return { pickCommentsData, isFetchingNextPage, hasNextPage, status, onIntersect, fetchNextPage };
};
