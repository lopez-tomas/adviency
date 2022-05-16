import React from 'react';

const Gift = ({ gift }) => {
  return (
    <li className="Gift">
      {gift.gift}
    </li>
  )
}

export default Gift;