import React, { useRef, useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const Form = () => {
  const {state, addGift} = useContext(AppContext);
  const form = useRef(null);
  const [gift, setGift] = useState("");
  const [giftInList, setGiftInList] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    let newGift = formData.get("gift");
    formData.set("gift", "");

    setGiftInList(state.gifts.some(gift => gift.gift === newGift));
    setGift(newGift);

    if (!!newGift && !state.gifts.some(gift => gift.gift === newGift)) {
      addGift({
        id: state.lastId,
        gift: newGift
      });

      form.current.reset();
    }
  }

  return (
    <form className="Form" ref={form}>
      <input
        autoFocus
        className="input add-input"
        type="text"
        name="gift"
        placeholder="Your gift"
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