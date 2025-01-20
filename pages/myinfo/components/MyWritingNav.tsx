import Link from 'next/link';
import { useRouter } from 'next/router';

import useIsMobile from '@hooks/useIsMobile';

import { ROUTES } from '@/constants/routes';

import { useInfiniteMyComments } from '../mywriting/mycomment/apiHooks/useInfiniteMyComment';
import { useGetMyPicks } from '../mywriting/mypick/apiHooks/useGetMyPicks';

export default function MyWritingNav() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { myPicks } = useGetMyPicks();
  const { myCommentData } = useInfiniteMyComments({ commentFilter: 'ALL' });

  const { pathname } = router;

  const MY_PICKS_TOTAL = myPicks?.pages[0].data.data.numberOfElements;
  const MY_COMMENTS_TOTAL = myCommentData?.pages[0].data.totalElements;

  const NAV_ITEMS = [
    {
      key: 'mypick',
      name: '게시물',
      count: MY_PICKS_TOTAL ?? 0,
      pathname: ROUTES.MY_INFO.MAIN,
      active: pathname === ROUTES.MY_INFO.MAIN,
    },
    {
      key: 'mycomment',
      name: '댓글',
      count: MY_COMMENTS_TOTAL ?? 0,
      pathname: ROUTES.MY_INFO.MY_COMMENT,
      active: pathname === ROUTES.MY_INFO.MY_COMMENT,
    },
  ];

  return (
    <div>
      {isMobile ? <></> : <h1 className='h3 font-bold mb-[2.6rem]'>내가 썼어요</h1>}

      <div className='mb-[2.4rem]'>
        {NAV_ITEMS.map((navItem) => (
          <Link
            key={navItem.key}
            href={navItem.pathname}
            className={`st2 font-bold p-[1rem] inline-block
        ${navItem.active ? 'border-b-[0.1rem] border-b-white text-white' : 'text-gray200'}`}
          >
            {navItem.name}
            <span
              className={`ml-[0.6rem] ${navItem.active ? 'text-secondary300' : 'text-secondary300 opacity-50'}`}
            >
              {navItem.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
