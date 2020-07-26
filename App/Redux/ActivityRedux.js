import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getActivitiesOnlineRequest: ['payload'],
  getActivitiesOnlineSuccess: ['data'],
  getActivitiesOfflineRequest: ['payload'],
  getActivitiesOfflineSuccess: ['data'],
});

export const ActivityTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  onlineActivities: [],
  offlineActivities: [],
});

// Get activities online
export const getActivitiesOnlineRequest = (state, action) =>
  state.merge({ fetching: true });

export const getActivitiesOnlineSuccess = (state, action) =>
  state.merge({ fetching: false, onlineActivities: action.data });

// Get activities offline
export const getActivitiesOfflineRequest = (state, action) =>
  state.merge({ fetching: true });

export const getActivitiesOfflineSuccess = (state, action) =>
  state.merge({ fetching: false, offlineActivities: action.data });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ACTIVITIES_ONLINE_REQUEST]: getActivitiesOnlineRequest,
  [Types.GET_ACTIVITIES_ONLINE_SUCCESS]: getActivitiesOnlineSuccess,

  [Types.GET_ACTIVITIES_OFFLINE_REQUEST]: getActivitiesOfflineRequest,
  [Types.GET_ACTIVITIES_OFFLINE_SUCCESS]: getActivitiesOfflineSuccess,
});