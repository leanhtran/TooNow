import React from 'react'
import {View, SafeAreaView, AsyncStorage} from 'react-native'
import styles from '../Styles/WelcomeStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import SwiperComponent from '../../Components/SwiperComponent'
import {connect} from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import {NavigationActions} from "react-navigation"

class WelcomeScreen extends React.Component {

  _onPressStart = () => {
    AsyncStorage.setItem("status", "false")
    if (this.props.token) this.props.updateToken(this.props.token)
    if (this.props.user) {
      // JOBR
      const categories = this.props.user.categories
      if (categories && categories.length > 0) {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'SignUpChooseCategories' })], 0)
      } else {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
      }

      //ASKR
      // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
    } else {
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<StatusBar hidden={true}/>*/}
        <SwiperComponent/>
        <ButtonComponent
          enableGradient
          onPress={this._onPressStart}
          text={I18n.t('getStarted')}
          style={styles.buttonStart}
        />
        <SafeAreaView/>
      </View>
    )
  }
}

const mapStateToProp = state => ({
  user: state.auth.user,
  token: state.auth.token,
})

export default connect(mapStateToProp,{
  getProfileRequest: AuthActions.getProfileRequest,
  updateToken: AuthActions.updateToken,
})(WelcomeScreen)
