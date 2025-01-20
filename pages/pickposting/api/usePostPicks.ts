import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostPicksProps } from '@pages/types/postPicks';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

export const postPicks = async ({ picksData }: { picksData: PostPicksProps }) => {
  const res = await axios.post('/devdevdev/api/v1/picks', picksData);
  return res;
};

export const usePostPicks = () => {
  const { setToastVisible } = useToastVisibleStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPicks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickData'] });
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
