import { cn } from '@utils/mergeStyle';

import {
  TypeColor,
  TypeButtonClasses,
  TypeRadius,
  TypeSize,
  TypeStatus,
} from '../types/mainButtonsV2';

const TypeMainButtonClass: TypeButtonClasses = {
  colorLine: {
    primary: {
      true: {
        on: 'border border-primary400 text-primary300 bg-gray600 hover:bg-gray500 hover:border-primary400 disabled:bg-gray700 disabled:text-primary300 disabled:opacity-50',
        off: 'opacity-50 border border-primary400 text-primary300 bg-gray600 hover:bg-gray500 hover:border-primary400',
      },
      false: {
        on: 'bg-primary500 border border-primary500 text-white hover:bg-primary400 disabled:bg-primary600 disabled:opacity-50',
        off: 'opacity-50 bg-primary600 border border-primary500 text-white hover:bg-primary400',
      },
    },
    secondary: {
      true: {
        on: 'bg-gray600 border border-secondary400 text-secondary300 hover:bg-gray500 hover:border-secondary400 disabled:bg-gray700 disabled:border-secondary700 disabled:text-secondary300 disabled:opacity-50',
        off: 'opacity-50 bg-gray700 border-secondary700 bg-gray600 border text-secondary300 hover:bg-gray500 hover:border-secondary400',
      },
      false: {
        on: 'bg-secondary400 border border-secondary400 text-black hover:bg-secondary200 disabled:bg-secondary600 disabled:opacity-50',
        off: 'opacity-50 bg-secondary600 border border-secondary400 text-black hover:bg-secondary200',
      },
    },
    gray: {
      true: {
        on: 'bg-gray600 border border-gray300 text-gray100 hover:bg-gray500 disabled:bg-gray700 disabled:text-gray200 disabled:opacity-50',
        off: 'opacity-50 bg-gray700 text-gray200 border border-gray300 hover:bg-gray500',
      },
      false: {
        on: 'bg-gray600 border border-gray600 text-white hover:bg-gray500 disabled:bg-gray700 disabled:opacity-50',
        off: 'opacity-50 bg-gray700 border border-gray600 text-white hover:bg-gray500',
      },
    },
    red: {
      true: {
        on: 'bg-gray600 border border-red200 text-red200 hover:bg-gray500 hover:border-red200 disabled:bg-gray700 disabled:border-red500 disabled:text-red200 disabled:opacity-50',
        off: 'opacity-50 text-red200 bg-gray700 border border-red200 hover:bg-gray500 hover:border-red200 ',
      },
      false: {
        on: 'bg-gray600 border border-red200 text-red200 hover:bg-gray500 disabled:bg-gray700 disabled:border-red500 disabled:text-red200 disabled:opacity-50',
        off: 'opacity-50 bg-gray700 border border-red500 text-red200 hover:bg-gray500',
      },
    },
  },
  size: {
    xSmall: 'px-[1.2rem] py-[0.4rem]',
    small: 'px-[1.8rem] py-[0.8rem]',
    medium: 'px-[2rem] py-[1rem]',
  },
  radius: {
    square: 'rounded-Radius8',
    semi: 'rounded-Radius16',
    rounded: 'rounded-RadiusRounded',
  },
};

export const MainButtonV2Variants = ({
  color,
  line,
  size,
  radius,
  status,
}: {
  color: TypeColor;
  line: boolean;
  size: TypeSize;
  radius: TypeRadius;
  status: TypeStatus;
}) => {
  const defaultClass = 'flex flex-row justify-center items-center gap-[0.8rem]';
  const colorLineClass = line
    ? TypeMainButtonClass.colorLine[color]['true'][status]
    : TypeMainButtonClass.colorLine[color]['false'][status];

  const sizeClass = TypeMainButtonClass.size[size];
  const radiusClass = TypeMainButtonClass.radius[radius];

  return cn(`${defaultClass} ${colorLineClass} ${sizeClass} ${radiusClass}`);
};
