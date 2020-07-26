import React from 'react'
import CircleBackIcon from '../../Components/CircleBackIcon'
import WebViewComponent from '../../Components/WebViewComponent'
import ToolBar from '../../Components/Toolbar'
import { View, StyleSheet, Text } from 'react-native'
import I18n from '../../I18n'
import { APP_COLOR } from '../Styles/AppStyles'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'

function TermsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ToolBar
          paddingEnable={true}
          LeftComponent={<CircleBackIcon />}
          center={I18n.t('termsAndConditions')}
          toolBarTextStyle={{ color: APP_COLOR.TEXT }}
        />
      </View>

      <WebViewComponent uri={'https://www.toonow.io/cookie-policy'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND,
    paddingBottom: Sizes.width18
  },
  bodyContainer: {
    height: 350,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width20,
    paddingVertical: Sizes.width10
  }
})

export default TermsScreen
