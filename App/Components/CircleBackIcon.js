import React from 'react'
import styles from './Styles/BackIconStyle'
import {Images} from '../Themes'
import IconTouchable from './IconTouchable'
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types'
import {APP_COLOR} from '../Containers/Styles/AppStyles'

const CircleBackIcon = props => {
  const {touchableStyle, source, onPress, style, theme} = props
  const _onPressBack = () => {
    if (onPress) {
      console.log("go back")
      onPress()
    } else {
      props.navigation.goBack()
    }
  }
  return (
    <IconTouchable
      {...props}
      style={[style, theme === 'black' ? {tintColor: APP_COLOR.TEXT} : null]}
      touchableStyle={[styles.touchableStyle, touchableStyle]}
      source={source || Images.circleBack}
      onPress={_onPressBack}
    />
  )
}

CircleBackIcon.propTypes = {
  source: PropTypes.any,
  style: PropTypes.any,
  touchableStyle: PropTypes.any,
  onPress: PropTypes.func,
}

export default withNavigation(CircleBackIcon)
