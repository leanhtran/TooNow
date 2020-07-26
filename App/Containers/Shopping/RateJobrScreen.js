import React from 'react'
import {
  Image,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native'
import I18n from '../../I18n'
import { Rating } from 'react-native-ratings'

import styles from '../Styles/RateJobrStyles'
import TextComponent from '../../Components/TextComponent'
import Images from '../../Themes/Images'
import ToolBar from '../../Components/Toolbar'
import ButtonComponent from '../../Components/ButtonComponent'
import { PROFILE } from '../MockData'
import TextInputComponent from '../../Components/TextInputComponent'
import { Colors } from '../../Themes'
import NeedSupportPanel from '../../Components/NeedSupportPanel'
import TapRating from '../../Components/TapRating'
import Sizes from '../../Themes/Sizes'
import { NavigationActions } from 'react-navigation'

class RateJobrScreen extends React.Component {
  state = {
    profile: PROFILE,
    rating: 3,
    comment: '',
  }

  _onRatingCompleted = rating => {
    // alert(`Rating: ${rating}`);

    this.setState({ rating })
  }

  _onChangeComment = comment => {
    this.setState({ comment })
  }

  _onDonePress = () => {
    const { comment, rating } = this.state
    const reviewParams = this.props.navigation.getParam('reviewParams')
    // reviewParams.createReviewRequest({
    //   user_id: reviewParams.userId,
    //   related_id: reviewParams.itemId,
    //   related_name: 'User',
    //   comment,
    //   rating
    // });

    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  render() {
    const { dp } = this.state.profile

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" />
        <ToolBar center={I18n.t('completedMission')} theme={'dark'} paddingEnable={true} />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={styles.container}>
            <View style={styles.mainContent}>
              <Image style={styles.dpImage} resizeMode={'cover'} source={dp} />

              <TextComponent style={styles.rateText}>{I18n.t('rateForJobr')}</TextComponent>

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

              <TextInputComponent
                style={styles.commentInput}
                multiline={true}
                onChangeText={this._onChangeComment}
                placeholder={I18n.t('whatIsYourComment')}
              />

              <NeedSupportPanel style={styles.needSupportPanel} />
            </View>
            <Footer onDonePress={this._onDonePress} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const Footer = ({ onDonePress }) => (
  <View style={styles.footer}>
    <ButtonComponent onPress={() => onDonePress()} text={I18n.t('done')} enableGradient={true} />
    <SafeAreaView />
  </View>
)

export default RateJobrScreen
