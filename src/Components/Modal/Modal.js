import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onClose, children }) => {
  const handleKeyDown = (evt) => {
    if (evt.code === "Escape") {
      onClose();
    }
  };

  const onBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return createPortal(
    <div className="Overlay" onClick={onBackdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
