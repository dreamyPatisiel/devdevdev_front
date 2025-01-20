import { create } from 'zustand';

// login모달 store
export interface LoginModalStore {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  description: string;
  setDescription: (description: string) => void;
}
export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  description: '',
  setDescription: (description) => set({ description: description }),
}));

// 모달 store
export interface ModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalType: string;
  setModalType: (type: string) => void;
  title: string;
  contents: string;
  setTitle: (title: string) => void;
  setContents: (text: string) => void;
  modalSubmitFn: () => void;
  setModalSubmitFn: (submitFn: () => void) => void;
  isPending: boolean;
  setIsPending: () => void;
  setIsNotPending: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, modalType: '' }),
  modalType: '',
  setModalType: (type) => set({ modalType: type }),
  title: '',
  contents: '',
  setTitle: (text) => set({ title: text }),
  setContents: (text) => set({ contents: text }),
  modalSubmitFn: () => {},
  setModalSubmitFn: (submitFn) => set({ modalSubmitFn: submitFn }),
  isPending: false,
  setIsPending: () => set({ isPending: true }),
  setIsNotPending: () => set({ isPending: false }),
}));
