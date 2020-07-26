import React from "react";
import { TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import { Images } from "../Themes";
import Sizes from "../Themes/Sizes";

const AddButton = props => {
  const { style, onPress, disabled } = props;

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[styles.button, style]}
      disabled={disabled}
    >
      <ImageBackground
        style={styles.bg}
        source={Images.purpleAddButton}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Sizes.width100,
    height: Sizes.width60,
    justifyContent: "center",
    alignItems: "center"
  },
  bg: {
    width: "100%",
    height: "100%"
  }
});

AddButton.propTypes = {
  style: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default AddButton;
