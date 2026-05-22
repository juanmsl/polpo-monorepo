import { useRef, useState } from 'react';

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
