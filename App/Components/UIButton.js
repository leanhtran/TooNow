import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/ButtonStyles'
import LinearGradient from 'react-native-linear-gradient'

const UIButton = props => {
    const { text, style, textStyle, onPress, enableGradient, gradientStyle, icon, rightIcon } = props

    if (enableGradient) return (
        <TouchableOpacity
            {...props}
            style={style}
            onPress={onPress}>
            <LinearGradient
                colors={['#4703E8', '#7416F3', '#9729EA']}
                useAngle
                // angleCenter={{x: 0, y: 1}}
                style={[styles.btnGradient, gradientStyle]}
                angle={90}>
                {rightIcon && <Image source={rightIcon} style={[styles.rightIcon, { tintColor: '#FFF' }]} resizeMode={'contain'} />}
            </LinearGradient>
            <View style={styles.viewTitle}>
                {icon && <Image source={icon} style={styles.icon} resizeMode={'contain'} />}
                <Text style={[styles.textButtonGradient, textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <TouchableOpacity
            {...props}
            onPress={onPress}
            style={[styles.btnContainer, style]}>
            <View style={styles.viewTitle}>
                {icon && <Image source={icon} style={styles.icon} resizeMode={'contain'} />}
                <Text style={[styles.textButtonGradient, textStyle]}>{text}</Text>
            </View>
            {rightIcon && <Image source={rightIcon} style={[styles.rightIcon, { tintColor: '#FFF' }]} resizeMode={'contain'} />}
        </TouchableOpacity>
    )
}

UIButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.any,
    gradientStyle: PropTypes.any,
    style: PropTypes.any,
    disabled: PropTypes.bool,
    enableGradient: PropTypes.bool,
    icon: PropTypes.any,
    rightIcon: PropTypes.any
}

export default UIButton
