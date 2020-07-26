import { StyleSheet, Platform, StatusBar } from "react-native";
import { ApplicationStyles, Colors } from "../../Themes";
import Sizes from "../../Themes/Sizes";
import AppStyles, { APP_COLOR } from './AppStyles'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: Colors.white
  },
  container: {
    flex: 1
  },
  cardList: {
    marginVertical: Sizes.width34
  },
  separator: {
    height: Sizes.width24
  },
  cardItem: {
    flexDirection: "row",
    paddingHorizontal: Sizes.width26
  },
  addCardBtn: {
    marginVertical: Sizes.width24
  },
  cardImageBg: {
    marginRight: Sizes.width18,
    width: Sizes.width100,
    height: Sizes.width60,
    borderRadius: Sizes.width15,
    borderWidth: 0.75,
    borderColor: Colors.cardTypeBorder,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center"
  },
  cardName: {
    fontSize: Sizes.font16,
    fontWeight: "500",
    color: Colors.textBlack,
    textTransform: 'capitalize'
  },
  cardNumber: {
    fontSize: Sizes.font14,
    color: APP_COLOR.INACTIVE
  },
  addCardImage: {
    width: Sizes.width100,
    marginRight: Sizes.width18
  },
  addCardText: {
    fontSize: Sizes.font16,
    color: Colors.textBlack
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: APP_COLOR.BACKGROUND, 
    paddingVertical: Sizes.width18
  },
  textHeader: {
    fontSize: Sizes.font20,
    fontFamily: 'Rubik-Medium',
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.black
  },
  textEmptyCard: {
    fontWeight: 'bold',
    fontSize: Sizes.font17
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  checkCardData: {
    backgroundColor: Colors.white,
    paddingVertical: Sizes.width10,
    alignItems: 'center'
  },
  availableCardContainer: {
    alignItems: 'center'
  },
  textTotal: {
    color: Colors.primary,
    fontSize: Sizes.font32,
    fontWeight: 'bold',
  },
  textAvailable: {
    fontWeight: 'bold',
    fontSize: Sizes.font14
  },
  cardIBAN: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.width15,
    marginHorizontal: Sizes.width26,
    ...AppStyles.shadow,
    height : Sizes.width191,
    // marginTop: Sizes.width20,
    // flex: 1,
    justifyContent: 'center',
    paddingTop: Sizes.width5
  },
  listCardContainer: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.width15,
    marginHorizontal: Sizes.width20,
    ...AppStyles.shadow,
    // marginTop: Sizes.width20,
    // flex: 1,
    alignItems : 'center',
    paddingTop: Sizes.width5
  },
  headerCard: {
    justifyContent: 'space-around',
    flex: 1
  },
  textHeaderCard: {
    fontSize: Sizes.font20,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily : 'Rubik-Medium',
    paddingHorizontal: Sizes.width37,
    marginTop : Sizes.width13,
    marginBottom : Sizes.width15
  },
  btnEditCard: {
    flexDirection: 'row',
    paddingLeft: Sizes.width56,
    paddingVertical: Sizes.width15,
    alignItems: 'center'
  },
  textEditCard: {
    color: Colors.primary,
    fontSize: Sizes.font16,
    fontFamily : 'Rubik-Medium',
    marginRight : Sizes.width15,
    fontWeight: '500',
  },
  iconPurpleRight: {
    width: Sizes.width8,
    height: Sizes.width16,
    resizeMode: 'contain'
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  btnTranfer: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: Sizes.width15,
    paddingVertical: Sizes.width5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTranfer: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Sizes.font14,
    textAlign: 'center',
    paddingHorizontal: Sizes.width40
  },
  iconWhiteRight: {
    width: Sizes.width15,
    height: Sizes.width15,
    resizeMode: 'contain',
    position: 'absolute',
    right: Sizes.width5
  },
  btnHistory: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: Sizes.width15,
    paddingVertical: Sizes.width5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  textHistory: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: Sizes.font14,
    textAlign: 'center',
    paddingHorizontal: Sizes.width25
  },
  iconAddButton: {
    width: Sizes.width100,
    height : Sizes.width60
  },
  btnAdd: {
    height: '33%',
    alignSelf: 'center',
  },
  textAddPayment: {
    textAlign: 'center',
    fontSize: Sizes.font16,
    paddingHorizontal: Sizes.width90,
    marginBottom: Sizes.width15,
    marginTop: Sizes.width15
  },
  bodyContainer: {
    flex: 1,
    paddingTop: Sizes.width15,
    paddingBottom: Sizes.width30
  },
  rowCard: {
    flexDirection: 'row',
    paddingLeft : Sizes.width37,
    paddingRight : Sizes.width26,
    marginBottom : Sizes.width24
  },
  imageCardContainer: {
    borderColor: Colors.inActive,
    borderWidth: Sizes.width1,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height : Sizes.width60,
    width : Sizes.width100
  },
  imageCard: {
    resizeMode: 'contain',
    height: Sizes.width36,
    width : Sizes.width60
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dotStyle: {
    width: Sizes.width5,
    height: Sizes.width5,
    resizeMode: 'contain',
    marginRight: Sizes.width2
  },
  nameCardContainer: {
    width: '65%',
    justifyContent : 'center',
    paddingLeft: Sizes.width15,
  },
  textNameCard: {
    fontSize: Sizes.font16,
    fontWeight: 'bold',
  },
  textNumberCard: {
    color: Colors.inActive
  },
  btnAddInRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAddInRow: {
    fontSize: Sizes.font15
  }
});
