import { useState } from 'react';

import Image from 'next/image';

import downArrow from '@public/image/down-arrow-green.svg';
import upArrow from '@public/image/up-arrow-green.svg';

import Comment from './Comment';
import { SubCommentsProps } from './CommentSet';

interface CommentRepliesProps {
  replies?: SubCommentsProps[];
  pickId: string;
  isBestComment: boolean;
}

export default function CommentReplies({ replies, pickId, isBestComment }: CommentRepliesProps) {
  const [showDefaultComments, setShowDefaultComments] = useState(isBestComment ? false : true);
  const [showRestComments, setShowRestComments] = useState(false);
  const CAN_SHOW_COMMENT_COUNT = 3;
  // 추후에 Count 변경하기

  const handleShowAllComments = () => {
    setShowRestComments(true);
  };

  const showComments = () => {
    setShowDefaultComments(!showDefaultComments);

    if (!showDefaultComments) {
      setShowRestComments(false);
    }
  };

  const showCommentIcon = showDefaultComments ? downArrow : upArrow;
  const showCommentIconAlt = showDefaultComments ? '아래방향 화살표아이콘' : '위 방향 화살표아이콘';

  if (!replies) {
    return <></>;
  }

  return (
    <>
      {replies.length > 0 && (
        <button
          onClick={showComments}
          className='w-full flex items-center ml-[3.2rem] gap-3 p2 font-bold text-point1 h-[5.6rem]'
        >
          {`댓글 ${replies.length}개`}
          <Image src={showCommentIcon} alt={showCommentIconAlt} />
        </button>
      )}
      {showDefaultComments && (
        <>
          {replies
            ?.slice(0, CAN_SHOW_COMMENT_COUNT)
            ?.map((subComment) => (
              <Comment
                key={subComment.pickCommentId}
                isSubComment={true}
                votedPickOption={null}
                votedPickOptionTitle={null}
                pickId={pickId}
                type={'reply'}
                {...subComment}
              />
            ))}

          {showRestComments
            ? replies
                ?.slice(CAN_SHOW_COMMENT_COUNT, replies.length)
                .map((subComment) => (
                  <Comment
                    key={subComment.pickCommentId}
                    isSubComment={true}
                    votedPickOption={null}
                    votedPickOptionTitle={null}
                    pickId={pickId}
                    type={'reply'}
                    {...subComment}
                  />
                ))
            : replies.length > CAN_SHOW_COMMENT_COUNT && (
                <button
                  onClick={handleShowAllComments}
                  className='p2 font-bold text-point1 p-[2rem]'
                >
                  댓글 전체 보기 +
                </button>
              )}
        </>
      )}
    </>
  );
}
