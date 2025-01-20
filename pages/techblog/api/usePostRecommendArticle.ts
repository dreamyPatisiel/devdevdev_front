import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getGA } from '@utils/getCookie';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import { TechRecommendArticleStatus } from '../types/techBlogType';

export const postRecommendArticle = async ({ techArticleId }: { techArticleId: string }) => {
  const GA = await getGA();

  const res = await axios.post<SuccessResponse<TechRecommendArticleStatus>>(
    `/devdevdev/api/v1/articles/${techArticleId}/recommend`,
    {},
    {
      headers: { 'Anonymous-Member-Id': GA },
    },
  );
  return res.data;
};

export const usePostRecommendArticle = (techArticleId: string) => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postRecommendArticle,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      if (errorMessage == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }
      setToastVisible({ message: errorMessage, type: 'error' });
    },
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({ queryKey: ['techDetail', techArticleId] });
      if (data.status) {
        setToastVisible({ message: '추천했어요!', type: 'success' });
      }
    },
  });
};
