import { useState } from 'react';

import ShowMoreCommentsButton from '@components/common/comment/ShowMoreCommentsButton';

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
      <div
        className={`${
          replies.length !== 0 && !showDefaultComments ? 'border-b-[0.1rem] border-b-gray400' : ''
        }`}
      >
        <CommentRepliesButton
          showComments={showComments}
          repliesCount={replies.length}
          isOpen={showDefaultComments}
        />
      </div>
      {showDefaultComments && (
        <>
          {replies
            ?.slice(0, CAN_SHOW_COMMENT_COUNT)
            ?.map((subComment, index) => (
              <Comment
                key={subComment.pickCommentId}
                isSubComment={true}
                votedPickOption={null}
                votedPickOptionTitle={null}
                pickId={pickId}
                type={'reply'}
                hasReplies={false}
                hasRestComments={
                  !showRestComments &&
                  index === CAN_SHOW_COMMENT_COUNT - 1 &&
                  replies.length > CAN_SHOW_COMMENT_COUNT
                    ? true
                    : false
                }
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
                    hasReplies={false}
                    {...subComment}
                  />
                ))
            : replies.length > CAN_SHOW_COMMENT_COUNT && (
                <ShowMoreCommentsButton onClick={handleShowAllComments} />
              )}
        </>
      )}
    </>
  );
}
