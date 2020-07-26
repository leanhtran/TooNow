import { StyleSheet, Dimensions } from 'react-native'
import Sizes from '../../Themes/Sizes'
import { Colors, ApplicationStyles, Fonts } from '../../Themes'
import HomeStyles from './HomeStyles'
import AppStyles, { APP_COLOR } from './AppStyles'
import colors from '../../Themes/Colors'

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  ...HomeStyles,
  toolbarBackground: {
    height: Sizes.width303,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  dpContainer: {
    ...ApplicationStyles.flexDirectionRow,
    paddingTop: Sizes.width34,
    paddingBottom: Sizes.width18,
  },
  dpCircle: {},
  dpImage: {
    height: Sizes.width40,
    width: Sizes.width40,
    borderRadius: Sizes.width20,
  },
  jobrInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: Sizes.width14,
  },
  name: {
    fontSize: Sizes.font18,
    lineHeight: Sizes.width21,
    fontWeight: '500',
    fontFamily : 'Rubik-Light'
  },
  jobberMissonContainer: {
    marginTop: Sizes.width82,
    paddingHorizontal: Sizes.width26,
    height: Sizes.width197,
    flexDirection: 'column',
  },
  totalMissionContainer: {
    paddingVertical: Sizes.width20,
    backgroundColor: Colors.white,
    flex: 1,
    borderTopLeftRadius: Sizes.width15,
    borderTopRightRadius: Sizes.width15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTotalNumber: {
    fontSize: Sizes.width40,
    lineHeight: Sizes.width47,
    color: Colors.activeDotColor,
    fontWeight: '500',
    fontFamily : 'Rubik-Light'
  },
  textTotalUnit: {
    color: Colors.activeDotColor,
  },
  textStatusUnit: {
    color: Colors.white,
  },
  textStatusNumber: {
    fontSize: Sizes.width24,
    lineHeight: Sizes.width28,
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily : 'Rubik-Light'
  },
  textStatistic: {
    fontSize: Sizes.width16,
    lineHeight: Sizes.width19,
    fontFamily : 'Rubik-Light'
  },
  detailMissionContainer: {
    ...ApplicationStyles.flexDirectionRow,
    paddingVertical: Sizes.width20,
    paddingHorizontal: Sizes.width40,
    flex: 1,
    borderBottomLeftRadius: Sizes.width15,
    borderBottomRightRadius: Sizes.width15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white,
    justifyContent: 'center',
  },
  missionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobberList: {
    marginTop: Sizes.width38,
  },
  ratingContainer: {
    ...ApplicationStyles.flexDirectionRow,
  },
  starIcon: {
    height: Sizes.width16,
    width: Sizes.width16,
  },
  jobberStar: {
    color: Colors.starColor,
  },
  rating: {
    fontSize: Sizes.font16,
    lineHeight: Sizes.width19,
    marginLeft: Sizes.width8,
    fontFamily : 'Rubik-Light'
  },
  customSpecialityContainer: {
    marginTop: Sizes.width24,
  },
  trackingInfoContainer: {
    padding: Sizes.width24,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: Sizes.width6,
    alignItems: 'center',
  },
  estimateContainer: {
    flexDirection: 'row',
  },
  estimate: {
    fontSize: Sizes.font24,
    fontWeight: '500',
    lineHeight: Sizes.width28,
    fontFamily : 'Rubik-Light'
  },
  line: {
    height: 1.5,
    width: Sizes.width80,
  },
  toPosition: {
    height: Sizes.width34,
    width: Sizes.width34,
  },
  distanceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Sizes.width36,
  },
  distance: {
    fontSize: Sizes.font24,
    lineHeight: Sizes.width28,
    color: Colors.inActive,
    fontFamily : 'Rubik-Light'
  },
  distanceUnit: {
    fontSize: Sizes.font16,
    color: Colors.inActive,
    fontFamily : 'Rubik-Light'
  },
  address: {
    width: Sizes.width101,
    fontSize: Sizes.font14,
    color: Colors.inActive,
    fontFamily : 'Rubik-Light'
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Sizes.width34,
  },
  jobrHeaderContainer: {
    paddingTop: Sizes.width34,
    paddingBottom: Sizes.width18,
    alignItems: 'center',
  },
  textJobrTitle: {
    color: Colors.white,
    fontSize: Sizes.font18,
    lineHeight: Sizes.width30,
    fontWeight: '500',
    fontFamily : 'Rubik-Light'
  },
  textJobrDes: {
    color: Colors.white,
    fontSize: Sizes.font14,
    lineHeight: Sizes.width17,
    opacity: 0.7,
    marginTop: Sizes.width4,
    fontFamily : 'Rubik-Light'
  },
  jobberInfoContainer: {
    marginHorizontal: Sizes.width26,
    marginBottom: Sizes.width24,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
  },
  divider: {
    height: Sizes.width1,
    backgroundColor: Colors.inActive,
    opacity: 0.2,
  },
  specialityContainer: {
    marginBottom: Sizes.width9,
  },
  specilityTitle: {
    fontSize: Sizes.font14,
    lineHeight: Sizes.width17,
    fontWeight: '500',
    fontFamily : 'Rubik-Light'
  },
  specialityDes: {
    color: APP_COLOR.INACTIVE,
    lineHeight: Sizes.width19,
    marginTop: Sizes.width8,
  },
  jobberFooter: {
    ...ApplicationStyles.flexDirectionRow,
    marginTop: Sizes.width24,
    justifyContent: 'space-between',
  },
  priceContainer: {
    marginTop: Sizes.width8,
    ...ApplicationStyles.flexDirectionRow,
  },
  priceBtnContainer: {
    ...ApplicationStyles.flexDirectionRow,
    paddingHorizontal: Sizes.width10,
    height: Sizes.width24,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.inActive,
    marginLeft: Sizes.width24,
    borderRadius: Sizes.width12,
  },
  textPriceBtn: {
    fontSize: Sizes.width12,
    lineHeight: Sizes.width14,
    color: Colors.inActive,
    fontFamily : 'Rubik-Light'
  },
  priceIcon: {
    marginLeft: 2,
    width: Sizes.width11,
    height: Sizes.width11,
  },
  rejectBtn: {
    flex: 1,
    borderBottomLeftRadius: Sizes.width15,
    height : Sizes.width40
  },
  acceptBtn: {
    backgroundColor : Colors.primary,
    flex: 1,
    borderRadius : 0,
    borderBottomRightRadius : Sizes.width15,
    height : Sizes.width40
  },
  chatBtn: {},
  separator: {
    height: Sizes.width24,
  },
  noRequestContainer: {
    marginHorizontal: Sizes.width26,
    backgroundColor: Colors.white,
    alignItems: 'center',
    height: Sizes.width350,
    shadowColor: '#9729ea',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderRadius: Sizes.width15,
    marginBottom: Sizes.width10,
  },
  noRequestText: {
    fontFamily: Fonts.type.bold,
    fontSize: Sizes.font24,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginTop: Sizes.width15,
    fontFamily : 'Rubik-Light'
  },
  textNoRequest: {
    fontSize: Sizes.width24,
    lineHeight: Sizes.width30,
    color: Colors.inActive,
    fontFamily : 'Rubik-Light'
  },
  headerContainer: {
    marginTop: Sizes.height40,
    marginHorizontal: Sizes.width26,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  imageJobr: {
    width: Sizes.width40,
    height: Sizes.width40,
    borderRadius: Sizes.width20,
  },
  sayHello: {
    fontSize: Sizes.font22,
    fontFamily: Fonts.type.bold,
    color: colors.black,
    fontWeight: '500',
    fontFamily : 'Rubik-Light'
  },
  nameJobr: {
    color: colors.primary,
  },
  greetingText: {
    fontSize: Sizes.font14,
    fontFamily: Fonts.type.base,
    color: colors.black,
    fontFamily : 'Rubik-Light'
  },
  noMissionImage: {
    width: Sizes.width220,
    height: Sizes.width220,
    marginTop: Sizes.width17,
  },
  acceptMissionText: {
    fontWeight: 'bold',
    fontSize: Sizes.font14,
    fontFamily: Fonts.type.base,
    color: Colors.primary,
    fontFamily : 'Rubik-Light'
  },
  acceptMissionContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEDDFC',
  },
  orderTrackingBtn: {
    width: Sizes.width243,
  },
  orderTrackingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#EEDDFC",
    paddingHorizontal : Sizes.width20,
    height : Sizes.width40,
    borderBottomLeftRadius : Sizes.width15,
    borderBottomRightRadius : Sizes.width15
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  },
  chatBtnTracking: {
    position: 'absolute',
    right: Sizes.width5,
    bottom: Sizes.width5,
  },
  backIcon: {
    tintColor: Colors.black,
  },
  avatar: {
    height: Sizes.width30,
    width: Sizes.width30,
    borderRadius: Sizes.width30,
    marginTop: Sizes.width40,
    alignSelf: 'center',
  },
  marginTop10: {
    marginTop: Sizes.width10,
  },
  turnNotiText: {
    fontSize: Sizes.width13,
    fontFamily : 'Rubik-Light'
  },
  turnNotiContainer: {
    marginHorizontal: Sizes.width26,
    backgroundColor: Colors.white,
    borderRadius: Sizes.width15,
    padding: Sizes.width10,
    marginTop: Sizes.width15,
    shadowColor: '#9729ea',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  turnOnOption: {
    flexDirection: 'row',
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'flex-start',
  },
  switchText:{
    fontSize : Sizes.width14,
    marginLeft : Sizes.width10,
    fontFamily : 'Rubik-Light'
  },
  chatButton : {
    resizeMode: 'contain',
    width : Sizes.width50,
    height : Sizes.width50
  },
  chatIcon : {
    height : Sizes.width50,
    width : Sizes.width50
  },
  descriptionTitle: {
    flexDirection : 'row',
    alignItems : 'center'
  },
  missionTypeIcon : {
    marginLeft : Sizes.width12
  },
  actionButtons : {
    flexDirection : 'row',
    borderWidth : 1,
    borderColor : Colors.primary,
    borderStyle : 'solid',
    borderBottomLeftRadius : Sizes.width15,
    borderBottomRightRadius: Sizes.width15,
  },
  acceptText : {
    fontSize : Sizes.font16,
    fontWeight : '500',
    color : Colors.primary,
    fontFamily : 'Rubik-Light'
  },
  modifyPrice : {
    marginBottom : Sizes.width20
  },
  viewHeader: {
    width,
  },
  icZoom: {
    width: Sizes.width24,
    aspectRatio: 1
  },
  btnChatFooter: {
    alignSelf: 'flex-end',
    width: Sizes.width50,
    aspectRatio: 1,
    marginTop: 'auto',
    margin: Sizes.width20,
  },
  imgChat: {
    width: 400,
    aspectRatio: 1,
  },
  viewCount: {
    width: Sizes.width18,
    aspectRatio: 1,
    borderRadius: Sizes.width18,
    backgroundColor: '#2D3142',
    position: 'absolute',
    top: Sizes.width4,
    right: - Sizes.width8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtCountChat: {
    fontSize: Sizes.width10,
    color: '#FFF'
  },
  marker: {
    width: Sizes.width34,
    aspectRatio: 1,
  },
  completedInfoContainer: {
    marginHorizontal : Sizes.width26,
    backgroundColor : Colors.white,
    borderRadius: Sizes.width15,
    paddingTop: Sizes.width20,
    paddingBottom : Sizes.width7,
    paddingHorizontal : Sizes.width16,
    marginTop: Sizes.width15,
    marginBottom : Sizes.width20,
    shadowColor: '#9729ea',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  requiredInfoContainer:{
    flexDirection : 'row',
    marginBottom : Sizes.width13
  },
  doneImage : {
    width : Sizes.width14,
    height : Sizes.width9,
    marginRight: Sizes.width8
  },
  requiredInfoTextHeader : {
    fontSize : Sizes.font18,
    fontFamily : 'Rubik-Light',
    fontWeight : '500',
    textAlign : 'center',
    marginHorizontal : Sizes.width26,
    color : Colors.primary,
    marginTop : Sizes.width28,
    marginBottom : Sizes.width16
  },
  requiredInfoText : {
    fontSize : Sizes.font14,
    fontFamily : 'Rubik-Medium',
    fontWeight : 'normal',
    color : Colors.black
  }
})
