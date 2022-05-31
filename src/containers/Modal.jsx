import React, { useEffect } from 'react';
import Form from './Form';
import '../styles/Modal.sass';

const Modal = ({ show, onClose, idGift }) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
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
    <div className="Modal" onClick={onClose}>
      <div className="Modal-content" onClick={e => e.stopPropagation()}>
        <main className="Modal-body">
          <Form onClose={onClose} idGift={idGift} />
        </main>
      </div>
    </div>
  )
}

export default Modal;