import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images } from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import LinearGradient from 'react-native-linear-gradient'
import TextInputComponent from '../../Components/TextInputComponent'
import Colors from '../../Themes/Colors'
import Sizes from '../../Themes/Sizes'
import StepHeader from './StepHeader'
import { SignUpFooter, ErrorMessage } from './SignUpFullNameScreen'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import TextComponent from '../../Components/TextComponent'
import I18n from '../../I18n'

class SignUpPhoneScreen extends React.Component {
  state = {
    phone: '',
    code: '33',
    message: '',
  }

  _onChangeTextCode = code => {
    code = code.replace('+', '')
    this.setState({ code })
  }

  _onChangeTextPhone = phone => {
    phone = phone.replace(/ /g, '')
    if (this.keyBackSpace) phone = phone.substring(0, phone.length - 1)
    this.keyBackSpace = false
    this.setState({ phone })
  }

  _onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (keyValue === 'Backspace') {
      this.keyBackSpace = true
    }
  }

  _onPressContinue = () => {
    const { code, phone } = this.state
    if (!code) return this.setState({ message: 'Phone code is required' })
    if (!phone) return this.setState({ message: 'Phone number is required' })
    if (phone.length > 9) return this.setState({ message: 'The maximum length of phone number is 9' })
    let userRegister = this.props.navigation.getParam('userRegister', {})
    let userInfo = this.props.navigation.getParam('userInfo', {})
    userRegister = {
      ...userRegister,
      ...userInfo,
      phone: code.toString() + phone.toString(),
    }
    this.props.sendVerifyCodeRequest(userRegister, data => {
      this.props.navigation.navigate('SignUpVerifyCode', { userRegister, data })
    })
  }

  _onPressSkip = () => {
    let userRegister = this.props.navigation.getParam('userRegister', {})
    this.props.navigation.navigate('SignUpAddress', { userRegister })
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  render() {
    const { phone, code } = this.state
    return (
      <View style={styles.flex1}>
        <StatusBar barStyle={'dark-content'} />
        <StepHeader step={4} />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={styles.flex1}>
            <ToolBar
              paddingEnable
              LeftComponent={<BackIcon style={styles.backIcon} />}
              CenterComponent={<Image source={Images.logoPrimary} resizeMode={'contain'} />}
            />
            <TopView />
            <PhoneInput
              styleContainer={styles.inputEmail}
              icon={Images.phone}
              valueCode={'+' + code.toString()}
              valuePhone={splitPhoneNumber(phone)}
              placeholderPhone={splitPhoneNumber('123456789')}
              onChangeTextCode={this._onChangeTextCode}
              onChangeTextPhone={this._onChangeTextPhone}
              onKeyPress={this._onKeyPress}
            />
            <ErrorMessage message={this.state.message} />
            <Condition />
            <Footer onPressContinue={this._onPressContinue} />
            <SkipSignInPhone onPressSkip={this._onPressSkip} />
            <Noted />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const TopView = () => (
  <View style={styles.topView}>
    <TextComponent style={styles.titleSignUpStep}>{I18n.t('yourPhoneNumber')}</TextComponent>
  </View>
)

const Condition = () => (
  <View style={styles.phoneTuto}>
    <TextComponent multiline={true} style={styles.phone}>
      {I18n.t('signupPhone')}
    </TextComponent>
  </View>
)

const splitPhoneNumber = phoneNumber => {
  let phoneSplit = ''
  for (let i = 0; i < phoneNumber.length; i += 3) {
    phoneSplit += phoneNumber.slice(i, i + 3) + ' '
  }
  return phoneSplit
}

const PhoneInput = ({
  icon,
  placeholderCode,
  placeholderPhone,
  onChangeTextCode,
  onChangeTextPhone,
  valueCode,
  valuePhone,
  styleContainer,
  onKeyPress,
}) => (
  <View
    // colors={['#4703E8', '#7416F3', '#9729EA']}
    // useAngle={true}
    // angle={90}
    style={[styles.formGenderContainer, styleContainer, styles.bottomLinePrimary]}>
    <Image source={icon} style={styles.icon} resizeMode={'contain'} />
    <TextInputComponent
      style={[styles.textInputCode, styles.flex0]}
      placeholder={placeholderCode}
      placeholderTextColor={Colors.whiteOpacity}
      onChangeText={onChangeTextCode}
      value={valueCode}
      keyboardType={'number-pad'}
    />
    <View style={styles.verticalLine} />
    <TextInputComponent
      style={styles.textInputPhone}
      placeholder={placeholderPhone}
      placeholderTextColor={Colors.blackOpacity}
      onChangeText={onChangeTextPhone}
      value={valuePhone}
      keyboardType={'number-pad'}
      onKeyPress={onKeyPress}
    />
  </View>
)

const Footer = ({ onPressContinue }) => (
  <KeyboardAvoidingView behavior="padding" enabled>
    <View style={styles.footerPhone}>
      <ButtonComponent
        style={styles.footerSignUp}
        textStyle={styles.footerText}
        onPress={onPressContinue}
        text={I18n.t('validate')}
      />
    </View>
  </KeyboardAvoidingView>
)

const SkipSignInPhone = ({ onPressSkip }) => (
  <View style={styles.skipPhone}>
    <TouchableOpacity onPress={onPressSkip}>
      <TextComponent style={styles.skipPhoneText}>{I18n.t('skipPhone')}</TextComponent>
    </TouchableOpacity>
  </View>
)

const Noted = () => (
  <View style={styles.noted}>
    <TouchableOpacity>
      <TextComponent multiline={true} style={styles.notedText}>
        {I18n.t('notedPhone')}
      </TextComponent>
    </TouchableOpacity>
  </View>
)

export default connect(null, {
  registerRequest: AuthActions.registerRequest,
  sendVerifyCodeRequest: AuthActions.sendVerifyCodeRequest,
})(SignUpPhoneScreen)
