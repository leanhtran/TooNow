import React from 'react'
import { View, Image } from 'react-native'
import styles from '../Styles/ForgotPasswordStyle'
import TextComponent from '../../Components/TextComponent'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import I18n from '../../I18n'
import images from '../../Themes/Images'
import ButtonComponent from '../../Components/ButtonComponent'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'

class ForgotPasswordCheckEmailScreen extends React.Component {

  _onPressSend = () => {
    this.props.forgotPasswordRequest({ email: this.props.navigation.getParam('email')?.trim() }, () => {
    })
  }

  _goBackLogin = () =>{
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.flex1}>
        <View style={styles.flex1}>
          <ToolBar
            paddingEnable
            theme={'dark'}
            LeftComponent={<BackIcon style={styles.backIcon} />}
            CenterComponent={<LogoJobr />}
          />
          <TopView />
          <ButtonComponent onPress={this._goBackLogin} style={styles.marginHoz} enableGradient text={I18n.t('signIn')} />
          <LineBreak />
          <TextComponent style={styles.contentText} multiline={true}>
            {I18n.t('notReceiveEmail')}
          </TextComponent>
          <ButtonComponent style={styles.marginHoz} onPress={this._onPressSend} enableGradient text={I18n.t('resendEmail')} />
        </View>
      </View>
    )
  }
}

const LogoJobr = () => <Image source={images.logoPrimary} />

const TopView = () => (
  <View style={styles.topView}>
    <TextComponent multiline={true} style={styles.titleText}>
      {I18n.t('checkYourEmail')}
    </TextComponent>
    <TextComponent multiline={true} style={styles.contentText}>
      Nous vous avons envoyé un message pour vous permettre de réinitialiser votre mot de passe
    </TextComponent>
  </View>
)

const LineBreak = () => <View style={styles.LineBreak} />

export default connect(null, {
  forgotPasswordRequest: AuthActions.forgotPasswordRequest,
})(ForgotPasswordCheckEmailScreen)
