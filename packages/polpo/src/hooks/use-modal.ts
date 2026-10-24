import { useRef, useState } from 'react';

/** Open state for modals, menus and tooltips: `{ containerRef, isOpen, openModal, closeModal }`. */
export const useModal = <T extends HTMLElement>() => {
  const containerRef = useRef<T>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    containerRef,
    isOpen,
    openModal,
    closeModal,
  };
};
