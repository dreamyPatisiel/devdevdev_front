import axios from 'axios';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { ROUTES } from '@/constants/routes';

const useLogoutMutation = () => {
  const router = useRouter();
  const { setLogoutStatus } = useLoginStatusStore();
  const { closeLoginModal } = useLoginModalStore();
  const { setToastVisible } = useToastVisibleStore();
  const queryClient = useQueryClient();
  const { removeUserInfo } = useUserInfoStore();

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await axios.post('/devdevdev/api/v1/logout');
      return response.data;
    },
    onSuccess: async (data) => {
      console.log('로그아웃 성공:', data);
      if (data?.resultType === 'SUCCESS') {
        closeLoginModal();
        removeUserInfo();
        setLogoutStatus();
        await queryClient.invalidateQueries({ queryKey: ['pickData'] });
        await queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
        await queryClient.invalidateQueries({ queryKey: ['techDetail'] });
        router.push(ROUTES.MAIN);
      }
    },
    onError: (error) => {
      closeLoginModal();
      console.error('로그아웃 실패:', error);
      setToastVisible({ message: '로그아웃 실패', type: 'error' });
    },
  });

  return logoutMutation;
};

export default useLogoutMutation;
