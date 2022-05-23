import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import noImage from '../images/no-image.jpg';
import '../styles/Gift.sass';

const Gift = ({ gift }) => {
  const { removeGift } = useContext(AppContext);

  const handleRemove = (id) => {
    removeGift(id);
  }

  return (
    <li className="Gift">
      <img className="gift-img" src={gift.image || noImage} height="70" width="70" alt={`Gift: ${gift.gift}`} />
      <p>{gift.gift}<span className="gift-quantity"> x {gift.quantity}</span></p>
      <div>
        <button
          onClick={() => handleRemove(gift.id)}
          className="btn remove-btn"
        >
          X
        </button>
      </div>
    </li>
  )
}

export default Gift;