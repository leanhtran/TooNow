import { StyleSheet } from 'react-native'
import Sizes from '../../Themes/Sizes'
import {APP_COLOR, APP_SIZE} from '../../Containers/Styles/AppStyles'

export default StyleSheet.create({
  text: {
    flexShrink: 1,
    fontSize: APP_SIZE.TEXT,
    lineHeight: APP_SIZE.LINE_HEIGHT,
    color: APP_COLOR.TEXT,
  },
  boldText: {
    fontWeight: 'bold',
  },
  inactiveText: {
    color: APP_COLOR.INACTIVE,
  }
})
