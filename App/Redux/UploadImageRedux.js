import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    uploadImageRequest: ['payload'],
    uploadImageSuccess: ['data'],
    resetImageRequest: ['data']
});

export const UploadImageTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
    fetching: false,
    pathImage: null,
});

export const uploadImageRequest = (state, action) => 
    state.merge({ fetching: true })

export const uploadImageSuccess = (state, action) => {
    console.log('action.data',action.data);
    return state.merge({ fetching: false, pathImage: action.data })
}

export const resetImageRequest = (state) => {
    return state.merge({ fetching: false, pathImage: null })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPLOAD_IMAGE_REQUEST]: uploadImageRequest,
    [Types.UPLOAD_IMAGE_SUCCESS]: uploadImageSuccess,
    [Types.RESET_IMAGE_REQUEST]: resetImageRequest
});
