import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

export const deletePickImage = async ({ pickOptionImageId }: { pickOptionImageId: number }) => {
  const res = await axios.delete(`/devdevdev/api/v1/picks/image/${pickOptionImageId}`);

  return res;
};

export const useDeletePickImage = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: deletePickImage,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }

      setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
