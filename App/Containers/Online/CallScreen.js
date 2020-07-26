import React from 'react'
import {
  View,
  Modal,
  TouchableHighlight,
  Platform,
  StatusBar,
  PermissionsAndroid,
  Image,
} from 'react-native'

import { Voximplant } from 'react-native-voximplant'
import CallManager from '../../Voximplant/manager/CallManager'
import styles from '../Styles/CallStyle'
import VIForegroundService from '@voximplant/react-native-foreground-service'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import Images from '../../Themes/Images'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import IconTouchable from '../../Components/IconTouchable'
import Sizes from '../../Themes/Sizes'
import TextComponent from '../../Components/TextComponent'
import { CALL_STATES } from '../../Constants'
import I18n from '../../I18n'

export default class CallScreen extends React.Component {
  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params

    this.callTo = params ? params.callTo : null
    this.callId = params ? params.callId : null
    this.isVideoCall = params ? params.isVideo : false
    this.isIncoming = params ? params.isIncoming : false
    this.callState = CALL_STATES.DISCONNECTED
    this.isFrontCamera = true

    this.state = {
      isAudioMuted: false,
      isVideoSent: this.isVideoCall,
      isKeypadVisible: false,
      isModalOpen: false,
      modalText: '',
      localVideoStreamId: null,
      remoteVideoStreamId: null,
      audioDeviceSelectionVisible: false,
      audioDevices: [],
      audioDeviceIcon: 'hearing',
      callState: this.callState,
    }

    this.call = CallManager.getInstance().getCallById(this.callId)

