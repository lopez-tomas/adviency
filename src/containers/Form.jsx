import React, { useRef, useContext } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const Form = () => {
  const { state, addGift } = useContext(AppContext);
  const form = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    let gift = formData.get('gift');
    formData.set('gift', "");

    if (gift !== "") {
      const data = {
        id: state.lastId,
        gift: gift,
      }
      addGift(data);
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
    </form>
  )
}

export default Form;