import { twMerge } from 'tailwind-merge';

import { TagColor, TagSize, TagStatus, TypeTagClasses } from '../type/tagType';

const TagClasses: TypeTagClasses = {
  primary: {
    main: 'bg-primary200 text-black',
    sub: 'bg-primary600 text-white',
    line: 'border border-primary200 text-primary200',
  },
  secondary: {
    main: 'bg-secondary400 text-black',
    sub: 'bg-secondary600 text-white',
    line: 'border border-secondary400 text-secondary400',
  },
  red: {
    main: 'bg-red100 text-black',
    sub: 'bg-red400 text-white',
    line: 'border border-red100 text-red100',
  },
};
export const TagVariants = ({
  color,
  status,
  size,
}: {
  color: TagColor;
  status: TagStatus;
  size: TagSize;
}) => {
  const baseClass = 'py-[0.4rem] rounded-[10rem] flex items-center';
  const sizeClass = size === 'small' ? 'text-c2 px-[0.8rem]' : 'text-c1 px-[1rem]';
  const colorClass = TagClasses[color][status];

  return twMerge(`${baseClass} ${sizeClass} ${colorClass}`);
};
