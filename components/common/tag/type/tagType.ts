export type TagStatus = 'main' | 'sub' | 'line';
export type TagSize = 'basic' | 'small';
export type TagColor = 'red' | 'secondary' | 'primary';

export type TypeTagClasses = {
  [key in TagColor]: {
    [key in TagStatus]: string;
  };
};

export interface TagProps {
  status: TagStatus;
  size: TagSize;
  color: TagColor;
  content: string;
}
