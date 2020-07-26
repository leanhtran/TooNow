import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createReviewRequest: ['payload', 'callback'],
  createReviewSuccess: ['data'],
});

export const ReviewTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  reviews: [],
});

// Create review

export const createReviewSuccess = (state, action) =>
  state.merge({ fetching: false, reviews: action.data });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_REVIEW_SUCCESS]: createReviewSuccess,
});