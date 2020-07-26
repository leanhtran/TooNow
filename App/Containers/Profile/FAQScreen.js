import React from 'react'
import { WebView } from 'react-native-webview';

import CircleBackIcon from '../../Components/CircleBackIcon'
import ToolBar from '../../Components/Toolbar'
import { View, StyleSheet } from 'react-native'
import I18n from '../../I18n'
import { APP_COLOR } from '../Styles/AppStyles'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'
import WebViewComponent from '../../Components/WebViewComponent';

function FAQScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ToolBar
          paddingEnable={true}
          LeftComponent={<CircleBackIcon />}
          center={I18n.t('FAQ')}
          toolBarTextStyle={{color: APP_COLOR.TEXT}}
        />
      </View>
      <WebViewComponent uri={'https://www.toonow.io/faq-jobr'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND, 
    paddingBottom: Sizes.width18
  },
})

export default FAQScreen
