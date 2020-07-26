import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getCardRequest: ['payload'],
  getCardSuccess: ['data'],
  addCardRequest: ['payload', 'callback'],
  addCardSuccess: ['data'],
  deleteCardRequest: ['payload', 'callback'],
  deleteCardSuccess: ['data'],
  setDefaultCardRequest : ['payload', 'callback'],
  setDefaultCardSuccess : ['data']
});

export const CardTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  cards: [],
  defaultCard : null
});

export const CardSelectors = {
  cards: state => state.card.cards,
}

// Get cards
export const getCardRequest = (state, action) =>
  state.merge({ fetching: true });

export const getCardSuccess = (state, action) =>{
  return state.merge({ fetching: false, cards: action.data });
}

// Add card
export const addCardRequest = (state, action) =>
  state.merge({ fetching: true });

export const addCardSuccess = (state, action) => {
  return state.merge({ fetching: false, cards: [
    ...state.cards,
    action.data
  ] });
}

// Delete card
export const deleteCardRequest = (state, action) =>
state.merge({ fetching: true });

export const deleteCardSuccess = (state, action) => {
  const { data } = action;
  const results = _.filter([...state.cards], item => item.id !== data.id);
  return state.merge({ fetching: false, cards: results });
}

export const setDefaultCardSuccess = (state, action) =>{
  const { data } = action
  return state.merge({fetching : false, defaultCard : data})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CARD_REQUEST]: getCardRequest,
  [Types.GET_CARD_SUCCESS]: getCardSuccess,
  [Types.ADD_CARD_REQUEST]: addCardRequest,
  [Types.ADD_CARD_SUCCESS]: addCardSuccess,
  [Types.DELETE_CARD_REQUEST]: deleteCardRequest,
  [Types.DELETE_CARD_SUCCESS]: deleteCardSuccess,
});
