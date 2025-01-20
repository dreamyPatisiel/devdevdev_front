export interface RoutesType {
  Routes: typeof ROUTES;
}

export interface PickRoutesType {
  PickRoutes: typeof PICK_ROUTES;
}

export interface MyInfoType {
  MyInfoRoutes: typeof MY_INFO_ROUTES;
}

const PICK_ROUTES = {
  MAIN: '/pickpickpick' as const,
  POSTING: '/pickposting' as const,
};

const MY_INFO_ROUTES = {
  PREFIX: '/myinfo',
  MY_WRITING_PREFIX: '/myinfo/mywriting',
  MAIN: '/myinfo/mywriting/mypick' as const,
  MY_COMMENT: '/myinfo/mywriting/mycomment' as const,
  BOOK_MARK: '/myinfo/bookmark' as const,
  ACCOUNT_DELETE: '/myinfo/account-delete' as const,
};

export const ROUTES = {
  MAIN: '/main' as const,
  PICKPICKPICK: PICK_ROUTES,
  TECH_BLOG: '/techblog' as const,
  MY_INFO: MY_INFO_ROUTES,
};
