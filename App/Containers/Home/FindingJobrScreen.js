import React from 'react'
import {Image, ScrollView, StatusBar, View} from 'react-native'
import styles from '../Styles/FindingJobrStyles'
import TextComponent from '../../Components/TextComponent'
import Images from '../../Themes/Images'
import ToolBar from '../../Components/Toolbar'
import BackIcon from '../../Components/BackIcon'
import ButtonComponent from '../../Components/ButtonComponent'
import {APP_COLOR} from '../Styles/AppStyles'
import TextInputComponent from '../../Components/TextInputComponent'
import TextTouchable from '../../Components/TextTouchable'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import {URL} from '../../Services/Api'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import I18n from '../../I18n'

class FindingJobrScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      findJobrFailed: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({findJobrFailed: true})
    }, 3000)
  }

  _onPressFindAgain = () => {
    this.setState({findJobrFailed: false})
    setTimeout(() => {
      this.props.navigation.replace('OnlineAcceptJobr')
    }, 3000)
  }

  render() {
    const {findJobrFailed} = this.state
    return (
      <View style={[styles.container, styles.findingContainer]}>
        <StatusBar barStyle={'dark-content'}/>
        <ImageBackgroundContainer
          resizeMode={'stretch'}
          style={styles.bgTop}
          source={Images.bgFindingJobrTop}
        />
        <ImageBackgroundContainer
          resizeMode={'stretch'}
          style={styles.bgBottom}
          source={Images.bgFindingJobrBottom}
        />
        <View style={styles.mainContainer}>
          {
            findJobrFailed
              ? <FindJobrFailed onPressFindAgain={this._onPressFindAgain}/>
              : <FindingJobr />
          }
        </View>
      </View>
    )
  }
}

const FindJobrFailed = ({onPressFindAgain}) => (
  <>
    <Image source={Images.findJobrFailed} style={styles.findingJobIcon} resizeMode={'contain'}/>
    <TextComponent multiline style={styles.findingJobrText}>{I18n.t('failed')}</TextComponent>
    <TextComponent multiline style={styles.notFoundText}>{I18n.t('oopsJobbersNotFound')}</TextComponent>
    <ButtonComponent
      enableGradient
      style={styles.findButton}
      textStyle={styles.buttonText}
      onPress={onPressFindAgain}
      text={I18n.t('findAgain')}
    />
  </>
)


const FindingJobr = () => (
  <>
    <Image source={Images.findingJobr} style={styles.findingJobIcon} resizeMode={'contain'}/>
    <TextComponent multiline style={styles.findingJobrText}>{`${I18n.t('weAreFindingJobr')}...`}</TextComponent>
  </>
)

const mapStateToProp = state => ({
  user: state.auth.user
})

export default connect(
  mapStateToProp,
  {
    editProfileRequest: AuthActions.editProfileRequest,
    changeProfilePhotoRequest: AuthActions.changeProfilePhotoRequest,
  },
)(FindingJobrScreen)
