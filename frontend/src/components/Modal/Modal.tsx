import { X } from "@phosphor-icons/react";
import type { UIComponentProps } from "types";

export const Modal = ({
  isOpen,
  onClose,
  options,
  children,
}: UIComponentProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // Fecha modal clicando fora do conteúdo
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar dentro do modal
      >
        <div className="flex items-center justify-between mb-2 relative">
          <h1 className="text-foreground text-xl font-semibold">
            {options ? options.titulo ?? "" : ""}
          </h1>
          <button
            className="absolute top-3 right-3 hover:text-red-600 text-foreground"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
