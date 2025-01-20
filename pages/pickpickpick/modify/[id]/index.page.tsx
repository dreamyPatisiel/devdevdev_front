import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { useGetPickDetailData } from '@pages/pickpickpick/[id]/apiHooks/usePickDetailData';
import { PICK_UPDATE_MESSAGE } from '@pages/pickposting/constants/pickPostConstants';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import PickForm from '@components/features/pickpickpick/PickForm';
import { MutatePickProps } from '@components/features/pickpickpick/types/formPicks';

import { usePatchPickData } from './apiHooks/usePatchPickData';

export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  const { closeModal } = useModalStore();

  const { data: pickDetailData } = useGetPickDetailData(id as string);
  const { mutate: patchPickMutate, isPending } = usePatchPickData();
  const { setToastVisible } = useToastVisibleStore();
  const queryClient = useQueryClient();

  const handleUpdateSubmit = (pickData: MutatePickProps) => {
    closeModal();
    patchPickMutate(
      {
        id,
        pickData,
      },
      {
        onSuccess: () => {
          closeModal();
          queryClient.invalidateQueries({
            queryKey: ['getDetailPickData', id],
          });
          queryClient.invalidateQueries({ queryKey: ['pickData'] });
          queryClient.invalidateQueries({ queryKey: ['myPicksData'] });
          router.push(`/pickpickpick/${id}`);
          setToastVisible({ message: PICK_UPDATE_MESSAGE });
        },
      },
    );
  };

  return (
    <PickForm
      mode='수정'
      handleSubmitFn={handleUpdateSubmit}
      pickDetailData={pickDetailData}
      isPending={isPending}
    />
  );
}
