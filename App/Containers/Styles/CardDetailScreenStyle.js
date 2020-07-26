import { StyleSheet, Platform, StatusBar } from "react-native";
import { ApplicationStyles, Colors } from "../../Themes";
import Sizes from "../../Themes/Sizes";
import { APP_COLOR } from "./AppStyles";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: Colors.white
  },
  deleteButton: {
    backgroundColor: Colors.white,
    borderWidth: Sizes.width1,
    borderColor: Colors.primary,
    marginVertical: Sizes.width34
  },
  card: {
    marginTop: Sizes.width34
  },
  cardVR: {
    borderRadius: Sizes.width8,
    paddingHorizontal: Sizes.width24,
    paddingVertical: Sizes.width16
  },
  image: {
    maxHeight: Sizes.width24
  },
  cardNumber: {
    textAlign: "center",
    marginTop: Sizes.width39,
    marginHorizontal: -Sizes.width24,
    fontSize: Sizes.font22,
    letterSpacing: Sizes.width3,
    lineHeight: Sizes.width26,
    color: Colors.white,
  },
  cardInfo: {
    marginTop: Sizes.width26,
    flexDirection: "row"
  },
  cardInfoLabel: {
    fontSize: Sizes.font10,
    fontWeight: "500",
    lineHeight: Sizes.width12,
    textTransform: "uppercase",
    color: Colors.white,
    opacity: 0.5
  },
  cardInfoText: {
    marginTop: Sizes.width8,
    fontSize: Sizes.font16,
    lineHeight: Sizes.width19,
    textTransform: "uppercase",
    color: Colors.white
  },
  cardHolder: {
    width: Sizes.width198
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND, 
    paddingBottom: Sizes.width17
  },
  textHeader: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.black
  },
  noteContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width26,
    paddingVertical: Sizes.width5,
  },
  textTitleNote: {
    fontWeight: 'bold',
    fontSize: Sizes.font15
  },
  textDetailNote: {
    color: Colors.inActive,
    fontSize: Sizes.font14,
    marginTop: Sizes.width5
  },
  rowFullName: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  birthDayContainer: {
    height: 65,
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderColor: '#A1A2AB',
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
  btnValidate: {
    marginVertical: Sizes.width26,
    paddingHorizontal: Sizes.width26
  },
  itemTransactionContainer: {
    paddingHorizontal: Sizes.width26,
    backgroundColor: Colors.white,
  },
  itemTransaction: {
    paddingVertical: Sizes.width20,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: APP_COLOR.BACKGROUND,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  imageCash: {
    width: Sizes.width25,
    height: Sizes.width25,
    resizeMode: 'contain'
  },
  circleCash: {
    width: Sizes.width40,
    height: Sizes.width40,
    borderRadius: Sizes.width35,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: APP_COLOR.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailTransactionContainer: {
    paddingHorizontal: Sizes.width15,
    flex: 1
  },
  textDateTransaction: {
    color: Colors.inActive,
    marginTop: Sizes.width5
  },
  titleDetail: {
    fontSize: Sizes.font15
  },
  textEarnMoneyTransaction: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: Sizes.font16
  }
});
