import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Gift from '../components/Gift';
import '../styles/GiftList.sass';
import xmas from '../images/undraw-xmas-surprise.svg';

const GiftList = () => {
  const { state } = useContext(AppContext)

  return (
    <ul className="GiftList">
      {state.gifts.length > 0
        ?
          state.gifts.map(gift => (
            <Gift key={gift.id} gift={gift} />
          ))
        :
        (
          <img className="no-gifts" src={xmas} alt="Gift" />
        )
      }
    </ul>
  )
}

export default GiftList;