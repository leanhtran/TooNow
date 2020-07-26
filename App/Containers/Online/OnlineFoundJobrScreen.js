import React from 'react'
import {Image, View, SafeAreaView, Platform, ScrollView, PermissionsAndroid, FlatList} from 'react-native'
import I18n from '../../I18n'

import styles from '../Styles/FoundJobrStyles'
import TextComponent from '../../Components/TextComponent'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import Images from '../../Themes/Images'
import ToolBar from '../../Components/Toolbar'
import ButtonComponent from '../../Components/ButtonComponent'
import {PROFILE, TRACKING} from '../MockData'
import ChatButton from '../../Components/ChatButton'
import BackIcon from '../../Components/BackIcon'
import LoginManager from '../../Voximplant/manager/LoginManager'

class OnlineFoundJobrScreen extends React.Component {
  number = 'test02'

  state = {
    profile: PROFILE,
    tracking: TRACKING,
    isFoundJobr: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isFoundJobr: true})
    }, 5000)
  }
  //
  // componentWillUnmount() {
  //   LoginManager.getInstance().off('onConnectionClosed', this._connectionClosed)
  // }
  //
  // _connectionClosed = () => {
  //   this.props.navigation.navigate('Home')
  // }

  async makeCall(isVideoCall) {
    console.log('MainScreen: make call: ' + this.number + ', isVideo:' + isVideoCall)
    try {
      if (Platform.OS === 'android') {
        let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]
        if (isVideoCall) {
          permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA)
        }
        const granted = await PermissionsAndroid.requestMultiple(permissions)
        const recordAudioGranted = granted['android.permission.RECORD_AUDIO'] === 'granted'
        const cameraGranted = granted['android.permission.CAMERA'] === 'granted'
        if (recordAudioGranted) {
          if (isVideoCall && !cameraGranted) {
            console.warn('MainScreen: makeCall: camera permission is not granted')
            return
          }
        } else {
          console.warn('MainScreen: makeCall: record audio permission is not granted')
          return
        }
      }
      this.props.navigation.navigate('Call', {
        callId: null,
        isVideo: isVideoCall,
        isIncoming: false,
        callTo: this.number,
      })
    } catch (e) {
      console.warn('MainScreen: makeCall failed: ' + e)
    }
  }

  _onChatPress = () => {
    this.props.navigation.navigate('ChatWithJobr')
  }

  _callJobr = () => {
    this.makeCall(true)
  }

  render() {
    const {dp, username, rating} = this.state.profile
    const {estimate, distance, to, chatCount} = this.state.tracking
    const {isFoundJobr} = this.state
    const foundJobrStatus = isFoundJobr ? `${I18n.t('jobrAccepted')}` : `${I18n.t('waitingForJobr')}...`
    return (
      <View style={styles.mainContainer}>
        <ImageBackgroundContainer
          resizeMode={'stretch'}
          style={styles.toolbarBackground}
          source={Images.bgToolBar}
        />
        <View style={[styles.container, {paddingHorizontal: 0}]}>
          <ToolBar
            paddingEnable
            LeftComponent={<BackIcon/>}
            center={I18n.t('jobrIsFound')}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.marginHorizontal26}>
              <DPContainer dp={dp} username={username} rating={rating}/>
              <TrackingInfo
                chatCount={chatCount}
                onChatPress={this._onChatPress}
              />
              <TextComponent style={styles.waitingText}>{foundJobrStatus}</TextComponent>
              {isFoundJobr && <Footer callJobr={this._callJobr}/>}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const Footer = ({callJobr}) => (
  <View style={styles.footer}>
    <ButtonComponent
      enableGradient
      icon={Images.phoneCall}
      onPress={() => callJobr()}
      text={I18n.t('call')}
      style={styles.buttonStart}
    />
    <SafeAreaView/>
  </View>
)

const DPContainer = ({dp, username, rating}) => {
  return (
    <View style={styles.dpContainer}>
      <View style={styles.dpCircle}>
        <Image style={styles.dpImage} resizeMode={'cover'} source={dp}/>
      </View>
      <View style={styles.jobrInfo}>
        <TextComponent style={styles.name}>{username}</TextComponent>
        <View style={styles.ratingContainer}>
          <Image
            style={styles.starIcon}
            resizeMode={'contain'}
            source={Images.startWhite}
          />
          <TextComponent style={styles.rating}>{rating}</TextComponent>
        </View>
      </View>
    </View>
  )
}

const TrackingInfo = ({chatCount, onChatPress}) => {
  return (
    <View style={styles.trackingInfoContainer}>
      <View style={[styles.specialityContainer, styles.alignStretch]}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('speciality')}</TextComponent>
        <TextComponent multiline style={styles.specialityDes}>{`${I18n.t('plumber')}, ${I18n.t('electrician')}, ${I18n.t('locker')}`}</TextComponent>
      </View>
      <View style={[styles.specialityContainer, styles.alignStretch]}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('aboutMe')}</TextComponent>
        <TextComponent
          multiline
          // numberOfLines={5}
          style={styles.specialityDes}>Lorem ipsum dolor sit consectetu elit vestibulum blandit
          malesuada sapien cursus augue interdum ut. Lorem ipsum dolor sit consectetu elit vestibulum blandit malesuada
          sapien cursus augue interdum ut. Lorem ipsum dolor sit.</TextComponent>
      </View>
      <ChatButton
        // text={I18n.t("chatNow")}
        style={{marginTop: -6, marginBottom: -14}}
        chatCount={chatCount}
        onPress={() => onChatPress()}
      />
    </View>
  )
}

export default OnlineFoundJobrScreen
