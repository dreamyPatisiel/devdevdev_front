import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useSurveyListStore } from '@stores/accountDeleteStore';

import { ValidationMessage } from '@components/common/validationMessage';

import checkCircle from '@public/image/myInfo/check-circle.svg';
import nonCheckCircle from '@public/image/myInfo/circle.svg';

import { DELETE_MESSAGE_COUNT } from '../constants/accountDelete';

interface CheckReasonBoxProps {
  id: string;
  reason: string;
  content: string;
}

export default function CheckReasonBox({ id, reason, content }: CheckReasonBoxProps) {
  const { checkedSurveyList, setCheckedSurveyList, setUncheckedSurveyList } = useSurveyListStore();

  const initialSurvey = checkedSurveyList.find((survey) => survey.id === id);

  const [checked, setChecked] = useState(Boolean(initialSurvey));
  const message = initialSurvey?.message || '';
  const isContent = content == null ? false : true;

  useEffect(() => {
    if (checked) {
      setCheckedSurveyList(id, isContent);
    } else {
      setUncheckedSurveyList(id);
    }
  }, [checked, id, isContent, setCheckedSurveyList, setUncheckedSurveyList]);

  return (
    <label
      htmlFor={id}
      className={`border border-gray500 rounded-[1.2rem] p-[2.4rem] ${checked && 'border-secondary400 bg-black'} cursor-pointer select-none`}
    >
      <input
        type='checkbox'
        id={id}
        onChange={() => setChecked((prevChecked) => !prevChecked)}
        className='hidden'
      />
      <span className={`p1 text-gray200 flex gap-[1.6rem] ${checked && 'text-white'} `}>
        {checked ? (
          <Image src={checkCircle} alt='체크된 체크박스' />
        ) : (
          <Image src={nonCheckCircle} alt='체크되지 않은 체크박스' />
        )}
        {reason}
      </span>
      {content != null && checked && (
        <>
          <textarea
            placeholder={content}
            className='bg-black p-[2.4rem] w-full rounded-[1.2rem] resize-none outline-none p2 placeholder:text-gray300 mt-[2.4rem]'
            onChange={(e) => setCheckedSurveyList(id, isContent, e.target.value)}
            defaultValue={message}
          />

          {message.length < DELETE_MESSAGE_COUNT && (
            <ValidationMessage message={'내용을 작성해주세요'} />
          )}
        </>
      )}
    </label>
  );
}
