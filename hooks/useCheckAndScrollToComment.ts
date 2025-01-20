import { useEffect } from 'react';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

interface CheckAndScrollToCommentProps {
  commentId: string;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  status: 'success' | 'error' | 'pending';
}

export const useCheckAndScrollToComment = ({
  commentId,
  hasNextPage,
  fetchNextPage,
  status,
}: CheckAndScrollToCommentProps) => {
  const { setToastVisible } = useToastVisibleStore();
  const MAX_RETRIES = 10;

  useEffect(() => {
    const checkAndScrollToComment = async () => {
      if (!commentId) return;

      if (status === 'pending') {
        setToastVisible({ message: `댓글을 찾고 있어요...😊` });
      }

      if (status === 'success') {
        try {
          let retryCount = 0;

          setTimeout(async () => {
            let commentElement = document.getElementById(`comment-${commentId}`);

            while (!commentElement && hasNextPage && retryCount < MAX_RETRIES) {
              retryCount++;
              await fetchNextPage();
              await new Promise((resolve) => setTimeout(resolve, 100));
              commentElement = document.getElementById(`comment-${commentId}`);
            }

            if (commentElement) {
              commentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });

              setToastVisible({ message: `댓글을 찾았어요! 🥳` });
            }

            if (!commentElement) {
              setToastVisible({ message: `댓글을 찾을 수 없어요 🥲` });
            }
          }, 500);
        } catch (error) {
          console.error(error);
          return setToastVisible({
            message: `댓글을 찾는 도중 에러가 발생했어요 😢`,
            type: 'error',
          });
        }
      }
    };

    checkAndScrollToComment();
  }, [commentId, hasNextPage, status]);
};
