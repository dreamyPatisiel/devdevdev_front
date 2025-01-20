import { useRef } from 'react';
import React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import MyWritingNav from '@pages/myinfo/components/MyWritingNav';
import NoMyInfoData from '@pages/myinfo/components/NoMyInfoData';
import MyInfo from '@pages/myinfo/index.page';
import { PickDataProps } from '@pages/pickpickpick/types/pick';

import useIsMobile from '@hooks/useIsMobile';
import { useObserver } from '@hooks/useObserver';

import { MyPickSkeletonList } from '@components/common/skeleton/pickSkeleton';

import { ROUTES } from '@/constants/routes';

import { useGetMyPicks } from './apiHooks/useGetMyPicks';

const DynamicComponent = dynamic(() => import('@/pages/pickpickpick/components/PickContainer'));

export default function MyPick() {
  const { myPicks, isFetchingNextPage, hasNextPage, status, error, onIntersect } = useGetMyPicks();
  const isMobile = useIsMobile();

  const bottom = useRef(null);

  useObserver({
    target: bottom,
    onIntersect,
  });

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <MyPickSkeletonList rows={3} itemsInRows={2} />;

      case 'error':
        return <p>Error: {error?.message}</p>;

      default:
        if (myPicks?.pages[0].data.data.content.length === 0)
          return <NoMyInfoData type='noMyPick' />;

        return (
          <>
            <div className={`${isMobile ? 'gap-[2.2rem] ' : 'grid grid-cols-2 gap-[2.4rem] '}`}>
              {myPicks?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group?.data?.data?.content?.map((data: PickDataProps) =>
                    data.contentStatus === 'APPROVAL' ? (
                      <Link href={`${ROUTES.PICKPICKPICK.MAIN}/${data.id}`} key={data.id}>
                        <DynamicComponent
                          key={data.id}
                          pickData={data}
                          status={data.contentStatus}
                        />
                      </Link>
                    ) : (
                      <DynamicComponent key={data.id} pickData={data} status={data.contentStatus} />
                    ),
                  )}
                </React.Fragment>
              ))}
            </div>

            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <MyPickSkeletonList rows={3} itemsInRows={2} />;
              </div>
            )}
          </>
        );
    }
  };

  return (
    <MyInfo>
      <MyWritingNav />

      {getStatusComponent()}
      <div ref={bottom} />
    </MyInfo>
  );
}
