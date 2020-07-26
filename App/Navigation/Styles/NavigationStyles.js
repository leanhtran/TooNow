import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import Sizes from '../../Themes/Sizes'
import AppStyles from '../../Containers/Styles/AppStyles'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor
  },
  tabIcon: {
    height: Sizes.width24,
    width: Sizes.width24,
  },
  homeIcon: {
    height: Sizes.width62,
    width: Sizes.width62,
  },
  iconWithBadge: {
    height: Sizes.width24,
    width: Sizes.width24,
  },
  badge: {
    height: Sizes.width12,
    width: Sizes.width12,
    borderRadius: Sizes.width6,
    borderWidth: Sizes.width2,
    borderColor: Colors.white,
    backgroundColor: Colors.orangef7,
    position: 'absolute',
    right: -Sizes.width1,
    top: -Sizes.width5,
    ...AppStyles.shadow,
  },
})
