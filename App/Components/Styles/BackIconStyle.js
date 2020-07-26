import { StyleSheet } from 'react-native'
import Sizes from '../../Themes/Sizes'
import {Colors} from '../../Themes'
import {getStatusBarHeight} from "react-native-status-bar-height"
import {APP_COLOR} from '../../Containers/Styles/AppStyles'

export default StyleSheet.create({
  touchableStyle: {
    alignSelf: 'flex-start',
    marginTop: Sizes.width16,// + getStatusBarHeight(),
    // paddingBottom: Sizes.width10,
  },
  blackIcon: {
    tintColor: APP_COLOR.TEXT,
  },
})
