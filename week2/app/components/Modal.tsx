"use client";

import { useState } from "react";

type ModalProps = {
  title: string;
  message: string;
};

export default function Modal({ title, message }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div role="dialog"
        aria-labelledby="modal-title"
    style={{
        padding: "20px",
        margin: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 id="modal-title">{title}</h2>
      <p>{message}</p>

      <button
        onClick={() => setIsOpen(false)}
        style={{
          padding: "8px 15px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
}