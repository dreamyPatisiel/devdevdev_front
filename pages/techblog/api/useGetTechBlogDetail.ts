import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { getGA } from '@utils/getCookie';

import { SuccessResponse } from '@/types/successResponse';

import { TechCardProps } from '../types/techBlogType';

export const getDetailTechBlog = async (id: string) => {
  const GA = await getGA();

  const res = await axios.get<SuccessResponse<TechCardProps>>(`/devdevdev/api/v1/articles/${id}`, {
    headers: { 'Anonymous-Member-Id': GA },
  });
  return res?.data;
};

export const useGetDetailTechBlog = (techArticleId: string | undefined) => {
  return useQuery({
    queryKey: ['techDetail', techArticleId],
    queryFn: () => {
      return getDetailTechBlog(techArticleId as string);
    },
    select: (data) => data.data as TechCardProps,
    enabled: !!techArticleId,
  });
};
