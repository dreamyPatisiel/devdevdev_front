import { ROUTES } from '@/constants/routes';

/** 현재 페이지가 클릭한 nav와 일치하는지 확인하는 함수 */
export const isActive = (link: '/pickpickpick' | '/techblog' | '/myinfo', pathname: string) => {
  const { MY_INFO, PICKPICKPICK, TECH_BLOG } = ROUTES;
  if ([MY_INFO.PREFIX, PICKPICKPICK.MAIN, TECH_BLOG].includes(link)) {
    return pathname.startsWith(link);
  }
  return pathname === link;
};
