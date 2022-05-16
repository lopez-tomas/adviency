import React, { useContext, useRef } from 'react';
import AppContext from '../context/AppContext';

const Form = () => {
  const { state, addGift } = useContext(AppContext);
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    let gift = formData.get('gift');
    formData.set('gift', "");

    const data = {
      id: state.lastId,
      gift: gift
    }
    if (gift !== "") {
      addGift(data);
      form.current.reset();
    }
  }

  return (
    <form action="/" className="Form" ref={form}>
      <input
        className="input gift-input"
        type="text"
        name="gift"
        placeholder="Your gift"
        required
      />
      <input
        onClick={handleSubmit}
        className="input gift-input"
        type="submit"
        value="Add gift"
      />
    </form>
  )
}

export default Form;