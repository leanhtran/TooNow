import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import {Images} from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import StepHeader from './StepHeader'
import {SignUpFooter} from './SignUpFullNameScreen'
import I18n from '../../I18n'
import { FormInput, validateEmail } from '../SignIn/LoginWithEmailScreen';

class SignUpEmailScreen extends React.Component {
  _onChangeTextEmail = email => {
    this._email = email
  }

  _onPressContinue = () => {
    if (!this._email) return alert('Email is required')
    if (!validateEmail(this._email)) return alert('Email is invalid')
    let userRegister = this.props.navigation.getParam('userRegister', {})
    userRegister = {
      ...userRegister,
      email: this._email,
    }
    this.props.navigation.navigate('SignUpGender', {userRegister})
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  render() {
    return (
      <ImageBackgroundContainer style={styles.container}>
        <StepHeader step={3}/>
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={styles.flex1}>
            <ToolBar
              LeftComponent={<BackIcon/>}
              CenterComponent={
                <Image
                  source={Images.tooNow}
                  style={styles.iconTooNow}
                  resizeMode={'contain'}
                />
              }/>
            <FormInput
              styleContainer={styles.textInputContainer}
              icon={Images.email}
              keyboardType={'email-address'}
              placeholder={I18n.t('email')}
              onChangeText={this._onChangeTextEmail}
            />
            <SignUpFooter onPressContinue={this._onPressContinue}/>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackgroundContainer>
    )
  }
}

export default SignUpEmailScreen
