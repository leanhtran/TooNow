import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StatusBar
} from 'react-native'
import styles from '../Styles/JobrTransactionStyle'
import {Images} from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import LinearGradient from 'react-native-linear-gradient'
import IconTouchable from '../../Components/IconTouchable'
import {DistanceMission} from './OfflineActivities'
import TextComponent from '../../Components/TextComponent'
import I18n from '../../I18n'

class JobrTransactionZoomScreen extends React.Component {
  state = {
    address: '3817 Edwards Cedar, Paris'
  }

  _onPressGPS = () => {
    alert('here')
  }

  _onPressContinue = () => {
    this.props.navigation.navigate('SignUpPhone')
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  render () {
    const {address} = this.state
    return (
      <ImageBackgroundContainer source={Images.bgMap}>
        <StatusBar barStyle={'dark-content'} />
        <LinearGradient
          colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.1)']}
          style={styles.overlayView}
          useAngle
          angle={180}
        />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={[styles.flex1, styles.container]}>
            <ToolBar LeftComponent={<BackIcon style={styles.backIcon} />}/>
            <DistanceProcessing
              from={'1599 Pockrus Rialto, Oregon'}
              to={'3817 Edwards Cedar, Paris'}
              containerStyle={styles.distanceMission}
            />
            <View style={[styles.toPosition, styles.zoomToPosition]}>
              <Image
                source={Images.directionLine}
                style={styles.directionLine}
                resizeMode='contain'
              />
              <Image
                source={Images.toPosition}
                style={styles.toIcon}
                resizeMode='contain'
              />
            </View>
            <View style={[styles.fromPosition, styles.zoomFromPosition]}>
              <Image
                source={Images.profileDefault}
                style={[styles.profileIcon, styles.zoomProfileIcon]}
              />
            </View>
            <IconTouchable
              touchableStyle={styles.gpsIconContainer}
              disabledHitSlop
              source={Images.gps}
              onPress={this._onPressGPS}
              style={styles.gpsIcon}
            />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackgroundContainer>
    )
  }
}

const DistanceProcessing = ({from, to, containerStyle}) => (
  <View style={[styles.distanceContainer, containerStyle]}>
    <View style={styles.distanceRow}>
      <Image source={Images.circlePrimary} style={styles.iconCircle} resizeMode={'contain'}/>
      <TextComponent style={styles.distanceTitle}>{I18n.t('store')}</TextComponent>
    </View>
    <View style={styles.flexDirectionRow}>
      <View>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
      </View>
      <TextComponent multiline={true} style={[styles.distanceText, styles.marginLeft17]}>{from}</TextComponent>
    </View>
    <View style={styles.distanceRow}>
      <Image source={Images.circlePrimary} style={styles.iconCircle} resizeMode={'contain'}/>
      <TextComponent style={styles.distanceTitle}>{I18n.t('askrsAddress')}</TextComponent>
    </View>
    <TextComponent multiline={true} style={[styles.distanceText, styles.marginLeft23]}>{to}</TextComponent>
  </View>
)

export default JobrTransactionZoomScreen
