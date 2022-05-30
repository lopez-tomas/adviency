import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const Form = ({ onClose, idGift }) => {
  const { state, addGift, editGift } = useContext(AppContext);
  const form = useRef(null);
  const [gift, setGift] = useState("");
  const [isGiftInList, setIsGiftInList] = useState(false);

  let currGift;
  currGift = idGift ? state.gifts.find(gift => gift.id === idGift) : {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const newGift = formData.get("gift");
    const to = formData.get("to");
    const image = formData.get("image");
    const quantity = formData.get("quantity");

    setGift(newGift);
    setIsGiftInList(state.gifts.some(gift => gift.gift === newGift));

    if (!!newGift && !!to && quantity && !state.gifts.some(gift => gift.gift === newGift)) {
      let giftObj = {
        gift: newGift,
        to: to,
        image: image,
        quantity: quantity
      }

      if (!idGift) {
        giftObj.id = state.lastId
        addGift(giftObj);
      } else {
        editGift(idGift, giftObj);
      }

      form.current.reset();
      onClose();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="Form" ref={form}>
      <div className="inputs">
        <div>
          <input
            autoFocus
            className="input gift-input"
            type="text"
            name="gift"
            placeholder="Your gift"
            defaultValue={currGift.gift}
            required
          />
          <button
            className="btn surprise-btn"
          >
            Surprise me!
          </button>
        </div>
        <input
          className="input to-input"
          type="text"
          name="to"
          placeholder="Lucky one"
          defaultValue={currGift.to}
          required
        />
        <input
          className="input image-input"
          type="text"
          name="image"
          placeholder="Gift image URL"
          defaultValue={currGift.image}
        />
        <input
          className="input quantity-input"
          type="number"
          name="quantity"
          defaultValue={currGift.quantity ? currGift.quantity : "1"}
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
          className="btn add-btn"
          type="submit"
          value={idGift ? "Edit gift" : "Add gift"}
        />
      </div>
      {isGiftInList && <p className="errorMsg">"{gift}" already added!</p>}
    </form>
  )
}

export default Form;