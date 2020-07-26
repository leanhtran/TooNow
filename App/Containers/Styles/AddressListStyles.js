import { StatusBar, StyleSheet } from 'react-native'
import AppStyles, { APP_COLOR } from './AppStyles'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  addressItemText: {
    paddingVertical: Sizes.width10,
  },
  addressListContainer: {
    paddingHorizontal: Sizes.width18,
    paddingVertical: Sizes.width14,
    maxHeight: Sizes.width262,
    borderRadius: Sizes.width15,
    marginTop: Sizes.width14,
    backgroundColor: Colors.white,
    ...AppStyles.shadow,
  },
})
