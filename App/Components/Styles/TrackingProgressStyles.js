import { StyleSheet } from "react-native";
import Sizes from "../../Themes/Sizes";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  tracking: {},
  item: {
    flexDirection: "row"
  },
  stepIcon: {
    width: Sizes.width24,
    width: Sizes.width24
  },
  stepName: {
    flex: 1,
    marginHorizontal: Sizes.width8,
    fontSize: Sizes.font16,
    color: Colors.textBlack
  },
  stepTime: {
    fontSize: Sizes.font14,
    color: Colors.inActive
  },
  itemWithLine: {},
  stepLineIcon: {
    width: Sizes.width1,
    height: Sizes.width26,
    marginLeft: Sizes.width11,
    marginVertical: Sizes.width4
  }
});
