import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
  Dimensions,
} from 'react-native'
import Sizes from '../Themes/Sizes'
import {APP_COLOR} from '../Containers/Styles/AppStyles'

const LoadingView = () => {
  const size = Platform.OS === 'ios' ? 'large' : Sizes.width34
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={true} size={size} color={APP_COLOR.PRIMARY} />
    </View>
  )
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLOR.LOADING_BACKGROUND,
  },
})

export default LoadingView
