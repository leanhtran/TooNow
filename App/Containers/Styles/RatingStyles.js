import { StyleSheet } from "react-native";
import HomeStyles from "./HomeStyles";
import NotificationStyles from "./NotificationStyles";
import ProfileStyles from "./ProfileStyles";
import { Colors } from "../../Themes";
import Sizes from "../../Themes/Sizes";
import AppStyles, { APP_COLOR } from "./AppStyles";

export default StyleSheet.create({
  ...HomeStyles,
  ...ProfileStyles,
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  blackIcon: {
    tintColor: APP_COLOR.TEXT
  },
  textDefault: {
    fontSize: Sizes.font20,
    lineHeight: Sizes.font28,
    color: Colors.white,
  },
  textPrice: {
    fontSize: Sizes.font30,
    lineHeight: Sizes.font48,
    color: Colors.white,
    fontWeight: "bold",
    marginHorizontal: Sizes.width10
  },
  avatar: {
    height: Sizes.width60,
    width: Sizes.width60,
    borderRadius: Sizes.width30,
    marginTop: Sizes.width20,
    alignSelf: "center"
  },
  cardContainer: {
    height: Sizes.width150,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  imageCardStyle: {
    borderRadius: Sizes.width15
  },
  textUnderAvatar: {
    alignSelf: "center",
    marginTop: Sizes.width12
  },
  rating: {
    paddingVertical: Sizes.width24
  },
  commentInput: {
    backgroundColor: Colors.background,
    borderRadius: Sizes.width15,
    paddingVertical: Sizes.width24,
    padding: Sizes.width24,
    height: Sizes.width100,
    textAlignVertical: 'center'
  },
  contentContainer: {
    // padding: Sizes.font26,
    width: '100%'
  },
  headerRatingContainer: {
    paddingBottom: Sizes.width18,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  imageActor: {
    width: '12%',
    height: '60%',
    resizeMode: 'contain',
    position: 'absolute',
    left: Sizes.width50,
  },
  cardBody: {
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  youGotContainer :{
    paddingVertical: Sizes.width8,
    alignItems: 'center'
  },
  ticketContainer: {
    backgroundColor: APP_COLOR.BACKGROUND,
    paddingHorizontal: Sizes.width26
  },
  ticket :{
    padding: Sizes.width15,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
    marginVertical: Sizes.width15
  },
  rowPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Sizes.width10
  },
  textRowPrice: {
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
    fontSize: Sizes.width14
  },
  textTitleRowPrice :{
    flex: 3,
    fontSize: Sizes.width14
  },
  rowTotal :{
    paddingTop: Sizes.width10,
    borderTopWidth: 0.5,
    borderColor: Colors.inActive
  },
  commentContainer: {
    paddingHorizontal: Sizes.width26
  },
  btnContainer: {
    backgroundColor: APP_COLOR.BACKGROUND,
    marginTop: Sizes.width15,
    paddingBottom: Sizes.width15,
    flexDirection: 'row',
    width: '100%',
  },
  btnSave: {
    width: '50%',
    borderBottomRightRadius: Sizes.width10,
    height: Sizes.width45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  btnCancel :{
    width: '50%',
    borderBottomLeftRadius: Sizes.width10,
    height: Sizes.width45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  textBtn: {
    fontSize: Sizes.width15,
    fontWeight: '500'
  },
  footerRateContainer: {
    paddingVertical: Sizes.width15,
    paddingHorizontal: Sizes.width26,
    flexDirection: 'row',
    height: Sizes.width100,
    alignItems: 'center'
  },
  textTitleFooter :{
    fontWeight: '500',
    fontSize: Sizes.width15
  },
  textFooterContainer :{
    flex: 3,
  },
  imageContainer :{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  imageChat: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  }
});
