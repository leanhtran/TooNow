import React from "react";
import { Image, View, SafeAreaView, StatusBar, ScrollView } from "react-native";
import I18n from "../../I18n";
import LinearGradient from "react-native-linear-gradient";

import styles from "../Styles/OrderTrackingStyles";
import TextComponent from "../../Components/TextComponent";
import ImageBackgroundContainer from "../ImageBackgroundContainer";
import Images from "../../Themes/Images";
import ToolBar from "../../Components/Toolbar";
import ButtonComponent from "../../Components/ButtonComponent";
import { TRACKING } from "../MockData";
import ChatButton from "../../Components/ChatButton";
import NeedSupportPanel from "../../Components/NeedSupportPanel";
import TrackingProgress from "../../Components/TrackingProgress";

class OrderTrackingScreen extends React.Component {
  state = {
    tracking: TRACKING
  };

  _onChatPress = () => {
    alert("Go to Chat Screen");
  };

  _onCancelOrderPress = () => {
    alert("on Cancel Order");
  };

  render() {
    const { orderId, currentStep, tracking, chatCount } = this.state.tracking;

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Map chatCount={chatCount} onChatPress={this._onChatPress} />

          <View style={styles.container}>
            <TrackingInfo
              orderId={orderId}
              dataSource={tracking}
              currentStep={currentStep}
              onCancelOrderPress={this._onCancelOrderPress}
            />
          </View>
        </ScrollView>
        <Footer />
      </View>
    );
  }
}

const Map = ({ chatCount, onChatPress }) => (
  <ImageBackgroundContainer
    resizeMode={"stretch"}
    style={styles.map}
    source={Images.bgMapOrderTracking}
  >
    <LinearGradient
      colors={[
        "rgba(255,255,255, 1)",
        "rgba(255,255,255, 1)",
        "rgba(255,255,255,0.5)",
        "rgba(255,255,255,0.1)",
        "transparent"
      ]}
      style={styles.overlayView}
      useAngle={true}
      angle={180}
    />
    <ToolBar
      center={I18n.t("orderTracking")}
      theme="dark"
      paddingEnable={true}
    />

    <ChatButton
      style={styles.chatButton}
      chatCount={chatCount}
      onPress={() => onChatPress()}
    />

    <View style={styles.toPosition}>
      <Image
        source={Images.directionLine}
        style={styles.directionLine}
        resizeMode="contain"
      />
      <Image
        source={Images.toPosition}
        style={styles.toIcon}
        resizeMode="contain"
      />
    </View>

    <View style={styles.fromPosition}>
      <Image
        source={Images.cart}
        style={styles.fromIcon}
        resizeMode="contain"
      />
    </View>
  </ImageBackgroundContainer>
);

const Footer = () => (
  <View style={styles.footer}>
    <NeedSupportPanel style={styles.needSupportPanel} />
    <SafeAreaView />
  </View>
);

const TrackingInfo = ({
  orderId,
  currentStep,
  dataSource,
  onCancelOrderPress
}) => {
  return (
    <View style={styles.trackingInfoContainer}>
      <View style={styles.headContainer}>
        <View style={styles.orderIdContainer}>
          <TextComponent style={styles.orderIdLabel}>
            {I18n.t("yourOrderId")}
          </TextComponent>
          <TextComponent style={styles.orderId}>{orderId}</TextComponent>
        </View>
        <ButtonComponent
          onPress={() => onCancelOrderPress()}
          text={I18n.t("cancelOrder")}
          style={styles.cancelButton}
        />
      </View>
      <View style={styles.infoContainer}>
        <TrackingProgress dataSource={dataSource} currentStep={currentStep} />
      </View>
    </View>
  );
};

export default OrderTrackingScreen;
