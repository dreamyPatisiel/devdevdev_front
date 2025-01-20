import { cn } from '@utils/mergeStyle';

import { useLoginStatusStore } from '@stores/loginStore';
import { useUserInfoStore } from '@stores/userInfoStore';

export default function CommentUserInfo({ className }: { className?: string }) {
  const { userInfo } = useUserInfoStore();

  const { loginStatus } = useLoginStatusStore();

  return (
    <section className={cn('p1 mt-[4rem] ml-4', className)}>
      {loginStatus === 'login' ? (
        <p>
          <span className='text-secondary500 font-bold'>{userInfo?.nickname || ''}</span>님 의견을
          남겨주세요!
        </p>
      ) : (
        <p>
          <span className='text-secondary500'>로그인</span> 후 의견을 남겨주세요!
        </p>
      )}
    </section>
  );
}
