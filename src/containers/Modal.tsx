import { FormProps } from '../types';
import React, { useEffect } from 'react';
import Form from './Form';
import '../styles/Modal.sass';

interface Props extends FormProps {
  show: boolean;
}

const Modal: React.FC<Props> = ({ show, onClose, idGift }) => {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);

    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    }
  })

  if (!show) {
    return null;
  }

  return (
    <div className='Modal' onClick={onClose}>
      <div className='Modal-content' onClick={e => e.stopPropagation()}>
        <main className="Modal-body">
          <Form onClose={onClose} idGift={idGift} />
        </main>
      </div>
    </div>
  )
}

export default Modal;