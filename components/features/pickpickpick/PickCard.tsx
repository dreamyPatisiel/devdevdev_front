import { useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { PickOptionData } from '@pages/pickpickpick/[id]/types/pickDetailData';
import { useDeletePickImage } from '@pages/pickposting/api/useDeletePickImage';
import { usePostPickImages } from '@pages/pickposting/api/usePostPickImages';
import { MAX_IMAGE_COUNT } from '@pages/pickposting/constants/pickPostConstants';

import { cn } from '@utils/mergeStyle';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';

import { MainButton } from '@components/common/buttons/mainButtons';
import { ValidationMessage } from '@components/common/validationMessage';

import IconPhoto from '@public/image/images.svg';
import Xbutton from '@public/image/pickpickpick/xbutton.svg';

import { MutatePickProps, PickOrder } from './types/formPicks';

const MarkdownEditor = dynamic(() => import('./MarkdownEditor'), {
  ssr: false,
});

export default function PickCard({
  order,
  control,
  errors,
  setValue,
  pickDetailOptionData,
  watch,
}: {
  order: PickOrder;
  control: Control<MutatePickProps, any>;
  errors: FieldErrors<MutatePickProps>;
  setValue: UseFormSetValue<MutatePickProps>;
  pickDetailOptionData?: PickOptionData;
  watch: UseFormWatch<MutatePickProps>;
}) {
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { mutate: pickImagesMutate } = usePostPickImages();
  const [showImages, setShowImages] = useState<string[]>(
    pickDetailOptionData?.pickDetailOptionImages.map((image) => image.imageUrl) || [],
  );

  const [pickImageIds, setPickImageIds] = useState<number[]>(
    pickDetailOptionData?.pickDetailOptionImages.map((image) => image.id) || [],
  );

  useEffect(() => {
    if (pickDetailOptionData != undefined) {
      setShowImages(pickDetailOptionData?.pickDetailOptionImages.map((image) => image.imageUrl));
      setPickImageIds(pickDetailOptionData?.pickDetailOptionImages.map((image) => image.id));
    }
  }, [pickDetailOptionData]);

  useEffect(() => {
    setValue(`pickOptions.${order}PickOption.pickOptionImageIds`, pickImageIds);
  }, [pickImageIds, setValue, order]);

  const { setToastVisible } = useToastVisibleStore();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    if (showImages.length + files.length > MAX_IMAGE_COUNT) {
      return setToastVisible({
        message: `이미지는 ${MAX_IMAGE_COUNT}개 이하만 가능합니다.`,
        type: 'error',
      });
    }

    const fileArray = Array.from(files);

    pickImagesMutate(
      { pickImages: fileArray, optionOrder: order },
      {
        onSuccess: (data) => {
          data.data.pickOptionImages.map(
            (value: { pickOptionImageId: number; imageKey: string; imageUrl: string }) => {
              if (value.imageKey === 'UPLOAD_FAIL') {
                setShowImages((prevImages) => [
                  ...prevImages,
                  'image/pickpickpick/imageUploadFail.svg',
                ]);
              } else setShowImages((prevImage) => [...prevImage, value.imageUrl]);

              const id = value.pickOptionImageId;

              setPickImageIds((prevIds) => [...prevIds, id]);
            },
          );
        },
      },
    );
  };

  const { mutate: deletePickImageMutate } = useDeletePickImage();

  const handleDeleteImage = (index: number) => {
    const deletePickImage = (
      pickImageIds: number[],
      setPickImageIds: (newImageIds: number[]) => void,
    ) => {
      deletePickImageMutate(
        { pickOptionImageId: pickImageIds[index] },
        {
          onSuccess: () => {
            const newImageIds = pickImageIds.filter((_, idx) => idx !== index);

            setPickImageIds(newImageIds);
            setShowImages((prevImage) => prevImage.filter((_, idx) => idx !== index));
          },
        },
      );
    };

    deletePickImage(pickImageIds, setPickImageIds);
  };

  const pickTitleValue = watch(`pickOptions.${order}PickOption.pickOptionTitle`);

  const pickLabelStyle = `font-bold mb-[1.6rem] ${isMobile ? 'p2' : 'st2'}`;

  const PickCardContainerStyle = {
    base: 'border-solid flex flex-col gap-[2.2rem]',
    mobile: 'mx-[1.6rem] border-t-[0.1rem] border-b-[0.1rem] border-gray500',
    desktop: 'p-[4rem] border-[0.1rem] rounded-[1.6rem] border-gray400',
  };

  const PickOptionInputStyle = {
    base: 'bg-gray700 text-white w-[100%] border-[0.1rem] border-gray400 focus:outline-none focus:border-primary400',
    mobile: 'p1 py-[0.8rem] px-[1.6rem] rounded-[0.8rem]',
    desktop: 'st2 py-[1.6rem] px-[2rem] rounded-[1.6rem]',
  };

  return (
    <div
      className={cn(
        PickCardContainerStyle.base,
        isMobile ? PickCardContainerStyle.mobile : PickCardContainerStyle.desktop,
      )}
    >
      <div className='mt-[3.2rem]'>
        <p className={pickLabelStyle}>
          선택지 중 하나를 작성해주세요<span className='text-secondary400'> *</span>
        </p>
        <Controller
          name={`pickOptions.${order}PickOption.pickOptionTitle`}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <input
              type='text'
              className={cn(
                PickOptionInputStyle.base,
                isMobile ? PickOptionInputStyle.mobile : PickOptionInputStyle.desktop,
              )}
              placeholder='선택지를 입력해주세요.'
              onChange={onChange}
              defaultValue={pickDetailOptionData?.title}
            />
          )}
        />
        {(errors?.pickOptions?.[`${order}PickOption`]?.pickOptionTitle ||
          pickTitleValue === '') && <ValidationMessage message={'내용을 작성해주세요'} />}
      </div>

      <div>
        <p className={pickLabelStyle}>선택지에 대한 설명을 작성해주세요</p>
        <MarkdownEditor
          control={control}
          order={order}
          markdownContent={pickDetailOptionData?.content}
        />
      </div>

      <Controller
        name={`pickOptions.${order}PickOption.pickOptionImageIds`}
        control={control}
        render={({ field }) => (
          <input
            type='file'
            id='input-image'
            onChange={(e) => {
              handleImageUpload(e);
              field.onChange(pickImageIds ?? []);
            }}
            multiple
            accept='image/jpeg, image/png'
            className='hidden'
            ref={fileInputRef}
          />
        )}
      />

      {showImages.length !== 0 && (
        <div>
          <p className='st2 font-bold mb-[1.6rem]'>첨부된 이미지</p>

          <div className={`${!isMobile && 'grid-cols-3'} grid gap-[2.4rem]`}>
            {showImages?.map((value, index) => (
              <div key={index}>
                <Image
                  src={Xbutton}
                  className='ml-auto cursor-pointer'
                  alt='이미지 삭제 버튼'
                  onClick={() => handleDeleteImage(index)}
                />
                <div
                  className={`rounded-[1.2rem] overflow-hidden relative mt-[1rem] ${isMobile ? 'h-[16rem]' : 'h-[18rem]'}`}
                >
                  <img
                    src={value}
                    alt={`이미지-${index}`}
                    width={100}
                    height={100}
                    className='object-cover object-top w-full h-full'
                    defaultValue={value}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <label htmlFor='input-image' className={`${!isMobile && 'ml-auto'} mb-[3.2rem]`}>
        <MainButton
          text='이미지'
          type='button'
          icon={<Image src={IconPhoto} alt='사진 아이콘' />}
          variant='black'
          onClick={handleImageButtonClick}
          className={`${isMobile && 'w-full flex justify-center'}`}
        />
      </label>
    </div>
  );
}
