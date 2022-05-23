import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Gift = ({ gift }) => {
  const { removeGift } = useContext(AppContext);

  const handleRemove = (id) => {
    removeGift(id);
  }

  return (
    <li className="Gift">
      <p>{gift.gift} x {gift.quantity}</p>
      <button onClick={() => handleRemove(gift.id)}>X</button>
    </li>
  )
}

export default Gift;