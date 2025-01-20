import { UserInfoType } from '@/types/userInfoType';

/** 로컬스토리지에서 userInfo를 파싱하여 값을 return하는 함수 */
export default function getUserInfoFromLocalStorage(): UserInfoType | null {
  if (typeof window !== 'undefined') {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      return JSON.parse(userInfoString).state.userInfo as UserInfoType;
    }
  }

  return null;
}

export const getMaskedEmail = (email: string) => {
  const UNMASKED_COUNT = 3;

  const id = email.slice(0, email.indexOf('@'));
  const unmaskedId = id.slice(0, UNMASKED_COUNT);
  const maskedCount = Math.max(0, id.length - UNMASKED_COUNT);
  const maskedId = '*'.repeat(maskedCount);

  return unmaskedId + maskedId;
};
