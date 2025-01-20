import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

import { postSurveyDataProps } from '../types/exitSurvey';

const postExitSurvey = async (postSurveyData: postSurveyDataProps) => {
  const res = await axios.post('/devdevdev/api/v1/mypage/exit-survey', postSurveyData);

  return res;
};

export const usePostExitSurvey = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postExitSurvey,
    onError: (error: ErrorRespone) => {
      const errorMessge = error.response.data.message;

      if (errorMessge == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }

      return setToastVisible({ message: errorMessge, type: 'error' });
    },
  });
};
