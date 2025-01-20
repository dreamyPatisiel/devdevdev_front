import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { techBlogDropdownOptions } from '@/constants/DropdownOptionArr';
import { TechBlogDropdownProps } from '@/stores/dropdownStore';

import { TECH_VIEW_SIZE } from '../constants/techBlogConstants';
import { GetTechBlogProps } from '../types/techBlogType';

export const getTechBlogData = async ({
  elasticId,
  techSort,
  keyword,
  companyId,
  score,
  size,
}: GetTechBlogProps) => {
  const queryParams = {
    size: size ? size : TECH_VIEW_SIZE,
    techArticleSort: techSort,
    ...(elasticId && { elasticId }),
    ...(keyword && { keyword }),
    ...(companyId && { companyId }),
    ...(score && { score }),
  };



  const res = await axios.get(`/devdevdev/api/v1/articles?`, {
    params: {
      ...queryParams,
    },
  });
  return res.data;
};

export const useInfiniteTechBlogData = (
  sortOption: TechBlogDropdownProps,
  keyword?: string,
  companyId?: number|null,
  size?: number,
) => {
  const isValidSortOption = techBlogDropdownOptions.includes(sortOption);

  const {
    data: techBlogData,
    fetchNextPage, // 다음 페이지의 데이터를 가져옴
    isFetchingNextPage, // 현재 다음 페이지를 가져오는지 여부
    hasNextPage, // 다음 페이지가 있는지
    status, // 쿼리의 상태
    error,
    isFetching, // 데이터를 가지고 오는지 여부
  } = useInfiniteQuery({
    queryKey: ['techBlogData', sortOption, keyword, companyId, size],
    // 데이터를 요청하는데 사용하는 함수
    queryFn: ({ pageParam }) => {
      let elasticId = '';
      let score = 0;

      if (pageParam) {
        const parsedParam = JSON.parse(pageParam);
        elasticId = parsedParam.elasticId;
        score = parsedParam.score;
      }

      if (!isValidSortOption) {
        return Promise.resolve({ data: { content: [], last: true } });
      }
      return getTechBlogData({
        elasticId: elasticId,
        techSort: sortOption,
        keyword: keyword,
        companyId: companyId,
        score: score,
        size: size,
      });
    },
    initialPageParam: '',
    // 다음 페이지를 가져오기 위한 파라미터 추출 함수
    // lastPage는 이전페이지에서 반환된 데이터를 받아 다음페이지에 필요한 파라미터를 추출한 데이터

    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }
      const elasticId = lastPage.data.content[TECH_VIEW_SIZE - 1]?.elasticId;
      const score = lastPage.data.content[TECH_VIEW_SIZE - 1]?.score; // 정확도순에서만 사용

      if (score) {
        return JSON.stringify({ elasticId: elasticId, score: score });
      }
      return JSON.stringify({ elasticId: elasticId });
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
    techBlogData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  };
};
