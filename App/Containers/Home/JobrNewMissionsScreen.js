import React from 'react'
import {
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Text,
  PermissionsAndroid,
  Platform,
  AppState,
  Alert,
  InteractionManager,
  AsyncStorage,
  Switch,
} from 'react-native'
import SocketIOClient from 'socket.io-client'
import MapViewDirections from 'react-native-maps-directions'
import NotificationActions from '../../Redux/NotificationRedux'

import I18n from '../../I18n'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import TextComponent from '../../Components/TextComponent'
import ChatButton from '../../Components/ChatButton'
import ButtonComponent from '../../Components/ButtonComponent'
import { PROFILE, TRACKING } from '../MockData'
import Images from '../../Themes/Images'
import styles from '../Styles/JobrNewMissionsStyle'
import LoginManager from '../../Voximplant/manager/LoginManager'
import { URLBase } from '../../Constants/'
import { getUserNameVoximplant, PASSWORD_VOXIMPLANT } from '../../Voximplant/manager/UserVoximplant'
import OrderActions from '../../Redux/OrderRedux'
import AuthActions from '../../Redux/AuthRedux'
import { connect } from 'react-redux'
import fbService from '../../Services/FirebaseService'
import MapView, { Marker } from 'react-native-maps'
import transactionStyle from '../Styles/JobrTransactionStyle'
import TrackingProgress from '../../Components/TrackingProgress'
import { formatMoney } from '../../Common/Common'
import LoadingActions from '../../Redux/LoadingRedux'
import ToolBar from '../../Components/Toolbar'
import BackIcon from '../../Components/BackIcon'
import IconTouchable from '../../Components/IconTouchable'
import { Colors } from '../../Themes'
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  KEY_GOOGLE_MAP_API,
  INIT_LOCATION,
  REALTIME_URL,
  width,
  height,
} from '../../Constants'

import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import MissionInfoComponent from './MissionInfoComponent'

const trackingText = ['Order confirmed', 'Searching order', 'Product on the way', 'Delivered']

const Map = ({
  fromCoordinates,
  toCoordinates,
  region,
  askerCoordinates,
  jobrCoordinates,
  shopCoordinates,
}) => (
  <View style={{ flex: 1 }}>
    <MapView region={region} style={styles.mapStyle} ref={c => (this.mapView = c)}>
      {fromCoordinates && toCoordinates && (
        <MapViewDirections
          origin={fromCoordinates}
          destination={toCoordinates}
          apikey={KEY_GOOGLE_MAP_API}
          strokeWidth={2}
          strokeColor="#9729EA"
          optimizeWaypoints={true}
          onReady={result => {
            this.mapView.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: width / 20,
                bottom: height / 20,
                left: width / 20,
                top: height / 20,
              },
            })
          }}
        />
      )}
      {// Render jober marker
      jobrCoordinates && (
        <Marker coordinate={jobrCoordinates}>
          <IconTouchable source={Images.myPosition} disabled={true} style={styles.marker} />
        </Marker>
      )}

      {// Render shop marker
      shopCoordinates && (
        <Marker coordinate={shopCoordinates}>
          <IconTouchable source={Images.marketIcon} disabled={true} style={styles.marker} />
        </Marker>
      )}

      {// Render asker marker
      askerCoordinates && (
        <Marker coordinate={askerCoordinates}>
          <Image source={Images.profileDefault} style={styles.avatar} />
        </Marker>
      )}
    </MapView>
  </View>
)

class JobrNewMissionsScreen extends React.Component {
  password = PASSWORD_VOXIMPLANT

