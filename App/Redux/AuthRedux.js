import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['payload', 'callback'],
  loginSuccess: ['data'],
  loginFailure: null,
  logoutRequest: ['callback'],
  logoutSuccess: null,
  registerRequest: ['payload', 'callback'],
  sendVerifyCodeRequest: ['payload', 'callback'],
  verifyCodeAndLoginRequest: ['payload', 'callback'],
  verifyCodeAndLoginSuccess: ['data'],
  verifyCodeRequest: ['payload', 'callback'],
  forgotPasswordRequest: ['payload', 'callback'],
  editProfileRequest: ['payload', 'callback'],
  editProfileSuccess: ['data'],
  getProfileRequest: ['callback'],
  updateToken: ['token'],
  getJobrCategoriesRequest: ['callback'],
  getJobrSubCategoriesRequest: ['payload', 'callback'],
  getJobrCategoriesSuccess: ['data'],
  postJobrCategoriesRequest: ['payload', 'callback'],
  changeProfilePhotoRequest: ['payload', 'callback'],
  changeProfilePhotoSuccess: ['data'],
  socialLoginRequest: ['payload', 'callback'],
  socialLoginSuccess: ['data'],
  socialLoginFailure: null,
  checkUserExistRequest: ['payload', 'callback'],
  getPlansRequest: ['callback'],
  getCurrentPlanRequest: ['callback'],
  getCurrentPlanSuccess: ['data'],
  subscribePlanRequest: ['payload', 'callback'],
  deleteAccountRequest: ['callback'],
  deleteAccountSuccess: null,
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  token: null,
  jobrCategories: [],
  plan: null,
  fetching: false,
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  user: state => state.auth.user,
}

/* ------------- Reducers ------------- */

// request the avatar for a user
// export const request = (state, {username}) =>
//   state.merge({fetching: true, username, avatar: null})

// successful avatar lookup
export const loginSuccess = (state, action) => {
  const { data } = action
  return state.merge({ user: data?.user, token: data?.token })
}

export const socialLoginSuccess = (state, action) => {
  const { data } = action
  return state.merge({ user: data?.user, token: data?.token })
}

export const socialLoginFailure = (state, action) => {
  return state.merge({ fetching: false, error: true, user: null, token: null })
}

export const editProfileSuccess = (state, action) => {
  const { data } = action
  return state.merge({ user: data })
}

export const getJobrCategoriesSuccess = (state, action) => {
  const { data } = action
  return state.merge({ jobrCategories: data })
}

export const changeProfilePhotoSuccess = (state, action) => {
  const { data } = action
  return state.merge({
    user: {
      ...state.user,
      image: data?.uploadPath,
    },
  })
}

export const getCurrentPlanSuccess = (state, action) => {
  const { data } = action
  return state.merge({ plan: data })
}

export const logout = state => {
  return state.merge({ user: null, token: null, fetching: false })
}

// failed to get the avatar
export const failure = state => state.merge({ fetching: false, error: true, avatar: null })

export const deleteAccountRequest = (state) =>
  state.merge({ fetching: true, user: null, token: null })

export const deleteAccountSuccess = (state) =>
  state.merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT_SUCCESS]: logout,
  [Types.VERIFY_CODE_AND_LOGIN_SUCCESS]: loginSuccess,
  [Types.EDIT_PROFILE_SUCCESS]: editProfileSuccess,
  [Types.GET_JOBR_CATEGORIES_SUCCESS]: getJobrCategoriesSuccess,
  [Types.CHANGE_PROFILE_PHOTO_SUCCESS]: changeProfilePhotoSuccess,
  [Types.SOCIAL_LOGIN_SUCCESS]: socialLoginSuccess,
  [Types.SOCIAL_LOGIN_FAILURE]: socialLoginFailure,
  [Types.GET_CURRENT_PLAN_SUCCESS]: getCurrentPlanSuccess,
  [Types.DELETE_ACCOUNT_REQUEST]: deleteAccountRequest,
  [Types.DELETE_ACCOUNT_SUCCESS]: deleteAccountSuccess,
})
