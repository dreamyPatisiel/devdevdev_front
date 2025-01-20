import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { isActive } from '@utils/headerUtils';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import useHandleLinkClick from '@hooks/useHandleNavClick';

import DevLogo from '@public/image/devdevdevLogo.svg';
import logoutIcon from '@public/image/right-from-bracket.svg';
import loginIcon from '@public/image/right-to-bracket.svg';

import { MENU_LISTS } from '@/constants/NavListConstants';
import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';

export default function MobileHeader() {
  const router = useRouter();

  const { pathname } = router;
  const { MAIN, MY_INFO } = ROUTES;

  const { openLoginModal } = useLoginModalStore();

  const { userInfo } = useUserInfoStore();
  const { loginStatus, setLoginStatus, setLogoutStatus } = useLoginStatusStore();

  const { handleRefreshLinkClick } = useHandleLinkClick();

  useEffect(() => {
    if (userInfo?.accessToken) {
      setLoginStatus();
    } else {
      setLogoutStatus();
    }
  }, [userInfo, setLoginStatus, setLogoutStatus]);

  const loginStatusButton = (loginStatus: 'login' | 'logout' | 'loading' | 'account-delete') => {
    const statusName =
      loginStatus === 'login' ? (
        <span className='text-secondary400'>{userInfo.nickname || NO_USER_NAME}님</span>
      ) : (
        <span>로그인</span>
      );

    const icon = loginStatus === 'login' ? logoutIcon : loginIcon;

    return (
      <button
        onClick={openLoginModal}
        type='button'
        className='p1 text-gray100 font-bold flex items-center gap-[1rem]'
      >
        {statusName}
        <Image src={icon} alt={`${statusName}아이콘`} width={16} height={13} />
      </button>
    );
  };

  return (
    <header className='h-[9rem]'>
      <div className='flex flex-col bg-gray600 border-b border-b-gray200 fixed w-full z-40'>
        <div className='flex justify-between px-[1.6rem] py-[1.2rem]'>
          <Link href={MAIN} aria-label='메인'>
            <Image src={DevLogo} alt='DEVDEVDEV 로고' width={64} height={23} />
          </Link>
          {/* <Image src={HeaderBar} alt='바 로고' /> */}

          {loginStatusButton(loginStatus)}
        </div>

        <nav className='px-[1.6rem] py-[0.9rem] p2 font-bold'>
          <ul className='flex gap-[1.4rem]'>
            {MENU_LISTS.map((list) => (
              <li key={list.key} className='relative px-[1.4rem] py-[0.6rem] rounded-full'>
                {isActive(list.route, pathname) && (
                  <div className='absolute inset-0 bg-[#000000] opacity-50 rounded-full'></div>
                )}
                <Link
                  href={list.route}
                  onClick={() => handleRefreshLinkClick(list.route)}
                  className='relative z-10 text-white'
                >
                  {list.label}
                </Link>
              </li>
            ))}

            {loginStatus === 'login' && (
              <li className='relative px-[1.4rem] py-[0.6rem] rounded-full'>
                {isActive('/myinfo', pathname) && (
                  <div className='absolute inset-0 bg-[#000000] opacity-50 rounded-full'></div>
                )}
                <Link
                  href={`${MY_INFO.MAIN}/`}
                  onClick={() => handleRefreshLinkClick(MY_INFO.PREFIX)}
                  className='relative z-10 text-white'
                >
                  내정보 🧀
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
