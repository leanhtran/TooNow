import {StatusBar, StyleSheet} from 'react-native'
import HomeStyles from './HomeStyles'
import AppStyles, {APP_COLOR} from './AppStyles'
import Sizes from '../../Themes/Sizes'
import {ApplicationStyles, Colors} from '../../Themes'

export default StyleSheet.create({
  ...HomeStyles,
  separator: {
    width: '100%',
    height: Sizes.width12,
  },
  notificationItemContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width26,
  },
  jobrNotificationItemContainer: {
    paddingHorizontal: Sizes.width26,
    marginTop: Sizes.width18,
  },
  notificationHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.inActiveOpacity,
    paddingVertical: Sizes.width18
  },
  titleHeader: {
    color: APP_COLOR.INACTIVE,
    fontSize: Sizes.font14,
  },
  codeText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  statusText: {
    color: APP_COLOR.PRIMARY,
  },
  cancelText: {
    color: Colors.orangef7,
  },
  priceText: {
    flex: 1,
    color: APP_COLOR.PRIMARY,
    marginLeft: Sizes.width10,
    fontWeight: 'bold',
  },
  bodyItemContainer: {
    flexDirection: 'row',
    marginVertical: Sizes.width18,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dpIcon: {
    height: Sizes.width40,
    width: Sizes.width40,
    borderRadius: Sizes.width20,
    marginRight: Sizes.width16,
  },
  jobberMissionContainer: {
    marginHorizontal: Sizes.width26,
    marginTop: Sizes.width58,
  },
  totalMissionContainer: {
    height: Sizes.width106,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: Sizes.width15,
    borderTopRightRadius: Sizes.width15,
  },
  textTotalNumber: {
    fontSize: Sizes.width40,
    lineHeight: Sizes.width47,
    color: APP_COLOR.PRIMARY,
    fontWeight: '500'
  },
  textTotalUnit: {
    color: APP_COLOR.PRIMARY,
  },
  textStatusUnit: {
    color: Colors.white
  },
  textStatusNumber: {
    fontSize: Sizes.width24,
    lineHeight: Sizes.width28,
    fontWeight: '500',
    // alignSelf: 'center'
  },
  textStatistic: {
    fontSize: Sizes.width16,
    lineHeight: Sizes.width19,
  },
  detailMissionContainer: {
    height: Sizes.width91,
    ...ApplicationStyles.flexDirectionRow,
    justifyContent: 'center',
    // paddingVertical: Sizes.width20,
    // paddingHorizontal: Sizes.width40,
    borderBottomLeftRadius: Sizes.width15,
    borderBottomRightRadius: Sizes.width15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white,
  },
  missionContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dashLine: {
    height: 1.5,
    width: Sizes.width80,
    marginTop: -Sizes.width12,
  },
  missionDoing: {
    marginTop: Sizes.width38,
    marginHorizontal: Sizes.width26,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Sizes.width15,
    borderTopRightRadius: Sizes.width15,
    ...AppStyles.shadow,
  },
  additionStyle: {
    borderRadius: Sizes.width15,
    marginBottom: Sizes.width20,
  },
  askrInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.width24,
    borderBottomWidth: 1,
    borderColor: Colors.inActiveOpacity,
  },
  askrDp: {
    height: Sizes.width40,
    width: Sizes.width40,
    borderRadius: Sizes.width20,
    marginRight: Sizes.width14,
  },
  star: {
    height: Sizes.width16,
    width: Sizes.width16,
    marginRight: Sizes.width8,
  },
  nameText: {
    fontSize: Sizes.font18,
    lineHeight: Sizes.width21,
    fontWeight: '500',
  },
  addressTitle: {
    fontSize: Sizes.font14,
    lineHeight: Sizes.width17,
    fontWeight: 'bold',
    marginTop: Sizes.width24,
    marginHorizontal: Sizes.width24,
  },
  addressText: {
    marginTop: Sizes.width8,
    lineHeight: Sizes.width19,
    color: APP_COLOR.INACTIVE,
    marginHorizontal: Sizes.width24,
  },
  flatListContainer: {
    backgroundColor: Colors.primaryLighter,
    ...AppStyles.shadow,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: Sizes.width10,
    paddingBottom: Sizes.width18,
    borderBottomWidth: Sizes.width1,
    borderColor: Colors.white,
  },
  boldText: {
    fontWeight: 'bold',
  },
  primaryText: {
    color: APP_COLOR.PRIMARY,
    fontWeight: 'bold',
    marginLeft: Sizes.width30,
  },
  ratingNumber: {
    fontSize: Sizes.font16,
    lineHeight: Sizes.width19,
  },
  btnChatTracking : {
    width : Sizes.width70,
    height : Sizes.width70,
    position : 'absolute',
    bottom : Sizes.width33,
    right : Sizes.width33
  },
  videoCallIcon :{
    width : Sizes.width30,
    height : Sizes.width20
  },
  phoneCallIcon : {
    width : Sizes.width20,
    height : Sizes.width20
  },
  callContainer : {
    height : Sizes.width50,
    justifyContent : 'space-between',
    flexDirection : 'row',
    backgroundColor : Colors.primary,
    marginHorizontal: -Sizes.width26,
    borderTopLeftRadius : Sizes.width10,
    borderTopRightRadius : Sizes.width10,
  },
  videoCallContainer : {
    flex : 0.5,
    justifyContent : 'center',
    alignItems : 'center',
    borderRightWidth : 1,
    borderColor : 'black'
  },
  phoneCallContainer : {
    flex : 0.5,
    justifyContent : 'center',
    alignItems : 'center',
  },
  nextStyle : {
    height : Sizes.width16,
    width : Sizes.width8,
    position : 'absolute',
    top : Sizes.width14,
    right : Sizes.width26
  },
  completeMissionContainer : {
    height : Sizes.width45,
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection : 'row',
    borderWidth : 1,
    borderColor : Colors.primary,
    marginHorizontal: -Sizes.width26,
    borderBottomLeftRadius : Sizes.width10,
    borderBottomRightRadius : Sizes.width10,
  },
  completeText : {
    fontSize : Sizes.font16,
    fontFamily : 'Rubik-Light',
    color : Colors.primary
  },
  avatar : {
    width : Sizes.width34,
    height : Sizes.width34,
    borderRadius : Sizes.width17
  }
})
