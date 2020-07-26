import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getNotificationRequest: ['payload', 'callback'],
  getNotificationSuccess: ['data'],
});

export const NotificationTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  notifications: null,
});

// Get notifications
export const getNotificationRequest = (state, action) =>
  state.merge({ fetching: true });

export const getNotificationSuccess = (state, action) =>
  state.merge({ fetching: false, notifications: action.data });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NOTIFICATION_REQUEST]: getNotificationRequest,
  [Types.GET_NOTIFICATION_SUCCESS]: getNotificationSuccess,
});