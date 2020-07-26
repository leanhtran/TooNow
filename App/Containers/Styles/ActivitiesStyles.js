import { StyleSheet } from 'react-native'
import HomeStyles from './HomeStyles'
import NotificationStyles from './NotificationStyles'
import { Colors, Fonts } from '../../Themes'
import Sizes from '../../Themes/Sizes'
import { APP_COLOR } from './AppStyles'
import colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...HomeStyles,
  ...NotificationStyles,
  headerActivities: {
    backgroundColor: APP_COLOR.BACKGROUND,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: Sizes.width15,
    marginBottom: Sizes.width20,
    marginHorizontal: Sizes.width26,
  },
  tab: {
    flex: 1,
    height: Sizes.width40,
    backgroundColor: APP_COLOR.BACKGROUND,
  },
  leftTab: {
    borderBottomLeftRadius: Sizes.width20,
    borderTopLeftRadius: Sizes.width20,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  rightTab: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: Sizes.width20,
    borderTopRightRadius: Sizes.width20,
  },
  blackText: {
    color: APP_COLOR.TEXT,
    fontWeight: 'normal',
  },
  normalText: {
    fontWeight: 'normal',
  },
  marginTop12: {
    marginTop: Sizes.width12,
  },
  statusText: {
    fontSize: Sizes.font14,
    color: APP_COLOR.INACTIVE,
    fontWeight: 'bold',
    paddingVertical: Sizes.width6,
    paddingHorizontal: Sizes.width18,
    borderRadius: Sizes.width20,
    borderWidth: Sizes.width1,
    borderColor: APP_COLOR.INACTIVE,
  },
  dpIcon: {
    height: Sizes.width50,
    width: Sizes.width50,
    borderRadius: Sizes.width8,
    marginRight: Sizes.width16,
  },
  borderOffline: {
    width: '100%',
    height: Sizes.width1,
    backgroundColor: Colors.inActiveOpacity,
  },
  distanceTitle: {
    fontWeight: 'bold',
  },
  iconCircle: {
    height: Sizes.width12,
    width: Sizes.width12,
    // marginRight: Sizes.width11,
  },
  distanceContainer: {
    marginVertical: Sizes.width18,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashLine: {
    height: Sizes.width6,
    width: Sizes.width0_75,
    marginVertical: Sizes.width2,
    // marginLeft: Sizes.width6,
    backgroundColor: Colors.inActiveOpacity50,
  },
  marginLeft17: {
    marginLeft: Sizes.width17,
  },
  marginLeft23: {
    marginLeft: Sizes.width23,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  distanceText: {
    color: APP_COLOR.INACTIVE,
    fontSize: Sizes.font14,
  },
  viewCalendars: {
    alignItems: 'center', 
    backgroundColor: 'white', 
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: '#f4f5f9',
    paddingTop: 15,
    height: 90,
  },
  viewTextDay: {
    flexDirection: 'column'
  },
  textDay: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'monospace'
  },
  textHeaderCalendar: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  btnDay: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    // backgroundColor: colors.primary,
    borderRadius: 15,
    height: 30,
    width: 30
  },
  totalPriceMissions: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingBottom: 12
  },
  textTotal: {
    fontSize: 33,
    fontWeight: 'bold',
    color: colors.primary
  },
  textTotalMissions: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  imageCalendar: {
    width: 22,
    height: 24
  },
  btnCalendar: {
    height: 40,
    width: 40,
    position: 'absolute',
    right: 15,
    top: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHistory: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    marginTop: 40,
    alignSelf: 'center',
  },
  imageBack: {
    width: 45,
    height: 25,
    resizeMode: 'contain',
  },
  btnBack: {
    width: 50,
    marginTop: 40,
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowCalendar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 10,
  },
  calendar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    color: colors.black,
    fontSize: 16,
  },
  date: {
    marginTop: 10,
    width: 40,
    height: 40,
    fontWeight: 'normal',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
},
  dateSelected: {
    marginTop: 10,
    width: 40,
    height: 40,
    fontWeight: 'normal',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  dateText: {
    color: colors.inActive,
    fontFamily: Fonts.type.base
  },
  dateTextSelected: {
    color: colors.white,
    fontFamily: Fonts.type.base
  },
  imageTick: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 8
  },
  textMissionsCompleted: {
    fontWeight: '500',
    fontSize: 16
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15
  },
  imageLocation: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  iconContainer: {
    width: 45,
    alignItems: 'center'
  },
  textDetailMissions: {
    fontSize: 15,
    color: Colors.inActive,
    lineHeight: 28
  },
  bodyContainer: {
    marginLeft: Sizes.width26,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.lightGrey,
    paddingLeft: 19,
    paddingBottom: 3,
    paddingTop: 5
  },
  btnRate: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    backgroundColor: Colors.primary,
    borderRadius: 10
  },
  btnStar: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 10
  },
  textBtnRate: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 15
  }
})
