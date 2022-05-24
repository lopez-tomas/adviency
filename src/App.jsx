import React, { useState } from 'react';
import AppContext from './context/AppContext';
import useInitialState from './hooks/useInitialState';
import Modal from './containers/Modal';
import GiftList from './containers/GiftList';
import './styles/App.sass';

const App = () => {
  const initialState = useInitialState();
  const [show, setShow] = useState(false);

  return (
    <AppContext.Provider value={initialState}>
      <main className="App">
        <section className="Form-container">
          <h1>Gifts</h1>
          <button onClick={() => setShow(true)}>Add gift</button>
          <Modal show={show} onClose={() => setShow(false)} />
        </section>
        <section className="GiftList-container">
          <GiftList />
        </section>
      </main>
    </AppContext.Provider>
  )
}

export default App;