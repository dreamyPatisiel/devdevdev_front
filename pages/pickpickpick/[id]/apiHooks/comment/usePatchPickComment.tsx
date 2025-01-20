import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

interface PatchPickCommentProps {
  pickId: string;
  pickCommentId: number;
  contents: string;
}

const patchPickComment = async ({ pickId, pickCommentId, contents }: PatchPickCommentProps) => {
  const res = await axios.patch(`${GET_PICK_DATA}/${pickId}/comments/${pickCommentId}`, {
    contents,
  });

  return res;
};

export const usePatchPickComment = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: patchPickComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pickCommentData'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestComments'] });
      setToastVisible({ message: '댓글을 성공적으로 수정했어요!' });
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
