import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import useIsMobile from '@hooks/useIsMobile';

import { MainButton } from '@components/common/buttons/mainButtons';

import RetryIcon from '@public/assets/ReplayIcon';
import ArrowLeft from '@public/image/arrow-left-2.svg';
import MobileErrorImage from '@public/image/error-mobile.svg';
import ErrorImage from '@public/image/error.svg';

import { PAGE_ERROR_MESSAGE1, PAGE_ERROR_MESSAGE2 } from '@/constants/errorMessageConstants';
import { ROUTES } from '@/constants/routes';

import * as Sentry from '@sentry/nextjs';

export default function ErrorPage({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleRetryClick = () => {
    resetErrorBoundary();
    router.reload();
  };

  useEffect(() => {
    // 페이지 렌더링 중 발생하는 모든 에러를 처리
    Sentry.captureException(new Error('Client-side error occurred'));
  }, []);

  return (
    <div className='flex flex-col items-center mt-[11.8rem]'>
      {isMobile ? (
        <Image src={MobileErrorImage} alt='에러 이미지' />
      ) : (
        <Image src={ErrorImage} alt='에러 이미지' />
      )}
      <p className='st2 font-bold mt-[4.629rem] mb-[3.2rem] text-center'>
        {PAGE_ERROR_MESSAGE1}
        {isMobile ? <br /> : ' '}
        {PAGE_ERROR_MESSAGE2}
      </p>

      <MainButton
        text='메인으로 돌아가기'
        variant='primary'
        icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
        onClick={() => {
          resetErrorBoundary();
          router.push(ROUTES.MAIN);
        }}
      />

      <button
        type='button'
        onClick={handleRetryClick}
        className='flex gap-[1.2rem] items-center mt-[2.5rem]'
      >
        <RetryIcon color='var(--gray200)' />
        <span className='p1 font-bold text-gray200'>새로고침</span>
      </button>
    </div>
  );
}
