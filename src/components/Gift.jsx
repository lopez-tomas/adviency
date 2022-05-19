import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Gift.sass';

const Gift = ({ gift }) => {
  const { removeGift } = useContext(AppContext);

  const handleRemove = (id) => {
    removeGift(id);
  }

  return (
    <li className="Gift">
      <p>{gift.gift}</p>
      <button className="btn remove-btn" onClick={() => handleRemove(gift.id)}>X</button>
    </li>
  )
}

export default Gift;