  state = {
    profile: PROFILE,
    tracking: [
      {
        step: 1,
        name: 'Order confirmed',
        time: '12:30 pm',
        pass: false,
      },
      {
        step: 2,
        name: 'Searching order',
        time: '12:40 pm',
        pass: false,
      },
      {
        step: 3,
        name: 'Product on the way',
        time: '12:45 pm',
        pass: false,
      },
      {
        step: 4,
        name: 'Delivered',
        time: '1:30 pm',
        pass: false,
      },
    ],
    order: null,
    isTracking: false,
    status: 4,
    isRunningBackgroundGeolocation: false,
    isReject: false,
    isOnline: false,
    isOffline: false,

    // replace these data region and coordinates with data response from server
    region: {
      ...INIT_LOCATION,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    // replace this data get from server
    jobrCoordinates: {
      latitude: 37.4219999,
      longitude: -122.0840575,
    },
    askerCoordinates: {
      latitude: 37.3808426,
      longitude: -121.9761941,
    },
    shopCoordinates: {
      latitude: 37.4808426,
      longitude: -121.9761941,
    },
    requiredInfo: true,
    hasPlan: false,
  }

  componentDidMount() {
    AsyncStorage.setItem('status', 'true')
    AsyncStorage.setItem('logout', 'false')
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      if (Platform.OS == 'ios') StatusBar.setBarStyle('dark-content', false)
      else {
        StatusBar.setBarStyle('light-content', false)
      }
    })
    this.checkCompleteRequiredInfo()
    this._setVoximplantListener()
    this._loginIntoVoximplant()
    this.updateOrders()
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillReceiveProps() {
    this.checkCompleteRequiredInfo()
  }

  checkCompleteRequiredInfo = () => {
    const { user } = this.props
    let isRequired = false
    if (
      user.image == null ||
      user.phone == null ||
      user.categories == [] ||
      user.about_me == null ||
      user.legal_id == null ||
      user.birthday == null ||
      user.categories == null
    ) {
      isRequired = false
    }
    this.props.getCurrentPlanRequest(data => {
      if (data == null || data == [] || data.length == 0) {
        this.setState({ requiredInfo: true, hasPlan: false })
      } else {
        this.setState({ requiredInfo: isRequired, hasPlan: true })
      }
    })
  }

  refresh() {
    BackgroundGeolocation.getLocations(locations => {
      console.log('****', locations)
    })
  }

  updateOrders = () => {
    const { getOrderRequest, getNotificationRequest } = this.props
    getOrderRequest()
    getNotificationRequest()
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
    const { user } = this.props
    const userNameVoximplant = user?.voximplant_user_name
    const passwordVoximplant = user?.voximplant_user_password
    console.log('_loginIntoVoximplant ', userNameVoximplant, passwordVoximplant)

    LoginManager.getInstance().loginWithPassword(
      userNameVoximplant + '@toonow.toonow.voximplant.com',
      passwordVoximplant
    )
  }

  componentWillUnmount() {
    this._navListener.remove()
    AppState.removeEventListener('change', this.handleAppStateChange)
    BackgroundGeolocation.removeAllListeners()
  }

  handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.updateOrders()
    }
  }

  _onChatPress = item => {
    console.log("item", item)
    const { user } = this.props
    this.props.showLoading()
    fbService.login(
      user,
      () => this.goToChatScreen(item),
      err => this.goToChatFail(user)
    )
  }

  goToChatScreen = item => {
    this.props.hideLoading()
    let order = {
      cart_total : item.cart_total || 0,
      price: item.earn_money || 0,
      type: item.order.type,
      order_id: item.order_id,
      user_id : item.order.user_id,
      mission_id : item.id,
      description: item.order.description
    }
    let pusher = {
      email: item.order.user.email,
      image: item.order.user.image
    }
    this.props.navigation.navigate('ChatWithJobr', {
      order: order,
      pusher: pusher
    })
  }

  goToChatFail = user => {
    fbService.createAccount(
      user,
      () => this.goToChatScreen(item),
      err => console.log('firebase', err)
    )
    this.props.hideLoading()
  }

  _onPressAcceptJobr = mission => {
    this.props.acceptOrderRequest({ mission_id: mission.id, accept: 1 }, data => {
      this.setState({ order: data, isReject: false })
      this.props.getNotificationRequest()
      this.updateOrders()
    })
    //  this.setState({ order: order });
  }

  _onPressRejectJobr = mission => {
    this.props.acceptOrderRequest({ mission_id: mission.id, accept: 0 }, data => {
      this.setState({ order: null, isReject: true })
      this.props.getNotificationRequest()
      this.updateOrders()
    })
  }

  _keyExtractor = (item, index) => index.toString()

  _renderEmptyItemComponent = () => {
    const text = I18n.t('youHaventHadNewMissions')
    return (
      <View style={styles.noRequestContainer}>
        <Text style={styles.noRequestText}>{text}</Text>
        <Image resizeMode={'stretch'} style={styles.noMissionImage} source={Images.noMission} />
      </View>
    )
  }

  _onChangeMoney = item => {}

  _renderItem = ({ item }) => {
    const { chatCount } = this.state.tracking
    const { order, isReject } = this.state
    const { user } = this.props
    return (
      <JobberInfo
        isReject={isReject}
        order={item}
        jobber={user}
        chatCount={chatCount}
        orderChoose={order}
        onChatPress={() => this._onChatPress(item)}
        onPressAcceptJobr={() => this._onPressAcceptJobr(item)}
        onPressRejectJobr={() => this._onPressRejectJobr(item)}
        onChangeMoney={() => this._onChatPress(item)}
      />
    )
  }

  _HeaderJobr = () => {
    const { user } = this.props

    return (
      <View style={styles.headerContainer}>
        <TextComponent style={styles.sayHello}>
          {I18n.t('hello')} <Text style={styles.nameJobr}>{user.firstname}</Text>
        </TextComponent>
        <TextComponent style={styles.greetingText}>{I18n.t('weWishYouANiceDay')}</TextComponent>
      </View>
    )
  }

  _renderMap = () => {
    const { order } = this.state
    return (
      <View>
        <MapView style={styles.mapStyle}></MapView>
        <ChatButton
          onPress={() => this._onChatPress(order)}
          chatCount={1}
          style={styles.chatBtnTracking}
        />
      </View>
    )
  }

  _onPressUpdateTracking = () => {
    const { tracking, status, order, isRunningBackgroundGeolocation } = this.state
    this.props.orderTrackingRequest(
      {
        mission_id: order.id,
        status: status,
      },
      data => {
        tracking[status - 3].pass = true
        this.setState({ status: this.state.status + 1, tracking: tracking })
        if (status == 6) {
          this.props.navigation.navigate('JobrRateAskr', {
            order: order,
          })
          if (isRunningBackgroundGeolocation) {
            BackgroundGeolocation.stop()
          }
        }
      }
    )
  }

  _onCancelOrderPress = () => {}

  _onIsOnlineChange = () => {
    fbService.requestPermissionOnly()
    this.setState({ isOnline: !this.state.isOnline })
  }

  _onIsOfflineChange = () => {
    this.setState({ isOffline: !this.state.isOffline })
  }

  _onUpdateInfo = () => {
    this.props.navigation.navigate('EditProfile')
  }

  _onUpdateJobrSkill = () => {
    this.props.navigation.navigate('SignUpChooseCategories')
  }

  _onUpdateLegal = () => {
    this.props.navigation.navigate('EditProfile')
  }

  _onUpdateBio = () => {
    this.props.navigation.navigate('EditProfile')
  }

  _onUpdateSigner = () => {
    this.props.navigation.navigate('JobAbonnement')
  }

  render() {
    const {
      order,
      isTracking,
      status,
      tracking,
      region,
      jobrCoordinates,
      askerCoordinates,
      shopCoordinates,
      isOffline,
      isOnline,
      requiredInfo,
      hasPlan,
    } = this.state
    const { orders, user } = this.props
    const { orderId, chatCount } = this.state.tracking
    const submitText = trackingText[status - 3]
    const currentStep = status - 3
    let toCoordinates = status === 4 ? shopCoordinates : status === 5 ? askerCoordinates : null
    const image = user?.image?.upload_path
      ? { uri: URLBase + user.image.upload_path }
      : Images.profileDefault
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} barStyle="dark-content" backgroundColor={Colors.primary} />
        <View style={styles.marginTop10} />
        {isTracking ? (
          <ToolBar
            center={I18n.t('orderTracking')}
            theme={'dark'}
            paddingEnable
            LeftComponent={
              <BackIcon
                style={styles.backIcon}
                onPress={() => this.setState({ isTracking: false })}
              />
            }
          />
        ) : (
          <ToolBar
            paddingEnable
            LeftComponent={<View />}
            CenterComponent={<Image source={Images.logoPrimary} resizeMode={'contain'} />}
            RightComponent={<Image style={styles.imageJobr} source={image} />}
          />
        )}
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <SafeAreaView />
          {!isTracking ? (
            <View style={styles.mainContainer}>
              <this._HeaderJobr />
              <TurnOnNotification
                onlineValue={isOnline}
                atHomeValue={isOffline}
                onTurnOnAtHome={this._onIsOfflineChange}
                onTurnOnOnline={this._onIsOnlineChange}
              />
              {!requiredInfo ? (
                <FlatList
                  style={styles.jobberList}
                  data={orders}
                  extraData={order}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
                  ListEmptyComponent={this._renderEmptyItemComponent}
                />
              ) : (
                <View>
                  <TextComponent multiline style={styles.requiredInfoTextHeader}>
                    Complétez votre profil pour recevoir vos premières missions
                  </TextComponent>
                  <CompletedInfo
                    user={user}
                    hasPlan={hasPlan}
                    updateInfo={this._onUpdateInfo}
                    updateJobrSkill={this._onUpdateJobrSkill}
                    updateBio={this._onUpdateBio}
                    updateLegal={this._onUpdateLegal}
                    updateSigner={this._onUpdateSigner}
                  />
                </View>
              )}
            </View>
          ) : (
            <View>
              <StatusBar barStyle="dark-content" />
              <Map
                region={region}
                status={status}
                fromCoordinates={jobrCoordinates}
                toCoordinates={toCoordinates}
                shopCoordinates={shopCoordinates}
                jobrCoordinates={jobrCoordinates}
                askerCoordinates={askerCoordinates}
              />
              <TrackingInfo
                mission={order}
                dataSource={tracking}
                currentStep={currentStep}
                onCancelOrderPress={this._onCancelOrderPress}
              />
              <ButtonComponent
                enableGradient
                onPress={this._onPressUpdateTracking}
                style={transactionStyle.submitButton}
                text={`${I18n.t('submit')} - ${submitText}`}
              />
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const JobberInfo = ({
  order,
  chatCount,
  orderChoose,
  onChatPress,
  onPressAcceptJobr,
  onPressRejectJobr,
  onPressChecking,
  isReject,
  jobber,
  onChangeMoney,
}) => {
  const user = order.order.user
  const image = Images.profileDefault
  const isAceept = order.id == orderChoose?.id
  const name = `${user?.firstname} ${user?.lastname}`
  const isYour = order.jobber_id == jobber.id
  return (
    <View style={styles.jobberInfoContainer}>
      <View style={[styles.ratingContainer, styles.marginHorizontal24, styles.margin24]}>
        <View style={styles.dpCircle}>
          <Image style={styles.dpImage} resizeMode={'cover'} source={image} />
        </View>
        <View style={styles.jobrInfo}>
          <TextComponent style={styles.name}>{name}</TextComponent>
          <View style={styles.ratingContainer}>
            <Image style={styles.starIcon} resizeMode={'contain'} source={Images.starOrange} />
            <TextComponent style={styles.rating}>{user?.avg_rating}</TextComponent>
          </View>
        </View>
        {isYour && <ChatButton style={styles.chatButton} onPress={onChatPress} />}
      </View>
      <View style={styles.divider} />
      <MissionInfoComponent onChangeMoney={onChangeMoney} mission={order.order} isYour={isYour} />
      {!isAceept && <View style={styles.divider} />}
      {isYour && !isAceept && (
        <View style={styles.actionButtons}>
          <ButtonComponent
            onPress={() => onPressRejectJobr()}
            text={I18n.t('reject')}
            style={styles.rejectBtn}
          />
          <ButtonComponent
            onPress={() => onPressAcceptJobr(order)}
            text={I18n.t('accept')}
            textStyle={{ color: Colors.white }}
            style={styles.acceptBtn}
          />
        </View>
      )}
      {isAceept && (
        <View style={styles.orderTrackingContainer}>
          <TextComponent style={styles.acceptText}>{I18n.t('accepted')}</TextComponent>
          {/* <ButtonComponent
            text={order.order.type == 4 ? I18n.t('call') : I18n.t('orderTracking')}
            enableGradient
            onPress={() => onPressChecking()}
            style={styles.orderTrackingBtn}
          /> */}
        </View>
      )}
    </View>
  )
}

const TurnOnNotification = ({ onlineValue, atHomeValue, onTurnOnOnline, onTurnOnAtHome }) => {
  return (
    <View style={styles.turnNotiContainer}>
      <TextComponent multiline={true} style={styles.turnNotiText}>
        {I18n.t('turnNoti')}
      </TextComponent>
      <View style={styles.turnOnOption}>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: '#9C9EB9', true: '#4CD964' }}
            thumbColor={Colors.white}
            ios_backgroundColor="#9C9EB9"
            value={onlineValue}
            onValueChange={onTurnOnOnline}
          />
          <TextComponent style={styles.switchText}>{I18n.t('online')}</TextComponent>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: '#9C9EB9', true: '#4CD964' }}
            thumbColor={Colors.white}
            ios_backgroundColor="#9C9EB9"
            value={atHomeValue}
            onValueChange={onTurnOnAtHome}
          />
          <TextComponent style={styles.switchText}>{I18n.t('athome')}</TextComponent>
        </View>
      </View>
    </View>
  )
}

