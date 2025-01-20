// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const postMainComment = async ({
  techArticleId,
  contents,
}: {
  techArticleId: number;
  contents: string;
}) => {
  const res = await axios.post<SuccessResponse<number>>(
    `/devdevdev/api/v1/articles/${techArticleId}/comments`,
    {
      contents: contents,
    },
  );
  return res.data;
};

export const usePostMainComment = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postMainComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['techBlogComments'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestTechComments'] });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
