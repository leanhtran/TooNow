import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginFBRequest: ["payload", "callback"],
  getChatRequest: ["payload", "callback"],
  getChatSuccess: ['data']

});

export const FirebaseTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  
});

/* ------------- Selectors ------------- */

export const OrderSelectors = {
  chat: state => state.firebase.chat,
};

/* ------------- Reducers ------------- */

export const getChatSuccess = (state, action) => {
  const { data } = action;
  return state.merge({ chat: data?.chat });
};

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.LOGIN_REQUEST]: request,
  [Types.GET_CHAT_SUCCESS]: getChatSuccess,
});
