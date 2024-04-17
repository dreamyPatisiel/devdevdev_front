import { cn } from '@utils/mergeStyle';

import Arrow from '@public/image/techblog/angle-right_primary3.svg';

export const ImgWrapper = ({
  width,
  height,
  children,
}: {
  width: string;
  height: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `overflow-hidden bg-gray1 rounded-[2rem] flex justify-center items-center ${width} ${height}`,
      )}
    >
      {children}
    </div>
  );
};

export const TagWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex gap-[0.6rem]'>{children}</div>;
};

export const TechCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className='w-full h-hull grid grid-flow-col border-white gap-[3.2rem] text-white py-[3.2rem] border-b border-b-gray1 border-solid select-none'>
      {children}
    </li>
  );
};

export const TechTitle = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className='flex flex-row items-center gap-8 font-bold st2 text-white border-white py-[0.9rem] '
    >
      <p className='w-[77rem] truncate'>{title}</p>
    </div>
  );
};

export const TechContent = ({ content, onClick }: { content: string; onClick: () => void }) => {
  const TechCntClasses = 'p2 text-gray5 mr-[4rem]';
  return (
    <p
      onClick={onClick}
      className={TechCntClasses}
      style={{
        display: '-webkit-box',
        wordWrap: 'break-word',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {content}
    </p>
  );
};

// FIXME: date타입은 서버에서 정해지면 바꿈
export const TechInfo = ({
  author,
  date,
  company,
}: {
  author: string;
  date: string;
  company: string;
}) => {
  return (
    <>
      <div className='p2 flex gap-[1.6rem] '>
        <p className='text-primary3 font-bold'> {company}</p>
        <p className='text-gray3'> | </p>
        <p className='text-gray4'>by. {author ? author : company}</p>
        <p className='text-gray4'>{date}</p>
      </div>
    </>
  );
};
