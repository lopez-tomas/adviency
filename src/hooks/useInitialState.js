import { useState, useEffect } from 'react';

const initialState = {
  gifts: JSON.parse(localStorage.getItem("gifts")) || [],
  lastId: JSON.parse(localStorage.getItem("lastId")) || 1
}

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(state.gifts));
    localStorage.setItem("lastId", JSON.stringify(state.lastId));
  }, [state.gifts, state.lastId])

  const addGift = (payload) => {
    setState({
      ...state,
      gifts: [...state.gifts, payload],
      lastId: state.lastId + 1
    })
  }

  const editGift = (id, payload) => {
    setState({
      ...state,
      gifts: state.gifts.map(gift => {
        if (gift.id === id) {
          return {
            id: id,
            gift: payload.gift,
            to: payload.to,
            image: payload.image,
            quantity: payload.quantity
          };
        }
        return gift;
      })
    })
  }

  const removeGift = (id) => {
    setState({
      ...state,
      gifts: state.gifts.filter(gift => gift.id !== id)
    })
  }

  const removeAll = () => {
    setState({
      gifts: [],
      lastId: 1
    })
  }

  return {
    state,
    addGift,
    editGift,
    removeGift,
    removeAll
  }
}

export default useInitialState;