import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images } from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import TextInputComponent from '../../Components/TextInputComponent'
import TextComponent from '../../Components/TextComponent'
import TextTouchable from '../../Components/TextTouchable'
import StepHeader from './StepHeader'
import { SignUpFooter } from './SignUpFullNameScreen'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import I18n from '../../I18n'

class SignUpVerifyCodeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      timing: 30,
    }
  }

  componentDidMount() {
    let data = this.props.navigation.getParam('data', {})
    alert(data)
    this._setTiming()
  }

  _setTiming = () => {
    this.timingInterval = setInterval(() => {
      if (this.state.timing === 0) return clearInterval(this.timingInterval)
      this.setState(prevState => {
        return {
          timing: prevState.timing - 1,
        }
      })
    }, 1000)
  }

  _onChangeTextCode = code => {
    if (code.length > 4) code = code.substring(0, 4)
    this.setState({ code })
  }

  _onPressContinue = () => {
    const { code } = this.state
    let userRegister = this.props.navigation.getParam('userRegister', {})
    userRegister = {
      ...userRegister,
      code,
    }
    this.props.verifyCodeRequest(userRegister, data => {
      // ASKR
      // this.props.navigation.navigate('SignUpSuccess')

      // JOBR
      if (data)
        this.props.navigation.navigate('SignUpAddress', {
          userRegister,
        })
    })
  }

  _onPressResend = () => {
    let userRegister = this.props.navigation.getParam('userRegister', {})
    this.props.sendVerifyCodeRequest(userRegister, data => {
      alert(data)
      this.setState({ timing: 30 })
      this._setTiming()
    })
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  _onFocusTextInput = () => {
    this.refs['input'].focus()
  }

  render() {
    const { code, timing } = this.state
    return (
      <View style={styles.flex1}>
        <StatusBar barStyle={'dark-content'} />
        <StepHeader step={5} />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={styles.flex1}>
            <ToolBar
              paddingEnable
              LeftComponent={<BackIcon style={styles.backIcon} />}
              CenterComponent={<Image source={Images.logoPrimary} resizeMode={'contain'} />}
            />
            <TopView />
            <TouchableWithoutFeedback onPress={this._onFocusTextInput}>
              <View
                // colors={['#4703E8', '#7416F3', '#9729EA']}
                // useAngle={true}
                // angle={90}
                style={[styles.formGenderContainer, styles.textInputCodeContainer]}>
                <TextInput
                  collapsable={false}
                  onLayout={() => {}}
                  ref="input"
                  autoFocus={true}
                  caretHidden
                  style={[styles.textInputPhone, styles.hiddenTextInput]}
                  onChangeText={this._onChangeTextCode}
                  value={code}
                  keyboardType={'number-pad'}
                />
                <View style={styles.circleContainer}>
                  <View style={[styles.circleActive, code.length < 1 && styles.circleInActive]} />
                  <View style={[styles.circleActive, code.length < 2 && styles.circleInActive]} />
                  <View style={[styles.circleActive, code.length < 3 && styles.circleInActive]} />
                  <View style={[styles.circleActive, code.length < 4 && styles.circleInActive]} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TextComponent style={styles.didReceive}>{I18n.t('didntReceive?')}</TextComponent>
            <TextTouchable
              disabled={timing !== 0}
              onPress={this._onPressResend}
              style={styles.resendText}
              text={
                timing !== 0 ? `${I18n.t('resendIn')} ${convertTiming(timing)}` : I18n.t('resend')
              }
            />
            <Footer onPressContinue={this._onPressContinue} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const Footer = ({ onPressContinue }) => (
  <KeyboardAvoidingView behavior="padding" enabled style={styles.flex1}>
    <View style={styles.footer}>
      <ButtonComponent
        style={styles.footerSignUp}
        textStyle={styles.footerText}
        onPress={onPressContinue}
        text={I18n.t('validate')}
      />
    </View>
  </KeyboardAvoidingView>
)

const convertTiming = timing => {
  let minutes = Math.floor(timing / 60)
  let seconds = timing % 60
  minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString()
  seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString()
  return minutes + ':' + seconds
}

const TopView = () => (
  <View style={styles.topView}>
    <TextComponent style={styles.titleText}>
      {I18n.t('verificationCode')}
    </TextComponent>
    <TextComponent multiline={true} style={styles.contentTextVerify}>
      {I18n.t('weSentYouACode')}
    </TextComponent>
  </View>
)

export default connect(null, {
  sendVerifyCodeRequest: AuthActions.sendVerifyCodeRequest,
  verifyCodeAndLoginRequest: AuthActions.verifyCodeAndLoginRequest,
  verifyCodeRequest: AuthActions.verifyCodeRequest,
})(SignUpVerifyCodeScreen)
