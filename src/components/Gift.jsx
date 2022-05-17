import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Gift = ({ gift }) => {
  const { removeGift } = useContext(AppContext);

  const handleRemove = (id) => {
    removeGift(id);
  }

  return (
    <li className="Gift">
      <div>
        {gift.gift}
      </div>
      <div>
        <button onClick={() => handleRemove(gift.id)}>[X]</button>
      </div>
    </li>
  )
}

export default Gift;