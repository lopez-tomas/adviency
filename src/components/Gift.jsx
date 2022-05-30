import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Gift.sass';

const noImage = "https://raw.githubusercontent.com/lopez-tomas/adviency/day10/src/images/no-image.jpg"

const Gift = ({ gift }) => {
  const { removeGift } = useContext(AppContext);

  return (
    <li className="Gift">
      <img className="gift-img" src={gift.image ? gift.image : noImage} alt={gift.gift} />
        <p className="gift-name">
          {gift.gift}
          <span className="gift-quantity"> ({gift.quantity})</span>
          <p className="gift-to">{gift.to}</p>
        </p>
      <div>
        <button onClick={() => removeGift(gift.id)} className="btn remove-btn">X</button>
      </div>
    </li>
  )
}

export default Gift;