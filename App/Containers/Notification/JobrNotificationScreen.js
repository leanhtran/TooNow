import React from 'react'
import {
  Image,
  FlatList,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  AppState,
  InteractionManager,
  StatusBar,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import styles from '../Styles/NotificationStyles'
import Images from '../../Themes/Images'
import I18n from '../../I18n'
import { Colors } from '../../Themes'
import Sizes from '../../Themes/Sizes'
import NotificationActions from '../../Redux/NotificationRedux'
import OrderActions from '../../Redux/OrderRedux'
import { connect } from 'react-redux'
import { URLBase } from '../../Constants/app.constant'
import { MaterialIndicator } from 'react-native-indicators'
import SocketIOClient from 'socket.io-client'
import MapViewDirections from 'react-native-maps-directions'
import { getUserNameVoximplant, PASSWORD_VOXIMPLANT } from '../../Voximplant/manager/UserVoximplant'
import MapView, { Marker } from 'react-native-maps'
import LoadingActions from '../../Redux/LoadingRedux'
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  KEY_GOOGLE_MAP_API,
  INIT_LOCATION,
  REALTIME_URL,
  width,
  height,
  MAP_OPTIONS,
} from '../../Constants'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import ButtonComponent from '../../Components/ButtonComponent'
import transactionStyle from '../Styles/JobrTransactionStyle'
import IconTouchable from '../../Components/IconTouchable'
import TextComponent from '../../Components/TextComponent'
import { formatMoney } from '../../Common/Common'
import TrackingProgress from '../../Components/TrackingProgress'
import ToolBar from '../../Components/Toolbar'
import BackIcon from '../../Components/BackIcon'
import fbService from '../../Services/FirebaseService'

const missionImage = [Images.shopping, Images.delivery, Images.service, Images.online]
const trackingText = [
  'Mission acceptée',
  'Commande récupérée',
  'Livraison effectuée',
  'Mission terminée',
  'Mission terminée',
]

const Map = ({
  fromCoordinates,
  toCoordinates,
  region,
  askerCoordinates,
  jobrCoordinates,
  shopCoordinates,
  _onCancelTracking,
  onPressChatNow,
}) => (
  <View style={transactionStyle.mapStyle}>
    <ToolBar
      paddingEnable
      LeftComponent={<BackIcon onPress={_onCancelTracking} source={Images.backIcon} />}
      center=""
    />
    <MapView
      region={region}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      ref={c => (this.mapView = c)}>
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
          <IconTouchable source={Images.myPosition} disabled={true} style={styles.avatar} />
        </Marker>
      )}

      {// Render shop marker
      shopCoordinates && (
        <Marker coordinate={shopCoordinates}>
          <IconTouchable source={Images.marketIcon} disabled={true} style={styles.avatar} />
        </Marker>
      )}

      {// Render asker marker
      askerCoordinates && (
        <Marker coordinate={askerCoordinates}>
          <Image source={Images.profileDefault} style={styles.avatar} />
        </Marker>
      )}
    </MapView>
    <TouchableOpacity onPress={onPressChatNow} style={styles.btnChatTracking}>
      <Image source={Images.chatButton} style={styles.iconChat} />
    </TouchableOpacity>
  </View>
)

class JobrNotificationScreen extends React.Component {
  state = {
    tracking: [
      {
        step: 1,
        name: 'Mission acceptée',
        time: '12:30 pm',
        pass: true,
      },
      {
        step: 2,
        name: 'Commande récupérée',
        time: '12:40 pm',
        pass: false,
      },
      {
        step: 3,
        name: 'Livraison effectuée',
        time: '12:45 pm',
        pass: false,
      },
      {
        step: 4,
        name: 'Mission terminée',
        time: '1:30 pm',
        pass: false,
      },
    ],
    notifications: {},
    visibleLoading: true,
    pageIndex: 1,
    pageSize: 10,
    isTracking: false,
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
    isRunningBackgroundGeolocation: false,
    order: null,
    status: 4,
    item: null,
  }

