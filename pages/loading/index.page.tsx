import React from 'react';

import { DevDevDevLoading } from '@components/common/devdevdevLoading/devLoading';

export default function DevLoadingComponent() {
  return (
    <div className='w-full h-[80vh] flex flex-col justify-center items-center'>
      <DevDevDevLoading />
      <p className='st1 text-gray200 font-bold'>로딩중입니다</p>
    </div>
  );
}
