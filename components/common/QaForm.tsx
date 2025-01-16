import { MouseEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import sendIcon from '@public/image/sendIcon.png';

import { ElementInfo, usePostQaToSlack } from '@/api/usePostQaToSlack';

export default function QaForm() {
  const [showQaForm, setShowQaForm] = useState(false);
  const [lastTime, setLastTime] = useState(0);
  const [qaFormPosition, setQaFormPosition] = useState({ x: 0, y: 0 });
  const [qaText, setQaText] = useState('');
  const [elementInfo, setElementInfo] = useState<ElementInfo>({
    pathName: '',
    tagName: '',
    className: '',
    id: '',
    textContent: '',
  });

  const formRef = useRef<HTMLDivElement>(null);
  const { mutate: qaToslackMutate } = usePostQaToSlack();

  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQaForm(false);
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setShowQaForm(false);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return;
      }

      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;

      if (timeDiff < 900) {
        e.preventDefault();
        const targetElement = e.target as HTMLElement;

        setShowQaForm(true);
        setQaFormPosition({ x: e.pageX, y: e.pageY });

        setElementInfo({
          pathName: targetElement.baseURI,
          tagName: targetElement.tagName,
          className: targetElement.className,
          id: targetElement.id,
          textContent: targetElement.textContent ?? '',
        });
      }

      setLastTime(currentTime);
    };

    window.addEventListener('keydown', handleEscKeydown as unknown as EventListener);
    window.addEventListener('click', handleOutsideClick as unknown as EventListener);
    window.addEventListener('contextmenu', handleContextMenu as unknown as EventListener);

    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
      window.removeEventListener('click', handleOutsideClick as unknown as EventListener);
      window.removeEventListener('contextmenu', handleContextMenu as unknown as EventListener);
    };
  }, [lastTime]);

  const sendQaToSlack = () => {
    qaToslackMutate(
      { qaText, elementInfo },
      {
        onSuccess: () => setShowQaForm(false),
      },
    );
    // setShowQaForm(false);
  };

  return (
    <div>
      {showQaForm ? (
        <div
          ref={formRef}
          className='absolute bg-white z-50 text-black rounded-[25px] rounded-tl-none text-[14px] p-[15px] flex flex-col'
          style={{
            left: `${qaFormPosition.x}px`,
            top: `${qaFormPosition.y}px`,
          }}
        >
          <textarea
            name='QaTextArea'
            id='QaTextArea'
            placeholder='QA 내용을 입력해주세요.'
            onChange={(e) => setQaText(e.target.value)}
            className='flex w-[25rem] h-[10rem] rounded-[10px] outline-none resize-none p-[10px]'
          />
          <button className='ml-auto' onClick={sendQaToSlack}>
            <Image src={sendIcon} alt='슬랙으로 QA 전송 아이콘' width={20} height={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
