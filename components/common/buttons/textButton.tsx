import { cn } from '@utils/mergeStyle';

import { TextButtonProps } from './types/textButton';
import { TextButtonVariants } from './variants/textButton';

export default function TextButton({
  buttonContent,
  size,
  color,
  line,
  leftIcon,
  rightIcon,
  fontWeight,
  className,
  type = 'button',
  onClick,
  ...rest
}: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(TextButtonVariants({ color, line, size, fontWeight }), className)}
      {...rest}
    >
      {leftIcon && leftIcon}
      {buttonContent}
      {rightIcon && rightIcon}
    </button>
  );
}
