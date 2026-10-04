"use client";

import { useState } from "react";

type ModalProps = {
  title: string;
  children: React.ReactNode;
};

function Modal({ title, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="ui-button"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-content">
            <h2 id="modal-title">{title}</h2>

            <div>{children}</div>

            <button
              className="ui-button"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;