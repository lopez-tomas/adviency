import { useState } from 'react';

const initialState = {
  gifts: [],
  lastId: 1
}

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const createToDo = (payload) => {
    setState({
      ...state,
      gifts: [...state.gifts, payload],
      lastId: state.lastId + 1
    });
  };

  return (
    state,
    createToDo
  )
};

export default useInitialState;