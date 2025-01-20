import Image from 'next/image';

import { cn } from '@utils/mergeStyle';

import ExclamationCircle from '@public/image/exclamation-circle.svg';

export function ValidationMessage({ message, className }: { message: string; className?: string }) {
  return (
    <div className={cn(`flex items-center gap-[1rem] mt-[0.8rem] py-[1rem]`, className)}>
      <Image src={ExclamationCircle} alt='주의 아이콘' />
      <span className='p2 text-secondary400'>{message}</span>
    </div>
  );
}