const CompletedInfo = ({
  user,
  updateInfo,
  updateLegal,
  updateJobrSkill,
  updateBio,
  updateSigner,
  hasPlan,
}) => {
  return (
    <View style={styles.completedInfoContainer}>
      <JobrRequiredInfo
        onPress={updateInfo}
        isCheck={user.image != null}
        message={I18n.t('profileRequired')}
      />
      <JobrRequiredInfo
        onPress={updateInfo}
        isCheck={user.birthday != null}
        message={I18n.t('dobRequired')}
      />
      <JobrRequiredInfo
        onPress={updateJobrSkill}
        isCheck={user.categories && user.categories.length > 0}
        message={I18n.t('skillRequired')}
      />
      <JobrRequiredInfo
        onPress={updateLegal}
        isCheck={user.legal_id != null}
        message={I18n.t('legalRequired')}
      />
      <JobrRequiredInfo
        onPress={updateBio}
        isCheck={user.about_me != null}
        message={I18n.t('infoRequired')}
      />
      <JobrRequiredInfo
        onPress={updateSigner}
        isCheck={hasPlan}
        message={I18n.t('signerRequired')}
      />
    </View>
  )
}

const JobrRequiredInfo = ({ isCheck, message, onPress }) => {
  return (
    <View style={styles.requiredInfoContainer}>
      <View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'center' }}>
        {isCheck && <Image style={styles.doneImage} source={Images.done} />}
        <TextComponent style={styles.requiredInfoText}>{message}</TextComponent>
      </View>
      <TouchableOpacity
        style={{ flex: 0.1, justifyContent: 'center', alignItems: 'flex-end' }}
        onPress={onPress}>
        <Image source={Images.next} />
      </TouchableOpacity>
    </View>
  )
}