  componentDidMount() {
    const params = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
    }
    this.props.getNotificationRequest(params, items => {
      this.setState({ notifications: items })
    })
    this.backgroundGeolocationConfigure()
    InteractionManager.runAfterInteractions(() => {
      this.refresh()
    })
    this.socket = SocketIOClient(REALTIME_URL, { forceNode: true })
    this.socket.on('connect', () => {
      const { authToken } = this.props

      this.socket.emit('authentication', {
        backDoor: 'bsdakjfbsF434DV34DSBjsfji83453dafbsjkSBFdafSDFSDbusdSDFSf3243ds22djfsd',
        token: authToken,
      })

      this.socket.on('authenticated', () => {
        console.log('connected')
      })

      this.socket.on('unauthorized', error => {
        console.log('connection fail', error)
      })
    })
  }

  componentWillReceiveProps() {
    console.log('notifications props', this.props.notifications)
    this.setState({
      notifications: this.props.notifications,
    })
  }

  refresh() {
    BackgroundGeolocation.getLocations(locations => {
      console.log('****', locations)
    })
  }

  backgroundGeolocationConfigure = () => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      startOnBoot: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 3000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      httpHeaders: {
        'X-FOO': 'bar',
      },
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar', // you can also add your own properties
      },
    })

    BackgroundGeolocation.getCurrentLocation(
      lastLocation => {
        this.setState({
          jobrCoordinates: lastLocation,
        })
      },
      error => {
        setTimeout(() => {
          //  Alert.alert('Error obtaining current location', JSON.stringify(error))
        }, 100)
      }
    )

    BackgroundGeolocation.on('location', location => {
      const { order } = this.state
      const position = {
        lat: location.latitude,
        lng: location.longitude,
      }
      const data = {
        order_id: order?.order_id,
        position,
      }

      this.setState({
        jobrCoordinates: location,
      })

      this.socket.emit('request_location', JSON.stringify(data))
      BackgroundGeolocation.startTask(taskKey => {
        BackgroundGeolocation.endTask(taskKey)
      })
    })

    BackgroundGeolocation.on('stationary', stationaryLocation => {
      // handle stationary locations here
      console.log('stationaryLocation', stationaryLocation)
    })

    BackgroundGeolocation.on('error', error => {
      console.log('[ERROR] BackgroundGeolocation error:', error)
    })

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started')
    })

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped')
    })

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background')
    })

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground')
    })

    BackgroundGeolocation.checkStatus(status => {
      if (!status.isRunning) {
        this.setState({ isRunningBackgroundGeolocation: !status.isRunning })
        // BackgroundGeolocation.start(); //triggers start on start event
      }
    })
  }

  _onPressChatNow = item => {
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
    this.props.navigation.navigate('ChatWithJobr', {
      order: item.mission,
      pusher: item.pusher,
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

  _onPressChatTracking = () => {
    this.props.navigation.navigate('ChatWithJobr', {
      order: this.state.order,
      pusher: this.state.item.pusher,
    })
  }

  _onPressTracking = item => {
    const { isRunningBackgroundGeolocation, tracking } = this.state
    if (item?.mission?.status > 2) {
      var i = item?.mission?.status - 3
      var j
      for (j = 0; j <= i; j++) {
        tracking[j].pass = true
      }
    }
    let askerCoordinates = null
    let shopCoordinates = null
    if (item.mission.address_to_lat != null && item.mission.address_to_lng != null) {
      const askLat = parseFloat(item.mission.address_to_lat || 0)
      const askLng = parseFloat(item.mission.address_to_lng || 0)
      askerCoordinates = {
        latitude: askLat,
        longitude: askLng,
      }
    }
    if (item.mission.address_from_lat != null && item.mission.address_from_lng != null) {
      const shopLat = parseFloat(item.mission.address_from_lat || 0)
      const shopLng = parseFloat(item.mission.address_from_lng || 0)
      shopCoordinates = {
        latitude: shopLat,
        longitude: shopLng,
      }
    }
    this.setState({
      isTracking: true,
      order: item?.mission,
      item: item,
      status: item?.mission?.status + 1,
      askerCoordinates,
      shopCoordinates,
    })
    Geolocation.getCurrentPosition(
      this._getCurrentPositionSuccess,
      this._getCurrentPositionError,
      MAP_OPTIONS
    )
    if (isRunningBackgroundGeolocation) {
      BackgroundGeolocation.start()
    }
  }

  _getCurrentPositionSuccess = info => {
    console.log('_getCurrentPositionSuccess', info)
    const currentLatitude = info.coords.latitude || INIT_LATITUDE
    const currentLongitude = info.coords.longitude || INIT_LONGITUDE
    const region = {
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      latitude: currentLatitude,
      longitude: currentLongitude,
    }
    this.setState({
      region: region,
    })
  }

  _getCurrentPositionError = error => {
    console.log(`_getCurrentPositionError (${error.code}): ${error.message}`)
  }

  _onCancelTracking = () => {
    this.setState({ isTracking: false })
    if (this.state.isRunningBackgroundGeolocation) {
      BackgroundGeolocation.stop()
    }
  }

  _onPressUpdateTracking = () => {
    const { tracking, status, order, isRunningBackgroundGeolocation, item } = this.state
    if (status == 6 && order.type != 4) {
      this.props.navigation.navigate('ShopScanQR', {
        order: order,
        askr: item.pusher,
      })
    } else {
      this.props.orderTrackingRequest(
        {
          mission_id: order.mission_id,
          status: status,
        },
        data => {
          tracking[status - 3].pass = true
          this.setState({ status: this.state.status + 1, tracking: tracking })
          if (status == 6) {
            this.props.navigation.navigate('JobrRateAskr', {
              order: order,
              askr: item.pusher,
            })
            if (isRunningBackgroundGeolocation) {
              BackgroundGeolocation.stop()
            }
          }
        }
      )
    }
  }

  _onCancelOrderPress = () => {
    this.props.orderTrackingRequest(
      {
        mission_id: this.state.order.mission_id,
        status: 1,
      },
      data => {
        const params = {
          pageIndex: this.state.pageIndex,
          pageSize: this.state.pageSize,
        }
        this.props.getNotificationRequest(params, items => {
          this.setState({ notifications: items })
        })
      }
    )
  }

  async makeCall(isVideoCall, number) {
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
            alert('MainScreen: makeCall: camera permission is not granted')
            return
          }
        } else {
          alert('MainScreen: makeCall: record audio permission is not granted')
          return
        }
      }
      this.props.navigation.navigate('Call', {
        callId: null,
        isVideo: isVideoCall,
        isIncoming: false,
        callTo: number,
      })
    } catch (e) {
      console.warn('MainScreen: makeCall failed: ' + e)
    }
  }

  _onPressVideoCall = item => {
    this.makeCall(true, item.pusher?.voximplant_user_name)
  }

  _onPressPhoneCall = item => {
    this.makeCall(false, item.pusher?.voximplant_user_name)
  }

  _onPressCompleleMission = item => {
    this.props.orderTrackingRequest(
      {
        mission_id: item.mission.mission_id,
        status: 4,
      },
      data => {
        this.props.orderTrackingRequest(
          {
            mission_id: item.mission.mission_id,
            status: 6,
          },
          data1 => {
            this.props.navigation.navigate('JobrRateAskr', {
              order: item.mission,
              askr: item.pusher,
            })
          }
        )
      }
    )
  }

  _keyExtractor = (item, index) => index.toString()

  _renderHeaderFlatList = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>{I18n.t('notification')}</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.textTotalMission}>
            {`${I18n.t('youHave')} `}
            <Text style={[styles.textTotalMission, { color: Colors.primary }]}>
              {this.state.notifications?.number_inprogress_mission || 0}
            </Text>

            {` ${I18n.t('currentMission')}`}
          </Text>
        </View>
      </>
    )
  }

  _renderItemNotify = ({ item }) => {
    const pusher = item.pusher
    const mission = item.mission

    const title =
      mission.type == 4 ? I18n.t('onlineMissionRequest') : I18n.t('offlineMissionRequest')
    const imgMission = missionImage[mission?.type - 1]
    const fullName = (pusher?.firstname || '') + ' ' + (pusher?.lastname || '')
    const avg_rating = pusher?.rating || '0'
    const code = mission?.code || ''
    const earn_money = mission?.earn_money || '0'
    const total_cart = mission?.cart_total || '0'
    const created_at = mission?.created_at?.toString()
    const hours = new Date(mission.update_at).getHours()
    const minutes = new Date(mission.update_at).getMinutes()
    const created_at_time =
      (hours < 10 ? '0' + hours : hours) + 'h' + (minutes < 10 ? '0' + minutes : minutes)
    const address_from = mission?.address_from || ''
    const address_to = mission?.address_to || ''
    const description = mission?.description || ''
    const content = mission?.content || ''

    const icon = pusher.avatar ? { uri: URLBase + pusher.avatar } : Images.profileDefault
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.bodyContainer}>
          <Text
            style={[
              styles.textCode,
              { fontWeight: 'bold', marginTop: Sizes.width5, textAlign: 'right' },
            ]}>
            {code}
          </Text>

          <View style={styles.rowHeaderCard}>
            <Image source={icon} style={styles.imageProfile} />

            <View style={styles.fullNameContainer}>
              <Text style={styles.textHeaderBody}>{fullName}</Text>

              <View style={styles.rowCard}>
                <Image source={Images.starActive} style={styles.iconStar} />

                <Text style={styles.textRowCard}>{avg_rating}</Text>
              </View>
            </View>
            {mission?.status > 1 && mission?.status < 6 && (
              <TouchableOpacity onPress={() => this._onPressChatNow(item)} style={styles.btnChat}>
                <Image source={Images.chatButton} style={styles.iconChat} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.bodyCard}>
            <View style={styles.rowCard}>
              <Text style={styles.textRowMission}>{title}</Text>

              <Image source={imgMission} style={[styles.iconStar, styles.iconMarginLeft]} />
            </View>

            <Text style={styles.textBodyCard}>{description}</Text>
            <MissinAddress mission={mission} />
            {/* <RowIconCard icon={Images.purpleLocationRadius} text={address_from} />

            <RowIconCard icon={Images.flagIc} text={address_to} /> */}

            <RowIconCard icon={Images.priceTags} text={`${earn_money} €`} />
            {mission.type == 1 && <RowIconCard icon={Images.cart} text={`${total_cart} €`} />}
            {mission?.status > 2 && mission?.status < 6 && mission.type != 4 && (
              <TouchableOpacity onPress={() => this._onPressTracking(item)} style={styles.btnCard}>
                <Text style={styles.textBtn}>{I18n.t('missionTracking')}</Text>

                <Image source={Images.whiteRightShape} style={styles.iconBtn} />
              </TouchableOpacity>
            )}
            {mission?.status > 2 && mission?.status < 6 && mission.type == 4 && (
              <View>
                <View style={styles.callContainer}>
                  <TouchableOpacity
                    style={styles.videoCallContainer}
                    onPress={() => this._onPressVideoCall(item)}>
                    <Image style={styles.videoCallIcon} source={Images.videoCall} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.phoneCallContainer}
                    onPress={() => this._onPressPhoneCall(item)}>
                    <Image style={styles.phoneCallIcon} source={Images.phoneCall} />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.completeMissionContainer}
                    onPress={() => this._onPressCompleleMission(item)}>
                    <TextComponent style={styles.completeText}>
                      {I18n.t('completeMission')}
                    </TextComponent>
                    <Image source={Images.icNext} style={styles.nextStyle} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* <View style={styles.footerContainerNotificaation}>
          <View style={styles.rowFooter}>
            <Image source={icon} style={styles.imageProfile} />

            <Text style={styles.textFooter}>{content}</Text>
          </View>

          <View
            style={[
              styles.rowFooter,
              { justifyContent: 'space-between', paddingRight: Sizes.width10 },
            ]}>
            <View style={styles.colCode}>
              <Text style={styles.textCode}>{created_at_time}</Text>

              <Text style={[styles.textCode, { fontWeight: 'bold', marginTop: Sizes.width5 }]}>
                {code}
              </Text>
            </View>

            <TouchableOpacity style={styles.btnAccess}>
              <Text style={[styles.textBtn, { width: 'auto' }]}>{I18n.t('access')}</Text>

              <Image
                source={Images.whiteRightShape}
                style={[styles.iconBtn, { right: Sizes.width10 }]}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    )
  }

  _handleLoadMore = () => {
    if (this.state.pageIndex < this.props.notifications.total_page) {
      const nextPage = this.state.pageIndex + 1
      const params = {
        pageIndex: this.state.pageIndex + 1,
        pageSize: this.state.pageSize,
      }
      this.setState({ pageIndex: nextPage })
      this.props.getNotificationRequest(params)
    } else {
      this.setState({ visibleLoading: false })
    }
  }

  render() {
    const {
      notifications,
      isTracking,
      region,
      jobrCoordinates,
      askerCoordinates,
      shopCoordinates,
      order,
      tracking,
      status,
    } = this.state
    const currentStep = status - 3
    const submitText = trackingText[status - 3]
    let toCoordinates = null
    if (order?.type == 3) {
      toCoordinates = askerCoordinates
    } else {
      toCoordinates = status === 6 ? askerCoordinates : shopCoordinates
    }
    console.log('re-render')
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.primary }} />

        <SafeAreaView style={styles.container}>
          {!isTracking ? (
            <FlatList
              style={{ flex: 1 }}
              data={notifications?.notifications}
              renderItem={this._renderItemNotify}
              keyExtractor={this._keyExtractor}
              extraData={notifications?.notifications}
              ListHeaderComponent={this._renderHeaderFlatList}
              // ListFooterComponent={<LoadingFooter visibleLoading={this.state.visibleLoading} />}
              // onEndReachedThreshold={2}
              //onEndReached={this._handleLoadMore}
            />
          ) : (
            <ScrollView ref={ref => (this.scrollView = ref)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <Map
                  region={region}
                  status={status}
                  fromCoordinates={jobrCoordinates}
                  toCoordinates={toCoordinates}
                  shopCoordinates={shopCoordinates}
                  jobrCoordinates={jobrCoordinates}
                  askerCoordinates={askerCoordinates}
                  _onCancelTracking={this._onCancelTracking}
                  onPressChatNow={this._onPressChatTracking}
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
            </ScrollView>
          )}
        </SafeAreaView>
      </>
    )
  }
}

