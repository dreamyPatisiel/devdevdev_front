import { useState } from 'react';

import CommentRepliesButton from '@/components/common/comment/CommentRepliesButton';

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
  const CAN_SHOW_COMMENT_COUNT = 5;

  const handleShowAllComments = () => {
    setShowRestComments(true);
  };

  const showComments = () => {
    setShowDefaultComments(!showDefaultComments);

    if (!showDefaultComments) {
      setShowRestComments(false);
    }
  };

  if (!replies) {
    return <></>;
  }

  return (
    <>
      <CommentRepliesButton
        showComments={showComments}
        repliesCount={replies.length}
        isOpen={showDefaultComments}
      />
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
                  className='p2 font-bold text-[#00D649] p-[2rem]'
                >
                  댓글 전체 보기 +
                </button>
              )}
        </>
      )}
    </>
  );
}
