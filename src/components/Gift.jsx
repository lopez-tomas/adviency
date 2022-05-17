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
      <div className="Gift-gift">
        {gift.gift}
      </div>
      <div className="Gift-btn">
        <button onClick={() => handleRemove(gift.id)}>X</button>
      </div>
    </li>
  )
}

export default Gift;