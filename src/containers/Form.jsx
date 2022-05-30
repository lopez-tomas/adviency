import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const Form = ({ onClose, idGift }) => {
  const { state, addGift, editGift } = useContext(AppContext);
  const form = useRef(null);
  const [gift, setGift] = useState("");
  const [isGiftInList, setIsGiftInList] = useState(false);

  let giftName;
  let giftTo;
  let giftImage;
  let giftQuantity;

  if (idGift) {
    const currGift = state.gifts.find(gift => gift.id === idGift);
    giftName = currGift.gift;
    giftTo = currGift.to;
    giftImage = currGift.image;
    giftQuantity = currGift.quantity;
  }

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
      if (!idGift) {
        addGift({
          id: state.lastId,
          gift: newGift,
          to: to,
          image: image,
          quantity: quantity
        })
      } else {
        editGift(
          idGift,
          {
            gift: newGift,
            to: to,
            image: image,
            quantity: quantity
          }
        )
      }
    }
    form.current.reset();
    onClose();
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
          defaultValue={giftName}
          required
        />
        <input
          className="input to-input"
          type="text"
          name="to"
          placeholder="Lucky one"
          defaultValue={giftTo}
          required
        />
        <input
          className="input image-input"
          type="text"
          name="image"
          placeholder="Gift image URL"
          defaultValue={giftImage}
        />
        <input
          className="input quantity-input"
          type="number"
          name="quantity"
          defaultValue={giftQuantity ? giftQuantity : "1"}
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
        {idGift
          ?
            <input
              onClick={handleSubmit}
              className="btn add-btn"
              type="submit"
              value="Edit gift"
            />
          :
            <input
              onClick={handleSubmit}
              className="btn add-btn"
              type="submit"
              value="Add gift"
            />
        }
      </div>
      {isGiftInList && <p className="errorMsg">"{gift}" already added!</p>}
    </form>
  )
}

export default Form;