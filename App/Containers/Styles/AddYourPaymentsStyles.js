import { StatusBar, StyleSheet } from 'react-native'
import AppStyles, { APP_COLOR } from './AppStyles'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND, 
    paddingBottom: Sizes.width17
  },
  bodyContainer: {
    paddingVertical: Sizes.width15,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width15
  },
  birthDayContainer: {
    height: 64,
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderColor: '#A1A2AB',
    width: '47%',
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
  rowDatePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputCVV: {
    width: '47%',
  },
  buttonContainer: {
    marginVertical: Sizes.width20,
    paddingHorizontal: Sizes.width15
  },
  bodyEditMasterCard: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width26,
    paddingTop: Sizes.width30
  },
  cardContainer: {
    borderRadius: Sizes.width15,
    padding: Sizes.width20,
  },
  imageSwitch: {
    width: Sizes.width70,
    height: Sizes.width30,
    resizeMode: 'contain'
  },
  imageCardIcon: {
    width: Sizes.width70,
    height: Sizes.width40,
    resizeMode: 'contain'
  },
  rowHeaderEditCard: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  numberCard: {
    flexDirection: 'row',
    paddingVertical: Sizes.width10
  },
  textNumberCard: {
    flex: 1,
    textAlign: 'center',
    fontSize: Sizes.font20,
    color: Colors.white
  },
  textTitleName: {
    color: '#BB8BF9',
    textTransform: 'uppercase'
  },
  footerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Sizes.width10
  },
  btnFooter: {
    paddingVertical: Sizes.width15,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: Sizes.width15,
    alignItems: 'center',
    marginTop: Sizes.width26
  },
  textBtn: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: Sizes.font15
  }
})