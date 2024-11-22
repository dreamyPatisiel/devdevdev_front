import React, { useEffect, useState } from 'react';

import { cn } from '@utils/mergeStyle';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore, useModalStore } from '@stores/modalStore';
import { useSelectedCommentIdStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';

import WritableComment from '@components/common/comment/WritableComment';
import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';

import { usePatchComment } from '../api/usePatchComment';
import { usePostRecommendComment } from '../api/useRecommendsComments';
import { RepliesProps } from '../types/techCommentsType';
import CommentActionButtons from './CommentActionButtons';

export interface CommentProps {
  mode?: 'register' | 'edit' | 'reply';
  replies?: RepliesProps[];
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  comment: string;
  isModified: boolean;
  isSubComment?: boolean;
  isRecommended: boolean;
  recommendTotalCount: number;
  articleId: number;
  techCommentId: number;
  techParentCommentMemberId?: number; // 답글의 부모 댓글 작성자 아이디
  techParentCommentId?: number; // 답글의 부모 댓글 아이디
  techOriginParentCommentId: number; // 답글의 최상위 부모 댓글 아이디
  techParentCommentAuthor: string;
  isBestComment?: boolean;
  isFirstComment?: boolean;
  isLastComment?: boolean;
}

export default function Comment({
  mode,
  replies,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  comment,
  isModified,
  isSubComment,
  recommendTotalCount,
  articleId,
  techCommentId,
  techOriginParentCommentId,
  techParentCommentId,
  isRecommended,
  techParentCommentAuthor,
  isBestComment,
  isFirstComment,
  isLastComment,
}: CommentProps) {
  const isMobile = useIsMobile();
  const { mutate: recommendCommentMutation } = usePostRecommendComment();

  const { setSelectedCommentId } = useSelectedCommentIdStore();
  const [isEditMode, setIsEditMode] = useState(false);

  const { mutate: patchCommentMutatation } = usePatchComment();

  const { loginStatus } = useLoginStatusStore();

  // 모달관련
  const { setModalType, openModal } = useModalStore();
  const { openLoginModal } = useLoginModalStore();
  // 토스트
  const { setToastVisible } = useToastVisibleStore();

  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditMode(false);
      }
    };
    window.addEventListener('keydown', handleEscKeydown);
    return () => window.removeEventListener('keydown', handleEscKeydown);
  }, []);

  const handleLikeClick = () => {
    if (isDeleted) {
      setToastVisible('삭제된 기술블로그 댓글은 추천할 수 없습니다.', 'error');
      return;
    }
    recommendCommentMutation({
      techArticleId: articleId,
      techCommentId: techCommentId,
    });
  };

  const authorActions = [
    {
      buttonType: '수정하기',
      moreButtonOnclick: () => {
        setIsEditMode(true);
      },
    },
    {
      buttonType: '삭제하기',
      moreButtonOnclick: () => {
        setSelectedCommentId(techCommentId);
        setIsEditMode(false);
        setModalType('삭제하기');
        openModal();
      },
    },
  ];

  const nonAuthorActions = [
    {
      buttonType: '신고하기',
      moreButtonOnclick: () => {
        if (loginStatus !== 'login') {
          openLoginModal();
          return;
        }
        openModal();
        setSelectedCommentId(techCommentId);
        setModalType('신고하기');
      },
    },
  ];

  const moreButtonList = isCommentAuthor ? authorActions : nonAuthorActions;

  /**  댓글 수정 함수 */
  const handleEditBtnClick = ({
    contents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    patchCommentMutatation(
      {
        techArticleId: articleId,
        techCommentId: techCommentId,
        contents: contents,
      },
      {
        onSuccess: () => {
          onSuccess();
          setIsEditMode(false);
        },
      },
    );
  };

  const getTechParentCommentAuthor = (): string => {
    if (techOriginParentCommentId !== techParentCommentId && techParentCommentAuthor) {
      return `@${techParentCommentAuthor} `;
    }
    return '';
  };

  const handleCancelButtonClick = () => {
    setIsEditMode(false);
  };

  // 댓글 wrapper 스타일
  const commentDefaultStyle =
    'flex flex-col gap-[2.4rem] border-b-0 border-b-gray3 border-t-[0.1rem] border-t-gray3 pt-[2.4rem] pb-[3.2rem]';
  const commentDesktopStyle = '';
  const commentMobileStyle = 'py-[3.2rem]';
  const subCommentDesktopStyle = 'bg-[#0D0E11] px-[3.2rem]';
  const subCommentMobileStyle = 'bg-[#0D0E11] px-[1.6rem]';

  // 댓글 상태별 Wrapper 스타일
  const commentDefaultStyleWithBorder = cn(
    commentDefaultStyle,
    isMobile ? commentMobileStyle : commentDesktopStyle,
    isFirstComment ? 'border-t-0' : '', // 대댓글을 열었을때 최초 댓글의 border-t 제거
    isLastComment && 'border-b-0', // 댓글 전체보기 버튼이 나왔을때 마지막 댓글 border-b 제거
    isSubComment && (isMobile ? subCommentMobileStyle : subCommentDesktopStyle),
  );

  return (
    <>
      <div className={commentDefaultStyleWithBorder}>
        <CommentHeader
          isDeleted={isDeleted}
          author={author}
          maskedEmail={maskedEmail}
          createdAt={createdAt}
          isCommentAuthor={false}
          moreButtonList={moreButtonList}
          isBestComment={isBestComment}
        />

        {/* 댓글 보여주는 컴포넌트 */}
        {!isEditMode && (
          <CommentContents
            comment={comment}
            isModified={isModified}
            isDeleted={isDeleted}
            parentCommentAuthor={getTechParentCommentAuthor()}
          />
        )}
        {/* 수정시 나오는 폼 */}
        {isEditMode && (
          <WritableComment
            type='techblog'
            mode='edit'
            preContents={comment}
            parentCommentAuthor={getTechParentCommentAuthor()}
            writableCommentButtonClick={handleEditBtnClick}
            cancelButtonClick={handleCancelButtonClick}
          />
        )}
        <CommentActionButtons
          mode={mode}
          replies={replies}
          isDeleted={isDeleted}
          techArticleId={articleId}
          isRecommended={isRecommended}
          recommendTotalCount={recommendTotalCount}
          originParentTechCommentId={techOriginParentCommentId}
          parentTechCommentId={techCommentId}
          handleLikeClick={handleLikeClick}
          techParentCommentAuthor={author}
        />
      </div>
    </>
  );
}
