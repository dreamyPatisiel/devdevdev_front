import React, { MouseEventHandler, ReactElement, SetStateAction } from 'react';

import Image from 'next/image';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import thumbsUpDisabled from '@public/image/comment/thumbs-up-disabled.svg';
import thumbsUpGreen from '@public/image/comment/thumbs-up-green.svg';
import thumbsUpWhite from '@public/image/comment/thumbs-up-white.svg';

export default function BorderRoundButton({
  text,
  icon,
  onClick,
  disabled,
  isActived,
}: {
  text: string;
  icon?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  isActived: boolean;
}) {
  const defaultButtonClass = 'border border-gray300 text-gray100';
  const activeButtonClass = 'border border-secondary400 text-secondary400';
  const disabledButtonClass = 'border border-gray400 text-gray400';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center c1 font-bold px-[1.6rem] py-[0.7rem] rounded-[0.8rem] bg-gray600
        ${isActived ? activeButtonClass : disabled ? disabledButtonClass : defaultButtonClass} `}
    >
      <span className={`font-bold ${icon && 'mr-2'}`}>{text}</span>
      {icon}
    </button>
  );
}

export const LikeButton = ({
  isLiked,
  likeCount,
  onClick,
  disabled,
}: {
  isLiked: boolean;
  likeCount: number;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const { loginStatus } = useLoginStatusStore();
  const { setToastVisible } = useToastVisibleStore();

  const thumbsWhiteIcon = <Image src={thumbsUpWhite} alt='좋아요비활성화버튼' />;
  const thumbsGreenIcon = <Image src={thumbsUpGreen} alt='좋아요활성화버튼' />;
  const thumbsDisabledIcon = <Image src={thumbsUpDisabled} alt='좋아요비활성화버튼' />;
  const curIcon = disabled ? thumbsDisabledIcon : isLiked ? thumbsGreenIcon : thumbsWhiteIcon;

  const handleLikeButtonClick = () => {
    if (loginStatus === 'logout') {
      setToastVisible({ message: '비회원은 현재 해당 기능을 이용할 수 없습니다.', type: 'error' });
      return;
    }
    onClick?.();
  };

  return (
    <BorderRoundButton
      isActived={isLiked}
      text={String(likeCount)}
      icon={curIcon}
      onClick={handleLikeButtonClick}
      disabled={disabled}
    />
  );
};

export const ReplyButton = ({
  onClick,
  disabled,
  isActived,
  setIsActived,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  isActived: boolean;
  setIsActived: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal } = useLoginModalStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loginStatus === 'logout') {
      openLoginModal();
      return;
    }
    setIsActived(!isActived);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <BorderRoundButton
        isActived={isActived}
        text='답글'
        onClick={handleClick}
        disabled={disabled}
      />
    </>
  );
};

export const ReplyCountButton = ({
  replyCount,
  onClick,
  disabled,
  isActived,
  setIsActived,
}: {
  isActived: boolean;
  setIsActived: React.Dispatch<SetStateAction<boolean>>;
  replyCount: number;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActived(!isActived);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <BorderRoundButton
        isActived={isActived}
        text={`답글 ${replyCount}개`}
        onClick={handleClick}
        disabled={disabled}
      />
    </>
  );
};
