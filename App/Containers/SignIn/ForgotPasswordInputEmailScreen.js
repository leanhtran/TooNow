import React from 'react'
import { View, TouchableWithoutFeedback, Keyboard, StatusBar, Image } from 'react-native'
import styles from '../Styles/ForgotPasswordStyle'
import TextComponent from '../../Components/TextComponent'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images } from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import I18n from '../../I18n'
import images from '../../Themes/Images';
import { FormInput } from './LoginWithEmailScreen';

class ForgotPasswordInputEmailScreen extends React.Component {
  _onChangeTextEmail = email => {
    this._email = email
  }

  _onPressSend = () => {
    this.props.forgotPasswordRequest({ email: this._email?.trim() }, () => {
      this.props.navigation.navigate('CheckEmail',{
        email : this._email
      })
    })
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  render() {
    return (
      <View style={styles.flex1}>
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={styles.flex1}>
          <ToolBar paddingEnable theme={'dark'} LeftComponent={<BackIcon style={styles.backIcon} />} CenterComponent={<LogoJobr />} />
          <TopView />
          <FormInput
          styleContainer={styles.inputEmail}
            icon={Images.email}
            placeholder={I18n.t('email')}
            keyboardType={'email-address'}
            onChangeText={this._onChangeTextEmail}
          />
          <Footer onPressSend={this._onPressSend} />
          </View>
        </TouchableWithoutFeedback>
        </View>
    )
  }
}

const LogoJobr = () =>{
  return(
    <Image source={images.logoPrimary} />
  )
}

const TopView = () => (
  <View style={styles.topView}>
    <TextComponent multiline={true} style={styles.titleText}>
      {I18n.t('typeYourEmailAddressBelow')}
    </TextComponent>
    <TextComponent multiline={true} style={styles.contentText}>
      {I18n.t('howToChangeYourPassword')}
    </TextComponent>
  </View>
)

const Footer = ({ onPressSend }) => (
  <View style={styles.footer}>
    <ButtonComponent enableGradient onPress={onPressSend} text={I18n.t('send')} />
  </View>
)

export default connect(null, {
  forgotPasswordRequest: AuthActions.forgotPasswordRequest,
})(ForgotPasswordInputEmailScreen)
