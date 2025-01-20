import { cn } from '@utils/mergeStyle';

import useIsMobile from '@hooks/useIsMobile';

interface ShowMoreCommentsButtonProps {
  onClick: () => void;
}

export default function ShowMoreCommentsButton({ onClick }: ShowMoreCommentsButtonProps) {
  const isMobile = useIsMobile();
  const defaultStyle = 'w-full p2 font-bold bg-gray800 text-secondary500 text-left';
  const mobileStyle = 'pb-[1.6rem] px-[1.6rem]';
  const desktopStyle = 'pb-[3.2rem] px-[3.2rem]';
  return (
    <button onClick={onClick} className={cn(isMobile ? mobileStyle : desktopStyle, defaultStyle)}>
      댓글 전체 보기 +
    </button>
  );
}
