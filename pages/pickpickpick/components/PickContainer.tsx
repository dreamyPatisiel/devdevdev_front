import Image from 'next/image';

import { cn } from '@utils/mergeStyle';

import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import exclamationGray from '@public/image/exclamation-circle-gray.svg';
import exclamationRed from '@public/image/exclamation-circle-red.svg';
import PurpleComment from '@public/image/pickpickpick/comment-dots-purple.svg';
import PurpleFire from '@public/image/pickpickpick/fire-purple.svg';

import { PickDataProps } from '../types/pick';
import PickAnswer from './PickAnswer';

export default function PickContainer({
  pickData,
  status,
  type = 'pick',
}: {
  pickData: PickDataProps;
  status?: 'APPROVAL' | 'REJECT' | 'READY';
  type?: 'main' | 'pick';
}) {
  const disabled = status === 'READY' || status === 'REJECT';

  const StatusContent = () => {
    switch (status) {
      case 'READY':
        return (
          <p className='c1 font-bold flex text-gray100 gap-[0.4rem]'>
            <Image src={exclamationGray} alt='회색 주의 아이콘' />
            픽픽픽 등록 대기중
          </p>
        );
      case 'REJECT':
        return (
          <p className='c1 font-bold flex text-red100 gap-[0.4rem]'>
            <Image src={exclamationRed} alt='빨간색 주의 아이콘' />
            등록이 거부된 게시물이에요
          </p>
        );
      default:
        return (
          <>
            <StatisticsItem
              icon={PurpleFire}
              alt='투표 이미지'
              text='투표'
              count={pickData.voteTotalCount}
              textColor='text-primary200'
            />
            <StatisticsItem
              icon={PurpleComment}
              alt='댓글 이미지'
              text='댓글'
              count={pickData.commentTotalCount}
              textColor='text-primary200'
            />
          </>
        );
    }
  };

  const ContainerClass = cn({
    'h-[40.3rem] mb-[2rem]': type !== 'main',
    'h-auto mb-[1.6rem] ': type === 'main',
  });

  const ContentClass = cn('bg-gray600 px-[2.4rem] rounded-t-[1.6rem]', {
    'opacity-50': disabled,
    'py-[2.8rem] h-[10.1rem]': type !== 'main',
    'py-[2rem] h-auto': type === 'main',
  });

  const PickAnswerClass = cn('h-[9rem]', {
    'p-[1.6rem] h-auto rounded-[0.8rem]': type === 'main',
  });

  return (
    <div className={ContainerClass}>
      <div className={ContentClass}>
        <ArrowWithTitle
          title={pickData.title}
          className={cn('ellipsis', { 'opacity-50': disabled })}
          ArrowClassName={cn({ 'opacity-50': disabled })}
        />
      </div>

      <div
        className={`px-[2.4rem] rounded-b-[1.6rem] border-gray400 border-solid border border-t-0 py-[3.2rem] ${type === 'main' && 'py-[2.4rem]'}`}
      >
        <ul className={cn('grid gap-6', { 'opacity-50': disabled })}>
          {pickData.pickOptions.map((option) => (
            <PickAnswer
              key={option.id}
              {...option}
              isVoted={pickData.isVoted}
              className={PickAnswerClass}
            />
          ))}
        </ul>

        <div className='mt-[3.2rem] flex items-center gap-8 flex-wrap'>{StatusContent()}</div>
      </div>
    </div>
  );
}
