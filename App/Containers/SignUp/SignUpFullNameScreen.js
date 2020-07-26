import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images } from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import StepHeader from './StepHeader'
import { isEmpty } from 'ramda'
import I18n from '../../I18n'
import TextComponent from '../../Components/TextComponent';
import { FormInput } from '../SignIn/LoginWithEmailScreen';
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import Sizes from '../../Themes/Sizes'

class SignUpFullNameScreen extends React.Component {

  state = {
    message : ''
  }

  _onChangeTextFullName = fullname => {
    this._fullname = fullname
  }

  _onChangeTextLastName = lastname => {
    this._lastname = lastname
  }

  _onChangeTextEmail = email => {
    this._email = email
  }

  _onPressContinue = () => {
    if (!this._fullname) return this.setState({message : "First name is required"})
    if (!this._lastname) return this.setState({message : "Last name is required"})
    if (!this._email) return this.setState({message : "Last name is required"})
    this.props.checkUserExistRequest( this._email, data =>{
      if(data.is_exist){
        return this.setState({message : "Your email is already used"})
      }
      else{
        this.setState({message : ''})
        this._fullname = this._fullname.trim()
        this._lastname = this._lastname.trim()
        this._email = this._email.trim()
        this.props.navigation.navigate('SignUpGender', {
          userRegister: {
            firstname : this._fullname,
            lastname : this._lastname,
            email : this._email
          },
        })
      }
    })
    
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  render() {
    return (
      <View style={styles.flex1}>
        <StatusBar hidden={false} barStyle={'dark-content'} />
        <StepHeader step={1} />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={[styles.flex1, {paddingTop: Sizes.width10}]}>
              <ToolBar
                paddingEnable
                LeftComponent={<BackIcon style={styles.backIcon} />}
                CenterComponent={
                  <Image source={Images.logoPrimary} resizeMode={'contain'} />
                }
              />
            <TopView />
            <FormInput
              styleContainer={styles.inputEmail}
              icon={Images.name}
              placeholder={I18n.t('firstName')}
              onChangeText={this._onChangeTextFullName}
            />
            <FormInput
              styleContainer={styles.inputEmail}
              icon={Images.name}
              placeholder={I18n.t('lastNameRegister')}
              onChangeText={this._onChangeTextLastName}
            />
            <FormInput
              styleContainer={styles.inputEmail}
              icon={Images.email}
              keyboardType="email-address"
              placeholder={I18n.t('email')}
              onChangeText={this._onChangeTextEmail}
            />
            <ErrorMessage message={this.state.message} />
            <Condition />
            <SignUpFooter onPressContinue={this._onPressContinue} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export const ErrorMessage = ({message}) =>{
  if(message == '') return null
  return(
    <View style={styles.errorContainer}>
      <TextComponent style={styles.errorMessage}>
        {message}
      </TextComponent>
    </View>
  )
}

const TopView = () => (
  <View style={[styles.topView, {marginBottom: Sizes.width20}]}>
    <TextComponent multiline={true} style={styles.titleSignUpStep}>
      {I18n.t('signUp')}
    </TextComponent>
  </View>
)

const Condition = () => (
  <View style={styles.termAndCondition}>
    <TextComponent multiline={true} style={styles.condition}>
      {I18n.t('condition1')}
      <TextComponent style={styles.termLink}> {I18n.t('term')} </TextComponent>
      <TextComponent style={styles.condition}> {I18n.t('condition2')} </TextComponent>
      <TextComponent style={styles.termLink}> {I18n.t('condition3')} </TextComponent>
    </TextComponent>
  </View>
)

export const SignUpFooter = ({ onPressContinue }) => (
  <KeyboardAvoidingView behavior="padding" enabled style={styles.flex1}>
    <View style={styles.footer}>
      <ButtonComponent
        style={styles.footerSignUp}
        textStyle={styles.footerText}
        onPress={onPressContinue}
        text={I18n.t('signupNameBtn')}
      />
    </View>
  </KeyboardAvoidingView>
)

export default connect(null, {
  checkUserExistRequest: AuthActions.checkUserExistRequest,
})(SignUpFullNameScreen)
