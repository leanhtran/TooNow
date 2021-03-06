import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import I18n from "../../I18n";
import ImageBackgroundContainer from "../ImageBackgroundContainer";
import ToolBar from "../../Components/Toolbar";
import TextComponent from "../../Components/TextComponent";
import ChatButton from "../../Components/ChatButton";
import ButtonComponent from "../../Components/ButtonComponent";
import BackIcon from '../../Components/BackIcon'
import { PROFILE, TRACKING } from "../MockData";
import Images from "../../Themes/Images";
import styles from "../Styles/FoundJobrStyles";

class ServiceFoundJobrScreen extends React.Component {
  state = {
    profile: PROFILE,
    tracking: TRACKING
  };

  _onChatPress = () => {
    alert("Go to Chat Screen");
  };

  _onJobberAccepBtnPress = () => {
    alert("Go to Jobber accept Screen");
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItemSeparatorComponent = () => <ItemSeparatorComponent />;

  _renderItem = ({ }) => {
    const { dp, username, rating } = this.state.profile;
    const { chatCount } = this.state.tracking;
    return (
      <JobberInfo
        dp={dp}
        username={username}
        rating={rating}
        chatCount={chatCount}
        onChatPress={this._onChatPress}
        onJobberAccepBtnPress={this._onJobberAccepBtnPress}
      />
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackgroundContainer
          resizeMode={"stretch"}
          style={styles.toolbarBackground}
          source={Images.bgToolBar}
        />
        <View style={styles.container}>
          <ToolBar
            isCustomContent
            LeftComponent={<BackIcon style={styles.blackIcon} />}
            CenterComponent={
              <View style={styles.jobrHeaderContainer}>
                <Text style={styles.textJobrTitle}>{I18n.t("jobrIsNearby")} </Text>
                <Text style={styles.textJobrDes}>3 Jobbers is found</Text>
              </View>
            }
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.jobberList}
            data={[1, 2, 3]}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this._renderItemSeparatorComponent}
          />
        </View>
      </View>
    )
  }
}

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const JobberInfo = ({ dp, username, rating, chatCount, onChatPress, onJobberAccepBtnPress }) => {
  return (
    <View style={styles.jobberInfoContainer}>
      <View style={styles.ratingContainer}>
        <View style={styles.dpCircle}>
          <Image style={styles.dpImage} resizeMode={"cover"} source={dp} />
        </View>
        <View style={styles.jobrInfo}>
          <TextComponent style={[styles.name, styles.jobberName]}>{username}</TextComponent>
          <View style={styles.ratingContainer}>
            <Image
              style={styles.starIcon}
              resizeMode={"contain"}
              source={Images.starOrange}
            />
            <TextComponent style={[styles.rating, styles.jobberStar]}>{rating}</TextComponent>
          </View>
        </View>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.specialityContainer}>
        <Text style={styles.specilityTitle}>{I18n.t('speciality')}</Text>
        <Text style={styles.specialityDes}>{`${I18n.t('plumber')}, ${I18n.t('electrician')}, ${I18n.t('locker')}`}</Text>
      </View>
      <View style={styles.jobberFooter}>
        <ButtonComponent
          onPress={() => onJobberAccepBtnPress()}
          text={I18n.t("accept")}
          style={styles.acceptBtn}
          enableGradient={true}
        />
        <ChatButton
          style={styles.chatBtn}
          chatCount={chatCount}
          onPress={() => onChatPress()}
        />
      </View>
    </View>
  )
};

export default ServiceFoundJobrScreen;
