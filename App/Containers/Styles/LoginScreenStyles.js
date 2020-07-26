import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { sizeWidth } from '../../Themes/Metrics'
import Colors from '../../Themes/Colors'
import Sizes from '../../Themes/Sizes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.width25,
  },
  safeAreaView: {
    flex: 1
  },
  topView: {
    alignItems: 'center',
  },
  loginWith: {
    fontSize: Sizes.font24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizes.width14,
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.width10,
  },
  marginTop6: {
    marginTop: Sizes.width15,
  },
  logoView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: Sizes.width100,
    width: Sizes.width120,
  },
  logoTextTooNow: {
    width: Sizes.width170,
    height: Sizes.width40,
  },
  logoSocial: {
    height: Sizes.width50,
    width: Sizes.width50,
    marginHorizontal: Sizes.width9,
  },
  icon: {
    height: Sizes.width13,
    width: Sizes.width13,
    marginRight: Sizes.width30,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Sizes.width26,
    justifyContent: 'space-around',
  },
  headerText: {
    marginLeft: Sizes.width12,
    fontWeight: 'bold',
    color: 'black',
  },
  logoText: {
    fontSize: Sizes.width36,
    color: '#5509eb',
    textAlign: 'center',
    marginTop: Sizes.width18,
  },
  account: {
    color: Colors.white,
    opacity: 0.7
  },
  forgotPasswordText: {
    color: Colors.white,
    textAlign: 'center',
  },
  signUpText: {
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: Sizes.width7,
  },
  loginSocialContainer: {
    flexDirection: 'row',
    marginTop: Sizes.width12,
  },
  signUpContainer: {
    flexDirection: 'row',
  },
  footer: {
    alignItems: 'center',
    marginBottom: Sizes.width10,
  },
  textInput: {
    flex: 1,
    height: Sizes.width40,
    paddingRight: Sizes.width20,
  },
  centerInput: {
    textAlign: 'left',
    paddingRight: Sizes.width30,
  },
  orText: {
    color: Colors.white,
    fontSize: Sizes.font14,
    marginHorizontal: Sizes.width13,
  },
  line: {
    height: Sizes.width1,
    width: Sizes.width80,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    marginTop: Sizes.width14,
  },
  headerImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizes.width38,
    width: '100%',
  },
  imageJobr: {
    height: Sizes.width42,
    width: Sizes.width90,
    resizeMode: 'contain'
  },
  btnBack: {
    width: Sizes.width43,
    height: Sizes.width43,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  imageBack: {
    width: Sizes.width22,
    height: Sizes.width22,
    resizeMode: 'contain'
  },
  textLogin: {
    fontSize: Sizes.width30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1,
  },
  bodyContainer: {
    alignItems: 'center',
  },
  btnLogin: {
    borderRadius: Sizes.width10,
    backgroundColor: Colors.primary,
    height: Sizes.width43,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textBtnLogin: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Sizes.font15
  },
  textOr: {
    textAlign: 'center',
    marginVertical: Sizes.width7
  },
  btnFB: {
    borderRadius: Sizes.width10,
    backgroundColor: Colors.lightBlue,
    height: Sizes.width43,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Sizes.width10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageFB: {
    width: Sizes.width80,
    height: Sizes.width18,
    resizeMode: 'contain'
  },
  imageGG: {
    width: Sizes.width80,
    height: Sizes.width35,
    resizeMode: 'contain'
  },
  imageApple: {
    width: Sizes.width80,
    height: Sizes.width32,
    resizeMode: 'contain'
  },
  textBtnFB: {
    color: Colors.white,
    fontWeight: 'bold'
  },
  textBtnGG: {
    color: Colors.black,
    fontWeight: 'bold'
  },
  textForgotPassword: {
    width: '100%',
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: Sizes.font14,
  },
  inputContainer: {
    width: '100%',
  },
  icTextInput :{
    width: Sizes.width18,
    height: Sizes.width18,
    resizeMode: 'contain',
    marginBottom: Sizes.width5,
    marginLeft: Sizes.width5,
    marginRight: Sizes.width28
  },
  btnFooterContainer: {
    width: '100%',
  },
  btnForgotPassword: {
    width: '100%'
  },
  orContent: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  grayLine: {
    height: 1, 
    backgroundColor: Colors.darkGrey, 
    width: '30%'
  },
  backIcon : {
    tintColor : Colors.black
  }
})
