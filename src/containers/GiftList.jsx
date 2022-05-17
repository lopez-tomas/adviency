import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Gift from '../components/Gift';

const GiftList = () => {
  const { state } = useContext(AppContext)

  return (
    <ul className="GiftList">
      {state.gifts.map(gift => (
        <Gift key={gift.id} gift={gift} />
      ))}
    </ul>
  )
}

export default GiftList;