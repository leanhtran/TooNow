import React, { Component } from "react";
import { View, Text, StatusBar, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import I18n from "../../I18n";

// Styles
import styles from "../Styles/CardDetailScreenStyle";
import ToolBar from "../../Components/Toolbar";
import ButtonComponent from "../../Components/ButtonComponent";
import { ConfirmDialog } from "../../Components/ConfirmComponent";

class CardDetailScreen extends Component {
  state = {
    card: this.props.navigation.getParam('card'),
    showConfirm: false
  }

  _onDeleteCardPress = () => {
    ConfirmDialog({
      content: I18n.t("confirmDeleteItem"),
      onOKPress: this._onOKConfirm
    })
  };

  _onOKConfirm = () => {
    const { navigation } = this.props
    const { card } = this.state
    const deleteCardRequest = navigation.getParam('deleteCardRequest');
    deleteCardRequest({
      id: card.id
    }, () => {
      this.props.navigation.goBack()
    })
  };

  render() {
    const { card } = this.state;

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ToolBar center={I18n.t("cardManagement")} theme="dark" />
          <Card card={card} style={styles.card} />
          <ButtonComponent
            style={styles.deleteButton}
            textStyle={styles.logoutText}
            onPress={this._onDeleteCardPress}
            text={I18n.t("deleteCard")}
          />
        </View>
      </View>
    );
  }
}

const Card = ({ card, style }) => (
  <LinearGradient
    colors={["#4703E8", "#7416F3", "#9729EA"]}
    useAngle={true}
    style={[styles.cardVR, style]}
    angle={160}
  >
    <Image source={card.image} resizeMode="contain" style={styles.image} />
    <Text style={styles.cardNumber}>{`XXXX XXXX XXXX ${card.card.last4}`}</Text>

    <View style={styles.cardInfo}>
      <View style={styles.cardHolder}>
        <Text style={styles.cardInfoLabel}>{I18n.t("cardHolder")}</Text>
        <Text style={styles.cardInfoText}>{card.billing_details.name}</Text>
      </View>
      <View style={styles.cardExp}>
        <Text style={styles.cardInfoLabel}>{I18n.t("expDate")}</Text>
        <Text style={styles.cardInfoText}>{`${card.card.exp_month}/${card.card.exp_year}`}</Text>
      </View>
    </View>
  </LinearGradient>
);

export default CardDetailScreen;
