import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors } from "../../Themes";
import Sizes from "../../Themes/Sizes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: Colors.white
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: Sizes.width34
  },
  cardTypeToggle: {
    marginVertical: Sizes.width34
  },
  twoInput: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  formInput: {
    marginBottom: Sizes.width24
  },
  formInputLeft: {
    width: "50%",
    paddingRight: 12
  },
  formInputRight: {
    width: "50%",
    paddingLeft: 12
  },
  inputLabel: {
    color: Colors.textBlack,
    fontSize: Sizes.font14,
    fontWeight: "500",
    marginBottom: Sizes.width14
  },
  textInput: {
    borderRadius: Sizes.width15,
    backgroundColor: Colors.inputBackground,
    height: Sizes.width50,
    paddingHorizontal: Sizes.width18,
    fontSize: Sizes.font16
  }
});
