import { useEffect, useRef, useState } from 'react';

import { LineBreakParser } from '@utils/LineBreakParser';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import { SubButton } from '@components/common/buttons/subButtons';

import VisibilityPickToggle from './VisibilityPickToggle';

interface WritableCommentProps {
  // FIXME: 'techblog' 가 아닌 'default'로 바꾸기
  type: 'pickpickpick' | 'techblog';
  mode: 'register' | 'edit';
  preContents?: string;
  isVoted?: boolean;
  writableCommentButtonClick: ({
    contents,
    isPickVotePublic,
    onSuccess,
  }: {
    contents: string;
    isPickVotePublic?: boolean;
    onSuccess: () => void;
  }) => void;
  cancelButtonClick?: () => void;
  parentCommentAuthor?: string;
}

// 댓글 작성폼
export default function WritableComment({
  type,
  mode = 'register',
  preContents,
  isVoted = true,
  writableCommentButtonClick,
  cancelButtonClick,
  parentCommentAuthor,
}: WritableCommentProps) {
  const MAX_LENGTH = 1000;
  const isMobile = useIsMobile();

  const [textCount, setTextCount] = useState(preContents?.length ?? 0);
  const [textValue, setTextValue] = useState(preContents ?? '');
  const [isChecked, setIsChecked] = useState(false);
  const editableSpanRef = useRef<HTMLSpanElement | null>(null);

  // 로그인 여부
  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal } = useLoginModalStore();
  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleTextOnInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (loginStatus === 'logout') {
      e.preventDefault();
      openLoginModal();
      return;
    }
    let textValue = e.target.innerText;
    setTextValue(textValue);
    if (textValue.length >= MAX_LENGTH) {
      if (!editableSpanRef.current) return;
      const sliceText = textValue.substring(0, MAX_LENGTH);
      editableSpanRef.current.innerText = sliceText;
      setTextValue(sliceText);
      setTextCount(sliceText.length);
      // 커서를 텍스트의 맨 뒤로 이동
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editableSpanRef.current);
      range.collapse(false);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      return;
    }

    setTextCount(textValue.length);
  };

  const handleSubmitWritable = () => {
    writableCommentButtonClick({
      contents: textValue,
      isPickVotePublic: isChecked,
      onSuccess: () => {
        if (editableSpanRef.current) {
          editableSpanRef.current.innerText = '';
        }
        setTextValue('');
        setTextCount(0);
      },
    });
  };

  const handleCancel = () => {
    if (cancelButtonClick) {
      cancelButtonClick();
    }
    if (editableSpanRef.current) {
      editableSpanRef.current.innerText = '';
    }
    setTextValue('');
    setTextCount(0);
  };

  /** 비회원이 댓글 작성시도시 로그인모달 띄우기 */
  const handleFocus = () => {
    if (loginStatus === 'logout') {
      openLoginModal();
      return;
    }
    if (editableSpanRef.current) {
      editableSpanRef.current.focus();
    }
  };

  const [updatedClassNames, setUpdatedClassNames] = useState({
    bottomSection: '',
    buttonContainer: '',
  });

  useEffect(() => {
    setUpdatedClassNames({
      bottomSection: `flex items-end ${
        isMobile && type === 'pickpickpick'
          ? 'flex-col gap-[0.8rem]'
          : 'mt-[1.6rem] justify-between'
      }`,
      buttonContainer: `w-full flex gap-[1.6rem] items-center ${
        isMobile && type === 'pickpickpick' ? 'justify-between' : 'justify-end'
      }`,
    });
  }, [isMobile, type]);

  return (
    <div
      className={`${isMobile ? 'px-[1.6rem]' : 'px-[2.4rem]'}  py-[1.6rem] bg-gray600 rounded-[1.6rem]`}
    >
      <div
        className={`p2 w-full resize-none outline-none ${isMobile ? 'max-h-[12rem] min-h-[9.6rem]' : 'max-h-[28rem] min-h-[6.8rem]'} overflow-y-scroll scrollbar-hide`}
        onClick={handleFocus}
      >
        {!textValue && mode === 'register' && !parentCommentAuthor && (
          <span
            className={`p2 text-gray300 absolute ${isMobile ? 'pr-[3.6rem]' : ''}`}
            onClick={handleFocus}
          >
            댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수
            있습니다.
            {type === 'pickpickpick' && (
              <>
                <br /> 픽픽픽 공개여부는 댓글을 작성하고 나면 수정할 수 없어요.
              </>
            )}
          </span>
        )}
        <span
          contentEditable='false'
          suppressContentEditableWarning={true}
          className='p2 text-primary300 pointer-events-none ml-0'
        >
          {parentCommentAuthor ? `@${parentCommentAuthor} ` : ''}
        </span>

        <span
          ref={editableSpanRef}
          contentEditable={loginStatus === 'logout' ? false : true}
          onInput={handleTextOnInput}
          className={`w-full resize-none outline-none`}
        >
          {mode === 'register' ? '' : <LineBreakParser text={preContents || ''} />}
        </span>
      </div>

      <div className={updatedClassNames.bottomSection}>
        <div className='p2 font-light text-gray300'>
          {textCount}/{MAX_LENGTH}
        </div>
        <div className={updatedClassNames.buttonContainer}>
          {mode === 'edit' && (
            <SubButton text='취소' variant='primary_border' onClick={handleCancel} />
          )}
          {type === 'pickpickpick' && (
            <VisibilityPickToggle
              isChecked={isChecked}
              handleToggle={handleToggle}
              loginStatus={loginStatus}
            />
          )}

          <SubButton
            text={mode === 'register' ? '댓글 남기기' : '수정하기'}
            variant='primary'
            disabled={textCount <= 0}
            onClick={handleSubmitWritable}
          />
        </div>
      </div>
    </div>
  );
}
