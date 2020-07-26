// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import { URLBase, URL_API, URL_GOOGLE_API, KEY_GOOGLE_MAP_API } from '../Constants'

// our "constructor"
const create = (baseURL = URL_API) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 30000,
  })

  // Update headers
  const updateHeader = headers => api.setHeaders(headers)
  const updateToken = token => api.setHeaders({ Authorization: `Bearer ${token}` })

  const apiGoogle = apisauce.create({
    baseURL: URL_GOOGLE_API,
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = username => api.get('search/users', { q: username })

  // GOOGLE API

  const getCoordinateInfo = ({ latlng, key = KEY_GOOGLE_MAP_API }) =>
    apiGoogle.get('geocode/json', {
      latlng,
      key,
    })

  const searchPlace = ({
    input,
    inputtype = 'textquery',
    fields = 'formatted_address,geometry,name',
    locationbias,
    key = KEY_GOOGLE_MAP_API,
  }) =>
    apiGoogle.get('place/findplacefromtext/json', {
      input,
      inputtype,
      fields,
      locationbias,
      key,
    })

  const autocompletePlace = ({ input, key = KEY_GOOGLE_MAP_API }) =>
    apiGoogle.get('place/autocomplete/json', {
      input,
      key,
    })

  // TooNow API
  const getProfileInfo = () => api.get('users/profile')
  const getJobrCategories = () => api.get('categories')
  const getJobrSubCategories = (parentId) => api.get(`categories?parent_id=${parentId}&per_page=15&page=1`)
  const postJobrCategories = body => api.post('jobber/categories', body)

  const editProfileInfo = ({
    legals_id,
    about_me,
    intervention_distance,
    fullname,
    firstname,
    lastname,
    address,
    address_lat,
    address_lng,
    phone,
    birthday = '25-06-1988',
  }) =>
    api.post('users/update', {
      legals_id,
      about_me,
      intervention_distance,
      fullname,
      firstname,
      lastname,
      address,
      address_lat,
      address_lng,
      phone,
      birthday,
      _method: 'PATCH',
    })

  const login = ({
    email,
    password,
    device_token="123123",
    name = 'name',
    os = 'ios',
    brand = 'brand',
    ip = 'ip123',
  }) => api.post('login', { email, password, device_token, name, os, brand, ip })

  const socialLogin = ({ social_name, access_token, device_token="123123", name, os, brand,ip = 'ip123', }) =>
    api.post('register', { social_name, access_token, device_token, name, os, brand, ip })

  const register = ({
    email,
    password,
    firstname,
    lastname,
    gender = 1,
    address,
    address_lat,
    address_lng,
    phone,
    birthday = '25-06-1988',
    social_name,
    access_token,
    name = 'name',
    os = 'ios',
    brand = 'brand',
    ip = 'ip123',
    device_token = '121',
  }) =>
    api.post('register', {
      email,
      password,
      firstname,
      lastname,
      gender,
      address,
      address_lat,
      address_lng,
      phone,
      birthday,
      social_name,
      access_token,
      name,
      os,
      brand,
      ip,
      device_token,
    })

  const sendVerifyCode = ({
    phone,
    device_name = '2012/12/12',
    mac_address = 'ddd',
    sms_token = 'sms_token',
  }) => api.post('verify-phone', { phone, device_name, mac_address, sms_token })

  const verifyCodeAndLogin = ({ phone, code }) => api.post('verify-code-login', { phone, code })
  const verifyCode = ({phone, code}) => api.post('verify-code', {phone, code})

  const forgotPassword = ({ email }) => api.post('passwords/email', { email })
  const changeProfilePhoto = body => api.post('users/change-avatar', body)
  const checkUserExist = email => api.post('email-exist', { email })
  const getHistoryMissions = date => api.post('missions/history',{ date })

  const getCards = () => api.get('users/stripe/cards')
  const addCard = ({ card_holder_name = '', number = '', exp = '', cvc = '' }) =>
    api.post('users/stripe/cards', {
      card_holder_name,
      number,
      exp,
      cvc,
    })

  const deleteCard = ({ id }) => api.delete(`users/stripe/cards/${id}`)
  const setDefaultCard = ({id}) => api.put('users/stripe/default', {card_id : id})
  const getActivitiesOnline = () => api.get('activities/online')
  const getActivitiesOffline = () => api.get('activities/offline')
  const createReview = ({ user_id, related_id, related_name, comment, rating }) =>
    api.post('reviews', {
      user_id,
      related_id,
      related_name,
      comment,
      rating,
    })

  const getNotifications = () => api.get(`notifications`)

  const getOrders = () => api.get(`jobber/missions?page=1&per_page=10`)
  const accpetOrders = ({ mission_id, accept }) => api.post(`missions/accept-job/${mission_id}`, {
    accept
  })

  const uploadImages = image => api.post('images/upload', image)
  const trackingOrder = ({ mission_id, status }) =>
    api.post('missions/tracking-order', {
      mission_id,
      status,
    })
  const getLegals = () => api.get('legals')

  const getPlans = () => api.get('plans')
  const getCurrentPlan = () => api.get('plans/current')
  const subscribePlan = ({plan_id}) => api.post('plans/subscribe',{plan_id})

  const getCompanyInformation = (siret) => api.get(`company/${siret}`)
  const deleteAccount = () => api.delete('users/delete')
  const changeMoney = ({mission_id, changed_money}) => api.post('missions/change-money',{mission_id, changed_money})
  const submitResult = ({mission_id, order_id, qr_code_comment})=>api.post('missions/check-qr-code', {mission_id, order_id,qr_code_comment})
  const submitQrCode = ({mission_id, order_id, qr_code_token}) =>api.post('missions/check-qr-code', {mission_id, order_id,qr_code_token})
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    updateHeader,
    updateToken,
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,

    getProfileInfo,
    editProfileInfo,
    getJobrCategories,
    postJobrCategories,
    getJobrSubCategories,

    // TODO
    login,
    register,
    sendVerifyCode,
    verifyCodeAndLogin,
    verifyCode,
    forgotPassword,
    changeProfilePhoto,
    checkUserExist,
    socialLogin,
    deleteAccount,

    //GOOGLE
    getCoordinateInfo,
    searchPlace,
    autocompletePlace,

    //CARD
    getCards,
    addCard,
    deleteCard,
    setDefaultCard,

    //ACTIVITY
    getActivitiesOnline,
    getActivitiesOffline,

    //Review
    createReview,

    //Notification
    getNotifications,

    //Orders
    getOrders,
    accpetOrders,
    trackingOrder,
    changeMoney,
    submitResult,
    submitQrCode,

    //Missions
    getHistoryMissions,
    uploadImages,

    //LEGALS
    getLegals,

    //PLANS
    getPlans,
    getCurrentPlan,
    subscribePlan,
    getCompanyInformation
  }
}

// let's return back our create method as the default.
export default {
  create,
}
