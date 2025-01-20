import { TechBlogDropdownProps } from "@stores/dropdownStore";

// 기술블로그 글 조회
export const TECH_VIEW_SIZE = 10;
export const MOBILE_MAIN_TECH_VIEW_SIZE = 3;

// 기술블로그 상세 - 댓글조회
export const TECH_COMMENT_VIEW_SIZE = 10;

// 무한스크롤 파라미터 초깃값
export const INITIAL_TECH_SORT_OPTION: TechBlogDropdownProps = 'LATEST';
export const INITIAL_TECH_SEARCH_KEYWORD: string = '';
export const INITIAL_TECH_COMPANY_ID: number | null = null;