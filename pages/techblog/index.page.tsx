import React, { useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';

import { InfiniteData, useQueryClient, QueryClient, dehydrate } from '@tanstack/react-query';

import { TechBlogDropdownProps, useTechblogDropdownStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';
import { useObserver } from '@hooks/useObserver';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';
import SearchInput from '@components/common/searchInput';
import {
  MobileTechSkeletonList,
  TechSkeletonList,
} from '@components/common/skeleton/techBlogSkeleton';
import MetaHead from '@components/meta/MetaHead';

import { techBlogDropdownOptions } from '@/constants/DropdownOptionArr';
import { ONE_DAY_IN_SECONDS } from '@/constants/TimeConstants';
import { META } from '@/constants/metaData';

import { useInfiniteTechBlogData, getTechBlogData } from './api/useInfiniteTechBlog';
import SearchNotFound from './components/searchNotFound';
import {
  INITIAL_TECH_COMPANY_ID,
  INITIAL_TECH_SEARCH_KEYWORD,
  INITIAL_TECH_SORT_OPTION,
  TECH_VIEW_SIZE,
} from './constants/techBlogConstants';
import { TechCardProps } from './types/techBlogType';

const DynamicTechCard = dynamic(() => import('@/pages/techblog/components/techCard'));

export default function Index() {
  const bottomDiv = useRef(null);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const { loginStatus } = useLoginStatusStore();

  const { sortOption, setSort } = useTechblogDropdownStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const { companyId, setCompanyId } = useCompanyIdStore();
  const { setToastInvisible } = useToastVisibleStore();

  const { title, description, keyword, url } = META.TECH;

  const { techBlogData, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useInfiniteTechBlogData(sortOption as TechBlogDropdownProps, searchKeyword, companyId);

  const totalArticleCnt = techBlogData?.pages[0].data.totalElements;

  useObserver({
    target: bottomDiv,
    onIntersect,
  });

  useEffect(() => {
    setToastInvisible();
  }, []);

  useEffect(() => {
    // 회원일 경우 프리패치를 사용하지 않음
    if (loginStatus === 'login') {
      queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
    }
  }, [loginStatus]);

  const getStatusComponent = (
    CurTechBlogData: InfiniteData<any, unknown> | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    switch (status) {
      // TODO: 첫 렌더링시 바로 모바일,웹 구분되서 동작하도록 개선 필요
      case 'pending':
        if (isMobile) {
          return <MobileTechSkeletonList itemsInRows={10} />;
        } else {
          return <TechSkeletonList itemsInRows={10} />;
        }

      default:
        return (
          <>
            <div>
              {CurTechBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCardProps) => (
                    <DynamicTechCard key={data.id} techData={data} type='techblog' />
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <TechSkeletonList itemsInRows={10} />
              </div>
            )}

            {totalArticleCnt === 0 && <SearchNotFound />}
          </>
        );
    }
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    setCompanyId(null);
    queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
    setSort('LATEST');
  };

  return (
    <>
      <MetaHead title={title} description={description} keyword={keyword} url={url} />
      <div className={isMobile ? 'px-[1.6rem] pb-[4.0rem]' : 'px-[20.4rem] pb-[16.5rem]'}>
        <div className={`pb-[2.4rem] ${isMobile ? '' : 'pt-[6.4rem]'}`}>
          <div className={`${isMobile ? '' : 'flex flex-row items-center justify-between'}`}>
            <h1
              onClick={refreshTechArticleParams}
              className={`${isMobile ? 'st1 inline-block mb-[2.4rem]' : 'h3'} font-bold cursor-pointer`}
            >
              기술블로그 🧪
            </h1>
            <SearchInput />
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <p className='p1'>
            총 <span className='text-secondary500 font-bold'>{totalArticleCnt}</span>건
          </p>
          {isMobile ? <MobileDropdown type='techblog' /> : <Dropdown type='techblog' />}
        </div>
        {getStatusComponent(techBlogData, status)}
        <div ref={bottomDiv} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['techBlogData', 'LATEST', '', null, null],
      queryFn: ({ pageParam = '' }) => {
        const isValidSortOption = techBlogDropdownOptions.includes(INITIAL_TECH_SORT_OPTION);
        let elasticId = '';
        let score = 0;

        if (pageParam) {
          const parsedParam = JSON.parse(pageParam);
          elasticId = parsedParam.elasticId;
          score = parsedParam.score;
        }
        if (!isValidSortOption) {
          return Promise.resolve({ data: { content: [], last: true } });
        }
        return getTechBlogData({
          elasticId,
          techSort: INITIAL_TECH_SORT_OPTION,
          keyword: INITIAL_TECH_SEARCH_KEYWORD,
          companyId: INITIAL_TECH_COMPANY_ID,
          score,
          size: TECH_VIEW_SIZE,
        });
      },
      initialPageParam: '',
      pages: 1, // 첫 페이지만 프리페치
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: ONE_DAY_IN_SECONDS, // 페이지를 하루(24시간)마다 다시 생성
    };
  } catch (error) {
    console.error('Error prefetching tech blog data:', error);
    throw new Error('데이터를 프리패치 하는중 오류가 발생했습니다.');
  }
}
