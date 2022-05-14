import React, { useState } from 'react';
import Gift from './components/Gift';
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
          <Gift key={index} gift={gift} />
        ))}
      </ul>
    </main>
  )
}

export default App;