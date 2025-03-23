"use client";

import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import { ReactNode, RefObject, useRef } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as RefObject<HTMLDivElement>, () => setIsOpen(false));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#787878]/10 flex items-center justify-center backdrop-blur-md z-50">
      <div ref={ref}>{children}</div>
    </div>
  );
};
