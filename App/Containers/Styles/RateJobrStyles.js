import { StyleSheet } from "react-native";
import Sizes, { screenWidth } from "../../Themes/Sizes";
import { Colors, ApplicationStyles } from "../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: Colors.white
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dpImage: {
    height: Sizes.width60,
    width: Sizes.width60,
    borderRadius: Sizes.width60
  },
  rateText: {
    marginTop: Sizes.width12,
    fontSize: Sizes.font18,
    color: Colors.textBlack
  },
  rating: {
    paddingVertical: Sizes.width24
  },
  starStyle: {
    marginHorizontal: Sizes.width8
  },
  commentInput: {
    backgroundColor: Colors.background,
    borderRadius: Sizes.width15,
    paddingVertical: Sizes.width24,
    padding: Sizes.width24,
    height: Sizes.width100
  },
  needSupportPanel: {
    marginTop: Sizes.width34,
    marginHorizontal: -Sizes.width26,
    width: screenWidth
  },
  footer: {
    justifyContent: "flex-end",
    marginBottom: Sizes.width34
  }
});
