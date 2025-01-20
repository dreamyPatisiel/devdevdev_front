import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getGA } from '@utils/getCookie';

import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useVotedStore } from '@stores/votedStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

import { POST_VOTE_SUCCESS } from '../constants/pickCommentConstants';

interface VoteDataProps {
  pickId?: string;
  pickOptionId?: number;
}

const postVote = async (voteData: VoteDataProps) => {
  const GA = await getGA();

  const res = await axios.post('/devdevdev/api/v1/picks/vote', voteData, {
    headers: { 'Anonymous-Member-Id': GA },
  });

  return res;
};

export const usePostVote = () => {
  const { setToastVisible } = useToastVisibleStore();
  const { setUnVoted } = useVotedStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postVote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getDetailPickData'] });
      setToastVisible({ message: POST_VOTE_SUCCESS });
      await queryClient.invalidateQueries({ queryKey: ['pickData'] });
      queryClient.invalidateQueries({ queryKey: ['myPicksData'] });
      setUnVoted();
    },

    onError: (error: ErrorRespone) => {
      setUnVoted();
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }

      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
