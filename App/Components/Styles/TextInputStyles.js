import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import Sizes from '../../Themes/Sizes'
import {APP_COLOR, APP_SIZE} from '../../Containers/Styles/AppStyles'

export default StyleSheet.create({
  textInput: {
    height: Sizes.width45,
    width: '100%',
    color: APP_COLOR.TEXT,
    fontSize: APP_SIZE.TEXT,
    paddingVertical: 0,
  },
  border: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 4,
  },
  verticalTop: {
    textAlignVertical: 'top',
  },
})