const TrackingInfo = ({ mission, currentStep, dataSource, onCancelOrderPress }) => {
  const { order } = mission
  return (
    <View style={[transactionStyle.trackingInfoContainer, transactionStyle.marginTop12]}>
      <View style={transactionStyle.headContainer}>
        <View style={transactionStyle.orderIdContainer}>
          <TextComponent style={transactionStyle.orderIdLabel}>
            {I18n.t('yourOrderId')}
          </TextComponent>
          <TextComponent style={transactionStyle.orderId}>{order.code}</TextComponent>
        </View>
        <ButtonComponent
          onPress={() => onCancelOrderPress()}
          text={I18n.t('cancelOrder')}
          style={transactionStyle.cancelButton}
        />
      </View>

      <View style={transactionStyle.descriptionContainer}>
        <DescriptionInfo title={I18n.t('offlineMission')} content={order.description} />
        <DescriptionInfo title={I18n.t('price')} content={formatMoney(order.cart_total)} />
      </View>
      <View style={transactionStyle.infoContainer}>
        <TrackingProgress dataSource={dataSource} currentStep={currentStep} />
      </View>
    </View>
  )
}

const DescriptionInfo = ({ title, content }) => (
  <>
    <TextComponent style={transactionStyle.titleText}>{title}</TextComponent>
    <TextComponent style={transactionStyle.detailText}>{content}</TextComponent>
  </>
)

const mapStateToProp = state => ({
  user: state.auth.user,
  orders: state.orders.orders,
  authToken: state.auth.token,
})

export default connect(mapStateToProp, {
  getOrderRequest: OrderActions.getOrderRequest,
  acceptOrderRequest: OrderActions.acceptOrderRequest,
  orderTrackingRequest: OrderActions.orderTrackingRequest,
  showLoading: LoadingActions.showLoading,
  hideLoading: LoadingActions.hideLoading,
  getCurrentPlanRequest: AuthActions.getCurrentPlanRequest,
  getNotificationRequest: NotificationActions.getNotificationRequest,
})(JobrNewMissionsScreen)
