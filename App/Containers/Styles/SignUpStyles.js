import { StyleSheet, Dimensions, StatusBar } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Sizes from '../../Themes/Sizes'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import ForgotPasswordStyle from './ForgotPasswordStyle'
import LoginScreenStyles from './LoginScreenStyles'
import AppStyles, { APP_COLOR, APP_SIZE } from './AppStyles'
import { sizeWidth } from '../../Themes/Metrics'

export default StyleSheet.create({
  ...ForgotPasswordStyle,
  formGenderContainer: {
    ...LoginScreenStyles.textInputContainer,
    height: Sizes.width60,
    // flexDirection: 'row',
    // alignItems: 'center',
    // borderRadius: Sizes.width15,
    // marginTop: Sizes.width14,
    // opacity: 0.7,
  },
  icon: {
    ...LoginScreenStyles.icon,
  },
  verticalLine: {
    height: '50%',
    width: Sizes.width1,
    backgroundColor: APP_COLOR.TEXT,
    opacity: 0.3,
  },
  defaultValue: {
    flex: 1,
    // color: Colors.white,
    textAlign: 'left',
  },
  opacity07: {
    opacity: 0.7,
  },
  rightIcon: {
    height: Sizes.width24,
    width: Sizes.width24,
  },
  colorTooNow: {
    tintColor: APP_COLOR.PRIMARY,
  },
  backIcon: {
    tintColor: Colors.black,
  },
  overlayView: {
    height: Sizes.width140,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gpsIcon: {
    height: Sizes.width60,
    width: Sizes.width60,
    marginBottom: Sizes.width8,
    alignSelf: 'flex-end',
  },
  gpsIconContainer: {
    alignSelf: 'flex-end',
  },
  myPositionIcon: {
    height: Sizes.width58,
    width: Sizes.width58,
    position: 'absolute',
    alignSelf: 'center',
    top: Sizes.width200,
  },
  searchAddressContainer: {
    marginTop: Sizes.width36,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
  },
  searchCategoriesInput: {
    marginTop: Sizes.width18,
    height: Sizes.width50,
    borderRadius: Sizes.width15,
    marginBottom: Sizes.width42,
    borderColor: '#F4F5F9',
  },
  textInput: {
    ...LoginScreenStyles.textInput,
    paddingLeft: Sizes.width20,
    color: APP_COLOR.TEXT,
  },
  textInputPhone: {
    ...LoginScreenStyles.textInput,
    paddingLeft: Sizes.width20,
  },
  textInputCode: {
    // color: Colors.white,
    height: Sizes.width60,
    width: Sizes.width60,
    paddingHorizontal: Sizes.width6,
  },
  iconSearch: {
    height: Sizes.width24,
    width: Sizes.width24,
    marginHorizontal: Sizes.width18,
  },
  circleActive: {
    height: Sizes.width10,
    width: Sizes.width10,
    borderRadius: Sizes.width10,
    backgroundColor: APP_COLOR.PRIMARY,
    marginHorizontal: Sizes.width12,
  },
  circleInActive: {
    backgroundColor: APP_COLOR.INACTIVE,
  },
  circleContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenTextInput: {
    flex: 0,
    width: 1, // to fix a bug showing keyboard on android, set width: 0 will not show keyboard for the first time
    color: 'transparent',
    paddingLeft: 0,
    paddingRight: 0,
  },
  resendText: {
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: Sizes.width24,
  },
  whiteColor: {
    color: Colors.black,
    opacity: 0.7,
  },
  resendContainer: {
    justifyContent: 'center',
    marginTop: Sizes.width34,
  },
  textButtonInactive: {
    color: APP_COLOR.TEXT,
  },
  textButtonActive: {
    color: Colors.white,
  },
  buttonStyle: {
    width: Sizes.width155,
    height: Sizes.width40,
    marginBottom: Sizes.width18,
    backgroundColor: APP_COLOR.PRIMARY,
  },
  pinkButton: {
    backgroundColor: Colors.pinkee,
  },
  levelButton: {
    width: Sizes.width101,
  },
  buttonActive: {
    backgroundColor: APP_COLOR.PRIMARY,
    ...AppStyles.shadow,
  },
  buttonInactive: {
    borderWidth: Sizes.width1,
    borderColor: APP_COLOR.BORDER,
    backgroundColor: Colors.white,
  },
  footerCategories: {
    marginBottom: Sizes.width34,
    marginTop: Sizes.width40,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  categoriesTitle: {
    fontSize: Sizes.font24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: Sizes.width34,
    marginBottom: Sizes.width40,
  },
  headerSpeciality: {
    color: APP_COLOR.INACTIVE,
    textAlign: 'center',
    marginBottom: Sizes.width15,
    marginTop: Sizes.width10,
  },
  marginBottomItemCategory: {
    marginBottom: Sizes.width22,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBarText: {
    color: APP_COLOR.TEXT,
    fontSize: APP_SIZE.TOOLBAR_TEXT,
  },
  titleTextInfo: {
    fontSize: APP_SIZE.TITLE,
    fontWeight: 'bold',
    marginTop: Sizes.width24,
    marginBottom: Sizes.width14,
  },
  marginTop6: {
    marginTop: Sizes.width6,
  },
  addInfoContainer: {
    flex: 1,
    marginTop: Sizes.width13,
  },
  confirmButton: {
    flexDirection: 'row',
    width: Sizes.width150,
    height: Sizes.width50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.width15,
    borderWidth: Sizes.width1,
  },
  confirmButtonActive: {
    borderColor: APP_COLOR.PRIMARY,
  },
  confirmButtonInActive: {
    borderColor: APP_COLOR.INACTIVE,
  },
  textInActive: {
    color: APP_COLOR.INACTIVE,
  },
  iconConfirm: {
    height: Sizes.width24,
    width: Sizes.width24,
    marginRight: Sizes.width12,
  },
  confirmButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionContainer: {
    height: Sizes.width128,
    lineHeight: Sizes.width24,
    backgroundColor: APP_COLOR.BACKGROUND,
    paddingHorizontal: Sizes.width18,
    paddingVertical: Sizes.width18,
    borderRadius: Sizes.width15,
  },
  validateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizes.width34,
    marginBottom: Sizes.width20,
  },
  stepHeaderContainer: {
    flexDirection: 'row',
    height: Sizes.width6,
    marginHorizontal: -Sizes.width26,
  },
  map: {
    flex: 1,
  },
  toolbar: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    width: Dimensions.get('window').width,
  },
  searchAddress: {
    position: 'absolute',
    top: Sizes.width70,
    left: Sizes.width28,
    right: Sizes.width28,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width10,
    height: Sizes.width50,
    borderRadius: Sizes.width15,
    ...AppStyles.shadow,
  },
  addressItemText: {
    paddingVertical: Sizes.width10,
  },
  addressListContainer: {
    position: 'absolute',
    top: Sizes.width130,
    left: Sizes.width28,
    right: Sizes.width28,
    paddingHorizontal: Sizes.width18,
    paddingVertical: Sizes.width14,
    maxHeight: Sizes.width262,
    borderRadius: Sizes.width15,
    marginTop: Sizes.width14,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
  },
  condition: {
    fontSize: Sizes.font11,
    color: Colors.black,
    opacity: 0.7,
    textAlign: 'center',
  },
  termLink: {
    fontSize: Sizes.font11,
    color: Colors.primary,
  },
  termAndCondition: {
    marginHorizontal: Sizes.width30,
    marginTop: Sizes.width40,
  },
  primageryText: {
    color: Colors.primary,
  },
  footerGender: {
    marginHorizontal: Sizes.width55,
    marginTop: Sizes.width47,
  },
  phoneTuto: {
    marginTop: Sizes.width15,
    marginHorizontal: Sizes.width28,
  },
  phone: {
    fontSize: Sizes.font14,
    color: Colors.black,
    opacity: 0.7,
    textAlign: 'center',
  },
  footerPhone: {
    marginHorizontal: Sizes.width55,
    marginTop: Sizes.width20,
  },
  skipPhone: {
    alignItems: 'flex-end',
    marginRight: Sizes.width28,
    marginTop: Sizes.width23,
  },
  skipPhoneText: {
    fontSize: Sizes.font16,
    color: Colors.inActive,
    opacity: 0.7,
  },
  noted: {
    alignItems: 'flex-start',
    marginTop: Sizes.width25,
    marginHorizontal: Sizes.width25,
  },
  notedText: {
    fontWeight: '500',
    fontSize: Sizes.font14,
    color: Colors.black,
    opacity: 0.7,
  },
  footerAddress: {
    marginHorizontal: Sizes.width20,
    position: 'absolute',
    bottom: Sizes.width20,
    width: Dimensions.get('window').width - Sizes.width20 * 2,
  },
  contentTextVerify: {
    color: Colors.black,
    textAlign: 'center',
    marginHorizontal: Sizes.width27,
    marginTop: Sizes.width10,
    opacity: 0.7,
  },
  didReceive: {
    textAlign: 'center',
    color: Colors.black,
    opacity: 0.7,
    marginTop: Sizes.width26,
  },
  signUpSuccessBg: {
    backgroundColor: Colors.primary,
  },
  titleTextSuccess: {
    fontWeight: '500',
    fontSize: Sizes.font24,
    color: Colors.white,
    marginHorizontal: Sizes.width70,
    textAlign: 'center',
    marginTop: Sizes.width55,
  },
  contentTextSuccess: {
    textAlign: 'center',
    fontSize: Sizes.font16,
    color: Colors.white,
    marginHorizontal: Sizes.width70,
    opacity: 0.7,
  },
  footerSuccess: {
    paddingHorizontal: Sizes.width26,
    position: 'absolute',
    bottom: Sizes.width20,
    width: Dimensions.get('window').width,
  },
  topView: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width26,
    marginTop: Sizes.width22,
    paddingTop: Sizes.width18,
    paddingBottom: Sizes.width15,
    marginBottom: Sizes.width13,
  },
  topViewText: {
    textAlign: 'left',
    fontSize: Sizes.font14,
    color: Colors.black,
    lineHeight: Sizes.width17,
  },
  backgroudSignUpJobrColor: {
    backgroundColor: '#F4F5F9',
  },
  toolBarStyle: {
    width: '100%',
    textAlign: 'left',
  },
  footerSignUp: {
    backgroundColor: Colors.primary,
  },
  footerText: {
    color: Colors.white,
  },
  detailContainer: {
    backgroundColor: Colors.white,
    marginTop: Sizes.width20,
  },
  addInfoText: {
    borderRadius: Sizes.width15,
    backgroundColor: '#F4F5F9',
    fontSize: Sizes.font16,
    lineHeight: Sizes.width24,
    height: Sizes.width128,
    padding: Sizes.width18,
    paddingTop: Sizes.width18,
    paddingBottom: Sizes.width18,
  },
  listCategeriesContainer: {
    backgroundColor: Colors.white,
    marginBottom: Sizes.width18,
    width: Dimensions.get('window').width,
    paddingHorizontal: Sizes.width26,
    paddingBottom: Sizes.width18,
  },
  drivingLicense: {
    paddingHorizontal: Sizes.width26,
    marginBottom: Sizes.width24,
    marginTop: Sizes.width12,
    backgroundColor: Colors.white,
    paddingBottom: Sizes.width17,
    paddingTop: Sizes.width17,
  },
  addCategory: {
    borderStyle: 'dashed',
    borderWidth: 1,
    opacity: 0.5,
    width: Sizes.width155,
    height: Sizes.width40,
    marginBottom: Sizes.width18,
    backgroundColor: Colors.inActive,
  },
  categoriesParent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.width13,
  },
  parentText: {
    textAlign: 'left',
    fontSize: Sizes.width14,
    flex: 0.9,
  },
  parentNext: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  subCategories: {
    backgroundColor: Colors.white,
    marginTop: Sizes.width23,
    paddingTop: Sizes.width13,
  },
  checked: {
    width: Sizes.width16,
    height: Sizes.width16,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.width5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: Sizes.width11,
    height: Sizes.width8,
  },
  notCheck: {
    width: Sizes.width16,
    height: Sizes.width16,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderRadius: Sizes.width5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Sizes.width1_5,
  },
  checkboxContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  errorMessage: {
    fontWeight: '500',
    fontSize: Sizes.width14,
    textAlign: 'center',
    color: '#F77777',
  },
  errorContainer: {
    width: Dimensions.get('window').width,
    height: Sizes.width60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4DCDC',
    marginTop: Sizes.width10,
  },
  bottomLinePrimary: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: Sizes.width2
  },
  viewWarning: {
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: Sizes.width15,
    borderTopWidth: Sizes.width4,
    borderColor: Colors.warning,
    marginTop: Sizes.width10,
    marginHorizontal: Sizes.width35,
    flexDirection: 'row'
  },
  textWarning: {
    fontWeight: 'bold', 
    color: Colors.warning,
    fontSize: Sizes.font18
  },
  iconClose: {
    width: Sizes.width20,
    height: Sizes.width20,
    resizeMode: 'contain',
    marginLeft: Sizes.width10
  }
})
