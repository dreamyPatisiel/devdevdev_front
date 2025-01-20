import React from 'react';

import Image from 'next/image';

export default function StatisticsItem({
  icon,
  alt,
  text,
  count,
  className,
  textColor,
}: {
  icon: string;
  alt: string;
  text?: string;
  count?: number;
  className?: string;
  textColor?: string;
}) {
  return (
    <span className={`flex items-center ${className}`}>
      <Image src={icon} alt={alt} />
      <span className={`c1 font-medium text-gray200 ml-2 mr-4 ${textColor}`}>{text}</span>
      <span className={`c1 font-bold text-gray200 ${textColor}`}>{count}</span>
    </span>
  );
}
