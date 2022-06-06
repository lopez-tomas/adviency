import { FormProps } from '../types';

import { useEffect } from 'react';
import '../styles/Modal.sass';

interface ModalProps extends Omit<FormProps, 'idGift' | 'duplicate'> {
  show: boolean;
  children: React.ReactNode;
  preview?: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children, preview }) => {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeOnEscapeKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', closeOnEscapeKeyDown);
    }
  })

  if (!show) {
    return null;
  }

  return (
    <div className='Modal' onClick={onClose}>
      <div className='Modal-content' onClick={e => e.stopPropagation()}>
        <main className='Modal-body'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Modal;