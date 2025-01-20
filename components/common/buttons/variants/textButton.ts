import { cn } from '@utils/mergeStyle';

import {
  TextButtonSize,
  TextButtonColor,
  TextButtonFontWeight,
  TextButtonLine,
} from './../types/textButton';

export const TextButtonVariantsClass = {
  textbuttonColor: {
    gray: 'text-gray300 border-gray300',
    primary: 'text-primary300 border-primary300',
    red: 'text-red200 border-red200',
    secondary: 'text-secondary300 border-secondary300',
  },
  textbuttonLine: {
    true: 'border-b',
    false: 'border-0',
  },
  textbuttonSize: {
    small: 'text-[1.4rem]',
    medium: 'text-[1.6rem]',
  },
  textbuttonFontWeight: {
    bold: 'font-bold',
    medium: 'font-medium',
    Regular: 'font-light',
  },
};

export const TextButtonVariants = ({
  color,
  line,
  size,
  fontWeight,
}: {
  color: TextButtonColor;
  line: TextButtonLine;
  size: TextButtonSize;
  fontWeight: TextButtonFontWeight;
}) => {
  const { textbuttonColor, textbuttonSize, textbuttonLine, textbuttonFontWeight } =
    TextButtonVariantsClass;
  const colorClass = textbuttonColor[color];
  const sizeClass = textbuttonSize[size];
  const lineClass = textbuttonLine[line];
  const fontWeightClass = textbuttonFontWeight[fontWeight];

  return cn(`${sizeClass} ${colorClass} ${lineClass} ${fontWeightClass}`);
};
