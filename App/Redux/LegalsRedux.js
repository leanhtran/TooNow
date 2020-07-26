import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getLegalsRequest: ['payload'],
  getLegalsSuccess: ['data'],
  setLegalsRequest: ['data'],
  getCompanyInformationRequest: ['payload', 'callback'],
  getCompanyInformationSuccess: ['data'],
});

export const LegalsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  legals: null,
  selectedLegals: {},
  companyInformation: null
});

// Get cards
export const getLegalsRequest = (state) =>
  state.merge({ fetching: true })

export const getLegalsSuccess = (state, action) =>
  state.merge({ fetching: false, legals: action.data })

export const setLegalsRequest = (state, action) =>
  state.merge({ selectedLegals: action.data, fetching: false })

export const getCompanyInformationRequest = (state) => 
  state.merge({ fetching: true })

export const getCompanyInformationSuccess = (state, action) => 
  state.merge({ companyInformation: action.data, fetching: false })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LEGALS_REQUEST]: getLegalsRequest,
  [Types.GET_LEGALS_SUCCESS]: getLegalsSuccess,
  [Types.SET_LEGALS_REQUEST]: setLegalsRequest,
  [Types.GET_COMPANY_INFORMATION_REQUEST]: getCompanyInformationRequest,
  [Types.GET_COMPANY_INFORMATION_SUCCESS]: getCompanyInformationSuccess,
});