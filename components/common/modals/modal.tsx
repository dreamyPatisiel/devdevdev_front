import { AnimatePresence, motion } from 'framer-motion';

import React, { CSSProperties, ReactNode } from 'react';

import Image from 'next/image';

import { cn } from '@utils/mergeStyle';

import { useBlameReasonStore, useSelectedStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore, useModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';
import useLogoutMutation from '@hooks/useLogoutMutation';

import LoginButton from '@components/common/LoginButton';
import { LargeBorderDropdown } from '@components/common/dropdowns/dropdown';

import 댑구리_login from '@public/image/뎁구리/댑구리_login.svg';

import { TypeBlames } from '@/api/useGetBlames';

import { ModalButton, LogoutButton } from '../../common/buttons/subButtons';
import { modalVariants } from './modalVariants';

const centerStyle: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const ModalAnimateContainer = ({
  closeModal,
  children,
}: {
  closeModal: () => void;
  children: ReactNode;
}) => {
  return (
    <div className='fixed z-50'>
      <AnimatePresence>
        <motion.div
          data-testid='modal-background'
          key='modal-background'
          className='fixed inset-0 bg-black opacity-50 z-50'
          onClick={closeModal}
        />
        <motion.div
          key='modal'
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export function LoginModal() {
  const { closeLoginModal, description, setDescription } = useLoginModalStore();
  const isMobile = useIsMobile();

  return (
    <>
      <ModalAnimateContainer
        closeModal={() => {
          closeLoginModal();
          setDescription('');
        }}
      >
        <div
          data-testid='login-modal'
          className={`bg-gray600 border border-gray200 rounded-[1.6rem] px-[4.1rem] pt-[3.2rem] pb-[4.2rem] z-50 ${isMobile ? 'w-[34.2rem]' : 'w-[38.5rem]'}`}
          style={centerStyle}
        >
          <Image
            className={`fixed -top-[10.6rem] ${isMobile ? 'left-[9rem] ' : 'left-[11.5rem] '}`}
            src={댑구리_login}
            alt='로그인 뎁뎁이'
          />
          <h1 className={`text-center mb-[2.6rem] font-bold ${isMobile ? 'st1' : 'h3'}`}>
            ✨ 3초만에 댑댑이 되기! ✨
            <p className='p1 text-gray100 whitespace-pre-wrap'>{description}</p>
          </h1>

          <LoginButton />
        </div>
      </ModalAnimateContainer>
    </>
  );
}

export function LogoutModal({ handleLogout }: { handleLogout: () => void }) {
  const { closeLoginModal } = useLoginModalStore();
  const isMobile = useIsMobile();
  const baseWrapperClass = 'text-white bg-gray600 z-50';
  const mobileWrapperClass = 'w-[29.5rem] rounded-[1.2rem] p-[2.4rem]';
  const desktopWrapperClass = 'w-[38.5rem] rounded-[1.6rem] p-[3.1rem]';

  const baseFontClass = 'st1 text-center font-bold mb-[3.2rem]';

  return (
    <ModalAnimateContainer closeModal={closeLoginModal}>
      <div
        data-testid='login-modal'
        className={`${baseWrapperClass} ${isMobile ? mobileWrapperClass : desktopWrapperClass}`}
        style={centerStyle}
      >
        <p className={`${baseFontClass}`}>로그아웃 할까요? 😢</p>
        <div className={`flex gap-[1.6rem] ${isMobile ? '' : 'p-4'} `}>
          {/* TODO: 버튼 공통 컴포넌트로 교체하기 */}
          <LogoutButton text='취소' variant='gray' onClick={closeLoginModal} />
          <LogoutButton text='로그아웃' variant='primary' onClick={handleLogout} />
        </div>
      </div>
    </ModalAnimateContainer>
  );
}

/** 로그인&로그아웃 모달을 상태에 따라 보여주는 컴포넌트 */
export function AuthModal() {
  const { isLoginModalOpen } = useLoginModalStore();
  const { loginStatus } = useLoginStatusStore();
  const logoutMutation = useLogoutMutation();
  return (
    <>
      {isLoginModalOpen &&
        (loginStatus === 'login' ? (
          <LogoutModal handleLogout={logoutMutation.mutate} />
        ) : (
          <LoginModal />
        ))}
    </>
  );
}

interface ModalProps {
  title: string;
  contents?: string | null;
  submitText?: string;
  size?: 's' | 'm' | 'l';
  submitFn?: () => void;
  cancelFn?: () => void;
  disabled?: boolean;
  isPending?: boolean;
  titleCenter?: boolean;
  dropDownList?: TypeBlames[] | null;
  status?: 'error' | 'success' | 'pending';
}

export function Modal({
  title,
  contents,
  submitText,
  size = 's',
  submitFn,
  cancelFn,
  dropDownList,
  disabled,
  isPending,
  titleCenter,
}: ModalProps) {
  const { closeModal, modalSubmitFn } = useModalStore();
  const { refreshSelectedBlameData } = useSelectedStore();
  const { refreshBlameReason } = useBlameReasonStore();

  const isMobile = useIsMobile();

  const text = submitText ? '취소' : '닫기';

  return (
    <ModalAnimateContainer
      closeModal={() => {
        closeModal();
        refreshSelectedBlameData();
      }}
    >
      <div
        className={cn(
          'bg-gray600 rounded-[1.6rem] z-50 shadow-[0_2px_10px_0_rgba(0,0,0,0.4)]',
          isMobile ? 'p-[2.4rem]' : 'p-[3.2rem]',
          isMobile
            ? {
                'w-[29.5rem]': size === 's',
                'w-[30rem]': size === 'm', // 신고하기 모달이 모바일에서 깨지는 부분를 위해 임시로 설정
              }
            : {
                'w-[40rem]': size === 's',
                'max-w-[65rem] min-w-[44rem]': size === 'm',
                'w-[80rem]': size === 'l',
              },
        )}
        style={centerStyle}
      >
        <div className={`flex flex-col text-center`}>
          <h3
            className={`font-bold text-white st1
              ${titleCenter ? 'text-center' : ''}`}
          >
            {title}
          </h3>
          {contents && (
            <p
              className={`text-gray200 whitespace-pre-wrap mt-[0.8rem]
            ${isMobile ? 'p2' : 'p1'}`}
            >
              {contents}
            </p>
          )}
        </div>

        {dropDownList && (
          <div className='mt-[3.2rem]'>
            <LargeBorderDropdown dropdownMenu={dropDownList} />
          </div>
        )}

        <div className={`flex gap-[1.2rem] mt-[3.2rem] justify-end`}>
          <ModalButton
            text={text}
            variant='secondary'
            onClick={() => {
              if (cancelFn) {
                cancelFn();
              }
              refreshSelectedBlameData();
              refreshBlameReason();
              closeModal();
            }}
          />
          {submitText && (
            <ModalButton
              text={submitText}
              variant='primary'
              onClick={submitFn ?? modalSubmitFn}
              disabled={disabled}
              isPending={isPending}
            />
          )}
        </div>
      </div>
    </ModalAnimateContainer>
  );
}
