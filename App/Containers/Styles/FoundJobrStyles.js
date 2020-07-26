import { StyleSheet } from "react-native";
import Sizes, { screenWidth } from "../../Themes/Sizes";
import { Colors, ApplicationStyles } from "../../Themes";

export const flexDirectionRow = {
  flexDirection: "row",
  alignItems: "center"
};

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  marginHorizontal26: {marginHorizontal: Sizes.width26},
  waitingText: {
    fontSize: Sizes.font24,
    lineHeight: Sizes.width30,
    fontWeight: 'bold',
    color: Colors.inActive,
    textAlign: 'center',
    marginTop: Sizes.width24,
    marginBottom: Sizes.width24,
  },
  toolbarBackground: {
    height: Sizes.width303,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  dpContainer: {
    ...flexDirectionRow,
    paddingTop: Sizes.width34,
    paddingBottom: Sizes.width18,
  },

  dpCircle: {
    height: Sizes.width60,
    width: Sizes.width60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.width60,
    backgroundColor: Colors.white
  },
  dpImage: {
    height: Sizes.width56,
    width: Sizes.width56,
    borderRadius: Sizes.width28
  },
  jobrInfo: {
    justifyContent: "center",
    marginLeft: Sizes.width12
  },
  name: {
    fontSize: Sizes.font24,
    fontWeight: "500",
    color: Colors.white
  },
  jobberName: {
    color: Colors.black
  },
  ratingContainer: {
    ...flexDirectionRow
  },
  starIcon: {
    height: Sizes.width16,
    width: Sizes.width16
  },
  jobberStar: {
    color: Colors.starColor
  },
  rating: {
    fontSize: Sizes.font16,
    color: Colors.white,
    marginLeft: Sizes.width8
  },
  trackingInfoContainer: {
    padding: Sizes.width24,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: Sizes.width6,
    alignItems: "center"
  },
  estimateContainer: {
    flexDirection: "row"
  },
  estimate: {
    fontSize: Sizes.font24,
    fontWeight: "500",
    lineHeight: Sizes.width28,
    color: Colors.textBlack
  },
  line: {
    flex: 1,
    paddingVertical: Sizes.width17,
    marginHorizontal: Sizes.width15
  },
  toPosition: {
    height: Sizes.width34,
    width: Sizes.width34
  },
  distanceContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Sizes.width36
  },
  distance: {
    fontSize: Sizes.font24,
    lineHeight: Sizes.width28,
    color: Colors.inActive
  },
  distanceUnit: {
    fontSize: Sizes.font16,
    color: Colors.inActive
  },
  address: {
    width: Sizes.width101,
    fontSize: Sizes.font14,
    color: Colors.inActive
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: Sizes.width34
  },
  jobrHeaderContainer: {
    paddingTop: Sizes.width34,
    paddingBottom: Sizes.width18,
    alignItems: 'center'
  },
  textJobrTitle: {
    color: Colors.white,
    fontSize: Sizes.font18,
    lineHeight: Sizes.width30,
    fontWeight: "500"
  },
  textJobrDes: {
    color: Colors.white,
    fontSize: Sizes.font14,
    lineHeight: Sizes.width17,
    opacity: 0.7,
    marginTop: Sizes.width4
  },
  jobberInfoContainer: {
    padding: Sizes.width24,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    marginHorizontal: Sizes.width26,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: Sizes.width6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.inActive,
    marginVertical: Sizes.width24,
  },
  specialityContainer: {
    marginBottom:  Sizes.width26,
  },
  alignStretch: {
    alignSelf: 'stretch'
  },
  specilityTitle: {
    color: Colors.inActive,
    fontSize: Sizes.font14,
    fontWeight: 'bold',
    lineHeight: Sizes.width17,
  },
  specialityDes: {
    marginTop: Sizes.width8,
    color: Colors.textBlack,
    fontSize: Sizes.font16,
    lineHeight: Sizes.width19
  },
  jobberFooter: {
    ...flexDirectionRow,
  },
  acceptBtn: {
    width: Sizes.width207
  },
  chatBtn: {
  },
  separator: {
    height: Sizes.width24
  },
});
