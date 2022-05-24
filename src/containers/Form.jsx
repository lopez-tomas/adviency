import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const Form = ({ onClose }) => {
  const { state, addGift } = useContext(AppContext);
  const form = useRef(null);
  const [gift, setGift] = useState("");
  const [isGiftInList, setIsGiftInList] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const newGift = formData.get("gift");
    const image = formData.get("image");
    const quantity = formData.get("quantity");

    setGift(newGift);
    setIsGiftInList(state.gifts.some(gift => gift.gift === newGift));

    if (!!newGift && quantity && !state.gifts.some(gift => gift.gift === newGift)) {
      addGift({
        id: state.lastId,
        gift: newGift,
        image: image,
        quantity: quantity
      })

      form.current.reset();
      onClose();
    }
  }

  return (
    <form className="Form" ref={form}>
      <div className="inputs">
        <input
          className="input gift-input"
          type="text"
          name="gift"
          placeholder="Your gift"
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