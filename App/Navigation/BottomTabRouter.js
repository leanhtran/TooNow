import React from 'react'
import {Image, View} from 'react-native'
import {
  createBottomTabNavigator,
} from 'react-navigation'
import CardManagementScreen from '../Containers/CardManagement/CardManagementScreen'
import ActivitiesScreen from '../Containers/Activities/ActivitiesScreen'
import HomeScreen from '../Containers/Home/HomeScreen'
import NotificationScreen from '../Containers/Notification/NotificationScreen'
import ProfileScreen from '../Containers/Profile/ProfileScreen'
import Images from '../Themes/Images'
import {APP_COLOR} from '../Containers/Styles/AppStyles'
import styles from './Styles/NavigationStyles'
import Sizes from '../Themes/Sizes'
import Colors from '../Themes/Colors'
import TabBarBottom from './BottomTabBar'
import IconWithBadge from './IconWithBadge'
import JobrNewMissionsScreen from '../Containers/Home/JobrNewMissionsScreen'
import JobrNotificationScreen from '../Containers/Notification/JobrNotificationScreen'
import JobrTransactionScreen from '../Containers/Activities/JobrTransactionScreen'

export const BottomTabRouter = createBottomTabNavigator(
  {
    CardManagement: {
      screen: CardManagementScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          const image = focused ? Images.cardActive : Images.card
          return (
            <TabIcon source={image}/>
          )
        }
      },
    },
    Activities: {
      // ASKR
      // screen: ActivitiesScreen,

      // JOBR
      screen: JobrTransactionScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          const image = focused ? Images.activitiesActive : Images.activities
          return (
            <TabIcon source={image}/>
          )
        }
      },
    },
    Home: {
      // ASKR
      // screen: HomeScreen,

      // JOBR
      screen: JobrNewMissionsScreen,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <View />
          )
        }
      },
    },
    Notification: {
      // ASKR
      // screen: NotificationScreen,

      // JOBR
      screen: JobrNotificationScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          const image = focused ? Images.notificationActive : Images.notification
          return (
            <IconWithBadge source={image} badgeCount={0}/>
          )
        }
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          const image = focused ? Images.profileActive : Images.profile
          return (
            <TabIcon source={image}/>
          )
        }
      },
    },
  },
  {
    tabBarComponent: props => <TabBarBottom {...props} />,
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    backBehavior: 'none',
    swipeEnabled: false,
    lazy: false,
    tabBarOptions: {
      activeTintColor: APP_COLOR.ACTIVE_BOTTOM_TAB,
      inactiveTintColor: APP_COLOR.INACTIVE_BOTTOM_TAB,
      showLabel: false,
      style: {
        backgroundColor: APP_COLOR.BOTTOM_TAB_BAR,
        height: Sizes.width46,
        borderTopColor: Colors.lightGrey,
      },
      tabStyle: {
        // justifyContent: 'flex-end',
        // alignItem: 'flex-end',
        // marginLeft: 1,
        // backgroundColor: 'red'
      }
    },
  },
)

const TabIcon = ({source}) => (
  <Image
    source={source}
    style={styles.tabIcon}
    resizeMode={'contain'}
  />
)
