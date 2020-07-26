import { StyleSheet } from "react-native";
import Sizes from "../../Themes/Sizes";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    width: Sizes.width150,
    height: Sizes.width76,
    borderRadius: 15,
    borderWidth: 0.75,
    borderColor: Colors.cardTypeBorder,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  },
  buttonActive: {
    borderColor: Colors.primary,
    elevation: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  iconActive: {
    position: "absolute",
    right: Sizes.width10,
    top: Sizes.width10,
    width: Sizes.width18,
    height: Sizes.width18
  },
  icon: {
    flex: 1
  }
});
