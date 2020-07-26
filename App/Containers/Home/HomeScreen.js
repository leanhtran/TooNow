import React from 'react'
import {
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
} from 'react-native'
import Modal from 'react-native-modal'
import styles from '../Styles/HomeStyles'
import TextComponent from '../../Components/TextComponent'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import Images from '../../Themes/Images'
import TextInputComponent from '../../Components/TextInputComponent'
import ButtonComponent from '../../Components/ButtonComponent'
import TextTouchable from '../../Components/TextTouchable'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import LoginManager from '../../Voximplant/manager/LoginManager'
import AsyncStorage from '@react-native-community/async-storage'
import I18n from '../../I18n'

class HomeScreen extends React.Component {
  state = {
    missions: PREVIOUS_MISSION,
    showSwitchOnlineMode: false,
    isOnlineMission: false,
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
      StatusBar.setHidden(false)
    })

    this._setVoximplantListener()
    this._loginIntoVoximplant()
  }

  _setVoximplantListener = () => {
    LoginManager.getInstance().on('onConnectionFailed', reason => this.onConnectionFailed(reason))
    LoginManager.getInstance().on('onLoggedIn', displayName => this.onLoggedIn(displayName))
    LoginManager.getInstance().on('onLoginFailed', errorCode => this.onLoginFailed(errorCode))
  }

  onLoginFailed(errorCode) {
    console.log('onLoginFailed', errorCode)
    if (this.state.isOnlineMission) this.setState({ isOnlineMission: false })
    this.loginVoximplantSuccess = false
    // switch (errorCode) {
    //   case 401:
    //     this.setState({isModalOpen: true, modalText: 'Invalid password'})
    //     break
    //   case 403:
    //     this.setState({isModalOpen: true, modalText: 'Account frozen'})
    //     break
    //   case 404:
    //     this.setState({isModalOpen: true, modalText: 'Invalid username'})
    //     break
    //   case 701:
    //     this.setState({isModalOpen: true, modalText: 'Token expired'})
    //     break
    //   default:
    //   case 500:
    //     this.setState({isModalOpen: true, modalText: 'Internal error'})
    // }
  }

  onLoggedIn(displayName) {
    console.log('onLoggedIn', displayName)
    this.setState({ isOnlineMission: true })
    this.loginVoximplantSuccess = true

    // this.props.navigation.navigate('MainVoximplant')
  }

  onConnectionFailed(reason) {
    console.log('onConnectionFailed', reason)
    this.loginVoximplantSuccess = false
    if (this.state.isOnlineMission) this.setState({ isOnlineMission: false })
    // this.setState({isModalOpen: true, modalText: 'Failed to connect, check internet settings'})
  }

  _loginIntoVoximplant = () => {
    try {
      const { user } = this.props
      const userNameVoximplant = user?.voximplant_user_name
      const passwordVoximplant = user?.voximplant_user_password
      console.log('_loginIntoVoximplant ', userNameVoximplant, passwordVoximplant)
      LoginManager.getInstance().loginWithPassword(
        userNameVoximplant + '@toonow.toonow.voximplant.com',
        passwordVoximplant
      )
    } catch (err) {
      console.log(err)
    }
  }

  loginWithOneTimeKeyClicked() {
    LoginManager.getInstance().loginWithOneTimeKey(
      this.state.username + '.voximplant.com',
      this.password
    )
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  _onChangeText = text => {
    this.missionText = text
  }

  _onPressOnlineMission = () => {
    if (!this.missionText) return alert('Please enter your mission')
    this._showSwitchOnlineModeModal()
  }

  _onPressContinue = () => {
    if (!this.missionText) return alert('Please enter your mission')
    this.props.navigation.navigate('ChooseShop')
  }

  _onPressSeeAll = () => {}

  _onSwitchOnlineMode = () => {
    this.setState({ isOnlineMission: true })
    if (this.loginVoximplantSuccess) {
      this.props.navigation.navigate('OnlineConfirmCart', { missionText: this.missionText })
    } else {
      this._loginIntoVoximplant()
    }
    this._hideSwitchOnlineModeModal()
  }

  _showSwitchOnlineModeModal = () => {
    StatusBar.setBackgroundColor('#00000099')
    this.setState({ showSwitchOnlineMode: true })
  }

  _hideSwitchOnlineModeModal = () => {
    StatusBar.setBackgroundColor('transparent')
    this.setState({ showSwitchOnlineMode: false })
  }

  _onPressMissionItem = () => {
    this.props.navigation.navigate('FoundJobr')
  }

  render() {
    const { missions, showSwitchOnlineMode, isOnlineMission } = this.state
    return (
      <ScrollView style={styles.container}>
        <ImageBackgroundContainer
          resizeMode={'stretch'}
          style={styles.toolbarBackground}
          source={Images.bgToolBar}
        />
        <SafeAreaView />
        <View style={styles.mainContainer}>
          <TextComponent style={styles.headerText} multiline={true}>
            {`${I18n.t('letsUsKnowYourMissionIs')}...`}
          </TextComponent>
          <MissionInput
            onChangeText={this._onChangeText}
            placeholder={'I want to buy'}
            onPressOnlineMission={this._onPressOnlineMission}
            isOnlineMission={isOnlineMission}
          />
          <ButtonComponent
            style={styles.marginHorizontal26}
            enableGradient={true}
            onPress={this._onPressContinue}
            text={I18n.t('continue')}
          />
          <PreviousMission
            data={missions}
            onPressItem={this._onPressMissionItem}
            onPressSeeAll={this._onPressSeeAll}
          />
        </View>
        <SwitchOnlineModeModal
          isVisible={showSwitchOnlineMode}
          onYesPress={this._onSwitchOnlineMode}
          onNoPress={this._hideSwitchOnlineModeModal}
        />
      </ScrollView>
    )
  }
}

