import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./Styles/ChatButtonStyles";
import { Images } from "../Themes";

const ChatButton = props => {
  const {
    icon,
    text,
    chatCount,
    onPress,
    style,
    iconStyle,
    textStyle,
    disabled
  } = props;

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <Image
        source={icon ? icon : Images.chatButton}
        resizeMode="cover"
        style={[styles.icon, iconStyle]}
      />
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
    </TouchableOpacity>
  );
};

ChatButton.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.string,
  chatCount: PropTypes.number,
  onPress: PropTypes.any,
  style: PropTypes.any,
  iconStyle: PropTypes.any,
  textStyle: PropTypes.any,
  disabled: PropTypes.bool
};

export default ChatButton;
