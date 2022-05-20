import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Gift = ({ gift }) => {
  const { removeGift } = useContext(AppContext)

  const handleRemove = (id) => {
    removeGift(id);
  }

  return (
    <li>
      <p>{gift.gift}</p>
      <button onClick={() => handleRemove(gift.id)}>X</button>
    </li>
  )
}

export default Gift;