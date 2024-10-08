// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const postReply = async ({
  techArticleId,
  originParentTechCommentId, // 기술블로그 최상단 댓글 아이디
  parentTechCommentId, // 기술블로그 답글 대상의 댓글 아이디
  contents,
}: {
  techArticleId: number;
  originParentTechCommentId: number;
  parentTechCommentId: number;
  contents: string;
}) => {
  const res = await axios.post<SuccessResponse<number>>(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/${originParentTechCommentId}/${parentTechCommentId}`,
    {
      contents: contents,
    },
  );
  return res.data;
};

export const usePostReply = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postReply,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      setToastVisible(errorMessage, 'error');
    },
  });
};
