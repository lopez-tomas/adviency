import { ContextProps, FormProps } from '../types';
import { AddGiftDto, EditGiftDto } from '../gifts/gift.dto';

import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';

const surpriseGifts = [
  'Gunnm: Battle Angel Alita #1',
  'Xbox One Joystick',
  'Mouse Logitech G Pro',
  'Obi-wan Kenobi figure',
  'Standard socks'
]

const Form: React.FC<FormProps> = ({ onClose, idGift, duplicate }) => {
  const { state, addGift, editGift } = useContext<ContextProps>(AppContext);
  const form: (React.MutableRefObject<any> | null) = useRef(null);
  const [gift, setGift] = useState('');

  const currGift = idGift ? state?.gifts.find(gift => gift.id === idGift) : null;

  const handleSurprise = (): void => {
    const surprise = surpriseGifts[Math.floor(Math.random() * surpriseGifts.length)];
    setGift(surprise);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const newGift = formData.get('gift') as string;
    const price = parseFloat(formData.get('price') as string);
    const to = formData.get('to') as string;
    const image = formData.get('image') as string;
    const quantity = parseInt(formData.get('quantity') as string);

    setGift(newGift);
    const validation = !!newGift && !!price && !!to && !!quantity;

    const giftObj = {
      gift: newGift,
      price: price,
      to: to,
      image: image,
      quantity: quantity
    }

    if (validation) {
      if (idGift && !duplicate) {
        editGift!(idGift!, giftObj as EditGiftDto);
      } else {
        addGift!(giftObj as AddGiftDto);
      }

      form.current.reset();
      onClose();
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit} ref={form}>
      <div className='inputs'>
        <div>
          <input
            autoFocus
            className={`input gift-input ${!idGift ? 'edit' : ''}`}
            type='text'
            name='gift'
            placeholder='Your gift'
            defaultValue={idGift ? currGift?.gift : gift}
            required
          />
          {!idGift &&
            <button
              onClick={handleSurprise}
              className='btn surprise-btn'
            >
              Surprise me!
            </button>
          }
        </div>
        <input
          className='input price-input'
          type='number'
          name='price'
          placeholder='Gift price'
          defaultValue={idGift ? currGift?.price : ''}
          min='1'
          step='.01'
          required
        />
        <input
          className='input to-input'
          type='text'
          name='to'
          placeholder='Lucky one'
          defaultValue={idGift ? currGift?.to : ''}
          required
        />
        <input
          className='input image-input'
          type='text'
          name='image'
          placeholder='Gift image URL'
          defaultValue={idGift ? currGift?.image : ''}
        />
        <input
          className='input quantity-input'
          type='number'
          name='quantity'
          defaultValue={idGift ? currGift?.quantity : '1'}
          required
        />
      </div>
      <div className='buttons'>
        <button onClick={onClose} className='btn close-btn'>Close</button>
        <input
          className={`btn add-btn ${idGift ? 'edit-btn' : ''}`}
          type='submit'
          value={idGift && !duplicate ? 'Edit gift' : 'Create gift'}
        />
      </div>
    </form>
  )
}

export default Form;