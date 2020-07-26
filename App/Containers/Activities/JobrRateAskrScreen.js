import React, { Component } from "react";
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import styles from "../Styles/RatingStyles";
import ToolBar from "../../Components/Toolbar";
import BackIcon from "../../Components/BackIcon";
import { APP_COLOR } from "../Styles/AppStyles";
import { Images, Colors } from "../../Themes";
import ButtonComponent from "../../Components/ButtonComponent";
import TextInputComponent from "../../Components/TextInputComponent";
import TextComponent from "../../Components/TextComponent";
import Sizes from '../../Themes/Sizes'
import TapRating from '../../Components/TapRating'
import {URL} from '../../Services/Api'
import {connect} from 'react-redux'
import ReviewActions from "../../Redux/ReviewRedux";
import { formatMoney } from "../../Common/Common";
import { NavigationActions } from "react-navigation";
import I18n from '../../I18n'
import CircleBackIcon from "../../Components/CircleBackIcon";

class JobrRateAskrScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      rating: 0,
      comment : ""
    }
    this.order = this.props.navigation.getParam('order')
    this.askr = this.order?.order?.user || this.props.navigation.getParam('askr')
  }

  _onRatingCompleted = rating => {
    this.setState({ rating });
  };

  onSubmit = () => {
    // todo: handle submit
    const {comment, rating} = this.state
    console.log(this.askr)
    this.props.createReviewRequest({
      user_id : this.props.user.id,
      related_id : this.askr.id,
      related_name: "User",
      comment : comment,
      rating : rating
    },data =>{
      this.ratingSucces()
    })
  };

  onCancel = () => {
    alert(I18n.t('Ignore'))
  }

  onChat = () => {
    alert('Chat')
  }

  ratingSucces = () =>{
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
  }

  _onChangeComment = (comment) =>{
    this.setState({comment})
  }

  render() {
    const {comment} = this.state
    const image = Images.profileDefault
    return (
      <View style={styles.container}>
        <View style={styles.headerRatingContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={I18n.t("completedMission")}
            toolBarTextStyle={{ color: APP_COLOR.TEXT }}
          />
        </View>
        <ScrollView style={[styles.container, styles.contentContainer]}>
          <View style={styles.cardBody}>
            <Image source={Images.actorIcon}
              style={styles.imageActor}
            />
            <View style={styles.youGotContainer}>
              <TextComponent style={styles.textDefault}>{I18n.t('youGot')}</TextComponent>
              <TextComponent style={styles.textPrice}>{this.order.earn_money + ' €'}</TextComponent>
            </View>
          </View>

          <View style={styles.ticketContainer}>
            <View style={styles.ticket}>
              <RowPrice text={I18n.t('receipt')} price={`${this.order.earn_money} €`} />
              <RowPrice text={I18n.t('priceOfDelivery')} price={`${this.order.delivery} €`} />
              <RowPrice text={I18n.t('managementAndInsuranceCosts')} price={`${this.order.tax} €`} />

              <View style={styles.rowTotal}>
                <RowPrice text={I18n.t('youGot')} price={`${this.order.earn_money} €`} />
              </View>
            </View>
          </View>
          <Image source={image} style={styles.avatar} />
          <TextComponent style={styles.textUnderAvatar}>
            {I18n.t('rateForAskr')}
          </TextComponent>
          <TapRating
            ratingImage={Images.starActive}
            selectedColor={Colors.starColor}
            showRating={false}
            count={5}
            defaultRating={this.state.rating}
            size={Sizes.width40}
            onFinishRating={this._onRatingCompleted}
            starContainerStyle={styles.rating}
            starStyle={styles.starStyle}
          />

          <View style={styles.commentContainer}>
            <TextInputComponent
              style={styles.commentInput}
              multiline={true}
              value={comment}
              onChangeText={(text)=>this._onChangeComment(text)}
              placeholder={I18n.t('writeAComment')}
            />
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={this.onCancel} style={styles.btnCancel}>
              <Text style={[styles.textBtn, {color: Colors.primary}]}>
                {I18n.t('Ignore')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSave} onPress={this.onSubmit}>
              <Text style={[styles.textBtn, {color: Colors.white}]}>
                {I18n.t('toNote')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerRateContainer}>
            <View style={styles.textFooterContainer}>
              <Text style={styles.textTitleFooter}>
                {I18n.t('haveYouEncounteredAProblem')}
              </Text>

              <Text style={[styles.textTitleFooter, {fontWeight: 'normal'}]}>
                {I18n.t('sendUsAMessage')}
              </Text>
            </View>
            
            <TouchableOpacity onPress={this.onChat} style={styles.imageContainer}>
              <Image source={Images.chatIc} style={styles.imageChat}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const RowPrice = ({text, price}) => {
  return(
    <View style={styles.rowPrice}>
      <Text style={styles.textTitleRowPrice}>{text}</Text>
      <Text style={styles.textRowPrice}>{price}</Text>
    </View>
  )
}

const mapStateToProp = state => ({
  user: state.auth.user
});

export default connect(mapStateToProp, {
  createReviewRequest: ReviewActions.createReviewRequest
})(JobrRateAskrScreen);
