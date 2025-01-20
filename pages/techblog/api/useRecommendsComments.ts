import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import { TypeTechRecommendsStatus } from '../types/techCommentsType';

export const postRecommendComment = async ({
  techArticleId,
  techCommentId,
}: {
  techArticleId: number;
  techCommentId: number;
}) => {
  const res = await axios.post<SuccessResponse<TypeTechRecommendsStatus>>(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/${techCommentId}/recommends`,
  );
  return res.data;
};

export const usePostRecommendComment = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postRecommendComment,
    onSuccess: async (success) => {
      await queryClient.invalidateQueries({ queryKey: ['techBlogComments'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestTechComments'] });
      if (success.data.isRecommended) {
        return setToastVisible({ message: '댓글을 추천했어요!' });
      }

      setToastVisible({ message: '댓글 추천을 취소했어요!' });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
