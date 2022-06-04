import { ContextProps, FormProps } from '../types';
import { AddGiftDto, EditGiftDto } from '../gifts/gift.dto';
import React, { useContext, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Form.sass';


const surpriseGifts = [
  'Manga',
  'Mouse',
  'Socks',
  'Keyboard',
  'Nintendo Switch'
]

const Form: React.FC<FormProps> = ({ onClose, idGift }) => {
  const { state, addGift, editGift }: ContextProps = useContext(AppContext);
  const form: (React.MutableRefObject<any> | null) = useRef(null);
  const [gift, setGift] = useState<string>('');

  const currGift = idGift ? state?.gifts.find(gift => gift.id === idGift) : null;

  const handleSurprise = (): void => {
    const surprise = surpriseGifts[Math.floor(Math.random() * surpriseGifts.length)];
    setGift(surprise);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const newGift = (formData.get('gift') as string);
    const price = (formData.get('price') as string);
    const to = (formData.get('to') as string);
    const image = (formData.get('image') as string);
    const quantity = (formData.get('quantity') as string);

    setGift(newGift);
    const validation = !!newGift && !!price && !!to && quantity;

    if (validation) {
      if (!idGift) {
        let giftObj: AddGiftDto = {
          gift: newGift,
          price: price,
          to: to,
          image: image,
          quantity: quantity
        }

        addGift!(giftObj);
      } else {
        let giftObj: EditGiftDto = {
          gift: newGift,
          price: price,
          to: to,
          image: image,
          quantity: quantity
        }

        editGift!(idGift, giftObj);
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
            className={`input gift-input ${idGift && 'edit'}`}
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
          defaultValue={idGift && currGift?.price}
          min='1'
          step='.01'
          required
        />
        <input
          className='input to-input'
          type='text'
          name='to'
          placeholder='Lucky one'
          defaultValue={idGift && currGift?.to}
          required
        />
        <input
          className='input image-input'
          type='text'
          name='to'
          placeholder='Gift image URL'
          defaultValue={idGift && currGift?.image}
        />
        <input
          className='input quantity-input'
          type='number'
          name='quantity'
          defaultValue={idGift ? currGift?.quantity : '1'}
          min='1'
          required
        />
      </div>

      <div className='buttons'>
        <button
          onClick={onClose}
          className='btn close-btn'
        >
          Close
        </button>
        <input
          className={`btn add-btn ${idGift && 'edit-btn'}`}
          type='submit'
          value={idGift ? 'Edit gift' : 'Create gift'}
        />
      </div>
    </form>
  )
}

export default Form;