import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

interface PostPickCommentProps {
  pickId: string;
  contents: string;
  isPickVotePublic: boolean;
}

const postPickComment = async ({ pickId, contents, isPickVotePublic }: PostPickCommentProps) => {
  const res = await axios.post(`${GET_PICK_DATA}/${pickId}/comments`, {
    contents,
    isPickVotePublic,
  });

  return res.data;
};

export const usePostPickComment = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postPickComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pickCommentData'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestComments'] });
      setToastVisible({ message: '댓글을 성공적으로 작성했어요!', type: 'success' });
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

interface PostPickReplyComment {
  pickId: string;
  pickOriginParentCommentId: number;
  pickParentCommentId: number;
  contents: string;
}

const postPickReplyComment = async ({
  pickId,
  pickOriginParentCommentId,
  pickParentCommentId,
  contents,
}: PostPickReplyComment) => {
  const res = await axios.post(
    `${GET_PICK_DATA}/${pickId}/comments/${pickOriginParentCommentId}/${pickParentCommentId}`,
    {
      contents,
    },
  );

  return res.data;
};

export const usePostPickReplyComment = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postPickReplyComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pickCommentData'] });
      await queryClient.invalidateQueries({ queryKey: ['getBestComments'] });
      setToastVisible({ message: '댓글을 성공적으로 작성했어요!', type: 'success' });
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
