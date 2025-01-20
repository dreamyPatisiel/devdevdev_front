import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { MainButton } from '@components/common/buttons/mainButtons';

import ArrowLeft from '@public/image/arrow-left-2.svg';

import { NO_MYINFO_DATA } from '@/constants/NoMyInfoDataContants';

const TitleContent = ({ title, subTitle }: { title: string; subTitle: string }) => {
  const TITLE_STYLE = 'st2 font-bold';
  const SUBTITLE_STYLE = 'p1 text-gray200 mb-[2.4rem]';

  return (
    <>
      <p className={TITLE_STYLE}>{title}</p>
      <p className={SUBTITLE_STYLE}>{subTitle}</p>
    </>
  );
};

export default function NoMyInfoData({
  type,
  title,
  subTitle,
}: {
  type: 'noMyPick' | 'noMyTech' | 'noMyComment';
  title?: string;
  subTitle?: string;
}) {
  const router = useRouter();
  const btnText =
    type === 'noMyPick' ? '픽픽픽 작성하기' : type === 'noMyTech' ? '기술블로그로 이동하기' : null;
  const message = type === 'noMyPick' ? NO_MYINFO_DATA.PICKPICKPICK : NO_MYINFO_DATA.BOOKMARK;
  const link =
    type === 'noMyPick' ? NO_MYINFO_DATA.PICKPICKPICK.LINK : NO_MYINFO_DATA.BOOKMARK.LINK;

  return (
    <div className='flex flex-col items-center justify-center gap-[2rem] text-center'>
      <p className='text-[5.6rem] mb-[2.4rem] mt-[7.2rem]'>😳</p>
      <TitleContent title={title ?? message.TITLE} subTitle={subTitle ?? message.SUBTITLE} />
      {btnText && (
        <MainButton
          text={btnText}
          variant='primary'
          icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
          onClick={() => router.push(link)}
        />
      )}
    </div>
  );
}
