import { useEffect, useState } from 'react';

import { useModalStore } from '@stores/modalStore';
import { useSelectedPickCommentIdStore } from '@stores/pickCommentIdStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import WritableComment from '@components/common/comment/WritableComment';
import { LikeButton, ReplyButton } from '@components/common/comment/borderRoundButton';
import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';
import SelectedPick from '@components/common/comments/SelectedPick';

import { usePatchPickComment } from '../apiHooks/comment/usePatchPickComment';
import { usePostCommentRecommend } from '../apiHooks/comment/usePostCommentRecommend';
import { usePostPickReplyComment } from '../apiHooks/comment/usePostPickComment';

interface CommentProps {
  pickOriginParentCommentId: number;
  pickParentCommentId: number;
  pickCommentId: number;
  pickParentCommentAuthor?: string;
  isCommentOfPickAuthor: boolean;
  parentCommentAuthor?: string;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  contents: string;
  isRecommended: boolean;
  recommendTotalCount: number;

  votedPickOption: 'firstPickOption' | 'secondPickOption' | null;
  votedPickOptionTitle: string | null;

  isModified?: boolean;
  isSubComment?: boolean;

  pickId: string;
  type: 'reply' | 'default';
  isBestComment?: boolean;
}

export default function Comment({
  pickOriginParentCommentId,
  pickParentCommentId,
  pickCommentId,
  pickParentCommentAuthor,
  isCommentOfPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  contents,
  votedPickOption,
  votedPickOptionTitle,
  isModified,
  isSubComment,
  pickId,
  type,
  isRecommended,
  recommendTotalCount,
  isBestComment,
}: CommentProps) {
  const [isReplyActived, setIsReplyActived] = useState(false);
  const [isEditActived, setIsEditActived] = useState(false);
  const [preContents, setPreContents] = useState('');
  const [isRecommend, setIsRecommend] = useState(isRecommended);
  const [recommendTotal, setRecommendTotal] = useState(recommendTotalCount && recommendTotalCount);

  const { mutate: postPickReplyMutate } = usePostPickReplyComment();
  const { mutate: patchPickCommentMutate } = usePatchPickComment();
  const { mutate: postCommentRecommendMutate } = usePostCommentRecommend();

  const { openModal, setModalType, setContents, setModalSubmitFn, modalType } = useModalStore();
  const { setSelectedCommentId } = useSelectedPickCommentIdStore();
  const { setToastVisible } = useToastVisibleStore();

  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReplyActived(false);
        setIsEditActived(false);
      }
    };

    window.addEventListener('keydown', handleEscKeydown);
    return () => window.removeEventListener('keydown', handleEscKeydown);
  }, []);

  const getPickParentCommentAuthor = (): string => {
    if (pickOriginParentCommentId !== pickParentCommentId) {
      return `@${pickParentCommentAuthor} `;
    }

    return '';
  };

  const handleSubmitReplyComment = ({
    contents: replyContents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    postPickReplyMutate(
      {
        pickId,
        contents: replyContents,
        pickOriginParentCommentId,
        pickParentCommentId: pickCommentId,
      },
      {
        onSuccess: () => {
          onSuccess();
          setIsReplyActived(false);
        },
      },
    );
  };

  const handleUpdateReplyComment = ({
    contents: updateContents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    patchPickCommentMutate(
      {
        pickId,
        pickCommentId,
        contents: updateContents,
      },
      {
        onSuccess: () => {
          onSuccess();
          setIsEditActived(false);
        },
      },
    );
  };

  const commentAuthorButtonList = [
    {
      buttonType: '수정하기',
      moreButtonOnclick: () => {
        setPreContents(contents);
        setIsEditActived(true);
      },
    },
    {
      buttonType: '삭제하기',
      moreButtonOnclick: async () => {
        setModalType('댓글삭제');
        setContents(`삭제하면 복구할 수 없고 \n 다른 회원들이 댓글을 달 수 없어요`);
        setSelectedCommentId(pickCommentId);
        openModal();
      },
    },
  ];

  const otherCommentAuthorButtonList = [
    {
      buttonType: '신고하기',
      moreButtonOnclick: () => {
        setModalType('댓글신고');
        setSelectedCommentId(pickCommentId);
        openModal();
      },
    },
  ];

  const moreButtonList = isCommentAuthor ? commentAuthorButtonList : otherCommentAuthorButtonList;

  const handleCancelButtonClick = () => {
    setIsEditActived(false);
  };

  return (
    <div
      className={`flex flex-col gap-[2.4rem] pt-[2.4rem] pb-[3.2rem] border-b-[0.1rem] border-b-gray3 border-t-[0.1rem] border-t-gray3 ${isSubComment && 'bg-[#0D0E11] px-[3.2rem]'}`}
    >
      <CommentHeader
        isCommentAuthor={isCommentOfPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        moreButtonList={moreButtonList}
        isEditActived={isEditActived}
        isBestComment={isBestComment}
      />

      {isSubComment
        ? null
        : votedPickOption &&
          votedPickOptionTitle && (
            <SelectedPick
              votedPickOption={votedPickOption}
              votedPickOptionTitle={votedPickOptionTitle}
            />
          )}

      {!isEditActived && (
        <>
          <CommentContents
            comment={contents}
            isDeleted={isDeleted}
            parentCommentAuthor={getPickParentCommentAuthor()}
          />

          <div className='mr-0 flex gap-[0.8rem]'>
            <ReplyButton
              isActived={isReplyActived}
              setIsActived={setIsReplyActived}
              onClick={() => setPreContents('')}
              disabled={isDeleted}
            />
            <LikeButton
              isLiked={isRecommend}
              likeCount={recommendTotal}
              onClick={() => {
                if (isDeleted) {
                  return setToastVisible('삭제된 댓글은 추천할 수 없습니다.', 'error');
                }

                postCommentRecommendMutate(
                  { pickId, pickCommentId },
                  {
                    onSuccess: (success) => {
                      setIsRecommend(success.data.isRecommended);
                      setRecommendTotal(success.data.recommendTotalCount);
                    },
                  },
                );
              }}
            />
          </div>
        </>
      )}

      {(isReplyActived || isEditActived) && (
        <WritableComment
          type='techblog'
          mode={isEditActived ? 'edit' : 'register'}
          writableCommentButtonClick={
            isEditActived ? handleUpdateReplyComment : handleSubmitReplyComment
          }
          parentCommentAuthor={type === 'reply' && isReplyActived ? author : ''}
          preContents={preContents}
          cancelButtonClick={handleCancelButtonClick}
        />
      )}
    </div>
  );
}
