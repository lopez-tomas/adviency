import { InitialState } from '../types';
import { Gift } from '../gifts/gift.model';
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
  }, [state.gifts, state.lastId])


  const addGift = (payload: AddGiftDto): string => {
    try {
      const newGift: Gift = {
        id: state.lastId,
        gift: payload.gift,
        price: payload.price,
        to: payload.to,
        image: payload.image,
        quantity: payload.quantity
      }

      setState({
        ...state,
        gifts: [...state.gifts, newGift],
        lastId: state.lastId + 1
      })

      return `Gift ${newGift.gift} added successfully!`;
    } catch (err) {
      return `Error (add): ${err}`;
    }
  }


  const getGift = (id: Gift['id']): number | undefined => {
    const index = state.gifts.findIndex(gift => gift.id === id);

    return index >= 0 ? index : undefined;
  }


  const editGift = (id: Gift['id'], payload: EditGiftDto): string => {
    const index = getGift(id);

    if (index === undefined) return `Edit: Gift with ID #${id} not found!`;

    const prevData = state.gifts[index];
    const newData = {...prevData, ...payload};
    state.gifts.splice(index, 1, newData);

    setState({
      ...state,
      gifts: [...state.gifts]
    })

    return `Edit: Gift with ID #${id} edited successfully!`;
  }


  const deleteGift = (id: Gift['id']): string => {
    const index = getGift(id);

    if (index === undefined) return `Delete: Gift with ID #${id} not found!`;

    state.gifts.splice(index, 1);

    setState({
      ...state,
      gifts: [...state.gifts]
    })

    return `Delete: Gift with ID #${id} deleted successfully!`;
  }


  const deleteAll = () => {
    setState({
      gifts: [],
      lastId: 1
    })
  }

  return {
    state,
    addGift,
    editGift,
    deleteGift,
    deleteAll
  }
}

export default useInitialState;