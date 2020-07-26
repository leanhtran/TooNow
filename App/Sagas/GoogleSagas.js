import {call, put} from 'redux-saga/effects'
import {Platform} from 'react-native'
import {path} from 'ramda'
import DeviceInfo from 'react-native-device-info'
import GoogleActions from '../Redux/GoogleRedux'
import LoadingActions from '../Redux/LoadingRedux'

export function * getCoordinateInfoSaga(api, action) {
  let {payload, callback} = action
  const response = yield call(api.getCoordinateInfo, payload)
  console.log('response', response)
  if (response.ok) {
    const errorMessage = path(['data', 'error_message'], response) || 'Search failed'
    const status = path(['data', 'status'], response)
    const results = path(['data', 'results'], response)

    if (status === 'OK') {
      if (results && results.length > 0) {
        // yield put(GoogleActions.searchPlaceSuccess())
        callback && callback(results[0])
      }
    } else if (status === 'ZERO_RESULTS'){
      alert('No result')
    } else {
      alert(errorMessage)
    }
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function * searchPlaceSaga(api, action) {
  let {payload, callback} = action
  const response = yield call(api.searchPlace, payload)
  console.log('response', response)
  if (response.ok) {
    const errorMessage = path(['data', 'error_message'], response) || 'Search failed'
    const status = path(['data', 'status'], response)
    const candidates = path(['data', 'candidates'], response)

    if (status === 'OK') {
      if (candidates && candidates.length > 0) {
        // yield put(GoogleActions.searchPlaceSuccess())
        callback && callback(candidates[0])
      }
    } else if (status === 'ZERO_RESULTS'){
      alert('No result')
    } else {
      alert(errorMessage)
    }
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function * autocompletePlaceSaga(api, action) {
  let {payload, callback} = action
  const response = yield call(api.autocompletePlace, payload)
  console.log('response', response)
  if (response.ok) {
    const status = path(['data', 'status'], response)
    const predictions = path(['data', 'predictions'], response)

    if (status === 'OK') {
      // yield put(GoogleActions.autocompletePlaceSuccess())
      callback && callback(predictions)
    }
  } else {
    yield put(LoadingActions.showError(response))
  }
}
