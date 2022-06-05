import { ContextProps } from '../types';
import { Gift } from '../gifts/gift.model';

import { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import Modal from '../containers/Modal';
import '../styles/Gift.sass';

const noImage = "https://raw.githubusercontent.com/lopez-tomas/adviency/day10/src/images/no-image.jpg";

interface Props {
  gift: Gift
};

const GiftFC: React.FC<Props> = ({ gift }) => {
  const { removeGift }: ContextProps = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const calculatePrice = (price: Gift['price'], quantity: Gift['quantity']): string => {
    return (price * quantity).toFixed(2);
  }

  return (
    <>
      <li className='Gift'>
        <img className='gift-img' src={gift.image ? gift.image : noImage} alt={gift.gift} />
        <p className='gift-name'>
          {gift.gift}
          <span className='gift-quantity'> ({gift.quantity})</span><br />
          <span className='gift-quantity'> $ {calculatePrice(gift.price, gift.quantity)}</span><br />
          <span className='gift-quantity'> {gift.to}</span>
        </p>
        <div>
          <button
            onClick={() => setShow(!show)}
            className='btn edit-btn'
          >
            E
          </button>
          <button
            onClick={() => setShowEdit(!showEdit)}
            className='btn duplicate-btn'
          >
            D
          </button>
          <button
            onClick={() => removeGift!(gift.id)}
            className='btn remove-btn'
          >
            X
          </button>
        </div>
      </li>

      <Modal show={show} onClose={() => setShow(false)} idGift={gift.id} />
      <Modal show={showEdit} onClose={() => setShowEdit(false)} idGift={gift.id} edit />
    </>
  )
}

export default GiftFC;