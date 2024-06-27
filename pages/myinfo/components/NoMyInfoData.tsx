import React from 'react';

import { MainButton } from '@components/common/buttons/mainButtons';

export default function NoMyInfoData({ type }: { type: 'pickpickpick' | 'techblog' }) {
  const btnText = type === 'pickpickpick' ? '픽픽픽 작성하기' : '기술블로그로 이동하기 ';

  return (
    <div className='flex flex-col items-center justify-center gap-[2.4rem]'>
      <p className='text-[5.6rem] mb-[2.4rem]'>😳</p>

      {type === 'pickpickpick' ? (
        <>
          <p className='st2'>아직 작성한 픽픽픽이 없어요!</p>
          <p className='p1 text-gray4'>픽픽픽을 작성하러 가볼까요?</p>
        </>
      ) : (
        <>
          <p className='st2'>북마크 하신 기술블로그 게시물이 없어요!</p>
          <p className='p1 text-gray4'>따끈따끈한 게시물들 구경하러 가볼까요?</p>
        </>
      )}

      <MainButton text={btnText} variant='primary' />
    </div>
  );
}
