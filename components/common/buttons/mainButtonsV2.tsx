import { cn } from '@utils/mergeStyle';

import { Spinner } from '@chakra-ui/spinner';

import { MainButtonV2Props } from './types/mainButtonsV2';
import { MainButtonV2Variants } from './variants/mainButtonsV2';

export function MainButtonV2({
  text,
  icon,
  iconPosition = 'right',
  disabled,
  onClick,
  type = 'button',
  className,
  color,
  size,
  radius,
  line,
  isPending,
  status = 'on',
  ...rest
}: MainButtonV2Props) {
  return (
    <button
      className={cn(MainButtonV2Variants({ color, line, size, radius, status }), className)}
      disabled={disabled || isPending}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {/* 아이콘 왼쪽 정렬 */}
      {iconPosition === 'left' && icon}
      {/* 텍스트 */}
      <span className='p1 font-bold'>{text}</span>
      {/* 아이콘 오른쪽 정렬 */}
      {iconPosition === 'right' && icon}
      {isPending && <Spinner width={16} height={16} color='var(--gray50)' />}
    </button>
  );
}
