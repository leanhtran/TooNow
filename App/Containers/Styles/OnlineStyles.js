import { StyleSheet } from 'react-native'
import HomeStyles from './HomeStyles'
import {APP_COLOR} from './AppStyles'
import Sizes from '../../Themes/Sizes'

export default StyleSheet.create({
  ...HomeStyles,
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_COLOR.BACKGROUND,
    borderRadius: Sizes.width15,
  },
  priceInput: {
    flex: 1,
    paddingLeft: Sizes.width18,
  },
  okButton: {
    height: Sizes.width24,
    width: Sizes.width50,
    backgroundColor: APP_COLOR.BACKGROUND,
    borderWidth: Sizes.width1,
    borderColor: APP_COLOR.PRIMARY,
    marginRight: Sizes.width13,
  },
  okText: {
    color: APP_COLOR.PRIMARY,
    fontWeight: 'normal',
  },
})
