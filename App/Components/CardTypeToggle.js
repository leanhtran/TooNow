import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./Styles/CardTypeToggleStyles";
import { Images } from "../Themes";

const CardTypeToggle = props => {
  const { onChange, style, cardType } = props;

  const _onToggle = cardType => {
    onChange && onChange(cardType);
  };

  return (
    <View style={[styles.toggle, style]}>
      <ToogleButton
        source={Images.visa}
        active={cardType == "visa"}
        onPress={() => _onToggle("visa")}
      />
      <ToogleButton
        source={Images.masterCard}
        active={cardType == "masterCard"}
        onPress={() => _onToggle("masterCard")}
      />
    </View>
  );
};

const ToogleButton = ({ onPress, active, source }) => (
  <TouchableOpacity
    style={[styles.button, active ? styles.buttonActive : undefined]}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    onPress={onPress}
  >
    <Image
      source={active ? Images.confirmYes : null}
      resizeMode="contain"
      style={styles.iconActive}
    />
    <Image style={styles.icon} source={source} resizeMode="contain" />
  </TouchableOpacity>
);

CardTypeToggle.propTypes = {
  onChange: PropTypes.any,
  style: PropTypes.any
};

export default CardTypeToggle;
