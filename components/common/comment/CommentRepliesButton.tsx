import Image from 'next/image';

import { cn } from '@utils/mergeStyle';

import useIsMobile from '@hooks/useIsMobile';

import downArrow from '@public/image/down-arrow-green.svg';
import upArrow from '@public/image/up-arrow-green.svg';

interface CommentRepliesButtonProps {
  showComments: () => void;
  repliesCount: number;
  isOpen: boolean;
}

const CommentRepliesButton = ({
  showComments,
  repliesCount,
  isOpen,
}: CommentRepliesButtonProps) => {
  const isMobile = useIsMobile();
  if (repliesCount === 0) return null;

  const defaultStyle =
    'w-full flex items-center gap-3 p2 font-bold text-secondary400 bg-gray800 py-[1.6rem]';
  const mobileStyle = 'pl-[1.6rem]';
  const desktopStyle = 'pl-[3.2rem]';

  return (
    <button
      onClick={showComments}
      className={cn(defaultStyle, isMobile ? mobileStyle : desktopStyle)}
    >
      {`댓글 ${repliesCount}개`}
      <Image
        src={isOpen ? downArrow : upArrow}
        alt={isOpen ? '아래화살표아이콘' : '위화살표아이콘'}
      />
    </button>
  );
};

export default CommentRepliesButton;