const PreviousMission = ({ data, onPressSeeAll, onPressItem }) => {
  const _keyExtractor = (item, index) => index.toString()
  const _renderItem = ({ item }) => (
    <PreviousMissionItem item={item} onPressItem={() => onPressItem(item)} />
  )
  return (
    <View style={styles.previousMission}>
      <View style={styles.previousMissionHeader}>
        <TextComponent style={styles.previousMissionTitle}>Previous mission</TextComponent>
        <TextTouchable style={styles.seeAllText} onPress={onPressSeeAll} text={I18n.t('seeAll')} />
      </View>
      <FlatList
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        scrollEnabled={false}
      />
    </View>
  )
}

const PreviousMissionItem = ({ item, onPressItem }) => {
  return (
    <TouchableOpacity onPress={onPressItem} style={styles.previousMissionItem}>
      <Image style={styles.dpIcon} source={item.icon} />
      <View style={styles.flex1}>
        <TextComponent multiline={true} style={styles.missionMessage}>
          {item.message}
        </TextComponent>
        <TextComponent style={styles.missionDate}>{item.date}</TextComponent>
      </View>
    </TouchableOpacity>
  )
}

const MissionInput = ({
  onChangeText,
  placeholder,
  address,
  onPressOnlineMission,
  isOnlineMission,
}) => {
  return (
    <View style={styles.missionInputContainer}>
      <TextInputComponent
        style={styles.missionInput}
        multiline={true}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      <TextComponent style={styles.suggestionText}>T-shirt, shoes, vegetable, ...</TextComponent>
      <View style={styles.onlineMission}>
        <TextComponent style={styles.orText}>{I18n.t('orYouWant')}</TextComponent>
        <OnlineMissionButton
          onPress={onPressOnlineMission}
          text={I18n.t('onlineMission')}
          icon={Images.camera}
          active={isOnlineMission}
        />
      </View>
    </View>
  )
}

const OnlineMissionButton = ({ onPress, text, icon, active }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.onlineMissionButton,
      active ? styles.onlineMissionButtonActive : styles.onlineMissionButtonInactive,
    ]}>
    <Text style={styles.onlineMissionTextButton}>{text}</Text>
    <Image source={icon} resizeMode={'contain'} style={styles.rightIcon} />
  </TouchableOpacity>
)

const SwitchOnlineModeModal = ({ isVisible, onYesPress, onNoPress }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.switchOnlineModeModal}>
        <TextComponent multiline style={styles.textAskOnlineMode}>
          {I18n.t('doYouWantToSwitchTo')}{' '}
          <TextComponent style={styles.textOnlineMode}>{I18n.t('onlineMode')}</TextComponent>
        </TextComponent>
        <Image source={Images.cameraBorder} style={styles.cameraBorder} />
        <ButtonComponent
          enableGradient
          style={styles.onlineButton}
          textStyle={styles.textOnlineButton}
          onPress={onYesPress}
          text={I18n.t('yesIAmSure')}
        />
        <ButtonComponent
          style={styles.onlineButton}
          textStyle={[styles.textOnlineButton, styles.textOnlineButtonNo]}
          onPress={onNoPress}
          text={I18n.t('noGoBack')}
        />
      </View>
    </Modal>
  )
}

const mapStateToProp = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProp, null)(HomeScreen)
