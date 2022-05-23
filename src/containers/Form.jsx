import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const Form = () => {
  const { state, addGift } = useContext(AppContext);
  const form = useRef(null);
  const [gift, setGift] = useState("");
  const [giftInList, setGiftInList] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    let newGift = formData.get("gift");
    let quantity = formData.get("quantity");

    setGift(newGift);
    setGiftInList(state.gifts.some(gift => gift.gift === newGift));

    if (!!newGift && quantity && !state.gifts.some(gift => gift.gift === newGift)) {
      addGift({
        id: state.lastId,
        gift: newGift,
        quantity: quantity
      })

      form.current.reset();
    }
  }

  return (
    <form className="Form" ref={form}>
      <input
        autoFocus
        className="input gift-input"
        type="text"
        name="gift"
        placeholder="Your gift"
        required
      />
      <input
        className="input quantity-input"
        type="number"
        name="quantity"
        defaultValue="1"
        min="1"
        required
      />
      <input
        onClick={handleAdd}
        className="btn add-btn"
        type="submit"
        value="Add gift"
      />
      {giftInList && <p>"{gift}" already added!</p>}
    </form>
  )
}

export default Form;