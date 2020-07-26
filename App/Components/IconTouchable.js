import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/IconTouchableStyles'

const IconTouchable = props => {
  const {onPress, style, touchableStyle, source, resizeMode, disabled, disabledHitSlop} = props

  return (
    <TouchableOpacity
      style={touchableStyle}
      disabled={disabled}
      hitSlop={disabledHitSlop ? null : {top: 20, bottom: 20, left: 20, right: 20}}
      onPress={onPress}>
      <Image
        {...props}
        source={source}
        resizeMode={resizeMode || 'contain'}
        style={[styles.icon, style]}
      />
    </TouchableOpacity>
  )
}

IconTouchable.propTypes = {
  source: PropTypes.any.isRequired,
  onPress: PropTypes.any,
  style: PropTypes.any,
  touchableStyle: PropTypes.any,
  resizeMode: PropTypes.any,
  disabled: PropTypes.bool,
  disabledHitSlop: PropTypes.bool,
}

export default IconTouchable
