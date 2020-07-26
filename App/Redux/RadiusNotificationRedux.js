import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    radiusNotificationRequest: ['data']
});

export const RadiusNotificationTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
    fetching: false,
    radiusNotification: null,
})

export const radiusNotificationRequest = (state, action) => {
    return state.merge({ fetching: false, radiusNotification: action.data })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.RADIUS_NOTIFICATION_REQUEST]: radiusNotificationRequest
});
