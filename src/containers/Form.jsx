import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const surpriseGifts = [
  'Manga',
  'Mouse',
  'Keyboard',
  'Socks',
  'Book'
]

const Form = ({ onClose, idGift }) => {
  const { state, addGift, editGift } = useContext(AppContext);
  const form = useRef(null);
  const [gift, setGift] = useState("");

  let currGift = idGift ? state.gifts.find(gift => gift.id === idGift) : {};

  const handleSurprise = () => {
    const surpriseGift = surpriseGifts[Math.floor(Math.random() * surpriseGifts.length)];
    setGift(surpriseGift)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const newGift = formData.get("gift");
    const price = formData.get("price");
    const to = formData.get("to");
    const image = formData.get("image");
    const quantity = formData.get("quantity");

    setGift(newGift);
    const validation = !!newGift && !!price && !!to && quantity;

    if (validation) {
      let giftObj = {
        gift: newGift,
        price: price,
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
            className={`input gift-input ${!idGift ? "edit" : ""}`}
            type="text"
            name="gift"
            placeholder="Your gift"
            defaultValue={gift ? gift : currGift.gift}
            required
          />
          {!idGift &&
            <button onClick={handleSurprise} className="btn surprise-btn">Surprise me!</button>
          }
        </div>
        <input
          className="input price-input"
          type="number"
          name="price"
          defaultValue={currGift.price}
          min="1"
          step=".01"
          required
        />
        <input
          className="input to-input"
          type="text"
          name="to"
          placeholder="Lucky one"
          defaultValue={currGift.to}
          required
        />
        <input
          className="input to-input"
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
          className={`btn add-btn ${idGift ? "edit-btn" : ""}`}
          type="submit"
          value={idGift ? "Edit gift" : "Create gift"}
        />
      </div>
    </form>
  )
}

export default Form;