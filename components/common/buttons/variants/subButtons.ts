import { cva } from 'class-variance-authority';

export const SubButtonVariants = cva(
  'p2 font-bold px-[1.9rem] py-[0.8rem] rounded-[1rem] w-min-[10.2rem]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary500 disabled:bg-primary600 disabled:text-primary200 hover:bg-primary400',
        primary_border: 'border border-primary400 text-primary300 font-bold',
        gray: 'bg-gray600 disabled:bg-gray700 disabled:text-white/50 hover:bg-gray500',
        black: 'bg-black disabled:text-gray4 hover:bg-gray500 hover:text-white', // FIXME: 사용하는 곳이 없음?!
      },
    },
  },
);

export const mobileModalButtonBaseStyle = 'p2 px-[3.2rem] w-full justify-center';
export const desktopModalButtonBaseStyle = 'p1 px-[3.3rem] w-full justify-center';

export const ModalButtonVariants = cva(
  'py-[0.9rem] rounded-[0.8rem] tracking-[-0.32px] font-bold',
  {
    variants: {
      variant: {
        primary:
          'bg-primary500 disabled:bg-primary600 disabled:text-primary200 hover:bg-primary400',
        secondary: 'border border-primary500 text-primary300',
        gray: 'bg-gray600 hover:bg-gray500',
      },
    },
  },
);

export const LogoutButtonVariants = cva('st2 font-bold py-[0.9rem] rounded-[0.8rem] w-[14.2rem]', {
  variants: {
    variant: {
      primary: 'bg-primary500',
      gray: 'bg-gray3', // TODO: 로그인 배경색 정해지면 수정필요
    },
  },
});
