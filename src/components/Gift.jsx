import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Gift.sass';

const Gift = ({ gift }) => {
  const { removeGift }= useContext(AppContext);

  const handleRemove = (id) => {
    removeGift(id);
  }

  return (
    <li className="Gift">
      <p className="gift-name">{gift.gift}</p>
      <p className="gift-quantity">x {gift.quantity}</p>
      <button onClick={() => handleRemove(gift.id)} className="btn remove-btn">X</button>
    </li>
  )
}

export default Gift;