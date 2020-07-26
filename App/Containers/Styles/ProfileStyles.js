import {StyleSheet, StatusBar, Platform} from 'react-native'
import HomeStyles from './HomeStyles'
import Sizes from '../../Themes/Sizes'
import {Colors} from '../../Themes'
import AppStyles, {APP_COLOR, APP_SIZE} from './AppStyles'

export default StyleSheet.create({
  ...HomeStyles,
  dpContainer: {
    paddingTop: Sizes.width37,
    paddingBottom: Sizes.width24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  dpContainerEdit: {
    paddingTop: Sizes.width34,
    backgroundColor: Colors.white,
  },
  dpCircle: {
    height: Sizes.width62,
    width: Sizes.width62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.width62,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  dpImage: {
    height: Sizes.width56,
    width: Sizes.width56,
    borderRadius: Sizes.width28,
  },
  name: {
    fontSize: Sizes.font18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: Sizes.width10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    height: Sizes.width16,
    width: Sizes.width16,
  },
  rating: {
    fontSize: Sizes.font18,
    color: Colors.black,
    marginLeft: Sizes.width8,
  },
  generalInfoContainer: {
    marginHorizontal: Sizes.width26,
    padding: Sizes.width24,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
    marginTop: 15
  },
  generalInfoContainerEdit: {
    marginTop: Sizes.width12,
    paddingHorizontal: Sizes.width26,
    paddingVertical: Sizes.width24,
    backgroundColor: Colors.white,
  },
  titleInfo: {
    fontSize: APP_SIZE.TITLE,
    fontWeight: 'bold',
  },
  contentInfo: {
    color: APP_COLOR.INACTIVE,
    marginTop: Sizes.width8,
  },
  marginTop24: {
    marginTop: Sizes.width24,
  },
  navigationContainer: {
    marginTop: Sizes.width15,
    marginBottom: Sizes.width14,
    paddingTop: 10,
    paddingHorizontal: Sizes.width30,
    backgroundColor: Colors.white
  },
  textTouchContainer: {
    alignSelf: 'flex-start',
  },
  navigationText: {
    color: Colors.black,
  },
  logoutButton: {
    backgroundColor: APP_COLOR.BACKGROUND,
    borderWidth: Sizes.width1,
    borderColor: APP_COLOR.PRIMARY,
    marginBottom: Sizes.width34,
  },
  logoutContainer: {
    flex: 1,
    paddingHorizontal: 26,
  },
  saveButtonContainer: {
    marginTop: Sizes.width20,
    marginBottom: Sizes.width10,
  },
  logoutText: {
    color: APP_COLOR.PRIMARY,
    fontWeight: 'bold',
  },
  whiteBackground: {
    backgroundColor: Colors.white,
  },
  blackIcon: {
    tintColor: APP_COLOR.TEXT,
  },
  dpImageEdit: {
    height: Sizes.width100,
    width: Sizes.width100,
    borderRadius: Sizes.width50,
  },
  changeDpText: {
    fontSize: Sizes.font16,
    color: APP_COLOR.PRIMARY,
    marginTop: Sizes.width18,
  },
  textInputInfo: {
    height: Sizes.width50,
    fontSize: Sizes.font16,
    marginTop: Sizes.width14,
    paddingHorizontal: Sizes.width18,
    backgroundColor: APP_COLOR.BACKGROUND,
    borderRadius: Sizes.width15,
  },
  headerContainer: {
    paddingVertical: Sizes.width18,
    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
  },
  textHeader: {
    fontSize: Sizes.font20,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily : 'Rubik-Medium',
    color: Colors.black
  },
  imageRight: {
    resizeMode: 'contain',
    width: 15,
    height: 15
  },
  btnNavigation: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15, 
    justifyContent: 'space-between'
  },
  birthDayContainer: {
    height: 65,
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderColor: '#A1A2AB',
  },
  addressContainer: {
    height: 70,
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderColor: '#A1A2AB',
    width: '100%'
  },
  emailContainer: {
    height: 65,
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderColor: '#A1A2AB',
    width: '100%'
  },
  textLabelBirthDay: {
    color: '#A1A2AB',
    fontSize: 12,
    marginBottom: 5
  },
  textBirthDay: {
    color: Colors.black,
    marginBottom: 10,
    fontSize: 15
  },
  textLabelAddress: {
    color: '#A1A2AB',
    fontSize: 12,
    marginBottom: 5
  },
  textAddress: {
    marginBottom: 10,
    fontSize: Sizes.font13,
    marginRight: Sizes.width15,
    flex: 1
  },
  footerContainer: {
    marginTop: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: Sizes.width26,
    width: '100%',
    paddingBottom: 20,
    paddingTop: Sizes.width10
  },
  imageLocation: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  imageLocationRadius: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  imageShapeRight: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  rowLocation: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  textHowToChangeEmail :{
    marginTop: 10
  },
  btnAdd: {
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    width: 150,
    height: 50,
    backgroundColor: APP_COLOR.BACKGROUND,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  skillContainer: {
    width: '100%',
    marginTop: 20
  },
  textAdd :{
    color: Colors.primary,
    fontSize: 17
  },
  aboutMeContainer :{
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20
  },
  headerEditContainer: {
    backgroundColor: APP_COLOR.BACKGROUND, 
    paddingBottom: 18
  },
  imageExclamation: {
    width: Sizes.width22,
    height: Sizes.width22,
  },
  imageExclamationContainer: {
    right: Sizes.width9,
    top: Sizes.width9,
    position: 'absolute',
  },
  listSkillContainer : {
    flexWrap : 'wrap',
  },
  skillButton : {
    width : Sizes.width155,
    height : Sizes.width70,
    borderRadius : Sizes.width10,
    backgroundColor : Colors.background,
    padding : Sizes.width5
  },
  skillText : {
    fontSize : Sizes.font16,
    fontFamily : 'Rubik-Light',
    fontWeight : 'normal',
    color : Colors.black
  },
  btnDelete: {
    paddingVertical: Sizes.width5,
    marginTop: Sizes.width20,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingLeft: Sizes.width10
  },
  textBtnDelete: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: Sizes.font14,
  },
  modalDeleteContainer: {
    flex: 1,
    backgroundColor: Colors.windowTint,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalAbort: {
    paddingTop: Sizes.width5,
    backgroundColor: Colors.white,
    width: '90%',
    borderRadius: Sizes.width15,
    alignItems: 'center'
  },
  iconClose: {
    width: Sizes.width20,
    height: Sizes.width20,
    resizeMode: 'contain'
  },
  btnCloseModal: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: Sizes.width10,
  },
  iconWarning: {
    width: Sizes.width30,
    height: Sizes.width30,
    resizeMode: 'contain'
  },
  textQuestionModal: {
    color: Colors.black,
    paddingHorizontal: Sizes.width40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Sizes.font19,
    marginTop: Sizes.width5
  },
  textPopup: {
    color: Colors.primary,
    paddingHorizontal: Sizes.width30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Sizes.font19,
    marginTop: Sizes.width5
  },
  rowButtonPopup: {
    flexDirection: 'row',
    marginTop: Sizes.width20
  },
  btnCancel: {
    paddingVertical: Sizes.width15,
    borderColor: Colors.primary,
    borderWidth: 1,
    flex: 1,
    borderBottomLeftRadius: Sizes.width15,
    alignItems: 'center'
  },
  btnSubmit: {
    paddingVertical: Sizes.width15,
    backgroundColor: Colors.primary,
    flex: 1,
    borderBottomRightRadius: Sizes.width15,
    alignItems: 'center'
  },
  textButtonModal: {
    fontWeight: 'bold',
    fontSize: Sizes.width15,
    color: Colors.primary
  }
})
