import { FormProps } from '../types';

import { useEffect } from 'react';
// import Form from './Form';
import '../styles/Modal.sass';

interface Props extends Omit<FormProps, 'idGift' | 'edit'> {
  show: boolean;
  children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  show,
  onClose,
  children
}) => {
  const closeOnEscapeKeyDown = ((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', closeOnEscapeKeyDown);

    return () => {
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
          {/* <Form onClose={onClose} idGift={idGift} edit={edit} /> */}
          {children}
        </main>
      </div>
    </div>
  )
}

export default Modal;