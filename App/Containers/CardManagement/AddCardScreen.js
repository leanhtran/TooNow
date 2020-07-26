import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import I18n from "../../I18n";

// Styles
import styles from "../Styles/AddCardScreenStyle";
import ToolBar from "../../Components/Toolbar";
import ButtonComponent from "../../Components/ButtonComponent";
import TextInputComponent from "../../Components/TextInputComponent";
import CardTypeToggle from "../../Components/CardTypeToggle";
import { APP_COLOR } from '../Styles/AppStyles'

class AddCardScreen extends Component {
  state = {
    cardType: "visa",
    cardHolderName: "",
    cardNumber: "",
    cvv: undefined,
    expirationDate: undefined
  };

  _onCardTypeChange = cardType => {
    this.setState({
      cardType
    });
  };

  _onCardHolderNameChange = cardHolderName => {
    this.setState({
      cardHolderName
    });
  };

  _onCardNumberChange = cardNumber => {
    this.setState({
      cardNumber: cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
    });
  };

  _onCvvChange = cvv => {
    this.setState({
      cvv
    });
  };
  _onExpirationDateChange = expirationDate => {
    this.setState({
      expirationDate
    });
  };

  _onPressAddCard = () => {
    const { navigation } = this.props;
    const { cardHolderName, cardNumber, expirationDate, cvv } = this.state;
    const addCardRequest = navigation.getParam('addCardRequest');
    addCardRequest({
      card_holder_name: cardHolderName,
      number: cardNumber.replace(/\s?/g, ''),
      exp: expirationDate,
      cvc: cvv
    }, () => {
      this.props.navigation.goBack()
    });
  };

  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    const {
      cardType,
      cardHolderName,
      cardNumber,
      cvv,
      expirationDate
    } = this.state;

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={styles.container}>
            <ToolBar center={I18n.t("cardManagement")} theme="dark" />

            <CardTypeToggle
              style={styles.cardTypeToggle}
              cardType={cardType}
              onChange={this._onCardTypeChange}
            />

            <TextInput
              label={I18n.t("cardholderName")}
              // placeholder={I18n.t("cardholderName")}
              value={cardHolderName}
              onChangeText={this._onCardHolderNameChange}
            />

            <TextInput
              label={I18n.t("cardNumber")}
              // placeholder="XXXX XXXX XXXX XXXX"
              maxLength={19}
              value={cardNumber}
              onChangeText={this._onCardNumberChange}
            />

            <View style={styles.twoInput}>
              <TextInput
                label={I18n.t("cvv")}
                placeholder="000"
                value={cvv}
                style={styles.formInputLeft}
                onChangeText={this._onCvvChange}
              />

              <TextInput
                label={I18n.t("expirationDate")}
                placeholder="MM/YY"
                value={expirationDate}
                style={styles.formInputRight}
                onChangeText={this._onExpirationDateChange}
              />
            </View>

            <Footer onPressAddCard={this._onPressAddCard} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const TextInput = ({ value, label, placeholder, onChangeText, style, maxLength }) => (
  <View style={[styles.formInput, style]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInputComponent
      style={styles.textInput}
      placeholder={placeholder}
      maxLength={maxLength}
      placeholderTextColor={APP_COLOR.INACTIVE}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  </View>
);

const Footer = ({ onPressAddCard }) => (
  <View style={styles.footer}>
    <ButtonComponent
      onPress={() => onPressAddCard()}
      text={I18n.t("addCard")}
      style={styles.buttonStart}
      enableGradient={true}
    />
    <SafeAreaView />
  </View>
);

export default AddCardScreen;
