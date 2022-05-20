import React from 'react';
import AppContext from './context/AppContext';
import useInitialState from './hooks/useInitialState';
import Form from './containers/Form';
import GiftList from './containers/GiftList';

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <main className="App">
        <section className="Form-container">
          <h1>Gifts</h1>
          <Form />
        </section>
        <section className="GiftList-container">
          <GiftList />
        </section>
      </main>
    </AppContext.Provider>
  )
}

export default App;