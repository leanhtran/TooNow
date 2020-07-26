/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict'

import LoginManager from './LoginManager'
import VoipPushNotification from 'react-native-voip-push-notification'
import firebase from 'react-native-firebase'

class PushManager {
  pushToken = ''
  constructor() {}

  init() {
    // Voip push for voixmplant
    VoipPushNotification.requestPermissions()
    VoipPushNotification.addEventListener('register', token => {
      this.pushToken = token
    })

    VoipPushNotification.addEventListener('notification', notification => {
      console.log('PushManager: ios: push notification is received: ' + notification)

      if (VoipPushNotification.wakeupByPush) {
        VoipPushNotification.wakeupByPush = false
      }
      console.log('VoipPushNotification pushNotificationReceived', notification.getData())
      LoginManager.getInstance().pushNotificationReceived(notification.getData())
    })

    firebase.messaging().onTokenRefresh(token => {
      console.log('Refresh token: ' + token)
    })
    firebase.messaging().onMessage(async message => {
      console.log('PushManager: FCM: notification: ' + message.data, JSON.stringify(message))
      LoginManager.getInstance().pushNotificationReceived(message.data)
    })

    firebase
      .messaging()
      .getToken()
      .then(token => {
        console.log(token)
        this.pushToken = token
      })
      .catch(() => {
        console.warn('PushManager android: failed to get FCM token')
      })
  }

  getPushToken() {
    return this.pushToken
  }
}

const pushManager = new PushManager()
export default pushManager