    console.log(
      'CallVoximplantScreen: ctr: callid: ' +
        this.callId +
        ', isVideoCall: ' +
        this.isVideoCall +
        ', isIncoming:  ' +
        this.isIncoming +
        ', callState: ' +
        this.callState
    )
  }

  componentDidMount() {
    Object.keys(Voximplant.Hardware.AudioDeviceEvents).forEach(eventName => {
      const callbackName = `_onAudio${eventName}`
      if (typeof this[callbackName] !== 'undefined') {
        Voximplant.Hardware.AudioDeviceManager.getInstance().on(eventName, this[callbackName])
      }
    })
    Object.keys(Voximplant.Hardware.CameraEvents).forEach(eventName => {
      const callbackName = `_onCamera${eventName}`
      if (typeof this[callbackName] !== 'undefined') {
        Voximplant.Hardware.CameraManager.getInstance().on(eventName, this[callbackName])
      }
    })

    const callSettings = {
      video: {
        sendVideo: this.isVideoCall,
        receiveVideo: this.isVideoCall,
      },
    }
    if (this.isIncoming) {
      this.call.answer(callSettings)
      this.setupListeners()
    } else {
      if (Platform.OS === 'ios') {
        callSettings.setupCallKit = true
      }
      ;(async () => {
        this.call = await Voximplant.getInstance().call(this.callTo, callSettings)
        this.setupListeners()
        let callManager = CallManager.getInstance()
        callManager.addCall(this.call)
        if (callSettings.setupCallKit) {
          callManager.startOutgoingCallViaCallKit(this.isVideoCall, this.callTo)
        }
      })()
    }
    this.callState = CALL_STATES.CONNECTING
    ;(async () => {
      this.setState({ callState: this.callState })
      let currentAudioDevice = await Voximplant.Hardware.AudioDeviceManager.getInstance().getActiveDevice()
      console.log('CallScreen -> componentDidMount -> currentAudioDevice', currentAudioDevice)
      switch (currentAudioDevice) {
        case Voximplant.Hardware.AudioDevice.BLUETOOTH:
          this.setState({ audioDeviceIcon: 'bluetooth-audio' })
          break
        case Voximplant.Hardware.AudioDevice.WIRED_HEADSET:
          this.setState({ audioDeviceIcon: 'headset' })
          break
        case Voximplant.Hardware.AudioDevice.EARPIECE:
        case Voximplant.Hardware.AudioDevice.SPEAKER:
        default:
          Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice(
            Voximplant.Hardware.AudioDevice.SPEAKER
          )
          this.setState({ audioDeviceIcon: 'volume-up' })
          break
      }
    })()
  }

  componentWillUnmount() {
    console.log('CallVoximplantScreen: componentWillUnmount ' + this.call?.callId)
    if (this.call) {
      Object.keys(Voximplant.CallEvents).forEach(eventName => {
        const callbackName = `_onCall${eventName}`
        if (typeof this[callbackName] !== 'undefined') {
          this.call.off(eventName, this[callbackName])
        }
      })
    }
    Object.keys(Voximplant.Hardware.AudioDeviceEvents).forEach(eventName => {
      const callbackName = `_onAudio${eventName}`
      if (typeof this[callbackName] !== 'undefined') {
        Voximplant.Hardware.AudioDeviceManager.getInstance().off(eventName, this[callbackName])
      }
    })
    Object.keys(Voximplant.Hardware.CameraEvents).forEach(eventName => {
      const callbackName = `_onCamera${eventName}`
      if (typeof this[callbackName] !== 'undefined') {
        Voximplant.Hardware.AudioDeviceManager.getInstance().off(eventName, this[callbackName])
      }
    })
  }

  setupListeners() {
    if (this.call) {
      Object.keys(Voximplant.CallEvents).forEach(eventName => {
        const callbackName = `_onCall${eventName}`
        if (typeof this[callbackName] !== 'undefined') {
          this.call.on(eventName, this[callbackName])
        }
      })
      if (this.isIncoming) {
        this.call.getEndpoints().forEach(endpoint => {
          this._setupEndpointListeners(endpoint, true)
        })
      }
    }
  }

  muteAudio = () => {
    console.log('CallVoximplantScreen[' + this.callId + '] muteAudio: ' + !this.state.isAudioMuted)
    const isMuted = this.state.isAudioMuted
    this.call?.sendAudio(isMuted)
    this.setState({ isAudioMuted: !isMuted })
  }

  async sendVideo(doSend) {
    console.log('CallVoximplantScreen[' + this.callId + '] sendVideo: ' + doSend)
    try {
      if (doSend && Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn(
            'CallVoximplantScreen[' +
              this.callId +
              '] sendVideo: failed due to camera permission is not granted'
          )
          return
        }
      }
      await this.call?.sendVideo(doSend)
      this.setState({ isVideoSent: doSend })
    } catch (e) {
      console.warn(`Failed to sendVideo(${doSend}) due to ${e.code} ${e.message}`)
    }
  }

  async hold(doHold) {
    console.log('CallVoximplantScreen[' + this.callId + '] hold: ' + doHold)
    try {
      await this.call.hold(doHold)
    } catch (e) {
      console.warn('Failed to hold(' + doHold + ') due to ' + e.code + ' ' + e.message)
    }
  }

  async receiveVideo() {
    console.log('CallVoximplantScreen[' + this.callId + '] receiveVideo')
    try {
      await this.call.receiveVideo()
    } catch (e) {
      console.warn('Failed to receiveVideo due to ' + e.code + ' ' + e.message)
    }
  }

  endCall() {
    // this.setState({isModalOpen: true})
    console.log('CallVoximplantScreen[' + this.callId + '] endCall')
    this.call?.getEndpoints().forEach(endpoint => {
      this._setupEndpointListeners(endpoint, false)
    })
    this.call?.hangup()
    !this.call && this.props.navigation.goBack()
    // if (this.callId === null) {
    //   this.props.navigation.navigate('RateJobr')
    // }
  }

  switchKeypad() {
    let isVisible = this.state.isKeypadVisible
    this.setState({ isKeypadVisible: !isVisible })
  }

  async switchAudioDevice() {
    console.log('CallVoximplantScreen[' + this.callId + '] switchAudioDevice')
    let devices = await Voximplant.Hardware.AudioDeviceManager.getInstance().getAudioDevices()
    this.setState({ audioDevices: devices, audioDeviceSelectionVisible: true })
  }

  selectAudioDevice(device) {
    console.log('CallVoximplantScreen[' + this.callId + '] selectAudioDevice: ' + device)
    Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice(device)
    this.setState({ audioDeviceSelectionVisible: false })
  }

  _keypadPressed(value) {
    console.log('CallVoximplantScreen[' + this.callId + '] _keypadPressed(: ' + value)
    this.call.sendTone(value)
  }

  _closeModal() {
    this.setState({ isModalOpen: false, modalText: '' })
    this.props.navigation.goBack()
  }

  _onCallFailed = event => {
    this.callState = CALL_STATES.DISCONNECTED
    CallManager.getInstance().removeCall(this.call)
    this.setState({
      isModalOpen: true,
      modalText: `${I18n.t('call')} ${I18n.t('failed')}: ` + event.reason,
      remoteVideoStreamId: null,
      localVideoStreamId: null,
      callState: this.callState,
    })
  }

  _onCallDisconnected = event => {
    console.log('CallVoximplantScreen: _onCallDisconnected: ' + event.call.callId)
    // this.setState({
    //   remoteVideoStreamId: null,
    //   localVideoStreamId: null,
    // })
    CallManager.getInstance().removeCall(this.call)
    if (
      Platform.OS === 'android' &&
      Platform.Version >= 26 &&
      this.callState === CALL_STATES.CONNECTED
    ) {
      ;(async () => {
        await VIForegroundService.stopService()
      })()
    }
    this.callState = CALL_STATES.DISCONNECTED
    // this.setState({callState: this.callState})
    // this.props.navigation.goBack()
    // go to rate jobr
    this.props.navigation.navigate('RateJobr')
  }

  _onCallConnected = event => {
    console.log('CallVoximplantScreen: _onCallConnected: ' + this.call?.callId)
    // this.call.sendMessage('Test message');
    // this.call.sendInfo('rn/info', 'test info');
    this.callState = CALL_STATES.CONNECTED
    this.setState({ callState: this.callState })
    if (Platform.OS === 'android' && Platform.Version >= 26) {
      const channelConfig = {
        id: 'ForegroundServiceChannel',
        name: 'In progress calls',
        description: 'Notify the call is in progress',
        enableVibration: false,
      }
      const notificationConfig = {
        channelId: 'ForegroundServiceChannel',
        id: 3456,
        title: 'Voximplant',
        text: 'Call in progress',
        icon: 'ic_vox_notification',
      }
      ;(async () => {
        await VIForegroundService.createNotificationChannel(channelConfig)
        await VIForegroundService.startService(notificationConfig)
      })()
    }
  }

  _onCallLocalVideoStreamAdded = event => {
    console.log(
      'CallVoximplantScreen: _onCallLocalVideoStreamAdded: ' +
        this.call?.callId +
        ', video stream id: ' +
        event.videoStream.id
    )
    this.setState({ localVideoStreamId: event.videoStream.id })
  }

  _onCallLocalVideoStreamRemoved = event => {
    console.log('CallVoximplantScreen: _onCallLocalVideoStreamRemoved: ' + this.call?.callId)
    this.setState({ localVideoStreamId: null })
  }

  _onCallEndpointAdded = event => {
    console.log(
      'CallVoximplantScreen: _onCallEndpointAdded: callid: ' +
        this.call?.callId +
        ' endpoint id: ' +
        event.endpoint.id
    )
    this._setupEndpointListeners(event.endpoint, true)
  }

  _onEndpointRemoteVideoStreamAdded = event => {
    console.log(
      'CallVoximplantScreen: _onEndpointRemoteVideoStreamAdded: callid: ' +
        this.call?.callId +
        ' endpoint id: ' +
        event.endpoint.id +
        ', video stream id: ' +
        event.videoStream.id
    )
    this.setState({ remoteVideoStreamId: event.videoStream.id })
  }

  _onEndpointRemoteVideoStreamRemoved = event => {
    console.log(
      'CallVoximplantScreen: _onEndpointRemoteVideoStreamRemoved: callid: ' +
        this.call?.callId +
        ' endpoint id: ' +
        event.endpoint.id +
        ', video stream id: ' +
        event.videoStream.id
    )
    if (this.state.remoteVideoStreamId === event.videoStream.id) {
      console.log(this.state.localVideoStreamId)
      this.setState({ remoteVideoStreamId: null })
    }
  }

  _onEndpointRemoved = event => {
    console.log(
      'CallVoximplantScreen: _onEndpointRemoved: callid: ' +
        this.call?.callId +
        ' endpoint id: ' +
        event.endpoint.id
    )
    this._setupEndpointListeners(event.endpoint, false)
  }

  _onEndpointInfoUpdated = event => {
    console.log(
      'CallVoximplantScreen: _onEndpointInfoUpdated: callid: ' +
        this.call?.callId +
        ' endpoint id: ' +
        event.endpoint.id
    )
  }

  _setupEndpointListeners(endpoint, on) {
    Object.keys(Voximplant.EndpointEvents).forEach(eventName => {
      const callbackName = `_onEndpoint${eventName}`
      if (typeof this[callbackName] !== 'undefined') {
        endpoint[on ? 'on' : 'off'](eventName, this[callbackName])
      }
    })
  }

  _onAudioDeviceChanged = event => {
    console.log('CallVoximplantScreen: _onAudioDeviceChanged:' + event.currentDevice)
    switch (event.currentDevice) {
      case Voximplant.Hardware.AudioDevice.BLUETOOTH:
        this.setState({ audioDeviceIcon: 'bluetooth-audio' })
        break
      case Voximplant.Hardware.AudioDevice.WIRED_HEADSET:
        this.setState({ audioDeviceIcon: 'headset' })
        break
      case Voximplant.Hardware.AudioDevice.EARPIECE:
      case Voximplant.Hardware.AudioDevice.SPEAKER:
      default:
        Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice(
          Voximplant.Hardware.AudioDevice.SPEAKER
        )
        this.setState({ audioDeviceIcon: 'volume-up' })
        break
    }
  }

  _onAudioDeviceListChanged = event => {
    ;(async () => {
      let device = await Voximplant.Hardware.AudioDeviceManager.getInstance().getActiveDevice()
      console.log(device)
    })()
    this.setState({ audioDevices: event.newDeviceList })
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

    console.log('call state', this.state.callState)
    return (
      <ImageBackgroundContainer source={Images.bgCalling}>
        <StatusBar barStyle="light-content" backgroundColor={'transparent'} />
        {/*<View style={styles.remoteVideo}/>*/}
        {this.state.remoteVideoStreamId && (
          <Voximplant.VideoView
            style={styles.remoteVideo}
            videoStreamId={this.state.remoteVideoStreamId}
            scaleType={Voximplant.RenderScaleType.SCALE_FILL}
          />
        )}
        <View style={styles.flex1}>
          <ToolBar
            paddingEnable
            LeftComponent={<BackIcon />}
            RightComponent={
              <IconTouchable source={Images.changeCamera} onPress={this._onPressChangeCamera} />
            }
            rightToolBarStyle={styles.rightToolBar}
          />
          {!this.state.remoteVideoStreamId ? (
            <View style={[styles.emptyVideoContainer]}>
              {this.state.localVideoStreamId && (
                <Voximplant.VideoView
                  style={styles.selfView}
                  videoStreamId={this.state.localVideoStreamId}
                  scaleType={Voximplant.RenderScaleType.SCALE_FIT}
                  showOnTop={true}
                />
              )}
              <Image source={Images.calling} style={styles.callingImg} resizeMode={'contain'} />
              <TextComponent style={styles.callConnectingLabel}>{callState}</TextComponent>
            </View>
          ) : (
            <View style={styles.videoPanel}>
              {this.state.isVideoSent ? (
                <Voximplant.VideoView
                  style={styles.selfView}
                  videoStreamId={this.state.localVideoStreamId}
                  scaleType={Voximplant.RenderScaleType.SCALE_FIT}
                  showOnTop={true}
                />
              ) : null}
            </View>
          )}

          <View style={styles.bottomButton}>
            {this.state.isVideoSent ? (
              <IconTouchable
                style={styles.callingIcon}
                source={Images.onCamera}
                onPress={() => this.sendVideo(false)}
              />
            ) : (
              <IconTouchable
                style={styles.callingIcon}
                source={Images.offCamera}
                onPress={() => this.sendVideo(true)}
              />
            )}
            <IconTouchable
              style={styles.callingIcon}
              source={Images.declineCall}
              onPress={() => this.endCall()}
            />
            {this.state.isAudioMuted ? (
              <IconTouchable
                style={styles.callingIcon}
                source={Images.offMicro}
                onPress={this.muteAudio}
              />
            ) : (
              <IconTouchable
                style={styles.callingIcon}
                source={Images.onMicro}
                onPress={this.muteAudio}
              />
            )}
          </View>
          <Modal
            animationType="fade"
            transparent={true}
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
