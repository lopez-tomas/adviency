import React from 'react';
import AppContext from './context/AppContext';
import useInitialState from './hooks/useInitialState';

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <main className='App'>
        <h1>Hello, World!</h1>
      </main>
    </AppContext.Provider>
  )
}

export default App;