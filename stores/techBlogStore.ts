import { create } from 'zustand';
import { INITIAL_TECH_COMPANY_ID, INITIAL_TECH_SEARCH_KEYWORD } from '@pages/techblog/constants/techBlogConstants';

interface searchKeywordProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}
/**서버에 보낼 최종 키워드를 관리하는 store*/
export const useSearchKeywordStore = create<searchKeywordProps>((set) => ({
  searchKeyword: INITIAL_TECH_SEARCH_KEYWORD,
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
}));

interface companyIdProps {
  companyId: number | null;
  setCompanyId: (id: number | null) => void;
}
/** company id를 저장하고 있는 store */
export const useCompanyIdStore = create<companyIdProps>((set) => ({
  companyId: INITIAL_TECH_COMPANY_ID,
  setCompanyId: (id: number | null) => set({ companyId: id }),
}));

// 기술블로그 댓글 id를 저장하는 store (삭제,신고)
interface selectedCommentIdProps {
  selectedCommentId: number | null;
  setSelectedCommentId: (id: number | null) => void;
  setRefreshCommentTechblogId: () => void;
}
/** company id를 저장하고 있는 store */
export const useSelectedCommentIdStore = create<selectedCommentIdProps>((set) => ({
  selectedCommentId: null,
  setSelectedCommentId: (id) => set({ selectedCommentId: id }),
  setRefreshCommentTechblogId: () => set({ selectedCommentId: null }),
}));
