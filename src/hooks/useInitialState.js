import { useState } from 'react';

const initialState = {
  gifts: [],
  lastId: 1
}

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addGift = (payload) => {
    setState({
      ...state,
      gifts: [...state.gifts, payload],
      lastId: state.lastId + 1
    });
  };

  return {
    state,
    addGift,
  }
}

export default useInitialState;