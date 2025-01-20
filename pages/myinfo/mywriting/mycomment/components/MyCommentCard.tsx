import { MouseEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { useDeletePickComment } from '@pages/pickpickpick/[id]/apiHooks/comment/useDeletePickComment';
import { useDeleteTechComment } from '@pages/techblog/api/useDeleteComment';

import { formatDate } from '@utils/formatDate';
import { getMaskedEmail } from '@utils/getUserInfo';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import useIsMobile from '@hooks/useIsMobile';

import NicknameWithMaskedEmail from '@components/common/NicknameWithMaskedEmail';
import TextButton from '@components/common/buttons/textButton';
import SelectedPick from '@components/common/comments/SelectedPick';
import Tag from '@components/common/tag/tag';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import AngleRightIcon from '@public/assets/AngleRightIcon';
import thumbsUp from '@public/image/thumbs-up.svg';

import { UserInfoType } from '@/types/userInfoType';

interface MyCommentCardProps {
  postId: number;
  commentId: number;
  commentType: 'PICK' | 'TECH_ARTICLE';
  postTitle: string;
  commentContents: string;
  commentCreatedAt: string;
  commentLikedCount: number;
  pickOptionTitle?: string;
  pickOptionType?: 'firstPickOption' | 'secondPickOption' | null;
}

export default function MyCommentCard({
  commentType,
  postId,
  commentId,
  postTitle,
  commentCreatedAt,
  commentContents,
  commentLikedCount,
  pickOptionTitle,
  pickOptionType,
}: MyCommentCardProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const {
    openModal,
    isModalOpen,
    setTitle,
    setContents,
    setModalSubmitFn,
    setIsPending,
    setIsNotPending,
  } = useModalStore();
  const { userInfo } = useUserInfoStore();
  const { setToastVisible } = useToastVisibleStore();

  const [clientUserInfo, setClientUserInfo] = useState<UserInfoType>();

  useEffect(() => {
    setClientUserInfo(userInfo);
  }, []);

  const { mutate: deletePickCommentMutate, isPending: pickCommentIsPending } =
    useDeletePickComment();
  const { mutate: deleteTechCommentMutate, isPending: techCommentIsPending } =
    useDeleteTechComment();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (pickCommentIsPending || techCommentIsPending) {
      setIsPending();
    }
  }, [pickCommentIsPending, techCommentIsPending]);

  const handleMyCommentClick = ({ type }: { type: 'PICK' | 'TECH_ARTICLE' }) => {
    if (type === 'PICK') {
      return router.push(`/pickpickpick/${postId}?commentId=${commentId}`);
    }

    if (type === 'TECH_ARTICLE') {
      return router.push(`/techblog/${postId}?commentId=${commentId}`);
    }

    return;
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isModalOpen) {
      openModal();
      setTitle('댓글을 삭제할까요?');
      setContents('삭제하면 복구할 수 없고 다른 회원들이 댓글을 달 수 없어요');
      setModalSubmitFn(() => {
        if (commentType === 'PICK') {
          return deletePickCommentMutate(
            { pickId: String(postId), pickCommentId: commentId },
            {
              onSuccess: () => {
                setToastVisible({ message: '댓글을 삭제했어요' });
                queryClient.invalidateQueries({ queryKey: ['myCommentsData'] });
                setIsNotPending();
              },
            },
          );
        }

        if (commentType === 'TECH_ARTICLE') {
          return deleteTechCommentMutate(
            {
              techArticleId: postId,
              techCommentId: commentId,
            },
            {
              onSuccess: () => {
                setToastVisible({ message: '댓글을 삭제했어요' });
                queryClient.invalidateQueries({ queryKey: ['myCommentsData'] });
                setIsNotPending();
              },
            },
          );
        }

        return;
      });
    }
  };

  return (
    <div
      onClick={() => handleMyCommentClick({ type: commentType })}
      className={`flex gap-[2.4rem] py-[2.4rem] border border-gray500 rounded-Radius16 cursor-pointer ${isMobile ? 'flex-wrap px-[2.4rem]' : 'px-[3.2rem]'}`}
    >
      <div className={`${isMobile ? 'basis-[100%]' : 'basis-[30%]'}`}>
        <div className='flex justify-between mb-[1.2rem]'>
          {commentType === 'PICK' ? (
            <Tag status='line' size='small' color='primary' content='픽픽픽' />
          ) : (
            <Tag status='line' size='small' color='secondary' content='기술블로그' />
          )}
          {isMobile && (
            <TextButton
              buttonContent='삭제'
              color='gray'
              fontWeight='medium'
              size='small'
              line='true'
              onClick={handleButtonClick}
            />
          )}
        </div>
        <div className={`flex items-baseline gap-[1.6rem] ${isMobile ? 'justify-between' : ''}`}>
          <p className='p1 font-bold text-gray50 '>{postTitle}</p>
          <AngleRightIcon
            color={`${commentType === 'PICK' ? 'var(--primary300)' : 'var(--secondary300)'} `}
          />
        </div>
      </div>

      <div
        className={`flex flex-col gap-[1.6rem] 
          ${isMobile ? 'border-t border-t-gray500 pt-[2.4rem] basis-full' : 'basis-[70%] border-l border-l-gray500 pl-[2.4rem]'}`}
      >
        <div className='flex justify-between items-center'>
          <span>
            <NicknameWithMaskedEmail
              author={clientUserInfo?.nickname || ''}
              maskedEmail={getMaskedEmail(clientUserInfo?.email || '')}
            />
            <span className={`c1 text-gray300 ml-[1.6rem]`}>
              {formatDate(commentCreatedAt || '')}
            </span>
          </span>
          {!isMobile && (
            <TextButton
              buttonContent='삭제'
              color='gray'
              fontWeight='medium'
              size='small'
              line='true'
              onClick={handleButtonClick}
            />
          )}
        </div>

        {pickOptionType && pickOptionTitle && (
          <SelectedPick votedPickOption={pickOptionType} votedPickOptionTitle={pickOptionTitle} />
        )}
        <p className='p2 text-gray50'>{commentContents}</p>

        <StatisticsItem icon={thumbsUp} alt='내 댓글의 추천 수' count={commentLikedCount} />
      </div>
    </div>
  );
}
