import { call, put } from 'redux-saga/effects'
import { Platform } from 'react-native'
import { path } from 'ramda'
import firebase from 'react-native-firebase'
import DeviceInfo from 'react-native-device-info'
import AuthActions from '../Redux/AuthRedux'
import LoadingActions from '../Redux/LoadingRedux'
import FBservice from '../Services/FirebaseService'

const SMS_TOKEN = 'P[xg{4Fn=3d6V`@G'

export function* loginSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const name = yield call(DeviceInfo.getDeviceName)
  const brand = yield call(DeviceInfo.getBrand)
  const device_token = yield call(FBservice.getToken)
  payload = {
    ...payload,
    name,
    brand,
    device_token,
    os: Platform.OS,
  }
  const response = yield call(api.login, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield call(api.updateToken, data?.token)
    yield put(AuthActions.loginSuccess(data))
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* socialLoginSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const name = yield call(DeviceInfo.getDeviceName)
  const brand = yield call(DeviceInfo.getBrand)
  const device_token = yield call(FBservice.getToken)

  payload = {
    ...payload,
    device_token,
    name,
    brand,
    os: Platform.OS,
  }

  const response = yield call(api.socialLogin, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield call(api.updateToken, data?.token)
    yield put(AuthActions.loginSuccess(data))
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* updateTokenSaga(api, action) {
  let { token } = action
  yield call(api.updateToken, token)
}

export function* getProfileSaga(api, action) {
  let { callback } = action
  const response = yield call(api.getProfileInfo)
  if (response.ok) {
    // const data = path(['data', 'data'], response)
    // yield put(AuthActions.loginSuccess(data))
    // callback && callback()
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* logoutSaga(action) {
  const { callback } = action
  yield put(AuthActions.logoutSuccess())
  callback && callback()
}

export function* registerSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action

  const device_name = yield call(DeviceInfo.getDeviceName)
  const device_token = yield call(FBservice.getToken)
  const name = yield call(DeviceInfo.getDeviceName)
  const brand = yield call(DeviceInfo.getBrand)
  payload = {
    ...payload,
    device_name,
    device_token,
    name,
    brand,
    os: Platform.OS,
  }
  console.log("payload", payload)
  const response = yield call(api.register, payload)
  console.log("response", response)
  if (response.ok) {
    yield put(LoadingActions.hideLoading())
    const data = path(['data', 'data'], response)
    yield call(api.updateToken, data?.token)
    yield put(AuthActions.loginSuccess(data))
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* sendVerifyCodeSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const mac_address = 'ac:de:48:00:11:22'
  const device_name = yield call(DeviceInfo.getDeviceName)
  payload = {
    ...payload,
    mac_address,
    device_name,
    sms_token: SMS_TOKEN,
  }
  const response = yield call(api.sendVerifyCode, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* verifyCodeSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.verifyCode, payload)
  if (response.ok) {
    const data = path(['data', 'success'], response)
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* verifyCodeAndLoginSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.verifyCodeAndLogin, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    //  yield call(api.updateToken, data?.token)
    //  yield put(AuthActions.verifyCodeAndLoginSuccess(data))
    yield put(LoadingActions.hideLoading())
    callback && callback()
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* forgotPasswordSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.forgotPassword, payload)
  if (response.ok) {
    yield put(LoadingActions.hideLoading())
    callback && callback()
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* editProfileSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  console.log("request", payload)
  const response = yield call(api.editProfileInfo, payload)
  console.log("response", response)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(LoadingActions.hideLoading())
    yield put(AuthActions.editProfileSuccess(data))
    callback && callback()
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* getJobrCategoriesSaga(api, action) {
  let { callback } = action
  yield put(LoadingActions.showLoading())
  const response = yield call(api.getJobrCategories)
  if (response.ok) {
    const items = path(['data', 'data', 'categories'], response)
    yield put(AuthActions.getJobrCategoriesSuccess(items))
    yield put(LoadingActions.hideLoading())
    callback && callback(items)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* getJobrSubCategoriesSaga(api, action) {
  let { callback, payload } = action
  yield put(LoadingActions.showLoading())
  const response = yield call(api.getJobrSubCategories, payload)
  if (response.ok) {
    const items = path(['data', 'data', 'categories'], response)
    yield put(LoadingActions.hideLoading())
    callback && callback(items)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* postJobrCategoriesSaga(api, action) {
  yield put(LoadingActions.showLoading())
  let { payload, callback } = action
  const response = yield call(api.postJobrCategories, payload)
  if (response.ok) {
    const res = yield call(api.getProfileInfo)
    const profile = path(['data', 'data'], res)
    yield put(LoadingActions.hideLoading())
    yield put(AuthActions.editProfileSuccess(profile))
    callback && callback()
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* changeProfilePhotoSaga(api, action) {
  let { callback, payload } = action
  const response = yield call(api.changeProfilePhoto, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(AuthActions.changeProfilePhotoSuccess(data))
    callback && callback()
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* checkEmailExistSaga(api, action) {
  let { callback, payload } = action
  yield put(LoadingActions.showLoading())
  const response = yield call(api.checkUserExist, payload)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(LoadingActions.hideLoading())
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* getPlansSaga(api, action) {
  let { callback } = action
  yield put(LoadingActions.showLoading())
  const response = yield call(api.getPlans)
  if (response.ok) {
    yield put(LoadingActions.hideLoading())
    const data = path(['data', 'data'], response)
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* getCurrentPlanSaga(api, action) {
  let { callback } = action
  yield put(LoadingActions.showLoading())
  const response = yield call(api.getCurrentPlan)
  if (response.ok) {
    yield put(LoadingActions.hideLoading())
    const data = path(['data', 'data'], response)
    yield put(AuthActions.getCurrentPlanSuccess(data))
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* subscribePlanSaga(api, action) {
  let { callback, payload } = action
  yield put(LoadingActions.showLoading())
  const response = yield call(api.subscribePlan, payload)
  if (response.ok) {
    yield put(LoadingActions.hideLoading())
    const data = path(['data', 'data'], response)
    callback && callback(data)
  } else {
    yield put(LoadingActions.showError(response))
  }
}

export function* deleteAccountSaga(api, action) {
  let { callback } = action
  yield put(LoadingActions.showLoading())
  const response = yield call(api.deleteAccount)
  if (response.ok) {
    yield put(LoadingActions.hideLoading())
    yield put (AuthActions.deleteAccountSuccess())
    callback && callback()
  } else {
    yield put(LoadingActions.showError(response))
  }
}