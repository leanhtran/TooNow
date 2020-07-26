import React from 'react'
import {StatusBar, View} from 'react-native'
import {URL_API} from '../../Services/Api'
import WebViewComponent from '../../Components/WebViewComponent'
import ToolBar from '../../Components/Toolbar'
import BackIcon from '../../Components/BackIcon'
import styles from '../Styles/ProfileStyles'
import {APP_COLOR} from '../Styles/AppStyles'
import I18n from '../../I18n'

class TermsAndConditionsScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'}/>
        <ToolBar
          paddingEnable
          LeftComponent={<BackIcon style={styles.blackIcon}/>}
          center={I18n.t('termsAndConditions')}
          toolBarTextStyle={{color: APP_COLOR.TEXT}}
        />
        <WebViewComponent uri={'https://www.toonow.io/cgv'}/>
      </View>
    )
  }
}

export default TermsAndConditionsScreen
