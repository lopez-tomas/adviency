import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import Gift from '../components/Gift';
import xmas from '../images/undraw-xmas-surprise.svg';

const GiftList = () => {
  const {state, removeAll} = useContext(AppContext);
  const [areThereGifts, setAreThereGifts] = useState(false);

  useEffect(() => {
    if (state.gifts.length !== 0) {
      setAreThereGifts(true);
    } else {
      setAreThereGifts(false);
    }
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
            <img className="noGifts-img" src={xmas} alt="No gifts :(" />
            <h2 className="noGifts-msg">No gifts added :(</h2>
          </div>
        </div>
  )
}

export default GiftList;