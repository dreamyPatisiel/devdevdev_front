import { useState } from 'react';

import dynamic from 'next/dynamic';

import MyWritingNav from '@pages/myinfo/components/MyWritingNav';
import MyInfo from '@pages/myinfo/index.page';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

export type CommentFilterKey = 'ALL' | 'PICK' | 'TECH_ARTICLE';
type CommentFilterName = '전체' | '픽픽픽' | '기술블로그';

interface CommentFilterListProps {
  filterStatus: CommentFilterKey;
  filterName: CommentFilterName;
}

const DynamicMyComments = dynamic(
  () => import('@/pages/myinfo/mywriting/mycomment/components/MyComments'),
);

export default function MyComment() {
  const [commentFilterStatus, setCommentFilterStatus] = useState<CommentFilterKey>('ALL');

  const commentFilterList: CommentFilterListProps[] = [
    {
      filterStatus: 'ALL',
      filterName: '전체',
    },
    {
      filterStatus: 'PICK',
      filterName: '픽픽픽',
    },
    {
      filterStatus: 'TECH_ARTICLE',
      filterName: '기술블로그',
    },
  ];

  const handleCommentFilterClick = (filterStatus: CommentFilterKey) => {
    setCommentFilterStatus(filterStatus);
  };

  return (
    <MyInfo>
      <MyWritingNav />
      <div className='mb-[2.4rem] flex gap-[0.8rem]'>
        {commentFilterList.map((filter) => (
          <MainButtonV2
            key={filter.filterStatus}
            text={filter.filterName}
            radius='rounded'
            line={false}
            size='xSmall'
            color='gray'
            status={commentFilterStatus === filter.filterStatus ? 'on' : 'off'}
            onClick={() => handleCommentFilterClick(filter.filterStatus)}
          />
        ))}
      </div>

      <QueryErrorBoundary type='section'>
        <DynamicMyComments commentFilterStatus={commentFilterStatus} />
      </QueryErrorBoundary>
    </MyInfo>
  );
}
