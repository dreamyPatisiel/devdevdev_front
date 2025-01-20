import { cva, VariantProps } from 'class-variance-authority';

import React, { useEffect, useState, FC } from 'react';

import Link from 'next/link';

import DefaultTechMainImg from '@public/image/techblog/DefaultTechMainImg.png';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/mergeStyle';

export const TechBlogImgVariants = cva('', {
  variants: {
    size: {
      large: ['w-[20rem]', 'h-[13.6rem]'],
      small: ['w-[12rem]', 'h-[8rem]'],
      mobile: ['w-full', 'h-[13.6rem]'],
    },
  },
});

interface TechBlogImgProps extends VariantProps<typeof TechBlogImgVariants> {
  id: number;
  isLogoImage?: boolean;
  thumbnailUrl?: string;
  rounded?: string;
}

const TechBlogImg: FC<TechBlogImgProps> = ({
  size,
  id,
  isLogoImage = false,
  thumbnailUrl,
  rounded = 'rounded-[1.6rem]',
}) => {
  const [techMainImgUrl, setTechMainImgUrl] = useState<string>(DefaultTechMainImg.src);
  useEffect(() => {
    if (thumbnailUrl) {
      setTechMainImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  return (
    <div className={cn(TechBlogImgVariants({ size }))}>
      <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
        {size === 'mobile' && isLogoImage ? (
          <div
            className={cn(
              `${rounded} flex justify-center bg-gray700`,
              TechBlogImgVariants({ size }),
            )}
          >
            <img
              className='w-[14.7rem] object-cover'
              src={techMainImgUrl}
              alt='기술블로그 썸네일'
            />
          </div>
        ) : (
          <img
            className={cn(`${rounded} object-cover bg-gray700`, TechBlogImgVariants({ size }))}
            src={techMainImgUrl}
            alt='기술블로그 썸네일'
          />
        )}
      </Link>
    </div>
  );
};
export default TechBlogImg;
