"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
  onCloseModal?: boolean;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: "320px",
  onCloseModal: true,
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
    onCloseModal
  }: {
    view: React.ReactNode;
    customSize?: string;
    onCloseModal?: boolean;
  }) => {
    setState({
      ...state,
      isOpen: true,
      onCloseModal: onCloseModal ?? true,
      view,
      customSize,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  const updateOnCloseModal = () => {
    setState({
      ...state,
      onCloseModal: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
    updateOnCloseModal,
  };
}
