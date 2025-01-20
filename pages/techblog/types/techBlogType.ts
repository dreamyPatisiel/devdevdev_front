import { TechBlogDropdownProps } from '@stores/dropdownStore';

export interface GetTechBlogProps {
  elasticId?: string;
  techSort: TechBlogDropdownProps;
  keyword?: string;
  companyId?: number | null;
  score?: number;
  size?: number;
  token?: string;
}

// 하나의 카드에 필요한 정보
export interface TechCardProps {
  id: number;
  elasticId: string;
  thumbnailUrl: string;
  title: string;
  company: {
    id: number;
    name: string;
    careerUrl: string;
  };
  regDate: string;
  author: string;
  contents: string;
  viewTotalCount: number; // 조회수
  recommendTotalCount: number; // 추천수
  commentTotalCount: number; // 댓글수
  popularScore: number; // 인기 점수,
  isBookmarked: boolean; // 북마크여부
  techArticleUrl: string; // 기술블로그 원본 url
  isLogoImage: boolean; // 회사로고이미지인지 여부
  isRecommended: boolean;
}

// 기술블로그 전체값
export interface TechTotalData {
  content: TechCardProps[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

// 북마크 성공시 res값
export interface TechBookmarkStatus {
  techArticleId: number;
  status: boolean;
}

export interface TechRecommendArticleStatus {
  techArticleId: number;
  status: boolean;
}
