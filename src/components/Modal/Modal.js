import { useEffect, useRef } from 'react';

import styles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
  const modalReference = useRef(null);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <div className={`${styles.modalBackdrop} ${isOpen ? styles.open : ''}`}>
      <div ref={modalReference} className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
