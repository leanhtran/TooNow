import React from 'react'
import { View, TouchableWithoutFeedback, Keyboard, Image, Text } from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images } from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import StepHeader from './StepHeader'
import I18n from '../../I18n'
import TextComponent from '../../Components/TextComponent';
import { FormInput } from '../SignIn/LoginWithEmailScreen';
import { ErrorMessage } from './SignUpFullNameScreen';
import Sizes from '../../Themes/Sizes'

class SignUpPasswordScreen extends React.Component {

  state = {
    message : ''
  }

  _onChangeTextPassword = password => {
    this._password = password
  }

  _onChangeTextConfirmPassword = confirmPassword => {
    this._confirmPassword = confirmPassword
  }

  _onPressContinue = () => {
    if (!this._password) return this.setState({message : I18n.t('passwordDoNotMatch')})
    if (!this._confirmPassword) return this.setState({message : I18n.t('confirmPasswordIsRequired')})
    if (this._confirmPassword !== this._password) return this.setState({message :I18n.t('confirmPasswordIsNotMatch')})
    if (this._password.length < 6) return this.setState({message : I18n.t('passwordMustBeAtLeast6Characters')})
    if (this._confirmPassword.length < 6)
      return this.setState({message : I18n.t('confirmPasswordMustBeAtLeast6Characters')})
      this.setState({message : ''})
    let userRegister = this.props.navigation.getParam('userRegister', {})
    userRegister = {
      ...userRegister,
      password: this._password,
    }
    this.props.navigation.navigate('SignUpPhone', { userRegister })
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  render() {
    return (
      <View style={styles.flex1}>
        <StepHeader step={3} />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={[styles.flex1, {paddingTop: Sizes.width10}]}>
            <ToolBar
              paddingEnable
              LeftComponent={<BackIcon style={styles.backIcon} />}
              CenterComponent={<Image source={Images.logoPrimary} resizeMode={'contain'} />}
            />
            <TopView />
            <FormInput
              secureTextEntry
              styleContainer={styles.inputEmail}
              icon={Images.password}
              placeholder={I18n.t('password')}
              onChangeText={this._onChangeTextPassword}
            />
            <FormInput
              secureTextEntry
              styleContainer={styles.inputEmail}
              icon={Images.password}
              placeholder={I18n.t('confirmPassword')}
              onChangeText={this._onChangeTextConfirmPassword}
            />
            {
              this.state.message == I18n.t('confirmPasswordIsRequired') ?
              <View style={styles.viewWarning}>
                <Text style={styles.textWarning}>
                  {I18n.t('confirmPasswordIsRequired')}
                </Text>

                <Image source={Images.redClose} style={styles.iconClose} />
              </View>
              :
              <ErrorMessage message = {this.state.message} />
            }
            
            <Footer onPressContinue={this._onPressContinue} message = {this.state.message} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const TopView = () => (
  <View style={styles.topView}>
    <TextComponent multiline={true} style={styles.titleSignUpStep}>
      {I18n.t('signinPassword')}
    </TextComponent>
  </View>
)

const Footer = ({ onPressContinue, message }) => (
  <View style={[styles.footer, {marginTop: message == '' ? Sizes.width47 : Sizes.width8}]}>
    <ButtonComponent enableGradient onPress={onPressContinue} text={I18n.t('validate')} />
  </View>
)

export default SignUpPasswordScreen
