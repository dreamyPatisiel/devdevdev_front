import { cn } from '@utils/mergeStyle';

export default function NicknameWithMaskedEmail({
  author,
  maskedEmail,
  textSize,
  className,
}: {
  author: string;
  maskedEmail: string;
  textSize?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(`${textSize ?? 'c1'} text-gray200 font-bold`, className)}
    >{`${author}(${maskedEmail})`}</span>
  );
}
