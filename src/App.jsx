import React, { useState } from 'react';
import './App.sass';

const giftsList = [
  'Mouse Logitech G Pro',
  'Manga Gunnm: Battle Angel Alita #9',
  'Star Wars cup'
]

const App = () => {
  const [gifts, setGifts] = useState(giftsList);

  return (
    <main className='App'>
      <h1>Gifts:</h1>
      <ul>
        {gifts.map((gift, index) => (
          <li key={index}>{gift}</li>
        ))}
      </ul>
    </main>
  )
}

export default App;