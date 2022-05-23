import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Gift from '../components/Gift';

const GiftList = () => {
  const { state, removeAll } = useContext(AppContext);
  const [areThereGifts, setAreThereGifts] = useState(false);

  useEffect(() => {
    state.gifts.length !== 0 ? setAreThereGifts(true) : setAreThereGifts(false)
  }, [state.gifts])

  return (
    areThereGifts
      ?
        <div className="GiftList">
          <ul className="List">
            {state.gifts.map(gift => (
              <Gift key={gift.id} gift={gift} />
            ))}
          </ul>
          <div className="noGifts-container">
            <button onClick={removeAll} className="noGifts-btn">Remove ALL</button>
          </div>
        </div>
      :
        <div className="GiftList">
          <div className="noGifts-container">
              <img className="noGifts-img" src="" alt="No gifts" />
              <p className="noGifts-msg">No gifts added :(</p>
          </div>
        </div>
  )
}

export default GiftList;