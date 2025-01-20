import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

export const postPickImages = async ({
  pickImages,
  optionOrder,
}: {
  pickImages: File[];
  optionOrder: string;
}) => {
  const formData = new FormData();

  pickImages.forEach((file) => {
    formData.append('pickOptionImages', file);
  });

  const endPoint = `/devdevdev/api/v1/picks/image?name=${optionOrder}PickOptionImage`;

  const res = await axios.post(endPoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res?.data;
};

export const usePostPickImages = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postPickImages,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }

      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
