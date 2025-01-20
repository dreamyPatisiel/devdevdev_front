import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import PurpleComment from '@public/image/pickpickpick/comment-dots-purple.svg';
import PurpleFire from '@public/image/pickpickpick/fire-purple.svg';

import { SimilarPickData } from '../types/similarPickData';

interface SimilarPickProps {
  data: SimilarPickData;
}

export default function SimilarPick({ data }: SimilarPickProps) {
  return (
    <div className='rounded-[1.6rem] px-[2.4rem] py-[3.2rem] bg-gray600 h-[17.1rem] flex flex-col justify-between'>
      <ArrowWithTitle variant={'similarPick'} title={data.title} className='ellipsis' />

      <div className='mt-[3.2rem] flex items-center gap-8 flex-wrap'>
        <StatisticsItem
          icon={PurpleFire}
          alt='투표 이미지'
          text='투표'
          count={data.voteTotalCount}
          textColor='text-primary200'
        />
        <StatisticsItem
          icon={PurpleComment}
          alt='댓글 이미지'
          text='댓글'
          count={data.commentTotalCount}
          textColor='text-primary200'
        />
      </div>
    </div>
  );
}
