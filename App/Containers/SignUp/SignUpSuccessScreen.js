import React from 'react'
import {View, StatusBar, Image} from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import TextComponent from '../../Components/TextComponent'
import Images from '../../Themes/Images'
import {NavigationActions} from "react-navigation"
import I18n from '../../I18n'
import LinearGradient from 'react-native-linear-gradient'

class SignUpSuccessScreen extends React.Component {
  _onPressContinue = () => {
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
  }

  render() {
    return (
      <LinearGradient style={[styles.flex1]} 
      colors={['#9175f3', '#a266f0']} angle={114} >
        <StatusBar barStyle={'light-content'}/>
          <View style={[styles.flex1, styles.center]}>
            <Image source={Images.signupSuccess} resizeMode="cover" />
              <TextComponent
                multiline={true}
                style={styles.titleTextSuccess}>
                {I18n.t('congratulation')}
              </TextComponent>
              <TextComponent
                multiline={true}
                style={styles.contentTextSuccess}>
                {I18n.t('youCanAcceptMission')}
              </TextComponent>
          </View>
          <Footer onPressContinue={this._onPressContinue}/>
      </LinearGradient>
    )
  }
}

const Footer = ({onPressContinue}) => (
  <View style={[styles.footerSuccess]}>
    <ButtonComponent onPress={onPressContinue} text={I18n.t('continue')}/>
  </View>
)

export default SignUpSuccessScreen
