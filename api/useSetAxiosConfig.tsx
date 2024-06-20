import axios from 'axios';

import { useEffect } from 'react';

import getUserInfoFromLocalStorage from '@utils/getUserInfo';

import { useLoginModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { baseUrlConfig } from '@/config';
import { useLoginStatusStore } from '@/stores/loginStore';
import { getCookie } from '@/utils/getCookie';

const useSetAxiosConfig = () => {
  const { loginStatus, setLogoutStatus } = useLoginStatusStore();
  const { userInfo, setUserInfo } = useUserInfoStore();

  // 로그인 상태가 바뀔때도 한번 토큰값을 확인
  useEffect(() => {
    if (loginStatus === 'login' && userInfo.accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.accessToken}`;
    }
    if (loginStatus === 'logout') {
      delete axios.defaults.headers.Authorization;
    }
  }, [loginStatus, userInfo]);

  const URL = baseUrlConfig.serviceUrl || '';
  axios.defaults.baseURL = URL;
  console.log('axios.defaults.baseURL', axios.defaults.baseURL);
  axios.defaults.withCredentials = true;

  // 요청
  axios.interceptors.request.use(
    (response) => {
      // FIXME: 첫 렌더링시 store에 저장된 userInfo로 꺼내오면 저장하기 전에 api를 요청해버려서 header에 토큰이 제대로 안들어가고 있는 상황입니다ㅜㅜ
      // 따라서 현재는 바로 로컬스토리지에 저장된 토큰값을 꺼내 저장중입니다..
      // 해결방법을 같이 고민해보아요 ㅜㅜ
      const userInfoLocalStorage = getUserInfoFromLocalStorage();

      if (userInfoLocalStorage?.accessToken) {
        const JWT_TOKEN = userInfoLocalStorage.accessToken;
        response.headers.Authorization = `Bearer ${JWT_TOKEN}`;
        return response;
      }

      if (loginStatus === 'logout') {
        delete response.headers.Authorization;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 응답
  const { openModal } = useLoginModalStore();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const res = error.response?.data;
      if (res?.errorCode === 401) {
        const getRefreshToken = getCookie('DEVDEVDEV_REFRESH_TOKEN') as string;
        // TODO: 리프레시 토큰 가져올수있는지 확인하기
        console.log('getRefreshToken: ', getRefreshToken);

        return axios
          .post('/devdevdev/api/v1/token/refresh')
          .then((response) => {
            const getAccessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;
            const getMemberEmail = getCookie('DEVDEVDEV_MEMBER_EMAIL') as string;
            const getMemberNickname = getCookie('DEVDEVDEV_MEMBER_NICKNAME') as string;

            console.log('getAccessToken :', getAccessToken);
            console.log('getMemberEmail : ', getMemberEmail);
            console.log('getMemberNickname : ', getMemberNickname);

            if (userInfo.accessToken) {
              setUserInfo({
                accessToken: getAccessToken,
                email: getMemberEmail,
                nickname: getMemberNickname,
              });

              axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken}`;
              return;
            }

            return Promise.reject(error);
          })
          .catch((error) => {
            console.log('토큰 재발급 실패');
            localStorage.removeItem('userInfo');
            setLogoutStatus();
            return openModal();
          });
      }
      return Promise.reject(error);
    },
  );
};

export default useSetAxiosConfig;
