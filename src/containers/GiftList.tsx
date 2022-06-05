import { ContextProps } from '../types';
import { Gift } from '../gifts/gift.model';

import { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import GiftFC from '../components/GiftFC';
import Modal from './Modal';

import xmas from '../images/undraw-xmas-surprise.svg';
import '../styles/GiftList.sass';

interface Props {
  onClose?: () => void;
  preview?: boolean
  total?: string;
}

const totalPriceReducer = (prev: number, curr: Gift): number => {
  return prev + (curr.price * curr.quantity);
}

const GiftList: React.FC<Props> = ({ onClose, preview, total }) => {
  const { state, deleteAll } = useContext<ContextProps>(AppContext);
  const [areThereGifts, setAreThereGifts] = useState(false);
  const [show, setShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    state?.gifts.length !== 0 ? setAreThereGifts(true) : setAreThereGifts(false);
    setTotalPrice((state?.gifts.reduce(totalPriceReducer, 0)!).toFixed(2));
  }, [state?.gifts])

  return (
    areThereGifts
      ?
        <div className={`GiftList ${!preview ? 'preview' : ''}`}>
          <ul className={`List ${!preview ? 'preview' : ''}`}>
            {state?.gifts.map(gift => (
              <GiftFC key={gift.id} gift={gift} preview={preview ? true : false} />
            ))}
          </ul>

          <div className={`total-container ${preview ? 'preview' : ''}`}>
              <p>Total: $ {totalPrice}</p>
          </div>

          <div className={`noGifts-container ${preview ? 'preview' : ''}`}>
            {!preview
              ?
                <>
                  <button onClick={deleteAll} className='noGifts-btn'>Remove ALL</button>
                  <button onClick={() => setShow(!show)} className='noGifts-preview'>Preview</button>
                </>
              :
                <>
                  <h2>Total: $ {total}</h2>
                  <button onClick={onClose} className='noGifts-close'>Close</button>
                </>
            }
          </div>

          <Modal show={show} onClose={() => setShow(false)}>
            <>
              <h1>Buy:</h1>
              <GiftList onClose={() => setShow(false)} preview total={totalPrice} />
            </>
          </Modal>
        </div>
      :
        <div className='GiftList'>
          <div className='noGifts-container'>
            <img className='noGifts-img' src={xmas} alt='No gifts added' />
            <p className='noGifts-msg'>No gifts added :(</p>
          </div>
        </div>
  )
}

export default GiftList;