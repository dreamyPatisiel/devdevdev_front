import { twMerge } from 'tailwind-merge';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { dropdownOptionToKorean } from '@utils/dropdownOptionToKorean';
import { cn } from '@utils/mergeStyle';

import AngleDown from '@public/image/angle-down.svg';

import { TypeBlames } from '@/api/useGetBlames';
import {
  TechBlogCommentsOptions,
  bookmarkDropdownOptions,
  pickCommentOptions,
  pickpickpickDropdownOptions,
  techBlogDropdownOptions,
} from '@/constants/DropdownOptionArr';
import {
  DropdownOptionProps,
  useBlameReasonStore,
  useDropdownStore,
  usePickDropdownStore,
  useSelectedStore,
  useTechblogDropdownStore,
} from '@/stores/dropdownStore';

export function Dropdown({
  type,
  disable = false,
  size = 'small',
  line = false,
}: {
  type?: 'pickpickpick' | 'techblog' | 'bookmark' | 'techComment' | 'pickComment';
  disable?: boolean;
  size?: 'small' | 'medium';
  line?: boolean;
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
    case 'techComment':
      dropdownOptions = TechBlogCommentsOptions;
      break;
    case 'pickComment':
      dropdownOptions = pickCommentOptions;
      break;
    default:
      break;
  }

  const DISABLE_CLASS = 'pointer-events-none opacity-50';

  useEffect(() => {
    if (!dropdownOptions.includes(sortOption)) {
      setSort(dropdownOptions[0] as DropdownOptionProps);
    }
  }, []);

  const handleOptionSelected = (value: DropdownOptionProps) => () => {
    setDropdownOpen(false);

    if (type === 'pickpickpick') {
      return setPickSort(value);
    }

    if (type === 'techblog') {
      return setTechblogSort(value);
    }

    setSort(value);
  };

  return (
    <div
      className={twMerge(
        `rounded-[0.8rem] bg-gray600 relative cursor-pointer z-10 
        ${size === 'small' ? 'w-[11rem]' : 'w-[15.2rem]'}
        ${line && 'border border-gray400'}`,
        disable && DISABLE_CLASS,
      )}
      onClick={handleDropdownToggle}
    >
      <label
        htmlFor='dropdown'
        className={`text-gray200 leading-[2.4rem] cursor-pointer flex justify-between items-center p-[1.2rem] ${size === 'small' ? 'p2' : 'p1'}`}
      >
        {dropdownOptionToKorean(selectedSortOption)}
        <Image src={AngleDown} alt='아래방향 화살표' />
      </label>

      {isDropdownOpen && (
        <ul
          id='dropdown'
          className={`text-gray200 absolute rounded-[0.8rem] rounded-t-none bg-gray600 top-[4rem] flex flex-col 
            ${size === 'small' ? 'w-[11rem] p2' : 'w-[15.2rem] p1'}
            ${line && 'border border-gray400 border-t-0 -right-[0.1rem]'}
            `}
        >
          {dropdownOptions.map((option, index) => (
            <li
              key={index}
              onClick={handleOptionSelected(option as DropdownOptionProps)}
              className={`py-[0.8rem] cursor-pointer hover:text-secondary300 hover:bg-gray500
                ${index === dropdownOptions.length - 1 ? 'hover:rounded-b-[0.8rem]' : ''}
                ${selectedSortOption === option && 'text-secondary300'}
                ${size === 'small' ? 'px-[1.2rem] py-[0.6rem]' : 'px-[1.6rem] py-[1rem]'}
                `}
            >
              {dropdownOptionToKorean(option as DropdownOptionProps)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 신고하기 드롭다운
export function LargeBorderDropdown({ dropdownMenu }: { dropdownMenu: TypeBlames[] }) {
  const [onDropdown, setDropdown] = useState(false);
  const { selectedBlameData, setSelectedBlameData } = useSelectedStore();
  const { setBlameReason } = useBlameReasonStore();
  const [textCount, setTextCount] = useState(0);
  const [textValue, setTextValue] = useState('');

  const BLAMES_MAX_LENGTH = 200;

  const handleDropdown = () => {
    setDropdown(!onDropdown);
  };

  const handleSelected = (blameData: TypeBlames) => () => {
    setSelectedBlameData(blameData);
    setDropdown(false);
  };

  const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    setTextValue(textValue);
    setBlameReason(textValue);
    if (textCount > BLAMES_MAX_LENGTH) {
      e.target.value = textValue.substring(0, BLAMES_MAX_LENGTH);
    }
    setTextCount(textValue.length);
  };

  return (
    <>
      <div className={`cursor-pointer relative`}>
        <label
          htmlFor='dropdown'
          className={cn(
            'p1 cursor-pointer flex justify-between items-center px-[1.6rem] py-[1.6rem] rounded-[0.8rem] w-full border-[0.1rem] border-gray400 text-gray200',
            {
              'text-gray200': selectedBlameData?.reason,
              'rounded-b-none border-b-0': onDropdown,
            },
          )}
          onClick={handleDropdown}
        >
          {selectedBlameData?.reason || '신고 사유 선택'}
          <Image src={AngleDown} alt='아래방향 화살표' />
        </label>

        {onDropdown && (
          <ul
            id='dropdown'
            className='text-gray200 p1 absolute rounded-b-[0.8rem] px-[1.6rem] pb-[0.8rem] bg-gray600 top-full right-0 w-full flex flex-col gap-[1.2rem] border-t-0 border-[0.1rem] border-gray3 z-10'
          >
            {dropdownMenu
              .filter((menu) => selectedBlameData?.id !== menu.id)
              .map((menu, index) => (
                <li
                  key={index}
                  onClick={handleSelected(menu)}
                  className='cursor-pointer hover:text-gray50'
                >
                  {menu.reason}
                </li>
              ))}
          </ul>
        )}
      </div>

      {selectedBlameData?.reason === '기타' && (
        <>
          <div
            className={`p-[1.6rem] mt-[1.6rem] rounded-[0.8rem] border ${textCount < 10 ? 'border-red300' : 'border-gray3'}`}
          >
            <textarea
              value={textValue}
              rows={2}
              className={`p1 placeholder:text-gray300 bg-gray600 w-full resize-none outline-none`}
              placeholder='신고하게 된 이유를 작성해주세요 (10자 내외)'
              onChange={handleTextCount}
              maxLength={BLAMES_MAX_LENGTH}
            />
            <div className='p2 font-light text-gray300 flex justify-end'>
              {textCount}/{BLAMES_MAX_LENGTH}
            </div>
          </div>
          {textCount < 10 && (
            <p className='p2 mt-[0.8rem] text-red100'>최소 10글자 이상 작성해주세요</p>
          )}
        </>
      )}
    </>
  );
}
