import React from 'react'
import {
  View,
  Image,
  Alert,
  Platform,
  StatusBar,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native'
import styles from '../Styles/LoginScreenStyles'
import TextTouchable from '../../Components/TextTouchable'
import TextComponent from '../../Components/TextComponent'
import IconTouchable from '../../Components/IconTouchable'
import TextInputComponent from '../../Components/TextInputComponent'
import { Images } from '../../Themes'
import Colors from '../../Themes/Colors'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import NetInfo from '@react-native-community/netinfo'
import { NavigationActions } from 'react-navigation'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import { WEB_CLIENT_ID } from '../../Constants'
import API from '../../Services/Api'
import I18n from '../../I18n'
import { TextField } from 'react-native-material-textfield'
import ToolBar from '../../Components/Toolbar'
import BackIcon from '../../Components/BackIcon'

class LoginWithEmailScreen extends React.Component {
  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.ipAddress = state?.details?.ipAddress
    })
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    })
  }

  _onChangeTextEmail = email => {
    this._email = email
  }

  _onChangeTextPassword = password => {
    this._password = password
  }

  _onPressFacebook = () => {
    this._signInFacebook()
  }

  _onPressForgotPassword = () => {
    this.props.navigation.navigate('ForgotPasswordInputEmail')
  }

  _onPressGoogle = () => {
    this._signInGoogle()
  }

  _signInFacebook = async () => {
    try {
      const loginResult = await LoginManager.logInWithPermissions(['public_profile', 'email'])
      if (!loginResult.isCancelled) {
        const { accessToken } = await AccessToken.getCurrentAccessToken()

        const responseInfoCallback = async (error, response) => {
          console.log('LOG: LoginScreen -> responseInfoCallback -> response', response)
          if (error) {
            Alert.alert('Sign in with facebook failed', 'Something went wrong, please try again')
          } else {
            this.props.checkUserExistRequest(response.email, data => {
              const isUserExist = data.is_exist
              console.log('LoginScreen -> responseInfoCallback -> isUserExist', isUserExist)
              if (isUserExist) {
                this.props.socialLoginRequest(
                  { social_name: 'facebook', access_token: accessToken },
                  data => {
                    console.log(
                      'isUserExist',
                      isUserExist,
                      'LoginScreen -> responseInfoCallback -> data',
                      data
                    )
                    this.props.navigation.reset(
                      [NavigationActions.navigate({ routeName: 'Main' })],
                      0
                    )
                  }
                )
              } else {
                this.props.navigation.navigate('SignUpPhone', {
                  userInfo: { ...response, social_name: 'facebook', access_token: accessToken },
                })
              }
            })
          }
        }

        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken,
            parameters: {
              fields: {
                string: 'id,first_name,last_name,email,middle_name,name',
              },
            },
          },
          responseInfoCallback
        )
        await new GraphRequestManager().addRequest(infoRequest).start()
      }
    } catch (error) {
      console.log('_signInFacebook error', error)
      Alert.alert('Sign in with facebook failed', 'Something went wrong, please try again')
    }
  }

  _signInGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId: '1036566765976-jk02827jcdpcpcmmeen2bvg8nau8dds7.apps.googleusercontent.com',
      })
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const userInfo = await GoogleSignin.signIn()

      if (userInfo) {
        console.log('LOG: LoginScreen -> _signInGoogle -> userInfo', userInfo)
        let userToken = userInfo.idToken
        const userEmail = userInfo.user.email || null

        if (Platform.OS === 'android') {
          const token = await GoogleSignin.getTokens()
          userToken = token.idToken
          console.log('token', token)
        }
        this.props.checkUserExistRequest(userEmail, data => {
          console.log('LoginScreen -> _signInGoogle -> isUserExist', data.is_exist)

          if (data.is_exist) {
            this.props.socialLoginRequest(
              { social_name: 'google', access_token: userToken },
              data => {
                console.log('LoginScreen -> _signInGoogle -> data', data)
                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
              }
            )
          } else {
            this.props.navigation.navigate('SignUpPhone', {
              userInfo: { ...userInfo.user, social_name: 'google', access_token: userToken },
            })
          }
        })
      }
    } catch (error) {
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services are not available')
        Alert.alert('Sign in with google failed', 'Something went wrong, please try again')
      } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('_signInGoogle SIGN_IN_CANCELLED')
      } else {
        console.log('_signInGoogle', error)
        Alert.alert('Sign in with google failed', 'Something went wrong, please try again')
      }
    }
  }

  _onPressLogin = () => {
    if (!this._email) return alert('Email is required')
    if (!this._password) return alert('Password is required')
    if (!validateEmail(this._email)) return alert('Email is invalid')
    this.props.loginRequest(
      { email: this._email?.trim(), password: this._password, ip: this.ipAddress },
      data => {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
      }
    )
  }

  _checkUserExist = async email => {
    try {
      const api = API.create()
      const { data } = await api.checkUserExist(email)

      return data.data.is_exist || false
    } catch (err) {
      console.log('Unexpected error when check user exist', err.toString())
      Alert.alert('Sign in failed', 'Something went wrong, please try again')
    }
  }

  _onPressSignUp = () => {
    this.props.navigation.navigate('SignUpFullName')
  }

  _renderIcEmail = () => {
    return <Image source={Images.email} style={styles.icTextInput} />
  }

  _renderIcPassword = () => {
    return <Image source={Images.password} style={styles.icTextInput} />
  }

  _goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          {/* <View style={styles.headerImage}>
              <TouchableOpacity onPress={this._goBack} style={styles.btnBack}>
                <Image source={Images.backBlack} style={styles.imageBack} />
              </TouchableOpacity>

              <Image source={Images.logoPrimary} style={styles.imageJobr} />
            </View> */}
          <ToolBar
            LeftComponent={<BackIcon style={styles.backIcon} />}
            CenterComponent={<Image source={Images.logoPrimary} resizeMode={'contain'} />}
          />

          <Text style={styles.textLogin}>{I18n.t('signIn')}</Text>

          <View>
            <View style={styles.inputContainer}>
              <TextField
              keyboardType="email-address"
                onChangeText={text => this._onChangeTextEmail(text)}
                placeholder={I18n.t('email')}
                tintColor={Colors.primary}
                renderLeftAccessory={this._renderIcEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextField
                secureTextEntry={true}
                onChangeText={text => this._onChangeTextPassword(text)}
                placeholder={I18n.t('password')}
                tintColor={Colors.primary}
                renderLeftAccessory={this._renderIcPassword}
                autoCapitalize="none"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.btnForgotPassword} onPress={this._onPressForgotPassword}>
            <Text style={styles.textForgotPassword}>{I18n.t('forgotPassword') + ' ?'}</Text>
          </TouchableOpacity>

          <View style={styles.bodyContainer}>
            <TouchableOpacity style={styles.btnLogin} onPress={this._onPressLogin}>
              <Text style={styles.textBtnLogin}>{I18n.t('signIn')}</Text>
            </TouchableOpacity>

            <View style={styles.orContent}>
              <View style={styles.grayLine}></View>

              <Text style={styles.textOr}>{I18n.t('  or  ')}</Text>

              <View style={styles.grayLine}></View>
            </View>

            <TouchableOpacity style={styles.btnLogin} onPress={this._onPressSignUp}>
              <Text style={styles.textBtnLogin}>{I18n.t('register')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnFooterContainer}>
            <TouchableOpacity style={styles.btnFB} onPress={this._onPressFacebook}>
              <Image source={Images.icFacebook} style={styles.imageFB} />

              <Text style={styles.textBtnFB}>
                {`${I18n.t('signIn')} ${I18n.t('with')} Facebook`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnFB, { backgroundColor: Colors.white }]}
              onPress={this._signInGoogle}>
              <Image source={Images.google} style={styles.imageGG} />

              <Text style={styles.textBtnGG}>{`${I18n.t('signIn')} ${I18n.t('with')} Google`}</Text>
            </TouchableOpacity>
            {Platform.OS == 'ios' && (
              <TouchableOpacity
                style={[styles.btnFB, { backgroundColor: Colors.darkBlue }]}
                onPress={() => alert('on press continue apple')}>
                <Image source={Images.apple} style={styles.imageApple} />

                <Text style={styles.textBtnFB}>
                  {`${I18n.t('signIn')} ${I18n.t('with')} Apple`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const LogoView = () => (
  <View style={styles.topView}>
    <Logo />
  </View>
)

const Logo = () => {
  return (
    <View style={styles.logoView}>
      <Image source={Images.logo_menu} style={styles.logo} resizeMode={'contain'} />
      <Image source={Images.tooNow} style={styles.logoTextTooNow} resizeMode={'contain'} />
    </View>
  )
}

const SocialLogin = ({ onPressGoogle, onPressFacebook }) => (
  <View style={{ alignItems: 'center' }}>
    <TextComponent style={styles.loginWith}>{I18n.t('loginWith')}</TextComponent>
    <View style={styles.loginSocialContainer}>
      <IconTouchable style={styles.logoSocial} source={Images.google} onPress={onPressGoogle} />
      <IconTouchable style={styles.logoSocial} source={Images.facebook} onPress={onPressFacebook} />
    </View>
  </View>
)

export const FormInput = ({
  icon,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  styleContainer,
  rightIcon,
  defaultValue,
  editable = true,
}) => (
  <View
    // colors={['#4703E8', '#7416F3', '#9729EA']}
    // useAngle={true}
    // angle={90}
    // angleCenter={{x: 0, y: 1}}
    style={[styles.textInputContainer, styleContainer]}>
    <Image source={icon} style={styles.icon} resizeMode={'contain'} />
    <TextInputComponent
      editable={editable}
      style={[styles.textInput, styles.centerInput]}
      placeholder={placeholder}
      placeholderTextColor={Colors.blackOpacity}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      defaultValue={defaultValue}
    />
    {rightIcon && <Image source={rightIcon} style={styles.icon} resizeMode={'contain'} />}
  </View>
)

const Footer = ({ onPressSignUp }) => (
  <View style={styles.footer}>
    <View style={styles.signUpContainer}>
      <TextComponent style={styles.account}>{I18n.t('don’tHaveAnAccount?')}</TextComponent>
      <TextTouchable onPress={onPressSignUp} text={I18n.t('signUp')} style={styles.signUpText} />
    </View>
  </View>
)

export const validateEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

export default connect(null, {
  loginRequest: AuthActions.loginRequest,
  socialLoginRequest: AuthActions.socialLoginRequest,
})(LoginWithEmailScreen)
