import React, { useState } from 'react';
import GiftList from './containers/GiftList';

const giftsList = [
  'Logitech G Pro mouse',
  'Razer keyboard',
  'HyperX headset'
]

const App = () => {
  const [gifts, setGifts] = useState(giftsList);

  return (
    <main className="App">
      <h1 className="App-title">Gifts</h1>
      <GiftList gifts={gifts} />
    </main>
  )
}

export default App;