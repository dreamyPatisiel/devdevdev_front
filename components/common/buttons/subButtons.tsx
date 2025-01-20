import { cn } from '@utils/mergeStyle';

import useIsMobile from '@hooks/useIsMobile';

import { Spinner } from '@chakra-ui/spinner';

import { LogoutButtonProps, ModalButtonProps, SubButtonProps } from './types/subButtons';
import {
  desktopModalButtonBaseStyle,
  LogoutButtonVariants,
  mobileModalButtonBaseStyle,
  ModalButtonVariants,
  SubButtonVariants,
} from './variants/subButtons';

export function SubButton({ text, variant, disabled, onClick, className }: SubButtonProps) {
  return (
    <button
      className={cn(SubButtonVariants({ variant }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function ModalButton({ text, variant, disabled, onClick, isPending }: ModalButtonProps) {
  const isMobile = useIsMobile();

  return (
    <button
      className={cn(
        ModalButtonVariants({ variant }),
        isMobile ? mobileModalButtonBaseStyle : desktopModalButtonBaseStyle,
        'flex items-center gap-[1rem]',
        `${isPending && !isMobile && 'pl-[1.9rem] bg-primary600'}`,
      )}
      onClick={onClick}
      disabled={disabled || isPending}
    >
      {isPending && !isMobile && <Spinner width={16} height={16} color='var(--primary200)' />}
      {text}
    </button>
  );
}

export function LogoutButton({ text, variant, onClick }: LogoutButtonProps) {
  return (
    <button className={cn(LogoutButtonVariants({ variant }))} onClick={onClick}>
      {text}
    </button>
  );
}
