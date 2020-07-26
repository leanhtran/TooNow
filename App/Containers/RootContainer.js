import React, {Component} from 'react'
import {View, StatusBar, AppState} from 'react-native'
import firebase from 'react-native-firebase'

import ReduxNavigation from '../Navigation/ReduxNavigation'
import {connect} from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import AppNavigation from '../Navigation/AppNavigation'

// Styles
import styles from './Styles/RootContainerStyles'
import {Images} from '../Themes'
import Sizes from '../Themes/Sizes'
import IconTouchable from '../Components/IconTouchable'
import LoadingView from '../Components/LoadingView'
import NavigationService from '../Navigation/NavigationService'
import OrderActions from '../Redux/OrderRedux'
import NotificationActions from '../Redux/NotificationRedux'

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    this.createNotificationListeners();
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase.notifications().onNotification(this.handleRecivedMessage)

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => this.handleRecivedMessage(notificationOpen.notification))

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
      this.handleRecivedMessage(notificationOpen.notification)
    }
  }

  handleRecivedMessage = ({ title, body }) => {
    this.checkNotify(title, body)
  }


  checkNotify = (title, body) => {
    if (title == 'Nouvelle mission' || title == 'Vous avez une nouvelle mission disponible') {
      this.updateOrders()
    }
    this.updateNotifications()
  }

  updateOrders = () => {
    const { getOrderRequest, getNotificationRequest} = this.props;

    getOrderRequest()
  }

  updateNotifications = () =>{
    const { getNotificationRequest} = this.props;
    getNotificationRequest()
  }

  _onPressHome = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          translucent
          barStyle='light-content'
          backgroundColor={'transparent'}
        />
        {/*<ReduxNavigation />*/}
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
        {this.props.fetching && <LoadingView/>}
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapStateToProps = state => ({
  fetching: state.loading.fetching
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  getOrderRequest: () => dispatch(OrderActions.getOrderRequest()),
  getNotificationRequest : () =>dispatch(NotificationActions.getNotificationRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
