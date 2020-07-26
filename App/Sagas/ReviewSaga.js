import { call, put } from 'redux-saga/effects'
import I18n from "../I18n"
import ReviewActions from '../Redux/ReviewRedux'
import LoadingActions from '../Redux/LoadingRedux'
import Toast from '../Components/Toast'

export function* createReviewSaga(api, action) {
  let {payload, callback} = action
  try {
    yield put(LoadingActions.showLoading())
    const response = yield call(api.createReview, payload)
    if (response.ok) {
      yield put(LoadingActions.hideLoading())
      yield put(ReviewActions.createReviewSuccess())
      Toast(I18n.t('success'));
      callback && callback("success")
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}