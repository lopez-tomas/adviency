import { useState } from 'react';
import AppContext from './context/AppContext';
import useInitialState from './hooks/useInitialState';
import { Modal, Form, GiftList } from './containers/main';
import './styles/App.sass';

const App = () => {
  const initialState = useInitialState();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <AppContext.Provider value={initialState}>
      <main className='App'>
        <section className='Form-container'>
          <h1>Gifts</h1>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className='btn add-gift'
          >
            Add gift
          </button>

          <Modal show={showAdd} onClose={() => setShowAdd(false)}>
            <Form onClose={() => setShowAdd(false)} />
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