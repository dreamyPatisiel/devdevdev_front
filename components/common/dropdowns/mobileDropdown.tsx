import { useState } from 'react';

import Image from 'next/image';

import { dropdownOptionToKorean } from '@utils/dropdownOptionToKorean';
import { cn } from '@utils/mergeStyle';

import {
  DropdownOptionProps,
  useDropdownStore,
  usePickDropdownStore,
  useTechblogDropdownStore,
} from '@stores/dropdownStore';

import check_gray from '@public/image/check_gray.svg';
import check_green from '@public/image/check_green.svg';
import check_hover_gray from '@public/image/check_hover_gray.svg';
import AngleDown from '@public/image/dropdown-angle-down.svg';

import {
  TechBlogCommentsOptions,
  bookmarkDropdownOptions,
  pickCommentOptions,
  pickpickpickDropdownOptions,
  techBlogDropdownOptions,
} from '@/constants/DropdownOptionArr';

import BottomContainer from '../bottomContents/BottomContainer';

export default function MobileDropdown({
  type = 'pickpickpick',
}: {
  type?: 'pickpickpick' | 'techblog' | 'bookmark' | 'pickComment' | 'comment';
}) {
  const [showBottom, setShowBottom] = useState(false);

  const { sortOption, setSort } = useDropdownStore();
  const { sortOption: pickSortOption, setSort: setPickSort } = usePickDropdownStore();
  const { sortOption: techblogSortOption, setSort: setTechblogSort } = useTechblogDropdownStore();

  let dropdownOptions: string[] = [];
  let selectedSortOption = sortOption;

  switch (type) {
    case 'pickpickpick':
      dropdownOptions = pickpickpickDropdownOptions;
      selectedSortOption = pickSortOption;
      break;
    case 'techblog':
      dropdownOptions = techBlogDropdownOptions;
      selectedSortOption = techblogSortOption;
      break;
    case 'bookmark':
      dropdownOptions = bookmarkDropdownOptions;
      break;
    case 'comment':
      dropdownOptions = TechBlogCommentsOptions;
      break;
    case 'pickComment':
      dropdownOptions = pickCommentOptions;
      break;
  }

  const handleOptionSelected = (value: DropdownOptionProps) => () => {
    setShowBottom(false);

    if (type === 'pickpickpick') {
      return setPickSort(value);
    }

    if (type === 'techblog') {
      return setTechblogSort(value);
    }

    setSort(value);
  };

  const baseStyle = 'px-[2.2rem] py-[1.2rem] st2 text-gray50 cursor-pointer flex justify-between';
  const activeStyle = 'text-secondary400 rounded-[0.8rem]';
  const nonActiveStyle = 'text-gray100 hover:text-gray50';

  return (
    <>
      <div
        className='rounded-[10rem] px-[1.4rem] py-[0.8rem] bg-gray600 text-gray200 flex gap-[0.8rem] c1 font-bold cursor-pointer'
        onClick={() => setShowBottom(true)}
      >
        {dropdownOptionToKorean(selectedSortOption)}
        <Image src={AngleDown} alt='아래방향 화살표' />
      </div>

      {showBottom ? (
        <BottomContainer onClose={() => setShowBottom(false)}>
          <b className='st2 font-bold px-[2.2rem] pt-[2.8rem] pb-[1.6rem]'>정렬</b>
          <ul className='flex flex-col gap-[0.4rem]'>
            {dropdownOptions.map((option, index) => (
              <li
                key={index}
                onClick={handleOptionSelected(option as DropdownOptionProps)}
                className={cn(
                  baseStyle,
                  selectedSortOption === option ? activeStyle : nonActiveStyle,
                  'mobile-dropdown-item',
                )}
              >
                {dropdownOptionToKorean(option as DropdownOptionProps)}

                {selectedSortOption === option ? (
                  <Image src={check_green} alt='활성화된 체크표시' />
                ) : (
                  <>
                    <Image src={check_gray} alt='비활성화된 체크표시' className='default' />
                    <Image src={check_hover_gray} alt='비활성화된 체크표시' className='hover' />
                  </>
                )}
              </li>
            ))}
          </ul>
        </BottomContainer>
      ) : (
        <></>
      )}
    </>
  );
}
