import {StatusBar, StyleSheet, Platform} from 'react-native'
import AppStyles, {APP_COLOR} from './AppStyles'
import Sizes from '../../Themes/Sizes'
import {Colors} from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND,
  },
  lineHeight19: {
    lineHeight: Sizes.width19,
  },
  mainContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // paddingHorizontal: Sizes.width26,
  },
  marginTop34: {
    marginTop: Sizes.width34,
  },
  margin24: {
    marginTop: Sizes.width24,
    marginBottom: Sizes.width24
  },
  marginHorizontal26: {
    marginHorizontal: Sizes.width26,
  },
  marginHorizontal24: {
    marginHorizontal: Sizes.width24,
  },
  flex1: {
    flex: 1,
  },
  toolbarBackground: {
    height: Sizes.width303,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerText: {
    fontSize: Sizes.font24,
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: Sizes.width30,
    marginTop: Sizes.width61,
  },
  missionInputContainer: {
    marginTop: Sizes.width32,
    marginBottom: Sizes.width24,
    marginHorizontal: Sizes.width26,
    paddingHorizontal: Sizes.width24,
    paddingTop: Sizes.width24,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
  },
  inactiveText: {
    color: APP_COLOR.INACTIVE,
    marginTop: Sizes.width8,
    marginBottom: Sizes.width16,
  },
  descriptionContainer: {
    marginTop: Sizes.width14,
    marginBottom: 0,
    paddingBottom: Sizes.width8,
    paddingHorizontal: Sizes.width18,
  },
  neededItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizes.width68,
    marginHorizontal: Sizes.width26,
    paddingHorizontal: Sizes.width18,
    paddingVertical: Sizes.width14,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
  },
  neededItemImage: {
    height: Sizes.width60,
    width: Sizes.width80,
    marginRight: Sizes.width16,
  },
  neededItemInfo: {
    flex: 1,
    paddingRight: Sizes.width5,
  },
  neededItemQuantity: {
    color: APP_COLOR.INACTIVE,
    fontSize: Sizes.font14,
  },
  neededItemPrice: {
    color: APP_COLOR.PRIMARY,
    fontWeight: 'bold',
  },
  priceText: {
    flex: 1,
    marginLeft: Sizes.width5,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  lineOpacity: {
    width: '100%',
    height: Sizes.width1,
    marginBottom: Sizes.width16,
    backgroundColor: Colors.inActiveOpacity,
  },
  colorPrimary: {
    color: APP_COLOR.PRIMARY,
  },
  purposePriceContainer: {
    marginTop: Sizes.width34,
    marginBottom: Sizes.width20,
    alignItems: 'center',
  },
  purposePrice: {
    color: APP_COLOR.PRIMARY,
  },
  visaImage: {
    height: Sizes.width14,
    width: Sizes.width45,
    marginRight: Sizes.width12,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizes.width10,
    marginBottom: Sizes.width16,
  },
  checkoutButton: {
    marginHorizontal: Sizes.width26,
    marginTop: Sizes.width59,
    marginBottom: Sizes.width34,
  },
  missionInput: {
    height: Sizes.width92,
    paddingBottom: Sizes.width12,
    borderBottomWidth: Sizes.width1,
    borderColor: Colors.inActiveOpacity,
  },
  suggestionText: {
    color: Colors.inActive,
    fontWeight: 'bold',
    paddingVertical: Sizes.width20,
    borderBottomWidth: Sizes.width1,
    borderColor: Colors.inActiveOpacity,
  },
  orText: {
    flex: 1,
    color: Colors.inActive,
    fontWeight: 'bold',
    fontSize: Sizes.font14,
  },
  onlineMission: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Sizes.width14,
  },
  totalPriceRow: {
    flexDirection: 'row',
    marginBottom: Sizes.width16,
  },
  onlineMissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Sizes.width30,
    paddingHorizontal: Sizes.width16,
    borderRadius: Sizes.width30,
    backgroundColor: APP_COLOR.INACTIVE,
  },
  onlineMissionButtonActive: {
    backgroundColor: APP_COLOR.PRIMARY,
  },
  onlineMissionButtonInactive: {
    backgroundColor: APP_COLOR.INACTIVE,
  },
  onlineMissionTextButton: {
    color: Colors.white,
    fontSize: Sizes.font14,
    marginRight: Sizes.width10,
  },
  rightIcon: {
    height: Sizes.width10,
    width: Sizes.width14,
  },
  previousMission: {
    marginTop: Sizes.width34,
  },
  previousMissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Sizes.width20,
    marginHorizontal: Sizes.width26,
  },
  previousMissionTitle: {
    fontSize: Sizes.font20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: Sizes.font14,
    color: APP_COLOR.PRIMARY,
  },
  previousMissionItem: {
    flexDirection: 'row',
    padding: Sizes.width16,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    marginBottom: Sizes.width14,
    marginHorizontal: Sizes.width26,
    ...AppStyles.shadow,
  },
  dpIcon: {
    height: Sizes.width70,
    width: Sizes.width70,
    borderRadius: Sizes.width8,
    marginRight: Sizes.width14,
  },
  missionMessage: {
    lineHeight: Sizes.width24,
  },
  missionDate: {
    color: Colors.inActive,
    fontSize: Sizes.font14,
  },
  cameraBorder: {
    width: Sizes.width170,
    height: Sizes.width170,
    marginVertical: Sizes.width24
  },
  switchOnlineModeModal: {
    borderRadius: Sizes.width5,
    backgroundColor: 'white',
    padding: Sizes.width20,
    alignItems: 'center'
  },
  onlineButton: {
    paddingHorizontal: Sizes.width26,
  },
  textOnlineButton: {
    paddingHorizontal: Sizes.width26,
  },
  textOnlineButtonNo: {
    color: Colors.inActive
  },
  textAskOnlineMode: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: Sizes.width24,
    lineHeight: Sizes.width30
  },
  textOnlineMode: {
    color: Colors.primary,
    fontSize: Sizes.width24
  },
  marketIcon: {
    height: Sizes.width50,
    width: Sizes.width50,
  },
  marketIconContainer: {
    position: 'absolute',
    top: Sizes.width100,
    left: Sizes.width100,
  },
  marketDetailContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: Sizes.width15,
    borderTopLeftRadius: Sizes.width15,
  },
  headerLine: {
    height: Sizes.width4,
    width: Sizes.width24,
    backgroundColor: Colors.inActive,
    marginVertical: Sizes.width8,
  },
  titleLocation: {
    marginBottom: Sizes.width8,
    lineHeight: Sizes.width24,
    fontWeight: 'bold',
  },
  locationDetail: {
    fontSize: Sizes.width14,
    lineHeight: Sizes.width14,
    color: Colors.inActive,
  },
  locationStatus: {
    color: APP_COLOR.PRIMARY,
  },
  listImage: {
    marginVertical: Sizes.width34,
  },
  locationImage: {
    width: Sizes.width220,
    height: Sizes.width120,
    borderRadius: Sizes.width15,
    marginRight: Sizes.width10,
  },
  height50: {
    height: Sizes.width50,
  },
  marginLeft26: {
    marginLeft: Sizes.width26,
  },
  addressItemText: {
    paddingVertical: Sizes.width10,
  },
  addressListContainer: {
    paddingHorizontal: Sizes.width18,
    paddingVertical: Sizes.width14,
    maxHeight: Sizes.width262,
    borderRadius: Sizes.width15,
    marginTop: Sizes.width14,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
  },
  chooseTextContainer: {
    position: 'absolute',
    top: Sizes.width20,
    right: Sizes.width20,
    borderRadius: Sizes.width50,
    borderWidth: Sizes.width1,
    borderColor: APP_COLOR.PRIMARY,
    paddingHorizontal: Sizes.width10,
    paddingVertical: Sizes.width3,
  },
  chooseText: {
    color: APP_COLOR.PRIMARY,
    fontWeight: 'bold'
  },
  distanceMission: {
    marginVertical: 6,
  },
  continueButton: {
    marginHorizontal: Sizes.width26,
    marginBottom: Sizes.width34,
  },
  marginTop14: {
    marginTop: Sizes.width14,
  },
  receiverTextInput: {
    height: Sizes.width50,
    paddingHorizontal: Sizes.width18,
    borderRadius: Sizes.width15,
    backgroundColor: APP_COLOR.BACKGROUND,
    marginTop: Sizes.width20,
  },
  receiverInfo: {
    marginTop: Sizes.width34,
    paddingVertical: Sizes.width24,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  chatButton: {
    marginRight: -Sizes.width10,
    marginTop: Sizes.width10,
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: APP_COLOR.BACKGROUND, 
    paddingVertical: Sizes.width18
  },
  textHeader: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.black
  },
  totalContainer: {
    backgroundColor: Colors.white,
    paddingVertical: Sizes.width20,
    alignItems: 'center'
  },
  textTotalMission: {
    fontWeight: 'bold',
    fontSize: Sizes.font15
  },
  bodyContainer: {
    marginVertical: Sizes.width20,
    backgroundColor: Colors.white,
    borderRadius: Sizes.width15,
    marginHorizontal: Sizes.width10,
    ...AppStyles.shadow,
    paddingHorizontal: Sizes.width26
  },
  rowHeaderCard: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.inActive,
  },
  imageProfile: {
    width: Sizes.width46,
    height: Sizes.width46,
    borderRadius: Sizes.width23
  },
  iconStar: {
    width: Sizes.width20,
    height: Sizes.width20,
    resizeMode: 'contain',
  },
  btnChat: {
    width: Sizes.width70,
    height: Sizes.width70,
  },
  iconChat: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  textHeaderBody: {
    fontSize: Sizes.font17,
    fontWeight: 'bold'
  },
  rowCard: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: Sizes.width7
  },
  bodyCard: {
  },
  textRowCard: {
    fontSize: Sizes.font16,
    marginLeft: Sizes.width7
  },
  textRowMission: {
    fontSize: Sizes.font13,
    fontWeight: 'bold'
  },
  iconMarginLeft: {
    marginLeft: Sizes.width7
  },
  textBodyCard: {
    color: Colors.inActive,
    fontSize: Sizes.width16
  },
  marginLeft15: {
    marginLeft: Sizes.width15
  },
  btnCard: {
    backgroundColor: Colors.primary,
    paddingVertical: Sizes.width15,
    marginHorizontal: -Sizes.width26,
    borderBottomLeftRadius: Sizes.width15,
    borderBottomRightRadius: Sizes.width15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textBtn: {
    color: Colors.white,
    fontSize: Sizes.font16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%'
  },
  iconBtn: {
    position: 'absolute',
    right: Sizes.width26,
    width: Sizes.width20,
    height: Sizes.width20,
    resizeMode: 'contain',
  },
  footerContainerNotificaation: {
    backgroundColor: Colors.white,
    paddingVertical: Sizes.width10,
    marginBottom: Sizes.width26
  },
  rowFooter: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.width26,
    paddingTop: Sizes.width15
  },
  textFooter: {
    fontSize: Sizes.width16,
    paddingRight: Sizes.width26,
    paddingLeft: Sizes.width15
  },
  textCode: {
    fontSize: Sizes.width14,
    color: Colors.inActive,
  },
  btnAccess: {
    borderRadius: Sizes.width15,
    backgroundColor: Colors.primary,
    paddingHorizontal: Sizes.width40,
    alignItems: 'center',
    flexDirection: 'row'
  },
  fullNameContainer: {
    flex: 1, 
    paddingLeft: Sizes.width15
  }
})
