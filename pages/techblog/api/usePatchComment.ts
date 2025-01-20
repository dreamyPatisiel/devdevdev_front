// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const patchComment = async ({
  techArticleId,
  techCommentId,
  contents,
}: {
  techArticleId: number;
  techCommentId: number;
  contents: string;
}) => {
  const res = await axios.patch<SuccessResponse<number>>(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/${techCommentId}`,
    {
      contents: contents,
    },
  );
  return res.data;
};

export const usePatchComment = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: patchComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['techBlogComments'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestTechComments'] });
      await setToastVisible({ message: '댓글이 수정되었어요!', type: 'success' });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
