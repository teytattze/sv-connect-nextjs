import { useState } from 'react';

export function useToggle(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return { isOpen, toggle: handleToggle };
}
