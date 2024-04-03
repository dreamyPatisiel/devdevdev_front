import { cva, VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/utils/mergeStyle';

import { tooltipVariants } from './tooltipVariants';

const TOOLTIP_ARROW_CLASSES = ['absolute', 'w-3', 'h-3', 'transform', 'rotate-45'];
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
      right: ['-right-[0.4rem]', 'top-[0.9rem]'],
      left: ['-left-[0.4rem]', 'top-[0.9rem]'],
      top: ['left-[50%]', '-top-[0.4rem]'],
      bottom: ['left-[50%]', '-bottom-[0.4rem]'],
    },
    variant: {
      grayTt: ['bg-gray2'],
      greenTt: ['bg-point1'],
    },
  },
});

export const TooltipWrapperVariants = cva(TOOLTIP_WRAPPER_CLASSES, {
  variants: {
    variant: {
      grayTt: ['bg-gray2', 'text-point1'],
      greenTt: ['bg-point1', 'text-black'],
    },
  },
});

interface TooltipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TooltipArrowVariants>,
    VariantProps<typeof TooltipWrapperVariants> {
  isVisible: boolean;
}

const Tooltip: FC<TooltipProps> = ({ variant, direction, isVisible, children }) => {
  if (!children) return;

  let toolTipWidth;
  let cntLength;
  if (typeof children === 'string') {
    cntLength = children.length;
    switch (cntLength) {
      case 13:
        toolTipWidth = 'w-[15rem]';
        break;
      case 11:
        toolTipWidth = 'w-[13.5rem]';
        break;
      case 10:
        toolTipWidth = 'w-[12.3rem]';
        break;
      default:
        toolTipWidth = 'w-[12.3rem]';
        break;
    }
  }

  return (
    <motion.div
      initial={false}
      variants={tooltipVariants}
      animate={isVisible ? 'visible' : 'hidden'}
      exit='exit'
      className={`absolute ${toopTipWidth} right-[4.5rem] z-50 select-none `}
    >
      <div className={cn(TooltipArrowVariants({ direction, variant }))} />
      <div className={cn(TooltipWrapperVariants({ variant }))}>{children}</div>
    </motion.div>
  );
};

export default Tooltip;
