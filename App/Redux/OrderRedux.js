import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getOrderRequest: ['callback'],
  getOrderSuccess: ['data'],
  acceptOrderRequest: ['payload', 'callback'],
  acceptOrderSuccess: ['data'],
  orderTrackingRequest: ['payload', 'callback'],
  changeMoneyRequest: ['payload', 'callback'],
  submitResultRequest: ['payload', 'callback'],
  submitQrCodeRequest: ['payload', 'callback'],
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  orders: null,
  order: null,
})

/* ------------- Selectors ------------- */

export const OrderSelectors = {
  orders: state => state.orders.orders,
  order: state => state.orders.order,
}

/* ------------- Reducers ------------- */

export const getOrderSuccess = (state, action) => {
  const { data } = action
  return state.merge({ orders: data })
}

export const acceptOrderSuccess = (state, action) => {
  const { data } = action
  return state.merge({ order: data?.order })
}

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.LOGIN_REQUEST]: request,
  [Types.GET_ORDER_SUCCESS]: getOrderSuccess,
  [Types.ACCEPT_ORDER_SUCCESS]: acceptOrderSuccess,
})
