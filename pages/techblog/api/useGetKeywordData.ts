import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

export type SuccessResponse<T> = {
  resultType: string;
  datas: T; // 기술블로그 검색어 배열 데이터 형태
};

export const getKeyWordData = async (keyword: string) => {
  if (!keyword) return { datas: [] };
  const encodedKeyword = encodeURIComponent(keyword);

  const res = await axios.get<SuccessResponse<string[]>>(
    `/devdevdev/api/v1/keywords/auto-complete?prefix=${encodedKeyword}`,
  );
  return res.data;
};

export const useGetKeyWordData = (keyword: string) => {
  return useQuery({
    queryKey: ['keyword', keyword],
    queryFn: () => {
      return getKeyWordData(keyword);
    },
    select: (data) => data.datas,
  });
};
