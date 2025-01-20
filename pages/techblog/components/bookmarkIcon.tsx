import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useTooltipHide from '@hooks/useTooltipHide';

import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import { Spinner } from '@chakra-ui/spinner';

import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import useClickCounter from '../hooks/useClickCounter';

const BookmarkIcon = ({
  id,
  tooltipMessage,
  isBookmarkActive,
  setBookmarkActive,
  setTooltipMessage,
  type,
}: {
  id: number;
  tooltipMessage: string;
  isBookmarkActive: boolean;
  setBookmarkActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTooltipMessage: React.Dispatch<React.SetStateAction<string>>;
  type: 'main' | 'techblog' | 'myinfo';
}) => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  const CLICK_IGNORE_TIME = 3 * 1000;
  const BOOKMARK_CLICK_MAX_CNT = 10;
  const { mutate: bookmarkMutation, isPending } = usePostBookmarkStatus();
  const [clickCount, setClickCount] = useClickCounter({
    maxCount: BOOKMARK_CLICK_MAX_CNT,
    threshold: 1000,
  });

  const [isIgnoreClick, setIsIgnoreClick] = useState(false);

  useEffect(() => {
    setBookmarkActive(isBookmarkActive);
  }, [isBookmarkActive]);

  useTooltipHide({
    tooltipMessage,
    setTooltipMessage,
    dependencies: [isBookmarkActive, tooltipMessage],
  });

  useEffect(() => {
    let ignoreTimer: NodeJS.Timeout;

    const ignoreCilckEvent = () => {
      ignoreTimer = setTimeout(() => {
        setIsIgnoreClick(false);
      }, CLICK_IGNORE_TIME);

      return () => {
        clearTimeout(ignoreTimer);
      };
    };

    if (clickCount >= BOOKMARK_CLICK_MAX_CNT) {
      setIsIgnoreClick(true);
      ignoreCilckEvent();
      setToastVisible({
        message: '북마크를 너무 많이 시도했어요! 잠시 후 다시 시도해주세요.',
        type: 'error',
      });
    }
  }, [clickCount]);

  /** type에 따라 북마크 상태값을 업데이트 해주는 함수 */
  const handleBookmarkClick = async ({
    id,
    isBookmarkActive,
    type,
  }: {
    id: number;
    isBookmarkActive: boolean;
    type: 'myinfo' | 'techblog' | 'main';
  }) => {
    if (isIgnoreClick) {
      return;
    }
    setClickCount((prev) => prev + 1);

    bookmarkMutation(
      {
        techArticleId: id,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
          await queryClient.invalidateQueries({ queryKey: ['techDetail', String(id)] });
          await queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });

          if (type === 'techblog') {
            setBookmarkActive((prev) => !prev);
            setTooltipMessage(isBookmarkActive ? '북마크에서 삭제했어요' : '북마크로 저장했어요');
          } else if (type === 'myinfo') {
            setToastVisible({ message: '북마크에서 삭제했어요' });
          }
        },
      },
    );
  };

  return isPending ? (
    <Spinner width={15} height={15} />
  ) : (
    <Image
      width={15}
      height={16}
      src={isBookmarkActive ? bookmarkActive : bookmarkNonActive}
      className='cursor-pointer'
      onClick={async () => {
        await handleBookmarkClick({
          type: type,
          id: id,
          isBookmarkActive: isBookmarkActive,
        });
      }}
      alt={isBookmarkActive ? '북마크아이콘' : '북마크취소아이콘'}
    />
  );
};

export default BookmarkIcon;
