import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import PickForm from '@components/features/pickpickpick/PickForm';
import { MutatePickProps } from '@components/features/pickpickpick/types/formPicks';

import { usePostPicks } from './api/usePostPicks';
import { PICK_SUCCESS_MESSAGE } from './constants/pickPostConstants';

export default function Index() {
  const { mutate: postPicksMutate, isPending } = usePostPicks();
  const router = useRouter();
  const { closeModal } = useModalStore();
  const { setToastVisible } = useToastVisibleStore();

  const queryClient = useQueryClient();

  const handlePostSubmit = (picksData: MutatePickProps) => {
    postPicksMutate(
      { picksData },
      {
        onSuccess: () => {
          closeModal();
          router.push(`/pickpickpick`);
          setToastVisible({ message: PICK_SUCCESS_MESSAGE });
          queryClient.invalidateQueries({ queryKey: ['myPicksData'] });
        },
      },
    );
  };

  return <PickForm mode={'등록'} handleSubmitFn={handlePostSubmit} isPending={isPending} />;
}
