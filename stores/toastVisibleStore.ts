import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'default';

interface ToastVisibleProps {
  isToastVisible: boolean;
  toastMessage: string;
  toastType: ToastType;
  toastIcon: string;
  toastMessageColor: string;
  setToastVisible: ({
    message,
    type,
    icon,
    messageColor,
  }: {
    message: string;
    type?: ToastType;
    icon?: string;
    messageColor?: string;
  }) => void;
  setToastInvisible: () => void;
}

export const useToastVisibleStore = create<ToastVisibleProps>((set) => ({
  isToastVisible: false,
  toastMessage: '',
  toastType: 'default',
  toastIcon: '',
  toastMessageColor: '',
  setToastVisible: ({
    message,
    type,
    icon,
    messageColor,
  }: {
    message: string;
    type?: ToastType;
    icon?: string;
    messageColor?: string;
  }) =>
    set({
      toastMessage: message,
      isToastVisible: true,
      toastType: type,
      toastIcon: icon,
      toastMessageColor: messageColor,
    }),
  setToastInvisible: () =>
    set({ toastMessage: '', isToastVisible: false, toastIcon: '', toastMessageColor: '' }),
}));
