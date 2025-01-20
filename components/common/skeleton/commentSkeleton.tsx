import BorderRoundButton, { LikeButton } from '../comment/borderRoundButton';

// pc버전 댓글 스켈레톤
export const CommentSkeleton = () => {
  return (
    <div className='pb-[1.6rem]'>
      <div className='py-[1.6rem]'>
        <div className='flex justify-between h-[1.2rem] mb-[2.3rem]'>
          <div className='flex h-[1.2rem] gap-[1.6rem]'>
            <div className='w-[14.2rem] h-[2.4rem] rounded-[1.2rem] bg-gray600 relative skeleton-item'></div>
            <div className='w-[6.2rem] h-[2.4rem] rounded-[1.2rem] bg-gray600 relative skeleton-item'></div>
          </div>
        </div>
        <div className='h-[7.2rem] rounded-[1.2rem] bg-gray600 mb-[0.8rem] relative skeleton-item overflow-hidden'></div>
      </div>
      <div className='flex gap-[8px]'>
        <BorderRoundButton isActived={false} text='답글' />
        <LikeButton isLiked={false} likeCount={0} />
      </div>
    </div>
  );
};

interface CommentSkeletonListProps {
  itemsInRows: number;
}

export const CommentSkeletonList = ({ itemsInRows }: CommentSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <CommentSkeleton key={index} />
      ))}
    </>
  );
};

// 모바일버전  댓글 스켈레톤
export const MobileCommentSkeleton = () => {
  return (
    <div className='pb-[1.6rem]'>
      <div className='flex flex-col py-[1.6rem] gap-[1.6rem]'>
        <div className='w-[17.5rem] h-[2.4rem] rounded-[1.2rem] bg-gray600 relative skeleton-item'></div>
        <div className='w-[6.9rem] h-[2.4rem] rounded-[1.2rem] bg-gray600 relative skeleton-item'></div>
        <div className='w-full h-[16.8rem] rounded-[1.2rem] bg-gray600 mb-[0.8rem] relative skeleton-item overflow-hidden'></div>
      </div>
      <div className='flex gap-[8px]'>
        <BorderRoundButton isActived={false} text='답글' />
        <LikeButton isLiked={false} likeCount={0} />
      </div>
    </div>
  );
};

interface MobileCommentSkeletonListProps {
  itemsInRows: number;
}

export const MobileCommentSkeletonList = ({ itemsInRows }: MobileCommentSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <MobileCommentSkeleton key={index} />
      ))}
    </>
  );
};
