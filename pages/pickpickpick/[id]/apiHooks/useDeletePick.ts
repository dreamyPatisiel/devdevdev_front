import axios from 'axios';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

const deletePick = async (id: string) => {
  const res = await axios.delete(`/devdevdev/api/v1/picks/${id}`);

  return res;
};

export const useDeletePick = () => {
  const { setToastVisible } = useToastVisibleStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePick,
    onSuccess: () => {
      setToastVisible({ message: '투표를 성공적으로 삭제했어요.' });
      router.push('/pickpickpick');
      queryClient.invalidateQueries({ queryKey: ['pickData'] });
      queryClient.invalidateQueries({ queryKey: ['myPicksData'] });
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
