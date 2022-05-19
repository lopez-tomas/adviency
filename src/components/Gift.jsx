import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Gift = ({ gift }) => {
  const { removeGift } = useContext(AppContext);

  const handleRemove = (id) => {
    removeGift(id);
  }

  return (
    <li className="Gift">
      <p>{gift.gift}</p>
      <button
        onClick={() => handleRemove(gift.id)}
        className="btn remove-btn"
      >
        X
      </button>
    </li>
  )
}

export default Gift;