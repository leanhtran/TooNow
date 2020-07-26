import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import Images from '../Themes/Images'

const ImageBackgroundContainer = props => {
  const {style, source, resizeMode} = props
  return (
    <ImageBackground
      style={[styles.container, style]}
      source={source || Images.bgLogin}
      resizeMode={resizeMode || 'cover'}>
      {props.children}
    </ImageBackground>
  );
}

ImageBackgroundContainer.propTypes = {
  source: PropTypes.any,
  style: PropTypes.any,
  resizeMode: PropTypes.any,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})


export default ImageBackgroundContainer
