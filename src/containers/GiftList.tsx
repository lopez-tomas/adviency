import { ContextProps } from '../types';
import { Gift } from '../gifts/gift.model';

import { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import GiftFC from '../components/GiftFC';
import '../styles/GiftList.sass';
import xmas from '../images/undraw-xmas-surprise.svg';

const totalPriceReducer = (prev: number, curr: Gift): number => {
  return prev + (curr.price * curr.quantity);
}

const GiftList: React.FC = () => {
  const { state, removeAll }: ContextProps = useContext(AppContext);
  const [areThereGifts, setAreThereGifts] = useState(false);

  useEffect(() => {
    state?.gifts.length !== 0 ? setAreThereGifts(true) : setAreThereGifts(false);
  }, [state?.gifts])
  return (
    areThereGifts
      ?
        <div className='GiftList'>
          <ul className='List'>
            {state?.gifts.map(gift => (
              <GiftFC key={gift.id} gift={gift} />
            ))}
          </ul>
          <div className='total-container'>
            <p>Total: $ {(state?.gifts.reduce(totalPriceReducer, 0)!).toFixed(2)}</p>
          </div>
          <div className='noGifts-container'>
            <button onClick={removeAll} className='noGifts-btn'>Remove ALL</button>
          </div>
        </div>
      :
        <div className='GiftList'>
          <div className='noGifts-container'>
            <img className='noGifts-img' src={xmas} alt="No gifts" />
            <p className='noGifts-msg'>No gifts added :(</p>
          </div>
        </div>
  )
}

export default GiftList;