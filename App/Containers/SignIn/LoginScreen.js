import React from 'react'
import {
  View,
  SafeAreaView,
  AsyncStorage,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native'
import styles from '../Styles/WelcomeStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { NavigationActions, ScrollView } from 'react-navigation'
import SwiperComponent, { ItemSwiper, WELCOME_CONTENT } from '../../Components/SwiperComponent'
import AuthActions from '../../Redux/AuthRedux'
import { connect } from 'react-redux'
import I18n from '../../I18n'
import { Images, Colors } from '../../Themes'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import LinearGradient from 'react-native-linear-gradient'

class LoginScreen extends React.Component {
  _onPressStart = () => {
    this.props.navigation.navigate('LoginWithEmail')
  }

  componentDidMount() {
    GoogleSignin.configure()
  }

  _onPressFacebook = () => {
    this._signInFacebook()
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

  _checkUserExist = async email => {
    try {
      this.props.checkUserExistRequest(email, data => {
        return data.is_exist
      })
    } catch (err) {
      console.log('Unexpected error when check user exist', err.toString())
      Alert.alert('Sign in failed', 'Something went wrong, please try again')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#9729EA', '#6a34ec']} style={styles.headerContainer}>
          <Image source={Images.logoJobr} style={styles.imageHeader} />

          <View style={{}}>
            <Text style={styles.textHeader}>{I18n.t('allYourServices')}</Text>

            <Text style={styles.textUpperCaseHeader}>{I18n.t('rightNow')}</Text>
          </View>
        </LinearGradient>

        <View style={styles.bodyContainer}>
          <Image source={Images.welcomeBackground} style={styles.imageBg} />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnFB} onPress={this._onPressFacebook}>
            <Image source={Images.icFacebook} style={styles.imageFB} />

            <Text style={styles.textBtnFB}>
              {`${I18n.t('continue')} ${I18n.t('with')} Facebook`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnFB, { backgroundColor: Colors.white }]}
            onPress={this._signInGoogle}>
            <Image source={Images.google} style={styles.imageGG} />

            <Text style={styles.textBtnGG}>{`${I18n.t('continue')} ${I18n.t('with')} Google`}</Text>
          </TouchableOpacity>
          {Platform.OS == 'ios' && (
            <TouchableOpacity
              style={[styles.btnFB, { backgroundColor: Colors.darkBlue }]}
              onPress={() => alert('on press continue apple')}>
              <Image source={Images.apple} style={styles.imageApple} />

              <Text style={styles.textBtnFB}>
                {`${I18n.t('continue')} ${I18n.t('with')} Apple`}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.btnFB, { backgroundColor: Colors.primary }]}
            onPress={this._onPressStart}>
            <Image source={Images.mail} style={styles.imageMail} />

            <Text style={styles.textBtnFB}>{`${I18n.t('continue')} ${I18n.t('with')} ${I18n.t(
              'your'
            )} Email`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProp = state => ({
  user: state.auth.user,
  token: state.auth.token,
})

export default connect(mapStateToProp, {
  getProfileRequest: AuthActions.getProfileRequest,
  updateToken: AuthActions.updateToken,
  socialLoginRequest: AuthActions.socialLoginRequest,
  checkUserExistRequest: AuthActions.checkUserExistRequest,
})(LoginScreen)
