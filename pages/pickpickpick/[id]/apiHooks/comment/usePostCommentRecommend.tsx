import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

interface PostCommentRecommendProp {
  pickId: string;
  pickCommentId: number;
}

const postCommentRecommend = async ({ pickId, pickCommentId }: PostCommentRecommendProp) => {
  const res = await axios.post(`${GET_PICK_DATA}/${pickId}/comments/${pickCommentId}/recommends`);

  return res.data;
};

export const usePostCommentRecommend = () => {
  const { setToastVisible } = useToastVisibleStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCommentRecommend,
    onSuccess: async (success) => {
      await queryClient.invalidateQueries({ queryKey: ['pickCommentData'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestComments'] });

      if (success.data.isRecommended) {
        return setToastVisible({ message: '댓글을 추천했어요!' });
      }

      setToastVisible({ message: '댓글 추천을 취소했어요!' });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }

      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
