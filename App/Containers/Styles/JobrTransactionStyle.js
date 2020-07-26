import { StyleSheet } from "react-native";
import Sizes, {screenWidth} from "../../Themes/Sizes";
import { Colors } from "../../Themes";
import OrderTrackingStyles from "./OrderTrackingStyles";
import AppStyles, { APP_COLOR } from "./AppStyles";
import SignUpStyles from "./SignUpStyles";

export default StyleSheet.create({
  ...OrderTrackingStyles,
  ...SignUpStyles,
  marginTop12: {
    marginTop: Sizes.width12
  },
  zoomIn: {
    height: Sizes.width18,
    width: Sizes.width18
  },
  zoomInContainer: {
    position: "absolute",
    top: Sizes.width29,
    right: Sizes.width17
  },
  profileIcon: {
    height: Sizes.width40,
    width: Sizes.width40,
    borderRadius: Sizes.width20,
    borderWidth: Sizes.width2,
    borderColor: Colors.white
  },
  zoomProfileIcon: {},
  submitButton: {
    marginHorizontal: Sizes.width26,
    marginTop: Sizes.width34,
    marginBottom: Sizes.width34
  },
  descriptionContainer: {
    paddingTop: Sizes.width24,
    paddingHorizontal: Sizes.width24,
    paddingBottom: Sizes.width6,
    borderBottomWidth: Sizes.width1,
    borderColor: Colors.inActiveOpacity
  },
  titleText: {
    fontSize: Sizes.font14,
    lineHeight: Sizes.width17,
    fontWeight: "bold",
    marginBottom: Sizes.width8
  },
  detailText: {
    marginBottom: Sizes.width18,
    color: APP_COLOR.INACTIVE
  },
  gpsIconContainer: {
    position: "absolute",
    bottom: Sizes.width50,
    right: Sizes.width20
  },
  distanceTitle: {
    fontWeight: "bold"
  },
  iconCircle: {
    height: Sizes.width12,
    width: Sizes.width12,
    marginRight: Sizes.width11
  },
  distanceContainer: {
    marginVertical: Sizes.width18,
    paddingHorizontal: Sizes.width18,
    paddingVertical: Sizes.width14,
    borderRadius: Sizes.width15,
    marginTop: Sizes.width14,
    backgroundColor: Colors.white,
    ...AppStyles.shadow
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  dashLine: {
    height: Sizes.width6,
    width: Sizes.width0_75,
    marginVertical: Sizes.width2,
    marginLeft: Sizes.width6,
    backgroundColor: Colors.inActiveOpacity50
  },
  marginLeft17: {
    marginLeft: Sizes.width17
  },
  marginLeft23: {
    marginLeft: Sizes.width23
  },
  flexDirectionRow: {
    flexDirection: "row"
  },
  distanceText: {
    color: APP_COLOR.INACTIVE,
    fontSize: Sizes.font14
  },
  trackingInfoContainer: {
    marginHorizontal: Sizes.width26,
    backgroundColor: Colors.white,
    borderRadius: Sizes.width15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop : Sizes.width12
  },
  chatBtnTracking:{
    position : 'absolute',
    bottom : Sizes.width10,
    right : Sizes.width20
  },
  mapStyle: {
    width : screenWidth,
    height : Sizes.width335
  },
  cancelText: {
    fontSize : Sizes.font14,
    fontWeight : '500',
    fontFamily : 'Rubik-Medium',
    color : Colors.primary
  }
});
