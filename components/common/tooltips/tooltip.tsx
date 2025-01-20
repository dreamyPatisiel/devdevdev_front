import { cva, VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/utils/mergeStyle';

import { tooltipVariants } from './tooltipVariants';

const TOOLTIP_ARROW_CLASSES = [
  'absolute',
  'w-3',
  'h-4',
  'transform',
  'rotate-[-60deg]',
  'skew-y-[35deg]',
];
const TOOLTIP_WRAPPER_CLASSES = [
  'c1',
  'px-[1.3rem]',
  'py-[0.5rem]',
  'rounded-[0.8rem]',
  'font-bold',
  'w-full',
];

export const TooltipArrowVariants = cva(TOOLTIP_ARROW_CLASSES, {
  variants: {
    direction: {
      right: ['-right-[0.35rem]', 'top-[0.9rem]'],
      left: ['-left-[0.4rem]', 'top-[0.9rem]'],
      top: ['left-[50%]', '-top-[0.4rem]'],
      bottom: ['left-[50%]', '-bottom-[0.4rem]'],
    },
    variant: {
      grayTt: ['bg-gray500'],
      greenTt: ['bg-secondary400'],
      purpleTt: ['bg-primary500'],
    },
  },
});

export const TooltipWrapperVariants = cva(TOOLTIP_WRAPPER_CLASSES, {
  variants: {
    variant: {
      grayTt: ['bg-gray500', 'text-secondary400'],
      greenTt: ['bg-secondary400', 'text-black'],
      purpleTt: ['bg-primary500', 'text-white'],
    },
  },
});

interface TooltipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TooltipArrowVariants>,
    VariantProps<typeof TooltipWrapperVariants> {
  isVisible: boolean;
}

/** 텍스트 길이에 따른 width계산 */
const calculateTooltipWidth = (text: string): string => {
  const averageCharacterWidth = 11;
  const specialCharacterWidth = 3;
  const shortCharacters = ['.', ',', '!', '(', ')', ' ', "'", '"', ';', ':'];

  let tooltipWidth = 0;

  for (const char of text) {
    if (shortCharacters.includes(char)) {
      tooltipWidth += specialCharacterWidth;
    } else {
      tooltipWidth += averageCharacterWidth;
    }
  }
  // x축 마진값 12px씩
  return `${tooltipWidth + 24}px`;
};

const Tooltip: FC<TooltipProps> = ({ variant, direction, isVisible, style, children }) => {
  if (!children) return;

  let toolTipWidth;
  if (typeof children === 'string') {
    toolTipWidth = calculateTooltipWidth(children);
  }

  return (
    <motion.div
      initial={false}
      variants={tooltipVariants}
      animate={isVisible ? 'visible' : 'hidden'}
      exit='exit'
      className={`absolute right-[4.5rem] select-none text-center`}
      style={{
        width: toolTipWidth,
        ...style,
      }}
    >
      <div className={cn(TooltipArrowVariants({ direction, variant }))} />
      <div className={cn(TooltipWrapperVariants({ variant }))}>{children}</div>
    </motion.div>
  );
};

export default Tooltip;
