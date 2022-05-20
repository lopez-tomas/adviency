import React, { useRef, useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const Form = () => {
  const {state, addGift} = useContext(AppContext);
  const form = useRef(null);
  const [giftInList, setGiftInList] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    let newGift = formData.get("gift");
    formData.set("gift", "");

    setGiftInList(state.gifts.find(gift => gift.gift === newGift));

    if (newGift !== "" && !giftInList) {
      const data = {
        id: state.lastId,
        gift: newGift
      }

      addGift(data);
      form.current.reset();
      setGiftInList(true);
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
      {giftInList ? <p>Gift already in list!</p> : null}
      <input
        onClick={handleAdd}
        className="btn add-btn"
        type="submit"
        value="Add gift"
      />
    </form>
  )
}

export default Form;