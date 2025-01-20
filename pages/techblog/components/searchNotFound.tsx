import React from 'react';

import Image from 'next/image';

import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';

import useIsMobile from '@hooks/useIsMobile';

import { MainButton } from '@components/common/buttons/mainButtons';

import ArrowLeft from '@public/image/techblog/angle-left-white.svg';

export default function SearchNotFound() {
  const isMobile = useIsMobile();
  const { setCompanyId } = useCompanyIdStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const handleOnClick = () => {
    setSearchKeyword('');
    setCompanyId(null);
  };
  return (
    <div className='flex flex-col justify-center items-center gap-[3.2rem] pt-[6rem]'>
      <span className='text-[6.4rem] inline-block'>😭</span>
      <p className={`${isMobile ? 'h3' : 'h1'} font-bold`}> 죄송해요. 찾을 수가 없어요.</p>
      <p className='p1 mb-[3.2rem]'>
        &apos;<span className='text-secondary400'>{searchKeyword}</span>&apos;에 대한 검색결과가
        없어요.
      </p>

      <MainButton
        text=' 처음으로 돌아가기'
        icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
        variant='primary'
        onClick={handleOnClick}
      />
    </div>
  );
}
