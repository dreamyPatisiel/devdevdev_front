import { MobilePickInfo, PickInfo } from '@pages/pickpickpick/components/PickInfo';

export const PickSkeleton = () => {
  return (
    <div className='px-[2.4rem] py-[3.2rem] flex flex-col gap-[3.2rem] rounded-[1.6rem] border-gray600 border-solid border'>
      <div className='h-[3.7rem] w-[100%] rounded-[1.6rem] bg-gray600 relative overflow-hidden skeleton-item' />
      <div className='flex flex-col gap-[1.6rem]'>
        <div className='h-[10.1rem] bg-gray600 rounded-[1.6rem] relative overflow-hidden skeleton-item' />
        <div className='h-[10.1rem] bg-gray600 rounded-[1.6rem] relative overflow-hidden skeleton-item' />
      </div>
      <div className='h-[1rem] w-[50%] bg-gray600 rounded-[1.6rem] relative overflow-hidden skeleton-item' />
    </div>
  );
};

interface PickSkeletonListProps {
  rows: number;
  itemsInRows: number;
  hasInfo?: boolean;
}

export const PickSkeletonList = ({ rows, itemsInRows, hasInfo }: PickSkeletonListProps) => {
  return (
    <div className='grid grid-cols-3 gap-8'>
      {hasInfo ? (
        <>
          <PickInfo />
          {Array.from({ length: rows * itemsInRows - 1 }, (_, index) => (
            <PickSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: rows * itemsInRows }, (_, index) => (
            <PickSkeleton key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export const MobilePickSkeletonList = ({ rows, hasInfo }: { rows: number; hasInfo?: boolean }) => {
  const arr = Array.from({ length: rows });

  return (
    <div className='grid grid-cols-1 gap-8'>
      {hasInfo && <MobilePickInfo />}

      {arr.map((_, index) => (
        <PickSkeleton key={index} />
      ))}
    </div>
  );
};

export const MyPickSkeletonList = ({ rows, itemsInRows }: PickSkeletonListProps) => {
  return (
    <div className='grid grid-cols-2 gap-8'>
      {Array.from({ length: rows * itemsInRows }, (_, index) => (
        <PickSkeleton key={index} />
      ))}
    </div>
  );
};

/** 메인페이지 픽픽픽 스켈레톤 */
export const MainPickSkeleton = () => {
  return (
    <div className='p-[2.4rem] flex flex-col gap-[1.6rem] rounded-[1.6rem] border-gray600 border-solid border mb-[1.6rem]'>
      <div className='h-[2.2rem] w-[100%] rounded-[0.8rem] bg-gray600 relative overflow-hidden skeleton-item' />
      <div className='flex flex-col gap-[0.8rem]'>
        <div className='h-[4.8rem] bg-gray600 rounded-[0.8rem] relative overflow-hidden skeleton-item' />
        <div className='h-[4.8rem] bg-gray600 rounded-[0.8rem] relative overflow-hidden skeleton-item' />
      </div>
      <div className='h-[1.8rem] w-[30%] bg-gray600 rounded-[0.8rem] relative overflow-hidden skeleton-item' />
    </div>
  );
};

interface MainPickSkeletonListProps {
  itemsInRows: number;
}

export const MainPickSkeletonList = ({ itemsInRows }: MainPickSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <MainPickSkeleton key={index} />
      ))}
    </>
  );
};
