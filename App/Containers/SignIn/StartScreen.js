import React from 'react'
import { ActivityIndicator, AsyncStorage, ImageBackground } from 'react-native'
import { Colors, Images } from '../../Themes'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import { NavigationActions } from 'react-navigation'

class StartScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLaunch: false,
    }
  }

  async componentDidMount() {
    const screen = await AsyncStorage.getItem('status')
    if (screen == 'false') {
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
    } else {
        if(screen !="true"){
          this.props.navigation.reset([NavigationActions.navigate({ routeName: 'JobrWelcome' })], 0)
        }else{
          const isLogout = await AsyncStorage.getItem('logout')
          console.log("isLogout", isLogout)
          if(isLogout == "true"){
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
          }
          // if(!this.props.user){
          //   console.log("1","1")
          //   this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
          // }
        }
    }
  }

  async componentWillReceiveProps() {
    const status = await AsyncStorage.getItem('status')
    if (status == 'true') {
      if (this.props.token) this.props.updateToken(this.props.token)
      if (this.props.user) {
          this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
      } else {
        // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'SignUpAddress' })], 0)
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
      }
    } else {
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'JobrWelcome' })], 0)
    }
  }

  render() {
    if (this.state.firstLaunch == false)
      return (
        <ImageBackground
          resizeMode="cover"
          source={Images.jobrSplash}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </ImageBackground>
      )
  }
}

const mapStateToProp = state => ({
  user: state.auth.user,
  token: state.auth.token
})

export default connect(mapStateToProp, {
  updateToken: AuthActions.updateToken,
})(StartScreen)
