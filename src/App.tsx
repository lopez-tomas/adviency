import React, { useState } from 'react';
import AppContext from './context/AppContext';
import useInitialState from './hooks/useInitialState';
import Modal from './containers/Modal';
import Form from './containers/Form';
import GiftList from './containers/GiftList';
import './styles/App.sass';

const App: React.FC = () => {
  const initialState = useInitialState();
  const [show, setShow] = useState(false);

  return (
    <AppContext.Provider value={initialState}>
      <main className='App'>
        <section className='Form-container'>
          <h1>Gifts</h1>
          <button onClick={() => setShow(!show)} className='btn add-gift'>Add gift</button>

          <Modal show={show} onClose={() => setShow(false)}>
            <Form onClose={() => setShow(false)} />
          </Modal>
        </section>
        <section className='GiftList-container'>
          <GiftList />
        </section>
      </main>
    </AppContext.Provider>
  )
}

export default App;