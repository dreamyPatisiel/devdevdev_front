import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

const deletePickComment = async ({
  pickId,
  pickCommentId,
}: {
  pickId: string;
  pickCommentId: number;
}) => {
  const res = await axios.delete(`${GET_PICK_DATA}/${pickId}/comments/${pickCommentId}`);

  return res;
};

export const useDeletePickComment = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: deletePickComment,
    onSuccess: async () => {
      closeModal();
      await queryClient.invalidateQueries({ queryKey: ['pickCommentData'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestComments'] });
      setToastVisible({ message: '댓글을 삭제했어요!' });
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
