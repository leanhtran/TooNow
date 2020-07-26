import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import I18n from "../../I18n";

// Styles
import styles from "../Styles/ListCardScreenStyle";
import { Images } from "../../Themes";
import ToolBar from "../../Components/Toolbar";
import { VISA } from "../../Constants";

class ListCardScreen extends Component {
  _renderItem = ({ item }) => (
    <CardItem card={item} onPress={this._onCardPress} />
  )

  _renderItemSeparatorComponent = () => <ItemSeparatorComponent />;

  _renderAddCardComponent = () => (
    <AddCardItem onPress={this._onAddCardPress} />
  );

  _keyExtractor = (item, index) => index.toString();

  _onAddCardPress = () => {
    const { navigation, addCardRequest} = this.props
    navigation.navigate("AddCardScreen",  { addCardRequest });
  };

  _onCardPress = card => {
    const { navigation, deleteCardRequest} = this.props
    navigation.navigate("CardDetailScreen", { card, deleteCardRequest });
  };

  render() {
    const { cards } = this.props;
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ToolBar title={I18n.t("cardManagement")} theme="dark"/>
          <FlatList
            style={styles.cardList}
            data={cards}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this._renderItemSeparatorComponent}
            ListFooterComponent={this._renderAddCardComponent}
          />
        </View>
      </View>
    );
  }
}

const CardItem = ({ card, onPress }) => (
  <TouchableOpacity
    style={[styles.cardItem]}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    onPress={() => onPress(card)}
  >
    <View style={styles.cardImageBg}>
      <Image
        source={card.card.brand === VISA ? Images.visa : Images.masterCard}
        resizeMode="contain"
        style={styles.cardImage}
      />
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardName}>{card.card.brand}</Text>
      <Text style={styles.cardNumber}>{`XXXX XXXX XXXX ${card.card.last4}`}</Text>
    </View>
  </TouchableOpacity>
);

const AddCardItem = ({ onPress }) => (
  <TouchableOpacity
    style={[styles.cardItem, styles.addCardBtn]}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    onPress={() => onPress()}
  >
    <Image
      source={Images.addItem}
      resizeMode="contain"
      style={styles.addCardImage}
    />
    <View style={styles.cardInfo}>
      <Text style={styles.addCardText}>{I18n.t("addCard")}</Text>
    </View>
  </TouchableOpacity>
);

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export default ListCardScreen;
