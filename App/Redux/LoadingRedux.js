import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {path} from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  showLoading: null,
  hideLoading: null,
  showError: ['response']
})

export const LoadingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */

export const LoadingSelectors = {
  fetching: state => state.loading.fetching
}

/* ------------- Reducers ------------- */

export const showLoading = state => state.merge({fetching: true})

export const hideLoading = state => state.merge({fetching: false})

export const showError = (state, {response}) => {
  console.log('response',response)
  const message = getErrorMessage(response)
  alert(message)
  return state.merge({fetching: false})
}

const getErrorMessage = (response) => {
  const message = path(['data', 'message'], response)
  if (typeof message === 'string')
    return message || 'Fetching error ...'
  return message && Object.values(message).length > 0 && Object.values(message)[0] || 'Fetching error'
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_LOADING]: showLoading,
  [Types.HIDE_LOADING]: hideLoading,
  [Types.SHOW_ERROR]: showError,
})
