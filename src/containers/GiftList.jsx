import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Gift from '../components/Gift';

const GiftList = () => {
  const { state, removeAll } = useContext(AppContext);

  return (
    <div className="GiftList">
      <ul className="List">
        {state.gifts.map(gift => (
          <Gift key={gift.id} gift={gift} />
        ))}
      </ul>
      <button onClick={removeAll}>Remove ALL</button>
    </div>
  )
}

export default GiftList;