// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const deleteComment = async ({
  techArticleId,
  techCommentId, // 기술블로그 댓글 아이디
}: {
  techArticleId: number;
  techCommentId: number;
}) => {
  const res = await axios.delete<SuccessResponse<number>>(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/${techCommentId}`,
  );
  return res.data;
};

export const useDeleteTechComment = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['techBlogComments'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestTechComments'] });
      closeModal();
      setToastVisible({ message: '댓글을 삭제했어요!' });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
