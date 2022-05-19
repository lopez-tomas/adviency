import { useState } from 'react'

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
  }

  const removeGift = (id) => {
    setState({
      ...state,
      gifts: state.gifts.filter(gift => gift.id !== id)
    });
  }

  const removeAll = () => {
    setState(initialState);
  }

  return {
    state,
    addGift,
    removeGift,
    removeAll
  }
}

export default useInitialState;