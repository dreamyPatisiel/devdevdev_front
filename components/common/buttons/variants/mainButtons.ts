import { cva } from 'class-variance-authority';

export const MainButtonVariants = cva(
  'px-[1.9rem] py-[0.9rem] rounded-[5rem] flex items-center gap-[1rem]',
  {
    variants: {
      variant: {
        primary: 'bg-primary500 disabled:bg-primary600 hover:bg-primary400',
        black:
          'bg-black border-[0.1rem] border-gray5 border-solid disabled:border-gray4 disabled:text-gray4 disabled:pointer-events-none hover:bg-gray500',
        // TODO: 픽픽픽 작성페이지 버튼 문의 대기중
      },
    },
  },
);
