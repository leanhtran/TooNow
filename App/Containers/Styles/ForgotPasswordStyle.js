import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'
import Sizes from '../../Themes/Sizes'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex0: {
    flex: 0,
  },
  container: {
    paddingHorizontal: Sizes.width26,
  },
  topView: {
    marginTop: Sizes.width35,
  },
  titleText: {
    fontSize: Sizes.font24,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginHorizontal: Sizes.width47,
  },
  titleSignUp : {
    fontSize: Sizes.font30,
    fontWeight: '500',
    lineHeight : Sizes.width36,
    color: Colors.black,
    textAlign: 'center',
    marginHorizontal: Sizes.width70
  },
  titleSignUpStep : {
    fontSize: Sizes.font24,
    fontWeight: '500',
    fontFamily : 'Rubik-Medium',
    lineHeight : Sizes.width36,
    color: Colors.black,
    textAlign: 'center',
  },
  contentText: {
    color: Colors.black,
    textAlign: 'center',
    marginHorizontal: Sizes.width70,
    marginTop: Sizes.width22,
    marginBottom: Sizes.width40,
    opacity: 0.7,
  },
  footer: {
    marginHorizontal : Sizes.width35,
    marginTop : Sizes.width47
  },
  textInputContainer: {
    marginTop: Sizes.width110,
  },
  textInputCodeContainer: {
    marginTop: 0,
    borderWidth : 1,
    borderColor : Colors.primary,
    borderRadius : Sizes.width15,
    marginHorizontal : Sizes.width26
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconTooNow: {
    height: Sizes.width27,
    width: '100%',
  },
  backIcon : {
    tintColor : Colors.black
  },
  inputEmail:{
    borderBottomWidth : 1,
    borderBottomColor : '#9C9EB9',
    marginHorizontal : Sizes.width35,
    padding : Sizes.width5
  },
  marginHoz:{
    marginHorizontal : Sizes.width28
  },
  LineBreak:{
    borderBottomColor : "#2D3142",
    borderBottomWidth : 1,
    marginHorizontal : Sizes.width120,
    marginTop : Sizes.width20,
    opacity : 0.4
  },
  headerContainer: {
    paddingHorizontal: Sizes.width26,
    marginTop: Sizes.width10
  }
})
