import { StyleSheet } from "react-native";
import Sizes from "../../Themes/Sizes";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  button: {
    alignItems: "center",
    padding: Sizes.width5
  },
  icon: {
    height: Sizes.width50,
    width: Sizes.width50
  },
  count: {
    position: "absolute",
    top: Sizes.width15,
    right: Sizes.width10,
    height: Sizes.width17,
    width: Sizes.width17,
    borderRadius: Sizes.width17,
    backgroundColor: Colors.textBlack,
    alignItems: "center",
    justifyContent: "center"
  },
  countText: {
    color: Colors.white,
    fontSize: Sizes.font10,
    textAlign: "center"
  },
  text: {
    fontSize: Sizes.font16,
    color: Colors.primary
  }
});
