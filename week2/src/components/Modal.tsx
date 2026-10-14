
import type { ReactNode } from "react";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ isOpen, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ui-modal-overlay" onClick={onClose}>
      <section
        className="ui-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ui-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="ui-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <h2 id="ui-modal-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}

export default Modal;
