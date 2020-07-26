import { StyleSheet, StatusBar, Platform } from "react-native";
import Sizes, { screenWidth } from "../../Themes/Sizes";
import { Colors, ApplicationStyles } from "../../Themes";
import AppStyles, { APP_COLOR } from "./AppStyles";

export const flexDirectionRow = {
  flexDirection: "row",
  alignItems: "center"
};

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  marginTop14: { marginTop: Sizes.width14 },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: APP_COLOR.BACKGROUND, 
    height: Sizes.width57,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Sizes.width26,
    paddingRight: Sizes.width15
  },
  headerBackground: {
    height: Sizes.width215,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  orderContainer: {
    marginTop: Sizes.width36
  },
  orderRowContainer: {
    flexDirection: "row",
    marginTop: Sizes.width6
  },
  orderLabel: {
    width: Sizes.width63,
    fontSize: Sizes.font16,
    fontWeight: "500",
    lineHeight: Sizes.width24,
    color: Colors.white,
    opacity: 0.6,
    marginRight: Sizes.width12
  },
  mission: {
    fontSize: Sizes.font16,
    lineHeight: Sizes.width24,
    color: Colors.white,
    opacity: 0.85
  },
  total: {
    fontSize: Sizes.font16,
    fontWeight: "500",
    lineHeight: Sizes.width24,
    color: Colors.white
  },
  actionButton: {
    marginTop: Sizes.width23,
    width: Sizes.width155,
    height: Sizes.width40
  },
  btnReject: {
    marginRight: Sizes.width13,
    backgroundColor: Colors.transparent,
    borderColor: Colors.white,
    borderWidth: Sizes.width1
  },
  btnRejectText: {
    color: Colors.white
  },
  chatContainer: {},
  chatItemContainer: {
    width: "100%",
    flexDirection: "row"
  },
  chatSeparator: {
    height: Sizes.width20
  },
  chatItem: {
    paddingVertical: Sizes.width12,
    paddingHorizontal: Sizes.width18,
    maxWidth: Sizes.width243,
    backgroundColor: Colors.white,
    borderRadius: Sizes.width15,
    marginBottom: Sizes.width6
  },
  chatText: {
    fontSize: Sizes.font16,
    lineHeight: Sizes.width24,
    color: Colors.textBlack
  },
  chatItemContainerRight: {
    justifyContent: "flex-end"
  },
  chatItemLeft: {
    backgroundColor: Colors.primaryO16
  },
  jobrAvatar: {
    width: Sizes.width30,
    height: Sizes.width30,
    borderRadius: Sizes.width30,
    marginTop: Sizes.width20,
    marginBottom: Sizes.width4
  },
  jobrChangedPrice: {
    fontSize: Sizes.font14,
    lineHeight: Sizes.width17,
    color: Colors.primary,
    textAlign: "center",
    marginTop: Sizes.width28,
    marginBottom: Sizes.width34
  },
  footer: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 6,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.width26,
    alignItems: 'center'
  },
  icon: {
    width: Sizes.width24,
    height: Sizes.width24,
    marginVertical: Sizes.width16
  },
  chatInput: {
    flex: 1,
    height: Sizes.width56,
    paddingVertical: Sizes.width16,
    marginHorizontal: Sizes.width12,
    padding: 0,
    fontSize: Sizes.font16,
    color: Colors.textBlack
  },
  btnCloseImage: {
    position: 'absolute', 
    right: -5, 
    top: -5, 
    width: 22, 
    height: 22, 
    zIndex: 1, 
    alignItems: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 11
  },
  viewImage: {
    zIndex: -1, 
    marginVertical: 2, 
    width: 150, 
    height: 120, 
    borderColor: Colors.lightGrey, 
    borderWidth: 0.5, 
    backgroundColor: '#eee', 
    borderRadius: 3,
  },
  closeImage: {
    width: 22, 
    height: 22, 
    zIndex: 1
  },
  sendImage: {
    resizeMode: 'contain', 
    height: '100%', 
    zIndex: -1
  },
  rowImage: {
    backgroundColor: Colors.white,
    width: '100%',
    paddingVertical: 5,
    paddingLeft: 30
  },
  abortMissionContainer: {
    paddingHorizontal: Sizes.width10,
    paddingVertical: Sizes.width3,
    borderWidth: 1,
    borderColor: Colors.inActive,
    borderRadius: Sizes.width10
  },
  textAbortMission: {
    width: Sizes.width85,
    textAlign: 'center',
    color: Colors.inActive,
    fontSize: Sizes.font13,
  },
  descriptionContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width26,
    paddingVertical: Sizes.width10,
    ...AppStyles.shadow
  },
  rowDescription: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageDescription: {
    width: Sizes.width20,
    height: Sizes.width20,
    resizeMode: "contain",
  },
  textDescription: {
    color: Colors.black,
    fontSize: Sizes.font16,
    paddingHorizontal: Sizes.width26
  },
  btnEdit: {
    paddingHorizontal: Sizes.width10,
    paddingVertical: Sizes.width5,
    borderWidth: 1,
    borderColor: Colors.inActive,
    borderRadius: Sizes.width100,
    flexDirection: "row",
    alignItems: 'center'
  },
  iconBlackTag: {
    width: Sizes.width15,
    height: Sizes.width15,
    resizeMode: 'contain',
    marginLeft: Sizes.width2
  },
  btnValidate: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Sizes.width15,
    paddingVertical: Sizes.width3,
    borderRadius: Sizes.width10,
    flexDirection: "row",
    alignItems: 'center',
    margin: -Sizes.width1
  },
  textValidate: {
    color: Colors.white,
    fontSize: Sizes.font13
  },
  editPriceContainer: {
    borderRadius: Sizes.width10,
    borderWidth: 1,
    borderColor: Colors.inActive,
    flexDirection: 'row',
    ...AppStyles.shadow,
    backgroundColor: Colors.white
  },
  inputText: {
    paddingLeft: Sizes.width10,
    paddingVertical: Sizes.width2,
    width: Sizes.width40
  },
  textEuro: {
    fontWeight: 'bold',
    color: Colors.inActive,
    textAlignVertical: 'center',
    fontSize: Sizes.font18,
    marginRight: Sizes.width20
  },
  textWaiting: {
    marginLeft: Sizes.width46,
    marginTop: Sizes.width5,
    color: Colors.inActive,
    fontSize: Sizes.font15,
    // paddingRight: Sizes.width20,
    fontStyle: 'italic'
  },
  iconSelect: {
    width: Sizes.width15,
    height: Sizes.width15,
    resizeMode: "contain",
  },
  rowTextAccept: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Sizes.width46
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: Sizes.font18,
    marginLeft: Sizes.width26,
  },
  leftHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bgModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    color: Colors.red,
    paddingHorizontal: Sizes.width40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Sizes.font15,
    marginTop: Sizes.width5
  },
  textPopup: {
    color: Colors.inActive,
    fontSize: Sizes.font14,
    textAlign: 'center',
    marginTop: Sizes.width10
  },
  rowButtonPopup: {
    flexDirection: 'row',
    marginTop: Sizes.width20
  },
  btnCancel: {
    paddingVertical: Sizes.width15,
    borderColor: Colors.red,
    borderWidth: 1,
    flex: 1,
    borderBottomLeftRadius: Sizes.width15,
    alignItems: 'center'
  },
  btnSubmit: {
    paddingVertical: Sizes.width15,
    backgroundColor: Colors.red,
    flex: 1,
    borderBottomRightRadius: Sizes.width15,
    alignItems: 'center'
  },
  textButtonModal: {
    fontWeight: 'bold',
    fontSize: Sizes.width15,
    color: Colors.red
  }
});
