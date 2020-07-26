import { StyleSheet } from "react-native";
import Sizes from "../../Themes/Sizes";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  container: {
    paddingVertical: Sizes.width5,
    paddingHorizontal: Sizes.width26,
    backgroundColor: Colors.primaryO16,
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: Sizes.width70,
    height: Sizes.width70,
    marginTop: Sizes.width5,
    marginLeft: -Sizes.width10
  },
  info: {
    flex: 1
  },
  title: {
    fontSize: Sizes.font16,
    fontWeight: "500",
    color: Colors.textBlack
  },
  description: {
    marginTop: Sizes.width6,
    fontSize: Sizes.font16,
    color: Colors.textBlack
  },
  contactButton: {
    fontSize: Sizes.font16,
    fontWeight: "500",
    color: Colors.primary
  }
});
