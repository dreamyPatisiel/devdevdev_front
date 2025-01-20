import React from 'react';

import { TagProps } from './type/tagType';
import { TagVariants } from './variants/tagVariants';

const Tag: React.FC<TagProps> = ({ status, size, color, content }) => {
  const className = TagVariants({ color, status, size });

  return <span className={className}>{content}</span>;
};

export default Tag;
