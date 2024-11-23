import { useState } from 'react';

import CommentRepliesButton from '@/components/common/comment/CommentRepliesButton';
import ShowMoreCommentsButton from '@/components/common/comment/ShowMoreCommentsButton';

import { RepliesProps } from '../types/techCommentsType';
import Comment from './Comment';
import { CommentProps } from './Comment';

export default function CommentReplies({
  replies,
  articleId,
  isBestComment,
}: {
  replies: RepliesProps[];
  articleId: number;
  isBestComment: boolean;
}) {
  const DEFAULT_COMMENT_COUNT = 5;
  const repliesLen = replies?.length;
  const [isCommentOpen, setIsCommentOpen] = useState(isBestComment ? false : true);

  // 댓글 접기
  const handleOpenComments = () => {
    setIsCommentOpen(!isCommentOpen);
    if (isCommentOpen) {
      setMoreComments(false);
    }
  };

  // 댓글 더보기
  const [moreComments, setMoreComments] = useState(false);
  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  const renderComments = (comments: RepliesProps[], isShowingMore: boolean) =>
    comments.map((subComment, index) => {
      const commentProps: CommentProps = {
        ...subComment,
        comment: subComment.contents,
        articleId,
        isSubComment: true,
        isFirstComment: !isShowingMore && index === 0,
        isLastComment:
          !isShowingMore &&
          index === DEFAULT_COMMENT_COUNT - 1 &&
          repliesLen > DEFAULT_COMMENT_COUNT,
      };

      return <Comment key={subComment.techCommentId} {...commentProps} />;
    });

  return (
    <>
      <CommentRepliesButton
        showComments={handleOpenComments}
        repliesCount={repliesLen}
        isOpen={isCommentOpen}
      />

      {isCommentOpen && (
        <>
          {/* 기본 5개 보여주는 댓글 */}
          {renderComments(replies.slice(0, 5), false)}

          {/* 더보기 버튼 */}
          {!moreComments && repliesLen > 5 && (
            <ShowMoreCommentsButton onClick={handleMoreComments} />
          )}

          {/* 나머지 댓글 */}
          {moreComments && renderComments(replies.slice(5), true)}
        </>
      )}
    </>
  );
}
