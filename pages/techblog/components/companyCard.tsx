import React from 'react';

import { ImgWrapper } from './techSubComponents';

export default function CompanyCard({ Img }: { Img: React.ReactElement }) {
  return (
    <li className='flex flex-row gap-[1.6rem] min-w-[48rem] max-h-[14.5rem]'>
      <ImgWrapper width='16.1rem' height='14.5rem'>
        {Img}
      </ImgWrapper>
      <div className='flex flex-col gap-[2rem] py-[1.6rem] pr-[2.4rem]'>
        <h2 className='st2'>토스인슈어런스 개발자 공고</h2>
        <p className='p2'>무슨 내용이 들어가면 좋으려나, 이것도 태그를 써야하나? 고민이 됩니다.</p>
        <span className='c1 text-primary200'>방금 떴어요!</span>
      </div>
    </li>
  );
}
