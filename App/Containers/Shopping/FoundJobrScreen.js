import React from "react";
import { Image, View, SafeAreaView } from "react-native";
import I18n from "../../I18n";

import styles from "../Styles/FoundJobrStyles";
import TextComponent from "../../Components/TextComponent";
import ImageBackgroundContainer from "../ImageBackgroundContainer";
import Images from "../../Themes/Images";
import ToolBar from "../../Components/Toolbar";
import ButtonComponent from "../../Components/ButtonComponent";
import { PROFILE, TRACKING } from "../MockData";
import ChatButton from "../../Components/ChatButton";
import BackIcon from '../../Components/BackIcon'

class FoundJobrScreen extends React.Component {
  state = {
    profile: PROFILE,
    tracking: TRACKING
  };

  _onChatPress = () => {
    this.props.navigation.navigate('ChatWithJobr')
  };

  _onOrderTrackingPress = () => {
    this.props.navigation.navigate('OrderTracking')
  };

  render() {
    const { dp, username, rating } = this.state.profile;
    const { estimate, distance, to, chatCount } = this.state.tracking;

    return (
      <View style={styles.mainContainer}>
        <ImageBackgroundContainer
          resizeMode={"stretch"}
          style={styles.toolbarBackground}
          source={Images.bgToolBar}
        />
        <View style={styles.container}>
          <ToolBar
            LeftComponent={<BackIcon />}
            center={I18n.t("jobrIsFound")}
          />
          <DPContainer dp={dp} username={username} rating={rating} />
          <TrackingInfo
            estimate={estimate}
            distance={distance}
            to={to}
            chatCount={chatCount}
            onChatPress={this._onChatPress}
          />
          <Footer onOrderTrackingPress={this._onOrderTrackingPress} />
        </View>
      </View>
    );
  }
}

const Footer = ({ onOrderTrackingPress }) => (
  <View style={styles.footer}>
    <ButtonComponent
      onPress={() => onOrderTrackingPress()}
      text={I18n.t("orderTracking")}
      style={styles.buttonStart}
      enableGradient={true}
    />
    <SafeAreaView />
  </View>
);

const DPContainer = ({ dp, username, rating }) => {
  return (
    <View style={styles.dpContainer}>
      <View style={styles.dpCircle}>
        <Image style={styles.dpImage} resizeMode={"cover"} source={dp} />
      </View>
      <View style={styles.jobrInfo}>
        <TextComponent style={styles.name}>{username}</TextComponent>
        <View style={styles.ratingContainer}>
          <Image
            style={styles.starIcon}
            resizeMode={"contain"}
            source={Images.startWhite}
          />
          <TextComponent style={styles.rating}>{rating}</TextComponent>
        </View>
      </View>
    </View>
  );
};

const TrackingInfo = ({ estimate, distance, to, chatCount, onChatPress }) => {
  return (
    <View style={styles.trackingInfoContainer}>
      <View style={styles.estimateContainer}>
        <TextComponent style={styles.estimate}>{estimate} min</TextComponent>
        <Image source={Images.line} resizeMode="contain" style={styles.line} />
        <Image
          source={Images.toPosition}
          resizeMode="contain"
          style={styles.toPosition}
        />
      </View>
      <View style={styles.distanceContainer}>
        <TextComponent style={styles.distance}>
          {distance}
          <TextComponent style={styles.distanceUnit}> m</TextComponent>
        </TextComponent>
        <TextComponent style={styles.address}>{to.address}</TextComponent>
      </View>
      <ChatButton
        text={I18n.t("chatNow")}
        chatCount={chatCount}
        onPress={() => onChatPress()}
      />
    </View>
  );
};

export default FoundJobrScreen;
