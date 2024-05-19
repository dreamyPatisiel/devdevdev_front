import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { PICK_SUCCESS_MESSAGE } from '@pages/pickposting/constants/pickPostConstants';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import PickForm from '@components/features/pickpickpick/PickForm';
import { MutatePickProps } from '@components/features/pickpickpick/types/formPicks';

import { usePatchPickData } from './apiHooks/usePatchPickData';

export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  const { closeModal } = useModalStore();

  const { mutate: patchPickMutate } = usePatchPickData();
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
          queryClient.invalidateQueries({ queryKey: ['getDetailPickData', id] });
          router.push(`/pickpickpick/${id}`);
          setToastVisible(PICK_SUCCESS_MESSAGE);
        },
      },
    );
  };

  return <PickForm mode='수정' handleSubmitFn={handleUpdateSubmit} />;
}