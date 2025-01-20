import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import { TechBookmarkStatus } from '../types/techBlogType';

export const postBookmarkStatus = async ({ techArticleId }: { techArticleId: number }) => {
  const res = await axios.post<SuccessResponse<TechBookmarkStatus>>(
    `/devdevdev/api/v1/articles/${techArticleId}/bookmark`,
  );
  return res.data;
};

export const usePostBookmarkStatus = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postBookmarkStatus,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
