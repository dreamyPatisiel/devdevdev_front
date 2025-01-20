import { cva, VariantProps } from 'class-variance-authority';

import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import AngleRight from '@public/image/angle-right.svg';

import { cn } from '@/utils/mergeStyle';

const ARROW_TITLE_CLASSES = ['font-bold'];

export const ArrowWithTitleVariants = cva(ARROW_TITLE_CLASSES, {
  variants: {
    variant: {
      mainTitle: ['st2', 'text-gray200'],
      similarPick: ['st2', 'text-white'],
      defaultPick: ['p1', 'text-gray100'],
    },
  },
});

interface ArrowWithTitleProps extends VariantProps<typeof ArrowWithTitleVariants> {
  title: string;
  iconText?: string;
  routeURL?: string;
  className?: string;
  iconSize?: string;
  ArrowClassName?: string;
}

const ArrowWithTitle: FC<ArrowWithTitleProps> = ({
  title,
  variant = 'defaultPick',
  iconText,
  routeURL,
  className,
  ArrowClassName,
}) => {
  return (
    <div className='grid grid-flow-col items-baseline gap-6 justify-between'>
      <p className={cn(className, ArrowWithTitleVariants({ variant }))}>{title}</p>

      <div className='flex items-center'>
        {iconText && routeURL && (
          <Link href={routeURL} className='p2 text-primary200 mr-3'>
            {iconText}
          </Link>
        )}
        <Image
          src={AngleRight}
          alt={'오른쪽 화살표'}
          width={7}
          height={14}
          className={ArrowClassName}
        />
      </div>
    </div>
  );
};

export default ArrowWithTitle;
