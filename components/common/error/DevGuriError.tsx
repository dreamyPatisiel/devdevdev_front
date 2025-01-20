import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import RetryIcon from '@public/assets/ReplayIcon';
import paper from '@public/image/paper.svg';
import 뎁구리_에러사진 from '@public/image/뎁구리/뎁구리_Error.svg';

import { DEVGURI_ERR_TEXT } from '@/constants/DevGuriErrorTxtConstants';

import { MainButton } from '../buttons/mainButtons';

type ErrorText = {
  BUTTON_TEXT: string;
  MAIN_TITLE: string;
  SUB_TITLE1: string;
  SUB_TITLE2?: string;
};

export default function DevGuriError({
  type,
  pathname,
  resetErrorBoundary,
}: {
  type: 'mobile' | 'network';
  pathname?: string;
  resetErrorBoundary?: () => void;
}) {
  const { setToastVisible } = useToastVisibleStore();

  const errorText: ErrorText =
    type === 'mobile' ? DEVGURI_ERR_TEXT.MOBILE : DEVGURI_ERR_TEXT.NETWORK_ERR;
  const mainTitle = errorText.MAIN_TITLE;
  const subTitle1 = errorText.SUB_TITLE1;
  const subTitle2 = type === 'mobile' ? errorText.SUB_TITLE2 : '';
  const btnText = errorText.BUTTON_TEXT;

  const paperIcon = <Image src={paper} alt='링크복사 아이콘' />;
  const retryIcon = <RetryIcon />;

  const SUBTIT_STYLE = `st2 ${type === 'mobile' ? 'text-white' : 'text-gray200'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`devdevdev.co.kr${pathname}`);
      setToastVisible({ message: '링크를 복사했어요!' });
    } catch (err) {
      console.error('URL 복사 실패:', err);
    }
  };

  const router = useRouter();

  const handleRetryClick = () => {
    resetErrorBoundary?.();
    router.reload();
  };

  return (
    <div className='flex flex-col justify-center items-center gap-[3.2rem]'>
      <Image src={뎁구리_에러사진} alt='뎁구리 에러사진' />
      <p className='st2 font-bold'>{mainTitle}</p>
      <div className='flex flex-col justify-center items-center font-medium'>
        <p className={SUBTIT_STYLE}>{subTitle1}</p>
        {subTitle2 && <p className={SUBTIT_STYLE}>{subTitle2}</p>}
      </div>
      <MainButton
        variant='primary'
        text={btnText}
        icon={type === 'mobile' ? paperIcon : retryIcon}
        onClick={type === 'mobile' ? handleCopyLink : () => handleRetryClick()}
      />
    </div>
  );
}
