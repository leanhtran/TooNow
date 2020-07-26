import {StyleSheet} from 'react-native'
import Sizes from '../../Themes/Sizes'
import colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonStart: {
    marginHorizontal: Sizes.width26,
    marginBottom: Sizes.width10,
    marginTop: - Sizes.width25
  },
  headerContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    height: '33%',
    width: '110%',
    alignSelf: 'center',
    // flex: 1,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    justifyContent: 'space-evenly',
  },
  imageHeader: {
    width: 193, 
    height: 138.71, 
    resizeMode: 'contain',
  },
  textHeader: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'

  },
  textUpperCaseHeader: {
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  imageBg: {
    width : '80%',
    height : '100%',
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  scrollView: {
    flex: 1
  },
  btnFB: {
    borderRadius: 10,
    backgroundColor: colors.lightBlue,
    height: 45,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnContainer: {
    alignItems: 'center',
    paddingBottom: Sizes.width10,
  },
  textBtnFB: {
    color: colors.white,
    fontWeight: 'bold'
  },
  textBtnGG: {
    color: colors.black,
    fontWeight: 'bold'
  },
  imageFB: {
    width: 110,
    height: 20,
    resizeMode: 'contain'
  },
  imageGG: {
    width: 110,
    height: 40,
    resizeMode: 'contain'
  },
  imageApple: {
    width: 110,
    height: 35,
    resizeMode: 'contain'
  },
  imageMail: {
    width: 110,
    height: 18,
    resizeMode: 'contain'
  },
  btnPass: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPass :{
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    color: colors.grey
  },
  bodyContainer:{
    width: '100%',
    height: '33%',
    justifyContent : 'center',
    alignItems : 'center'
  }
})
