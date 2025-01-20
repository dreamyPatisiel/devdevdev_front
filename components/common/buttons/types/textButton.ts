import { VariantProps } from 'class-variance-authority';

import { HTMLAttributes, ReactElement } from 'react';

import { TextButtonVariants } from '../variants/textButton';

export type TextButtonSize = 'medium' | 'small';
export type TextButtonColor = 'primary' | 'gray' | 'secondary' | 'red';
export type TextButtonLine = 'true' | 'false';
export type TextButtonFontWeight = 'bold' | 'medium' | 'Regular';

export interface TextButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TextButtonVariants> {
  buttonContent: string;
  size: TextButtonSize;
  color: TextButtonColor;
  line: TextButtonLine;
  leftIcon?: boolean;
  rightIcon?: ReactElement;
  fontWeight: TextButtonFontWeight;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
