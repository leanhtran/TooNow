import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { NavigationActions } from 'react-navigation';
import I18n from "../I18n"
import CardActions from '../Redux/CardRedux'
import LoadingActions from '../Redux/LoadingRedux'
import Toast from '../Components/Toast'

export function* getCardsSaga(api, action) {
  try {
    yield put(LoadingActions.showLoading())
    const response = yield call(api.getCards)
    if (response.ok) {
      const items = path(['data', 'data'], response)
      yield put(LoadingActions.hideLoading())
      yield put(CardActions.getCardSuccess(items))
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}

export function* addCardsSaga(api, action) {
  let { payload, callback } = action
  try {
    yield put(LoadingActions.showLoading())
    const response = yield call(api.addCard, payload)
    if (response.ok) {
      const data = path(['data', 'data'], response)
      yield put(CardActions.addCardSuccess(data))
      yield put(LoadingActions.hideLoading())
      callback && callback()
      Toast(I18n.t('success'));
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}

export function* deleteCardsSaga(api, action) {
  let { payload, callback } = action
  try {
    yield put(LoadingActions.showLoading())
    const response = yield call(api.deleteCard, payload)
    if (response.ok) {
      yield put(CardActions.deleteCardSuccess(payload))
      yield put(LoadingActions.hideLoading())
      yield put (NavigationActions.back())
      callback && callback()
      Toast(I18n.t('success'));
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}

export function* setDefaultCardSaga(api, action){
  let { payload, callback } = action
  try {
    yield put(LoadingActions.showLoading())
    const response = yield call(api.setDefaultCard, payload)
    if (response.ok) {
      yield put(CardActions.setDefaultCardSuccess(payload))
      yield put(LoadingActions.hideLoading())
      yield put (NavigationActions.back())
      callback && callback()
      Toast(I18n.t('success'));
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}
