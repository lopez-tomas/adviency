import React from 'react';
import '../styles/Gift.sass';

const Gift = ({ gift }) => {
  return (
    <li className="Gift">
      {gift.gift}
    </li>
  )
}

export default Gift;