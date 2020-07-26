import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/ButtonStyles'
import LinearGradient from 'react-native-linear-gradient'

const ButtonComponent = props => {
  const { text, style, textStyle, onPress, enableGradient, gradientStyle, icon } = props

  if (enableGradient)
    return (
      <TouchableOpacity {...props} style={style} onPress={onPress}>
        <LinearGradient
          colors={['#4703E8', '#7416F3', '#9729EA']}
          useAngle
          // angleCenter={{x: 0, y: 1}}
          style={[styles.buttonGradient, gradientStyle]}
          angle={90}>
          {icon && <Image source={icon} style={styles.icon} resizeMode={'contain'} />}
          <Text style={[styles.textButtonGradient, textStyle]}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )

  return (
    <TouchableOpacity {...props} onPress={onPress} style={[styles.button, style]}>
      {icon && <Image source={icon} style={styles.icon} resizeMode={'contain'} />}
      <Text style={[styles.textButton, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

ButtonComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.any,
  gradientStyle: PropTypes.any,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  enableGradient: PropTypes.bool,
  icon: PropTypes.any,
}

export default ButtonComponent
