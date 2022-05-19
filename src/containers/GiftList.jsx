import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Gift from '../components/Gift';
import xmas from '../images/undraw-xmas-surprise.svg';
import '../styles/GiftList.sass';

const GiftList = () => {
  const {state, removeAll} = useContext(AppContext);
  const [areThereGifts, setAreThereGifts] = useState(false);

  useEffect(() => {
    if (state.gifts.length !== 0) {
      setAreThereGifts(true);
    } else {
      setAreThereGifts(false);
    }
  }, [state.gifts]);

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
            <button className="noGifts-btn" onClick={removeAll}>Delete ALL</button>
          </div>
        </div>
      :
        <div className="GiftList">
          <div className="noGifts-container">
            <img className="noGifts-img" src={xmas} alt="No gifts:(" />
            <h2>No gifts added :(</h2>
          </div>
        </div>
  )
}

export default GiftList;