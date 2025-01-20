import { twMerge } from 'tailwind-merge';

import { PickOptionsProps } from '../types/pick';

export default function PickAnswer({
  title,
  isPicked,
  percent,
  isVoted,
  className,
}: PickOptionsProps) {
  const pickAnswerStyle = {
    backgroundImage: `linear-gradient(to right, var(--primary400) ${percent}%, transparent 0%)`,
    borderColor: 'var(--primary400)',
  };

  const unpickAnswerStyle = {
    backgroundImage: `linear-gradient(to right, var(--gray-2) ${percent}%, transparent 0%)`,
  };

  return (
    <li
      className={twMerge(
        `rounded-[1.6rem] border-gray400 border-solid border p-[2rem] flex items-center gap-[2.4rem] ${className}`,
      )}
      style={isVoted && isPicked ? pickAnswerStyle : isVoted && !isPicked ? unpickAnswerStyle : {}}
    >
      <p className='text-p1 font-medium ellipsis text-white'>{title}</p>
      {/* {isVoted && (
        <span className={`text-st2 ${isPicked === true ? 'text-primary3' : 'text-gray4'}`}>
          {percent}%
        </span>
      )} */}
    </li>
  );
}
