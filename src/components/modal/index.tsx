import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import CloseIcon from "../../assets/close.svg";
import styles from "./styles.css";

interface ModalProps {
  onClose: () => void;
  children: preact.ComponentChildren;
}

const Modal: FunctionalComponent<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <style>{styles.toString()}</style>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
