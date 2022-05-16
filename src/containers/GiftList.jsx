import React from 'react';
import Gift from '../components/Gift';
import '../styles/GiftList.sass';

const GiftList = ({ gifts }) => {
  return (
    <ul className="GiftList">
      {gifts.map((gift, index) => (
        <Gift key={index} gift={gift} />
      ))}
    </ul>
  )
}

export default GiftList;