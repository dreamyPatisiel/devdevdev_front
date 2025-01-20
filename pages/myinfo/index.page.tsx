import React, { ReactNode, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { cn } from '@utils/mergeStyle';

import { useDropdownStore } from '@stores/dropdownStore';
import { useModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import useIsMobile from '@hooks/useIsMobile';

import { Modal } from '@components/common/modals/modal';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';
import { UserInfoType } from '@/types/userInfoType';

export default function MyInfo({ children }: { children: ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const { setSort } = useDropdownStore();
  const { userInfo } = useUserInfoStore();
  const { isModalOpen, title, contents, modalSubmitFn, isPending } = useModalStore();
  const isMobile = useIsMobile();

  const [clientUserInfo, setClientUserInfo] = useState<UserInfoType>();

  useEffect(() => {
    setClientUserInfo(userInfo);
  }, []);

  const ACTIVE_CLASS = 'bg-gray600 rounded-xl text-white font-bold';

  const MyInfoLinkStyle = {
    base: 'hover:text-white',
    mobile: 'p-[1.8rem] w-[11.9rem] h-[5.1rem] flex justify-center items-center',
    desktop: 'p-7',
  };

  const MYINFO_LINKS = [
    {
      href: ROUTES.MY_INFO.MAIN,
      label: '내가 썼어요',
      startHref: ROUTES.MY_INFO.MY_WRITING_PREFIX,
    },
    {
      href: ROUTES.MY_INFO.BOOK_MARK,
      label: '북마크',
      handleOnClick: () => {
        setSort('BOOKMARKED');
      },
      startHref: ROUTES.MY_INFO.BOOK_MARK,
    },
    {
      href: ROUTES.MY_INFO.ACCOUNT_DELETE,
      label: '회원탈퇴',
      startHref: ROUTES.MY_INFO.ACCOUNT_DELETE,
    },
  ];

  return (
    <div
      className={`${isMobile ? 'px-[1.6rem] flex flex-col' : 'grid grid-flow-col px-[20.3rem] py-[6.4rem] gap-[4.8rem] grid-cols-[21%,auto]'}`}
    >
      <section className='w-full'>
        <p className='st1 font-bold mb-[1.6rem]'>
          <span className='text-secondary400'>{clientUserInfo?.nickname || NO_USER_NAME}</span>님
        </p>
        <p className='p2 text-gray200'>{clientUserInfo?.email}</p>
        <ul
          className={`flex p1 text-gray200 mt-16 ${isMobile ? ' justify-between mb-[3.2rem]' : 'flex-col '}`}
        >
          {MYINFO_LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={link.handleOnClick || undefined}
              className={cn(
                MyInfoLinkStyle.base,
                currentPath.startsWith(link.startHref) ? ACTIVE_CLASS : '',
                isMobile ? MyInfoLinkStyle.mobile : MyInfoLinkStyle.desktop,
              )}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </section>
      <section className='w-full'>{children}</section>

      {isModalOpen && (
        <Modal
          title={title}
          contents={contents}
          size='m'
          submitText='삭제'
          submitFn={modalSubmitFn}
          isPending={isPending}
        />
      )}
    </div>
  );
}
