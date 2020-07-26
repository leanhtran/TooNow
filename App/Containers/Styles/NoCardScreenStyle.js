import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors } from "../../Themes";
import Sizes from "../../Themes/Sizes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    alignItems: "center",
    backgroundColor: Colors.white
  },
  topBackground: {
    flex: 0,
    height: Sizes.width240
  },
  noCardMessage: {
    fontSize: Sizes.font24,
    textAlign: "center",
    fontWeight: "500",
    paddingHorizontal: Sizes.width80
  },
  addButton: {
    marginTop: Sizes.width50
  },
  addButtonText: {
    fontSize: Sizes.font16,
    marginTop: Sizes.width18
  }
});
