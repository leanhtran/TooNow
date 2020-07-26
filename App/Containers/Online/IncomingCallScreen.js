/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict'

import React from 'react'
import {
  View,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native'
import CallManager from '../../Voximplant/manager/CallManager'
import { Voximplant } from 'react-native-voximplant'
import styles from '../Styles/CallStyle'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import Images from '../../Themes/Images'
import ToolBar from '../../Components/Toolbar'
import BackIcon from '../../Components/BackIcon'
import IconTouchable from '../../Components/IconTouchable'
import Sizes from '../../Themes/Sizes'
import TextComponent from '../../Components/TextComponent'
import { CALL_STATES } from '../../Constants'
import I18n from '../../I18n'

export default class IncomingCallScreen extends React.Component {
  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params
    console.log(IncomingCallScreen, params)
    const callId = params ? params.callId : null
    this.isVideoCall = params ? params.isVideo : false
    this.displayName = params ? params.from : null
    this.call = CallManager.getInstance().getCallById(callId)
    this.isFrontCamera = true

    this.state = {
      displayName: null,
      isModalOpen: false,
    }
  }

  componentDidMount() {
    if (this.call) {
      Object.keys(Voximplant.CallEvents).forEach(eventName => {
        const callbackName = `_onCall${eventName}`
        if (typeof this[callbackName] !== 'undefined') {
          this.call.on(eventName, this[callbackName])
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.call) {
      Object.keys(Voximplant.CallEvents).forEach(eventName => {
        const callbackName = `_onCall${eventName}`
        if (typeof this[callbackName] !== 'undefined') {
          this.call.off(eventName, this[callbackName])
        }
      })
      this.call = null
    }
  }

  async answerCall(withVideo) {
    try {
      if (Platform.OS === 'android') {
        let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]
        if (withVideo) {
          permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA)
        }
        const granted = await PermissionsAndroid.requestMultiple(permissions)
        const recordAudioGranted = granted['android.permission.RECORD_AUDIO'] === 'granted'
        const cameraGranted = granted['android.permission.CAMERA'] === 'granted'
        if (recordAudioGranted) {
          if (withVideo && !cameraGranted) {
            console.warn(
              'IncomingCallVoximplantScreen: answerCall: camera permission is not granted'
            )
            return
          }
        } else {
          console.warn(
            'IncomingCallVoximplantScreen: answerCall: record audio permission is not granted'
          )
          return
        }
      }
    } catch (e) {
      console.warn('IncomingCallVoximplantScreen: asnwerCall:' + e)
      return
    }
    this.props.navigation.navigate('Call', {
      callId: this.call.callId,
      isVideo: withVideo,
      isIncoming: true,
    })
  }

  declineCall() {
    this.call.decline()
  }

  _onCallDisconnected = event => {
    CallManager.getInstance().removeCall(event.call)
    this.props.navigation.goBack()
  }

  _onCallEndpointAdded = event => {
    console.log(
      'IncomingCallVoximplantScreen: _onCallEndpointAdded: callid: ' +
        this.call.callId +
        ' endpoint id: ' +
        event.endpoint.id
    )
    this.setState({ displayName: event.endpoint.displayName })
  }

  _onPressChangeCamera = () => {
    this.isFrontCamera = !this.isFrontCamera
    const cameraType = this.isFrontCamera
      ? Voximplant.Hardware.CameraType.FRONT
      : Voximplant.Hardware.CameraType.BACK
    Voximplant.Hardware.CameraManager.getInstance().switchCamera(cameraType)
  }

  render() {
    const callState =
      this.state.callState === CALL_STATES.CONNECTING ? `${I18n.t('ringing')}...` : this.state.callState

    return (
      <ImageBackgroundContainer source={Images.bgCalling}>
        <StatusBar barStyle="light-content" />
        <View style={styles.flex1}>
          <ToolBar
            paddingEnable
            LeftComponent={<BackIcon />}
            RightComponent={
              <IconTouchable source={Images.changeCamera} onPress={this._onPressChangeCamera} />
            }
            rightToolBarStyle={styles.rightToolBar}
          />
          <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
            <Image source={Images.calling} style={styles.callingImg} resizeMode={'contain'} />
            <TextComponent style={styles.callConnectingLabel}>{callState}</TextComponent>
          </View>

          <View style={styles.bottomButton}>
            <IconTouchable
              style={styles.callingIcon}
              source={Images.declineCall}
              onPress={() => this.declineCall()}
            />
            <IconTouchable
              style={styles.callingIcon}
              source={Images.acceptCall}
              onPress={() => this.answerCall(true)}
            />
          </View>
          <Modal
            animationType="fade"
            transparent
            visible={this.state.isModalOpen}
            onRequestClose={() => {}}>
            <TouchableHighlight onPress={e => this._closeModal()} style={styles.container}>
              <View style={[styles.warningModal, styles.modalBackground]}>
                <View style={[styles.innerContainer, styles.innerContainerTransparent]}>
                  <Image
                    source={Images.warning}
                    style={styles.warningIcon}
                    resizeMode={'contain'}
                  />
                  <TextComponent isBoldText style={styles.warningText}>
                    {I18n.t('cantConnectToJobber')}
                  </TextComponent>
                </View>
              </View>
            </TouchableHighlight>
          </Modal>
        </View>
      </ImageBackgroundContainer>
    )
  }
}
