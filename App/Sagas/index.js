import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import { from } from 'rxjs'

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux'
import {GithubTypes} from '../Redux/GithubRedux'
import {AuthTypes} from '../Redux/AuthRedux'
import {GoogleTypes} from '../Redux/GoogleRedux'
import {CardTypes} from '../Redux/CardRedux'
import {ActivityTypes} from '../Redux/ActivityRedux'
import {ReviewTypes} from '../Redux/ReviewRedux'
import {NotificationTypes} from '../Redux/NotificationRedux'
import {OrderTypes} from '../Redux/OrderRedux'
import {HistoryMissionsTypes} from '../Redux/GetHistoryMissionsRedux'
import { UploadImageTypes } from '../Redux/UploadImageRedux'
import { LegalsTypes } from '../Redux/LegalsRedux'

/* ------------- Sagas ------------- */

import { getLegalsSaga, getCompanyInfoSaga } from './LegalsSaga'
import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import {
  changeProfilePhotoSaga,
  editProfileSaga,
  forgotPasswordSaga,
  getJobrCategoriesSaga,
  getProfileSaga,
  loginSaga,
  logoutSaga,
  postJobrCategoriesSaga,
  registerSaga,
  sendVerifyCodeSaga,
  updateTokenSaga,
  verifyCodeAndLoginSaga,
  socialLoginSaga,
  getJobrSubCategoriesSaga,
  checkEmailExistSaga,
  verifyCodeSaga,
  getCurrentPlanSaga,
  getPlansSaga,
  subscribePlanSaga,
  deleteAccountSaga
} from './AuthSagas'
import {autocompletePlaceSaga, getCoordinateInfoSaga, searchPlaceSaga} from './GoogleSagas'
import {getCardsSaga, addCardsSaga, deleteCardsSaga, setDefaultCardSaga} from './CardSaga'
import {getActivitiesOnlineSaga, getActivitiesOfflineSaga} from './ActivitySaga'
import {createReviewSaga} from './ReviewSaga'
import {getNotificationsSaga} from './NotificationSaga'
import {getOrderSaga, acceptOrderSaga, trackingOrderSaga, changeMoneySaga, submitResultSaga, submitQrCodeSaga} from './OrderSaga'
import { getHistoryMissionsSaga } from './GetHistoryMissionsSaga'
import { uploadImageSaga } from './UploadImageSaga'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    // TODO
    takeLatest(AuthTypes.LOGIN_REQUEST, loginSaga, api),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logoutSaga),
    takeLatest(AuthTypes.REGISTER_REQUEST, registerSaga, api),
    takeLatest(AuthTypes.SEND_VERIFY_CODE_REQUEST, sendVerifyCodeSaga, api),
    takeLatest(AuthTypes.VERIFY_CODE_AND_LOGIN_REQUEST, verifyCodeAndLoginSaga, api),
    takeLatest(AuthTypes.VERIFY_CODE_REQUEST, verifyCodeSaga, api),
    takeLatest(AuthTypes.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga, api),
    takeLatest(AuthTypes.EDIT_PROFILE_REQUEST, editProfileSaga, api),
    takeLatest(AuthTypes.GET_PROFILE_REQUEST, getProfileSaga, api),
    takeLatest(AuthTypes.GET_JOBR_CATEGORIES_REQUEST, getJobrCategoriesSaga, api),
    takeLatest(AuthTypes.GET_JOBR_SUB_CATEGORIES_REQUEST, getJobrSubCategoriesSaga, api),
    takeLatest(AuthTypes.POST_JOBR_CATEGORIES_REQUEST, postJobrCategoriesSaga, api),
    takeLatest(AuthTypes.UPDATE_TOKEN, updateTokenSaga, api),
    takeLatest(AuthTypes.CHANGE_PROFILE_PHOTO_REQUEST, changeProfilePhotoSaga, api),
    takeLatest(AuthTypes.SOCIAL_LOGIN_REQUEST, socialLoginSaga, api),
    takeLatest(AuthTypes.CHECK_USER_EXIST_REQUEST, checkEmailExistSaga, api),
    takeLatest(AuthTypes.GET_PLANS_REQUEST, getPlansSaga, api),
    takeLatest(AuthTypes.GET_CURRENT_PLAN_REQUEST, getCurrentPlanSaga, api),
    takeLatest(AuthTypes.SUBSCRIBE_PLAN_REQUEST, subscribePlanSaga, api),
    takeLatest(AuthTypes.DELETE_ACCOUNT_REQUEST, deleteAccountSaga, api),

    // History Missions
    takeLatest(HistoryMissionsTypes.GET_HISTORY_MISSIONS_REQUEST, getHistoryMissionsSaga, api),

    //GOOGLE SEARCH
    takeLatest(GoogleTypes.GET_COORDINATE_INFO_REQUEST, getCoordinateInfoSaga, api),
    takeLatest(GoogleTypes.SEARCH_PLACE_REQUEST, searchPlaceSaga, api),
    takeLatest(GoogleTypes.AUTOCOMPLETE_PLACE_REQUEST, autocompletePlaceSaga, api),

    //CARD
    takeLatest(CardTypes.GET_CARD_REQUEST, getCardsSaga, api),
    takeLatest(CardTypes.ADD_CARD_REQUEST, addCardsSaga, api),
    takeLatest(CardTypes.DELETE_CARD_REQUEST, deleteCardsSaga, api),
    takeLatest(CardTypes.SET_DEFAULT_CARD_REQUEST, setDefaultCardSaga,api),

    //ACTIVITY
    takeLatest(ActivityTypes.GET_ACTIVITIES_ONLINE_REQUEST, getActivitiesOnlineSaga, api),
    takeLatest(ActivityTypes.GET_ACTIVITIES_OFFLINE_REQUEST, getActivitiesOfflineSaga, api),

    //REVIEW
    takeLatest(ReviewTypes.CREATE_REVIEW_REQUEST, createReviewSaga, api),

    //NOTIFICATION
    takeLatest(NotificationTypes.GET_NOTIFICATION_REQUEST, getNotificationsSaga, api),

    //ORDER
    takeLatest(OrderTypes.GET_ORDER_REQUEST, getOrderSaga, api),
    takeLatest(OrderTypes.ACCEPT_ORDER_REQUEST, acceptOrderSaga,api),
    takeLatest(OrderTypes.ORDER_TRACKING_REQUEST, trackingOrderSaga, api),
    takeLatest(UploadImageTypes.UPLOAD_IMAGE_REQUEST, uploadImageSaga, api),
    takeLatest(OrderTypes.CHANGE_MONEY_REQUEST, changeMoneySaga, api),
    takeLatest(OrderTypes.SUBMIT_RESULT_REQUEST, submitResultSaga, api),
    takeLatest(OrderTypes.SUBMIT_QR_CODE_REQUEST, submitQrCodeSaga, api),
    
    //LEGALS
    takeLatest(LegalsTypes.GET_LEGALS_REQUEST, getLegalsSaga, api),
    takeLatest(LegalsTypes.GET_COMPANY_INFORMATION_REQUEST, getCompanyInfoSaga, api)
  ])
}
