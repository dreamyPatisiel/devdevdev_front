import axios from 'axios';

import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { useLoginStatusStore } from '@stores/loginStore';

const deleteProfile = async () => {
  const res = await axios.delete('/devdevdev/api/v1/mypage/profile');

  return res;
};

export const useDeleteProfile = () => {
  const router = useRouter();

  const { setLogoutStatus } = useLoginStatusStore();

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: async () => {
      localStorage.removeItem('userInfo');
      setLogoutStatus();
      await router.push('/account-delete-complete');
    },
  });
};
