import React from 'react'
import {View, SafeAreaView, TouchableOpacity, Text, AsyncStorage} from 'react-native'
import styles from '../Styles/WelcomeStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import SwiperComponent from '../../Components/SwiperComponent'
import I18n from '../../I18n'
import {connect} from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import {NavigationActions} from "react-navigation"

class JobrWelcomeScreen extends React.Component {

  _onPressStart = () => {
    AsyncStorage.setItem("status", "false")
    if (this.props.token) this.props.updateToken(this.props.token)
    if (this.props.user) {
      // JOBR
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)

      //ASKR
      // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
    } else {
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <SwiperComponent />
        <ButtonComponent
          enableGradient
          onPress={this._onPressStart}
          text={I18n.t('letsGo')}
          style={styles.buttonStart}
        />

        <TouchableOpacity style={styles.btnPass} onPress={this._onPressStart}>
          <Text style={styles.textPass}>
            {I18n.t('pass')}
          </Text>
        </TouchableOpacity>
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
})(JobrWelcomeScreen)