import { InitialState, Gift} from '../gifts/gift.model';
import { AddGiftDto, EditGiftDto } from '../gifts/gift.dto';

import { useState, useEffect } from 'react';


const initialState: InitialState = {
  gifts: JSON.parse(localStorage.getItem('gifts')!) || [],
  lastId: JSON.parse(localStorage.getItem('lastId')!) || 1
}

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('gifts', JSON.stringify(state.gifts));
    localStorage.setItem('lastId', JSON.stringify(state.lastId));
  }, [state.gifts, state.lastId]);


  const addGift = (payload: AddGiftDto): string => {
    const gift = {
      ...payload,
      id: state.lastId
    }

    setState({
      ...state,
      gifts: [...state.gifts, gift],
      lastId: state.lastId + 1
    })

    return `TODO: '${gift.gift}' (#${gift.id}) created successfully`;
  }


  // editGift overloading
  function editGift(id: Gift['id'], payload: EditGiftDto): string;
  function editGift(id: Gift['id'], payload: EditGiftDto): Gift;

  function editGift(id: Gift['id'], payload: EditGiftDto): unknown {
    const index = state.gifts.findIndex(gift => gift.id === id);

    if (index !== -1) {
      const prevDataGift = state.gifts[index];
      const updatedGift = {...prevDataGift, ...payload};
      state.gifts.splice(index, 1, updatedGift)

      setState({
        ...state,
        gifts: [...state.gifts]
      })

      return updatedGift;
    }

    return `Gift with ID: ${id} not found.`;
  }


  // removeGift overloading
  function removeGift(id: Gift['id']): string;
  function removeGift(id: Gift['id']): Gift;

  function removeGift(id: Gift['id']): unknown {
    const index = state.gifts.findIndex(gift => gift.id === id);

    if (index === -1) return `$Gift with ID: ${id} not found.`;

    state.gifts.splice(index, 1)
    const gift = index !== -1 ? state.gifts[index] : undefined;

    setState({
      ...state,
      gifts: [...state.gifts]
    })

    return gift;
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