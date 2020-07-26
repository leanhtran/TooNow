import React from 'react'
import styles from './Styles/BackIconStyle'
import {Images} from '../Themes'
import IconTouchable from './IconTouchable'
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types'
import {APP_COLOR} from '../Containers/Styles/AppStyles'

const BackIcon = props => {
  const {touchableStyle, source, onPress, style, theme} = props
  const _onPressBack = () => {
    if (onPress) {
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
      source={source || Images.back}
      onPress={_onPressBack}
    />
  )
}

BackIcon.propTypes = {
  source: PropTypes.any,
  style: PropTypes.any,
  touchableStyle: PropTypes.any,
  onPress: PropTypes.func,
}

export default withNavigation(BackIcon)
