import React, { useState } from 'react';
import GiftList from './containers/GiftList';
import './App.sass';

const giftsList = [
  'Mouse Logitech G Pro',
  'Manga Gunnm: Battle Angel Alita #9',
  'Star Wars cup'
]

const App = () => {
  const [gifts, setGifts] = useState(giftsList);

  return (
    <main className="App">
      <h1 className="App-title">Gifts:</h1>
      <GiftList gifts={gifts} />
    </main>
  )
}

export default App;