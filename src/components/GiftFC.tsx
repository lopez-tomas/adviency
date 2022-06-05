import { Gift } from '../gifts/gift.model';

import { useContext, useState } from 'react';
import { ContextProps } from '../types';
import AppContext from '../context/AppContext';
import Modal from '../containers/Modal';
import Form from '../containers/Form';
import '../styles/Gift.sass';

const noImage = "https://raw.githubusercontent.com/lopez-tomas/adviency/day10/src/images/no-image.jpg";

interface Props {
  gift: Gift;
  preview?: boolean;
}

const calculateTotalPrice = (price: Gift['price'], quantity: Gift['quantity']): string => {
  return (price * quantity).toFixed(2);
}

const GiftFC: React.FC<Props> = ({ gift, preview }) => {
  const { deleteGift } = useContext<ContextProps>(AppContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showDuplicate, setShowDuplicate] = useState(false);

  return (
    <>
      <li className='Gift'>
        <img className='gift-img' src={gift.image ? gift.image : noImage } alt={gift.gift} />
        <p className='gift-name'>
          {gift.gift}
          <span className='gift-quantity'> ({gift.quantity})</span><br />
          <span className='gift-price'> $ {calculateTotalPrice(gift.price, gift.quantity)}</span><br />
          <span className='gift-to'> {gift.to}</span>
        </p>

        {!preview &&
          <div>
            <button
              onClick={() => setShowEdit(!showEdit)}
              className='btn edit-btn'
            >
              E
            </button>
            <button
              onClick={() => setShowDuplicate(!showDuplicate)}
              className='btn duplicate-btn'
            >
              D
            </button>
            <button
              onClick={() => deleteGift!(gift.id)}
              className='btn remove-btn'
            >
              X
            </button>
          </div>
      }
      </li>

      <Modal show={showEdit} onClose={() => setShowEdit(false)}>
        <Form onClose={() => setShowEdit(false)} idGift={gift.id} />
      </Modal>

      <Modal show={showDuplicate} onClose={() => setShowDuplicate(false)}>
        <Form onClose={() => setShowDuplicate(false)} idGift={gift.id} duplicate />
      </Modal>
    </>
  )
}

export default GiftFC;