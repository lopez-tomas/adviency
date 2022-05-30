import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const Form = ({ onClose }) => {
  const { state, addGift } = useContext(AppContext);
  const form = useRef(null);
  const [gift, setGift] = useState('');
  const [isGiftInList, setIsGiftInList] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const newGift = formData.get("gift");
    const quantity = formData.get("quantity");
    const image = formData.get("image");
    const to = formData.get("to");

    setGift(newGift);
    setIsGiftInList(state.gifts.some(gift => gift.gift === newGift));

    if (!!newGift && quantity && !!to && !state.gifts.some(gift => gift.gift === newGift)) {
      addGift({
        id: state.lastId,
        gift: newGift,
        to: to,
        image: image,
        quantity: quantity
      });

      setGift("");
      form.current.reset();
      onClose();
    }
  }

  return (
    <form className="Form" ref={form}>
      <div className="inputs">
        <input
          autoFocus
          className="input gift-input"
          type="text"
          name="gift"
          placeholder="Your gift"
          required
        />
        <input
          className="input to-input"
          type="text"
          name="to"
          placeholder="Destinatary"
          required
        />
        <input
          className="input image-input"
          type="text"
          name="image"
          placeholder="Gift image URL"
        />
        <input
          className="input quantity-input"
          type="number"
          name="quantity"
          defaultValue="1"
          min="1"
          required
        />
      </div>
      <div className="buttons">
        <button
          onClick={onClose}
          className="btn close-btn"
        >
          Close
        </button>
        <input
          onClick={handleAdd}
          className="btn add-btn"
          type="submit"
          value="Add gift"
        />
      </div>
      {isGiftInList && <p className="errorMsg">"{gift}" already added!</p>}
    </form>
  )
}

export default Form;