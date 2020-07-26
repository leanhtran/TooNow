import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import TextComponent from './TextComponent'

const TextTouchable = props => {
  const {text, style, onPress, disabled, containerStyle} = props

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <TextComponent {...props} onPress={null} style={style}>{text}</TextComponent>
    </TouchableOpacity>
  )
}

TextTouchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.any,
  containerStyle: PropTypes.any,
  disabled: PropTypes.bool,
}

export default TextTouchable
