import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  searchPlaceRequest: ['payload', 'callback'],
  searchPlaceSuccess: ['data'],
  autocompletePlaceRequest: ['payload', 'callback'],
  autocompletePlaceSuccess: ['data'],
  getCoordinateInfoRequest: ['payload', 'callback'],
  getCoordinateInfoSuccess: ['data'],
})

export const GoogleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  token: null,
})

/* ------------- Selectors ------------- */

export const GoogleSelectors = {
  user: state => state.google.user
}

/* ------------- Reducers ------------- */

// request the avatar for a user
// export const request = (state, {username}) =>
//   state.merge({fetching: true, username, avatar: null})

export const searchPlaceSuccess = (state, action) => {
  // const {data} = action
  // return state.merge({user: data?.user, token: data?.token})
}

export const autocompletePlaceSuccess = (state, action) => {
  // const {data} = action
  // return state.merge({user: data?.user, token: data?.token})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.LOGIN_REQUEST]: request,
  [Types.SEARCH_PLACE_SUCCESS]: searchPlaceSuccess,
  [Types.AUTOCOMPLETE_PLACE_SUCCESS]: autocompletePlaceSuccess,
})
