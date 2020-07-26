import React from 'react'
import {Text} from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TextStyles'

const TextComponent = props => {
  const {style, allowFontScaling, multiline, numberOfLines, isBoldText, isInactiveText} = props

  return (
    <Text
      {...props}
      allowFontScaling={allowFontScaling || false}
      numberOfLines={multiline ? numberOfLines : 1}
      style={[styles.text, style, isBoldText && styles.boldText, isInactiveText && styles.inactiveText]}>
      {props.children}
    </Text>
  )
}

TextComponent.propTypes = {
  style: PropTypes.any,
  isInactiveText: PropTypes.bool,
  isBoldText: PropTypes.bool,
  allowFontScaling: PropTypes.bool,
  ellipsizeMode: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
}

export default TextComponent
