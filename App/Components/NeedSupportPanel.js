import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import styles from "./Styles/NeedSupportPanelStyles";
import { Images } from "../Themes";
import I18n from "../I18n";
import TextTouchable from "./TextTouchable";

const NeedSupportPanel = props => {
  const { style } = props;

  const _onContactPress = () => {
    alert("Go to Contact screen");
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        source={Images.question}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{I18n.t("needSupport")}</Text>
        <Text style={styles.description}>{I18n.t("talkWithUsIfNeeded")}</Text>
      </View>
      <TextTouchable
        text={I18n.t("contact")}
        onPress={_onContactPress}
        style={styles.contactButton}
      />
    </View>
  );
};

NeedSupportPanel.propTypes = {
  style: PropTypes.any
};

export default NeedSupportPanel;
