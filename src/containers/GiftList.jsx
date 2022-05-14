import React from 'react';
import Gift from '../components/Gift';

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