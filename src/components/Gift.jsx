import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import Modal from '../containers/Modal';
import '../styles/Gift.sass';

const noImage = "https://raw.githubusercontent.com/lopez-tomas/adviency/day10/src/images/no-image.jpg";

const Gift = ({ gift }) => {
  const { removeGift } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const calculatePrice = (price, quantity) => {
    return (parseFloat(price) * parseInt(quantity)).toFixed(2);
  }

  return (
    <>
      <li className="Gift">
        <img className="gift-img" src={gift.image ? gift.image : noImage} alt={gift.gift}/>
        <p className="gift-name">
          {gift.gift}
          <span className="gift-quantity"> ({gift.quantity})</span>
          <span className="gift-price"> - $ {calculatePrice(gift.price, gift.quantity)}</span><br />
          <span className="gift-to">{gift.to}</span>
        </p>
        <div>
          <button onClick={() => setShow(!show)} className="btn edit-btn">
            E
          </button>
          <button onClick={() => removeGift(gift.id)} className="btn remove-btn">
            X
          </button>
        </div>
      </li>

      <Modal show={show} onClose={() => setShow(false)} idGift={gift.id} />
    </>
  )
}

export default Gift;