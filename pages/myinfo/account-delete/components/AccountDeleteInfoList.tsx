export interface AccountDeleteInfoListProps {
  content: string;
  type: 'delete' | 'keep';
}

export default function AccountDeleteInfoList({ content, type }: AccountDeleteInfoListProps) {
  return (
    <li className='p1 font-light text-gray100 list-disc'>
      {content}
      <span className='text-secondary400'>
        {type === 'delete' && ' 삭제'}
        {type === 'keep' && ' 유지'}
      </span>
    </li>
  );
}
