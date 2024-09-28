"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "./use-modal";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, onCloseModal } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (onCloseModal) {
          closeModal();
        }
      }}
      customSize={customSize}
      containerClassName="pointer-events-auto bg-white"
      className="z-[999999999] pointer-events-auto"
      overlayClassName="dark:bg-opacity-60 opacity-60 bg-black"
    >
      {view}
    </Modal>
  );
}
