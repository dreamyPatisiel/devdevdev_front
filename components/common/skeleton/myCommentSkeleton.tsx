import AngleRightIcon from '@public/assets/AngleRightIcon';

export const MyCommentSkeleton = () => {
  return (
    <div
      className={`flex gap-[2.4rem] py-[2.4rem] rounded-Radius16 px-[3.2rem] border border-gray500`}
    >
      <div className='basis-[30%]'>
        <div className='flex gap-[1.2rem] flex-col'>
          <div className='bg-gray700 w-[4.2rem] h-[2.2rem] rounded-Radius10 relative skeleton-item'></div>
          <div className='flex gap-[1.6rem]'>
            <div className='bg-gray700 w-full h-[13.2rem] rounded-Radius16 relative skeleton-item'></div>
            <div className='mt-[0.8rem]'>
              <AngleRightIcon color='var(--gray300)' />
            </div>
          </div>
        </div>
      </div>

      <div className='basis-[70%] flex flex-col gap-[1.6rem] border-l border-l-gray500 pl-[2.4rem]'>
        <div className='flex gap-[1.6rem]'>
          <div className='bg-gray700 w-[15rem] h-[1.8rem] rounded-Radius8 relative skeleton-item'></div>
          <div className='bg-gray700 w-[6rem] h-[1.8rem] rounded-Radius8 relative skeleton-item'></div>
        </div>
        <div className='bg-gray700 w-full h-[9.6rem] rounded-Radius16 relative skeleton-item'></div>
        <div className='bg-gray700 w-[5rem] h-[1.8rem] rounded-Radius8 relative skeleton-item'></div>
      </div>
    </div>
  );
};

export const MyCommentSkeletonList = ({ itemsInRows }: { itemsInRows: number }) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <MyCommentSkeleton key={index} />
      ))}
    </>
  );
};

export const MobileMyCommentSkeleton = () => {
  return (
    <div className='flex gap-[2.4rem] py-[2.4rem] rounded-Radius16 flex-wrap px-[2.4rem] border border-gray500'>
      <div className='basis-full'>
        <div className='flex gap-[1.2rem] flex-col'>
          <div className='bg-gray700 w-[4.2rem] h-[2.2rem] rounded-Radius10 relative skeleton-item'></div>
          <div className='flex gap-[1.6rem]'>
            <div className='bg-gray700 w-full h-[13.2rem] rounded-Radius16 relative skeleton-item'></div>
            <div className='mt-[0.8rem]'>
              <AngleRightIcon color='var(--gray300)' />
            </div>
          </div>
        </div>
      </div>

      <div className='basis-full flex flex-col gap-[1.6rem] border-t border-t-gray500 pt-[2.4rem]'>
        <div className='flex gap-[1.6rem]'>
          <div className='bg-gray700 w-[15rem] h-[1.8rem] rounded-Radius8 relative skeleton-item'></div>
          <div className='bg-gray700 w-[6rem] h-[1.8rem] rounded-Radius8 relative skeleton-item'></div>
        </div>
        <div className='bg-gray700 w-full h-[9.6rem] rounded-Radius16 relative skeleton-item'></div>
        <div className='bg-gray700 w-[5rem] h-[1.8rem] rounded-Radius8 relative skeleton-item'></div>
      </div>
    </div>
  );
};

export const MobileMyCommentSkeletonList = ({ itemsInRows }: { itemsInRows: number }) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <MobileMyCommentSkeleton key={index} />
      ))}
    </>
  );
};
