import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getHistoryMissionsRequest: ['payload'],
    getHistoryMissionsSuccess: ['data'],
});

export const HistoryMissionsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
    fetching: false,
    historyMissions: null,
});

// Get history missions
export const getHistoryMissionsRequest = (state, action) => 
    state.merge({ fetching: true })

export const getHistoryMissionsSuccess = (state, action) => {
    return state.merge({ fetching: false, historyMissions: action.data })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_HISTORY_MISSIONS_REQUEST]: getHistoryMissionsRequest,
    [Types.GET_HISTORY_MISSIONS_SUCCESS]: getHistoryMissionsSuccess,
});
