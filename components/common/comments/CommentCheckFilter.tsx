interface CheckFilterProps {
  checkOptionTitle: string;
  onFilterChange: () => void;
  isChecked?: boolean;
}

export default function CommentCheckFilter({
  checkOptionTitle,
  onFilterChange,
  isChecked,
}: CheckFilterProps) {
  return (
    <div className='flex gap-[1rem] items-center'>
      <label htmlFor={checkOptionTitle} className='cursor-pointer flex items-center gap-[0.9rem]'>
        <input
          type='checkbox'
          name={checkOptionTitle}
          id={checkOptionTitle}
          className='appearance-none w-[1.3rem] h-[1.3rem] bg-[url("/image/pickpickpick/square.svg")] bg-no-repeat bg-center cursor-pointer checked:bg-[url("/image/pickpickpick/check-square.svg")]'
          onChange={onFilterChange}
          checked={isChecked}
        />
        <span className='p2 text-gray200 select-none'>{checkOptionTitle}</span>
      </label>
    </div>
  );
}