const LoadingFooter = ({ visibleLoading }) => {
  return visibleLoading && <MaterialIndicator style={{ marginBottom: 30 }} color={Colors.primary} />
}

const RowIconCard = ({ icon, text }) => {
  return (
    <View style={styles.rowCard}>
      <Image source={icon} style={styles.iconStar} />

      <Text style={[styles.textBodyCard, styles.marginLeft15]}>{text}</Text>
    </View>
  )
}

const TrackingInfo = ({ mission, currentStep, dataSource, onCancelOrderPress }) => {
  return (
    <View style={[transactionStyle.trackingInfoContainer, transactionStyle.marginTop12]}>
      <View style={transactionStyle.headContainer}>
        <View style={transactionStyle.orderIdContainer}>
          <TextComponent style={transactionStyle.orderIdLabel}>
            {I18n.t('yourOrderId')}
          </TextComponent>
          <TextComponent style={transactionStyle.orderId}>{mission.code}</TextComponent>
        </View>
        <ButtonComponent
          textStyle={transactionStyle.cancelText}
          onPress={() => onCancelOrderPress()}
          text={I18n.t('cancelOrder')}
          style={transactionStyle.cancelButton}
        />
      </View>
      {mission.type == 1 ? (
        <View style={transactionStyle.descriptionContainer}>
          <DescriptionInfo title={I18n.t('offlineMission')} content={mission.description} />
          <DescriptionInfo
            title={I18n.t('shippingFee')}
            content={formatMoney(mission.earn_money)}
          />
          <DescriptionInfo
            title={I18n.t('totalShoppingFee')}
            content={formatMoney(mission.cart_total)}
          />
        </View>
      ) : (
        <View style={transactionStyle.descriptionContainer}>
          <DescriptionInfo title={I18n.t('offlineMission')} content={mission.description} />
          <DescriptionInfo title={I18n.t('price')} content={formatMoney(mission.earn_money)} />
        </View>
      )}
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

const MissinAddress = ({ mission }) => {
  if (mission.type == 1) {
    return (
      <View>
        <RowIconCard icon={Images.purpleStore} text={mission.address_from} />
        <RowIconCard icon={Images.flagIc} text={mission.address_to} />
      </View>
    )
  }
  if (mission.type == 2) {
    return (
      <View>
        <RowIconCard icon={Images.purpleLocationRadius} text={mission.address_from} />
        <RowIconCard icon={Images.flagIc} text={mission.address_to} />
      </View>
    )
  }
  if (mission.type == 3) {
    return (
      <View>
        <RowIconCard icon={Images.flagIc} text={mission.address_from} />
      </View>
    )
  }
  if (mission.type == 4) {
    return null
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notification.notifications,
    authToken: state.auth.token,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, {
  getNotificationRequest: NotificationActions.getNotificationRequest,
  orderTrackingRequest: OrderActions.orderTrackingRequest,
  showLoading: LoadingActions.showLoading,
  hideLoading: LoadingActions.hideLoading,
})(JobrNotificationScreen)
