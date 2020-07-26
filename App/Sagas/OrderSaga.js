import { call, put } from 'redux-saga/effects'
import { Platform } from 'react-native'
import { path } from 'ramda'
import LoadingActions from '../Redux/LoadingRedux'
import OrderActions from '../Redux/OrderRedux'

export function* getOrderSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { callback } = action
  const response = yield call(api.getOrders)
  if (response.ok) {
    const data = path(['data', 'data', 'missions'], response)
    yield put(OrderActions.getOrderSuccess(data))
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* acceptOrderSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.accpetOrders, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(OrderActions.acceptOrderSuccess(data))
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* trackingOrderSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.trackingOrder, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* changeMoneySaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.changeMoney, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* submitResultSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.submitResult, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* submitQrCodeSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.submitQrCode, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}
